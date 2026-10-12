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
    <div ref={scrollContainerRef} className="h-[45%] min-h-0 flex-1 overflow-y-auto bg-ink-950 md:h-full">
      <div className="flex flex-col gap-1 p-1 pb-20">
        {images.map((src, idx) => (
          <div key={src} className="relative w-full overflow-hidden rounded-[1.25rem] bg-ink-800">
            <img src={src} alt={idx === 0 ? slide.alt : `${slide.title} gallery image ${idx}`} className="w-full h-auto object-cover" />
                      </div>
        ))}

        <div className="flex w-full flex-col items-center justify-center py-14">
          <div className="mb-4 h-px w-12 bg-gold/50"></div>
          <p className="label-caps text-ivory/45">End of Gallery</p>
        </div>
      </div>
    </div>
  );
}

interface ProjectDetailsModalProps {
  slide: CoverflowSlide | null;
  onClose: () => void;
}

export default function ProjectDetailsModal({ slide: requestedSlide, onClose }: ProjectDetailsModalProps) {
  // Keep the last slide on screen while the close animation plays.
  const slide = useLastNonNull(requestedSlide);

  return (
    <Dialog open={!!requestedSlide} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex h-[94vh] min-h-0 max-w-[96vw] flex-col gap-0 overflow-hidden rounded-4xl border-line-strong bg-ink-900 p-0 text-ivory shadow-[0_60px_120px_-40px_rgb(0_0_0/0.95)] md:h-[88vh] md:max-w-[min(92vw,1400px)]">
        <div className="flex flex-col md:flex-row h-full w-full flex-1 min-h-0">
          {/* Left Column: Sticky Content Section */}
          <div className="flex h-[55%] min-h-0 w-full shrink-0 flex-col border-b border-line bg-ink-900 md:h-full md:w-[40%] md:border-b-0 md:border-r lg:w-[36%]">
            <div className="flex-1 overflow-y-auto p-7 md:p-10 lg:p-12">
              <div className="mb-8">
                <DialogTitle className="mb-4 pr-12 font-display text-[clamp(2rem,1.4rem+1.6vw,3rem)] font-medium leading-[1.05] tracking-tight text-ivory">{slide?.title}</DialogTitle>
                {slide?.subtitle && <p className="label-caps leading-relaxed text-ivory/60">{slide.subtitle}</p>}
              </div>

              {/* Metadata Tags */}
              {slide?.meta && slide.meta.length > 0 && (
                <dl className="mb-10 grid grid-cols-2 gap-6 border-y border-line py-5">
                  {slide.meta.map((item) => (
                    <div key={item.label} className="flex flex-col gap-1.5">
                      <dt className="label-caps text-ivory/45">{item.label}</dt>
                      <dd className="text-[0.9375rem] font-medium text-ivory/90">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="max-w-none">{slide?.content}</div>
            </div>

            {slide?.link && (
              <div className="border-t border-line p-6 md:p-10">
                <a
                  href={slide.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pressable flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 font-semibold text-ink-950 hover:bg-gold-bright"
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
