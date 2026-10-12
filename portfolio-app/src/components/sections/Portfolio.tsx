import { useEffect, useState } from 'react';
import { Grid, MonitorPlay } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { CoverflowCarousel, type CoverflowSlide } from '../ui/coverflow-carousel';
import { SectionEyebrow } from '../ui/SectionEyebrow';
import { ProjectDetailsModal } from '../portfolio/ProjectDetailsModal';
import { SlideDetails } from '../portfolio/SlideDetails';
import { SlideGrid } from '../portfolio/SlideGrid';
import { BACKGROUND_SLIDES, PROJECT_SLIDES, type PortfolioSlide } from '../../data/portfolio';
import { SECTION_TITLE } from '../../lib/styles';
import { cn } from '../../lib/utils';

type ViewMode = 'carousel' | 'grid';

const toCoverflowSlide = ({ details, ...slide }: PortfolioSlide): CoverflowSlide => ({
  ...slide,
  content: <SlideDetails {...details} />,
});

const backgroundSlides = BACKGROUND_SLIDES.map(toCoverflowSlide);
const projectSlides = PROJECT_SLIDES.map(toCoverflowSlide);

const TAB_TRIGGER_CLASS =
  'rounded-xl px-2.5 min-[400px]:px-4 sm:px-8 py-3 text-[11px] min-[400px]:text-xs sm:text-sm font-medium text-muted-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-[0_0_20px_-5px_rgba(229,211,179,0.5)] transition-all duration-300';

const VIEW_TOGGLE_CLASS =
  'px-3 min-[400px]:px-4 py-2.5 rounded-xl text-xs min-[400px]:text-sm font-medium transition-all duration-300 flex items-center gap-1.5 min-[400px]:gap-2';

function SlidesView({
  slides,
  viewMode,
  initialSlide,
  onSelect,
}: {
  slides: CoverflowSlide[];
  viewMode: ViewMode;
  initialSlide?: number;
  onSelect: (slide: CoverflowSlide) => void;
}) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {viewMode === 'carousel' ? (
        <CoverflowCarousel
          slides={slides}
          initialSlide={initialSlide}
          showCaption
          showNavigation
          showPagination
          loop
          cardWidth="clamp(260px, 65vw, 320px)"
          gap={-0.15}
          fade={0.05}
          onSlideClick={onSelect}
        />
      ) : (
        <SlideGrid slides={slides} onSelect={onSelect} />
      )}
    </div>
  );
}

export default function Portfolio() {
  const [viewMode, setViewMode] = useState<ViewMode>('carousel');
  const [expandedSlide, setExpandedSlide] = useState<CoverflowSlide | null>(null);

  // Listen for badge click from About section
  useEffect(() => {
    const handleOpenHla = () => setExpandedSlide(backgroundSlides[0]);
    window.addEventListener('open-hla-certification', handleOpenHla);
    return () => window.removeEventListener('open-hla-certification', handleOpenHla);
  }, []);

  const viewToggle = (mode: ViewMode) =>
    cn(VIEW_TOGGLE_CLASS, viewMode === mode ? 'bg-accent text-accent-foreground shadow-[0_0_20px_-5px_rgba(229,211,179,0.5)]' : 'text-muted-foreground hover:text-white');

  return (
    <section id="portfolio" className="py-16 md:py-32 section-overlap pt-16 md:pt-24 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 relative z-10">
          <SectionEyebrow>Experience & Work</SectionEyebrow>
          <h3 className={SECTION_TITLE}>My Portfolio</h3>
        </div>

        <Tabs defaultValue="projects" className="w-full relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6">
            <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md">
              <TabsTrigger value="projects" className={TAB_TRIGGER_CLASS}>
                Professional Background
              </TabsTrigger>
              <TabsTrigger value="background" className={TAB_TRIGGER_CLASS}>
                Background & Certificates
              </TabsTrigger>
            </TabsList>

            <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md z-20">
              <button onClick={() => setViewMode('carousel')} className={viewToggle('carousel')}>
                <MonitorPlay className="w-3.5 h-3.5 min-[400px]:w-4 min-[400px]:h-4" />
                Cinematic
              </button>
              <button onClick={() => setViewMode('grid')} className={viewToggle('grid')}>
                <Grid className="w-4 h-4" />
                Grid View
              </button>
            </div>
          </div>

          <TabsContent value="background" className="mt-0 outline-none w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
            <SlidesView slides={backgroundSlides} viewMode={viewMode} initialSlide={1} onSelect={setExpandedSlide} />
          </TabsContent>

          <TabsContent value="projects" className="mt-0 outline-none w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
            <SlidesView slides={projectSlides} viewMode={viewMode} onSelect={setExpandedSlide} />
          </TabsContent>
        </Tabs>

        <ProjectDetailsModal slide={expandedSlide} onClose={() => setExpandedSlide(null)} />
      </div>
    </section>
  );
}
