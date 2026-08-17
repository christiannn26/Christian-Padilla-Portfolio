import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Checks if the user prefers reduced motion
const isReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Hook for Magnetic Button Effect
export const useMagnetic = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isReducedMotion()) return;

    // quickTo is highly optimized for mouse following
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "elastic.out(1, 0.4)" });

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      // Clamp the pull strength
      xTo(relX * 0.3);
      yTo(relY * 0.3);
    };

    const onPointerLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('mouseleave', onPointerLeave);
    el.addEventListener('pointercancel', onPointerLeave);

    return () => {
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('mouseleave', onPointerLeave);
      el.removeEventListener('pointercancel', onPointerLeave);
    };
  }, []);

  return ref;
};

// Hook for 3D Tilt Cards
export const use3DTilt = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isReducedMotion()) return;

    const xTo = gsap.quickTo(el, "rotateX", { duration: 0.6, ease: "power2.out" });
    const yTo = gsap.quickTo(el, "rotateY", { duration: 0.6, ease: "power2.out" });
    
    // Set perspective on parent or element
    gsap.set(el, { transformPerspective: 1000, transformStyle: "preserve-3d" });

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      // Calculate cursor position from -1 to 1 relative to center
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Tilt direction (invert y for natural feel)
      xTo(y * -15); 
      yTo(x * 15);
    };

    const onPointerLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('mouseleave', onPointerLeave);
    el.addEventListener('pointercancel', onPointerLeave);

    return () => {
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('mouseleave', onPointerLeave);
      el.removeEventListener('pointercancel', onPointerLeave);
    };
  }, []);

  return ref;
};

// Hook for generic scroll reveal (opacity and translation)
export const useScrollReveal = <T extends HTMLElement>(delay = 0, yOffset = 12) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(el, 
      { opacity: 0, y: yOffset },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        delay: delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, [delay, yOffset]);

  return ref;
};
