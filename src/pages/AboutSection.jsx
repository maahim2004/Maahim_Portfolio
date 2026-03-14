import { motion } from 'framer-motion';
import { Cpu, Terminal, Zap, Shield } from 'lucide-react';

const highlights = [
  {
    icon: <Cpu className="w-6 h-6 text-primary" />,
    title: "Robotics & Mechatronics",
    description: "Designing intelligent systems that bridge the gap between software algorithms and physical actions."
  },
  {
    icon: <Zap className="w-6 h-6 text-secondary" />,
    title: "Analysis & Simulation",
    description: "Utilizing FEA and CFD to validate mechanical designs and optimize performance before prototyping."
  },
  {
    icon: <Terminal className="w-6 h-6 text-primary" />,
    title: "Programming & Control",
    description: "Writing robust control logic for embedded systems and data-driven analysis algorithms."
  },
  {
    icon: <Shield className="w-6 h-6 text-secondary" />,
    title: "Prototyping & Design",
    description: "Translating complex CAD models into functional real-world prototypes with precision."
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col items-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="px-4 py-1 border border-primary/30 rounded-full mb-4 text-primary text-xs font-mono"
          >
            SYS.FILE.READ("ABOUT_ME")
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-glow mb-6"
          >
            SYSTEM ARHITECTURE
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8 md:p-10 relative group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <h3 className="text-2xl font-display text-primary mb-4 font-semibold">Core Operating Parameters</h3>
            <p className="text-textMuted leading-relaxed mb-6">
              I am driven by a profound passion for mechanical engineering and the endless possibilities of robotics. My approach to engineering is highly analytical, blending rigorous theoretical simulation with hands-on, iterative prototyping.
            </p>
            <p className="text-textMuted leading-relaxed">
              Whether it's designing a mind-controlled prosthetic arm using advanced EEG signals, simulating airflow in a complex turbofan engine, or engineering robust suspension systems, I strive to create solutions that are not only functional but elegantly optimized.
            </p>
            
            <div className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full border-2 border-primary/50 flex items-center justify-center bg-primary/10">
                <span className="font-mono text-primary font-bold">8.97</span>
              </div>
              <div>
                <div className="text-sm text-textMuted uppercase font-mono">Current CGPA</div>
                <div className="font-display font-medium text-white">SVNIT, Surat</div>
              </div>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-6 glass-panel-hover"
              >
                <div className="mb-4 p-3 bg-white/5 inline-block rounded-lg shadow-inner">
                  {item.icon}
                </div>
                <h4 className="text-lg font-display text-white mb-2">{item.title}</h4>
                <p className="text-sm text-textMuted">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
