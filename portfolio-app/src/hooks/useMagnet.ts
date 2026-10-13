import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'motion/react';
import { FINE_POINTER, REDUCED_MOTION, matches } from '../lib/media';

// A touch under-damped (ζ ≈ 0.8): the control leans toward the pointer and settles
// back with the faintest overshoot, like something on a soft spring.
const SPRING = { stiffness: 240, damping: 19, mass: 0.6 };

interface MagnetOptions {
  /** Share of the pointer's offset from centre the control follows. */
  strength?: number;
  /** How far beyond the control's edge the field reaches, in px. */
  reach?: number;
  /** Cap on the pull, in px. */
  max?: number;
  /** Extra travel for a `[data-magnet-inner]` child, relative to the control (parallax). */
  inner?: number;
}

const smoothstep = (edge0: number, edge1: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

/**
 * A magnetic field around a control: as the pointer approaches, the control leans toward
 * it on a spring and its `[data-magnet-inner]` content leans a little further. The pull
 * fades smoothly to zero at the edge of the field, so there is never a snap.
 *
 * Moves the element with the independent `translate` property, so it composes with
 * `transform` (the 0.97 press scale) instead of fighting it. Mouse only; off for reduced
 * motion; only listens while the control is on screen.
 */
export function useMagnet<T extends HTMLElement>({ strength = 0.3, reach = 48, max = 12, inner = 0.45 }: MagnetOptions = {}) {
  const ref = useRef<T>(null);
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, SPRING);
  const y = useSpring(targetY, SPRING);

  useEffect(() => {
    const el = ref.current;
    if (!el || matches(REDUCED_MOTION) || !matches(FINE_POINTER)) return;
    const innerEl = el.querySelector<HTMLElement>('[data-magnet-inner]');

    const render = () => {
      const dx = x.get();
      const dy = y.get();
      el.style.translate = `${dx}px ${dy}px`;
      if (innerEl) innerEl.style.translate = `${dx * inner}px ${dy * inner}px`;
    };
    const stopX = x.on('change', render);
    const stopY = y.on('change', render);

    const release = () => {
      targetX.set(0);
      targetY.set(0);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const rect = el.getBoundingClientRect();
      // Measure from the resting centre, not the displaced one
      const cx = rect.left + rect.width / 2 - x.get();
      const cy = rect.top + rect.height / 2 - y.get();
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const distance = Math.max(Math.abs(dx) / (rect.width / 2 + reach), Math.abs(dy) / (rect.height / 2 + reach));
      if (distance >= 1) return release();
      const pull = 1 - smoothstep(0.55, 1, distance);
      const clamp = (v: number) => Math.max(-max, Math.min(max, v));
      targetX.set(clamp(dx * strength * pull));
      targetY.set(clamp(dy * strength * pull));
    };

    let listening = false;
    const listen = (on: boolean) => {
      if (on === listening) return;
      listening = on;
      // Scrolling under a still mouse fires no pointermove, so let go rather than stay pulled
      if (on) {
        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('scroll', release, { passive: true });
      } else {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('scroll', release);
        release();
      }
    };
    const observer = new IntersectionObserver(([entry]) => listen(entry.isIntersecting));
    observer.observe(el);
    document.addEventListener('mouseleave', release);

    return () => {
      observer.disconnect();
      listen(false);
      document.removeEventListener('mouseleave', release);
      stopX();
      stopY();
      el.style.translate = '';
      if (innerEl) innerEl.style.translate = '';
    };
  }, [strength, reach, max, inner, targetX, targetY, x, y]);

  return ref;
}
