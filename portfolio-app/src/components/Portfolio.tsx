import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Portfolio() {
  const projects = [
    {
      title: "Real Estate CRM Migration",
      category: "CRM Setup",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800&h=500"
    },
    {
      title: "E-Commerce AI Support Bot",
      category: "AI Integration",
      image: "https://images.unsplash.com/photo-1531297172868-522fcbce0229?auto=format&fit=crop&q=80&w=800&h=500"
    },
    {
      title: "Automated Lead Funnel",
      category: "Workflow Automation",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=500"
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-accent mb-4">Portfolio</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">Featured Projects</h3>
          </div>
          <button className="text-accent font-medium hover:text-primary transition-colors flex items-center gap-1 group">
            View All Projects
            <ArrowUpRight className="h-4 w-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-muted border border-border">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 h-12 w-12 bg-background rounded-full flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                  <ArrowUpRight className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-2">{project.category}</p>
              <h4 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">{project.title}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
