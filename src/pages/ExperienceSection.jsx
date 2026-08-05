import { motion } from 'framer-motion';
import { Factory, Microscope, Beaker, Calendar, Building2 } from 'lucide-react';

const experiences = [
  {
    title: "Process Design Intern — BTG Department",
    company: "Adani Infra (India) Limited • Energy Business Division, Ahmedabad",
    type: "Industry Experience",
    period: "May 2026 – July 2026",
    icon: <Factory className="w-6 h-6 text-primary" />,
    role: "Energy Engineering Group",
    badgeColor: "border-primary/40 bg-primary/10 text-primary shadow-glow-primary",
    description: "Gained comprehensive BTG (Boiler-Turbine-Generator) thermal power plant system exposure, conducting standards compliance, performance modelling, and safety simulations.",
    points: [
      "Reviewed live P&IDs and Heat & Mass Balance Diagrams across multiple thermal power plant projects against ASME BPVC Section VIII Div. 2, HEI, ASME PTC 4, and PTC 6 standards; gained full BTG (Boiler-Turbine-Generator) system exposure.",
      "Built ASME PTC 4 and PTC 6 performance test models in MATLAB and Excel for efficiency benchmarking and acceptance testing of thermal power plant equipment.",
      "Executed a HAZOP simulation in DWSIM for a Rankine cycle with sensitivity analysis on pump outlet pressure; prepared Design Basis Reports, Document Control Index, scope matrices, and interface mapping documents."
    ]
  },
  {
    title: "Exergy Analysis & VCRS Enhancement",
    company: "SVNIT Surat • Thermal & Refrigeration Systems Lab",
    type: "Summer Research Internship",
    period: "May 2025 – July 2025",
    icon: <Microscope className="w-6 h-6 text-secondary" />,
    role: "Research Intern",
    badgeColor: "border-secondary/40 bg-secondary/10 text-secondary shadow-glow-secondary",
    description: "Investigated performance augmentation of Vapor Compression Refrigeration Systems (VCRS) using Al₂O₃ nanoparticles.",
    points: [
      "Conducted experimental research on VCRS performance enhancement via Al₂O₃ nanoparticle addition across 2 independent rigs over 8 weeks; validated results with CoolPack and Design Expert using response surface methodology.",
      "Built MATLAB data pipelines to process 5+ operating-condition datasets and generate publication-quality exergy performance visualisations."
    ]
  },
  {
    title: "PHP-Based Solar Still Desalination",
    company: "SVNIT Surat • Renewable Thermal Systems Lab",
    type: "Winter Research Internship",
    period: "January 2025 – March 2025",
    icon: <Beaker className="w-6 h-6 text-primary" />,
    role: "Research Intern",
    badgeColor: "border-primary/40 bg-primary/10 text-primary shadow-glow-primary",
    description: "Developed and evaluated a Pulsating Heat Pipe (PHP)-based Hybrid Pyramidal Solar Still for high-efficiency freshwater yield.",
    image: "/images/MPSS.png",
    points: [
      "Competitively selected to develop a Pulsating Heat Pipe (PHP)-based Hybrid Pyramidal Solar Still; contributed to assembly, design validation, performance testing, and efficiency calculations over a 2-month experimental campaign."
    ]
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative bg-background border-y border-white/5 mt-10 overflow-hidden">
      {/* Background Section Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-textMuted mb-4 tracking-widest uppercase"
          >
            INDUSTRY & RESEARCH EXPERIENCE
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-mono text-sm tracking-[0.25em] uppercase"
          >
            THERMAL POWER ENGINEERING • APPLIED RESEARCH • SIMULATION
          </motion.div>
        </div>

        <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/20 before:to-transparent">
          {experiences.map((exp, index) => {
            const isReversed = index % 2 !== 0; 
            return (
              <div key={index} className={`relative flex flex-col md:flex-row items-center justify-between ${isReversed ? 'md:flex-row-reverse' : ''} group is-active`}>
                
                {/* Timeline dot */}
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-black shadow shrink-0 z-10 
                  md:absolute md:left-1/2 md:-translate-x-1/2 group-hover:border-primary/80 group-hover:shadow-glow transition-all`}>
                  {exp.icon}
                </div>
                
                {/* Visual Content (Image or Company Badge Spacer) */}
                {exp.image ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, x: isReversed ? 30 : -30 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="hidden md:block w-[calc(50%-4rem)] order-1"
                  >
                    <div className="relative group/img rounded-xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl">
                      <img 
                        src={exp.image} 
                        alt={exp.title} 
                        className="w-full h-auto object-cover transform group-hover/img:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="hidden md:flex w-[calc(50%-4rem)] order-1 flex-col items-center justify-center p-6 border border-white/5 rounded-xl bg-white/[0.01]"
                  >
                    <Building2 className="w-10 h-10 text-primary/40 mb-2" />
                    <span className="text-xs font-mono text-white/50 text-center tracking-widest uppercase">{exp.company}</span>
                  </motion.div>
                )}

                {/* Content Box */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className="w-full mt-6 md:mt-0 md:w-[calc(50%-4rem)] glass-panel p-6 md:p-8 group-hover:border-primary/40 transition-all order-2 relative overflow-hidden"
                >
                  {/* Subtle glass shine effect */}
                  <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none rotate-12 group-hover:translate-x-[10%] group-hover:translate-y-[10%] transition-transform duration-1000"></div>

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border ${exp.badgeColor}`}>
                      {exp.type}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-textMuted">
                      <Calendar className="w-3.5 h-3.5 text-primary/70" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-1 tracking-tight">{exp.title}</h3>
                  <div className="text-xs font-mono text-primary mb-3">{exp.company}</div>
                  
                  {/* Mobile Image if available */}
                  {exp.image && (
                    <div className="md:hidden mb-6 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                       <img src={exp.image} alt={exp.title} className="w-full h-auto" />
                    </div>
                  )}

                  <p className="text-textMuted mb-6 text-sm leading-relaxed border-l-2 border-primary/30 pl-4 italic">
                    "{exp.description}"
                  </p>
                  
                  <ul className="space-y-3">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-[13px] text-textMuted/90 group/point">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0 group-hover/point:bg-primary transition-colors"></div>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
