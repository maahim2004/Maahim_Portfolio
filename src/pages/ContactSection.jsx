import { motion } from 'framer-motion';
import { Mail, ArrowRight, User, Users } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 relative mt-12 bg-background/80 border-t border-primary/20 shadow-[0_-10px_30px_rgba(0,240,255,0.05)]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Leadership & Connect */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold text-glow mb-8 text-white">SYSTEM <br/> LEADERSHIP</h2>
              
              <div className="space-y-6 mb-12">
                <div className="glass-panel p-6 border-l-2 border-primary">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-5 h-5 text-primary" />
                    <h3 className="font-display font-bold text-white text-lg">Secretary</h3>
                  </div>
                  <p className="text-textMuted mb-1 text-sm">DRISHTI Revolutionary Club, SVNIT</p>
                  <p className="text-textMuted/60 text-xs font-mono">Operations & Management</p>
                </div>
                
                <div className="glass-panel p-6 border-l-2 border-secondary">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-secondary" />
                    <h3 className="font-display font-bold text-white text-lg">Junior Technical Member</h3>
                  </div>
                  <p className="text-textMuted mb-1 text-sm">DRISHTI Club, SVNIT</p>
                  <p className="text-textMuted/60 text-xs font-mono">Technical Design & Fabrication</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 relative overflow-hidden"
          >
            {/* Cyberpunk circuit accents */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
            
            <h2 className="text-2xl font-display font-bold text-primary mb-2">INITIALIZE COMM-LINK</h2>
            <p className="text-sm text-textMuted mb-8 font-mono">Awaiting transmission...</p>

            <form className="space-y-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-primary/80 uppercase">Name Designation</label>
                  <input 
                    type="text" 
                    className="w-full bg-background/50 border border-white/10 rounded tracking-wide px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-primary/80 uppercase">Comm Channel (Email)</label>
                  <input 
                    type="email" 
                    className="w-full bg-background/50 border border-white/10 rounded tracking-wide px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-mono text-primary/80 uppercase">Data Payload (Message)</label>
                <textarea 
                  rows="4"
                  className="w-full bg-background/50 border border-white/10 rounded tracking-wide px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  placeholder="Enter your message sequence here..."
                ></textarea>
              </div>

              <button 
                className="w-full bg-primary/10 hover:bg-primary border border-primary text-primary hover:text-black font-display font-bold py-3 mt-4 flex items-center justify-center gap-2 transition-all duration-300 group"
              >
                <span>TRANSMIT DATA</span>
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
