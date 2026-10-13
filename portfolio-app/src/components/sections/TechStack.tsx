import { TOOLS, type Tool } from '../../data/techStack';
import { cn } from '../../lib/utils';
import { Reveal } from '../ui/Reveal';
import { useStageNow } from '../../hooks/useActiveStage';

function ToolIcon({ tool }: { tool: Tool }) {
  if ('logo' in tool) {
    return (
      <img
        src={tool.logo}
        alt={tool.name}
        className="h-5 w-5 object-contain opacity-60 brightness-0 invert transition-opacity duration-300 group-hover:opacity-100"
      />
    );
  }
  if ('svg' in tool) {
    return <img src={tool.svg} alt={tool.name} className="h-5 w-5 opacity-60 transition-opacity duration-300 group-hover:opacity-100" />;
  }
  const Icon = tool.icon;
  return <Icon className="h-5 w-5 text-ivory/60 transition-colors duration-300 group-hover:text-gold" strokeWidth={1.5} />;
}

export default function TechStack() {
  const now = useStageNow('tech-stack');
  return (
    <section id="tech-stack" {...now} className="stage-pad relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <h2 className="mb-14 max-w-5xl type-statement text-ivory">
            Powered by industry-leading platforms.
          </h2>
        </Reveal>
      </div>

      {/* Edges fade through a mask so the chips dissolve rather than hit a wall. The strip
          holds still under the pointer so a chip can be read; with reduced motion it is a
          plain scrollable row instead. */}
      <div className="track-scroll relative flex overflow-x-hidden py-4 mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] motion-reduce:overflow-x-auto">
        <div className="flex items-center whitespace-nowrap animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
          {/* Double the array for seamless looping (the copy is hidden from screen readers) */}
          {[...TOOLS, ...TOOLS].map((tool, i) => (
            <div
              key={i}
              aria-hidden={i >= TOOLS.length || undefined}
              className={cn(
                'group mx-2 flex shrink-0 items-center gap-3 rounded-full border border-line bg-ink-900/70 py-3.5 pl-4 pr-6',
                'shadow-[inset_0_1px_0_rgb(244_239_230/0.07),0_14px_30px_-18px_rgb(0_0_0/0.9)] transition-[border-color,background-color,translate] duration-300 ease-out-quint',
                'hover:-translate-y-0.5 hover:border-gold/40 hover:bg-ink-850',
                i >= TOOLS.length && 'motion-reduce:hidden',
              )}
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/5 transition-colors duration-300 group-hover:bg-gold/10">
                <ToolIcon tool={tool} />
              </span>
              <span className="text-[0.9375rem] font-medium tracking-wide text-ivory/85 transition-colors duration-300 group-hover:text-gold-bright">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
