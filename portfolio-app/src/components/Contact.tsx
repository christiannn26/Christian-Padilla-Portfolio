import { Mail, MessageSquare, Calendar } from 'lucide-react';
import { useScrollReveal, useMagnetic } from '../hooks/useGSAP';

export default function Contact() {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const btnRef = useMagnetic<HTMLButtonElement>();

  return (
    <section id="contact" className="py-32 relative z-10 bg-background rounded-t-[40px] border-t border-white/5 -mt-8 pt-24 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div 
          ref={containerRef}
          className="glass-panel rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

          <div className="flex flex-col lg:flex-row gap-16 relative z-10">
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4">Get In Touch</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-heading leading-tight mb-6">
                  Ready to automate <br /> your operations?
                </h3>
                <p className="text-muted-foreground text-lg max-w-md font-light leading-relaxed">
                  Whether you need a complete GHL overhaul or a simple AI chatbot, let's discuss how we can scale your business.
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <a href="mailto:hello@example.com" className="group flex items-center gap-6 p-4 -ml-4 rounded-2xl hover:bg-white/5 transition-colors w-fit">
                  <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_15px_-3px_rgba(250,249,246,0.05)] group-hover:bg-accent/20 group-hover:border-accent/30 group-hover:shadow-[0_0_20px_-5px_rgba(229,211,179,0.4)] transition-all duration-300">
                    <Mail className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-accent transition-colors tracking-wide">Email Me</p>
                    <p className="text-sm text-muted-foreground font-light">hello@example.com</p>
                  </div>
                </a>
                
                <div className="group flex items-center gap-6 p-4 -ml-4 rounded-2xl hover:bg-white/5 transition-colors w-fit cursor-pointer">
                  <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_15px_-3px_rgba(250,249,246,0.05)] group-hover:bg-accent/20 group-hover:border-accent/30 group-hover:shadow-[0_0_20px_-5px_rgba(229,211,179,0.4)] transition-all duration-300">
                    <Calendar className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-accent transition-colors tracking-wide">Book a Call</p>
                    <p className="text-sm text-muted-foreground font-light">Schedule 30 mins via Calendly</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-xl mx-auto lg:mx-0">
              <form className="space-y-6 glass-panel p-8 rounded-3xl bg-black/40 border border-white/5 shadow-2xl">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/80 ml-1">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all font-light"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/80 ml-1">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all font-light"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-white/80 ml-1">Message</label>
                  <textarea 
                    id="message"
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all resize-none font-light"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button 
                  ref={btnRef}
                  type="button" 
                  className="group relative w-full h-14 items-center justify-center rounded-xl bg-accent text-sm font-semibold text-accent-foreground shadow-[0_0_40px_-10px_rgba(229,211,179,0.4)] transition-all hover:bg-accent/90 hover:shadow-[0_0_60px_-15px_rgba(229,211,179,0.7)] focus:outline-none mt-4"
                >
                  <span className="relative z-10 flex items-center justify-center pointer-events-none">
                    Send Message
                    <MessageSquare className="ml-2 h-4 w-4" />
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
