import { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import type { CoverflowSlide } from '../ui/coverflow-carousel';
import { useLastNonNull } from '../../hooks/useLastNonNull';

const AUTO_SCROLL_SPEED = 0.35; // Pixels per frame, slower for cinematic effect
const AUTO_SCROLL_DELAY = 1000;
const RESUME_AFTER_INTERACTION = 3000;

// Gallery column that slowly auto-scrolls, pausing while the visitor scrolls it themselves.
function GalleryScrollColumn({ slide }: { slide: CoverflowSlide }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = scrollContainerRef.current;
    if (!node) return;

    let rafId: number;
    let isUserScrolling = false;
    let timeout: ReturnType<typeof setTimeout>;
    let scrollAccumulator = 0;

    const startAutoScroll = () => {
      const step = () => {
        if (!isUserScrolling && node.scrollTop < node.scrollHeight - node.clientHeight - 2) {
          scrollAccumulator += AUTO_SCROLL_SPEED;
          if (scrollAccumulator >= 1) {
            const add = Math.floor(scrollAccumulator);
            node.scrollTop += add;
            scrollAccumulator -= add;
          }
        }
        rafId = requestAnimationFrame(step);
      };
      rafId = requestAnimationFrame(step);
    };

    const handleInteraction = () => {
      isUserScrolling = true;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        isUserScrolling = false;
      }, RESUME_AFTER_INTERACTION);
    };

    const handleTouchStart = () => {
      isUserScrolling = true;
      clearTimeout(timeout);
    };

    node.addEventListener('wheel', handleInteraction, { passive: true });
    node.addEventListener('touchstart', handleTouchStart, { passive: true });
    node.addEventListener('touchend', handleInteraction, { passive: true });
    node.addEventListener('mousedown', handleInteraction, { passive: true });

    const initialTimeout = setTimeout(startAutoScroll, AUTO_SCROLL_DELAY);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(initialTimeout);
      clearTimeout(timeout);
      node.removeEventListener('wheel', handleInteraction);
      node.removeEventListener('touchstart', handleTouchStart);
      node.removeEventListener('touchend', handleInteraction);
      node.removeEventListener('mousedown', handleInteraction);
    };
  }, []);

  const images = [slide.src, ...(slide.gallery ?? [])];

  return (
    <div ref={scrollContainerRef} className="flex-1 h-[45%] md:h-full overflow-y-auto bg-[#050505] min-h-0">
      <div className="flex flex-col gap-px pb-20">
        {images.map((src, idx) => (
          <div key={src} className="w-full relative bg-slate-900 group">
            <img src={src} alt={idx === 0 ? slide.alt : `${slide.title} gallery image ${idx}`} className="w-full h-auto object-cover" />
            <div className="absolute inset-0 bg-black/20 mix-blend-overlay pointer-events-none" />
          </div>
        ))}

        <div className="w-full py-12 flex flex-col items-center justify-center opacity-30">
          <div className="w-12 h-1 bg-white/30 rounded-full mb-4"></div>
          <p className="text-xs uppercase tracking-widest text-white font-bold">End of Gallery</p>
        </div>
      </div>
    </div>
  );
}

interface ProjectDetailsModalProps {
  slide: CoverflowSlide | null;
  onClose: () => void;
}

export function ProjectDetailsModal({ slide: requestedSlide, onClose }: ProjectDetailsModalProps) {
  // Keep the last slide on screen while the close animation plays.
  const slide = useLastNonNull(requestedSlide);

  return (
    <Dialog open={!!requestedSlide} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] md:max-w-[90vw] h-[95vh] md:h-[90vh] bg-slate-950/80 backdrop-blur-2xl border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,1)] text-white p-0 overflow-hidden rounded-[2rem] gap-0 flex flex-col min-h-0">
        <div className="flex flex-col md:flex-row h-full w-full flex-1 min-h-0">
          {/* Left Column: Sticky Content Section */}
          <div className="w-full md:w-1/3 flex flex-col h-[55%] md:h-full border-b md:border-b-0 md:border-r border-white/10 bg-slate-950/50 shrink-0 min-h-0">
            <div className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
              <div className="mb-8">
                <DialogTitle className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 leading-tight">{slide?.title}</DialogTitle>
                {slide?.subtitle && <p className="text-accent text-sm tracking-[0.2em] uppercase font-bold">{slide.subtitle}</p>}
              </div>

              {/* Metadata Tags */}
              {slide?.meta && slide.meta.length > 0 && (
                <div className="flex flex-wrap gap-4 mb-10">
                  {slide.meta.map((item) => (
                    <div key={item.label} className="flex flex-col">
                      <span className="text-xs text-white/40 uppercase tracking-widest mb-1">{item.label}</span>
                      <span className="text-sm font-semibold text-white/90">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="max-w-none">{slide?.content}</div>
            </div>

            {slide?.link && (
              <div className="p-6 md:p-10 border-t border-white/10 bg-black/20">
                <a
                  href={slide.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-4 px-6 rounded-xl bg-accent text-accent-foreground font-bold hover:bg-accent/90 transition-colors gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  Visit Live Project
                </a>
              </div>
            )}
          </div>

          {/* Right Column: Scrollable Image Gallery with Auto-Scroll */}
          {slide && <GalleryScrollColumn key={slide.src} slide={slide} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
