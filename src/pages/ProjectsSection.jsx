import { motion } from 'framer-motion';
import { ExternalLink, Database, Cpu, Cog } from 'lucide-react';

const projects = [
  {
    title: "Neuro Prosthetic Arm",
    status: "Ongoing",
    description: "Mind-controlled prosthetic arm leveraging real-time EEG signals for intuitive user control.",
    challenge: "Translating noisy brainwaves into precise, low-latency mechanical actuations.",
    tools: ["SolidWorks", "Arduino UNO", "Raspberry Pi", "BioAmp EEG"],
    icon: <Cpu className="w-8 h-8 text-primary" />,
    color: "from-primary/20"
  },
  {
    title: "Turbofan Engine Simulation",
    status: "Completed",
    description: "Comprehensive 3D modelling and computational fluid dynamics (CFD) simulation of internal airflow.",
    challenge: "Optimizing blade geometry to minimize turbulence and maximize thrust efficiency.",
    tools: ["SolidWorks", "ANSYS Fluent"],
    icon: <Cog className="w-8 h-8 text-secondary" />,
    color: "from-secondary/20"
  },
  {
    title: "SENTINEL Bot",
    status: "Completed",
    description: "Autonomous robotic system engineered to till and convert barren landscapes into fertile terrain.",
    challenge: "Designing a robust mechanical chassis capable of handling extreme drag forces during soil excavation.",
    tools: ["SolidWorks", "AutoCAD", "Prototyping"],
    icon: <Database className="w-8 h-8 text-primary" />,
    color: "from-primary/20"
  },
  {
    title: "Rally Car Suspension (Makernova 2.0)",
    status: "Tested & Validated",
    description: "High-performance suspension system designed for a scale rally car model, absorbing extreme impacts.",
    challenge: "Achieving stable damping under 4.5kg static load and surviving dynamic 6-foot drop tests without failure.",
    tools: ["Mechanics", "Dynamic Testing", "Design"],
    icon: <Cog className="w-8 h-8 text-secondary" />,
    color: "from-secondary/20"
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-[2px] bg-secondary"></div>
              <span className="text-secondary font-mono tracking-widest text-sm uppercase">Prototype Database</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold text-glow"
            >
              ENGINEERED SOLUTIONS
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-textMuted font-mono text-sm max-w-xs text-right"
          >
            Displaying {projects.length} verified records of mechanical and mechatronic design.
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative glass-panel overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-500"
            >
              {/* Animated gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-background/50 rounded-xl border border-white/5 group-hover:border-primary/30 transition-colors shadow-inner">
                    {project.icon}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-mono px-3 py-1 bg-white/5 rounded-full border border-white/10 text-white group-hover:border-primary/50 group-hover:text-primary transition-colors">
                      {project.status}
                    </span>
                    <a href="#" className="mt-4 p-2 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/20 text-white">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-glow transition-all">
                  {project.title}
                </h3>
                
                <p className="text-textMuted mb-6 min-h-[50px] leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-6 pl-4 border-l-2 border-secondary/50">
                  <span className="text-xs text-secondary font-mono uppercase block mb-1">Engineering Challenge</span>
                  <p className="text-sm text-textDefault/80">{project.challenge}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tools.map((tool, i) => (
                    <span key={i} className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-1 rounded border border-primary/20">
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Cyberpunk decorative lines */}
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-500 m-2"></div>
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-secondary/0 group-hover:border-secondary/50 transition-colors duration-500 m-2"></div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
