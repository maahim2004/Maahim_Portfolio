import { motion } from 'framer-motion';
import { Mail, ArrowRight, User, Users, CheckCircle2, ShieldCheck, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch('https://formspree.io/maahim2627@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormStatus('success');
        e.target.reset();
      } else {
        const data = await response.json();
        console.error('Formspree Error:', data);
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      setFormStatus('error');
    }
  };

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

                <div className="pt-6 border-t border-white/5">
                   <p className="text-sm text-textMuted mb-4 font-mono uppercase tracking-widest text-primary/60">Secure Communication Protocol</p>
                   <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 text-white/80">
                         <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                            <ShieldCheck className="w-4 h-4 text-primary" />
                         </div>
                         <span className="text-xs font-mono">End-to-End Encrypted Data Stream</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/80">
                         <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                            <Mail className="w-4 h-4 text-secondary" />
                         </div>
                         <span className="text-xs font-mono">maahim2627@gmail.com</span>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 relative overflow-hidden flex flex-col min-h-[500px]"
          >
            {/* Cyberpunk circuit accents */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
            
            <h2 className="text-2xl font-display font-bold text-primary mb-2 uppercase tracking-tight">Comm-Link Channel</h2>
            
            {formStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center p-6"
              >
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 shadow-glow-primary border border-primary/30">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">TRANSMISSION RECEIVED</h3>
                <p className="text-textMuted font-mono text-sm max-w-xs mb-8">
                  Your data payload has been successfully uplinked to the server. Response sequence initiated.
                </p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="px-6 py-2 border border-primary/50 text-primary font-mono text-xs hover:bg-primary/10 transition-colors uppercase tracking-widest"
                >
                  Return to Dashboard
                </button>
              </motion.div>
            ) : (
              <>
                <p className="text-sm text-textMuted mb-8 font-mono">Status: {formStatus === 'sending' ? 'Uplinking Data...' : 'Awaiting Transmission...'}</p>

                <form className="space-y-4 relative z-10 flex-1" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-primary/80 uppercase tracking-widest">Name Designation</label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        className="w-full bg-background/50 border border-white/10 rounded tracking-wide px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-white/10"
                        placeholder="IDENTIFY RECIPIENT..."
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-primary/80 uppercase tracking-widest">Comm Channel (Email)</label>
                      <input 
                        required
                        name="email"
                        type="email" 
                        className="w-full bg-background/50 border border-white/10 rounded tracking-wide px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-white/10"
                        placeholder="UPLINK @ ADDRESS..."
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-primary/80 uppercase tracking-widest">Data Payload (Message)</label>
                    <textarea 
                      required
                      name="message"
                      rows="6"
                      className="w-full bg-background/50 border border-white/10 rounded tracking-wide px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none placeholder:text-white/10"
                      placeholder="ENTER CORE SEQUENCE..."
                    ></textarea>
                  </div>

                  <button 
                    disabled={formStatus === 'sending'}
                    className={`w-full ${formStatus === 'sending' ? 'bg-primary/5 cursor-not-allowed opacity-50' : 'bg-primary/10 hover:bg-primary'} border border-primary text-primary hover:text-black font-display font-bold py-4 mt-4 flex items-center justify-center gap-3 transition-all duration-300 group overflow-hidden relative`}
                  >
                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-shimmer"></div>
                    <span className="relative z-10 tracking-[0.2em]">{formStatus === 'sending' ? 'TRANSMITTING...' : 'INITIALIZE UPLINK'}</span>
                    <Send className={`w-5 h-5 relative z-10 ${formStatus === 'sending' ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1'} transition-transform`} />
                  </button>
                  
                  {formStatus === 'error' && (
                    <p className="text-red-400 text-[10px] font-mono mt-2 text-center uppercase tracking-widest">Critical Error: Transmission Interrupted. Try Again.</p>
                  )}
                </form>
              </>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
