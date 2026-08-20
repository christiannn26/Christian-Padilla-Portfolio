import { motion } from 'framer-motion';
import { Database } from 'lucide-react';


export default function TechStack() {
  const tools = [
    { name: "GoHighLevel", customImg: "./img/logo/GhlLogo-removebg-preview.png" },
    { name: "n8n", customImg: "./img/logo/n8n.png" },
    { name: "Zapier", customImg: "./img/logo/zapier.png" },
    { name: "Make.com", customImg: "./img/logo/make.png" },
    { name: "Claude AI", customImg: "./img/logo/claude.png" },
    { name: "VsCode", customImg: "./img/logo/vscode.png" },
    { name: "React.js", slug: "react" },
    { name: "Databases", icon: <Database className="w-6 h-6 text-accent" /> },
    { name: "Buffer", customImg: "./img/logo/bff.png" },
    { name: "Calendly", customImg: "./img/logo/calend.png" }
  ];

  return (
    <section className="py-16 md:py-24 section-overlap pt-16 md:pt-24">
      <div className="container mx-auto px-4 max-w-7xl mb-16 text-center">
        <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4">Tech Stack</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-white font-heading">Powered by industry-leading platforms.</h3>
      </div>

      <div className="relative flex overflow-x-hidden group py-4">
        {/* Gradients to fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
        
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
              className="group mx-4 flex items-center justify-center gap-3 px-8 py-5 rounded-2xl glass-panel hover:bg-white/10 hover:border-accent/40 transition-all duration-300 cursor-pointer shrink-0 hover:scale-105 hover:shadow-[0_0_20px_-5px_rgba(229,211,179,0.3)]"
            >
              {tool.customImg ? (
                <img 
                  src={tool.customImg} 
                  alt={tool.name} 
                  className="w-6 h-6 object-contain opacity-70 group-hover:opacity-100 transition-opacity brightness-0 invert" 
                />
              ) : tool.slug ? (
                <img 
                  src={`https://cdn.simpleicons.org/${tool.slug}/white`} 
                  alt={tool.name} 
                  className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" 
                  style={{ imageRendering: "auto" }}
                />
              ) : (
                <div className="opacity-70 group-hover:opacity-100 transition-opacity">
                  {tool.icon}
                </div>
              )}
              <span className="text-base font-medium text-white tracking-wide group-hover:text-accent transition-colors">{tool.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
