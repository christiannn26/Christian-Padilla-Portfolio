import React from 'react';
import { Maximize2, Grid, MonitorPlay } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CoverflowCarousel } from "./ui/coverflow-carousel";
import type { CoverflowSlide } from "./ui/coverflow-carousel";
import { ProjectDetailsModal } from "./ProjectDetailsModal";
import SystemsShowcase from "./SystemsShowcase";
import InteractiveFlowchart from "./InteractiveFlowchart";
import WorkflowsShowcase from "./WorkflowsShowcase";
import { cn } from "../lib/utils";

export default function Portfolio() {
  const [viewMode, setViewMode] = React.useState<'carousel' | 'grid'>('carousel');
  const [expandedSlide, setExpandedSlide] = React.useState<CoverflowSlide | null>(null);
  const UNSPLASH = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&q=80`;

  const backgroundSlides = [
    {
      src: "/img/certs/11.png",
      alt: "Certifications & Advanced Training",
      title: "Certifications & Advanced Training",
      subtitle: "Professional Credentials",
      imagePosition: "object-center",
      meta: [
        { label: "Type", value: "Certification" },
        { label: "Timeline", value: "Ongoing" },
      ],
      gallery: [
        "/img/certs/12.png"
      ],
      content: (
        <>
          <p>Committed to continuous technical and operational excellence, I have strategically expanded my freelance toolkit through specialized, industry-focused workshops. Earning these credentials has significantly amplified my ability to architect comprehensive, end-to-end business solutions:</p>
          <ul className="list-disc pl-6 mt-4 space-y-3 text-white/80 marker:text-accent">
            <li className="pl-2"><strong>AI Automation & Smart CRM Integration:</strong> Mastered the deployment of intelligent workflows and AI-driven CRM systems to optimize pipeline efficiency and scale business operations.</li>
            <li className="pl-2"><strong>Data-Driven Performance Marketing:</strong> Certified in advanced Facebook Ads strategies, enabling precise audience targeting, campaign optimization, and high-converting client acquisition.</li>
            <li className="pl-2"><strong>Strategic Executive Operations:</strong> Completed specialized Executive Assistant training, equipping me to provide seamless, high-level organizational support and streamline complex administrative workflows.</li>
          </ul>
          <p className="mt-4">These intensive trainings have directly translated into my freelance practice, allowing me to bridge the gap between high-level technical automation and everyday business operations.</p>
        </>
      )
    },
    {
      src: "/img/GHLEvent/IMG_2033.JPG",
      alt: "HighLevel Manila 2026",
      title: "HighLevel Manila 2026",
      subtitle: "GoHighLevel Event",
      imagePosition: "object-center",
      meta: [
        { label: "Type", value: "Event/Certification" },
        { label: "Timeline", value: "July 2026" },
      ],
      gallery: [
        "/img/GHLEvent/IMG_2034.JPG",
        "/img/GHLEvent/IMG_2035.JPG",
        "/img/GHLEvent/IMG_2036.JPG",
        "/img/GHLEvent/IMG_2037.JPG"
      ],
      content: (
        <>
          <p>Attended the premier GoHighLevel event in Manila, an exclusive gathering of top-tier agency owners, industry innovators, and the platform’s visionary founders. This prestigious summit provided unparalleled insights into cutting-edge features and advanced platform capabilities directly from the creators. Beyond high-level networking with leading GHL professionals, this experience served as a powerful catalyst for my technical growth—significantly elevating my expertise in AI-driven automation, robust CRM architecture, and comprehensive GoHighLevel specialization.</p>
          <ul className="list-disc pl-6 mt-4 space-y-3 text-white/80 marker:text-accent">
            <li className="pl-2"><strong>HighLevel medallion</strong></li>
          </ul>
        </>
      )
    },
    {
      src: "/img/bachelors/IMG_1576.JPG",
      alt: "B.S. Computer Engineering",
      title: "B.S. Computer Engineering",
      subtitle: "Colegio de Muntinlupa",
      meta: [
        { label: "Type", value: "Education" },
        { label: "Timeline", value: "2022 - 2026" },
      ],
      gallery: [
        "/img/bachelors/IMG_1584.JPG",
        "/img/bachelors/IMG_2076.JPG"
      ],
      content: (
        <>
          <p>Developed a comprehensive foundation in software development and the seamless integration of Artificial Intelligence across both software and hardware platforms. This rigorous academic environment is exactly where my strong background in modern technologies and AI originates, equipping me with the analytical mindset and technical adaptability to learn any new technology fast.</p>
          <ul className="list-disc pl-6 mt-4 space-y-3 text-white/80 marker:text-accent">
            <li className="pl-2"><strong>AI Hardware & Software Integration:</strong> Co-developer of Project AeroVit, an innovative AI-powered smartwatch device. Focused on bridging complex embedded systems (such as ESP32 and Arduino) with intelligent software applications to deliver functional, real-world solutions.</li>
            <li className="pl-2"><strong>Award-Winning Technical Communication:</strong> Awarded "Best Presenter" at the 2026 DOST-MIRDC International Metals and Engineering Conference for the comprehensive demonstration and pitching of our AI-integrated hardware project.</li>
          </ul>
        </>
      )
    }
  ];

  const projectSlides = [
    {
      src: "/img/LC_EA/4.png",
      alt: "LifeCrafting - Executive Assistant",
      title: "LifeCrafting - California, USA",
      subtitle: "Executive Assistant | Lead Generation & Social Media Specialist",
      meta: [
        { label: "Role", value: "Executive Assistant" },
        { label: "Timeline", value: "2023 - 2025" },
      ],
      gallery: [
        "/img/LC_EA/7.png",
        "/img/LC_EA/8.png",
        "/img/LC_EA/9.png"
      ],
      content: (
        <>
          <p>Provided comprehensive executive support designed to actively scale business operations rather than just manage them. Acting as a dedicated growth partner, I seamlessly combined high-level organizational workflows with aggressive lead generation, automated CRM architectures, and strategic social media management to drive client acquisition and elevate brand authority.</p>
          
          <ul className="list-disc pl-6 mt-6 space-y-6 text-white/80 marker:text-accent">
            <li className="pl-2">
              <strong>Targeted Lead Generation & Outreach:</strong> Drove client acquisition by building highly targeted lead lists, conducting strategic outreach, and engineering automated, high-converting email campaigns.
              <div className="flex flex-wrap gap-2 pt-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">LinkedIn</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">Sales Navigator</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">Facebook Ads</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">ClientScraper</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">Microsoft Excel</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">GoHighLevel (GHL)</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">Kartra</span>
              </div>
            </li>
            
            <li className="pl-2">
              <strong>Social Media Management:</strong> Oversaw end-to-end online presence, running targeted campaigns, scheduling cross-platform posts, and tracking analytics to apply proven strategies that boost overall reach.
              <div className="flex flex-wrap gap-2 pt-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">Facebook Ads Manager</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">Buffer</span>
              </div>
            </li>
            
            <li className="pl-2">
              <strong>Creative Content Production:</strong> Designed eye-catching graphics and edited dynamic video content to ensure social channels maintained a steady stream of high-quality, daily posts that build brand authority.
              <div className="flex flex-wrap gap-2 pt-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">Canva</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">Filmora</span>
              </div>
            </li>
          </ul>
        </>
      )
    },
    {
      src: "/img/LC_WD/5.png",
      alt: "LifeCrafting - Full Stack Web Developer",
      title: "LifeCrafting - California, USA",
      subtitle: "Full Stack Web & Application Developer | UI/UX Designer",
      meta: [
        { label: "Role", value: "Full Stack Developer" },
        { label: "Timeline", value: "2024 - 2025" },
      ],
      gallery: [
        "/img/LC_WD/10.png"
      ],
      content: (
        <>
          <p>Bridged the gap between intuitive design and robust technical execution to lead digital projects from initial concept to successful launch. Leveraging a strong engineering foundation and rapid technology adoption, I architected, prototyped, and deployed highly functional web applications across both custom-coded and agile no-code environments.</p>
          
          <ul className="list-disc pl-6 mt-6 space-y-6 text-white/80 marker:text-accent">
            <li className="pl-2">
              <strong>End-to-End Project Leadership & UI/UX Design:</strong> Managed the complete development lifecycle for company websites and applications, drafting intuitive, aesthetically pleasing wireframes and user interfaces from concept to launch.
              <div className="flex flex-wrap gap-2 pt-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">Figma</span>
              </div>
            </li>
            
            <li className="pl-2">
              <strong>Versatile Development Execution:</strong> Built highly responsive, user-friendly digital solutions, leveraging both traditional custom coding environments and agile, rapid-deployment platforms.
              <div className="flex flex-wrap gap-2 pt-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">VSCode</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">Softr</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">Wix</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">Namecheap</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">HTML</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">CSS</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">React.js</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">NoSQL</span>
              </div>
            </li>
          </ul>
        </>
      )
    },
    {
      src: "/img/ibex/2024_09_16_10_45_IMG_8527.jpg",
      alt: "IBEX GLOBAL - Technical Support",
      title: "IBEX GLOBAL",
      subtitle: "Technical Support & Client Retention Specialist – Walmart Logistics",
      meta: [
        { label: "Role", value: "Technical Specialist" },
        { label: "Timeline", value: "2022 - 2023" },
      ],
      imagePosition: "object-center",
      gallery: [
        "/img/ibex/IMG_6885.jpg",
        "/img/ibex/IMG_6889.jpg"
      ],
      content: (
        <>
          <p>Served as a dynamic technical specialist for Walmart’s enterprise delivery application, strategically blending software troubleshooting with frontline retention and product marketing. Operating in a high-pressure environment, I resolved complex technical friction while actively driving new feature adoption and preventing driver churn through persuasive, sales-driven communication.</p>
          
          <ul className="list-disc pl-6 mt-6 space-y-6 text-white/80 marker:text-accent">
            <li className="pl-2">
              <strong>Client Retention & Objection Handling:</strong> Managed high-stress interactions utilizing strategic objection-handling to de-escalate critical issues. Successfully turned frustrated users into satisfied brand advocates, directly preventing churn and preserving supply chain volume.
              <div className="flex flex-wrap gap-2 pt-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">CRM Ticketing Systems</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">VoIP Systems</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">Customer Success Metrics (CSAT)</span>
              </div>
            </li>
            
            <li className="pl-2">
              <strong>Product Marketing & Feature Adoption:</strong> Acted as a frontline brand ambassador by pitching the value proposition of new UI updates. Drove rapid user adoption by educating drivers on how software enhancements optimized their daily delivery workflows.
              <div className="flex flex-wrap gap-2 pt-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">Proprietary Enterprise Software</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">Omnichannel Support Platforms</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">Knowledge Base Architecture</span>
              </div>
            </li>
            
            <li className="pl-2">
              <strong>Advanced Troubleshooting & UX Optimization:</strong> Rapidly diagnosed complex mobile app malfunctions, connectivity drops, and GPS routing errors. Translated technical pain points into structured market feedback for development teams to elevate the overall user journey.
              <div className="flex flex-wrap gap-2 pt-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">iOS/Android OS</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">Bug Tracking Software</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">Mobile Diagnostic Tools</span>
              </div>
            </li>
          </ul>
        </>
      )
    }
  ];

  return (
    <section id="portfolio" className="py-32 relative z-10 bg-transparent rounded-t-[40px] border-t border-white/10 -mt-8 pt-24 shadow-[0_-20px_50px_rgba(0,0,0,0.9),0_-5px_20px_rgba(255,255,255,0.04)] overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4">Experience & Work</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-heading">My Portfolio</h3>
        </div>

        <Tabs defaultValue="projects" className="w-full relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6">
          <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md">
            <TabsTrigger 
              value="projects" 
              className="rounded-xl px-8 py-3 text-sm font-medium text-muted-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-[0_0_20px_-5px_rgba(229,211,179,0.5)] transition-all duration-300"
            >
              Professional Background
            </TabsTrigger>
            <TabsTrigger 
              value="background" 
              className="rounded-xl px-8 py-3 text-sm font-medium text-muted-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-[0_0_20px_-5px_rgba(229,211,179,0.5)] transition-all duration-300"
            >
              Background & Certificates
            </TabsTrigger>
          </TabsList>

          <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md z-20">
            <button 
              onClick={() => setViewMode('carousel')}
              className={cn(
                "px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2",
                viewMode === 'carousel' ? "bg-accent text-accent-foreground shadow-[0_0_20px_-5px_rgba(229,211,179,0.5)]" : "text-muted-foreground hover:text-white"
              )}
            >
              <MonitorPlay className="w-4 h-4" />
              Cinematic
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={cn(
                "px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2",
                viewMode === 'grid' ? "bg-accent text-accent-foreground shadow-[0_0_20px_-5px_rgba(229,211,179,0.5)]" : "text-muted-foreground hover:text-white"
              )}
            >
              <Grid className="w-4 h-4" />
              Grid View
            </button>
          </div>
        </div>

        <TabsContent value="background" className="mt-0 outline-none w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="w-full max-w-6xl mx-auto">
            {viewMode === 'carousel' ? (
              <CoverflowCarousel 
                slides={backgroundSlides} 
                initialSlide={1}
                showCaption 
                showNavigation
                showPagination
                loop
                cardWidth="clamp(220px, 28vw, 320px)"
                gap={-0.15}
                fade={0.05}
                onSlideClick={setExpandedSlide}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
                {backgroundSlides.map((slide, i) => (
                  <div 
                    key={i}
                    onClick={() => setExpandedSlide(slide)}
                    className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer bg-slate-900 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-accent/40 hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.3)] transition-all duration-500 will-change-transform hover:-translate-y-2"
                  >
                    <img src={slide.src} alt={slide.alt} className={cn("w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100", slide.imagePosition || "object-top")} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h4 className="text-2xl font-heading font-bold text-white mb-1 drop-shadow-md">{slide.title}</h4>
                      <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">{slide.subtitle}</p>
                      <div className="inline-flex h-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <Maximize2 className="mr-2 h-3 w-3 text-accent" />
                        View Details
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="mt-0 outline-none w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="w-full max-w-6xl mx-auto">
            {viewMode === 'carousel' ? (
              <CoverflowCarousel 
                slides={projectSlides} 
                showCaption 
                showNavigation
                showPagination
                loop
                cardWidth="clamp(220px, 28vw, 320px)"
                gap={-0.15}
                fade={0.05}
                onSlideClick={setExpandedSlide}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
                {projectSlides.map((slide, i) => (
                  <div 
                    key={i}
                    onClick={() => setExpandedSlide(slide)}
                    className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer bg-slate-900 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-accent/40 hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.3)] transition-all duration-500 will-change-transform hover:-translate-y-2"
                  >
                    <img src={slide.src} alt={slide.alt} className={cn("w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100", slide.imagePosition || "object-top")} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h4 className="text-2xl font-heading font-bold text-white mb-1 drop-shadow-md">{slide.title}</h4>
                      <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">{slide.subtitle}</p>
                      <div className="inline-flex h-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <Maximize2 className="mr-2 h-3 w-3 text-accent" />
                        View Details
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <ProjectDetailsModal slide={expandedSlide} onClose={() => setExpandedSlide(null)} />
    </div>
    
    <SystemsShowcase />
    <InteractiveFlowchart />
    <WorkflowsShowcase />
    </section>
  );
}
