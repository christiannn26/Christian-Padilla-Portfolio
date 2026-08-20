import { Mail, MessageCircle, Send } from 'lucide-react';
import { useScrollReveal } from '../hooks/useGSAP';

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Contact() {
  const containerRef = useScrollReveal<HTMLDivElement>();

  const contacts = [
    {
      title: "Email",
      value: "padilla.christian2003@gmail.com",
      link: "mailto:padilla.christian2003@gmail.com",
      icon: Mail
    },
    {
      title: "WhatsApp",
      value: "+63 931 928 1611",
      link: "https://wa.me/639319281611",
      icon: MessageCircle
    },
    {
      title: "LinkedIn",
      value: "christian-padilla-s122603",
      link: "https://www.linkedin.com/in/christian-padilla-s122603",
      icon: LinkedinIcon
    },
    {
      title: "Telegram",
      value: "@cchhrriissttiiaann",
      link: "https://t.me/cchhrriissttiiaann",
      icon: Send
    },
    {
      title: "Facebook",
      value: "christian.padilla.31149",
      link: "https://facebook.com/christian.padilla.31149",
      icon: FacebookIcon
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-32 section-overlap pt-16 md:pt-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div 
          ref={containerRef}
          className="glass-panel rounded-2xl md:rounded-[3rem] p-6 md:p-16 relative overflow-hidden shadow-2xl"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

          <div className="flex flex-col lg:flex-row gap-16 relative z-10 items-center">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div>
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4">Get In Touch</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-heading leading-tight mb-6">
                  Ready to automate <br className="hidden lg:block"/> your operations?
                </h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto lg:mx-0 font-light leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or opportunities to scale your business. Choose your preferred platform and let's start a conversation today.
                </p>
              </div>
            </div>

            <div className="flex-1 w-full max-w-xl mx-auto lg:mx-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contacts.map((contact, idx) => (
                  <a 
                    key={idx}
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
