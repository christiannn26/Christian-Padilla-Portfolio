import { CONTACTS } from '../../data/contacts';
import { useScrollReveal } from '../../hooks/gsapEffects';
import { SECTION_TITLE } from '../../lib/styles';
import { cn } from '../../lib/utils';
import { SectionEyebrow } from '../ui/SectionEyebrow';

export default function Contact() {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="contact" className="py-16 md:py-32 section-overlap pt-16 md:pt-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div ref={containerRef} className="glass-panel rounded-2xl md:rounded-[3rem] p-6 md:p-16 relative overflow-hidden shadow-2xl">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

          <div className="flex flex-col lg:flex-row gap-16 relative z-10 items-center">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div>
                <SectionEyebrow>Get In Touch</SectionEyebrow>
                <h3 className={cn(SECTION_TITLE, 'leading-tight mb-6')}>
                  Ready to automate <br className="hidden lg:block" /> your operations?
                </h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto lg:mx-0 font-light leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or opportunities to scale your business. Choose your preferred
                  platform and let's start a conversation today.
                </p>
              </div>
            </div>

            <div className="flex-1 w-full max-w-xl mx-auto lg:mx-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CONTACTS.map((contact, idx) => (
                  <a
                    key={contact.title}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-4 p-4 rounded-2xl glass-panel hover:bg-white/5 border border-white/5 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 ${idx === 0 ? 'sm:col-span-2' : ''}`}
                  >
                    <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_15px_-3px_rgba(250,249,246,0.05)] group-hover:bg-accent/20 group-hover:border-accent/30 transition-all duration-300 shrink-0">
                      <contact.icon className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white group-hover:text-accent transition-colors tracking-wide">{contact.title}</p>
                      <p className="text-xs text-muted-foreground font-light truncate max-w-full">{contact.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
