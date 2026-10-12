import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FINE_POINTER, REDUCED_MOTION, matches } from '../lib/media';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface PointerHandlers {
  move: (e: PointerEvent, rect: DOMRect) => void;
  reset: () => void;
}

// Shared plumbing for pointer-follow effects: mouse only, skipped for reduced
// motion, and every tween/listener is torn down with the component.
function usePointerEffect<T extends HTMLElement>(setup: (el: T) => PointerHandlers) {
  const ref = useRef<T>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || matches(REDUCED_MOTION) || !matches(FINE_POINTER)) return;

    const { move, reset } = setup(el);
    const onPointerMove = (e: PointerEvent) => move(e, el.getBoundingClientRect());

    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('mouseleave', reset);
    el.addEventListener('pointercancel', reset);

    return () => {
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('mouseleave', reset);
      el.removeEventListener('pointercancel', reset);
    };
  });

  return ref;
}

/** Element drifts toward the cursor and springs back on leave. */
export const useMagnetic = <T extends HTMLElement>() =>
  usePointerEffect<T>((el) => {
    // quickTo is highly optimized for mouse following
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'elastic.out(1, 0.4)' });

    return {
      move: (e, rect) => {
        xTo((e.clientX - rect.left - rect.width / 2) * 0.3);
        yTo((e.clientY - rect.top - rect.height / 2) * 0.3);
      },
      reset: () => {
        xTo(0);
        yTo(0);
      },
    };
  });

/** Card tilts in 3D to face the cursor. */
export const use3DTilt = <T extends HTMLElement>() =>
  usePointerEffect<T>((el) => {
    // quickTo needs GSAP's canonical names; the CSS-style 'rotateX' alias silently never animates.
    const xTo = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power2.out' });
    const yTo = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power2.out' });
    gsap.set(el, { transformPerspective: 1000, transformStyle: 'preserve-3d' });

    return {
      move: (e, rect) => {
        // Cursor position from -0.5 to 0.5 relative to centre; y inverted for a natural feel
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        xTo(y * -15);
        yTo(x * 15);
      },
      reset: () => {
        xTo(0);
        yTo(0);
      },
    };
  });

/** Fades and lifts the element in as it scrolls into view (reverses on the way back up). */
export function useScrollReveal<T extends HTMLElement>(delay = 0, yOffset = 12) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (matches(REDUCED_MOTION)) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        el,
        { opacity: 0, y: yOffset },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    },
    { dependencies: [delay, yOffset] },
  );

  return ref;
}
