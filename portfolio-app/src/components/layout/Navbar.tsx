import { useState, type MouseEvent } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { NAV_ITEMS, STAGES } from '../../data/navigation';
import { useActiveStage } from '../../hooks/useActiveStage';
import { scrollToSection } from '../../lib/smoothScroll';
import { cn } from '../../lib/utils';

const EASE = [0.23, 1, 0.32, 1] as const;

const navigate = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault();
  scrollToSection(id);
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const active = useActiveStage();
  const stage = STAGES[active];
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  const links = NAV_ITEMS.filter((item) => item.id !== 'contact');
  const contact = NAV_ITEMS.find((item) => item.id === 'contact')!;

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
      <nav aria-label="Main" className="glass relative mx-auto flex h-14 max-w-5xl items-center gap-2 rounded-full px-2 sm:pl-3">
        <div className="flex min-w-0 flex-col justify-center">
          <a
            href="#top"
            onClick={(e) => navigate(e, 'top')}
            className="pressable flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 text-ivory hover:text-gold-bright"
          >
            <img src="./img/CPlogo.webp" alt="CP Logo" className="h-7 w-auto object-contain" />
            <span className="font-display text-[1.0625rem] font-medium tracking-[-0.01em]">
              Christian Padilla<span className="text-gold">.</span>
            </span>
          </a>
          {/* Phones and tablets: the current stage as a second line under the wordmark */}
          <p
            className={cn(
              'label-caps overflow-hidden whitespace-nowrap pl-[2.9rem] text-[0.5625rem] tracking-[0.18em] text-ivory/55 transition-[max-height,opacity] duration-300 ease-out-quint lg:hidden',
              active === 0 ? 'max-h-0 opacity-0' : 'max-h-4 opacity-100',
            )}
          >
            <span className="tabular-nums text-gold">{String(active).padStart(2, '0')}</span> · {stage.label}
          </p>
        </div>

        {/* Where the visitor is in the pipeline right now */}
        <div className={cn('ml-1 hidden h-6 items-center gap-2.5 border-l border-line pl-4 transition-opacity duration-300 lg:flex', active === 0 && 'opacity-0')} aria-hidden={active === 0}>
          <span className="label-caps tabular-nums text-gold">{String(active).padStart(2, '0')}</span>
          <span className="relative block h-4 w-44 overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.span
                key={stage.id}
                className="label-caps absolute inset-0 whitespace-nowrap text-ivory/60"
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {stage.label}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>

        {/* Desktop links */}
        <div className="ml-auto hidden items-center gap-1 md:flex">
          {links.map(({ id, label }) => {
            const isCurrent = stage.id === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => navigate(e, id)}
                aria-current={isCurrent ? 'location' : undefined}
                className={cn(
                  'pressable relative rounded-full px-4 py-2 text-[0.8125rem] font-medium',
                  isCurrent ? 'text-ivory' : 'text-ivory/60 hover:text-ivory',
                )}
              >
                {label}
                {isCurrent && (
                  <motion.span
                    layoutId="nav-current"
                    className="absolute bottom-[3px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </a>
            );
          })}
          <a
            href={`#${contact.id}`}
            onClick={(e) => navigate(e, contact.id)}
            className="pressable group ml-2 inline-flex items-center gap-1.5 rounded-full bg-gold py-2.5 pl-5 pr-4 text-[0.8125rem] font-semibold text-ink-950 hover:bg-gold-bright"
          >
            {contact.label}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out-quint group-hover:-translate-y-px group-hover:translate-x-px" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="pressable ml-auto grid h-10 w-10 place-items-center rounded-full text-ivory hover:bg-white/6 md:hidden"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Mobile: the pipeline as a hairline stem growing along the bar */}
        <motion.span
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-7 -bottom-px h-px origin-left bg-gold/80 md:hidden"
        />
      </nav>

      {/* Mobile Dropdown Menu (AnimatePresence lets the exit animation play) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="glass mx-auto mt-2 max-w-5xl origin-top rounded-[1.75rem] p-2 md:hidden"
          >
            {NAV_ITEMS.map(({ id, label }, i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  setIsMenuOpen(false);
                  navigate(e, id);
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE, delay: 0.04 + i * 0.04 }}
                className={cn(
                  'pressable flex items-center justify-between rounded-[1.25rem] px-5 py-4',
                  id === 'contact' ? 'mt-1 bg-gold text-ink-950' : 'text-ivory hover:bg-white/5',
                )}
              >
                <span className="font-display text-[1.75rem] leading-none tracking-[-0.02em]">{label}</span>
                <ArrowUpRight className={cn('h-5 w-5', id === 'contact' ? 'text-ink-950' : 'text-gold')} />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
