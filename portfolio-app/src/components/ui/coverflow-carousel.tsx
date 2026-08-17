"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Maximize2, ExternalLink } from "lucide-react";

import { cn } from "../../lib/utils";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "./dialog";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export interface CoverflowSlide {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  meta?: { label: string; value: string }[];
  content?: React.ReactNode;
  link?: string;
  gallery?: string[];
}

function GalleryScrollColumn({ slide }: { slide: CoverflowSlide }) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const node = scrollContainerRef.current;
    if (!node) return;

    let rafId: number;
    let isUserScrolling = false;
    let timeout: ReturnType<typeof setTimeout>;
    
    let scrollAccumulator = 0;
    const speed = 0.35; // Pixels per frame, slower for cinematic effect

    const startAutoScroll = () => {
      const step = () => {
        if (!isUserScrolling && node.scrollTop < (node.scrollHeight - node.clientHeight - 2)) {
          scrollAccumulator += speed;
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
      timeout = setTimeout(() => { isUserScrolling = false; }, 3000);
    };

    const handleTouchStart = () => {
      isUserScrolling = true;
      clearTimeout(timeout);
    };

    node.addEventListener('wheel', handleInteraction, { passive: true });
    node.addEventListener('touchstart', handleTouchStart, { passive: true });
    node.addEventListener('touchend', handleInteraction, { passive: true });
    node.addEventListener('mousedown', handleInteraction, { passive: true });

    const initialTimeout = setTimeout(startAutoScroll, 1000);

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

  return (
    <div 
      ref={scrollContainerRef}
      className="flex-1 h-[60vh] md:h-full overflow-y-auto custom-scrollbar bg-[#050505] min-h-0"
    >
      <div className="flex flex-col gap-px pb-20">
        <div className="w-full relative bg-slate-900 group">
          <img 
            src={slide.src} 
            alt={slide.alt} 
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-black/20 mix-blend-overlay pointer-events-none" />
        </div>
        
        {slide.gallery?.map((imgUrl, idx) => (
          <div key={idx} className="w-full relative bg-slate-900 group">
            <img 
              src={imgUrl} 
              alt={`${slide.title} gallery image ${idx + 1}`} 
              className="w-full h-auto object-cover"
            />
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

export interface CoverflowCarouselProps {
  slides: CoverflowSlide[];
  /** Degrees the first neighbour tilts. */
  rotate?: number;
  /** How far the first neighbour recedes, as a fraction of card width. */
  depth?: number;
  /** Viewer distance as a multiple of card width — smaller is a wider lens. */
  perspective?: number;
  /** Exponent on distance. Below 1 the rake eases off as cards travel out. */
  falloff?: number;
  /** Opacity lost per step from the centre. */
  fade?: number;
  /** Any CSS length. Everything else is derived from it, so the rake scales. */
  cardWidth?: string;
  /** Space between cards, as a fraction of card width. */
  gap?: number;
  loop?: boolean;
  showCaption?: boolean;
  showPagination?: boolean;
  showNavigation?: boolean;
  /** Names the carousel for assistive tech. */
  label?: string;
  className?: string;
  cardClassName?: string;
}

export function CoverflowCarousel({
  slides,
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = "clamp(148px, 22vw, 260px)",
  gap = 0.05,
  loop = true,
  showCaption = false,
  showPagination = false,
  showNavigation = false,
  label = "Cover carousel",
  className,
  cardClassName,
}: CoverflowCarouselProps) {
  const count = slides.length;

  const frameRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  /** Fractional card index at the centre. The single source of truth. */
  const posRef = React.useRef(0);
  /** Where the current settle is headed. Stepping off `pos` instead would
      swallow a keypress that lands mid-flight, before the round-off moves. */
  const targetRef = React.useRef(0);
  const widthRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  const dragRef = React.useRef<{
    id: number;
    startX: number;
    startTime: number;
    x: number;
    pos: number;
    v: number;
    t: number;
    targetIndex: number | null;
  } | null>(null);

  const [selected, setSelected] = React.useState(0);
  const [expandedSlide, setExpandedSlide] = React.useState<CoverflowSlide | null>(null);

  /** Nearest whole card, folded back into 0..count-1. */
  const indexAt = React.useCallback(
    (pos: number) => ((Math.round(pos) % count) + count) % count,
    [count],
  );

  // Paint straight to the DOM. Sixty state updates a second would re-render
  // every card for numbers React never needs to see.
  const paint = React.useCallback(() => {
    const width = widthRef.current;
    if (!width) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      // Fold the distance into the shorter way round the ring. This is the
      // whole looping mechanism — no cloned nodes, no shuffling the DOM.
      let offset = index - pos;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      // Both the tilt and the recession ease off as cards travel out —
      // doubling the distance adds only about half again as much of each.
      // A linear ramp folds the second card shut; this keeps it readable.
      const ramp = Math.pow(distance, falloff);
      // Capped short of edge-on so a far card never turns its back.
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);

      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

      // A card is teleported across the ring at exactly half a turn out, so it
      // has to be gone by then or the jump is visible.
      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
    });
  }, [count, depth, fade, falloff, gap, loop, rotate]);

  const settle = React.useCallback(
    (target: number) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      targetRef.current = target;
      setSelected(indexAt(target));

      const step = () => {
        const remaining = target - posRef.current;
        if (Math.abs(remaining) < 0.0004) {
          posRef.current = target;
          paint();
          rafRef.current = null;
          return;
        }
        // ponytail: exponential ease-out, not a spring. Swap in a spring only
        // if the settle needs overshoot.
        posRef.current += remaining * 0.16;
        paint();
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, paint],
  );

  const clamp = React.useCallback(
    (pos: number) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop],
  );

  const goTo = React.useCallback(
    (index: number) => {
      // Take the shorter way round rather than unwinding the whole ring.
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index;
      settle(clamp(target));
    },
    [clamp, count, loop, settle],
  );

  const nudge = React.useCallback(
    (by: number) => settle(clamp(Math.round(targetRef.current) + by)),
    [clamp, settle],
  );

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    
    const target = event.target as HTMLElement;
    const cardIndexStr = target.closest('[data-slide-index]')?.getAttribute('data-slide-index');
    const targetIndex = cardIndexStr !== undefined && cardIndexStr !== null ? parseInt(cardIndexStr, 10) : null;
    
    event.currentTarget.setPointerCapture(event.pointerId);
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startTime: performance.now(),
      x: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
      targetIndex,
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;

    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / pitch);
    // Cards per second, for the throw.
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;

    const index = indexAt(posRef.current);
    if (index !== selected) setSelected(index);
    paint();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    
    // Check if it was a click (moved less than 10px and took less than 400ms)
    const isClick = Math.abs(event.clientX - drag.startX) < 10 && (performance.now() - drag.startTime) < 400;
    
    if (isClick && drag.targetIndex !== null) {
      const index = drag.targetIndex;
      if (index === selected && slides[index].content) {
        setExpandedSlide(slides[index]);
      } else {
        goTo(index);
      }
      return;
    }

    // Let a flick carry, but never more than two cards.
    const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
    settle(clamp(Math.round(posRef.current + carried)));
  };

  // Card width drives pitch, depth and perspective, so it is the only thing
  // worth measuring — and only when the box actually changes.
  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  React.useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const active = slides[selected];

  return (
    <div
      className={cn("w-full relative", className)}
      style={{ ["--cf-card" as string]: cardWidth }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="relative">
        <div
          ref={frameRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              nudge(-1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              nudge(1);
            }
          }}
          // Vertical padding keeps the drop shadows clear of the overflow clip.
          className="cursor-grab overflow-hidden py-10 outline-none ring-ring focus-visible:ring-2 active:cursor-grabbing"
          style={{
            perspective: `calc(var(--cf-card) * ${perspective})`,
            // Horizontal drag is ours; the page keeps vertical scrolling.
            touchAction: "pan-y",
          }}
        >
          <div
            className="relative select-none"
            style={{
              height: "var(--cf-card)",
              transformStyle: "preserve-3d",
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                data-slide-index={index}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                className={cn(
                  "absolute left-1/2 top-0 aspect-[3/4] md:aspect-square overflow-hidden rounded-3xl bg-muted shadow-xl will-change-transform",
                  index === selected && slide.content ? "cursor-pointer" : "",
                  cardClassName,
                )}
                style={{ width: "var(--cf-card)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                  className="h-full w-full select-none object-cover"
                />
                
                <div className="absolute inset-0 bg-black/40 mix-blend-overlay pointer-events-none" />
                
                {index === selected && slide.content && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full shadow-[0_0_20px_-5px_rgba(250,249,246,0.2)]">
                      <Maximize2 className="h-6 w-6 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => nudge(-1)}
              className="absolute left-3 top-1/2 z-[200] -translate-y-1/2 rounded-full bg-white/5 border border-white/10 p-3 text-white backdrop-blur transition hover:bg-white/10 hover:border-accent/30 shadow-[inset_0_1px_0_rgba(250,249,246,0.1)]"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => nudge(1)}
              className="absolute right-3 top-1/2 z-[200] -translate-y-1/2 rounded-full bg-white/5 border border-white/10 p-3 text-white backdrop-blur transition hover:bg-white/10 hover:border-accent/30 shadow-[inset_0_1px_0_rgba(250,249,246,0.1)]"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {showCaption && active && (
        <div
          key={selected}
          className="mt-2 flex flex-col items-center px-6 duration-300 animate-in fade-in pb-16"
        >
          <p className="text-3xl font-bold tracking-tight text-white font-heading text-center">
            {active.title}
          </p>
          {active.subtitle && (
            <p className="mt-2 text-sm text-accent font-semibold tracking-[0.2em] uppercase text-center">
              {active.subtitle}
            </p>
          )}
          
          {active.content && (
            <button 
              onClick={() => setExpandedSlide(active)}
              className="mt-6 group relative inline-flex h-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 px-8 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-accent/30 focus:outline-none backdrop-blur-md shadow-[inset_0_1px_0_rgba(250,249,246,0.1)]"
            >
              <span className="relative z-10 flex items-center pointer-events-none">
                <Maximize2 className="mr-3 h-4 w-4 text-accent transition-transform group-hover:scale-110" />
                View Full Details
              </span>
            </button>
          )}
        </div>
      )}

      {showPagination && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selected}
              onClick={() => goTo(index)}
              className={cn(
                "size-2 rounded-full bg-white transition-opacity",
                index === selected ? "opacity-100" : "opacity-30",
              )}
            />
          ))}
        </div>
      )}

      {/* Expanded Modal / Shadcn Dialog */}
      <Dialog open={!!expandedSlide} onOpenChange={(open) => !open && setExpandedSlide(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-[90vw] h-[95vh] md:h-[90vh] bg-slate-950/80 backdrop-blur-2xl border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,1)] text-white p-0 overflow-hidden rounded-[2rem] gap-0 flex flex-col min-h-0">
          <div className="flex flex-col md:flex-row h-full w-full flex-1 min-h-0">
            
            {/* Left Column: Sticky Content Section */}
            <div className="w-full md:w-1/3 flex flex-col h-[40vh] md:h-full border-b md:border-b-0 md:border-r border-white/10 bg-slate-950/50 shrink-0 min-h-0">
              <div className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto custom-scrollbar">
                <div className="mb-8">
                  <DialogTitle className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 leading-tight">{expandedSlide?.title}</DialogTitle>
                  <DialogDescription className="text-accent text-sm font-semibold tracking-[0.2em] uppercase">
                    {expandedSlide?.subtitle}
                  </DialogDescription>
                </div>

                {expandedSlide?.meta && expandedSlide.meta.length > 0 && (
                  <div className="flex flex-wrap gap-4 mb-10 pb-10 border-b border-white/10">
                    {expandedSlide.meta.map((row) => (
                      <div key={row.label} className="bg-white/5 rounded-xl px-5 py-3 border border-white/5 flex-1 min-w-[120px]">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5">{row.label}</p>
                        <p className="text-sm font-semibold text-white">{row.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="text-muted-foreground font-light leading-relaxed space-y-6 text-sm md:text-base pr-2">
                  {expandedSlide?.content}
                </div>
              </div>
              
              {/* Sticky Footer for Actions */}
              <div className="p-6 md:p-10 border-t border-white/10 bg-slate-950/80 backdrop-blur-md flex flex-wrap gap-4 mt-auto">
                {expandedSlide?.link && (
                  <a 
                    href={expandedSlide.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex h-14 items-center justify-center rounded-xl bg-accent px-8 text-sm font-bold text-accent-foreground shadow-[0_0_30px_-5px_rgba(229,211,179,0.4)] transition-all hover:bg-accent/90"
                  >
                    Visit Project <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                )}
                <DialogClose asChild>
                  <button className="flex-1 inline-flex h-14 items-center justify-center rounded-xl bg-white/5 border border-white/10 px-8 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/20">
                    Close Details
                  </button>
                </DialogClose>
              </div>
            </div>

            {/* Right Column: Scrollable Image Gallery with Auto-Scroll */}
            {expandedSlide && <GalleryScrollColumn slide={expandedSlide} />}
            
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
