import { motion } from 'framer-motion';
import { Microscope, Beaker, FileSearch } from 'lucide-react';

const experiences = [
  {
    title: "Pulsating Heat Pipe Solar Still",
    type: "Research Project",
    icon: <Beaker className="w-6 h-6 text-primary" />,
    role: "Assembly, Design Validation & Performance Testing",
    description: "Developed and evaluated a hybrid pyramidal solar still desalination system to improve freshwater yield.",
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
    <section id="experience" className="py-24 relative bg-background border-y border-white/5 mt-10">
      <div className="container mx-auto px-6 max-w-5xl">
        
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

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-primary/50 group-hover:shadow-glow transition-all">
                {exp.icon}
              </div>
              
              {/* Content Box */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 group-hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-secondary tracking-widest uppercase">{exp.type}</span>
                </div>
                
                <h3 className="text-xl font-display font-bold text-white mb-2">{exp.title}</h3>
                <h4 className="text-sm font-medium text-primary mb-4">{exp.role}</h4>
                
                <p className="text-textMuted mb-4 text-sm leading-relaxed">
                  {exp.description}
                </p>
                
                <ul className="space-y-2">
                  {exp.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-textMuted/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5 shrink-0"></div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
