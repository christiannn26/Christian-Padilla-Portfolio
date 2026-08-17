export default function GalaxyBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-background">
      {/* High-quality subtle galaxy image, tiled to allow natural flawless scrolling */}
      <div 
        className="absolute inset-0 bg-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=2000')`,
          backgroundSize: '1200px auto',
          opacity: 0.5,
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      />
      {/* Uniform dark overlay to ensure it doesn't overshine elements, while staying visible on all pages */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Subtle gradient to blend the top edge smoothly */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-background to-transparent" />
    </div>
  );
}
