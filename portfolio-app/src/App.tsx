import CustomCursor from './components/layout/CustomCursor';
import Atmosphere from './components/layout/Atmosphere';
import Navbar from './components/layout/Navbar';
import PipelineRail from './components/layout/PipelineRail';
import ContentSheet from './components/layout/ContentSheet';
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
          <ContentSheet>
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
          </ContentSheet>
        </main>
      </PortfolioNavProvider>
    </div>
  );
}
