import { motion } from 'framer-motion';
import { Zap, Database, Code, Filter, Server, Briefcase } from 'lucide-react';
import { use3DTilt } from '../hooks/useGSAP';

function ServiceCard({ service, variants }: { service: any, variants: any }) {
  const cardRef = use3DTilt<HTMLDivElement>();
  
  return (
    <motion.div 
      ref={cardRef}
      variants={variants}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="group relative p-8 h-full rounded-3xl glass-panel transition-all duration-300 overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Soft ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent/20 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300 shadow-[0_0_15px_-3px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_20px_-3px_rgba(229,211,179,0.4)]" style={{ transform: "translateZ(20px)" }}>
        <service.icon className="h-6 w-6 text-white/80 group-hover:text-accent transition-colors" />
      </div>
      
      <h4 className="text-xl font-bold text-white mb-3 font-heading tracking-wide" style={{ transform: "translateZ(30px)" }}>{service.title}</h4>
      <p className="text-muted-foreground leading-relaxed text-sm font-light" style={{ transform: "translateZ(20px)" }}>
        {service.description}
      </p>
      
      {service.poweredBy && (
        <div className="mt-5 pt-4 border-t border-white/5" style={{ transform: "translateZ(25px)" }}>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em] mb-2.5">Powered By</p>
          <div className="flex flex-wrap gap-2">
            {service.poweredBy.map((tech: string, idx: number) => (
              <span key={idx} className="px-2 py-1 rounded-md bg-accent/10 text-accent text-xs font-medium border border-accent/20">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const services = [
    {
      title: "Workflow Automation",
      description: "I connect your favorite apps and build AI-driven workflows that do the heavy lifting, saving you hours of manual data entry every single week.",
      icon: Zap,
      poweredBy: ["GHL", "n8n", "Make.com", "Zapier"]
    },
    {
      title: "GHL | CRM Architecture",
      description: "Stop losing track of leads. I build out comprehensive CRM architectures complete with clean data migration, smart pipelines, and automated follow-ups.",
      icon: Database,
      poweredBy: ["GoHighLevel"]
    },
    {
      title: "Full-Stack Web Development",
      description: "From smooth front-end designs to secure back-end databases, I code and launch reliable web applications that look incredible and work flawlessly.",
      icon: Code,
      poweredBy: ["React.js", "Next.js", "VS Code", "ClaudeCode", "Custom Databases"]
    },
    {
      title: "Designing Funnels",
      description: "I design and build strategic sales funnels that guide your visitors step-by-step, maximizing your conversion rates and driving more revenue.",
      icon: Filter,
      poweredBy: ["GoHighLevel", "Figma"]
    },
    {
      title: "System Management",
      description: "Technology breaks; I make sure yours doesn't. I provide ongoing support, manage your custom API webhooks, and keep your hosted systems running smoothly.",
      icon: Server,
      poweredBy: ["Vercel", "Railway", "Claude AI"]
    },
    {
      title: "Overall Executive Assistance",
      description: "Think of me as the digital manager for your business. I handle the technical troubleshooting, social media management, and daily operations so you are free to be the CEO.",
      icon: Briefcase,
      poweredBy: ["Buffer", "GHL", "Social Medias"]
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 20 } 
    }
  };

  return (
    <section id="services" className="py-32 relative z-10 bg-transparent rounded-t-[40px] border-t border-white/10 -mt-8 pt-24 shadow-[0_-20px_50px_rgba(0,0,0,0.9),0_-5px_20px_rgba(255,255,255,0.04)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4">Services</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-heading">How I can help you scale</h3>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          style={{ perspective: "1000px" }}
        >
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} variants={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
