import { lazy, Suspense, useState } from 'react';
import { Play } from 'lucide-react';
import { WORKFLOWS, type Workflow } from '../../data/workflows';
import { FOCUS_RING, pressable } from '../../lib/a11y';
import { SECTION_TITLE } from '../../lib/styles';
import { cn } from '../../lib/utils';
import { SectionEyebrow } from '../ui/SectionEyebrow';

// Modal + zoom/pan canvas (and react-zoom-pan-pinch) live in their own chunk.
const WorkflowModal = lazy(() => import('../workflows/WorkflowModal'));

export default function WorkflowsShowcase() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="w-full mt-16 md:mt-32 mb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <SectionEyebrow>Deep Dives</SectionEyebrow>
          <h3 className={cn(SECTION_TITLE, 'mb-6')}>
            <span className="text-accent drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">Automation Workflows</span>
            <br className="hidden md:block" /> That Run Behind the Scenes
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Each workflow handles a specific stage of the lead journey: capturing leads, booking calls, confirming appointments, recovering no-shows, and closing opportunities.
          </p>
        </div>

        {/* 3-2 Grid Alignment using flex-wrap */}
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
          {WORKFLOWS.map((wf) => (
            <div
              key={wf.id}
              {...pressable(() => setSelectedWorkflow(wf))}
              className={cn(
                FOCUS_RING,
                'group relative w-full sm:w-[calc(50%-16px)] md:w-[calc(33.333%-22px)] min-w-0 sm:min-w-[320px] max-w-[450px] h-64 md:h-96 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-accent/50 transition-colors bg-slate-900',
              )}
            >
              <img
                src={wf.thumbnailSrc}
                alt={wf.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-100"
              />

              {/* Gradient overlay bottom half */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 to-transparent flex items-end p-6">
                <h4 className="text-white font-bold text-lg leading-tight">{wf.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Full-width Video Showcase Container */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-heading mb-3">See The System In Action</h3>
            <div className="w-16 h-1 bg-accent/50 mx-auto mb-4 rounded-full" />
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              Watch a full walkthrough of how these precise automation workflows interconnect to build a seamless, conversion-driven machine.
            </p>
          </div>

          <div
            className={cn(
              FOCUS_RING,
              'relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-[0_0_50px_-15px_rgba(212,175,55,0.3)] group cursor-pointer',
            )}
            {...(isVideoPlaying ? {} : { ...pressable(() => setIsVideoPlaying(true)), 'aria-label': 'Play the system demo video' })}
          >
            {!isVideoPlaying ? (
              <>
                <img
                  src="./img/coverdemo.webp"
                  alt="System Demo Cover"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 bg-accent/90 backdrop-blur rounded-full flex items-center justify-center pl-2 shadow-[0_0_30px_rgba(212,175,55,0.6)] group-hover:scale-110 group-hover:bg-accent transition-all duration-300">
                    <Play className="w-8 h-8 text-slate-950 fill-current" />
                  </div>
                </div>
              </>
            ) : (
              <iframe
                className="w-full h-full absolute inset-0"
                src="https://www.youtube.com/embed/Y6sjEW6EaMU?autoplay=1&rel=0&modestbranding=1"
                title="System Action Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        <WorkflowModal workflow={selectedWorkflow} onClose={() => setSelectedWorkflow(null)} />
      </Suspense>
    </div>
  );
}
