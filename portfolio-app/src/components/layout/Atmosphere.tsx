// The stage behind the whole page: near-black, two slow warm stage lights and a
// fine film grain so large dark fields never band. Purely decorative.
export default function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink-950">
      <div className="stage-light-1 absolute -top-[22vh] left-[6vw] h-[78vh] w-[78vh] rounded-full bg-[radial-gradient(circle,rgb(214_185_124/0.085),transparent_62%)]" />
      <div className="stage-light-2 absolute -bottom-[28vh] right-[2vw] h-[86vh] w-[86vh] rounded-full bg-[radial-gradient(circle,rgb(244_239_230/0.045),transparent_60%)]" />
      <div className="stage-grain absolute inset-0" />
    </div>
  );
}
