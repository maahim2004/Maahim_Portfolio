import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ExternalLink, User, Users, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {
  const [hoveredLink, setHoveredLink] = useState(null);

  const connectLinks = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      label: 'Professional Network',
      url: 'https://www.linkedin.com/in/maahim-patel-a258302b1/',
      color: 'text-[#0A66C2]',
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      label: 'Code Repositories',
      url: 'https://github.com/maahim2004',
      color: 'text-textDefault',
    },
    {
      id: 'reachout',
      name: 'Direct Contact',
      icon: <MessageSquare className="w-5 h-5" />,
      label: 'Inquiries & Collabs',
      url: 'mailto:maahim2627@gmail.com',
      color: 'text-primary',
    }
  ];

  return (
    <section id="contact" className="py-24 relative mt-12 border-t border-borderLight">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 border-b border-borderLight pb-8">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-widest text-primary font-bold">
            <span>[05]</span>
            <span>CONTACT & ENGAGEMENT</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-extrabold uppercase text-textDefault tracking-tight"
            >
              CONNECT & COLLABORATE
            </motion.h2>
            <span className="text-xs font-mono uppercase tracking-widest text-textMuted">
              LEADERSHIP • COMMUNICATION • INDUSTRY INQUIRIES
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Leadership / Responsibility */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-display font-bold text-textDefault mb-6 uppercase">
                Positions of Responsibility
              </h3>
              
              <div className="space-y-5 mb-10">
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-borderLight shadow-paper border-l-4 border-l-primary">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-5 h-5 text-primary" />
                    <h4 className="font-display font-bold text-textDefault text-lg uppercase">Secretary</h4>
                  </div>
                  <p className="text-textMuted mb-1 text-sm">DRISHTI Revolutionary Club, SVNIT</p>
                  <p className="text-textMuted text-xs font-mono uppercase tracking-wider">Operations, Leadership & Management</p>
                </div>
                
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-borderLight shadow-paper border-l-4 border-l-textDefault">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-textDefault" />
                    <h4 className="font-display font-bold text-textDefault text-lg uppercase">Senior Technical Member</h4>
                  </div>
                  <p className="text-textMuted mb-1 text-sm">DRISHTI Club, SVNIT</p>
                  <p className="text-textMuted text-xs font-mono uppercase tracking-wider">Technical Design & Hardware Fabrication</p>
                </div>
              </div>

              {/* Direct Communication Channels */}
              <div className="pt-6 border-t border-borderLight">
                <p className="text-xs font-mono uppercase tracking-widest text-primary font-bold mb-4">
                  Direct Inquiries Protocol
                </p>
                <div className="flex flex-col gap-3">
                  <a href="tel:+919913665961" className="flex items-center gap-3 text-textDefault hover:text-primary transition-colors group">
                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center border border-borderLight shadow-sm group-hover:border-primary/50 transition-colors">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xs font-mono font-medium">+91 99136 65961</span>
                  </a>
                  <a href="mailto:maahim2627@gmail.com" className="flex items-center gap-3 text-textDefault hover:text-primary transition-colors group">
                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center border border-borderLight shadow-sm group-hover:border-primary/50 transition-colors">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xs font-mono font-medium">maahim2627@gmail.com</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Professional Network & Opportunities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 bg-white/95 backdrop-blur-sm p-8 rounded-2xl border border-borderLight shadow-paper flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-display font-bold text-textDefault uppercase">
                  Verified Channels
                </h3>
                <span className="text-[10px] font-mono text-primary font-bold uppercase bg-primary/10 px-2.5 py-1 rounded">
                  OPEN FOR ROLES
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-textMuted mb-8 leading-relaxed">
                Actively seeking senior engineering and technical opportunities in turbomachinery, mechanical systems design, thermal power simulation, and robotics engineering.
              </p>

              <div className="grid grid-cols-1 gap-3.5">
                {connectLinks.map((link) => (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setHoveredLink(link.id)}
                    onMouseLeave={() => setHoveredLink(null)}
                    whileHover={{ x: 6 }}
                    className="flex items-center justify-between p-4 bg-surfaceMuted/50 hover:bg-white border border-borderLight hover:border-primary/50 rounded-xl transition-all shadow-sm group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2.5 rounded-lg bg-white border border-borderLight shadow-sm ${link.color}`}>
                        {link.icon}
                      </div>
                      <div>
                        <div className="text-textDefault font-display font-bold text-sm uppercase group-hover:text-primary transition-colors">
                          {link.name}
                        </div>
                        <div className="text-[10px] font-mono text-textMuted uppercase">{link.label}</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-textMuted group-hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-borderLight flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-[11px] font-mono text-textDefault uppercase font-bold">
                  Status: Available for Full-Time Roles (2026)
                </span>
              </div>
              <div className="text-[10px] font-mono text-textMuted uppercase">
                SVNIT.ENG.V2
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
