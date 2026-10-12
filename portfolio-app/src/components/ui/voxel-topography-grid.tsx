import { useEffect, useRef } from 'react';
import { SCROLL_END_EVENT, SCROLL_START_EVENT } from '../../lib/smoothScroll';

export interface VoxelTopographyGridProps {
  tileSize?: number;
  maxHeight?: number;
  primaryColor?: string; // Hex color (e.g., #6366f1)
  wireColor?: string;
  speed?: number;
}

const HOVER_RADIUS = 220;
const HOVER_LIFT = 90;

// Fast Hex to RGB conversion
const hexToRgb = (hex: string) => {
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(
    cleanHex.length === 3
      ? cleanHex
          .split('')
          .map((c) => c + c)
          .join('')
      : cleanHex,
    16,
  );
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};

export function VoxelTopographyGrid({
  tileSize = 28,
  maxHeight = 70,
  primaryColor = '#6366f1',
  wireColor = 'rgba(129, 140, 248, 0.4)',
  speed = 0.015,
}: VoxelTopographyGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Immediate and smooth target coordinates for ultra-low latency tracking
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let time = 0;

    const baseRgb = hexToRgb(primaryColor);

    // Pre-computed constant side face colors (0 allocations per frame)
    const leftFaceColor = `rgba(${Math.floor(baseRgb.r * 0.45)}, ${Math.floor(baseRgb.g * 0.45)}, ${Math.floor(baseRgb.b * 0.45)}, 0.85)`;
    const rightFaceColor = `rgba(${Math.floor(baseRgb.r * 0.65)}, ${Math.floor(baseRgb.g * 0.65)}, ${Math.floor(baseRgb.b * 0.65)}, 0.85)`;

    // Pre-computed Lookup Table (LUT) for Top Face elevation lighting
    const topColorLUT: string[] = new Array(101);
    for (let i = 0; i <= 100; i++) {
      const ratio = i / 100;
      const r = Math.floor(baseRgb.r * (0.55 + ratio * 0.45));
      const g = Math.floor(baseRgb.g * (0.55 + ratio * 0.45));
      const b = Math.floor(baseRgb.b * (0.55 + ratio * 0.45));
      topColorLUT[i] = `rgb(${r},${g},${b})`;
    }

    // Grid geometry depends only on the canvas size, so it is derived on resize, not per frame.
    const grid = { tileW: 0, tileH: 0, originX: 0, originY: 0, startR: 0, endR: 0, startC: 0, endC: 0 };

    // Cap DPR at 1.5 for crisp visuals without the full cost of 2x+ rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Resizing a canvas resets its context state, so re-apply it here.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
      ctx.strokeStyle = wireColor;
      ctx.lineWidth = 0.6;

      const isMobileViewport = width < 768 || width / height < 1;

      // Dynamic Voxel Sizing: Medium 'sweet spot' (0.78x) on mobile
      const effectiveTileSize = isMobileViewport ? tileSize * 0.78 : tileSize;
      grid.tileW = effectiveTileSize * 0.866025;
      grid.tileH = effectiveTileSize * 0.5;

      // Diagonal Corner Fix: Aggressively oversize the grid by 3x on mobile to push the slanted edges completely out of view
      const overscanW = isMobileViewport ? 2.8 : 1;
      const overscanH = isMobileViewport ? 3.0 : 1;
      const gridCols = Math.ceil((width * overscanW) / grid.tileW) + 4;
      const gridRows = Math.ceil((height * overscanH) / grid.tileH) + 8;

      grid.originX = width * 0.5;
      // Center the camera vertically on mobile, preserve desktop high-angle view
      grid.originY = isMobileViewport ? height * 0.5 : height / 3.2;

      grid.startR = -Math.floor(gridRows / 2);
      grid.endR = Math.ceil(gridRows / 2);
      grid.startC = -Math.floor(gridCols / 2);
      grid.endC = Math.ceil(gridCols / 2);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    // Event listeners attached to window for smooth off-canvas pointer tracking
    const updatePointerPos = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.targetX = clientX - rect.left;
      mouseRef.current.targetY = clientY - rect.top;
    };

    let ticking = false;
    const handlePointerMove = (e: PointerEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updatePointerPos(e.clientX, e.clientY);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handlePointerLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    // Constants for grid iteration
    const maxRadiusSq = HOVER_RADIUS * HOVER_RADIUS;
    const invMaxHeight = 1 / (maxHeight + HOVER_LIFT);

    let isVisible = false;
    let isDrawing = false;
    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout>;
    let frameCount = 0;

    const draw = () => {
      if (!isVisible || isScrolling) {
        isDrawing = false;
        return;
      }

      // Throttle to ~30fps when cursor is not interacting with the grid
      const isIdle = mouseRef.current.targetX <= -500;
      frameCount++;
      if (isIdle && frameCount % 2 !== 0) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      time += speed;

      // Responsive, smooth lerping cursor tracking with added weight for buttery deceleration
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const { tileW, tileH, originX, originY, startR, endR, startC, endC } = grid;

      // Black background clear
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Render loop with Back-to-Front Painter's Algorithm
      for (let r = startR; r < endR; r++) {
        for (let c = startC; c < endC; c++) {
          const isoX = originX + (c - r) * tileW;
          const isoY = originY + (c + r) * tileH;

          // Trigonometric Height Wave
          const wave1 = Math.sin(time * 2 + c * 0.25 + r * 0.25);
          const wave2 = Math.cos(time * 1.5 + c * 0.15 - r * 0.3);
          const baseH = (wave1 + wave2 + 2) * 0.25 * maxHeight;

          // Perspective Fix: Calculate distance against the expected elevated top face
          // rather than the flat floor. This mathematically aligns the peak of the hover wave
          // perfectly with the cursor in isometric space.
          const projectedY = isoY - baseH - HOVER_LIFT;

          // Distance check to mouse target
          const dx = isoX - mx;
          const dy = projectedY - my;
          const distSq = dx * dx + dy * dy;

          let h = baseH;
          if (distSq < maxRadiusSq) {
            const dist = Math.sqrt(distSq);
            const influence = 1 - dist / HOVER_RADIUS;
            h += influence * influence * HOVER_LIFT;
          }

          const py = isoY - h;

          // Fast Screen-Space Culling: Skip rendering voxels completely out of bounds
          if (isoX + tileW < 0 || isoX - tileW > width || py + h + 15 < 0 || py - tileH > height) {
            continue;
          }

          // Top Face Vertices
          const topP1Y = py - tileH;
          const topP2X = isoX + tileW;
          const topP3Y = py + tileH;
          const topP4X = isoX - tileW;

          const sideBottomShift = h + 15;

          // --- 1. Left Side Face ---
          ctx.beginPath();
          ctx.moveTo(topP4X, py);
          ctx.lineTo(isoX, topP3Y);
          ctx.lineTo(isoX, topP3Y + sideBottomShift);
          ctx.lineTo(topP4X, py + sideBottomShift);
          ctx.closePath();
          ctx.fillStyle = leftFaceColor;
          ctx.fill();

          // --- 2. Right Side Face ---
          ctx.beginPath();
          ctx.moveTo(isoX, topP3Y);
          ctx.lineTo(topP2X, py);
          ctx.lineTo(topP2X, py + sideBottomShift);
          ctx.lineTo(isoX, topP3Y + sideBottomShift);
          ctx.closePath();
          ctx.fillStyle = rightFaceColor;
          ctx.fill();

          // --- 3. Top Face ---
          ctx.beginPath();
          ctx.moveTo(isoX, topP1Y);
          ctx.lineTo(topP2X, py);
          ctx.lineTo(isoX, topP3Y);
          ctx.lineTo(topP4X, py);
          ctx.closePath();

          // Fast LUT Color Lookup
          const rawLight = h * invMaxHeight;
          const lightRatio = rawLight > 1 ? 1 : rawLight < 0.1 ? 0.1 : rawLight;
          ctx.fillStyle = topColorLUT[(lightRatio * 100) | 0];
          ctx.fill();

          // Wireframe Overlay (stroke style is set once per resize)
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const startDrawing = () => {
      if (isVisible && !isDrawing && !isScrolling) {
        isDrawing = true;
        draw();
      }
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      startDrawing();
    });
    intersectionObserver.observe(container);

    // Global Scroll Suspension Logic
    const handleScrollStart = () => {
      isScrolling = true;
    };

    const handleScrollEnd = () => {
      isScrolling = false;
      startDrawing();
    };

    const handleNativeScroll = () => {
      if (!isScrolling) handleScrollStart();
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollEnd, 150);
    };

    window.addEventListener(SCROLL_START_EVENT, handleScrollStart);
    window.addEventListener(SCROLL_END_EVENT, handleScrollEnd);
    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      clearTimeout(scrollTimeout);
      window.removeEventListener(SCROLL_START_EVENT, handleScrollStart);
      window.removeEventListener(SCROLL_END_EVENT, handleScrollEnd);
      window.removeEventListener('scroll', handleNativeScroll);
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [tileSize, maxHeight, primaryColor, wireColor, speed]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-0 overflow-hidden opacity-60 cursor-pointer touch-none will-change-transform"
      style={{ transform: 'translateZ(0)' }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

export default VoxelTopographyGrid;
