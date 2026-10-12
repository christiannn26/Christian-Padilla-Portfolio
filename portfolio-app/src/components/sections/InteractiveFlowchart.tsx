import { lazy, Suspense, useEffect, useRef, useState, type MouseEvent, type RefObject } from 'react';
import { ZoomIn } from 'lucide-react';
import { SearchIcon } from '../icons';
import { Reveal } from '../ui/Reveal';
import { FLOWCHART_ASPECT, flowchartMarkup } from '../flowchart/flowchartMarkup';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { FINE_POINTER, REDUCED_MOTION, matches } from '../../lib/media';
import { cn } from '../../lib/utils';
import { useStageNow } from '../../hooks/useActiveStage';

const FlowchartZoomDialog = lazy(() => import('../flowchart/FlowchartZoomDialog'));

const STAGE_SVG = flowchartMarkup('stage');
const LENS_SVG = flowchartMarkup('lens');

// One wave of gold pulses sweeps the diagram left to right, then rests.
const WAVE_MS = 5200;
const SWEEP_MS = 2600;

/**
 * Send a gold "lead" along every connector of the inline diagram, staggered by where
 * each connector starts, so signals visibly travel the system. Paused off-screen,
 * skipped entirely for reduced motion.
 */
function useFlowPulses(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    const svg = root?.querySelector('svg');
    if (!root || !svg || matches(REDUCED_MOTION)) return;

    const width = svg.viewBox.baseVal.width || 1;
    const animations: Animation[] = [];
    const pulses: SVGPathElement[] = [];

    svg.querySelectorAll<SVGPathElement>('path.flowchart-link').forEach((link) => {
      const length = link.getTotalLength();
      if (!length) return;

      const pulse = link.cloneNode() as SVGPathElement;
      pulse.removeAttribute('id');
      pulse.removeAttribute('marker-end');
      pulse.removeAttribute('marker-start');
      pulse.removeAttribute('style');
      pulse.setAttribute('class', 'flow-pulse');
      const dash = Math.min(26, length * 0.4);
      pulse.style.strokeDasharray = `${dash} ${length + dash}`;
      pulse.style.strokeDashoffset = `${dash}`;
      link.after(pulse);
      pulses.push(pulse);

      animations.push(
        pulse.animate(
          [
            { strokeDashoffset: dash, opacity: 0, offset: 0 },
            { strokeDashoffset: dash, opacity: 1, offset: 0.03, easing: 'cubic-bezier(0.65, 0, 0.35, 1)' },
            { strokeDashoffset: -length, opacity: 1, offset: 0.4 },
            { strokeDashoffset: -length, opacity: 0, offset: 0.44 },
            { strokeDashoffset: -length, opacity: 0, offset: 1 },
          ],
          { duration: WAVE_MS, delay: (link.getBBox().x / width) * SWEEP_MS, iterations: Infinity },
        ),
      );
    });

    const observer = new IntersectionObserver(([entry]) => {
      animations.forEach((animation) => (entry.isIntersecting ? animation.play() : animation.pause()));
    });
    observer.observe(root);

    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      pulses.forEach((pulse) => pulse.remove());
    };
  }, [rootRef]);
}

interface InteractiveFlowchartProps {
  zoomLevel?: number;
  lensSize?: number;
}

export default function InteractiveFlowchart({ zoomLevel = 1.9, lensSize = 240 }: InteractiveFlowchartProps) {
  const now = useStageNow('architecture');
  const hasHover = useMediaQuery(FINE_POINTER);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  useFlowPulses(artRef);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    if (containerSize.w !== rect.width || containerSize.h !== rect.height) {
      setContainerSize({ w: rect.width, h: rect.height });
    }
  };

  const R = lensSize / 2;
  const inspecting = isHovered && hasHover;

  // Desktop: hover loupe. Touch: tap opens a pinch-zoom dialog (see below).
  const viewer = (
    <div
      ref={containerRef}
      className={cn('relative w-full rounded-2xl', hasHover ? 'cursor-crosshair' : 'cursor-pointer')}
      onMouseEnter={() => hasHover && setIsHovered(true)}
      onMouseLeave={() => hasHover && setIsHovered(false)}
      onMouseMove={hasHover ? handleMouseMove : undefined}
    >
      <div
        ref={artRef}
        role="img"
        aria-label="System Flowchart"
        className={cn(
          'flowchart-art transition-[filter,opacity,transform] duration-500 ease-out-quint',
          inspecting && 'scale-[0.985] opacity-35 blur-[3px]',
        )}
        style={{ aspectRatio: FLOWCHART_ASPECT }}
        dangerouslySetInnerHTML={{ __html: STAGE_SVG }}
      />

      {/* Touch hint: tap to open the zoomable view */}
      {!hasHover && (
        <span className="glass pointer-events-none absolute bottom-2 right-2 grid h-10 w-10 place-items-center rounded-full">
          <ZoomIn className="h-4 w-4 text-gold" />
        </span>
      )}

      {/* The loupe (desktop only). Outer layer follows the cursor; inner layer owns the
          pop-in so the enter animation's transform never fights the positioning transform. */}
      {inspecting && containerSize.w > 0 && (
        <div
          className="pointer-events-none absolute left-0 top-0 z-20"
          style={{
            width: lensSize,
            height: lensSize,
            transform: `translate(${mousePos.x - R}px, ${mousePos.y - R}px)`,
          }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-full border border-gold/70 bg-ink-900 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.95)] animate-in fade-in zoom-in-85 duration-200 ease-out">
            <div
              className="absolute left-0 top-0"
              style={{
                width: containerSize.w,
                height: containerSize.h,
                transform: `translate(${-(mousePos.x - R)}px, ${-(mousePos.y - R)}px) scale(${zoomLevel})`,
                transformOrigin: `${mousePos.x}px ${mousePos.y}px`,
              }}
            >
              <div className="flowchart-art" aria-hidden dangerouslySetInnerHTML={{ __html: LENS_SVG }} />
            </div>
            {/* Reticle ticks and a soft inner falloff, like a jeweller's loupe */}
            <span aria-hidden className="absolute left-1/2 top-0 h-2.5 w-px -translate-x-1/2 bg-gold/70" />
            <span aria-hidden className="absolute bottom-0 left-1/2 h-2.5 w-px -translate-x-1/2 bg-gold/70" />
            <span aria-hidden className="absolute left-0 top-1/2 h-px w-2.5 -translate-y-1/2 bg-gold/70" />
            <span aria-hidden className="absolute right-0 top-1/2 h-px w-2.5 -translate-y-1/2 bg-gold/70" />
            <span aria-hidden className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgb(0_0_0/0.55)]" />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section id="architecture" {...now} className="stage-pad relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-[clamp(2.1rem,1.2rem+3.2vw,4.25rem)] leading-[1.02] tracking-tight text-ivory">
              System <span className="now-gold">Flowchart</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.08}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Every step is mapped, every action triggers automation, and every lead moves forward with intention.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-[1600px] px-3 md:px-6 lg:px-10">
        <div className="blueprint-grid relative rounded-4xl border border-line bg-ink-900/50 p-3 md:p-8 lg:p-10">
          <p className="mb-5 flex items-center justify-center gap-2.5 text-[0.8125rem] tracking-wide text-ivory/60 md:mb-8">
            {hasHover ? (
              <>
                <SearchIcon className="text-gold" />
                Hover over the diagram to closely inspect the workflow logic.
              </>
            ) : (
              <>
                <ZoomIn className="h-3.5 w-3.5 text-gold" />
                Tap on the diagram to expand and zoom.
              </>
            )}
          </p>

          {hasHover ? (
            viewer
          ) : (
            <Suspense fallback={viewer}>
              <FlowchartZoomDialog trigger={viewer} />
            </Suspense>
          )}
        </div>
      </div>
    </section>
  );
}
