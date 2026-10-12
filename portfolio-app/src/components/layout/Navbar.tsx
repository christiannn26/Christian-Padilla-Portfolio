import { useState, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../../data/navigation';
import { scrollToSection } from '../../lib/smoothScroll';

const navigate = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault();
  scrollToSection(id);
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full glass-panel border-b-0 border-white/5 shadow-none transition-all duration-300">
      <div className="w-full px-8 md:px-16 h-20 flex items-center justify-between">
        <a
          href="#top"
          onClick={(e) => navigate(e, 'top')}
          className="flex items-center gap-3 font-heading font-bold text-2xl tracking-wide text-primary hover:text-accent transition-colors duration-300 cursor-pointer"
        >
          <img src="./img/CPlogo.png" alt="CP Logo" className="h-8 w-auto object-contain" />
          <span>
            Christian Padilla<span className="text-accent">.</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="space-x-8 text-sm font-medium hidden md:block uppercase tracking-widest text-xs">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => navigate(e, id)}
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="text-white hover:text-accent focus:outline-none p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (AnimatePresence lets the exit animation play) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-20 left-0 w-full glass-panel border-t border-white/10 shadow-2xl flex flex-col py-6 px-8 gap-6 z-50"
          >
            {NAV_ITEMS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  setIsMenuOpen(false);
                  navigate(e, id);
                }}
                className="text-white hover:text-accent font-medium tracking-widest uppercase text-sm"
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
