import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import type { Workflow } from '../../data/workflows';
import { useImageLoaded } from '../../hooks/useImageLoaded';
import { useLastNonNull } from '../../hooks/useLastNonNull';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { FINE_POINTER } from '../../lib/media';
import { cn } from '../../lib/utils';

/** Small frosted label floating over the canvas (instructions, zoom %). */
function HudPill({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'absolute z-10 px-3 py-1.5 bg-slate-900/80 rounded-full border border-white/10 text-xs font-mono text-white/80 backdrop-blur pointer-events-none shadow-[0_0_15px_rgba(0,0,0,0.5)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

const MIN_SCALE = 1;
const MAX_SCALE = 5;

// Mouse: wheel to zoom, drag to pan. Hand-rolled so the wheel never scrolls the page behind.
function DesktopInteractiveCanvas({ workflow }: { workflow: Workflow }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const isHighResLoaded = useImageLoaded(workflow.highResSrc);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (scale <= 1) return; // Only allow drag when zoomed
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // Native, non-passive wheel listener so preventDefault stops the page from scrolling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.002;
      setScale((prevScale) => {
        const newScale = Math.min(Math.max(MIN_SCALE, prevScale + delta), MAX_SCALE);
        // Reset position when zoomed all the way out
        if (newScale === 1) setPosition({ x: 0, y: 0 });
        return newScale;
      });
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  const layerStyle = {
    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full h-full overflow-hidden bg-slate-950 flex items-center justify-center select-none touch-none',
        scale > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default',
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <HudPill className="top-4 left-4">Wheel to Zoom • Drag to Pan</HudPill>
      <HudPill className="bottom-4 right-4">{Math.round(scale * 100)}%</HudPill>

      {/* Layer 1: Blur-Up Thumbnail (Loaded instantly) */}
      <img
        src={workflow.thumbnailSrc}
        alt="Canvas Base"
        draggable={false}
        className="absolute w-full h-full object-contain pointer-events-none will-change-transform filter blur-md transition-opacity duration-700 ease-in-out"
        style={{ ...layerStyle, opacity: isHighResLoaded ? 0 : 1 }}
      />

      {/* Layer 2: High-Res Image (Snaps in perfectly when loaded) */}
      <img
        src={workflow.highResSrc}
        alt="Interactive Canvas"
        draggable={false}
        className="absolute w-full h-full object-contain pointer-events-none will-change-transform transition-opacity duration-700 ease-in-out"
        style={{ ...layerStyle, opacity: isHighResLoaded ? 1 : 0 }}
      />
    </div>
  );
}

// Touch: pinch to zoom, drag to pan.
function MobileInteractiveCanvas({ workflow }: { workflow: Workflow }) {
  const isHighResLoaded = useImageLoaded(workflow.highResSrc);

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-950 flex items-center justify-center select-none touch-none">
      <TransformWrapper initialScale={1} minScale={MIN_SCALE} maxScale={MAX_SCALE} centerZoomedOut={true} wheel={{ wheelDisabled: true }}>
        {({ state }) => (
          <>
            <HudPill className="top-4 left-4">Pinch to Zoom • Drag to Pan</HudPill>
            <HudPill className="bottom-4 right-4">{Math.round(state.scale * 100)}%</HudPill>

            <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={workflow.thumbnailSrc}
                  alt="Canvas Base"
                  draggable={false}
                  className="absolute max-w-full max-h-full object-contain pointer-events-none filter blur-md transition-opacity duration-700 ease-in-out"
                  style={{ opacity: isHighResLoaded ? 0 : 1 }}
                />

                <img
                  src={workflow.highResSrc}
                  alt="Interactive Canvas"
                  draggable={false}
                  className="absolute max-w-full max-h-full object-contain pointer-events-none transition-opacity duration-700 ease-in-out"
                  style={{ opacity: isHighResLoaded ? 1 : 0 }}
                />
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}

export default function WorkflowModal({ workflow: requested, onClose }: { workflow: Workflow | null; onClose: () => void }) {
  const hasHover = useMediaQuery(FINE_POINTER);
  // Keep the last workflow on screen while the close animation plays.
  const workflow = useLastNonNull(requested);
  if (!workflow) return null;

  return (
    <Dialog open={!!requested} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] md:max-w-[90vw] h-[95vh] md:h-[90vh] bg-slate-950/80 backdrop-blur-2xl border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,1)] text-white p-0 overflow-hidden rounded-[2rem] gap-0 flex flex-col md:grid md:grid-cols-2 min-h-0">
        {/* Left Column: Details */}
        <div className="p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 bg-slate-950/50 order-2 md:order-1 h-[40vh] md:h-full overflow-y-auto shrink-0 min-h-0">
          <h2 className="text-accent text-sm font-bold tracking-widest uppercase mb-4">Workflow Inspection</h2>
          <DialogTitle className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight">{workflow.title}</DialogTitle>
          <div className="w-12 h-1 bg-accent/50 mb-6 rounded-full" />
          <p className="text-slate-300 text-lg leading-relaxed">{workflow.description}</p>
        </div>

        {/* Right Column: Interactive Canvas */}
        <div className="relative order-1 md:order-2 flex-1 md:h-full min-h-0 bg-slate-950">
          {hasHover ? <DesktopInteractiveCanvas workflow={workflow} /> : <MobileInteractiveCanvas workflow={workflow} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
