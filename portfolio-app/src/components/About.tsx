import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function About() {
  const valueProps = [
    "Lorem ipsum dolor sit amet",
    "Consectetur adipiscing elit",
    "Suspendisse varius enim in eros"
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
          
          <motion.div 
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-widest uppercase text-accent">About Me</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Streamlining operations through intelligent automation.
            </h3>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
              </p>
              <p>
                Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
              </p>
            </div>

            <div className="pt-6">
              <h4 className="text-lg font-semibold text-primary mb-4">Value Proposition</h4>
              <ul className="space-y-3">
                {valueProps.map((prop, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-center gap-3 text-muted-foreground"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                    <span>{prop}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 w-full"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-border bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-muted-foreground font-medium">Secondary Profile Picture</span>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
