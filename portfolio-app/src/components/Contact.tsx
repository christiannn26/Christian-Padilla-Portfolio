import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-primary rounded-3xl overflow-hidden shadow-2xl relative">
          
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-accent via-primary to-primary"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
            {/* Contact Info */}
            <div className="p-12 lg:p-16 text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's work together</h2>
              <p className="text-primary-foreground/70 mb-12 max-w-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
              </p>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/60">Email</p>
                    <p className="font-medium">hello@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/60">Phone</p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/60">Location</p>
                    <p className="font-medium">San Francisco, CA (Remote)</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="p-12 lg:p-16 bg-card rounded-l-3xl lg:rounded-l-none border-t lg:border-t-0 lg:border-l border-border">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">First Name</label>
                    <input type="text" className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Last Name</label>
                    <input type="text" className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <input type="email" className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all" placeholder="john@example.com" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">How can I help?</label>
                  <textarea className="w-full h-32 p-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none" placeholder="Tell me about your project..."></textarea>
                </div>
                
                <button type="button" className="w-full h-12 inline-flex items-center justify-center rounded-lg bg-accent text-primary-foreground font-medium hover:bg-accent/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
