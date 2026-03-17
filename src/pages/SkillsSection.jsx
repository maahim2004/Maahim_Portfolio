import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "CAD & Design",
    skills: [
      { name: "SolidWorks", level: 90 },
      { name: "AutoCAD", level: 85 },
      { name: "Blender", level: 70 },
    ],
    color: "bg-primary"
  },
  {
    title: "Simulation & Analysis",
    skills: [
      { name: "ANSYS Fluent", level: 85 },
      { name: "CoolPack", level: 80 },
      { name: "Design Expert", level: 75 },
    ],
    color: "bg-secondary"
  },
  {
    title: "Programming",
    skills: [
      { name: "MATLAB", level: 85 },
      { name: "Python", level: 80 },
      { name: "C / C++", level: 75 },
      { name: "SQL", level: 65 },
    ],
    color: "bg-primary"
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      {/* Background Decor Removed for all-black theme */}

      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-display font-bold text-glow mb-4">TECHNICAL CAPABILITIES</h2>
          <p className="text-textMuted max-w-2xl text-sm md:text-base">
            Proficiency matrices reflecting my toolset across mechanical design, software programming, and hardware integration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {skillCategories.map((category, catIdx) => (
            <div key={catIdx}>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1 }}
                className="text-xl font-display font-semibold text-white mb-6 border-b border-white/10 pb-2 flex items-center gap-3"
              >
                <div className={`w-2 h-2 rounded-full shadow-glow ${category.color}`}></div>
                {category.title}
              </motion.h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-textDefault tracking-wide">{skill.name}</span>
                      <span className="text-xs font-mono text-textMuted">{skill.level}%</span>
                    </div>
                    {/* Progress Bar Background */}
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      {/* Progress Bar Fill */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + (idx * 0.1), ease: "easeOut" }}
                        className={`h-full ${category.color} relative shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
                      >
                        {/* Shimmer effect inside bar */}
                        <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
