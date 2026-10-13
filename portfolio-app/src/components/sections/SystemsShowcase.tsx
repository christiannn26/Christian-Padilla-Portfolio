import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { FUNNEL_DEMOS, type FunnelDemo } from '../../data/funnels';
import { cn } from '../../lib/utils';
import { Reveal } from '../ui/Reveal';
import { Spotlight } from '../ui/Spotlight';
import { useMagnet } from '../../hooks/useMagnet';
import { usePaperTone } from '../../hooks/usePaperTone';
import { useStageNow } from '../../hooks/useActiveStage';

function FunnelCard({ item }: { item: FunnelDemo }) {
  const demoRef = useMagnet<HTMLAnchorElement>({ strength: 0.22, reach: 32, max: 7 });
  const paper = usePaperTone(item.image, 'rgb(236 235 232)');

  return (
    <article
      className={cn(
        'group record relative flex h-full flex-col rounded-[1.75rem] p-2',
        'transition-[border-color,translate,opacity] duration-500 ease-out-quint hover:border-gold/30 lg:hover:-translate-y-1.5',
        // The rest of the track steps back while one funnel is in focus
        'lg:group-has-[article:hover]/track:[&:not(:hover)]:opacity-55',
      )}
    >
      <Spotlight size={440} />

      {/* Each demo is a composed square mockup, shown whole and never cropped. On the swipe track
          the frame is square. On desktop it stands taller (4:5) like a print: the mockup sits at
          the foot of the frame and the paper it is composed on continues above it, in the exact
          tone of the mockup's own top margin (sampled from the image), deepening toward the top. */}
      <div className="edge-lit relative aspect-square overflow-hidden rounded-[1.25rem] bg-ink-800 lg:aspect-[4/5]">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 hidden h-[24%] opacity-90 transition-opacity duration-700 ease-out-quint group-hover:opacity-100 lg:block"
          style={{ backgroundImage: `linear-gradient(to bottom, color-mix(in srgb, ${paper} 72%, #0b0b0d), ${paper} 85%)` }}
        />
        <img
          src={item.image}
          alt={item.title}
          width={800}
          height={800}
          loading="lazy"
          decoding="async"
          className={cn(
            'relative h-full w-full object-contain opacity-90 transition-[opacity,scale] duration-700 ease-out-quint group-hover:scale-[1.035] group-hover:opacity-100',
            // Desktop: anchored to the foot of the print, growing up into the paper on hover; its
            // first rows fade in so the paper's grain starts softly
            'lg:absolute lg:inset-x-0 lg:bottom-0 lg:h-auto lg:origin-bottom lg:mask-[linear-gradient(to_bottom,transparent,black_2.5%)]',
          )}
        />
      </div>

      <div className="relative z-2 flex flex-1 flex-col px-3 pb-3 pt-5 lg:px-4 lg:pb-4 lg:pt-6">
        <h4 className="text-[1.375rem] leading-[1.25] tracking-[-0.022em] text-ivory lg:min-h-[2lh] lg:text-[1.125rem] xl:text-[1.375rem]">
          {item.title}
        </h4>

        <dl className="mb-6 mt-4 space-y-3 border-t border-line pt-4 text-[0.9375rem] leading-snug lg:mb-7 lg:mt-5 lg:pt-5">
          <div>
            <dt className="label-caps text-ivory/50">Type :</dt>
            <dd className="mt-1.5 text-ivory/85">{item.type}</dd>
          </div>
          <div>
            <dt className="label-caps text-ivory/50">Industry :</dt>
            <dd className="mt-1.5 text-ivory/85">{item.industry}</dd>
          </div>
        </dl>

        <a
          ref={demoRef}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'pressable group/link mt-auto inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-line-strong py-2.5 pl-5 pr-3',
            'text-[0.8125rem] font-semibold text-ivory hover:border-gold hover:bg-gold hover:text-ink-950',
          )}
        >
          <span data-magnet-inner>View Live Demo</span>
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white/6 transition-colors group-hover/link:bg-ink-950/15">
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out-quint group-hover/link:-translate-y-px group-hover/link:translate-x-px" />
          </span>
        </a>
      </div>
    </article>
  );
}

export default function SystemsShowcase() {
  const now = useStageNow('systems');
  const trackRef = useRef<HTMLUListElement>(null);
  // Below lg the track scrolls sideways; its position grows a gold stem, the pipeline in miniature.
  // The first funnel is in view from the start, so the stem opens a quarter full.
  const { scrollXProgress } = useScroll({ container: trackRef });
  const stem = useSpring(useTransform(scrollXProgress, [0, 1], [0.25, 1]), { stiffness: 220, damping: 32 });

  return (
    <section id="systems" {...now} className="stage-pad relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="type-section text-ivory">
              <span className="now-gold">The System</span> Behind Every Funnel
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.08}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Funnels capture the lead. Pipelines track the opportunity. Segmentation organizes contacts. Automation drives the process.
            </p>
          </Reveal>
        </div>

        {/* Same 7/5 split, alignment and paragraph style as the header above, so both rows read as one system */}
        <div className="mt-16 grid items-end gap-8 border-t border-line pt-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h3 className="type-subsection text-ivory">
              Designed To <span className="now-gold">Convert.</span> Built To <span className="now-gold">Track.</span>
            </h3>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.08}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Every page is mapped to a workflow, every action triggers automation, and every lead is tracked from first click to closed deal.
            </p>
          </Reveal>
        </div>
      </div>

      {/* The funnel track: always one row, and wider than the text column above it. Four columns
          from lg, breaking out of the container up to 1600px; from the `rail` breakpoint its side
          padding clears the pipeline rail. Below lg it is a snap-scrolling
          track that bleeds to the screen edges with the next funnel peeking in. */}
      <div className="mt-14 lg:mt-16 lg:px-6 rail:px-22 2xl:px-24">
        <ul
          ref={trackRef}
          aria-label="Live funnel demos"
          className={cn(
            // A scroller clips vertically too: the bottom padding is room for the cards' shadow to fade out
            'group/track track-scroll flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-9 pt-2',
            'lg:mx-auto lg:grid lg:max-w-400 lg:snap-none lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:p-0 2xl:gap-6',
          )}
        >
          {FUNNEL_DEMOS.map((item, i) => (
            <li key={item.title} className="w-[80%] max-w-88 shrink-0 snap-start sm:w-[46%] md:w-[40%] lg:w-auto lg:max-w-none">
              <Reveal className="h-full" delay={i * 0.07} y={34} scale={0.96} blur={10}>
                <FunnelCard item={item} />
              </Reveal>
            </li>
          ))}
        </ul>

        <div aria-hidden className="relative mx-auto mt-1 h-px w-28 overflow-hidden rounded-full bg-line-strong lg:hidden">
          <motion.span style={{ scaleX: stem }} className="absolute inset-0 origin-left bg-gold/80" />
        </div>
      </div>
    </section>
  );
}
