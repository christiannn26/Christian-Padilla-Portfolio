const mockData = [
  {
    title: "Crowning Glory Co.",
    type: "Appointment/Services Booking website",
    industry: "Beauty Industry",
    image: "/img/Funnels/salon.png",
    link: "http://crowningglory.me/"
  },
  {
    title: "Bright Smiles Dental Clinic",
    type: "Appointment Booking Funnel (w/ free consultation offer)",
    industry: "Dental/Family Healthcare",
    image: "/img/Funnels/brightsmiles.png",
    link: "http://brightsmiles.christianpadilla.online/"
  },
  {
    title: "HighLevel Webinar",
    type: "Webinar Funnel",
    industry: "Software as a Service (SaaS)",
    image: "/img/Funnels/webinar.png",
    link: "http://highlevelwebinar.christianpadilla.online/"
  },
  {
    title: "NovaScale Marketing Agency",
    type: "Landing Page",
    industry: "Marketing Agency",
    image: "/img/Funnels/marketing.png",
    link: "http://novascale.christianpadilla.online/"
  }
];

export default function SystemsShowcase() {
  return (
    <div className="mt-40 w-full relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-20 space-y-8 px-4">
        <div>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-heading mb-4">
            <span className="text-accent drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">The System</span> Behind Every Funnel
          </h3>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Funnels capture the lead. Pipelines track the opportunity. Segmentation organizes contacts. Automation drives the process.
          </p>
        </div>
        
        <div className="pt-8 relative">
          {/* Subtle separator */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
          
          <h4 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-heading mb-4 pt-4">
            Designed To <span className="text-accent drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">Convert.</span> Built To <span className="text-accent drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">Track.</span>
          </h4>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Every page is mapped to a workflow, every action triggers automation, and every lead is tracked from first click to closed deal.
          </p>
        </div>
      </div>

      <div className="w-full px-2 md:px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockData.map((item, index) => (
          <div key={index} className="group bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden h-full flex flex-col backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-accent/40 hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.3)] hover:z-10 relative">
            {/* Top Half (Image) - Increased height */}
            <div className="w-full aspect-square bg-slate-800 relative overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100"
              />
            </div>

            {/* Bottom Half (Content) */}
            <div className="p-5 flex flex-col flex-grow relative z-10 bg-slate-900/60">
              <h5 className="text-xl font-bold text-white mb-4 uppercase tracking-wide drop-shadow-md">{item.title}</h5>
              
              <div className="space-y-2 mb-6 flex-grow">
                <p className="text-sm text-slate-300 bg-white/5 px-3 py-2 rounded-lg border border-white/5">
                  <span className="font-bold text-white mr-2">Type :</span> {item.type}
                </p>
                <p className="text-sm text-slate-300 bg-white/5 px-3 py-2 rounded-lg border border-white/5">
                  <span className="font-bold text-white mr-2">Industry :</span> {item.industry}
                </p>
              </div>

              <a 
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-accent/10 hover:bg-accent hover:text-accent-foreground text-accent font-bold rounded-lg transition-all duration-300 border border-accent/20 hover:shadow-[0_0_20px_-5px_rgba(212,175,55,0.4)] tracking-wider text-xs uppercase text-center flex items-center justify-center"
              >
                View Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
