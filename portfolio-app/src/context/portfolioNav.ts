import { createContext, useContext } from 'react';
import type { CoverflowSlide } from '../components/ui/coverflow-carousel';

export type PortfolioTab = 'projects' | 'background';

export interface PortfolioNav {
  tab: PortfolioTab;
  setTab: (tab: PortfolioTab) => void;
  openSlide: CoverflowSlide | null;
  setOpenSlide: (slide: CoverflowSlide | null) => void;
  /** Switch to the certificates tab now and open the HLA certificate once the page has scrolled there. */
  showCertification: () => void;
}

export const PortfolioNavContext = createContext<PortfolioNav | null>(null);

export function usePortfolioNav() {
  const nav = useContext(PortfolioNavContext);
  if (!nav) throw new Error('usePortfolioNav must be used inside <PortfolioNavProvider>');
  return nav;
}
