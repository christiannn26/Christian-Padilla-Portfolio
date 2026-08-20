import { useState, useRef, useEffect, type MouseEvent } from 'react';
import { cn } from '../lib/utils';
import { ZoomIn } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from './ui/dialog';

interface InteractiveFlowchartProps {
  imageSrc?: string;
  zoomLevel?: number;
  lensSize?: number;
}

export default function InteractiveFlowchart({ 
  imageSrc = "./img/Mermaid.svg",
  zoomLevel = 1.7,
  lensSize = 250
}: InteractiveFlowchartProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
    if (containerSize.w !== rect.width || containerSize.h !== rect.height) {
      setContainerSize({ w: rect.width, h: rect.height });
    }
  };

  const [hasHover, setHasHover] = useState(true);

  useEffect(() => {
    // Check if the device has a fine pointer (mouse)
    const checkPointer = () => {
      setHasHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    };
    checkPointer();
    window.addEventListener('resize', checkPointer);
    return () => window.removeEventListener('resize', checkPointer);
  }, []);

  const R = lensSize / 2;

  return (
    <section className="py-24 relative z-10 w-full">
      <div className="container mx-auto px-4 max-w-7xl text-center mb-16 relative z-10">
        <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4">Architecture</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-heading mb-6">
          System <span className="text-accent drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">Flowchart</span>
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Every step is mapped, every action triggers automation, and every lead moves forward with intention.
        </p>
      </div>

      <div className="w-full px-2 md:px-4">
        <p className="text-center text-xs text-white/40 mb-3 tracking-wide flex items-center justify-center gap-2">
          {hasHover ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              Hover over the diagram to closely inspect the workflow logic.
            </>
          ) : (
            <>
              <ZoomIn className="w-3.5 h-3.5 opacity-70" />
              Tap on the diagram to expand and zoom.
            </>
          )}
        </p>

        {/* Interactive Container Definition */}
        {(() => {
          const interactiveContent = (
            <div 
              ref={containerRef}
              className={cn(
                "relative w-full overflow-hidden bg-transparent rounded-xl",
                hasHover ? "cursor-crosshair touch-none" : "cursor-pointer"
              )}
              onMouseEnter={() => hasHover && setIsHovered(true)}
              onMouseLeave={() => hasHover && setIsHovered(false)}
              onMouseMove={hasHover ? handleMouseMove : undefined}
            >
              {/* Base Image */}
              <div className="w-full relative group">
                <img 
                  src={imageSrc} 
                  alt="System Flowchart" 
                  className={cn(
                    "w-full h-auto object-contain transition-all duration-300 drop-shadow-[0_0_3px_rgba(255,255,255,0.9)]",
                    (isHovered && hasHover) ? "blur-[5px] opacity-40 scale-[0.98]" : "blur-0 opacity-100 scale-100"
                  )}
                />
                
                {/* Mobile Tap overlay */}
                {!hasHover && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-background/80 backdrop-blur-md rounded-full p-4 border border-white/10 shadow-xl">
                      <ZoomIn className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                )}
              </div>

              {/* Magnifying Glass Lens (Desktop Only) */}
              {(isHovered && hasHover && containerSize.w > 0) && (
                <div 
                  className="absolute top-0 left-0 pointer-events-none overflow-hidden rounded-full border-2 border-accent bg-slate-900 shadow-[0_0_30px_rgba(212,175,55,0.5)] z-20 animate-in zoom-in-50 fade-in duration-200 ease-out"
                  style={{
                    width: lensSize,
                    height: lensSize,
                    transform: `translate(${mousePos.x - R}px, ${mousePos.y - R}px)`
                  }}
                >
                  <div 
                    className="absolute top-0 left-0 flex items-center justify-center"
                    style={{
                      width: containerSize.w,
                      height: containerSize.h,
                      transform: `translate(${-(mousePos.x - R)}px, ${-(mousePos.y - R)}px) scale(${zoomLevel})`,
                      transformOrigin: `${mousePos.x}px ${mousePos.y}px`,
                    }}
                  >
                    <img 
                      src={imageSrc} 
                      alt="Zoomed Flowchart" 
                      className="w-full h-full object-contain drop-shadow-[0_0_3px_rgba(255,255,255,0.9)]"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] pointer-events-none mix-blend-overlay" />
                </div>
              )}
            </div>
          );

          if (hasHover) {
            return interactiveContent;
          }

          return (
            <Dialog>
              <DialogTrigger asChild>
                {interactiveContent}
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-1 md:p-6 bg-black/95 border-white/10 flex flex-col items-center justify-center overflow-hidden">
                <DialogTitle className="sr-only">Interactive System Flowchart Full View</DialogTitle>
                <div className="w-full h-full overflow-auto flex items-center justify-center touch-pan-x touch-pan-y">
                  <img 
                    src={imageSrc} 
                    alt="System Flowchart Fullscreen" 
                    className="w-auto h-auto max-w-none md:max-w-full md:max-h-full min-w-full object-contain"
                    style={{ touchAction: 'pan-x pan-y pinch-zoom' }}
                  />
                </div>
              </DialogContent>
            </Dialog>
          );
        })()}
      </div>
    </section>
  );
}
