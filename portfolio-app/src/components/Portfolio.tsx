import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown, ChevronUp, GraduationCap, Briefcase } from 'lucide-react';
import { useMagnetic, use3DTilt } from '../hooks/useGSAP';
import { useRef, useState } from 'react';

function ProjectCard({ project, index }: { project: any, index: number }) {
  const cardRef = use3DTilt<HTMLDivElement>();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax using Framer Motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div 
        ref={cardRef} 
        className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 glass-panel p-2"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="w-full h-full rounded-2xl overflow-hidden relative" style={{ transform: "translateZ(20px)" }}>
          <motion.img 
            style={{ y, scale: 1.2 }}
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300" />
          
          {/* Floating button */}
          <div className="absolute top-4 right-4 h-12 w-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_20px_-5px_rgba(250,249,246,0.2)]">
            <ArrowUpRight className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
      <div className="px-2">
        <p className="text-xs font-bold tracking-wider text-accent uppercase mb-2">{project.category}</p>
        <h4 className="text-2xl font-bold text-white font-heading group-hover:text-accent transition-colors">{project.title}</h4>
      </div>
    </motion.div>
  );
}

function BackgroundCard({ item, index }: { item: any, index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => setIsExpanded(!isExpanded)}
      className="glass-panel p-6 md:p-8 rounded-3xl cursor-pointer hover:bg-white/5 transition-colors duration-300 border border-white/5 hover:border-accent/30 shadow-lg"
    >
      <motion.div layout className="flex items-start justify-between gap-4">
        <div className="flex gap-4 md:gap-6 items-start">
          <motion.div layout className="h-12 w-12 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_15px_-3px_rgba(250,249,246,0.05)] text-accent">
            {item.type === 'education' ? <GraduationCap className="h-6 w-6" /> : <Briefcase className="h-6 w-6" />}
          </motion.div>
          <div>
            <motion.p layout className="text-xs font-bold tracking-wider text-accent uppercase mb-1">{item.date}</motion.p>
            <motion.h4 layout className="text-xl md:text-2xl font-bold text-white font-heading mb-1">{item.title}</motion.h4>
            <motion.p layout className="text-sm md:text-base text-muted-foreground font-medium">{item.institution}</motion.p>
          </div>
        </div>
        <motion.div layout className="h-8 w-8 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground transition-colors group-hover:text-white">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </motion.div>
      </motion.div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 24 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-6 border-t border-white/10 text-muted-foreground font-light leading-relaxed space-y-4">
              <p>{item.description}</p>
              {item.bullets && (
                <ul className="list-disc pl-5 space-y-2 text-sm ml-2 marker:text-accent/50">
                  {item.bullets.map((bullet: string, i: number) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<'background' | 'projects'>('background');

  const projects = [
    {
      title: "Real Estate CRM Migration",
      category: "GoHighLevel Build",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800&h=500"
    },
    {
      title: "E-Commerce AI Support Bot",
      category: "AI Integration",
      image: "https://images.unsplash.com/photo-1531297172868-522fcbce0229?auto=format&fit=crop&q=80&w=800&h=500"
    },
    {
      title: "Automated Lead Funnel",
      category: "Make/Zapier Workflow",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=500"
    }
  ];

  const backgroundItems = [
    {
      type: "experience",
      date: "2023 - Present",
      title: "Senior Automation Architect",
      institution: "TechFlow Solutions",
      description: "Leading the development of complex API workflows and GoHighLevel CRM architectures for enterprise clients. I specialize in identifying operational bottlenecks and deploying custom AI agents to resolve them.",
      bullets: [
        "Architected over 50+ custom Make.com and Zapier integrations.",
        "Reduced client data entry time by an average of 40% across all managed accounts.",
        "Developed custom React frontend dashboards pulling directly from GHL webhooks."
      ]
    },
    {
      type: "experience",
      date: "2021 - 2023",
      title: "Full-Stack Developer",
      institution: "Creative Web Agency",
      description: "Developed and maintained custom React and Next.js applications for various e-commerce and local business clients. Handled everything from database schema design to frontend UI/UX implementation.",
      bullets: [
        "Built dynamic sales funnels that increased conversion rates by 22%.",
        "Managed database migrations and ensured zero-downtime deployments.",
        "Integrated third-party APIs including Stripe, Twilio, and SendGrid."
      ]
    },
    {
      type: "education",
      date: "2017 - 2021",
      title: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      description: "Graduated with honors, focusing on software engineering, database management, and human-computer interaction. My final year thesis involved building a predictive data model for local retail businesses.",
      bullets: [
        "Dean's List 2019-2021",
        "Lead Developer for the University Robotics Club",
        "Published research on scalable web architectures"
      ]
    }
  ];

  return (
    <section id="portfolio" className="py-32 relative z-10 bg-transparent rounded-t-[40px] border-t border-white/10 -mt-8 pt-24 shadow-[0_-20px_50px_rgba(0,0,0,0.9),0_-5px_20px_rgba(255,255,255,0.04)] min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4">Experience & Work</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-heading">My Portfolio</h3>
          </div>
          
          {/* Tab Switcher */}
          <div className="flex p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md w-full md:w-auto">
            <button
              onClick={() => setActiveTab('background')}
              className={`relative flex-1 md:flex-none px-6 py-3 text-sm font-medium rounded-xl transition-colors duration-300 z-10 ${
                activeTab === 'background' ? 'text-black' : 'text-muted-foreground hover:text-white'
              }`}
            >
              {activeTab === 'background' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-accent rounded-xl -z-10 shadow-[0_0_20px_-5px_rgba(229,211,179,0.5)]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              Background & Certificates
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`relative flex-1 md:flex-none px-6 py-3 text-sm font-medium rounded-xl transition-colors duration-300 z-10 ${
                activeTab === 'projects' ? 'text-black' : 'text-muted-foreground hover:text-white'
              }`}
            >
              {activeTab === 'projects' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-accent rounded-xl -z-10 shadow-[0_0_20px_-5px_rgba(229,211,179,0.5)]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              Featured Projects
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative">
          <AnimatePresence mode="wait">
            
            {activeTab === 'background' && (
              <motion.div
                key="background"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="max-w-3xl mx-auto space-y-6"
              >
                {backgroundItems.map((item, i) => (
                  <BackgroundCard key={i} item={item} index={i} />
                ))}
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                style={{ perspective: "1000px" }}
              >
                {projects.map((project, i) => (
                  <ProjectCard key={i} project={project} index={i} />
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
