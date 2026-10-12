import { Database, type LucideIcon } from 'lucide-react';

export type Tool =
  /** Raster logo, recoloured to white with CSS filters. */
  | { name: string; logo: string }
  /** Already-white SVG logo. */
  | { name: string; svg: string }
  | { name: string; icon: LucideIcon };

export const TOOLS: Tool[] = [
  { name: 'GoHighLevel', logo: './img/logo/GhlLogo-removebg-preview.webp' },
  { name: 'n8n', logo: './img/logo/n8n.webp' },
  { name: 'Zapier', logo: './img/logo/zapier.webp' },
  { name: 'Make.com', logo: './img/logo/make.webp' },
  { name: 'Claude AI', logo: './img/logo/claude.webp' },
  { name: 'VsCode', logo: './img/logo/vscode.webp' },
  { name: 'React.js', svg: './img/logo/react.svg' },
  { name: 'Databases', icon: Database },
  { name: 'Buffer', logo: './img/logo/bff.webp' },
  { name: 'Calendly', logo: './img/logo/calend.webp' },
];
