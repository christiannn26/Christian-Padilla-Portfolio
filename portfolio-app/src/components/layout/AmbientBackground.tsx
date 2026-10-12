const FADE_IN_FROM_TOP = 'linear-gradient(to bottom, transparent 10%, black 25%)';

// Fixed backdrop behind the whole page: dot pattern, faint grid and two drifting spotlights.
export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-background">
      {/* Subtle Dot Pattern (Champagne Gold) */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'radial-gradient(rgba(212, 175, 55, 0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: FADE_IN_FROM_TOP,
          WebkitMaskImage: FADE_IN_FROM_TOP,
        }}
      />

      {/* Faint Structural Grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '128px 128px',
          maskImage: FADE_IN_FROM_TOP,
          WebkitMaskImage: FADE_IN_FROM_TOP,
        }}
      />

      {/* CSS-only ambient spotlights — zero JS overhead vs Framer Motion infinite animations */}
      <div
        className="absolute top-[5%] left-[10%] w-[60vw] h-[60vw] rounded-full pointer-events-none opacity-60 spotlight-drift-1"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 50%)' }}
      />
      <div
        className="absolute bottom-[10%] right-[5%] w-[70vw] h-[70vw] rounded-full pointer-events-none opacity-60 spotlight-drift-2"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(250, 249, 246, 0.05) 0%, transparent 50%)' }}
      />
    </div>
  );
}
