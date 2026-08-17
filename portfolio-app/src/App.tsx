
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
          <span className="font-heading font-bold text-xl tracking-tight text-primary">VA Portfolio</span>
          <div className="space-x-8 text-sm font-medium hidden md:block">
            <a href="#about" className="text-muted-foreground hover:text-accent transition-colors duration-200">About</a>
            <a href="#services" className="text-muted-foreground hover:text-accent transition-colors duration-200">Services</a>
            <a href="#portfolio" className="text-muted-foreground hover:text-accent transition-colors duration-200">Portfolio</a>
            <a href="#contact" className="text-muted-foreground hover:text-accent transition-colors duration-200">Contact</a>
          </div>
        </div>
      </nav>

      <main className="flex flex-col gap-32 pb-32">
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
