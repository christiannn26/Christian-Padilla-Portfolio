import CustomCursor from './components/layout/CustomCursor';
import AmbientBackground from './components/layout/AmbientBackground';
import Navbar from './components/layout/Navbar';
import GalaxyBackground from './components/layout/GalaxyBackground';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import ProblemSolution from './components/sections/ProblemSolution';
import InteractiveFlowchart from './components/sections/InteractiveFlowchart';
import SystemsShowcase from './components/sections/SystemsShowcase';
import WorkflowsShowcase from './components/sections/WorkflowsShowcase';
import Portfolio from './components/sections/Portfolio';
import Services from './components/sections/Services';
import TechStack from './components/sections/TechStack';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import { PortfolioNavProvider } from './context/PortfolioNavProvider';
import { scrollToSection } from './lib/smoothScroll';

export default function App() {
  return (
    <div className="relative min-h-screen font-sans text-foreground selection:bg-accent/30 overflow-clip">
      <CustomCursor />
      <AmbientBackground />
      <Navbar />

      <PortfolioNavProvider>
        <main className="relative z-10 flex flex-col">
          <Hero onNavigate={scrollToSection} />

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
              <About onNavigate={scrollToSection} />
              <Contact />
              <Footer />
            </div>
          </div>
        </main>
      </PortfolioNavProvider>
    </div>
  );
}
