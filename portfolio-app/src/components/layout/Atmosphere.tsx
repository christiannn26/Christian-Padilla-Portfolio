// The stage behind the whole page: a near-black ground with a faint mesh of light.
// Three oversized, very low-opacity fields (warm champagne, a cool slate counter-light,
// a low warm bounce) drift too slowly to notice, a soft sheen falls from the top, and a
// fine grain keeps large dark areas from banding. It must never compete with content.
export default function Atmosphere() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[linear-gradient(180deg,#0a0a0c_0%,#060607_48%,#050506_100%)]"
    >
      <div className="mesh-1 absolute left-[-18vw] top-[-24vh] h-[95vh] w-[82vw] rounded-full bg-[radial-gradient(closest-side,rgb(214_185_124/0.085),transparent)]" />
      <div className="mesh-2 absolute right-[-22vw] top-[16vh] h-screen w-[78vw] rounded-full bg-[radial-gradient(closest-side,rgb(112_126_162/0.065),transparent)]" />
      <div className="mesh-3 absolute bottom-[-32vh] left-[12vw] h-[82vh] w-[72vw] rounded-full bg-[radial-gradient(closest-side,rgb(164_135_72/0.055),transparent)]" />
      <div className="absolute inset-x-0 top-0 h-[42vh] bg-[radial-gradient(ellipse_62%_100%_at_50%_0%,rgb(244_239_230/0.035),transparent)]" />
      <div className="stage-grain absolute inset-0" />
    </div>
  );
}
