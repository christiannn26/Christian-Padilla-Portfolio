import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    // Elegant smooth scroll to top matching the native/custom behavior of the app
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full border-t border-white/10 bg-[#020202] py-8 overflow-hidden z-20 mt-10">
      {/* Subtle Volumetric Glow at the Top Edge */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[80px] bg-accent/10 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Identity & Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <div className="flex items-center gap-2 font-heading font-bold text-xl tracking-wide text-primary">
            <img src="./img/CPlogo.png" alt="CP Logo" className="h-6 w-auto object-contain" />
            <span>Christian Padilla<span className="text-accent">.</span></span>
          </div>
          <p className="text-muted-foreground font-light max-w-sm text-xs">
            Transforming complex workflows into intelligent, automated systems.
          </p>
        </div>

        {/* Right Side: Back to Top & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-4 mt-4 md:mt-0">
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-white/60 hover:text-accent transition-colors uppercase tracking-widest group"
          >
            <span>Back to top</span>
            <div className="h-8 w-8 rounded-full glass-panel flex items-center justify-center border border-white/5 group-hover:border-accent/40 group-hover:bg-accent/10 transition-all duration-300">
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </button>
          
          <p className="text-[10px] md:text-xs text-white/70 font-medium tracking-wider uppercase text-center md:text-right">
            © 2026 Padilla. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
