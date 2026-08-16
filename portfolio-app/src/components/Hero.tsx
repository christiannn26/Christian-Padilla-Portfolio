import { motion } from 'framer-motion';
import { ArrowRight, FileText, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap-trial/SplitText';
import { useMagnetic, use3DTilt } from '../hooks/useGSAP';

gsap.registerPlugin(SplitText);

export default function Hero() {
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

    const split = new SplitText(headlineRef.current, { type: 'chars,words' });
    
    gsap.from(split.chars, { 
      opacity: 0, 
      y: 20, 
      rotateX: -40, 
      duration: 0.8, 
      stagger: 0.02, 
      ease: 'expo.out',
      delay: 0.2
    });

    return () => {
      split.revert();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      
      <div className="container mx-auto px-4 max-w-6xl z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <motion.div 
            className="flex-1 space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm shadow-[inset_0_1px_0_rgba(250,249,246,0.1)]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Sparkles className="mr-2 h-3 w-3 text-accent" />
              Elevating Operational Efficiency
            </motion.div>
            
            <h1 ref={headlineRef} className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1] font-heading" style={{ perspective: "1000px" }}>
              <span className="text-white">GHL|CRM and AI</span> <br className="hidden lg:block"/>
              <span 
                className="text-transparent bg-clip-text" 
                style={{ backgroundImage: "linear-gradient(135deg, #FAF9F6 0%, #D4AF37 50%, #B8860B 100%)" }}
              >
                Automation Specialist
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              I build sophisticated, scalable automated systems that empower modern businesses to operate flawlessly. Stop doing manual work.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-6">
              <button ref={btn1Ref} className="group relative inline-flex h-14 items-center justify-center rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-5px_rgba(250,249,246,0.4)] transition-all hover:bg-primary/90 hover:shadow-[0_0_50px_-5px_rgba(250,249,246,0.6)] focus:outline-none">
                <span className="relative z-10 flex items-center pointer-events-none">
                  Contact Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
              
              <button ref={btn2Ref} className="group inline-flex h-14 items-center justify-center rounded-xl glass-panel px-8 text-sm font-medium text-white transition-all hover:bg-white/5 focus:outline-none">
                <span className="relative z-10 flex items-center pointer-events-none">
                  Learn More
                  <FileText className="ml-2 h-4 w-4 text-muted-foreground group-hover:text-white transition-colors" />
                </span>
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 w-full max-w-md lg:max-w-none relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div 
              ref={cardRef}
              className="glass-panel aspect-[4/5] lg:aspect-square rounded-3xl overflow-hidden relative group p-2"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-50 z-10 pointer-events-none mix-blend-overlay"></div>
              <div className="w-full h-full rounded-2xl overflow-hidden bg-black/50 relative border border-white/5" style={{ transform: "translateZ(30px)" }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/20 font-medium tracking-widest text-sm uppercase">Profile Placeholder</span>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=800" 
                  alt="Profile" 
                  className="w-full h-full object-cover mix-blend-luminosity opacity-50 group-hover:opacity-80 group-hover:mix-blend-normal transition-all duration-700"
                />
              </div>
            </div>
            
            {/* Decorative floating glass elements */}
            <motion.div 
              className="absolute -bottom-8 -left-8 glass-panel rounded-2xl p-5 flex items-center gap-5"
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
            
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
