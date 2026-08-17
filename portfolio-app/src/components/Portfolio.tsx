import React from 'react';
import { Maximize2, Grid, MonitorPlay } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CoverflowCarousel } from "./ui/coverflow-carousel";
import type { CoverflowSlide } from "./ui/coverflow-carousel";
import { ProjectDetailsModal } from "./ProjectDetailsModal";
import { cn } from "../lib/utils";

export default function Portfolio() {
  const [viewMode, setViewMode] = React.useState<'carousel' | 'grid'>('carousel');
  const [expandedSlide, setExpandedSlide] = React.useState<CoverflowSlide | null>(null);
  const UNSPLASH = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&q=80`;

  const backgroundSlides = [
    {
      src: UNSPLASH("1550751827-4bd374c3f58b"),
      alt: "Senior Automation Architect",
      title: "Senior Automation Architect",
      subtitle: "TechFlow Solutions",
      meta: [
        { label: "Type", value: "Experience" },
        { label: "Timeline", value: "2023 - Present" },
      ],
      gallery: [
        UNSPLASH("1551288049-bebda4e38f71"),
        UNSPLASH("1573164713619-24bf7efbf4ce")
      ],
      content: (
        <>
          <p>Leading the development of complex API workflows and GoHighLevel CRM architectures for enterprise clients. I specialize in identifying operational bottlenecks and deploying custom AI agents to resolve them.</p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-sm marker:text-accent/50">
            <li>Architected over 50+ custom Make.com and Zapier integrations.</li>
            <li>Reduced client data entry time by an average of 40% across all managed accounts.</li>
            <li>Developed custom React frontend dashboards pulling directly from GHL webhooks.</li>
          </ul>
        </>
      )
    },
    {
      src: UNSPLASH("1498050108023-c5249f4df085"),
      alt: "Full-Stack Developer",
      title: "Full-Stack Developer",
      subtitle: "Creative Web Agency",
      meta: [
        { label: "Type", value: "Experience" },
        { label: "Timeline", value: "2021 - 2023" },
      ],
      gallery: [
        UNSPLASH("1460925895917-afdab827c52f"),
        UNSPLASH("1504868584819-f8e8b4b6d7e3")
      ],
      content: (
        <>
          <p>Developed and maintained custom React and Next.js applications for various e-commerce and local business clients. Handled everything from database schema design to frontend UI/UX implementation.</p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-sm marker:text-accent/50">
            <li>Built dynamic sales funnels that increased conversion rates by 22%.</li>
            <li>Managed database migrations and ensured zero-downtime deployments.</li>
            <li>Integrated third-party APIs including Stripe, Twilio, and SendGrid.</li>
          </ul>
        </>
      )
    },
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
      src: UNSPLASH("1521737604893-d14cc237f11d"),
      alt: "UX/UI Designer",
      title: "Senior UX Designer",
      subtitle: "Creative Web Agency",
      meta: [
        { label: "Type", value: "Experience" },
        { label: "Timeline", value: "2019 - 2021" },
      ],
      gallery: [
        UNSPLASH("1551288049-bebda4e38f71"),
        UNSPLASH("1504868584819-f8e8b4b6d7e3")
      ],
      content: (
        <>
          <p>Lead the frontend design team, building cohesive design systems and translating brand requirements into functional React components.</p>
        </>
      )
    },
    {
      src: UNSPLASH("1551288049-bebda4e38f71"),
      alt: "Freelance Engineer",
      title: "Freelance Software Engineer",
      subtitle: "Self-Employed",
      meta: [
        { label: "Type", value: "Experience" },
        { label: "Timeline", value: "2018 - 2019" },
      ],
      gallery: [
        UNSPLASH("1522071820081-009f0129c71c"),
        UNSPLASH("1517245386807-bb43f82c33c4")
      ],
      content: (
        <>
          <p>Delivered custom web applications and e-commerce solutions for over 20 small businesses during my final years of university.</p>
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
      src: UNSPLASH("1560518883-ce09059eeffa"),
      alt: "Real Estate CRM",
      title: "Real Estate CRM Migration",
      subtitle: "GoHighLevel Build",
      meta: [
        { label: "Role", value: "Lead Architect" },
        { label: "Stack", value: "GHL, Make.com" },
      ],
      link: "#",
      gallery: [
        UNSPLASH("1551288049-bebda4e38f71"),
        UNSPLASH("1460925895917-afdab827c52f"),
        UNSPLASH("1504868584819-f8e8b4b6d7e3")
      ],
      content: (
        <>
          <p>Completely overhauled the data architecture for a multi-state real estate brokerage, migrating 10,000+ contacts into GoHighLevel.</p>
          <p className="mt-4">Designed custom automated pipelines that trigger localized SMS follow-ups based on the lead's viewing history.</p>
        </>
      )
    },
    {
      src: UNSPLASH("1531297172868-522fcbce0229"),
      alt: "E-Commerce Bot",
      title: "E-Commerce AI Support Bot",
      subtitle: "AI Integration",
      meta: [
        { label: "Role", value: "AI Developer" },
        { label: "Stack", value: "OpenAI, Zapier" },
      ],
      link: "#",
      gallery: [
        UNSPLASH("1531297172868-522fcbce0229"),
        UNSPLASH("1485827404703-89b55fcc595e"),
        UNSPLASH("1555949963-ff9fe0c870eb")
      ],
      content: (
        <>
          <p>Built a custom ChatGPT-powered support agent that interfaces directly with Shopify and Zendesk.</p>
          <p className="mt-4">The agent successfully handles 60% of tier-1 support tickets automatically, checking order status and processing standard return requests.</p>
        </>
      )
    },
    {
      src: UNSPLASH("1460925895917-afdab827c52f"),
      alt: "Automated Lead Funnel",
      title: "Automated Lead Funnel",
      subtitle: "Make/Zapier Workflow",
      meta: [
        { label: "Role", value: "Automation Expert" },
        { label: "Stack", value: "Next.js, Make" },
      ],
      link: "#",
      gallery: [
        UNSPLASH("1460925895917-afdab827c52f"),
        UNSPLASH("1551288049-bebda4e38f71")
      ],
      content: (
        <>
          <p>Created a highly optimized, dynamic lead generation funnel using Next.js on the frontend and intricate Make.com webhooks on the backend.</p>
          <p className="mt-4">Leads are automatically enriched using Clearbit before being injected into the sales team's CRM.</p>
        </>
      )
    },
    {
      src: UNSPLASH("1551288049-bebda4e38f71"),
      alt: "SaaS Dashboard",
      title: "Enterprise SaaS Dashboard",
      subtitle: "React & Node.js",
      meta: [
        { label: "Role", value: "Frontend Lead" },
        { label: "Stack", value: "React, Tailwind" },
      ],
      link: "#",
      gallery: [
        UNSPLASH("1460925895917-afdab827c52f"),
        UNSPLASH("1504868584819-f8e8b4b6d7e3")
      ],
      content: (
        <>
          <p>Designed and built a highly performant analytics dashboard capable of rendering 100,000+ data points in real time using WebGL and React.</p>
        </>
      )
    },
    {
      src: UNSPLASH("1522071820081-009f0129c71c"),
      alt: "Mobile E-commerce App",
      title: "Mobile E-commerce Platform",
      subtitle: "React Native Build",
      meta: [
        { label: "Role", value: "Full Stack Engineer" },
        { label: "Stack", value: "React Native, AWS" },
      ],
      link: "#",
      gallery: [
        UNSPLASH("1517245386807-bb43f82c33c4"),
        UNSPLASH("1551288049-bebda4e38f71")
      ],
      content: (
        <>
          <p>Architected a cross-platform mobile application that generated $2M in revenue in its first year, scaling the backend to handle massive traffic spikes during sales.</p>
        </>
      )
    },
    {
      src: UNSPLASH("1460925895917-afdab827c52f"),
      alt: "Finance Dashboard",
      title: "Personal Finance App",
      subtitle: "FinTech Portfolio",
      meta: [
        { label: "Role", value: "Solo Developer" },
        { label: "Stack", value: "React, Firebase" },
      ],
      link: "#",
      gallery: [
        UNSPLASH("1504868584819-f8e8b4b6d7e3")
      ],
      content: (
        <>
          <p>Developed a complete personal finance tracking tool with real-time budget analytics and categorization using Plaid API.</p>
        </>
      )
    },
    {
      src: UNSPLASH("1517245386807-bb43f82c33c4"),
      alt: "IoT Control Center",
      title: "IoT Home Hub",
      subtitle: "Smart Home Integration",
      meta: [
        { label: "Role", value: "Hardware & Software" },
        { label: "Stack", value: "Vue.js, Node.js" },
      ],
      link: "#",
      gallery: [
        UNSPLASH("1551288049-bebda4e38f71")
      ],
      content: (
        <>
          <p>Built a custom dashboard that aggregates data from 20+ smart home sensors into a single beautiful UI panel.</p>
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

        <Tabs defaultValue="background" className="w-full relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6">
          <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md">
            <TabsTrigger 
              value="background" 
              className="rounded-xl px-8 py-3 text-sm font-medium text-muted-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-[0_0_20px_-5px_rgba(229,211,179,0.5)] transition-all duration-300"
            >
              Background & Certificates
            </TabsTrigger>
            <TabsTrigger 
              value="projects" 
              className="rounded-xl px-8 py-3 text-sm font-medium text-muted-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-[0_0_20px_-5px_rgba(229,211,179,0.5)] transition-all duration-300"
            >
              Featured Projects
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
    </section>
  );
}
