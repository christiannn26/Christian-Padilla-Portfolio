import { useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { STAGES, type StageId } from '../../data/navigation';
import { useActiveStage } from '../../hooks/useActiveStage';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { FINE_POINTER } from '../../lib/media';

// Where the key light hangs while each stage is read (viewport %, scale, strength).
// It glides between them, so the light seems to find the section in front of you.
const RIG: Record<StageId, { x: number; y: number; s: number; o: number }> = {
  top: { x: 50, y: 30, s: 1, o: 0 },
  impact: { x: 26, y: 36, s: 1, o: 1 },
  architecture: { x: 54, y: 48, s: 1.15, o: 0.9 },
  systems: { x: 74, y: 32, s: 1, o: 1 },
  'deep-dives': { x: 30, y: 58, s: 1.05, o: 0.9 },
  portfolio: { x: 50, y: 54, s: 1.2, o: 1 },
  services: { x: 72, y: 40, s: 1, o: 0.9 },
  'tech-stack': { x: 38, y: 64, s: 0.95, o: 0.8 },
  about: { x: 28, y: 40, s: 1.05, o: 1 },
  contact: { x: 66, y: 48, s: 1.3, o: 1 },
};

// Lazy and floaty: the pool trails the pointer like a follow-spot operator catching up.
const FOLLOW_SPRING = { stiffness: 55, damping: 20, mass: 1 };

/** A broad, faint pool of light that follows the pointer across the stage. */
function CursorLight() {
  const rawX = useMotionValue(-2000);
  const rawY = useMotionValue(-2000);
  const x = useSpring(rawX, FOLLOW_SPRING);
  const y = useSpring(rawY, FOLLOW_SPRING);
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

  useEffect(() => {
    let first = true;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (first) {
        x.jump(e.clientX);
        y.jump(e.clientY);
        first = false;
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [rawX, rawY, x, y]);

  return (
    <motion.div
      className="absolute left-0 top-0 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(closest-side,rgb(239_220_174/0.06),rgb(239_220_174/0.02)_50%,transparent)] will-change-transform"
      style={{ transform }}
    />
  );
}

// The stage behind every section below the hero (the hero paints its own opaque ground, so
// none of this ever shows there). A near-black ground, three aurora ribbons breathing on
// loops of a minute or more, two keynote beams swaying from above, a key light that glides
// to the stage being read, a pointer-following pool, a lens vignette for depth, and grain
// so the large dark fields never band. Content always outranks it.
export default function Atmosphere() {
  const active = useActiveStage();
  const reduce = useReducedMotion();
  const fine = useMediaQuery(FINE_POINTER);
  const rig = RIG[STAGES[active].id];

  return (
    <div
      aria-hidden
      data-stage={STAGES[active].id}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[linear-gradient(180deg,#0a0a0c_0%,#060607_48%,#050506_100%)]"
    >
      {/* Aurora ribbons: champagne, a cool slate counter-light, a low amber bounce */}
      <div className="aurora-a absolute left-[-20vw] top-[4vh] h-[40vh] w-[100vw] rounded-full bg-[radial-gradient(closest-side,rgb(214_185_124/0.22),rgb(214_185_124/0.08)_45%,transparent_72%)] will-change-transform" />
      <div className="aurora-b absolute right-[-24vw] top-[30vh] h-[44vh] w-[96vw] rounded-full bg-[radial-gradient(closest-side,rgb(122_138_212/0.26),rgb(122_138_212/0.09)_45%,transparent_72%)] will-change-transform" />
      <div className="aurora-c absolute bottom-[-12vh] left-[6vw] h-[42vh] w-[88vw] rounded-full bg-[radial-gradient(closest-side,rgb(170_128_62/0.16),rgb(170_128_62/0.05)_45%,transparent_72%)] will-change-transform" />

      {/* Keynote beams: soft cones of light hung above the stage (desktop and tablet). The blur
          lives on the outer layer so it softens the cone's clipped edges. */}
      <div className="stage-beam absolute left-[12vw] top-[-14vh] h-[130vh] w-[34vw] origin-top blur-[28px] will-change-transform [--beam-from:-20deg] [--beam-to:-11deg] max-md:hidden">
        <div className="h-full w-full bg-[linear-gradient(180deg,rgb(244_239_230/0.19),rgb(244_239_230/0.06)_42%,transparent_80%)] [clip-path:polygon(46%_0,54%_0,100%_100%,0_100%)]" />
      </div>
      <div className="stage-beam stage-beam-late absolute right-[10vw] top-[-14vh] h-[130vh] w-[30vw] origin-top blur-[28px] will-change-transform [--beam-from:18deg] [--beam-to:9deg] max-md:hidden">
        <div className="h-full w-full bg-[linear-gradient(180deg,rgb(239_220_174/0.17),rgb(239_220_174/0.055)_42%,transparent_80%)] [clip-path:polygon(46%_0,54%_0,100%_100%,0_100%)]" />
      </div>

      {/* Key light on the stage being read */}
      <div
        className="key-light absolute left-0 top-0 h-[88vh] w-[88vh] rounded-full bg-[radial-gradient(closest-side,rgb(239_220_174/0.1),rgb(239_220_174/0.035)_48%,transparent)]"
        style={{
          transform: `translate3d(calc(${rig.x}vw - 50%), calc(${rig.y}vh - 50%), 0) scale(${rig.s})`,
          opacity: rig.o,
        }}
      />

      {fine && !reduce && <CursorLight />}

      {/* Lens vignette and the sheen falling from the top: the room has edges and a ceiling */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_130%_95%_at_50%_42%,transparent_52%,rgb(0_0_0/0.55)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[42vh] bg-[radial-gradient(ellipse_62%_100%_at_50%_0%,rgb(244_239_230/0.035),transparent)]" />
      <div className="stage-grain absolute inset-0" />
    </div>
  );
}
