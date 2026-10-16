import { motion } from 'framer-motion';
import { Cpu, Terminal, Zap, Shield, Award, CheckCircle } from 'lucide-react';

const highlights = [
  {
    icon: <Cpu className="w-5 h-5 text-primary" />,
    title: "Robotics & Mechatronics",
    description: "Designing intelligent kinematic systems that bridge algorithmic control logic and physical mechanical actuation."
  },
  {
    icon: <Zap className="w-5 h-5 text-primary" />,
    title: "Analysis & Simulation",
    description: "Utilizing CFD, FEA, and thermodynamic cycles to validate designs and optimize efficiencies before prototyping."
  },
  {
    icon: <Terminal className="w-5 h-5 text-primary" />,
    title: "Programming & Control",
    description: "Writing robust automation and signal processing routines for embedded microcontrollers and data analysis."
  },
  {
    icon: <Shield className="w-5 h-5 text-primary" />,
    title: "Prototyping & DFM",
    description: "Translating complex multi-body CAD models into functional prototypes with precision tolerances and manufacturability."
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 border-b border-borderLight pb-8">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-widest text-primary font-bold">
            <span>[01]</span>
            <span>PROFILE SUMMARY</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-extrabold uppercase text-textDefault tracking-tight"
            >
              ABOUT ME
            </motion.h2>
            <span className="text-xs font-mono uppercase tracking-widest text-textMuted">
              ACADEMIC FOUNDATION • SVNIT SURAT • RESEARCH
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Text Content / Engineering Dossier Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 bg-white/90 backdrop-blur-sm border border-borderLight rounded-2xl p-8 md:p-10 shadow-paper relative flex flex-col justify-between"
          >
            <div className="w-full h-1 bg-primary absolute top-0 left-0 rounded-t-2xl"></div>
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-primary font-bold tracking-widest uppercase">
                  ENGINEERING DOSSIER
                </span>
                <span className="text-[10px] font-mono text-textMuted uppercase bg-surfaceMuted px-2.5 py-1 rounded">
                  MAJOR: MECHANICAL
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold text-textDefault mb-4">
                Analytical Discipline with Iterative Prototyping
              </h3>

              <p className="text-textMuted leading-relaxed mb-5 text-sm sm:text-base">
                I am a Final-year Mechanical Engineering major at Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat. 
                My engineering methodology couples rigorous first-principles thermodynamic & mechanical analysis with hands-on, high-fidelity physical fabrication.
              </p>

              <p className="text-textMuted leading-relaxed text-sm sm:text-base">
                Whether simulating aerodynamic performance in complex turbofan engines, auditing live thermal power plant BTG cycles against ASME standards, or prototyping EEG-controlled prosthetic limbs, I prioritize robust kinematic mechanics, structural rigidity, and manufacturability.
              </p>
            </div>
            
              {/* Academic Spec Stamp */}
              <div className="mt-8 pt-6 border-t border-borderLight flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl border border-primary/40 bg-primary/5 flex flex-col items-center justify-center">
                    <span className="font-mono text-primary font-bold text-lg leading-none">8.97</span>
                    <span className="font-mono text-[8px] text-primary/70 uppercase">/10.0</span>
                  </div>
                  <div>
                    <div className="text-xs text-textMuted uppercase font-mono tracking-wider">Current CGPA</div>
                    <div className="font-display font-bold text-textDefault text-base">SVNIT Surat, India</div>
                  </div>
                </div>
              </div>
          </motion.div>

          {/* Highlights Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm border border-borderLight rounded-2xl p-6 shadow-paper hover:border-primary/60 hover:shadow-paper-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4 p-3 bg-primary/5 border border-primary/20 inline-block rounded-xl">
                    {item.icon}
                  </div>
                  <h4 className="text-base font-display font-bold text-textDefault mb-2 uppercase">
                    {item.title}
                  </h4>
                  <p className="text-xs text-textMuted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
