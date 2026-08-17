import { motion } from 'framer-motion';
import { Database } from 'lucide-react';

const VSCodeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 0 8.026v7.946a1 1 0 0 0 .327.765l1.323 1.202a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
  </svg>
);

const GHLIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="5 17 12 10 19 17" />
    <polyline points="5 12 12 5 19 12" />
    <polyline points="5 7 12 0 19 7" />
  </svg>
);

export default function TechStack() {
  const tools = [
    { name: "GoHighLevel", customImg: "/img/logo/GhlLogo-removebg-preview.png" },
    { name: "n8n", customImg: "/img/logo/n8n.png" },
    { name: "Zapier", customImg: "/img/logo/zapier.png" },
    { name: "Make.com", customImg: "/img/logo/make.png" },
    { name: "Claude AI", customImg: "/img/logo/claude.png" },
    { name: "VsCode", customImg: "/img/logo/vscode.png" },
    { name: "React.js", slug: "react" },
    { name: "Databases", icon: <Database className="w-6 h-6 text-accent" /> },
    { name: "Buffer", customImg: "/img/logo/bff.png" },
    { name: "Calendly", customImg: "/img/logo/calend.png" }
  ];

  return (
    <section className="py-24 relative z-10 bg-transparent rounded-t-[40px] border-t border-white/10 -mt-8 pt-24 shadow-[0_-20px_50px_rgba(0,0,0,0.9),0_-5px_20px_rgba(255,255,255,0.04)]">
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
                  style={{ imageRendering: "high-quality" }}
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
