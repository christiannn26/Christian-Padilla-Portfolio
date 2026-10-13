import { lazy, Suspense, useEffect, useEffectEvent, useRef, useState, type PointerEvent, type RefObject } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { ZoomIn } from 'lucide-react';
import { SearchIcon } from '../icons';
import { Reveal } from '../ui/Reveal';
import { FLOWCHART_ASPECT, flowchartImageSrc, flowchartImageSrcWithFont, flowchartMarkup } from '../flowchart/flowchartMarkup';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { FINE_POINTER, REDUCED_MOTION, matches } from '../../lib/media';
import { cn } from '../../lib/utils';
import { useStageNow } from '../../hooks/useActiveStage';

const FlowchartZoomDialog = lazy(() => import('../flowchart/FlowchartZoomDialog'));

const STAGE_SVG = flowchartMarkup('stage');
const LENS_SRC = flowchartImageSrc('lens');

// One wave of gold pulses sweeps the diagram left to right, then rests.
const WAVE_MS = 5200;
const SWEEP_MS = 2600;

// Near-critically damped: the loupe glides onto the pointer without trailing or overshooting it.
const TRACK_SPRING = { stiffness: 1000, damping: 38, mass: 0.3 };

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
  const reduce = useReducedMotion();
  const [inspecting, setInspecting] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [lensSrc, setLensSrc] = useState(LENS_SRC);
  const containerRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  useFlowPulses(artRef);

  // Pointer position inside the diagram. Motion values write straight to the DOM, so
  // tracking never re-renders React; only entering and leaving change state.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, TRACK_SPRING);
  const springY = useSpring(rawY, TRACK_SPRING);
  const lx = reduce ? rawX : springX;
  const ly = reduce ? rawY : springY;

  const R = lensSize / 2;
  const lensX = useTransform(lx, (x) => x - R);
  const lensY = useTransform(ly, (y) => y - R);
  // The magnified copy is laid out at its final size, so moving it is pure compositing.
  const imageX = useTransform(lx, (x) => R - x * zoomLevel);
  const imageY = useTransform(ly, (y) => R - y * zoomLevel);
  const lensTransform = useMotionTemplate`translate3d(${lensX}px, ${lensY}px, 0)`;
  const imageTransform = useMotionTemplate`translate3d(${imageX}px, ${imageY}px, 0)`;

  // Swap in the copy with the page's typeface once it has been read from cache.
  useEffect(() => {
    if (!hasHover) return;
    let live = true;
    flowchartImageSrcWithFont('lens')
      .then((src) => live && setLensSrc(src))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [hasHover]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !hasHover) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasHover]);

  /** Moves the loupe to a viewport point. Returns false when the point is outside the diagram. */
  const trackTo = (clientX: number, clientY: number, instant: boolean) => {
    const el = containerRef.current;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return false;
    pointer.current = { x: clientX, y: clientY };
    rawX.set(x);
    rawY.set(y);
    if (instant) {
      springX.jump(x);
      springY.jump(y);
    }
    return true;
  };

  const onPointerEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    // Appear exactly under the pointer rather than sliding in from the last exit point.
    if (trackTo(e.clientX, e.clientY, true)) setInspecting(true);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const inside = trackTo(e.clientX, e.clientY, false);
    if (inside !== inspecting) setInspecting(inside);
  };

  // A still pointer over a scrolling page: keep the loupe under it, or close it once the
  // diagram has scrolled out from beneath.
  const onScroll = useEffectEvent(() => {
    if (!trackTo(pointer.current.x, pointer.current.y, true)) setInspecting(false);
  });

  // Belt and braces for the exits `pointerleave` can miss: scrolling, the pointer leaving
  // the window, or the tab losing focus.
  useEffect(() => {
    if (!inspecting) return;
    const hide = () => setInspecting(false);
    const followScroll = () => onScroll();
    const onLeaveWindow = (e: MouseEvent) => {
      if (!e.relatedTarget) hide();
    };
    window.addEventListener('scroll', followScroll, { passive: true });
    window.addEventListener('blur', hide);
    document.addEventListener('mouseout', onLeaveWindow);
    return () => {
      window.removeEventListener('scroll', followScroll);
      window.removeEventListener('blur', hide);
      document.removeEventListener('mouseout', onLeaveWindow);
    };
  }, [inspecting]);

  const showLens = inspecting && hasHover;

  // Desktop: hover loupe. Touch: tap opens a pinch-zoom dialog (see below).
  const viewer = (
    <div
      ref={containerRef}
      className={cn('relative w-full rounded-2xl', hasHover ? 'cursor-crosshair' : 'cursor-pointer')}
      onPointerEnter={hasHover ? onPointerEnter : undefined}
      onPointerMove={hasHover ? onPointerMove : undefined}
      onPointerLeave={hasHover ? () => setInspecting(false) : undefined}
    >
      <div
        ref={artRef}
        role="img"
        aria-label="System Flowchart"
        className={cn(
          'flowchart-art transition-opacity duration-300 ease-out-quint',
          showLens && 'opacity-30',
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

      {/* The loupe (desktop only). It stays mounted so the magnified image is decoded
          before the first hover; the outer layer follows the pointer and the inner layer
          owns the enter and exit, so the two transforms never fight. */}
      {hasHover && size.w > 0 && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-20 will-change-transform"
          style={{ width: lensSize, height: lensSize, transform: lensTransform }}
        >
          <div
            className={cn(
              'relative h-full w-full overflow-hidden rounded-full border border-gold/70 bg-ink-900 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.95)]',
              'transition-[opacity,scale] motion-reduce:transition-opacity',
              showLens
                ? 'scale-100 opacity-100 duration-200 ease-out-quint'
                : 'scale-90 opacity-0 duration-150 ease-out-quint motion-reduce:scale-100',
            )}
          >
            <motion.img
              src={lensSrc}
              alt=""
              draggable={false}
              className="absolute left-0 top-0 max-w-none select-none"
              style={{ width: size.w * zoomLevel, height: size.h * zoomLevel, transform: imageTransform }}
            />
            {/* Reticle ticks and a soft inner falloff, like a jeweller's loupe */}
            <span className="absolute left-1/2 top-0 h-2.5 w-px -translate-x-1/2 bg-gold/70" />
            <span className="absolute bottom-0 left-1/2 h-2.5 w-px -translate-x-1/2 bg-gold/70" />
            <span className="absolute left-0 top-1/2 h-px w-2.5 -translate-y-1/2 bg-gold/70" />
            <span className="absolute right-0 top-1/2 h-px w-2.5 -translate-y-1/2 bg-gold/70" />
            <span className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgb(0_0_0/0.55)]" />
          </div>
        </motion.div>
      )}
    </div>
  );

  return (
    <section id="architecture" {...now} className="stage-pad relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="type-section text-ivory">
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
        <div className="record relative rounded-4xl p-3 md:p-8 lg:p-10">
          {/* A light table: the blueprint grid is brightest under the diagram and fades out toward the rim */}
          <div
            aria-hidden
            className="blueprint-grid pointer-events-none absolute inset-0 rounded-[inherit] mask-[radial-gradient(ellipse_80%_75%_at_50%_50%,black_30%,transparent_100%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(ellipse_60%_55%_at_50%_55%,rgb(244_239_230/0.03),transparent_70%)]"
          />
          <p className="relative mb-5 flex items-center justify-center gap-2.5 text-[0.8125rem] tracking-wide text-ivory/60 md:mb-8">
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
