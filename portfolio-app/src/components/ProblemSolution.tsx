
import { Hourglass, AlertCircle, CalendarX, Unplug, Zap, TrendingUp, CheckCircle, Layers } from 'lucide-react';

const flipCards = [
  {
    id: 1,
    frontTitle: "Funnels Without Automation",
    frontDesc: "Leads are collected but go cold without nurture.",
    frontIcon: <Hourglass className="w-10 h-10 text-muted-foreground/60 mb-6" strokeWidth={1.5} />,
    backTitle: "Faster Lead Response",
    backDesc: "Leads are contacted instantly, increasing booking probability.",
    backIcon: <Zap className="w-10 h-10 text-accent mb-6 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" strokeWidth={1.5} />,
  },
  {
    id: 2,
    frontTitle: "Unstructured Pipelines",
    frontDesc: "Deals sit in random stages causing manual chasing.",
    frontIcon: <AlertCircle className="w-10 h-10 text-muted-foreground/60 mb-6" strokeWidth={1.5} />,
    backTitle: "Full Pipeline Visibility",
    backDesc: "Every lead has a clear stage, status, and movement history.",
    backIcon: <TrendingUp className="w-10 h-10 text-accent mb-6 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" strokeWidth={1.5} />,
  },
  {
    id: 3,
    frontTitle: "No Follow-Up Logic",
    frontDesc: "Reminders depend on memory, causing inconsistent bookings.",
    frontIcon: <CalendarX className="w-10 h-10 text-muted-foreground/60 mb-6" strokeWidth={1.5} />,
    backTitle: "Reduced No-Shows",
    backDesc: "Automated reminders and re-engagement sequences recover lost leads.",
    backIcon: <CheckCircle className="w-10 h-10 text-accent mb-6 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" strokeWidth={1.5} />,
  },
  {
    id: 4,
    frontTitle: "Disconnected Systems",
    frontDesc: "Using separate CRMs and calendars causes operational friction.",
    frontIcon: <Unplug className="w-10 h-10 text-muted-foreground/60 mb-6" strokeWidth={1.5} />,
    backTitle: "The All-in-One Structure",
    backDesc: "Funnels, pipelines, and automation work seamlessly together.",
    backIcon: <Layers className="w-10 h-10 text-accent mb-6 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" strokeWidth={1.5} />,
  }
];

export default function ProblemSolution() {
  return (
    <div className="w-full mt-32 mb-16 px-4 relative z-10">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4">The Impact</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight font-heading mb-6">
            Transforming <span className="text-slate-400 line-through decoration-red-500/50 decoration-2">Broken Funnels</span><br className="hidden md:block"/> Into <span className="text-accent drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">Structured Systems</span>
          </h3>
        </div>

        {/* CSS Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {flipCards.map((card) => (
            <div 
              key={card.id} 
              className="group w-full h-[320px] [perspective:1000px]"
            >
              <div 
                className="relative w-full h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
              >
                
                {/* Front Side: The Problem */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-slate-900/40 border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-lg">
                  {card.frontIcon}
                  <h4 className="text-white font-heading font-bold text-xl mb-3 tracking-wide">{card.frontTitle}</h4>
                  <div className="w-8 h-px bg-white/10 mb-4" />
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.frontDesc}</p>
                </div>

                {/* Back Side: The Solution */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-slate-900 border border-accent/30 shadow-[0_0_40px_-10px_rgba(212,175,55,0.2)] rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                  {card.backIcon}
                  <h4 className="text-accent font-heading font-bold text-xl mb-3 tracking-wide">{card.backTitle}</h4>
                  <div className="w-8 h-px bg-accent/30 mb-4" />
                  <p className="text-slate-300 text-sm leading-relaxed">{card.backDesc}</p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
