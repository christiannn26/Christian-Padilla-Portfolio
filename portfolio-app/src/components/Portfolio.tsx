import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useMagnetic, use3DTilt } from '../hooks/useGSAP';
import { useRef } from 'react';

function ProjectCard({ project, index }: { project: any, index: number }) {
  const cardRef = use3DTilt<HTMLDivElement>();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax using Framer Motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group cursor-pointer"
    >
      <div 
        ref={cardRef} 
        className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 glass-panel p-2"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="w-full h-full rounded-2xl overflow-hidden relative" style={{ transform: "translateZ(20px)" }}>
          <motion.img 
            style={{ y, scale: 1.2 }}
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300" />
          
          {/* Floating button */}
          <div className="absolute top-4 right-4 h-12 w-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_20px_-5px_rgba(250,249,246,0.2)]">
            <ArrowUpRight className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
      <div className="px-2">
        <p className="text-xs font-bold tracking-wider text-accent uppercase mb-2">{project.category}</p>
        <h4 className="text-2xl font-bold text-white font-heading group-hover:text-accent transition-colors">{project.title}</h4>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const btnRef = useMagnetic<HTMLButtonElement>();

  const projects = [
    {
      title: "Real Estate CRM Migration",
      category: "GoHighLevel Build",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800&h=500"
    },
    {
      title: "E-Commerce AI Support Bot",
      category: "AI Integration",
      image: "https://images.unsplash.com/photo-1531297172868-522fcbce0229?auto=format&fit=crop&q=80&w=800&h=500"
    },
    {
      title: "Automated Lead Funnel",
      category: "Make/Zapier Workflow",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=500"
    }
  ];

  return (
    <section id="portfolio" className="py-32 relative z-10 bg-transparent rounded-t-[40px] border-t border-white/5 -mt-8 pt-24 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4">Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-heading">Featured Projects</h3>
          </div>
          <button ref={btnRef} className="group relative inline-flex h-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 px-6 text-sm font-semibold text-white transition-all hover:bg-white/10 focus:outline-none backdrop-blur-md shadow-[inset_0_1px_0_rgba(250,249,246,0.1)]">
            <span className="relative z-10 flex items-center pointer-events-none">
              View All Projects
              <ArrowUpRight className="ml-2 h-4 w-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform text-accent" />
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
