import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CoverflowCarousel } from './ui/coverflow-carousel';

export default function Portfolio() {
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
      src: UNSPLASH("1523050854058-8df90110c9f1"),
      alt: "Computer Science",
      title: "B.S. Computer Science",
      subtitle: "University of Technology",
      meta: [
        { label: "Type", value: "Education" },
        { label: "Timeline", value: "2017 - 2021" },
      ],
      gallery: [
        UNSPLASH("1522071820081-009f0129c71c"),
        UNSPLASH("1517245386807-bb43f82c33c4")
      ],
      content: (
        <>
          <p>Graduated with honors, focusing on software engineering, database management, and human-computer interaction. My final year thesis involved building a predictive data model for local retail businesses.</p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-sm marker:text-accent/50">
            <li>Dean's List 2019-2021</li>
            <li>Lead Developer for the University Robotics Club</li>
            <li>Published research on scalable web architectures</li>
          </ul>
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
      src: UNSPLASH("1522071820081-009f0129c71c"),
      alt: "Internship",
      title: "Frontend Intern",
      subtitle: "Tech Startup Inc",
      meta: [
        { label: "Type", value: "Experience" },
        { label: "Timeline", value: "2018" },
      ],
      gallery: [
        UNSPLASH("1517245386807-bb43f82c33c4")
      ],
      content: (
        <>
          <p>Assisted the core engineering team in migrating a legacy Angular application to React.</p>
        </>
      )
    },
    {
      src: UNSPLASH("1551288049-bebda4e38f71"),
      alt: "Design Bootcamp",
      title: "UI/UX Bootcamp",
      subtitle: "Design Institute",
      meta: [
        { label: "Type", value: "Education" },
        { label: "Timeline", value: "2017" },
      ],
      gallery: [
        UNSPLASH("1504868584819-f8e8b4b6d7e3")
      ],
      content: (
        <>
          <p>Completed an intensive 12-week design bootcamp focused on user research, wireframing, and interactive prototyping.</p>
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
          <div className="flex justify-center mb-6">
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
          </div>

          <TabsContent value="background" className="mt-0 outline-none w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="w-full max-w-6xl mx-auto">
              <CoverflowCarousel 
                slides={backgroundSlides} 
                showCaption 
                showNavigation
                showPagination
                loop
                cardWidth="clamp(220px, 28vw, 320px)"
                gap={-0.15}
                fade={0.05}
              />
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-0 outline-none w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="w-full max-w-6xl mx-auto">
              <CoverflowCarousel 
                slides={projectSlides} 
                showCaption 
                showNavigation
                showPagination
                loop
                cardWidth="clamp(220px, 28vw, 320px)"
                gap={-0.15}
                fade={0.05}
              />
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </section>
  );
}
