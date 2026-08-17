import { motion } from 'framer-motion';
import { Settings, MessageSquare, Briefcase, Zap, BarChart, Users } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: "CRM Setup & Management",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
      icon: Settings
    },
    {
      title: "AI Chatbot Integration",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
      icon: MessageSquare
    },
    {
      title: "Workflow Automation",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
      icon: Zap
    },
    {
      title: "Lead Generation",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
      icon: Users
    },
    {
      title: "Sales Funnel Optimization",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
      icon: BarChart
    },
    {
      title: "Administrative Support",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
      icon: Briefcase
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase text-accent mb-4">Services</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">How I can help you scale</h3>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, i) => (
            <motion.div 
              key={i} 
              variants={item}
              className="group relative p-8 rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent/10 group-hover:text-accent transition-all duration-300">
                <service.icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
              </div>
              
              <h4 className="text-xl font-bold text-primary mb-3">{service.title}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
