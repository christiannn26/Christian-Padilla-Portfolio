import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { TOUCH_OR_SMALL } from '../../lib/media';

type Mode = 'free' | 'morph' | 'card';

const RING = 34;
const CARD_RING = 64;
const PAD = 6;
const POSITION_SPRING = { stiffness: 520, damping: 42, mass: 0.35 };
const SHAPE_SPRING = { stiffness: 380, damping: 34, mass: 0.5 };
const INTERACTIVE = 'a, button, [role="button"], [role="tab"]';

// A jewel dot that sits exactly on the pointer and a hairline ring that trails it on a
// spring. Over a button or link the ring morphs into that control's own shape (the
// way an iPad pointer does); over a large card it opens into a disc with an arrow.
// Desktop only. Mode lives here so pointer movement never re-renders the page.
export default function CustomCursor() {
  const isTouchOrSmall = useMediaQuery(TOUCH_OR_SMALL);
  const [mode, setMode] = useState<Mode>('free');

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const ringW = useMotionValue(RING);
  const ringH = useMotionValue(RING);
  const ringR = useMotionValue(RING / 2);
  const x = useSpring(ringX, POSITION_SPRING);
  const y = useSpring(ringY, POSITION_SPRING);
  const width = useSpring(ringW, SHAPE_SPRING);
  const height = useSpring(ringH, SHAPE_SPRING);
  const radius = useSpring(ringR, SHAPE_SPRING);

  useEffect(() => {
    if (isTouchOrSmall) return;

    let target: HTMLElement | null = null;
    let kind: Mode = 'free';
    let cornerRadius = 8;
    let px = -100;
    let py = -100;

    const place = () => {
      if (target && kind === 'morph') {
        const r = target.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const h = r.height + PAD * 2;
        // A slight pull toward the pointer keeps the outline feeling attached, not pinned.
        ringX.set(cx + (px - cx) * 0.06);
        ringY.set(cy + (py - cy) * 0.06);
        ringW.set(r.width + PAD * 2);
        ringH.set(h);
        ringR.set(Math.min(cornerRadius + PAD, h / 2));
        return;
      }
      const size = kind === 'card' ? CARD_RING : RING;
      ringX.set(px);
      ringY.set(py);
      ringW.set(size);
      ringH.set(size);
      ringR.set(size / 2);
    };

    const onMove = (e: MouseEvent) => {
      px = e.clientX;
      py = e.clientY;
      dotX.set(px);
      dotY.set(py);
      place();
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest?.(INTERACTIVE) as HTMLElement | null;
      let next: Mode = 'free';
      if (el) {
        const r = el.getBoundingClientRect();
        next = r.width <= 360 && r.height <= 96 ? 'morph' : 'card';
      }
      // Read once per hover: getComputedStyle on every move would force a style recalc each time
      if (el && el !== target) cornerRadius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 8;
      target = el;
      kind = next;
      setMode(next);
      place();
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('scroll', place, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('scroll', place);
    };
  }, [isTouchOrSmall, dotX, dotY, ringX, ringY, ringW, ringH, ringR]);

  if (isTouchOrSmall) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-100 h-1.5 w-1.5 rounded-full bg-gold"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: mode === 'morph' ? 0 : 1, scale: mode === 'morph' ? 0.5 : 1 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-99 grid place-items-center border"
        style={{ x, y, width, height, borderRadius: radius, translateX: '-50%', translateY: '-50%' }}
        animate={{
          borderColor: mode === 'free' ? 'rgba(214,185,124,0.45)' : 'rgba(214,185,124,0.75)',
          backgroundColor: mode === 'free' ? 'rgba(214,185,124,0)' : 'rgba(214,185,124,0.08)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <AnimatePresence>
          {mode === 'card' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <ArrowUpRight className="h-4 w-4 text-gold" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
