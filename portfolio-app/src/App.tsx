import { motion } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import { useEffect, useState } from 'react';

function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    setIsMobile(window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches);

    const updateCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
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
    <div className="relative min-h-screen bg-background font-sans text-foreground selection:bg-accent/30 overflow-x-hidden">
      
      {/* Custom Cursor */}
      {!isMobile && (
        <>
          <motion.div 
            className="fixed top-0 left-0 w-3 h-3 bg-accent rounded-full pointer-events-none z-[100] mix-blend-screen shadow-[0_0_15px_rgba(229,211,179,0.8)]"
            animate={{ 
              x: cursorPos.x - 6, 
              y: cursorPos.y - 6,
              scale: isHovering ? 0 : 1
            }}
            transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
          />
          <motion.div 
            className="fixed top-0 left-0 w-10 h-10 border border-accent/40 rounded-full pointer-events-none z-[99]"
            animate={{ 
              x: cursorPos.x - 20, 
              y: cursorPos.y - 20,
              scale: isHovering ? 1.5 : 1,
              backgroundColor: isHovering ? "rgba(229,211,179,0.05)" : "transparent"
            }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
          />
        </>
      )}

      {/* Dynamic Animated Ambient Light Spotlights */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
        <motion.div 
          className="absolute top-[5%] left-[10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen opacity-[0.04] filter blur-[120px] bg-[#E5D3B3]"
          animate={{ 
            x: [0, 40, -40, 0],
            y: [0, -40, 40, 0],
            scale: [1, 1.05, 0.95, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[10%] right-[5%] w-[60vw] h-[60vw] rounded-full mix-blend-screen opacity-[0.03] filter blur-[150px] bg-[#FAF9F6]"
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

      <main className="flex flex-col">
        <Hero />
        <About />
        <TechStack />
        <Services />
        <Portfolio />
        <Contact />
      </main>
    </div>
  );
}

export default App;
