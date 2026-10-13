import { ArrowUp } from 'lucide-react';
import { REDUCED_MOTION, matches } from '../../lib/media';
import { useMagnet } from '../../hooks/useMagnet';

export default function Footer() {
  const topRef = useMagnet<HTMLButtonElement>({ strength: 0.28, reach: 36, max: 8, inner: 0.6 });
  const scrollToTop = () => {
    // Elegant smooth scroll to top matching the native/custom behavior of the app
    window.scrollTo({ top: 0, behavior: matches(REDUCED_MOTION) ? 'instant' : 'smooth' });
  };

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 px-6 py-12 md:flex-row md:items-end lg:px-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img src="./img/CPlogo.webp" alt="CP Logo" className="h-7 w-auto object-contain" />
            <span className="text-lg font-semibold tracking-[-0.02em] text-ivory">
              Christian Padilla<span className="text-gold">.</span>
            </span>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">Transforming complex workflows into intelligent, automated systems.</p>
        </div>

        <div className="flex flex-col items-start gap-5 md:items-end">
          <button
            ref={topRef}
            type="button"
            onClick={scrollToTop}
            className="pressable group inline-flex items-center gap-3 rounded-full text-ivory/70 hover:text-gold"
          >
            <span className="label-caps">Back to top</span>
            <span data-magnet-inner className="grid h-10 w-10 place-items-center rounded-full border border-line-strong shadow-[inset_0_1px_0_rgb(244_239_230/0.07)] transition-colors duration-300 group-hover:border-gold/50">
              <ArrowUp className="h-4 w-4 transition-transform duration-300 ease-out-quint group-hover:-translate-y-0.5" />
            </span>
          </button>
          <p className="text-xs tracking-wide text-ivory/55">© 2026 Padilla. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
