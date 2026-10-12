import type { CoverflowSlide } from '../ui/coverflow-carousel';
import { BACKGROUND_SLIDES, PROJECT_SLIDES, type PortfolioSlide } from '../../data/portfolio';
import { SlideDetails } from './SlideDetails';

const toCoverflowSlide = ({ details, ...slide }: PortfolioSlide): CoverflowSlide => ({
  ...slide,
  content: <SlideDetails {...details} />,
});

// Built once at module load so slide identity is stable across renders.
export const backgroundSlides = BACKGROUND_SLIDES.map(toCoverflowSlide);
export const projectSlides = PROJECT_SLIDES.map(toCoverflowSlide);

/** The HLA Automation Builder certificate, opened directly by the About badge. */
export const certificationSlide = backgroundSlides[0];
