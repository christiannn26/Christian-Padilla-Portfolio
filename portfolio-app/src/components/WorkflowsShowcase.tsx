import { useState, useRef, type WheelEvent, type PointerEvent, useEffect } from 'react';
import { Play } from 'lucide-react';
import { cn } from '../lib/utils';
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

interface WorkflowData {
  id: string;
  title: string;
  description: string;
  thumbnailSrc: string;
  highResSrc: string;
}

const workflows: WorkflowData[] = [
  { 
    id: '1', 
    title: 'Lead Capture & Recovery', 
    description: 'From traffic to booking confirmation, every lead is monitored. If someone submits a form but does not complete scheduling, the system automatically follows up, updates the pipeline, and recovers the opportunity. No lost leads. No manual chasing.', 
    thumbnailSrc: './img/Workflows/Lead Capture & Recovery_thumb.webp',
    highResSrc: './img/Workflows/Lead Capture & Recovery.webp'
  },
  { 
    id: '2', 
    title: 'Booking to New Lead Pipeline', 
    description: 'When an appointment is confirmed, the system instantly assigns ownership, notifies the team, verifies the opportunity, updates the pipeline stage, syncs lifecycle status, and cleans up pending tags. Booking data, CRM, and pipeline stay perfectly aligned without manual updates.', 
    thumbnailSrc: './img/Workflows/Booking to New Lead Pipeline_thumb.webp',
    highResSrc: './img/Workflows/Booking to New Lead Pipeline.webp'
  },
  { 
    id: '3', 
    title: 'Appointment Confirmation', 
    description: 'Appointments are confirmed, reminded, tracked, and protected automatically. Reply routing handles YES or RESCHEDULE, reminders go out strategically, no-shows trigger recovery flows, and pipeline stages update in real time. Attendance increases. Revenue leaks decrease.', 
    thumbnailSrc: './img/Workflows/Appointment Confirmation_thumb.webp',
    highResSrc: './img/Workflows/Appointment Confirmation.webp'
  },
  { 
    id: '4', 
    title: 'Re-Engagement Sequence', 
    description: 'When leads go cold, cancel, or miss appointments, the system automatically re-engages them. Timed follow-ups, booking reminders, internal alerts, and conditional exits reactivate interest while keeping the pipeline clean. Lost leads are given structured second chances without manual chasing.', 
    thumbnailSrc: './img/Workflows/Re-Engagement Sequence_thumb.webp',
    highResSrc: './img/Workflows/Re-Engagement Sequence.webp'
  },
  { 
    id: '5', 
    title: 'No-Show Handler', 
    description: 'Missed appointments automatically trigger status updates, tag cleanup, internal alerts, and a structured re-engagement message. Instead of losing the opportunity, the system moves fast to recover it while keeping your CRM accurate.', 
    thumbnailSrc: './img/Workflows/No-Show Handler_thumb.webp',
    highResSrc: './img/Workflows/No-Show Handler.webp'
  },
];

export default function WorkflowsShowcase() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowData | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Background Preloading Engine
  useEffect(() => {
    // Wait 3 seconds after initial mount to safely silently preload 4K assets
    const timer = setTimeout(() => {
      workflows.forEach(wf => {
        const img = new Image();
        img.src = wf.highResSrc;
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full mt-16 md:mt-32 mb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4">Deep Dives</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-heading mb-6">
            <span className="text-accent drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">Automation Workflows</span><br className="hidden md:block"/> That Run Behind the Scenes
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Each workflow handles a specific stage of the lead journey: capturing leads, booking calls, confirming appointments, recovering no-shows, and closing opportunities.
          </p>
        </div>

        {/* 3-2 Grid Alignment using flex-wrap */}
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
          {workflows.map((wf) => (
            <div 
              key={wf.id}
              onClick={() => setSelectedWorkflow(wf)}
              className="group relative w-full sm:w-[calc(50%-16px)] md:w-[calc(33.333%-22px)] min-w-0 sm:min-w-[320px] max-w-[450px] h-64 md:h-96 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-accent/50 transition-colors bg-slate-900"
            >
              {/* If no image exists yet, the alt text or a blank slate will show, but object-cover is applied */}
              <img 
                src={wf.thumbnailSrc} 
                alt={wf.title} 
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-100" 
              />
              
              {/* Gradient overlay bottom half */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 to-transparent flex items-end p-6">
                <h4 className="text-white font-bold text-lg leading-tight">{wf.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Full-width Video Showcase Container */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-heading mb-3">
              See The System In Action
            </h3>
            <div className="w-16 h-1 bg-accent/50 mx-auto mb-4 rounded-full" />
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              Watch a full walkthrough of how these precise automation workflows interconnect to build a seamless, conversion-driven machine.
            </p>
          </div>
          
          <div 
            className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-[0_0_50px_-15px_rgba(212,175,55,0.3)] group cursor-pointer" 
            onClick={() => setIsVideoPlaying(true)}
          >
            {!isVideoPlaying ? (
              <>
                <img 
                  src="./img/coverdemo.jpg" 
                  alt="System Demo Cover" 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 bg-accent/90 backdrop-blur rounded-full flex items-center justify-center pl-2 shadow-[0_0_30px_rgba(212,175,55,0.6)] group-hover:scale-110 group-hover:bg-accent transition-all duration-300">
                    <Play className="w-8 h-8 text-slate-950 fill-current" />
                  </div>
                </div>
              </>
            ) : (
              <iframe 
                className="w-full h-full absolute inset-0"
                src="https://www.youtube.com/embed/KQQQuX8c6PY?autoplay=1&rel=0&modestbranding=1" 
                title="System Walkthrough" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>

      </div>

      {selectedWorkflow && (
        <WorkflowModal workflow={selectedWorkflow} onClose={() => setSelectedWorkflow(null)} />
      )}
    </div>
  );
}

function WorkflowModal({ workflow, onClose }: { workflow: WorkflowData, onClose: () => void }) {
  return (
    <Dialog open={!!workflow} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] md:max-w-[90vw] h-[95vh] md:h-[90vh] bg-slate-950/80 backdrop-blur-2xl border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,1)] text-white p-0 overflow-hidden rounded-[2rem] gap-0 flex flex-col md:grid md:grid-cols-2 min-h-0">
        
        {/* Left Column: Details */}
        <div className="p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 bg-slate-950/50 order-2 md:order-1 h-[40vh] md:h-full overflow-y-auto custom-scrollbar shrink-0 min-h-0">
          <h2 className="text-accent text-sm font-bold tracking-widest uppercase mb-4">Workflow Inspection</h2>
          <DialogTitle className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight">{workflow.title}</DialogTitle>
          <div className="w-12 h-1 bg-accent/50 mb-6 rounded-full" />
          <p className="text-slate-300 text-lg leading-relaxed">{workflow.description}</p>
        </div>

        {/* Right Column: Interactive Canvas */}
        <div className="relative order-1 md:order-2 flex-1 md:h-full min-h-0 bg-slate-950">
          <InteractiveCanvas workflow={workflow} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InteractiveCanvas({ workflow }: { workflow: WorkflowData }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Track progressive loading of the massive image
  useEffect(() => {
    setIsHighResLoaded(false);
    const img = new Image();
    img.src = workflow.highResSrc;
    img.onload = () => setIsHighResLoaded(true);
  }, [workflow.highResSrc]);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (scale <= 1) return; // Only allow drag when zoomed
    setIsDragging(true);
    setDragStart({ 
      x: e.clientX - position.x, 
      y: e.clientY - position.y 
    });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // Handle native wheel event to prevent window scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      const zoomSensitivity = 0.002;
      const delta = -e.deltaY * zoomSensitivity;
      
      setScale((prevScale) => {
        const newScale = Math.min(Math.max(1, prevScale + delta), 5);
        // Reset position when zoomed all the way out
        if (newScale === 1) setPosition({ x: 0, y: 0 });
        return newScale;
      });
    };

    // Cast as generic EventListener to satisfy TS
    el.addEventListener('wheel', handleWheelNative as unknown as EventListener, { passive: false });
    return () => el.removeEventListener('wheel', handleWheelNative as unknown as EventListener);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden bg-slate-950 flex items-center justify-center select-none touch-none",
        scale > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* HUD Instructions */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-slate-900/80 rounded-full border border-white/10 text-xs font-mono text-white/80 backdrop-blur pointer-events-none shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        Wheel to Zoom • Drag to Pan
      </div>
      
      {/* Zoom Indicator */}
      <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 bg-slate-900/80 rounded-full border border-white/10 text-xs font-mono text-white/80 backdrop-blur pointer-events-none shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        {Math.round(scale * 100)}%
      </div>

      {/* Layer 1: Blur-Up Thumbnail (Loaded instantly) */}
      <img 
        src={workflow.thumbnailSrc} 
        alt="Canvas Base"
        draggable={false}
        className="absolute w-full h-full object-contain pointer-events-none will-change-transform filter blur-md transition-opacity duration-700 ease-in-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          opacity: isHighResLoaded ? 0 : 1
        }}
      />
      
      {/* Layer 2: High-Res Image (Snaps in perfectly when loaded) */}
      <img 
        src={workflow.highResSrc} 
        alt="Interactive Canvas"
        draggable={false}
        className="absolute w-full h-full object-contain pointer-events-none will-change-transform transition-opacity duration-700 ease-in-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          opacity: isHighResLoaded ? 1 : 0
        }}
      />
    </div>
  );
}
