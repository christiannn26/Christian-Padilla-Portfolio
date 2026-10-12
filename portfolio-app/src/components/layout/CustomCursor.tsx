import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { TOUCH_OR_SMALL } from '../../lib/media';

const SPRING = { damping: 20, stiffness: 400, mass: 0.2 };

// Gold dot plus a trailing ring that swells over links and buttons. Desktop only.
// Hover state lives here so cursor movement never re-renders the page.
export default function CustomCursor() {
  const isTouchOrSmall = useMediaQuery(TOUCH_OR_SMALL);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, SPRING);
  const cursorYSpring = useSpring(cursorY, SPRING);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isTouchOrSmall) return;

    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const handleMouseOver = (e: MouseEvent) => {
      setIsHovering(!!(e.target as Element).closest?.('a, button'));
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouchOrSmall, cursorX, cursorY]);

  if (isTouchOrSmall) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-accent rounded-full pointer-events-none z-[100] shadow-[0_0_15px_rgba(229,211,179,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-accent/40 rounded-full pointer-events-none z-[99]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(229,211,179,0.05)' : 'transparent',
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
      />
    </>
  );
}
