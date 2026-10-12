import { useRef, useState, type MouseEvent } from 'react';
import { ZoomIn } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '../ui/dialog';
import { SearchIcon } from '../icons';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { FINE_POINTER } from '../../lib/media';
import { SECTION_TITLE } from '../../lib/styles';
import { cn } from '../../lib/utils';
import { SectionEyebrow } from '../ui/SectionEyebrow';

interface InteractiveFlowchartProps {
  imageSrc?: string;
  zoomLevel?: number;
  lensSize?: number;
}

export default function InteractiveFlowchart({ imageSrc = './img/Mermaid.svg', zoomLevel = 1.7, lensSize = 250 }: InteractiveFlowchartProps) {
  const hasHover = useMediaQuery(FINE_POINTER);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    if (containerSize.w !== rect.width || containerSize.h !== rect.height) {
      setContainerSize({ w: rect.width, h: rect.height });
    }
  };

  const R = lensSize / 2;

  // Desktop: hover magnifier. Touch: tap opens a pinch-zoom dialog (see below).
  const viewer = (
    <div
      ref={containerRef}
      className={cn('relative w-full overflow-hidden bg-transparent rounded-xl', hasHover ? 'cursor-crosshair touch-none' : 'cursor-pointer')}
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
            'w-full h-auto object-contain transition-all duration-300 drop-shadow-[0_0_3px_rgba(255,255,255,0.9)]',
            isHovered && hasHover ? 'blur-[5px] opacity-40 scale-[0.98]' : 'blur-0 opacity-100 scale-100',
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
      {isHovered && hasHover && containerSize.w > 0 && (
        <div
          className="absolute top-0 left-0 pointer-events-none overflow-hidden rounded-full border-2 border-accent bg-slate-900 shadow-[0_0_30px_rgba(212,175,55,0.5)] z-20 animate-in zoom-in-50 fade-in duration-200 ease-out"
          style={{
            width: lensSize,
            height: lensSize,
            transform: `translate(${mousePos.x - R}px, ${mousePos.y - R}px)`,
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
            <img src={imageSrc} alt="Zoomed Flowchart" className="w-full h-full object-contain drop-shadow-[0_0_3px_rgba(255,255,255,0.9)]" />
          </div>
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] pointer-events-none mix-blend-overlay" />
        </div>
      )}
    </div>
  );

  return (
    <section className="py-24 relative z-10 w-full">
      <div className="container mx-auto px-4 max-w-7xl text-center mb-16 relative z-10">
        <SectionEyebrow>Architecture</SectionEyebrow>
        <h3 className={cn(SECTION_TITLE, 'mb-6')}>
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
              <SearchIcon className="opacity-70" />
              Hover over the diagram to closely inspect the workflow logic.
            </>
          ) : (
            <>
              <ZoomIn className="w-3.5 h-3.5 opacity-70" />
              Tap on the diagram to expand and zoom.
            </>
          )}
        </p>

        {hasHover ? (
          viewer
        ) : (
          <Dialog>
            <DialogTrigger asChild>{viewer}</DialogTrigger>
            <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-1 md:p-6 bg-black/95 border-white/10 flex flex-col items-center justify-center overflow-hidden">
              <DialogTitle className="sr-only">Interactive System Flowchart Full View</DialogTitle>
              <div className="w-full h-full flex items-center justify-center">
                <TransformWrapper initialScale={1} minScale={1} maxScale={5} wheel={{ wheelDisabled: true }}>
                  <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                    <img src={imageSrc} alt="System Flowchart Fullscreen" className="max-w-full max-h-full object-contain" />
                  </TransformComponent>
                </TransformWrapper>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}
