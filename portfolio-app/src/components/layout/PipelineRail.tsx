import { motion, useReducedMotion } from 'motion/react';
import { STAGES } from '../../data/navigation';
import { useActiveStage } from '../../hooks/useActiveStage';
import { scrollToSection } from '../../lib/smoothScroll';
import { cn } from '../../lib/utils';

const LAST = STAGES.length - 1;
// Node buttons are 20px tall, so the first and last node centres sit 10px inside the rail.
const at = (index: number) => `calc(10px + (100% - 20px) * ${index / LAST})`;

/**
 * The page as a pipeline. A single gold lead token travels the rail as the visitor
 * reads, stages behind it fill in, and the journey lands on Get In Touch.
 * Desktop only; phones get the hairline stem in the nav instead.
 */
export default function PipelineRail() {
  const active = useActiveStage();
  const reduce = useReducedMotion();
  const booked = active === LAST;

  return (
    <nav aria-label="Page stages" className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 min-[1400px]:block 2xl:left-8">
      <ol className="relative flex h-[min(56vh,520px)] flex-col justify-between">
        {/* Rail and the stem that grows behind the lead */}
        <span aria-hidden className="absolute bottom-2.5 left-1/2 top-2.5 w-px -translate-x-1/2 bg-line-strong" />
        <span
          aria-hidden
          className="absolute left-1/2 top-2.5 w-px origin-top -translate-x-1/2 bg-gold/70 transition-[height] duration-700 ease-out-quint"
          style={{ height: `calc((100% - 20px) * ${active / LAST})` }}
        />

        {STAGES.map((stage, i) => (
          <li key={stage.id} className="relative flex items-center">
            <button
              type="button"
              onClick={() => scrollToSection(stage.id)}
              aria-label={`${String(i).padStart(2, '0')} ${stage.label}`}
              aria-current={i === active ? 'step' : undefined}
              className="group relative grid h-5 w-5 place-items-center rounded-full"
            >
              <span
                className={cn(
                  'h-[7px] w-[7px] rounded-full border transition-colors duration-500',
                  i < active && 'border-gold-deep bg-gold-deep',
                  i === active && 'border-transparent bg-transparent',
                  i > active && 'border-ivory/30 bg-ink-950 group-hover:border-ivory/60',
                )}
              />
              {i === active ? (
                // The stage being read keeps its name on the rail, set along it so it never crowds the page
                <motion.span
                  key={stage.id}
                  aria-hidden
                  className="label-caps pointer-events-none absolute left-7 top-1/2 -translate-y-1/2 rotate-180 whitespace-nowrap text-ivory/55 [writing-mode:vertical-rl]"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                >
                  {stage.label}
                </motion.span>
              ) : (
                <span className="glass label-caps pointer-events-none absolute left-8 top-1/2 -translate-x-1 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-ivory/80 opacity-0 transition-[opacity,translate] duration-200 ease-out-quint group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                  <span className="mr-2 tabular-nums text-gold">{String(i).padStart(2, '0')}</span>
                  {stage.label}
                </span>
              )}
            </button>
          </li>
        ))}

        {/* The lead */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute left-1/2 grid h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 place-items-center"
          initial={false}
          animate={{ top: at(active) }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 140, damping: 18, mass: 0.8 }}
        >
          <span className="absolute inset-0 rounded-full bg-gold animate-signal" />
          <motion.span
            key={booked ? 'booked' : 'travelling'}
            className="relative h-3.5 w-3.5 rounded-full border border-ink-950/40 bg-gold"
            initial={booked && !reduce ? { scale: 0.6 } : false}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5, duration: 0.6 }}
          />
        </motion.span>
      </ol>
    </nav>
  );
}
