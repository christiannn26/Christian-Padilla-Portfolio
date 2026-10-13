import { lazy, Suspense, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Grid, MonitorPlay } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { CoverflowCarousel, type CoverflowSlide } from '../ui/coverflow-carousel';
import { Reveal } from '../ui/Reveal';
import { SlideGrid } from '../portfolio/SlideGrid';
import { backgroundSlides, projectSlides } from '../portfolio/slides';
import { usePortfolioNav, type PortfolioTab } from '../../context/portfolioNav';
import { cn } from '../../lib/utils';
import { useStageNow } from '../../hooks/useActiveStage';

// Split out of the main bundle; the chunk is fetched right after first render, so opening stays instant.
const ProjectDetailsModal = lazy(() => import('../portfolio/ProjectDetailsModal'));

type ViewMode = 'carousel' | 'grid';

const THUMB_SPRING = { type: 'spring', bounce: 0.18, duration: 0.5 } as const;

/** The sliding thumb behind the active option of a segmented control. */
function Thumb({ id, className }: { id: string; className: string }) {
  return <motion.span layoutId={id} transition={THUMB_SPRING} className={cn('absolute inset-0 rounded-full', className)} />;
}

const SEGMENT = 'pressable relative rounded-full font-medium outline-none focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold';

function TabLabel({ value, active, children }: { value: PortfolioTab; active: PortfolioTab; children: ReactNode }) {
  return (
    <TabsTrigger
      value={value}
      className={cn(
        SEGMENT,
        'h-auto flex-1 px-2 py-2.5 text-[0.6875rem] min-[400px]:px-4 min-[400px]:text-[0.8125rem] sm:flex-none sm:px-6',
        'text-ivory/60 hover:text-ivory data-[state=active]:bg-transparent data-[state=active]:text-ink-950 data-[state=active]:shadow-none',
      )}
    >
      {active === value && (
        <Thumb
          id="portfolio-tab"
          className="bg-gold shadow-[inset_0_1px_0_rgb(255_250_238/0.6),0_0_0_1px_rgb(239_220_174/0.35),0_10px_24px_-10px_rgb(214_185_124/0.6)]"
        />
      )}
      <span className="relative z-10">{children}</span>
    </TabsTrigger>
  );
}

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
    <div className="mx-auto w-full max-w-6xl">
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
  const now = useStageNow('portfolio');
  const [viewMode, setViewMode] = useState<ViewMode>('carousel');
  // Tab and open modal are shared so the About badge can jump straight to the HLA certificate.
  const { tab, setTab, openSlide, setOpenSlide } = usePortfolioNav();

  const viewOption = (mode: ViewMode, icon: ReactNode, label: string) => (
    <button
      type="button"
      aria-pressed={viewMode === mode}
      onClick={() => setViewMode(mode)}
      className={cn(SEGMENT, 'px-4 py-2.5 text-[0.8125rem]', viewMode === mode ? 'text-ivory' : 'text-ivory/55 hover:text-ivory')}
    >
      {viewMode === mode && <Thumb id="portfolio-view" className="bg-white/10 shadow-[inset_0_1px_0_rgb(244_239_230/0.16)]" />}
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {label}
      </span>
    </button>
  );

  return (
    <section id="portfolio" {...now} className="stage-pad relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <Tabs value={tab} onValueChange={(value) => setTab(value as PortfolioTab)} className="relative z-10 w-full">
          <div className="mb-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <h2 className="type-section text-ivory">My Portfolio</h2>
            </Reveal>

            <div className="flex w-full flex-col items-start gap-3 sm:w-auto sm:flex-row sm:items-center">
              <TabsList className="flex h-auto w-full rounded-full border border-line-strong bg-ink-900/70 p-1 shadow-[inset_0_1px_0_rgb(244_239_230/0.06)] backdrop-blur-md sm:inline-flex sm:w-auto">
                <TabLabel value="projects" active={tab}>
                  Professional Background
                </TabLabel>
                <TabLabel value="background" active={tab}>
                  Background & Certificates
                </TabLabel>
              </TabsList>

              <div className="flex rounded-full border border-line bg-ink-900/50 p-1 shadow-[inset_0_1px_0_rgb(244_239_230/0.05)] backdrop-blur-md">
                {viewOption('carousel', <MonitorPlay className="h-4 w-4" />, 'Cinematic')}
                {viewOption('grid', <Grid className="h-4 w-4" />, 'Grid View')}
              </div>
            </div>
          </div>

          <TabsContent value="background" className="mt-0 w-full outline-none animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out-expo">
            <SlidesView slides={backgroundSlides} viewMode={viewMode} initialSlide={1} onSelect={setOpenSlide} />
          </TabsContent>

          <TabsContent value="projects" className="mt-0 w-full outline-none animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out-expo">
            <SlidesView slides={projectSlides} viewMode={viewMode} onSelect={setOpenSlide} />
          </TabsContent>
        </Tabs>

        <Suspense fallback={null}>
          <ProjectDetailsModal slide={openSlide} onClose={() => setOpenSlide(null)} />
        </Suspense>
      </div>
    </section>
  );
}
