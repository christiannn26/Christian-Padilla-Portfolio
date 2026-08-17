import { motion, useMotionValue, useSpring } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import GalaxyBackground from './components/ui/GalaxyBackground';
import { useEffect, useState } from 'react';

function App() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 20, stiffness: 400, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    setIsMobile(window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches);

    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || 
          target.tagName.toLowerCase() === 'button' || 
          target.closest('a') || 
          target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    if (!isMobile) {
      window.addEventListener('mousemove', updateCursor);
      window.addEventListener('mouseover', handleMouseOver);
    }

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile]);

  return (
    <div className="relative min-h-screen font-sans text-foreground selection:bg-accent/30 overflow-x-hidden">
      
      {/* Custom Cursor */}
      {!isMobile && (
        <>
          <motion.div 
            className="fixed top-0 left-0 w-3 h-3 bg-accent rounded-full pointer-events-none z-[100] mix-blend-screen shadow-[0_0_15px_rgba(229,211,179,0.8)]"
            style={{ 
              x: cursorX, 
              y: cursorY,
              translateX: "-50%",
              translateY: "-50%"
            }}
            animate={{
              scale: isHovering ? 0 : 1
            }}
            transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
          />
          <motion.div 
            className="fixed top-0 left-0 w-10 h-10 border border-accent/40 rounded-full pointer-events-none z-[99]"
            style={{ 
              x: cursorXSpring, 
              y: cursorYSpring,
              translateX: "-50%",
              translateY: "-50%"
            }}
            animate={{
              scale: isHovering ? 1.5 : 1,
              backgroundColor: isHovering ? "rgba(229,211,179,0.05)" : "transparent"
            }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
          />
        </>
      )}

      {/* Volumetric Spotlights and Patterns */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-background">
        
        {/* Subtle Dot Pattern (Champagne Gold) */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(rgba(212, 175, 55, 0.15) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "linear-gradient(to bottom, transparent 10%, black 25%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 10%, black 25%)"
          }}
        />

        {/* Faint Structural Grid */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "128px 128px",
            maskImage: "linear-gradient(to bottom, transparent 10%, black 25%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 10%, black 25%)"
          }}
        />

        <motion.div 
          className="absolute top-[5%] left-[10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 50%)" }}
          animate={{ 
            x: [0, 40, -40, 0],
            y: [0, -40, 40, 0],
            scale: [1, 1.05, 0.95, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[10%] right-[5%] w-[70vw] h-[70vw] rounded-full mix-blend-screen pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(250, 249, 246, 0.05) 0%, transparent 50%)" }}
          animate={{ 
            x: [0, -50, 50, 0],
            y: [0, 50, -50, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <nav className="fixed top-0 z-50 w-full glass-panel border-b-0 border-white/5 shadow-none transition-all duration-300">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between max-w-6xl">
          <span className="font-heading font-bold text-2xl tracking-wide text-primary">VA<span className="text-accent">.</span></span>
          <div className="space-x-8 text-sm font-medium hidden md:block uppercase tracking-widest text-xs">
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors duration-300">About</a>
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors duration-300">Services</a>
            <a href="#portfolio" className="text-muted-foreground hover:text-primary transition-colors duration-300">Portfolio</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors duration-300">Contact</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col">
        <Hero />
        
        <div className="relative bg-background rounded-t-[40px] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.9),0_-5px_20px_rgba(255,255,255,0.04)] z-20">
          <div className="absolute inset-0 rounded-t-[40px] overflow-hidden pointer-events-none">
            <GalaxyBackground />
          </div>
          <div className="relative z-10">
            <About />
            <TechStack />
            <Services />
            <Portfolio />
            <Contact />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
