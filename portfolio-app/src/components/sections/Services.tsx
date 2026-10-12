import { motion, type Variants } from 'framer-motion';
import { SERVICES, type Service } from '../../data/services';
import { SECTION_TITLE } from '../../lib/styles';
import { SectionEyebrow } from '../ui/SectionEyebrow';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

// On mobile the cards stack as sticky sheets (each offset 20px lower); on md+ they sit in a grid.
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <motion.div
      variants={itemVariants}
      className="group relative p-8 h-full rounded-3xl glass-panel transition-all duration-300 overflow-hidden md:hover:-translate-y-2 sticky md:static"
      style={{
        top: `calc(var(--card-base-top) + ${index * 20}px)`,
        zIndex: (index + 1) * 10,
      }}
    >
      {/* Mobile background blocker for Android to prevent stacked cards from bleeding text */}
      <div className="absolute inset-0 bg-[#0a0a0c] md:hidden pointer-events-none" />

      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Soft ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent/20 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* NOTE: the translateZ styles below are load-bearing. They create stacking contexts that keep
          this content above the absolutely-positioned mobile background blocker. Do not remove. */}
      <div
        className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300 shadow-[0_0_15px_-3px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_20px_-3px_rgba(229,211,179,0.4)]"
        style={{ transform: 'translateZ(20px)' }}
      >
        <Icon className="h-6 w-6 text-white/80 group-hover:text-accent transition-colors" />
      </div>

      <h4 className="text-xl font-bold text-white mb-3 font-heading tracking-wide" style={{ transform: 'translateZ(30px)' }}>
        {service.title}
      </h4>
      <p className="text-muted-foreground leading-relaxed text-sm font-light" style={{ transform: 'translateZ(20px)' }}>
        {service.description}
      </p>

      <div className="mt-5 pt-4 border-t border-white/5" style={{ transform: 'translateZ(25px)' }}>
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em] mb-2.5">Powered By</p>
        <div className="flex flex-wrap gap-2">
          {service.poweredBy.map((tech) => (
            <span key={tech} className="px-2 py-1 rounded-md bg-accent/10 text-accent text-xs font-medium border border-accent/20">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-32 section-overlap pt-16 md:pt-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8 md:mb-20 sticky top-20 md:relative z-50 bg-background md:bg-transparent pt-2 pb-1 md:py-0 -mx-4 px-4 md:mx-0">
          <SectionEyebrow>Services</SectionEyebrow>
          <h3 className={SECTION_TITLE}>How I can help you scale</h3>
        </div>

        <motion.div
          className="flex flex-col gap-6 pb-32 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8 [--card-base-top:220px] min-[400px]:[--card-base-top:190px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          style={{ perspective: '1000px' }}
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
