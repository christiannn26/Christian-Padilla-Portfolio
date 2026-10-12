import { Database, type LucideIcon } from 'lucide-react';

export type Tool =
  | { name: string; logo: string }
  | { name: string; slug: string }
  | { name: string; icon: LucideIcon };

export const TOOLS: Tool[] = [
  { name: 'GoHighLevel', logo: './img/logo/GhlLogo-removebg-preview.png' },
  { name: 'n8n', logo: './img/logo/n8n.png' },
  { name: 'Zapier', logo: './img/logo/zapier.png' },
  { name: 'Make.com', logo: './img/logo/make.png' },
  { name: 'Claude AI', logo: './img/logo/claude.png' },
  { name: 'VsCode', logo: './img/logo/vscode.png' },
  { name: 'React.js', slug: 'react' },
  { name: 'Databases', icon: Database },
  { name: 'Buffer', logo: './img/logo/bff.png' },
  { name: 'Calendly', logo: './img/logo/calend.png' },
];
