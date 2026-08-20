'use client';

import { useEffect, useRef } from 'react';

export interface VoxelTopographyGridProps {
  tileSize?: number;
  maxHeight?: number;
  primaryColor?: string; // Hex color (e.g., #6366f1)
  wireColor?: string;
  speed?: number;
}

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

    // Fast Hex to RGB conversion
    const hexToRgb = (hex: string) => {
      const cleanHex = hex.replace('#', '');
      const bigint = parseInt(
        cleanHex.length === 3
          ? cleanHex.split('').map((c) => c + c).join('')
          : cleanHex,
        16
      );
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
      };
    };

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

    const handleResize = () => {
      const dpr = 0.5;
      width = container.clientWidth;
      height = container.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
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
    const tileW = tileSize * 0.866025; // cos(30 deg)
    const tileH = tileSize * 0.5;      // sin(30 deg)
    const maxRadiusSq = 220 * 220;
    const invMaxHeight = 1 / (maxHeight + 90);

    let isVisible = false;
    let isDrawing = false;
    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const draw = () => {
      if (!isVisible || isScrolling) {
        isDrawing = false;
        return;
      }
      
      time += speed;

      // Responsive, smooth lerping cursor tracking with added weight for buttery deceleration
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Dark background clear
      ctx.fillStyle = '#000000'; // matches slate-950
      ctx.fillRect(0, 0, width, height);

      const aspect = width / height;
      const isMobileViewport = width < 768 || aspect < 1;
      
      // Dynamic Voxel Sizing: Medium 'sweet spot' (0.78x) on mobile
      const effectiveTileSize = isMobileViewport ? tileSize * 0.78 : tileSize;
      
      const currentTileW = effectiveTileSize * 0.866025;
      const currentTileH = effectiveTileSize * 0.5;

      // Diagonal Corner Fix: Aggressively oversize the grid by 3x on mobile to push the slanted edges completely out of view
      const overscanW = isMobileViewport ? 2.8 : 1;
      const overscanH = isMobileViewport ? 3.0 : 1;
      const gridCols = Math.ceil((width * overscanW) / currentTileW) + 4;
      const gridRows = Math.ceil((height * overscanH) / currentTileH) + 8;

      const originX = width * 0.5;
      // Center the camera vertically on mobile, preserve desktop high-angle view
      const originY = isMobileViewport ? height * 0.5 : height / 3.2;

      const startR = -Math.floor(gridRows / 2);
      const endR = Math.ceil(gridRows / 2);
      const startC = -Math.floor(gridCols / 2);
      const endC = Math.ceil(gridCols / 2);

      // Render loop with Back-to-Front Painter's Algorithm
      for (let r = startR; r < endR; r++) {
        for (let c = startC; c < endC; c++) {
          const isoX = originX + (c - r) * currentTileW;
          const isoY = originY + (c + r) * currentTileH;

          // Trigonometric Height Wave
          const wave1 = Math.sin(time * 2 + c * 0.25 + r * 0.25);
          const wave2 = Math.cos(time * 1.5 + c * 0.15 - r * 0.3);
          const baseH = (wave1 + wave2 + 2) * 0.25 * maxHeight;

          // Perspective Fix: Calculate distance against the expected elevated top face
          // rather than the flat floor. This mathematically aligns the peak of the 90px hover wave
          // perfectly with the cursor in isometric space.
          const projectedY = isoY - baseH - 90;

          // Distance check to mouse target
          const dx = isoX - mx;
          const dy = projectedY - my;
          const distSq = dx * dx + dy * dy;

          let h = baseH;
          if (distSq < maxRadiusSq) {
            const dist = Math.sqrt(distSq);
            const influence = 1 - dist / 220;
            h += influence * influence * 90;
          }

          const py = isoY - h;

          // Fast Screen-Space Culling: Skip rendering voxels completely out of bounds
          if (
            isoX + currentTileW < 0 ||
            isoX - currentTileW > width ||
            py + h + 15 < 0 ||
            py - currentTileH > height
          ) {
            continue;
          }

          // Top Face Vertices
          const topP1Y = py - currentTileH;
          const topP2X = isoX + currentTileW;
          const topP3Y = py + currentTileH;
          const topP4X = isoX - currentTileW;

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
          const lutIdx = (lightRatio * 100) | 0;

          ctx.fillStyle = topColorLUT[lutIdx];
          ctx.fill();

          // Wireframe Overlay
          ctx.strokeStyle = wireColor;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !isDrawing && !isScrolling) {
        isDrawing = true;
        draw();
      }
    });
    intersectionObserver.observe(container);

    // Global Scroll Suspension Logic
    const handleScrollStart = () => {
      isScrolling = true;
    };

    const handleScrollEnd = () => {
      isScrolling = false;
      if (isVisible && !isDrawing) {
        isDrawing = true;
        draw();
      }
    };

    const handleNativeScroll = () => {
      if (!isScrolling) handleScrollStart();
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollEnd, 150);
    };

    window.addEventListener('scroll-start', handleScrollStart);
    window.addEventListener('scroll-end', handleScrollEnd);
    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll-start', handleScrollStart);
      window.removeEventListener('scroll-end', handleScrollEnd);
      window.removeEventListener('scroll', handleNativeScroll);
      intersectionObserver.disconnect();
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
