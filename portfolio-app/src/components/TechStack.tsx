import { motion } from 'framer-motion';

export default function TechStack() {
  const tools = [
    "GoHighLevel", "HubSpot", "Salesforce", "Zapier", 
    "Make (Integromat)", "ChatGPT", "Claude AI", "ActiveCampaign",
    "Stripe", "Calendly", "Asana", "Monday.com"
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4 max-w-7xl mb-16 text-center">
        <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4">Tech Stack</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-white font-heading">Powered by industry-leading platforms.</h3>
      </div>

      <div className="relative flex overflow-x-hidden group py-4">
        {/* Gradients to fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />
        
        <motion.div
          className="flex whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
        >
          {/* Double the array for seamless looping */}
          {[...tools, ...tools].map((tool, i) => (
            <div 
              key={i} 
              className="group mx-4 flex items-center justify-center px-8 py-5 rounded-2xl glass-panel hover:bg-white/10 hover:border-accent/40 transition-all duration-300 cursor-pointer shrink-0 hover:scale-105 hover:shadow-[0_0_20px_-5px_rgba(161,98,7,0.4)]"
            >
              <span className="text-base font-medium text-white tracking-wide group-hover:text-accent transition-colors">{tool}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
