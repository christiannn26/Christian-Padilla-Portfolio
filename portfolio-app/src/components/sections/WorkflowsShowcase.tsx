import { lazy, Suspense, useState } from 'react';
import { Maximize2, Play } from 'lucide-react';
import { WORKFLOWS, type Workflow } from '../../data/workflows';
import { FOCUS_RING, pressable } from '../../lib/a11y';
import { cn } from '../../lib/utils';
import { Reveal } from '../ui/Reveal';
import { Spotlight } from '../ui/Spotlight';
import { useMagnet } from '../../hooks/useMagnet';
import { useStageNow } from '../../hooks/useActiveStage';

// Modal + zoom/pan canvas (and react-zoom-pan-pinch) live in their own chunk.
const WorkflowModal = lazy(() => import('../workflows/WorkflowModal'));

// Bento: two tall tiles over three shorter ones.
const SPANS = ['md:col-span-3', 'md:col-span-3', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2'];
const HEIGHTS = ['h-72 md:h-104', 'h-72 md:h-104', 'h-64 md:h-80', 'h-64 md:h-80', 'h-64 md:h-80'];

export default function WorkflowsShowcase() {
  const now = useStageNow('deep-dives');
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  // The play button drifts toward the pointer anywhere over the cover
  const playRef = useMagnet<HTMLSpanElement>({ strength: 0.3, reach: 160, max: 22, inner: 0.3 });

  return (
    <section id="deep-dives" {...now} className="stage-pad relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="type-section text-ivory">
              <span className="now-gold">Automation Workflows</span>
              <br className="hidden md:block" /> That Run Behind the Scenes
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.08}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Each workflow handles a specific stage of the lead journey: capturing leads, booking calls, confirming appointments, recovering no-shows, and closing opportunities.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6">
          {WORKFLOWS.map((wf, i) => (
            <Reveal key={wf.id} className={SPANS[i]} delay={(i < 2 ? i : i - 2) * 0.07} y={30} scale={0.97} blur={10}>
              <div
                {...pressable(() => setSelectedWorkflow(wf))}
                className={cn(
                  FOCUS_RING,
                  'group relative cursor-pointer overflow-hidden rounded-[1.75rem] border border-line bg-ink-900',
                  'shadow-[inset_0_1px_0_rgb(244_239_230/0.08),0_32px_64px_-34px_rgb(0_0_0/0.95)]',
                  'transition-[border-color,scale] duration-500 ease-out-quint hover:border-gold/40 active:scale-[0.985] active:duration-150',
                  HEIGHTS[i],
                )}
              >
                <img
                  src={wf.thumbnailSrc}
                  alt={wf.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover opacity-70 invert hue-rotate-180 transition-[scale,opacity] duration-900 ease-out-quint group-hover:scale-[1.05] group-hover:opacity-100"
                />
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/35 to-transparent" />
                <Spotlight size={460} sheen={0.06} />

                <div className="absolute inset-x-0 bottom-0 z-2 flex items-end justify-between gap-4 p-6 md:p-7">
                  <h4 className="type-title text-ivory">{wf.title}</h4>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong bg-ink-950/60 text-ivory/70 backdrop-blur-sm transition-[background-color,border-color,color,scale] duration-300 ease-out-quint group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-ink-950">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* The walkthrough, staged like a screening */}
        <div className="mt-28 md:mt-36">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <h3 className="type-subsection text-ivory">See The System In Action</h3>
            <div className="mx-auto my-5 h-px w-16 bg-gold/60" />
            <p className="text-base leading-relaxed text-muted-foreground">
              Watch a full walkthrough of how these precise automation workflows interconnect to build a seamless, conversion-driven machine.
            </p>
          </Reveal>

          <div
            className={cn(
              FOCUS_RING,
              'group relative mx-auto aspect-video w-full max-w-6xl cursor-pointer overflow-hidden rounded-4xl border border-line-strong bg-ink-900',
              'shadow-[inset_0_1px_0_rgb(244_239_230/0.1),0_50px_100px_-40px_rgb(0_0_0/0.95)] transition-[border-color] duration-700 ease-out-quint hover:border-gold/35',
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
                  className="h-full w-full object-cover opacity-55 transition-[scale,opacity] duration-1000 ease-out-quint group-hover:scale-[1.025] group-hover:opacity-75"
                />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(6_6_7/0.7)_100%)]" />

                <Spotlight size={720} sheen={0.05} />

                {/* Play button */}
                <div className="pointer-events-none absolute inset-0 z-2 grid place-items-center">
                  <span ref={playRef} className="relative grid h-22 w-22 place-items-center">
                    <span aria-hidden className="absolute inset-0 rounded-full border border-gold/60 animate-signal" />
                    <span className="relative grid h-22 w-22 place-items-center rounded-full bg-gold text-ink-950 shadow-[inset_0_1px_0_rgb(255_250_238/0.55),0_0_0_6px_rgb(214_185_124/0.12),0_20px_50px_-15px_rgb(0_0_0/0.9)] transition-[scale,box-shadow] duration-300 ease-out-quint group-hover:scale-105 group-hover:shadow-[inset_0_1px_0_rgb(255_250_238/0.55),0_0_0_10px_rgb(214_185_124/0.14),0_20px_50px_-15px_rgb(0_0_0/0.9)] group-active:scale-[0.97]">
                      <Play data-magnet-inner className="ml-1 h-7 w-7 fill-current" />
                    </span>
                  </span>
                </div>
              </>
            ) : (
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/Y6sjEW6EaMU?autoplay=1&rel=0&modestbranding=1"
                title="System Action Demo"
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
    </section>
  );
}
