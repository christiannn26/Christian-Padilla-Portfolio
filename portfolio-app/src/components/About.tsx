import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useScrollReveal, use3DTilt } from '../hooks/useGSAP';

interface AboutProps {
  onNavigate?: (id: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const textRef = useScrollReveal<HTMLDivElement>();
  const imageRef = useScrollReveal<HTMLDivElement>(0.2);
  const cardRef = use3DTilt<HTMLDivElement>();

  const valueProps = [
    "Funnel Strategist",
    "Landing Page Designer",
    "Full CRM & Automation Builder"
  ];

  return (
    <section id="about" className="py-32 relative z-10 pt-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
          
          <div 
            ref={textRef}
            className="lg:w-[60%] space-y-8"
          >
            <div>
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4 font-sans">About Me</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-heading leading-tight">
                Hi! I'm Christian <br/> <span className="bg-gradient-to-br from-[#FAF9F6] via-accent to-[#B8860B] bg-clip-text text-transparent">I design intelligent lead systems and streamline operations for businesses.</span>
              </h3>
            </div>
            
            <div className="glass-panel p-8 rounded-3xl space-y-4 text-muted-foreground leading-relaxed font-light">
              <p>
                I partner with service businesses to transform their offers into high-converting funnels, landing pages, and backend architectures that seamlessly transition leads from casual interest to booked calls and inquiries.
              </p>
              <p>
                My approach always begins with strategy: mapping out your audience, traffic sources, trust signals, and the specific action we need visitors to take. Once the strategy is set, I design and develop the front-end funnel, then wire up the entire backend—integrating the CRM, sales pipelines, email/SMS workflows, appointment reminders, and follow-up sequences so the ecosystem operates flawlessly beyond the initial click.
              </p>
              <p>
                While my core specialty is GoHighLevel, my expertise spans comprehensive funnel strategy, CRM architecture, advanced automations, custom ReactJS web development, and complex integrations using Zapier, Make, and n8n.
              </p>
            </div>

            <div className="pt-4">
              <h4 className="text-lg font-medium text-white mb-6 font-heading">Core Value Proposition</h4>
              <ul className="space-y-4">
                {valueProps.map((prop, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-center gap-4 text-muted-foreground glass-panel p-4 rounded-xl hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                  >
                    <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_-3px_rgba(229,211,179,0.4)] border border-accent/30">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-white/90">{prop}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <motion.div 
              className="pt-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <button 
                onClick={() => onNavigate && onNavigate('contact')}
                className="group relative inline-flex h-14 items-center justify-center rounded-xl bg-accent px-8 text-sm font-semibold text-accent-foreground shadow-[0_0_30px_-5px_rgba(212,175,55,0.4)] transition-all hover:bg-accent/90 hover:shadow-[0_0_50px_-5px_rgba(212,175,55,0.6)] focus:outline-none"
              >
                <span className="relative z-10 flex items-center pointer-events-none">
                  Let's get to work!
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </motion.div>
          </div>

          <div 
            ref={imageRef}
            className="lg:w-[40%] w-full"
            style={{ perspective: "1000px" }}
          >
            <div 
              ref={cardRef}
              className="glass-panel aspect-[2/3] max-w-lg mx-auto lg:mx-0 rounded-3xl overflow-hidden relative group p-2 cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* OLD DARK HOVER ANIMATION:
              <div className="absolute inset-0 bg-gradient-to-bl from-accent/10 to-transparent opacity-50 z-10 pointer-events-none mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700"></div>
              <div className="w-full h-full rounded-2xl overflow-hidden bg-black/50 relative border border-white/5" style={{ transform: "translateZ(30px)" }}>
                <img 
                  src="./img/abotme.jpg" 
                  alt="About Christian Padilla" 
                  className="w-full h-full object-cover mix-blend-luminosity opacity-50 group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-700 pointer-events-none"
                />
              </div>
              */}
              
              <div className="absolute inset-0 bg-gradient-to-bl from-accent/10 to-transparent opacity-50 z-10 pointer-events-none mix-blend-overlay"></div>
              <div className="w-full h-full rounded-2xl overflow-hidden bg-black/50 relative border border-white/5" style={{ transform: "translateZ(30px)" }}>
                <img 
                  src="./img/abotme.jpg" 
                  alt="About Christian Padilla" 
                  className="w-full h-full object-cover transition-all duration-700 pointer-events-none"
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
