import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

/**
 * The sheet that rises over the hero stage and carries every section below it.
 * Its top edge catches the light like the rim of a glass plate, but only once the
 * sheet has actually lifted into view: while the hero fills the screen the rim is dark,
 * so the opening viewport is untouched.
 */
export default function ContentSheet({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.35'] });
  const rim = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <div
      ref={ref}
      className="relative z-20 -mt-10 rounded-t-[2.5rem] border-t border-line-strong bg-[linear-gradient(to_bottom,#060607_0px,rgb(6_6_7/0.22)_280px,rgb(6_6_7/0.22)_100%)] shadow-[0_-30px_60px_-20px_rgba(0,0,0,0.9)]"
    >
      <motion.div aria-hidden style={{ opacity: rim }} className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden rounded-t-[2.5rem]">
        <span className="absolute inset-x-[14%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(239_220_174/0.6)_50%,transparent)]" />
        <span className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_42%_100%_at_50%_0%,rgb(214_185_124/0.09),transparent_75%)]" />
      </motion.div>
      {children}
    </div>
  );
}
