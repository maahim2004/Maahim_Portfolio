import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ExternalLink, User, Users, Phone, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {
  const [hoveredLink, setHoveredLink] = useState(null);

  const connectLinks = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      label: 'Professional Network',
      url: 'https://www.linkedin.com/in/maahim-patel-a258302b1/', // User's LinkedIn profile
      color: 'text-[#0077b5]',
      borderColor: 'border-[#0077b5]/30'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      label: 'Code Repositories',
      url: 'https://github.com/maahim2004',
      color: 'text-white',
      borderColor: 'border-white/30'
    },
    {
      id: 'reachout',
      name: 'Direct Contact',
      icon: <MessageSquare className="w-5 h-5" />,
      label: 'Inquiries & Collabs',
      url: 'mailto:maahim2627@gmail.com',
      color: 'text-primary',
      borderColor: 'border-primary/30'
    }
  ];

  return (
    <section id="contact" className="py-24 relative mt-12 bg-background border-t border-primary/20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Leadership & Connect */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold text-glow mb-8 text-white uppercase leading-tight">POSITION OF <br/> RESPONSIBILITY</h2>
              
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
                    <h3 className="font-display font-bold text-white text-lg">Senior Technical Member</h3>
                  </div>
                  <p className="text-textMuted mb-1 text-sm">DRISHTI Club, SVNIT</p>
                  <p className="text-textMuted/60 text-xs font-mono">Technical Design & Fabrication</p>
                </div>

                <div className="pt-6 border-t border-white/5">
                   <p className="text-sm text-textMuted mb-4 font-mono uppercase tracking-widest text-primary/60">Secure Communication Protocol</p>
                   <div className="flex flex-col gap-3">
                       <a href="tel:+919913665961" className="flex items-center gap-3 text-white/80 hover:text-primary transition-colors group/tel">
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/tel:border-primary/50 transition-colors">
                             <Phone className="w-4 h-4 text-primary group-hover/tel:text-primary transition-colors" />
                          </div>
                          <span className="text-xs font-mono">+91 99136 65961</span>
                       </a>
                       <a href="mailto:maahim2627@gmail.com" className="flex items-center gap-3 text-white/80 hover:text-primary transition-colors group/mail">
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/mail:border-primary/50 transition-colors">
                             <Mail className="w-4 h-4 text-secondary group-hover/mail:text-primary transition-colors" />
                          </div>
                          <span className="text-xs font-mono">maahim2627@gmail.com</span>
                       </a>
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
            className="glass-panel p-8 relative overflow-hidden flex flex-col justify-between min-h-[500px]"
          >
            {/* Professional Accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-tr-full -ml-12 -mb-12 blur-2xl opacity-30"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-display font-bold text-white mb-2 uppercase tracking-tight">Professional Network</h2>
              <div className="h-1 w-12 bg-primary mb-6"></div>
              
              <p className="text-sm text-textMuted mb-10 font-mono leading-relaxed max-w-md">
                Interested in collaboration or professional inquiries? Connect with me through my verified channels below. I am actively seeking opportunities in mechanical design, robotics fabrication, and engineering management.
              </p>

              <div className="grid grid-cols-1 gap-4">
                {connectLinks.map((link) => (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setHoveredLink(link.id)}
                    onMouseLeave={() => setHoveredLink(null)}
                    whileHover={{ x: 10 }}
                    className={`flex items-center justify-between p-5 glass-panel border border-white/5 hover:${link.borderColor} transition-all duration-300 group`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg bg-white/5 group-hover:bg-primary/10 transition-colors ${link.color}`}>
                        {link.icon}
                      </div>
                      <div>
                        <div className="text-white font-display font-bold text-sm tracking-widest uppercase">{link.name}</div>
                        <div className="text-[10px] font-mono text-textMuted/60 uppercase">{link.label}</div>
                      </div>
                    </div>
                    <ExternalLink className={`w-4 h-4 text-textMuted/40 group-hover:text-primary transition-colors ${hoveredLink === link.id ? 'opacity-100' : 'opacity-0 md:opacity-0 group-hover:opacity-100'}`} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-primary/60 uppercase tracking-widest mb-1">Status</span>
                <span className="text-xs text-white font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  OPEN FOR OPPORTUNITIES
                </span>
              </div>
              <div className="px-4 py-2 bg-primary/5 border border-primary/20 rounded text-[10px] font-mono text-primary uppercase tracking-[0.2em]">
                SVNIT.ENGR.V3
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
