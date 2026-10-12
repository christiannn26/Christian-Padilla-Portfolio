import { TOOLS, type Tool } from '../../data/techStack';
import { SectionEyebrow } from '../ui/SectionEyebrow';

function ToolIcon({ tool }: { tool: Tool }) {
  if ('logo' in tool) {
    return (
      <img
        src={tool.logo}
        alt={tool.name}
        className="w-6 h-6 object-contain opacity-70 group-hover:opacity-100 transition-opacity brightness-0 invert"
      />
    );
  }
  if ('slug' in tool) {
    return (
      <img
        src={`https://cdn.simpleicons.org/${tool.slug}/white`}
        alt={tool.name}
        className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity"
        style={{ imageRendering: 'auto' }}
      />
    );
  }
  const Icon = tool.icon;
  return (
    <div className="opacity-70 group-hover:opacity-100 transition-opacity">
      <Icon className="w-6 h-6 text-accent" />
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="py-16 md:py-24 section-overlap pt-16 md:pt-24">
      <div className="container mx-auto px-4 max-w-7xl mb-16 text-center">
        <SectionEyebrow>Tech Stack</SectionEyebrow>
        <h3 className="text-3xl md:text-4xl font-bold text-white font-heading">Powered by industry-leading platforms.</h3>
      </div>

      <div className="relative flex overflow-x-hidden group py-4">
        {/* Gradients to fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        <div className="flex whitespace-nowrap items-center animate-marquee">
          {/* Double the array for seamless looping (the copy is hidden from screen readers) */}
          {[...TOOLS, ...TOOLS].map((tool, i) => (
            <div
              key={i}
              aria-hidden={i >= TOOLS.length || undefined}
              className="group mx-4 flex items-center justify-center gap-3 px-8 py-5 rounded-2xl glass-panel hover:bg-white/10 hover:border-accent/40 transition-all duration-300 cursor-pointer shrink-0 hover:scale-105 hover:shadow-[0_0_20px_-5px_rgba(229,211,179,0.3)]"
            >
              <ToolIcon tool={tool} />
              <span className="text-base font-medium text-white tracking-wide group-hover:text-accent transition-colors">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
