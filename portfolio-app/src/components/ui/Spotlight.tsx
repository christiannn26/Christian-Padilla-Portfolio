import { useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { FINE_POINTER } from '../../lib/media';
import { cn } from '../../lib/utils';

// Near-critically damped: the light glides after the pointer without lagging it.
const SPRING = { stiffness: 420, damping: 40, mass: 0.6 };

interface SpotlightProps {
  /** Radius of the sheen on the face, in px. */
  size?: number;
  /** Strength of the sheen (ivory alpha). */
  sheen?: number;
  className?: string;
}

/**
 * A soft pool of light that follows the pointer across its parent record, and lights the
 * record's edge where the pointer is nearest, like a lamp passing over smoked glass.
 * Drop it inside any positioned, rounded element. Mouse only; it writes straight to the
 * DOM through motion values, so tracking never re-renders React.
 */
export function Spotlight({ size = 420, sheen = 0.07, className }: SpotlightProps) {
  const fine = useMediaQuery(FINE_POINTER);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, SPRING);
  const springY = useSpring(rawY, SPRING);
  const x = reduce ? rawX : springX;
  const y = reduce ? rawY : springY;
  const opacity = useMotionValue(0);
  const fade = useSpring(opacity, { stiffness: 200, damping: 30 });

  const face = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, rgb(244 239 230 / ${sheen}), transparent 62%)`;
  const edge = useMotionTemplate`radial-gradient(${size * 0.75}px circle at ${x}px ${y}px, rgb(239 220 174 / 0.7), rgb(214 185 124 / 0.18) 45%, transparent 70%)`;

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!fine || !host) return;

    const place = (e: PointerEvent, instant: boolean) => {
      const rect = host.getBoundingClientRect();
      rawX.set(e.clientX - rect.left);
      rawY.set(e.clientY - rect.top);
      if (instant) {
        springX.jump(rawX.get());
        springY.jump(rawY.get());
      }
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      place(e, true);
      opacity.set(1);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') place(e, false);
    };
    const onLeave = () => opacity.set(0);

    host.addEventListener('pointerenter', onEnter);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    return () => {
      host.removeEventListener('pointerenter', onEnter);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, [fine, rawX, rawY, springX, springY, opacity]);

  return (
    <span ref={ref} aria-hidden className={cn('pointer-events-none absolute inset-0 z-1 rounded-[inherit]', className)}>
      {fine && (
        <>
          <motion.span className="absolute inset-0 rounded-[inherit] mix-blend-screen" style={{ background: face, opacity: fade }} />
          <motion.span className="spotlight-edge absolute inset-0 rounded-[inherit]" style={{ background: edge, opacity: fade }} />
        </>
      )}
    </span>
  );
}
