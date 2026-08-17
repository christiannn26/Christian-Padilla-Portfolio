import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-background to-background"></div>
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          <motion.div 
            className="flex-1 space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse"></span>
              Available for new projects
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-primary leading-tight">
              GHL|CRM and AI <br className="hidden lg:block"/>
              <span className="text-accent">Automation Specialist</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Book a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-background px-8 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                View Portfolio
                <FileText className="ml-2 h-4 w-4" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 w-full max-w-md lg:max-w-none relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="aspect-square rounded-2xl overflow-hidden border border-border bg-card shadow-2xl relative">
              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground font-medium">Profile Picture Placeholder</span>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=800" 
                alt="Profile Placeholder" 
                className="w-full h-full object-cover mix-blend-overlay opacity-20"
              />
            </div>
            
            {/* Decorative floating elements */}
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-card border border-border shadow-lg rounded-xl p-4 flex items-center gap-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">10+</div>
              <div>
                <p className="text-sm font-bold text-primary">Systems Built</p>
                <p className="text-xs text-muted-foreground">Automated</p>
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
