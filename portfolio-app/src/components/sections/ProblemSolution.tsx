import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Repeat2 } from 'lucide-react';
import { FLIP_CARDS, type FlipCard } from '../../data/flipCards';
import { FOCUS_RING, pressable } from '../../lib/a11y';
import { cn } from '../../lib/utils';
import { Reveal } from '../ui/Reveal';
import { useStageNow } from '../../hooks/useActiveStage';

// Both faces centre their mark and copy on the card's axis, so the flip reads as one object turning.
// The stack hangs from a fixed top inset, so icons and titles share one line across the row.
const FACE = 'absolute inset-0 flex h-full w-full flex-col items-center text-center backface-hidden';

// Front: the problem. Back: the system that replaces it, the stage's gold "now" state.
// `card` (mobile sticky stack) gives each face its own surface; `strip` (desktop) is a column
// in a hairline-ruled pipeline row, so only the flipped solution takes a warm wash.
function FlipCardFaces({ card, variant }: { card: FlipCard; variant: 'card' | 'strip' }) {
  const { frontIcon: FrontIcon, backIcon: BackIcon } = card;
  const isCard = variant === 'card';
  return (
    <>
      <div className={cn(FACE, isCard ? 'record rounded-[1.75rem] p-7 pt-14' : 'px-8 pb-9 pt-12')}>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-strong text-ivory/55">
          <FrontIcon className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <div className="mt-6 max-w-68">
          <h3 className="type-title text-ivory">{card.frontTitle}</h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">{card.frontDesc}</p>
        </div>
        <Repeat2 aria-hidden className={cn('absolute h-4 w-4 text-ivory/25', isCard ? 'right-6 top-7' : 'right-8 top-9')} strokeWidth={1.5} />
      </div>

      <div
        className={cn(
          FACE,
          'transform-[rotateY(180deg)]',
          isCard ? 'rounded-[1.75rem] border border-gold/35 bg-[#15130f] p-7 pt-14 shadow-[0_24px_48px_-32px_rgb(0_0_0/0.9)]' : 'bg-gold/5 px-8 pb-9 pt-12',
        )}
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold text-ink-950">
          <BackIcon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <div className="mt-6 max-w-68">
          <h3 className="type-title text-gold-bright">{card.backTitle}</h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ivory/75">{card.backDesc}</p>
        </div>
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
    <div ref={trackRef} className="relative h-screen w-full" style={{ zIndex: (index + 1) * 10 }}>
      <div className="sticky top-[280px] h-[320px] w-full perspective-[1000px]">
        <motion.div className="relative h-full w-full transform-3d" style={{ rotateY }}>
          <FlipCardFaces card={card} variant="card" />
        </motion.div>
      </div>
    </div>
  );
}

// Column rules for the 2x2 (md) and 1x4 (lg) arrangements of the strip.
const STRIP_RULES = ['', 'md:border-l', 'md:border-t lg:border-l lg:border-t-0', 'md:border-l md:border-t lg:border-t-0'];

export default function ProblemSolution() {
  const now = useStageNow('impact');
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);

  return (
    <section id="impact" {...now} className="stage-pad relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header - Mobile Sticky / Desktop Static */}
        <div className="sticky top-20 z-50 -mx-6 bg-ink-950/95 px-6 pb-4 pt-4 md:static md:mx-0 md:bg-transparent md:px-0 md:py-0">
          <Reveal>
            <h2 className="max-w-4xl type-section text-ivory md:mb-16">
              Transforming <span className="text-ivory/40 line-through decoration-gold-deep/80 decoration-2">Broken Funnels</span>
              <br className="hidden md:block" /> Into <span className="now-gold">Structured Systems</span>
            </h2>
          </Reveal>
        </div>

        {/* Mobile Scroll Tracks (Hidden on Desktop) */}
        <div className="relative flex w-full flex-col md:hidden">
          {FLIP_CARDS.map((card, i) => (
            <MobileScrollFlipCard key={card.id} card={card} index={i} />
          ))}
        </div>

        {/* Desktop: one hairline-ruled pipeline row; hover (or click / Enter) flips a column to its solution */}
        <div className="hidden border-y border-line md:grid md:grid-cols-2 lg:grid-cols-4">
          {FLIP_CARDS.map((card, i) => {
            const isFlipped = flippedCardId === card.id;
            return (
              <Reveal key={card.id} delay={i * 0.06} className={STRIP_RULES[i]}>
                <div
                  className={cn(FOCUS_RING, 'group h-75 w-full cursor-pointer perspective-distant')}
                  {...pressable(() => setFlippedCardId(isFlipped ? null : card.id))}
                  aria-pressed={isFlipped}
                >
                  <div
                    className={cn(
                      'relative h-full w-full transition-transform duration-700 ease-out-quint transform-3d',
                      'lg:group-hover:transform-[rotateY(180deg)]',
                      isFlipped && 'transform-[rotateY(180deg)]',
                    )}
                  >
                    <FlipCardFaces card={card} variant="strip" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
