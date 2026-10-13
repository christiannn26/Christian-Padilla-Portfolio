import type { ReactNode } from 'react';
import { motion, useReducedMotion, type Transition } from 'motion/react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance it rises from, in px. */
  y?: number;
  /** Scale it grows from (1 for none). Records use ~0.96 so they seem to come forward. */
  scale?: number;
  /** Blur it focuses from, in px. */
  blur?: number;
}

/**
 * Content that settles into place as it scrolls in. Position and scale ride a spring with a
 * whisper of overshoot, so the element lands rather than stops; focus is pulled from a soft
 * blur on an expo curve. It starts faint rather than hidden, so nothing is lost if motion is
 * off or slow, and the blur filter is dropped once it lands. Phones skip the blur: animating a
 * filter on full-width blocks repaints them every frame.
 */
export function Reveal({ children, className, delay = 0, y = 22, scale = 1, blur = 8 }: RevealProps) {
  const reduce = useReducedMotion();
  const focusPull = useMediaQuery('(min-width: 768px)') ? blur : 0;
  const spring: Transition = { type: 'spring', visualDuration: 0.85, bounce: 0.16, delay };
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0.2, y, scale, filter: `blur(${focusPull}px)` }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ default: { duration: 0.9, ease: EASE_OUT_EXPO, delay }, y: spring, scale: spring }}
    >
      {children}
    </motion.div>
  );
}
