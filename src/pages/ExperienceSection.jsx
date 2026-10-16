import { motion } from 'framer-motion';
import { Factory, Microscope, Beaker, Calendar, Building2 } from 'lucide-react';

const experiences = [
  {
    title: "Process Design Intern — BTG Department",
    company: "Adani Infra (India) Limited • Energy Business Division, Ahmedabad",
    type: "Industry Experience",
    period: "May 2026 – July 2026",
    icon: <Factory className="w-5 h-5 text-primary" />,
    role: "Energy Engineering Group",
    badgeColor: "border-primary/30 bg-primary/10 text-primary font-bold",
    description: "Gained comprehensive BTG (Boiler-Turbine-Generator) thermal power plant system exposure, conducting standards compliance, performance modelling, and safety simulations.",
    image: "/images/adani_collage.png",
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
    icon: <Microscope className="w-5 h-5 text-primary" />,
    role: "Research Intern",
    badgeColor: "border-borderLight bg-surfaceMuted text-textDefault font-bold",
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
    icon: <Beaker className="w-5 h-5 text-primary" />,
    role: "Research Intern",
    badgeColor: "border-primary/30 bg-primary/10 text-primary font-bold",
    description: "Developed and evaluated a Pulsating Heat Pipe (PHP)-based Hybrid Pyramidal Solar Still for high-efficiency freshwater yield.",
    image: "/images/MPSS.png",
    points: [
      "Competitively selected to develop a Pulsating Heat Pipe (PHP)-based Hybrid Pyramidal Solar Still; contributed to assembly, design validation, performance testing, and efficiency calculations over a 2-month experimental campaign."
    ]
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative mt-10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 border-b border-borderLight pb-8">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-widest text-primary font-bold">
            <span>[03]</span>
            <span>PROFESSIONAL CHRONOLOGY</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-extrabold uppercase text-textDefault tracking-tight"
            >
              EXPERIENCE
            </motion.h2>
            <span className="text-xs font-mono uppercase tracking-widest text-textMuted">
              THERMAL POWER • STANDARDS COMPLIANCE • APPLIED RESEARCH
            </span>
          </div>
        </div>

        <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-borderLight before:to-transparent">
          {experiences.map((exp, index) => {
            const isReversed = index % 2 !== 0; 
            return (
              <div key={index} className={`relative flex flex-col md:flex-row items-center justify-between ${isReversed ? 'md:flex-row-reverse' : ''} group is-active`}>
                
                {/* Timeline dot */}
                <div className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-primary bg-white shadow-paper shrink-0 z-10 
                  md:absolute md:left-1/2 md:-translate-x-1/2 group-hover:scale-110 transition-transform">
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
                    <div className="relative group/img rounded-2xl overflow-hidden border border-borderLight bg-white shadow-paper">
                      <img 
                        src={exp.image} 
                        alt={exp.title} 
                        className="w-full h-auto object-cover transform group-hover/img:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="hidden md:flex w-[calc(50%-4rem)] order-1 flex-col items-center justify-center p-8 border border-borderLight rounded-2xl bg-white/60 shadow-paper"
                  >
                    <Building2 className="w-10 h-10 text-primary mb-2" />
                    <span className="text-xs font-mono text-textMuted text-center tracking-widest uppercase font-bold">{exp.company}</span>
                  </motion.div>
                )}

                {/* Content Box */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className="w-full mt-6 md:mt-0 md:w-[calc(50%-4rem)] bg-white/95 backdrop-blur-sm border border-borderLight rounded-2xl p-6 md:p-8 shadow-paper group-hover:border-primary/50 group-hover:shadow-paper-lg transition-all order-2 relative overflow-hidden"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border ${exp.badgeColor}`}>
                      {exp.type}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-textMuted">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-display font-bold text-textDefault mb-1 tracking-tight uppercase">{exp.title}</h3>
                  <div className="text-xs font-mono text-primary font-bold mb-3">{exp.company}</div>
                  
                  {/* Mobile Image if available */}
                  {exp.image && (
                    <div className="md:hidden mb-6 rounded-xl overflow-hidden border border-borderLight shadow-paper">
                       <img src={exp.image} alt={exp.title} className="w-full h-auto" />
                    </div>
                  )}

                  <p className="text-textMuted mb-6 text-xs sm:text-sm leading-relaxed border-l-2 border-primary bg-primary/5 py-2 pl-3 rounded-r-lg">
                    "{exp.description}"
                  </p>
                  
                  <ul className="space-y-3">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-textMuted leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
                        <span>{point}</span>
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
