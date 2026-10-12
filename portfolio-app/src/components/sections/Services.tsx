import { motion, type Variants } from 'motion/react';
import { SERVICES, type Service } from '../../data/services';
import { cn } from '../../lib/utils';
import { Reveal } from '../ui/Reveal';
import { useStageNow } from '../../hooks/useActiveStage';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
};

// Bento: two wide, three narrow, then one full-width row to close the set.
const SPANS = ['md:col-span-3', 'md:col-span-3', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-6'];

// On mobile the cards stack as sticky sheets (each offset 20px lower); on md+ they sit in the bento.
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const wide = index === SERVICES.length - 1;

  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        'group sticky flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-ink-900 p-7 shadow-[0_-20px_40px_-20px_rgb(0_0_0/0.9)] md:static md:bg-ink-900/60 md:p-9 md:shadow-none',
        'transition-[border-color,translate] duration-500 ease-out-quint md:hover:-translate-y-1 md:hover:border-gold/30',
        wide && 'md:flex-row md:items-center md:gap-12',
        SPANS[index],
      )}
      style={{
        top: `calc(var(--card-base-top) + ${index * 20}px)`,
        zIndex: (index + 1) * 10,
      }}
    >
      <div className={cn('flex items-center gap-4', wide && 'md:w-[34%] md:shrink-0')}>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line-strong text-ivory/75 transition-colors duration-500 group-hover:border-gold/60 group-hover:text-gold">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </span>
        {wide && <h4 className="hidden font-display text-[1.75rem] leading-tight tracking-tight text-ivory md:block">{service.title}</h4>}
      </div>

      <h4 className={cn('mt-8 font-display text-[1.75rem] leading-tight tracking-tight text-ivory', wide && 'md:hidden')}>{service.title}</h4>
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
  return (
    <section id="services" {...now} className="stage-pad relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="sticky top-20 z-50 -mx-6 bg-ink-950 px-6 pb-2 pt-3 md:static md:mx-0 md:bg-transparent md:px-0 md:py-0">
          <Reveal>
            <h2 className="mb-8 font-display text-[clamp(2.1rem,1.2rem+3.2vw,4.25rem)] leading-[1.02] tracking-tight text-ivory md:mb-16">
              How I can help you scale
            </h2>
          </Reveal>
        </div>

        <motion.div
          className="flex flex-col gap-6 pb-32 [--card-base-top:200px] min-[400px]:[--card-base-top:184px] md:grid md:grid-cols-6 md:gap-4 md:pb-0"
          variants={containerVariants}
          initial="hidden"
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
