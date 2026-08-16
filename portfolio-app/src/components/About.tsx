import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useScrollReveal, use3DTilt } from '../hooks/useGSAP';

export default function About() {
  const textRef = useScrollReveal<HTMLDivElement>();
  const imageRef = useScrollReveal<HTMLDivElement>(0.2);
  const cardRef = use3DTilt<HTMLDivElement>();

  const valueProps = [
    "Streamlining complex workflows with Make & Zapier",
    "Deploying highly trained AI Chatbots for Support & Sales",
    "Comprehensive CRM architecture and data migration"
  ];

  return (
    <section id="about" className="py-32 relative z-10 bg-transparent rounded-t-[40px] border-t border-white/5 -mt-8 pt-24 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
          
          <div 
            ref={textRef}
            className="flex-1 space-y-8"
          >
            <div>
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4 font-sans">About Me</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-heading leading-tight">
                Streamlining operations through intelligent automation.
              </h3>
            </div>
            
            <div className="glass-panel p-8 rounded-3xl space-y-4 text-muted-foreground leading-relaxed font-light">
              <p>
                I am a Virtual Assistant specializing in GoHighLevel (GHL), CRM architecture, and AI automation. I partner with forward-thinking businesses to eliminate operational bottlenecks and turn manual chaos into seamless, automated ecosystems.
              </p>
              <p>
                By blending cutting-edge artificial intelligence with robust CRM logic, I create systems that work tirelessly for you 24/7.
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
          </div>

          <div 
            ref={imageRef}
            className="flex-1 w-full"
            style={{ perspective: "1000px" }}
          >
            <div 
              ref={cardRef}
              className="glass-panel aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden relative p-2"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-accent/10 to-transparent opacity-50 z-10 pointer-events-none mix-blend-overlay"></div>
              <div className="w-full h-full rounded-2xl overflow-hidden bg-black/50 relative border border-white/5" style={{ transform: "translateZ(30px)" }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/20 font-medium tracking-widest text-sm uppercase">Secondary Image</span>
                </div>
                {/* Optional actual image here */}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
