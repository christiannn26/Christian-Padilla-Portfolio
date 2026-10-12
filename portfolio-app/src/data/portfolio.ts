import type { CoverflowSlide } from '../components/ui/coverflow-carousel';

export interface SlideBullet {
  title: string;
  text?: string;
  /** Tools used, rendered as gold pills under the bullet. */
  tags?: string[];
}

export interface SlideDetails {
  /** `compact`: tight list (credentials). `detailed`: roomier list with tool tags (roles). */
  variant: 'compact' | 'detailed';
  intro: string;
  bullets: SlideBullet[];
  outro?: string;
}

export type PortfolioSlide = Omit<CoverflowSlide, 'content'> & { details: SlideDetails };

export const BACKGROUND_SLIDES: PortfolioSlide[] = [
  {
    src: './img/certs/HLA.png',
    alt: 'HLA Automation Builder Certification',
    title: 'HLA Automation Builder Certification',
    subtitle: 'Official GoHighLevel Certificate',
    imagePosition: 'object-center',
    meta: [
      { label: 'Type', value: 'Certification' },
      { label: 'Timeline', value: '2026' },
    ],
    gallery: [],
    details: {
      variant: 'compact',
      intro:
        'Recognized and validated by HL Accelerator, this credential solidifies my technical expertise as a GoHighLevel (GHL) specialist capable of architecting end-to-end business solutions from the ground up.',
      bullets: [
        { title: 'Core CRM Architecture:', text: 'Successfully built a fully functional CRM using HighLevel, configuring comprehensive sales pipelines, dynamic appointment calendars, and centralized communication hubs.' },
        { title: 'Advanced Automations:', text: 'Engineered complex backend workflows to completely automate lead nurturing and internal operations, utilizing webhooks and custom API integrations for seamless third-party connectivity.' },
        { title: 'Frontend Conversion Systems:', text: 'Designed and deployed high-converting sales funnels, professional websites, and intelligent forms/surveys to maximize lead capture and client acquisition.' },
        { title: 'Infrastructure & Deliverability:', text: 'Managed crucial backend infrastructure, including Mailgun/LC Email configuration and A2P 10DLC compliance to ensure strictly optimized SMS and email deliverability.' },
        { title: 'Rapid Deployment:', text: 'Leveraged custom GHL snapshots for the efficient, repeatable scaling of proven CRM frameworks across multiple client accounts.' },
      ],
    },
  },
  {
    src: './img/certs/11.png',
    alt: 'Certifications & Advanced Training',
    title: 'Certifications & Advanced Training',
    subtitle: 'Professional Credentials',
    imagePosition: 'object-center',
    meta: [
      { label: 'Type', value: 'Certification' },
      { label: 'Timeline', value: 'Ongoing' },
    ],
    gallery: ['./img/certs/12.png'],
    details: {
      variant: 'compact',
      intro:
        'Committed to continuous technical and operational excellence, I have strategically expanded my freelance toolkit through specialized, industry-focused workshops. Earning these credentials has significantly amplified my ability to architect comprehensive, end-to-end business solutions:',
      bullets: [
        { title: 'AI Automation & Smart CRM Integration:', text: 'Mastered the deployment of intelligent workflows and AI-driven CRM systems to optimize pipeline efficiency and scale business operations.' },
        { title: 'Data-Driven Performance Marketing:', text: 'Certified in advanced Facebook Ads strategies, enabling precise audience targeting, campaign optimization, and high-converting client acquisition.' },
        { title: 'Strategic Executive Operations:', text: 'Completed specialized Executive Assistant training, equipping me to provide seamless, high-level organizational support and streamline complex administrative workflows.' },
      ],
      outro:
        'These intensive trainings have directly translated into my freelance practice, allowing me to bridge the gap between high-level technical automation and everyday business operations.',
    },
  },
  {
    src: './img/GHLEvent/IMG_2033.JPG',
    alt: 'HighLevel Manila 2026',
    title: 'HighLevel Manila 2026',
    subtitle: 'GoHighLevel Event',
    imagePosition: 'object-center',
    meta: [
      { label: 'Type', value: 'Event/Certification' },
      { label: 'Timeline', value: 'July 2026' },
    ],
    gallery: ['./img/GHLEvent/IMG_2034.JPG', './img/GHLEvent/IMG_2035.JPG', './img/GHLEvent/IMG_2036.JPG', './img/GHLEvent/IMG_2037.JPG'],
    details: {
      variant: 'compact',
      intro:
        'Attended the premier GoHighLevel event in Manila, an exclusive gathering of top-tier agency owners, industry innovators, and the platform’s visionary founders. This prestigious summit provided unparalleled insights into cutting-edge features and advanced platform capabilities directly from the creators. Beyond high-level networking with leading GHL professionals, this experience served as a powerful catalyst for my technical growth—significantly elevating my expertise in AI-driven automation, robust CRM architecture, and comprehensive GoHighLevel specialization.',
      bullets: [{ title: 'HighLevel medallion' }],
    },
  },
  {
    src: './img/bachelors/IMG_1576.JPG',
    alt: 'B.S. Computer Engineering',
    title: 'B.S. Computer Engineering',
    subtitle: 'Colegio de Muntinlupa',
    meta: [
      { label: 'Type', value: 'Education' },
      { label: 'Timeline', value: '2022 - 2026' },
    ],
    gallery: ['./img/bachelors/IMG_1584.JPG', './img/bachelors/IMG_2076.JPG'],
    details: {
      variant: 'compact',
      intro:
        'Developed a comprehensive foundation in software development and the seamless integration of Artificial Intelligence across both software and hardware platforms. This rigorous academic environment is exactly where my strong background in modern technologies and AI originates, equipping me with the analytical mindset and technical adaptability to learn any new technology fast.',
      bullets: [
        { title: 'AI Hardware & Software Integration:', text: 'Co-developer of Project AeroVit, an innovative AI-powered smartwatch device. Focused on bridging complex embedded systems (such as ESP32 and Arduino) with intelligent software applications to deliver functional, real-world solutions.' },
        { title: 'Award-Winning Technical Communication:', text: 'Awarded "Best Presenter" at the 2026 DOST-MIRDC International Metals and Engineering Conference for the comprehensive demonstration and pitching of our AI-integrated hardware project.' },
      ],
    },
  },
];

export const PROJECT_SLIDES: PortfolioSlide[] = [
  {
    src: './img/LC_EA/4.png',
    alt: 'LifeCrafting - Executive Assistant',
    title: 'LifeCrafting - California, USA',
    subtitle: 'Executive Assistant | Lead Generation & Social Media Specialist',
    meta: [
      { label: 'Role', value: 'Executive Assistant' },
      { label: 'Timeline', value: '2023 - 2025' },
    ],
    gallery: ['./img/LC_EA/77.png', './img/LC_EA/8.png', './img/LC_EA/9.png'],
    details: {
      variant: 'detailed',
      intro:
        'Provided comprehensive executive support designed to actively scale business operations rather than just manage them. Acting as a dedicated growth partner, I seamlessly combined high-level organizational workflows with aggressive lead generation, automated CRM architectures, and strategic social media management to drive client acquisition and elevate brand authority.',
      bullets: [
        {
          title: 'Targeted Lead Generation & Outreach:',
          text: 'Drove client acquisition by building highly targeted lead lists, conducting strategic outreach, and engineering automated, high-converting email campaigns.',
          tags: ['LinkedIn', 'Sales Navigator', 'Facebook Ads', 'ClientScraper', 'Microsoft Excel', 'GoHighLevel (GHL)', 'Kartra'],
        },
        {
          title: 'Social Media Management:',
          text: 'Oversaw end-to-end online presence, running targeted campaigns, scheduling cross-platform posts, and tracking analytics to apply proven strategies that boost overall reach.',
          tags: ['Facebook Ads Manager', 'Buffer'],
        },
        {
          title: 'Creative Content Production:',
          text: 'Designed eye-catching graphics and edited dynamic video content to ensure social channels maintained a steady stream of high-quality, daily posts that build brand authority.',
          tags: ['Canva', 'Filmora'],
        },
      ],
    },
  },
  {
    src: './img/LC_WD/5.png',
    alt: 'LifeCrafting - Full Stack Web Developer',
    title: 'LifeCrafting - California, USA',
    subtitle: 'Full Stack Web & Application Developer | UI/UX Designer',
    meta: [
      { label: 'Role', value: 'Full Stack Developer' },
      { label: 'Timeline', value: '2024 - 2025' },
    ],
    gallery: ['./img/LC_WD/10.png'],
    details: {
      variant: 'detailed',
      intro:
        'Bridged the gap between intuitive design and robust technical execution to lead digital projects from initial concept to successful launch. Leveraging a strong engineering foundation and rapid technology adoption, I architected, prototyped, and deployed highly functional web applications across both custom-coded and agile no-code environments.',
      bullets: [
        {
          title: 'End-to-End Project Leadership & UI/UX Design:',
          text: 'Managed the complete development lifecycle for company websites and applications, drafting intuitive, aesthetically pleasing wireframes and user interfaces from concept to launch.',
          tags: ['Figma'],
        },
        {
          title: 'Versatile Development Execution:',
          text: 'Built highly responsive, user-friendly digital solutions, leveraging both traditional custom coding environments and agile, rapid-deployment platforms.',
          tags: ['VSCode', 'Softr', 'Wix', 'Namecheap', 'HTML', 'CSS', 'React.js', 'NoSQL'],
        },
      ],
    },
  },
  {
    src: './img/ibex/2024_09_16_10_45_IMG_8527.jpg',
    alt: 'IBEX GLOBAL - Technical Support',
    title: 'IBEX GLOBAL',
    subtitle: 'Technical Support & Client Retention Specialist – Walmart Logistics',
    meta: [
      { label: 'Role', value: 'Technical Specialist' },
      { label: 'Timeline', value: '2022 - 2023' },
    ],
    imagePosition: 'object-center',
    gallery: ['./img/ibex/IMG_6885.jpg', './img/ibex/IMG_6889.jpg'],
    details: {
      variant: 'detailed',
      intro:
        'Served as a dynamic technical specialist for Walmart’s enterprise delivery application, strategically blending software troubleshooting with frontline retention and product marketing. Operating in a high-pressure environment, I resolved complex technical friction while actively driving new feature adoption and preventing driver churn through persuasive, sales-driven communication.',
      bullets: [
        {
          title: 'Client Retention & Objection Handling:',
          text: 'Managed high-stress interactions utilizing strategic objection-handling to de-escalate critical issues. Successfully turned frustrated users into satisfied brand advocates, directly preventing churn and preserving supply chain volume.',
          tags: ['CRM Ticketing Systems', 'VoIP Systems', 'Customer Success Metrics (CSAT)'],
        },
        {
          title: 'Product Marketing & Feature Adoption:',
          text: 'Acted as a frontline brand ambassador by pitching the value proposition of new UI updates. Drove rapid user adoption by educating drivers on how software enhancements optimized their daily delivery workflows.',
          tags: ['Proprietary Enterprise Software', 'Omnichannel Support Platforms', 'Knowledge Base Architecture'],
        },
        {
          title: 'Advanced Troubleshooting & UX Optimization:',
          text: 'Rapidly diagnosed complex mobile app malfunctions, connectivity drops, and GPS routing errors. Translated technical pain points into structured market feedback for development teams to elevate the overall user journey.',
          tags: ['iOS/Android OS', 'Bug Tracking Software', 'Mobile Diagnostic Tools'],
        },
      ],
    },
  },
];
