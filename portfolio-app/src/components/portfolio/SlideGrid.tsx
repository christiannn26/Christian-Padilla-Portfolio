import { Maximize2 } from 'lucide-react';
import type { CoverflowSlide } from '../ui/coverflow-carousel';
import { FOCUS_RING, pressable } from '../../lib/a11y';
import { cn } from '../../lib/utils';
import { Spotlight } from '../ui/Spotlight';

/** "Grid View" alternative to the coverflow carousel. */
export function SlideGrid({ slides, onSelect }: { slides: CoverflowSlide[]; onSelect: (slide: CoverflowSlide) => void }) {
  return (
    <div className="grid grid-cols-1 gap-4 py-10 md:grid-cols-2 lg:grid-cols-3">
      {slides.map((slide) => (
        <div
          key={slide.src}
          {...pressable(() => onSelect(slide))}
          className={cn(
            FOCUS_RING,
            'group relative aspect-4/5 cursor-pointer overflow-hidden rounded-[1.75rem] border border-line bg-ink-800 shadow-[inset_0_1px_0_rgb(244_239_230/0.08),0_30px_60px_-30px_rgb(0_0_0/0.9)] transition-[border-color,translate,scale] duration-500 ease-out-quint hover:-translate-y-1 hover:border-gold/40 active:scale-[0.985] active:duration-150',
          )}
        >
          <img
            src={slide.thumbSrc ?? slide.src}
            alt={slide.alt}
            loading="lazy"
            decoding="async"
            className={cn(
              'h-full w-full object-cover opacity-80 transition-[scale,opacity] duration-700 ease-out-quint group-hover:scale-[1.04] group-hover:opacity-100',
              slide.imagePosition || 'object-top',
            )}
          />
          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/55 to-transparent" />
          <Spotlight size={400} sheen={0.06} />
          <div className="absolute inset-0 z-2 flex flex-col justify-end p-6 md:p-7">
            <h4 className="type-title text-ivory">{slide.title}</h4>
            <p className="label-caps mb-5 mt-2.5 leading-[1.6] text-ivory/60">{slide.subtitle}</p>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-line-strong bg-ink-950/50 px-4 py-2 text-xs font-semibold text-ivory backdrop-blur-md transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink-950">
              <Maximize2 className="h-3.5 w-3.5" />
              View Details
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
