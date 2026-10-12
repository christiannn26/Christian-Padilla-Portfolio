import { Maximize2 } from 'lucide-react';
import type { CoverflowSlide } from '../ui/coverflow-carousel';
import { FOCUS_RING, pressable } from '../../lib/a11y';
import { cn } from '../../lib/utils';

/** "Grid View" alternative to the coverflow carousel. */
export function SlideGrid({ slides, onSelect }: { slides: CoverflowSlide[]; onSelect: (slide: CoverflowSlide) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
      {slides.map((slide) => (
        <div
          key={slide.src}
          {...pressable(() => onSelect(slide))}
          className={cn(
            FOCUS_RING,
            'group relative aspect-square rounded-3xl overflow-hidden cursor-pointer bg-slate-900 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-accent/40 hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.3)] transition-all duration-500 will-change-transform hover:-translate-y-2',
          )}
        >
          <img
            src={slide.thumbSrc ?? slide.src}
            alt={slide.alt}
            loading="lazy"
            decoding="async"
            className={cn(
              'w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100',
              slide.imagePosition || 'object-top',
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <h4 className="text-2xl font-heading font-bold text-white mb-1 drop-shadow-md">{slide.title}</h4>
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">{slide.subtitle}</p>
            <div className="inline-flex h-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <Maximize2 className="mr-2 h-3 w-3 text-accent" />
              View Details
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
