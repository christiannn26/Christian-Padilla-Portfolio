import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FLIP_CARDS, type FlipCard } from '../../data/flipCards';
import { FOCUS_RING, pressable } from '../../lib/a11y';
import { cn } from '../../lib/utils';
import { SectionEyebrow } from '../ui/SectionEyebrow';

function FlipCardFaces({ card }: { card: FlipCard }) {
  const { frontIcon: FrontIcon, backIcon: BackIcon } = card;
  return (
    <>
      {/* Front Side: The Problem */}
      <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-slate-900/40 border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-lg">
        <FrontIcon className="w-10 h-10 text-muted-foreground/60 mb-6" strokeWidth={1.5} />
        <h4 className="text-white font-heading font-bold text-xl mb-3 tracking-wide">{card.frontTitle}</h4>
        <div className="w-8 h-px bg-white/10 mb-4" />
        <p className="text-muted-foreground text-sm leading-relaxed">{card.frontDesc}</p>
      </div>

      {/* Back Side: The Solution */}
      <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-slate-900 border border-accent/30 shadow-[0_0_40px_-10px_rgba(212,175,55,0.2)] rounded-2xl p-8 flex flex-col items-center justify-center text-center">
        <BackIcon className="w-10 h-10 text-accent mb-6 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" strokeWidth={1.5} />
        <h4 className="text-accent font-heading font-bold text-xl mb-3 tracking-wide">{card.backTitle}</h4>
        <div className="w-8 h-px bg-accent/30 mb-4" />
        <p className="text-slate-300 text-sm leading-relaxed">{card.backDesc}</p>
      </div>
    </>
  );
}

// Mobile: each card sticks while its 100vh track scrolls past, flipping as you go.
function MobileScrollFlipCard({ card, index }: { card: FlipCard; index: number }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 280px', 'end 280px'],
  });

  const rotateY = useTransform(scrollYProgress, [0, 0.6, 1], [0, 180, 180]);

  return (
    <div ref={trackRef} className="relative h-[100vh] w-full" style={{ zIndex: (index + 1) * 10 }}>
      <div className="sticky top-[280px] w-full h-[320px] [perspective:1000px]">
        <motion.div className="relative w-full h-full [transform-style:preserve-3d]" style={{ rotateY }}>
          <FlipCardFaces card={card} />
        </motion.div>
      </div>
    </div>
  );
}

export default function ProblemSolution() {
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);

  return (
    <div className="w-full mt-16 md:mt-32 mb-16 px-4 relative z-10">
      <div className="container mx-auto max-w-7xl">
        {/* Header - Mobile Sticky / Desktop Static */}
        <div className="text-center mb-10 md:mb-16 space-y-4 sticky top-20 z-50 bg-background md:bg-transparent md:static md:top-auto md:z-auto pt-4 pb-4 md:py-0 -mx-4 px-4 md:mx-0">
          <SectionEyebrow>The Impact</SectionEyebrow>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight font-heading mb-6">
            Transforming <span className="text-slate-400 line-through decoration-red-500/50 decoration-2">Broken Funnels</span>
            <br className="hidden md:block" /> Into <span className="text-accent drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">Structured Systems</span>
          </h3>
        </div>

        {/* Mobile Scroll Tracks (Hidden on Desktop) */}
        <div className="flex flex-col w-full md:hidden relative">
          {FLIP_CARDS.map((card, i) => (
            <MobileScrollFlipCard key={card.id} card={card} index={i} />
          ))}
        </div>

        {/* Desktop CSS Grid Layout (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {FLIP_CARDS.map((card) => {
            const isFlipped = flippedCardId === card.id;
            return (
              <div
                key={card.id}
                className={cn(FOCUS_RING, 'group w-full h-[280px] sm:h-[320px] [perspective:1000px] cursor-pointer rounded-2xl')}
                {...pressable(() => setFlippedCardId(isFlipped ? null : card.id))}
                aria-pressed={isFlipped}
              >
                <div
                  className={cn(
                    'relative w-full h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] [transform-style:preserve-3d]',
                    'lg:group-hover:[transform:rotateY(180deg)]',
                    isFlipped && '[transform:rotateY(180deg)]',
                  )}
                >
                  <FlipCardFaces card={card} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
