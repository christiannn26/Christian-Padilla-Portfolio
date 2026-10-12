import { ArrowUpRight } from 'lucide-react';
import { FUNNEL_DEMOS } from '../../data/funnels';
import { cn } from '../../lib/utils';
import { Reveal } from '../ui/Reveal';
import { useStageNow } from '../../hooks/useActiveStage';

export default function SystemsShowcase() {
  const now = useStageNow('systems');
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

        {/* Each demo is a composed square mockup, so every frame is square and shows it whole */}
        <div className="mt-14 grid gap-4 md:grid-cols-2 md:gap-5">
          {FUNNEL_DEMOS.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.06}>
              <article className="group record flex h-full flex-col rounded-4xl p-2.5 transition-colors duration-500 hover:border-gold/30">
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-ink-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain opacity-90 transition-opacity duration-700 ease-out-quint group-hover:opacity-100"
                  />
                  <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5" />
                </div>

                <div className="flex flex-1 flex-col gap-6 px-4 pb-4 pt-7 md:px-6">
                  <h4 className="type-title text-ivory">{item.title}</h4>

                  <dl className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-3 border-t border-line pt-5 text-[0.9375rem]">
                    <dt className="label-caps text-ivory/50">Type :</dt>
                    <dd className="text-ivory/85">{item.type}</dd>
                    <dt className="label-caps text-ivory/50">Industry :</dt>
                    <dd className="text-ivory/85">{item.industry}</dd>
                  </dl>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'pressable group/link mt-auto inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-line-strong py-2.5 pl-5 pr-3',
                      'text-[0.8125rem] font-semibold text-ivory hover:border-gold hover:bg-gold hover:text-ink-950',
                    )}
                  >
                    View Live Demo
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-white/6 transition-colors group-hover/link:bg-ink-950/15">
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out-quint group-hover/link:-translate-y-px group-hover/link:translate-x-px" />
                    </span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
