import { motion, useMotionValue, useSpring } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import GalaxyBackground from './components/ui/GalaxyBackground';
import ProblemSolution from './components/ProblemSolution';
import InteractiveFlowchart from './components/InteractiveFlowchart';
import SystemsShowcase from './components/SystemsShowcase';
import WorkflowsShowcase from './components/WorkflowsShowcase';
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

  // Elegant custom smooth scrolling
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement> | null, targetId: string) => {
    if (e) e.preventDefault();
    
    const targetElement = document.getElementById(targetId);
    const startPosition = window.scrollY;
    const targetPosition = targetId === 'top' ? 0 : (targetElement ? targetElement.getBoundingClientRect().top + startPosition : 0);
    const distance = targetPosition - startPosition;
    const duration = 800; // 0.8s for a very snappy, elegant glide
    let start: number | null = null;

    // Easing function: easeInOutCubic (softer acceleration/deceleration)
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Disable pointer events to prevent expensive hover recalculations while scrolling
    document.body.style.pointerEvents = 'none';
    window.dispatchEvent(new Event('scroll-start'));

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        document.body.style.pointerEvents = '';
        window.dispatchEvent(new Event('scroll-end'));
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <div className="relative min-h-screen font-sans text-foreground selection:bg-accent/30 overflow-x-hidden">
      
      {/* Custom Cursor */}
      {!isMobile && (
        <>
          <motion.div 
            className="fixed top-0 left-0 w-3 h-3 bg-accent rounded-full pointer-events-none z-[100] shadow-[0_0_15px_rgba(229,211,179,0.8)]"
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
          className="absolute top-[5%] left-[10%] w-[60vw] h-[60vw] rounded-full pointer-events-none will-change-transform opacity-60"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 50%)" }}
          animate={{ 
            x: [0, 40, -40, 0],
            y: [0, -40, 40, 0],
            scale: [1, 1.05, 0.95, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[10%] right-[5%] w-[70vw] h-[70vw] rounded-full pointer-events-none will-change-transform opacity-60"
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
        <div className="w-full px-8 md:px-16 h-20 flex items-center justify-between">
          <a 
            href="#top"
            onClick={(e) => scrollToSection(e, 'top')}
            className="flex items-center gap-3 font-heading font-bold text-2xl tracking-wide text-primary hover:text-accent transition-colors duration-300 cursor-pointer"
          >
            <img src="/img/CPlogo.png" alt="CP Logo" className="h-8 w-auto object-contain" />
            <span>Christian Padilla<span className="text-accent">.</span></span>
          </a>
          <div className="space-x-8 text-sm font-medium hidden md:block uppercase tracking-widest text-xs">
            <a href="#portfolio" onClick={(e) => scrollToSection(e, 'portfolio')} className="text-muted-foreground hover:text-primary transition-colors duration-300">Portfolio</a>
            <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-muted-foreground hover:text-primary transition-colors duration-300">Services</a>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-muted-foreground hover:text-primary transition-colors duration-300">About</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-muted-foreground hover:text-primary transition-colors duration-300">Contact Me</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col">
        <Hero onNavigate={(id) => scrollToSection(null, id)} />
        
        <div className="relative bg-background rounded-t-[40px] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.9),0_-5px_20px_rgba(255,255,255,0.04)] z-20 will-change-transform">
          <div className="absolute inset-0 rounded-t-[40px] overflow-hidden pointer-events-none">
            <GalaxyBackground />
          </div>
          <div className="relative z-10">
            <ProblemSolution />
            <InteractiveFlowchart />
            <SystemsShowcase />
            <WorkflowsShowcase />
            <Portfolio />
            <Services />
            <TechStack />
            <About onNavigate={(id) => scrollToSection(null, id)} />
            <Contact />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
