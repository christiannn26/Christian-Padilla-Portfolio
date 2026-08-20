import { motion } from 'framer-motion';
import { ArrowRight, FileText, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useMagnetic, use3DTilt } from '../hooks/useGSAP';
import VoxelTopographyGrid from './ui/voxel-topography-grid';

gsap.registerPlugin(SplitText);

export default function Hero({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const btn1Ref = useMagnetic<HTMLButtonElement>();
  const btn2Ref = useMagnetic<HTMLButtonElement>();
  const cardRef = use3DTilt<HTMLDivElement>();

  useEffect(() => {
    if (!headlineRef.current) return;
    
    // Fallback for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(headlineRef.current, { opacity: 1 });
      return;
    }

    let split: any = null;
    if (headlineRef.current) {
      split = new SplitText(headlineRef.current, { type: 'chars,words' });
      
      gsap.from(split.chars, { 
        opacity: 0, 
        y: 20, 
        rotateX: -40, 
        duration: 0.8, 
        stagger: 0.02, 
        ease: 'expo.out',
        delay: 0.2
      });
    }

    return () => {
      if (split) split.revert();
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-transparent flex items-center justify-center overflow-hidden">
      
      <VoxelTopographyGrid primaryColor="#1a1a1a" tileSize={60} wireColor="rgba(253, 251, 247, 0.3)"/>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10 pointer-events-none pt-32 lg:pt-20 pb-32 lg:pb-0">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-4 lg:space-y-8">
              <motion.div 
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] md:text-xs font-medium text-white backdrop-blur-sm shadow-[inset_0_1px_0_rgba(250,249,246,0.1)] pointer-events-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Sparkles className="mr-2 h-3 w-3 text-accent" />
                Elevating Operational Efficiency
              </motion.div>
              
              <h1 ref={headlineRef} className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1] font-heading" style={{ perspective: "1000px" }}>
                <span className="text-white">Automating Success Through AI</span> <br />
                <span 
                  className="gsap-gradient-text"
                >
                  and Your GHL CRM.
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed mt-8">
                I help service-based businesses turn leads into booked appointments through conversion-focused funnels, CRM architecture, and automated follow-up systems built inside GoHighLevel.
              </p>
            </div>
            
            {/* Action buttons (Desktop only) */}
            <div className="hidden lg:flex flex-row items-center justify-start gap-6 pt-12 pointer-events-auto">
              <button 
                ref={btn1Ref} 
                onClick={() => onNavigate && onNavigate('contact')}
                className="group relative inline-flex h-14 items-center justify-center rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-5px_rgba(250,249,246,0.4)] transition-all hover:bg-primary/90 hover:shadow-[0_0_50px_-5px_rgba(250,249,246,0.6)] focus:outline-none"
              >
                <span className="relative z-10 flex items-center pointer-events-none">
                  Contact Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
              
              <button 
                ref={btn2Ref} 
                onClick={() => onNavigate && onNavigate('portfolio')}
                className="group inline-flex h-14 items-center justify-center rounded-xl glass-panel px-8 text-sm font-medium text-white transition-all hover:bg-white/5 focus:outline-none"
              >
                <span className="relative z-10 flex items-center pointer-events-none">
                  Learn More
                  <FileText className="ml-2 h-4 w-4 text-muted-foreground group-hover:text-white transition-colors" />
                </span>
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 w-full max-w-md lg:max-w-none pointer-events-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Dedicated Wrapper for Picture and Badge to act as a single unit */}
            <div className="relative flex flex-col items-center lg:items-start w-full">
              
              <div 
                ref={cardRef}
                className="glass-panel w-full aspect-[4/5] lg:aspect-square rounded-3xl overflow-hidden relative group p-2 cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-50 z-10 pointer-events-none mix-blend-overlay"></div>
                <div className="w-full h-full rounded-2xl overflow-hidden bg-black/50 relative border border-white/5" style={{ transform: "translateZ(30px)" }}>
                  {/* OLD DARK HOVER ANIMATION:
                  <img 
                    src="./img/Hero_Face.png" 
                    alt="Christian Padilla" 
                    className="w-full h-full object-cover mix-blend-luminosity opacity-50 group-hover:opacity-80 group-hover:mix-blend-normal transition-all duration-700 pointer-events-none"
                  />
                  */}
                  <img 
                    src="./img/Hero_Face.png" 
                    alt="Christian Padilla" 
                    className="w-full h-full object-cover transition-all duration-700 pointer-events-none"
                  />
                </div>
              </div>
              
              {/* Decorative floating glass elements - absolute positioned relative to the new wrapper */}
              <motion.div 
                className="absolute -bottom-4 left-0 sm:-bottom-8 sm:-left-8 glass-panel rounded-2xl p-4 sm:p-5 flex items-center gap-4 sm:gap-5 cursor-default scale-90 sm:scale-100 origin-bottom-left z-10"
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                style={{ transform: "translateZ(50px)" }}
              >
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold font-heading text-xl shadow-[0_0_20px_-5px_rgba(229,211,179,0.4)] border border-accent/30">
                  10+
                </div>
                <div>
                  <p className="text-sm font-bold text-white tracking-wide">Systems Built</p>
                  <p className="text-xs text-muted-foreground">Automated perfectly</p>
                </div>
              </motion.div>
              
            </div>
            
            {/* Action buttons (Mobile only: separated from the picture wrapper) */}
            <motion.div 
              className="flex lg:hidden flex-col sm:flex-row items-center justify-center gap-6 pt-16 pointer-events-auto relative z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <button 
                onClick={() => onNavigate && onNavigate('contact')}
                className="group relative inline-flex h-14 items-center justify-center rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-5px_rgba(250,249,246,0.4)] transition-all hover:bg-primary/90 hover:shadow-[0_0_50px_-5px_rgba(250,249,246,0.6)] focus:outline-none w-full max-w-[240px] sm:max-w-none sm:w-auto"
              >
                <span className="relative z-10 flex items-center pointer-events-none">
                  Contact Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
              
              <button 
                onClick={() => onNavigate && onNavigate('portfolio')}
                className="group inline-flex h-14 items-center justify-center rounded-xl glass-panel px-8 text-sm font-medium text-white transition-all hover:bg-white/5 focus:outline-none w-full max-w-[240px] sm:max-w-none sm:w-auto"
              >
                <span className="relative z-10 flex items-center pointer-events-none">
                  Learn More
                  <FileText className="ml-2 h-4 w-4 text-muted-foreground group-hover:text-white transition-colors" />
                </span>
              </button>
            </motion.div>
            
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
