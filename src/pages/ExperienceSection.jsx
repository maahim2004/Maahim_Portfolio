import { motion } from 'framer-motion';
import { Microscope, Beaker, FileSearch } from 'lucide-react';

const experiences = [
  {
    title: "Pulsating Heat Pipe Solar Still",
    type: "Research Project",
    icon: <Beaker className="w-6 h-6 text-primary" />,
    role: "Assembly, Design Validation & Performance Testing",
    description: "Developed and evaluated a hybrid pyramidal solar still desalination system to improve freshwater yield.",
    image: "/images/MPSS.png",
    points: [
      "Led the mechanical assembly and structural validation of the pyramidal structure.",
      "Conducted extensive performance testing and thermodynamic calculations.",
      "Analyzed heat transfer data to optimize the pulsating heat pipe dynamics."
    ]
  },
  {
    title: "VCRS Exergy Analysis",
    type: "Experimental Research",
    icon: <Microscope className="w-6 h-6 text-secondary" />,
    role: "Performance Enhancement Researcher",
    description: "Investigated the performance augmentation of a Vapor Compression Refrigeration System (VCRS) using Al2O3 nanoparticles.",
    points: [
      "Synthesized and stabilized nanoparticle-lubricant mixtures for the compressor.",
      "Utilized MATLAB and CoolPack for complex exergy destruction analysis and COP calculations.",
      "Applied Design Expert (DOE) to determine the optimal nanoparticle concentration for maximum efficiency."
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
            className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-textMuted mb-4"
          >
            RESEARCH & ANALYSIS
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-mono text-sm"
          >
            VALIDATING THEORIES THROUGH EMPIRICAL DATA
          </motion.div>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/20 before:to-transparent">
          {experiences.map((exp, index) => {
            const isFirst = index === 0;
            // Even index (0, 2): Image/Spacer on Left, Card on Right
             // Odd index (1, 3): Card on Left, Image/Spacer on Right
            const isReversed = index % 2 !== 0; 
            return (
              <div key={index} className={`relative flex flex-col md:flex-row items-center justify-between ${isReversed ? 'md:flex-row-reverse' : ''} group is-active`}>
                
                {/* Timeline dot */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-background shadow shrink-0 z-10 
                  md:absolute md:left-1/2 md:-translate-x-1/2 group-hover:border-primary/50 group-hover:shadow-glow transition-all`}>
                  {exp.icon}
                </div>
                
                {/* Visual Content (Image) */}
                {exp.image && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, x: -30 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="hidden md:block w-[calc(50%-4rem)] order-1"
                  >
                    <div className="relative group/img rounded-lg overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl">
                        <img 
                          src={exp.image} 
                          alt={exp.title} 
                          className="w-full h-auto object-cover transform group-hover/img:scale-105 transition-transform duration-700"
                        />
                    </div>
                  </motion.div>
                )}

                {/* Empty spacer for alternating items */}
                {!exp.image && <div className="hidden md:block w-[calc(50%-4rem)] order-1"></div>}

                {/* Content Box */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className="w-full mt-4 md:mt-0 md:w-[calc(50%-4rem)] glass-panel p-6 group-hover:border-primary/30 transition-colors order-2 relative overflow-hidden"
                >
                  {/* Subtle glass shine effect */}
                  <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none rotate-12 group-hover:translate-x-[10%] group-hover:translate-y-[10%] transition-transform duration-1000"></div>

                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-secondary tracking-widest uppercase">{exp.type}</span>
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-white mb-2 tracking-tight">{exp.title}</h3>
                  <h4 className="text-sm font-medium text-primary/90 mb-4 font-mono tracking-wider">{exp.role}</h4>
                  
                  {/* Mobile Image */}
                  {exp.image && (
                    <div className="md:hidden mb-6 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                       <img src={exp.image} alt={exp.title} className="w-full h-auto" />
                    </div>
                  )}

                  <p className="text-textMuted mb-6 text-sm leading-relaxed border-l-2 border-primary/20 pl-4 italic">
                    "{exp.description}"
                  </p>
                  
                  <ul className="space-y-3">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-4 text-[13px] text-textMuted/90 group/point">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/30 mt-1.5 shrink-0 group-hover/point:bg-primary/80 transition-colors"></div>
                        <span className="leading-snug">{point}</span>
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
