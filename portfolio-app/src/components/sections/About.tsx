import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { usePortfolioNav } from '../../context/portfolioNav';
import { useScrollReveal, use3DTilt } from '../../hooks/gsapEffects';
import { Reveal } from '../ui/Reveal';
import { useStageNow } from '../../hooks/useActiveStage';

const VALUE_PROPS = ['Funnel Strategist', 'Landing Page Designer', 'Full CRM & Automation Builder'];

interface AboutProps {
  onNavigate?: (id: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const now = useStageNow('about');
  const textRef = useScrollReveal<HTMLDivElement>();
  const imageRef = useScrollReveal<HTMLDivElement>(0.2);
  const cardRef = use3DTilt<HTMLDivElement>();
  const { showCertification } = usePortfolioNav();

  return (
    <section id="about" {...now} className="stage-pad relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-14">
          {/* Portrait in a tilting frame, with the HLA badge floating off its corner */}
          <div ref={imageRef} className="mx-auto w-full max-w-md lg:sticky lg:top-28 lg:col-span-5 lg:max-w-none" style={{ perspective: '1200px' }}>
            <div
              ref={cardRef}
              className="relative cursor-pointer rounded-4xl border border-line-strong bg-ink-900/70 p-2.5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.95)]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-ink-800" style={{ transform: 'translateZ(30px)' }}>
                <img
                  src="./img/abotme.webp"
                  alt="About Christian Padilla"
                  className="pointer-events-none h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/25" />
              </div>

              {/* HLA Badge */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate?.('portfolio');
                  showCertification();
                }}
                className="absolute -bottom-6 -right-4 z-30 h-33 w-33 cursor-pointer rounded-full transition-[scale] duration-300 ease-out-quint hover:scale-[1.06] active:scale-[0.97] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold md:h-38 md:w-38 md:-right-6"
                style={{
                  animation: 'badgeFloat 4s ease-in-out infinite',
                  filter: 'drop-shadow(0 18px 24px rgb(0 0 0 / 0.65))',
                }}
                aria-label="View HLA Automation Builder Certification"
              >
                <img
                  src="./img/badge.webp"
                  alt="HLA Automation Builder Badge"
                  className="pointer-events-none h-full w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            </div>
          </div>

          <div ref={textRef} className="lg:col-span-7 lg:pt-2">
            <h2 className="font-display text-[clamp(2rem,1.2rem+2.6vw,3.6rem)] leading-[1.08] tracking-tight text-ivory">
              <span className="now-gold">Hi! I'm Christian</span> <br />{' '}
              <span>I design intelligent lead systems and streamline operations for businesses.</span>
            </h2>

            <div className="mt-10 max-w-[62ch] space-y-5 text-[1.0625rem] font-light leading-[1.8] text-muted-foreground">
              <p className="text-ivory/85">
                I partner with service businesses to transform their offers into high-converting funnels, landing pages, and backend
                architectures that seamlessly transition leads from casual interest to booked calls and inquiries.
              </p>
              <p>
                My approach always begins with strategy: mapping out your audience, traffic sources, trust signals, and the specific action we
                need visitors to take. Once the strategy is set, I design and develop the front-end funnel, then wire up the entire
                backend—integrating the CRM, sales pipelines, email/SMS workflows, appointment reminders, and follow-up sequences so the ecosystem
                operates flawlessly beyond the initial click.
              </p>
              <p>
                While my core specialty is GoHighLevel, my expertise spans comprehensive funnel strategy, CRM architecture, advanced
                automations, custom ReactJS web development, and complex integrations using Zapier, Make, and n8n.
              </p>
            </div>

            <div className="mt-14">
              <h3 className="mb-2 font-display text-[1.5rem] tracking-tight text-ivory">Core Value Proposition</h3>
              <ul className="border-b border-line">
                {VALUE_PROPS.map((prop, i) => (
                  <motion.li
                    key={prop}
                    className="flex items-center gap-4 border-t border-line py-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/40 text-gold">
                      <Check className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <span className="text-[1rem] font-medium text-ivory/90">{prop}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Unified Call to Action */}
        <Reveal className="mt-32 flex w-full flex-col items-center border-t border-line pt-24 text-center md:mt-40">
          <h3 className="max-w-4xl font-display text-[clamp(2.2rem,1.2rem+3.4vw,4.5rem)] leading-[1.08] tracking-tight text-ivory">
            Ready to Turn Your Leads Into <span className="now-gold">Booked Calls</span>?
          </h3>
          <p className="mb-10 mt-10 max-w-2xl text-lg font-light text-muted-foreground md:mt-12 lg:text-xl">Let's map out your funnel system, Book a Free Discovery Call.</p>
          <button
            type="button"
            onClick={() => onNavigate?.('contact')}
            className="pressable group inline-flex h-14 items-center gap-3 rounded-full bg-gold pl-8 pr-2.5 text-[0.9375rem] font-semibold text-ink-950 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.9)] hover:bg-gold-bright"
          >
            <span className="pointer-events-none">Let's get to work!</span>
            <span className="pointer-events-none grid h-10 w-10 place-items-center rounded-full bg-ink-950/90 text-gold transition-transform duration-300 ease-out-quint group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
