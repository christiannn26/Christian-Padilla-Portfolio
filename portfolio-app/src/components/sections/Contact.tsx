import { ArrowUpRight } from 'lucide-react';
import { CONTACTS } from '../../data/contacts';
import { useScrollReveal } from '../../hooks/gsapEffects';
import { cn } from '../../lib/utils';
import { useStageNow } from '../../hooks/useActiveStage';

// A long address wraps after its "@" rather than breaking inside the name or the domain.
function breakAfterAt(value: string) {
  const at = value.indexOf('@');
  if (at < 0) return value;
  return (
    <>
      {value.slice(0, at + 1)}
      <wbr />
      {value.slice(at + 1)}
    </>
  );
}

export default function Contact() {
  const now = useStageNow('contact');
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="contact" {...now} className="stage-pad relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <div ref={containerRef} className="grid items-start gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <h2 className="type-section text-ivory">
              Ready to automate <br className="hidden lg:block" /> your <span className="now-gold">operations?</span>
            </h2>
            <p className="mt-10 max-w-md text-lg leading-relaxed text-muted-foreground md:mt-12">
              I'm always open to discussing new projects, creative ideas, or opportunities to scale your business. Choose your preferred
              platform and let's start a conversation today.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-6">
            {CONTACTS.map((contact, idx) => (
              <a
                key={contact.title}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'pressable group record flex items-center gap-4 rounded-3xl p-4 pr-5 hover:border-gold/40 hover:bg-ink-850',
                  idx === 0 && 'sm:col-span-2 sm:p-6',
                )}
              >
                <span
                  className={cn(
                    'grid shrink-0 place-items-center rounded-full border border-line-strong text-ivory/70 transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink-950',
                    idx === 0 ? 'h-14 w-14' : 'h-12 w-12',
                  )}
                >
                  <contact.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="label-caps block text-ivory/50 transition-colors duration-300 group-hover:text-gold">{contact.title}</span>
                  <span className={cn('mt-1.5 block text-ivory', idx === 0 ? 'text-[clamp(1.0625rem,0.85rem+0.8vw,1.375rem)] font-semibold leading-tight tracking-[-0.02em] [overflow-wrap:anywhere]' : 'truncate text-[0.9375rem]')}>
                    {idx === 0 ? breakAfterAt(contact.value) : contact.value}
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-ivory/35 transition-[color,transform] duration-300 ease-out-quint group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
