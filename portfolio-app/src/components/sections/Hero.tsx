import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, FileText } from 'lucide-react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { useMagnetic, use3DTilt } from '../../hooks/gsapEffects';
import { useStageNow } from '../../hooks/useActiveStage';
import { REDUCED_MOTION, matches } from '../../lib/media';
import VoxelTopographyGrid from '../ui/voxel-topography-grid';

gsap.registerPlugin(SplitText, useGSAP);

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contactRef = useMagnetic<HTMLButtonElement>();
  const cvRef = useMagnetic<HTMLAnchorElement>();
  const cardRef = use3DTilt<HTMLDivElement>();
  const reduce = useReducedMotion();
  const now = useStageNow('top');

  // Character-by-character headline reveal. SplitText and its tween are reverted with the component.
  useGSAP(() => {
    const headline = headlineRef.current;
    if (!headline) return;

    if (matches(REDUCED_MOTION)) {
      gsap.set(headline, { opacity: 1 });
      return;
    }

    const split = new SplitText(headline, { type: 'chars,words' });
    gsap.from(split.chars, {
      opacity: 0,
      y: 24,
      rotateX: -50,
      filter: 'blur(6px)',
      duration: 1,
      stagger: 0.018,
      ease: 'expo.out',
      delay: 0.25,
    });
  });

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16, filter: 'blur(6px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
          transition: { duration: 0.9, ease: EASE, delay },
        };

  return (
    <section id="top" {...now} className="relative flex min-h-svh w-full items-center overflow-hidden bg-ink-950">
      <VoxelTopographyGrid primaryColor="#26221b" peakColor="#e2c58a" tileSize={60} wireColor="rgba(214, 185, 124, 0.28)" />

      {/* Key light: a warm pool behind the portrait so the terrain catches gold even at rest */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(ellipse_45%_55%_at_72%_48%,rgb(214_185_124/0.16),transparent_70%)] mix-blend-screen"
      />

      {/* Stage vignette: the terrain fades into black at the edges and toward the sheet below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(ellipse_80%_70%_at_62%_45%,transparent_0%,rgb(6_6_7/0.35)_55%,rgb(6_6_7/0.85)_100%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-48 bg-linear-to-t from-ink-950 to-transparent" />

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 pt-32 lg:px-10 lg:pb-20 lg:pt-28">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="text-center lg:col-span-7 lg:text-left">
            <h1
              ref={headlineRef}
              className="font-display text-[clamp(2.5rem,1.4rem+4.2vw,4.75rem)] font-medium leading-[1.06] tracking-[-0.03em] text-ivory"
              style={{ perspective: '1000px' }}
            >
              <span>Automating Success Through AI</span> <br />
              <span className="now-gold">and Your GHL CRM.</span>
            </h1>

            <motion.p
              {...rise(0.45)}
              className="mx-auto mt-10 max-w-136 text-[1.0625rem] md:mt-12 leading-relaxed text-muted-foreground lg:mx-0 lg:text-lg"
            >
              I help service-based businesses turn leads into booked appointments through conversion-focused funnels, CRM
              architecture, and automated follow-up systems built inside GoHighLevel.
            </motion.p>

            <motion.div
              {...rise(0.6)}
              className="pointer-events-auto mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <button
                ref={contactRef}
                type="button"
                onClick={() => onNavigate?.('contact')}
                className="pressable group inline-flex h-13 w-full max-w-68 items-center justify-center gap-3 rounded-full bg-gold pl-7 pr-2 text-[0.9375rem] font-semibold text-ink-950 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.9)] hover:bg-gold-bright sm:w-auto"
              >
                <span className="pointer-events-none">Contact Now</span>
                <span className="pointer-events-none grid h-9 w-9 place-items-center rounded-full bg-ink-950/90 text-gold transition-transform duration-300 ease-out-quint group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>

              <a
                ref={cvRef}
                href="/Christian_Padilla_CV.pdf"
                download
                className="pressable group inline-flex h-13 w-full max-w-68 items-center justify-center gap-2.5 rounded-full border border-line-strong bg-ink-950/40 px-7 text-[0.9375rem] font-medium text-ivory backdrop-blur-sm hover:border-gold/50 hover:text-gold-bright sm:w-auto"
              >
                <span className="pointer-events-none">Download CV</span>
                <FileText className="pointer-events-none h-4 w-4 text-ivory/50 transition-colors group-hover:text-gold" />
              </a>
            </motion.div>
          </div>

          {/* The portrait as a pipeline record card */}
          <motion.div
            className="pointer-events-auto mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none"
            initial={reduce ? false : { opacity: 0, scale: 0.94, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.3 }}
          >
            <div className="relative" style={{ perspective: '1200px' }}>
              <div
                ref={cardRef}
                className="relative rounded-4xl border border-gold/40 bg-ink-900/80 p-2.5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.95)] backdrop-blur-sm"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Record header: live status */}
                <p className="label-caps flex items-center gap-3 px-3.5 pb-3.5 pt-2 text-ivory/80">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inset-0 rounded-full bg-gold animate-signal" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-gold" />
                  </span>
                  Elevating Operational Efficiency
                </p>
                <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-ink-800 lg:aspect-[5/5.4]" style={{ transform: 'translateZ(30px)' }}>
                  <img
                    src="./img/Hero_Face.webp"
                    alt="Christian Padilla"
                    className="h-full w-full object-cover"
                    decoding="async"
                    fetchPriority="high"
                  />
                  <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/25" />
                </div>
                {/* Record footer field */}
                <div className="flex items-center gap-4 px-3.5 pb-1.5 pt-4">
                  <span className="font-display text-[2.25rem] font-medium leading-none tabular-nums text-gold">10+</span>
                  <span className="h-9 w-px bg-line-strong" aria-hidden />
                  <span>
                    <span className="block text-sm font-semibold text-ivory">Systems Built</span>
                    <span className="block text-xs text-muted-foreground">Automated perfectly</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue: one light running down a hairline */}
      <div aria-hidden className="absolute bottom-16 left-1/2 z-10 hidden h-14 w-px -translate-x-1/2 overflow-hidden bg-line-strong lg:block">
        <span className="absolute inset-x-0 top-0 h-3.5 bg-gold animate-chase" />
      </div>
    </section>
  );
}
