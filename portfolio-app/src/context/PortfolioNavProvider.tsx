import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { CoverflowSlide } from '../components/ui/coverflow-carousel';
import { certificationSlide } from '../components/portfolio/slides';
import { PortfolioNavContext, type PortfolioTab } from './portfolioNav';

// Long enough for the 800ms desktop glide (and native smooth scroll) to land on #portfolio.
const OPEN_AFTER_SCROLL_MS = 900;

/** Shared portfolio state so other sections (the About badge) can drive the tab and modal. */
export function PortfolioNavProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<PortfolioTab>('projects');
  const [openSlide, setOpenSlide] = useState<CoverflowSlide | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(openTimer.current), []);

  const value = useMemo(
    () => ({
      tab,
      setTab,
      openSlide,
      setOpenSlide,
      showCertification: () => {
        setTab('background');
        clearTimeout(openTimer.current);
        openTimer.current = setTimeout(() => setOpenSlide(certificationSlide), OPEN_AFTER_SCROLL_MS);
      },
    }),
    [tab, openSlide],
  );

  return <PortfolioNavContext value={value}>{children}</PortfolioNavContext>;
}
