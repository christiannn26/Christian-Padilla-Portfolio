import { Zap, Database, Code, Filter, Server, Briefcase, type LucideIcon } from 'lucide-react';

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  poweredBy: string[];
}

export const SERVICES: Service[] = [
  {
    title: 'Workflow Automation',
    description: 'I connect your favorite apps and build AI-driven workflows that do the heavy lifting, saving you hours of manual data entry every single week.',
    icon: Zap,
    poweredBy: ['GHL', 'n8n', 'Make.com', 'Zapier'],
  },
  {
    title: 'GHL | CRM Architecture',
    description: 'Stop losing track of leads. I build out comprehensive CRM architectures complete with clean data migration, smart pipelines, and automated follow-ups.',
    icon: Database,
    poweredBy: ['GoHighLevel'],
  },
  {
    title: 'Full-Stack Web Development',
    description: 'From smooth front-end designs to secure back-end databases, I code and launch reliable web applications that look incredible and work flawlessly.',
    icon: Code,
    poweredBy: ['React.js', 'Next.js', 'VS Code', 'ClaudeCode', 'Custom Databases'],
  },
  {
    title: 'Designing Funnels',
    description: 'I design and build strategic sales funnels that guide your visitors step-by-step, maximizing your conversion rates and driving more revenue.',
    icon: Filter,
    poweredBy: ['GoHighLevel', 'Figma'],
  },
  {
    title: 'System Management',
    description: "Technology breaks; I make sure yours doesn't. I provide ongoing support, manage your custom API webhooks, and keep your hosted systems running smoothly.",
    icon: Server,
    poweredBy: ['Vercel', 'Railway', 'Claude AI'],
  },
  {
    title: 'Overall Executive Assistance',
    description: 'Think of me as the digital manager for your business. I handle the technical troubleshooting, social media management, and daily operations so you are free to be the CEO.',
    icon: Briefcase,
    poweredBy: ['Buffer', 'GHL', 'Social Medias'],
  },
];
