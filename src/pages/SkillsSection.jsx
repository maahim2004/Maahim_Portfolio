import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "CAD & Kinematic Modeling",
    tools: [
      {
        name: "SolidWorks",
        focus: "Mechanical Assemblies & Motion",
        details: ["Parametric 3D modeling & mate kinematics", "GD&T and manufacturing drawings", "Sheet metal & weldment structures"]
      },
      {
        name: "AutoCAD",
        focus: "Drafting & Schematics",
        details: ["P&ID and process piping schematics", "ISO fabrication drawings & drafting", "Layer management & standard symbol libraries"]
      },
      {
        name: "Blender",
        focus: "Precision Visualization",
        details: ["Photorealistic assembly renders", "Exploded-view mechanical animations", "Lighting & visual technical communication"]
      }
    ]
  },
  {
    title: "Simulation & Numerical Analysis",
    tools: [
      {
        name: "ANSYS Workbench (FEA & CFD)",
        focus: "Structural & Aerodynamic Solvers",
        details: [
          "Static Structural: Von Mises stress, deformation & safety factors",
          "ANSYS Fluent: Incompressible/compressible flow & boundary layers",
          "Mesh refinement, convergence studies & boundary conditions"
        ]
      },
      {
        name: "OpenFOAM",
        focus: "Open-Source CFD Pipeline",
        details: [
          "blockMesh & snappyHexMesh mesh generation workflows",
          "Incompressible solvers (simpleFoam / pimpleFoam)",
          "Case directory setup, boundary definitions & post-processing"
        ]
      },
      {
        name: "DWSIM & HAZOP",
        focus: "Process & Safety Simulation",
        details: [
          "Steady-state chemical & thermal flowsheets",
          "Sensitivity analysis & parameter sweeps",
          "HAZOP identification & safety node assessment"
        ]
      },
      {
        name: "CoolPack & Thermodynamic Tools",
        focus: "Thermal Cycles & DOE",
        details: [
          "Vapor compression refrigeration cycle optimization",
          "MATLAB thermodynamic property pipelines & scripts",
          "Design of Experiments (DoE) & response surfaces"
        ]
      }
    ]
  },
  {
    title: "Codes, Standards & Auditing",
    tools: [
      {
        name: "ASME PTC 4 / PTC 6",
        focus: "Power & Boiler Performance",
        details: ["Steam generator efficiency calculations", "Turbine expansion line audit protocols", "Input-loss & energy-balance methodologies"]
      },
      {
        name: "ASME BPVC Sec. VIII Div. 2",
        focus: "Pressure Vessel Design",
        details: ["Design-by-rule wall thickness evaluations", "Allowable stress limits & MAWP sizing", "Nozzle reinforcement calculations"]
      },
      {
        name: "P&ID & Heat / Mass Balance",
        focus: "Process Documentation",
        details: ["Comprehensive plant stream balances", "Instrumentation tag & line spec integration", "Energy conservation & heat recovery audits"]
      },
      {
        name: "HEI Standards",
        focus: "Heat Exchange Equipment",
        details: ["Surface condenser thermal sizing", "Cleanliness factor & terminal temperature diff", "Cooling water velocity & tube vibration checks"]
      }
    ]
  },
  {
    title: "Programming & Software Fundamentals",
    tools: [
      {
        name: "C Programming",
        focus: "Core Systems & Procedural Logic",
        details: ["Pointers, memory management & dynamic allocation", "Modular structured programming & functions", "Data structures & algorithmic problem solving"]
      },
      {
        name: "Python",
        focus: "Application Logic & Scripting",
        details: ["Procedural & object-oriented programming", "File handling, data validation & business logic", "CLI / application workflow management"]
      },
      {
        name: "SQL & Relational DBMS",
        focus: "Database Management",
        details: ["Relational schema design & table constraints", "CRUD operations & transactional queries", "Backend data integration for applications"]
      }
    ]
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 border-b border-borderLight pb-8">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-widest text-primary font-bold">
            <span>[04]</span>
            <span>CAPABILITY MATRIX</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-extrabold uppercase text-textDefault tracking-tight"
            >
              TECHNICAL CAPABILITIES
            </motion.h2>
            <span className="text-xs font-mono uppercase tracking-widest text-textMuted">
              NUMERICAL SIMULATION • MECHANICAL DESIGN • CODE COMPLIANCE
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div 
              key={catIdx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1 }}
              className="bg-white/90 backdrop-blur-sm border border-borderLight rounded-2xl p-7 md:p-8 shadow-paper hover:border-primary/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-borderLight">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  <h3 className="text-lg font-display font-bold text-textDefault uppercase">
                    {category.title}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {category.tools.map((tool, idx) => (
                    <div 
                      key={idx} 
                      className="p-3.5 rounded-xl bg-surfaceMuted/40 border border-borderLight/60 hover:border-primary/30 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <span className="text-sm font-bold text-textDefault font-display tracking-wide">
                          {tool.name}
                        </span>
                        <span className="text-[11px] font-mono font-medium text-primary bg-primary/10 px-2 py-0.5 rounded self-start sm:self-auto">
                          {tool.focus}
                        </span>
                      </div>
                      
                      <ul className="space-y-1">
                        {tool.details.map((detail, dIdx) => (
                          <li key={dIdx} className="text-xs text-textMuted flex items-start gap-2">
                            <span className="text-primary mt-0.5 font-bold">›</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
