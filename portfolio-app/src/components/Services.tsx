import { motion } from 'framer-motion';
import { Settings, MessageSquare, Briefcase, Zap, BarChart, Users } from 'lucide-react';
import { use3DTilt } from '../hooks/useGSAP';

function ServiceCard({ service, variants }: { service: any, variants: any }) {
  const cardRef = use3DTilt<HTMLDivElement>();
  
  return (
    <motion.div 
      ref={cardRef}
      variants={variants}
      className="group relative p-8 rounded-3xl glass-panel transition-all duration-300 overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
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
    </motion.div>
  );
}

export default function Services() {
  const services = [
    {
      title: "CRM Architecture",
      description: "Custom GoHighLevel setups designed to capture, nurture, and convert leads seamlessly.",
      icon: Settings
    },
    {
      title: "AI Chatbots",
      description: "Intelligent conversational agents for 24/7 customer support and automated appointment booking.",
      icon: MessageSquare
    },
    {
      title: "Workflow Automation",
      description: "Connecting apps via Make/Zapier to eliminate manual data entry and save hundreds of hours.",
      icon: Zap
    },
    {
      title: "Lead Generation",
      description: "Designing high-converting funnels and automated follow-up sequences that never miss a beat.",
      icon: Users
    },
    {
      title: "Funnel Optimization",
      description: "Data-driven enhancements to landing pages and emails to maximize your ROI.",
      icon: BarChart
    },
    {
      title: "Systems Management",
      description: "Ongoing technical support and continuous iteration of your automated ecosystems.",
      icon: Briefcase
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
    <section id="services" className="py-32 relative z-10 bg-background rounded-t-[40px] border-t border-white/5 -mt-8 pt-24 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
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
