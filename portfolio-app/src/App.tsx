import CustomCursor from './components/layout/CustomCursor';
import Atmosphere from './components/layout/Atmosphere';
import Navbar from './components/layout/Navbar';
import PipelineRail from './components/layout/PipelineRail';
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
    <div className="relative min-h-screen overflow-clip font-sans text-ivory">
      <CustomCursor />
      <Atmosphere />
      <Navbar />
      <PipelineRail />

      <PortfolioNavProvider>
        <main className="relative z-10 flex flex-col">
          <Hero onNavigate={scrollToSection} />

          {/* The content sheet rises over the hero stage */}
          <div className="relative z-20 -mt-10 rounded-t-[2.5rem] border-t border-line-strong bg-ink-950/60 shadow-[0_-30px_60px_-20px_rgba(0,0,0,0.9)]">
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
        </main>
      </PortfolioNavProvider>
    </div>
  );
}
