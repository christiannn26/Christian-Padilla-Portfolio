import { motion } from 'framer-motion';

export default function TechStack() {
  const tools = [
    "GoHighLevel", "HubSpot", "Salesforce", "Zapier", 
    "Make", "ChatGPT", "Claude", "ActiveCampaign",
    "Stripe", "Calendly", "Asana", "Monday.com"
  ];

  return (
    <section className="py-24 bg-card border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl mb-12 text-center">
        <h2 className="text-sm font-bold tracking-widest uppercase text-accent mb-4">Tech Stack</h2>
        <h3 className="text-3xl font-bold text-primary">Powered by industry-leading tools.</h3>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-card to-transparent z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-card to-transparent z-10" />
        
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
        >
          {/* Double the array for seamless looping */}
          {[...tools, ...tools].map((tool, i) => (
            <div 
              key={i} 
              className="mx-4 flex items-center justify-center px-8 py-4 rounded-xl border border-border bg-background shadow-sm hover:shadow-md hover:border-accent/50 transition-all cursor-pointer shrink-0"
            >
              <span className="text-lg font-medium text-foreground">{tool}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
