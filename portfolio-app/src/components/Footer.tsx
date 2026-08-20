import { ArrowUp, Briefcase, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    // Elegant smooth scroll to top matching the native/custom behavior of the app
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full border-t border-white/10 bg-[#020202] pt-20 pb-8 overflow-hidden z-20 mt-10">
      {/* Subtle Volumetric Glow at the Top Edge */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-accent/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          {/* Brand Identity */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3 font-heading font-bold text-2xl tracking-wide text-primary">
              <img src="./img/CPlogo.png" alt="CP Logo" className="h-8 w-auto object-contain" />
              <span>Christian Padilla<span className="text-accent">.</span></span>
            </div>
            <p className="text-muted-foreground font-light max-w-sm leading-relaxed text-sm">
              Transforming complex workflows into intelligent, automated systems. Designing high-converting architectures for modern businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-white font-heading font-medium text-lg tracking-wide">Navigation</h4>
            <div className="flex flex-col space-y-3">
              <a href="#portfolio" className="text-sm text-muted-foreground hover:text-accent transition-colors w-fit">Portfolio</a>
              <a href="#services" className="text-sm text-muted-foreground hover:text-accent transition-colors w-fit">Services</a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-accent transition-colors w-fit">About Me</a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-accent transition-colors w-fit">Contact</a>
            </div>
          </div>

          {/* Social Connect (Glassmorphism) */}
          <div className="space-y-5">
            <h4 className="text-white font-heading font-medium text-lg tracking-wide">Connect</h4>
            <div className="flex gap-4">
              <a href="#" aria-label="LinkedIn" className="h-11 w-11 rounded-xl glass-panel flex items-center justify-center text-muted-foreground hover:text-accent hover:shadow-[0_0_20px_-5px_rgba(212,175,55,0.4)] hover:border-accent/30 transition-all duration-300">
                <Briefcase className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="h-11 w-11 rounded-xl glass-panel flex items-center justify-center text-muted-foreground hover:text-accent hover:shadow-[0_0_20px_-5px_rgba(212,175,55,0.4)] hover:border-accent/30 transition-all duration-300">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="mailto:hello@example.com" aria-label="Email" className="h-11 w-11 rounded-xl glass-panel flex items-center justify-center text-muted-foreground hover:text-accent hover:shadow-[0_0_20px_-5px_rgba(212,175,55,0.4)] hover:border-accent/30 transition-all duration-300">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-white/40 tracking-widest uppercase">
            © 2026 Padilla. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-3 text-xs text-white/60 hover:text-accent transition-colors uppercase tracking-widest group"
          >
            <span>Back to top</span>
            <div className="h-9 w-9 rounded-full glass-panel flex items-center justify-center border border-white/5 group-hover:border-accent/40 group-hover:bg-accent/10 transition-all duration-300">
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
