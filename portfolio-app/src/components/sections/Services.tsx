import type { CSSProperties } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { SERVICES, type Service } from '../../data/services';
import { cn } from '../../lib/utils';
import { Reveal } from '../ui/Reveal';
import { Spotlight } from '../ui/Spotlight';
import { useStageNow } from '../../hooks/useActiveStage';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

// Records come forward out of soft focus and land on a spring (faint, never invisible, at rest).
// Phones skip the focus pull: animating blur on full-width cards repaints them every frame.
const itemVariants: Variants = {
  hidden: (blur: number) => ({ opacity: 0.15, y: 36, scale: 0.97, filter: `blur(${blur}px)` }),
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transitionEnd: { filter: 'none' },
    transition: {
      default: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
      y: { type: 'spring', visualDuration: 0.85, bounce: 0.16 },
      scale: { type: 'spring', visualDuration: 0.85, bounce: 0.16 },
    },
  },
};

// Bento: two wide, three narrow, then one full-width row to close the set.
const SPANS = ['md:col-span-3', 'md:col-span-3', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-6'];

// On mobile the cards stack as sticky sheets (each offset 20px lower); on md+ they sit in the bento.
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const wide = index === SERVICES.length - 1;
  const focusPull = useMediaQuery('(min-width: 768px)') ? 10 : 0;

  return (
    <motion.div
      variants={itemVariants}
      custom={focusPull}
      className={cn(
        // Phones: opaque sheets that stack over each other. md+: smoked-glass records in the bento.
        // `relative` (not `static`) from md so the card stays the Spotlight's containing block.
        'group sticky top-(--stack-top) flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-ink-900 p-7 shadow-[inset_0_1px_0_rgb(244_239_230/0.07),0_-20px_40px_-20px_rgb(0_0_0/0.9)] md:relative md:top-auto md:record md:p-9',
        'transition-[border-color,translate] duration-500 ease-out-quint md:hover:-translate-y-1.5 md:hover:border-gold/30',
        wide && 'md:flex-row md:items-center md:gap-12',
        SPANS[index],
      )}
      style={{ '--stack-top': `calc(var(--card-base-top) + ${index * 20}px)`, zIndex: (index + 1) * 10 } as CSSProperties}
    >
      <Spotlight size={440} sheen={0.06} />

      <div className={cn('flex items-center gap-4', wide && 'md:w-[34%] md:shrink-0')}>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line-strong text-ivory/75 transition-[border-color,color,background-color,scale,box-shadow] duration-500 ease-out-quint group-hover:scale-110 group-hover:border-gold/60 group-hover:bg-gold/10 group-hover:text-gold group-hover:shadow-[inset_0_1px_0_rgb(239_220_174/0.25),0_0_0_5px_rgb(214_185_124/0.07)]">
          <Icon className="h-5 w-5 transition-[rotate] duration-700 ease-out-quint group-hover:-rotate-12" strokeWidth={1.5} />
        </span>
        {wide && <h4 className="hidden type-title text-ivory md:block">{service.title}</h4>}
      </div>

      <h4 className={cn('mt-8 type-title text-ivory', wide && 'md:hidden')}>{service.title}</h4>
      <p className={cn('mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted-foreground', wide && 'md:mt-0 md:flex-1')}>
        {service.description}
      </p>

      <div className={cn('mt-auto pt-8', wide && 'md:w-[30%] md:shrink-0 md:pt-0')}>
        <p className="label-caps mb-3 text-ivory/45">Powered By</p>
        <div className="flex flex-wrap gap-2">
          {service.poweredBy.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line-strong px-3 py-1 text-xs font-medium text-ivory/80 transition-colors duration-500 group-hover:border-gold/30"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const now = useStageNow('services');
  const reduce = useReducedMotion();
  return (
    <section id="services" {...now} className="stage-pad relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="sticky top-20 z-50 -mx-6 border-b border-line bg-ink-950/90 px-6 pb-2 pt-3 backdrop-blur-md md:static md:mx-0 md:border-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-filter-none">
          <Reveal>
            <h2 className="mb-8 type-section text-ivory md:mb-16">
              How I can help you scale
            </h2>
          </Reveal>
        </div>

        <motion.div
          className="flex flex-col gap-6 pb-32 [--card-base-top:200px] min-[400px]:[--card-base-top:184px] md:grid md:grid-cols-6 md:gap-4 md:pb-0"
          variants={containerVariants}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
