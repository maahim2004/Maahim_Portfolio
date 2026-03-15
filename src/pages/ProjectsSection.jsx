import { motion } from 'framer-motion';
import { ExternalLink, Database, Cpu, Cog, ChevronLeft, ChevronRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, OrbitControls } from '@react-three/drei';

import { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function InteractiveModel({ url, disableTransparency = false }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [wireframe, setWireframe] = useState(false);

  // Apply wireframe and emissive materials
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Clone material so we don't mess up global cache if model is reused
        if (!child.userData.originalMaterial) {
          child.userData.originalMaterial = child.material.clone();
        }
        
        const mat = child.material;
        mat.wireframe = wireframe;
        
        // Only apply transparency logic if not disabled
        if (!disableTransparency) {
          // Detect outer shell by name or hierarchy
          const name = child.name.toLowerCase();
          const keywords = ['outer', 'shell', 'case', 'housing', 'cover', 'body', 'fan_cowl', 'nacelle', 'casing', 'capsule', 'frame'];
          const isOuterShell = keywords.some(key => name.includes(key)) || 
                               name === "object_2" || name === "mesh_0" || name === "object_0";

          if (isOuterShell) {
            mat.transparent = true;
            mat.opacity = 0.25; // Slightly more visible but still clear
            mat.side = THREE.DoubleSide;
            mat.depthWrite = false; // Allow inner parts to draw through
            mat.blending = THREE.NormalBlending;
          } else {
            // Ensure inner parts are fully opaque and stand out
            mat.transparent = false;
            mat.opacity = 1.0;
            mat.depthWrite = true;
          }
        } else {
          // If transparency is disabled, ensure everything is opaque
          mat.transparent = false;
          mat.opacity = 1.0;
          mat.depthWrite = true;
        }

        if (hovered && !wireframe) {
          mat.emissive = new THREE.Color("#00F0FF");
          mat.emissiveIntensity = 0.2;
        } else {
           mat.emissive = new THREE.Color(0x000000);
           mat.emissiveIntensity = 0;
        }
        mat.needsUpdate = true;
      }
    });
  }, [scene, wireframe, hovered, disableTransparency]);

  // Animate scaling on hover
  useFrame((state, delta) => {
    if (modelRef.current) {
      const targetScale = hovered ? 1.05 : 1;
      modelRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
      
      // Add a slight bobbing effect when hovered
      if (hovered) {
        modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      } else {
        modelRef.current.position.y = THREE.MathUtils.lerp(modelRef.current.position.y, 0, delta * 5);
      }
    }
  });

  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={(e) => { e.stopPropagation(); setWireframe(!wireframe); }}
    />
  );
}

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
    color: "from-secondary/20",
    modelPath: "/models/turbofan_it_2.glb"
  },
  {
    title: "SENTINEL Bot",
    status: "Completed",
    description: "Autonomous robotic system engineered to till and convert barren landscapes into fertile terrain.",
    challenge: "Designing a robust mechanical chassis capable of handling extreme drag forces during soil excavation.",
    tools: ["SolidWorks", "AutoCAD", "Prototyping"],
    icon: <Database className="w-8 h-8 text-primary" />,
    color: "from-primary/20",
    models: [
      "/models/Sentinel/Sentinel_V1.glb",
      "/models/Sentinel/Sentinel_V2.glb",
      "/models/Sentinel/Sentinel_V3.glb"
    ]
  },
  {
    title: "Rally Car Suspension (Makernova 2.0)",
    status: "Tested & Validated",
    description: "High-performance suspension system designed for a scale rally car model, absorbing extreme impacts.",
    challenge: "Achieving stable damping under 4.5kg static load and surviving dynamic 6-foot drop tests without failure.",
    tools: ["Mechanics", "Dynamic Testing", "Design"],
    icon: <Cog className="w-8 h-8 text-secondary" />,
    color: "from-secondary/20"
  },
  {
    title: "Agricultural bot for GUJCOST 5.0",
    status: "GUJCOST 5.0",
    description: "Autonomous agricultural robot designed for precise pesticide spraying and AI-powered weed determination.",
    challenge: "Developing a precise actuation system for pesticide delivery while maintaining real-time AI processing for weed identification.",
    tools: ["Three.js", "AI/ML", "Mechanical Design"],
    icon: <Cog className="w-8 h-8 text-secondary" />,
    color: "from-secondary/20",
    modelPath: "/models/gujcost_bot.glb"
  },
  {
    title: "Modelling of Automated Guided Vehicle",
    status: "Completed",
    description: "Design and modelling of an AGV specialized for Radio Pharmaceutical Compounding, ensuring safe transport of vials.",
    challenge: "Ensuring vibration-dampened transport for delicate pharmaceutical vials while maintaining precise navigation in a controlled environment.",
    tools: ["SolidWorks", "Motion Analysis", "Safety Protocols"],
    icon: <Database className="w-8 h-8 text-primary" />,
    color: "from-primary/20",
    modelPath: "/models/agv.glb",
    disableTransparency: true
  }
];

const ProjectCard = ({ project, idx }) => {
  const [activeIteration, setActiveIteration] = useState(0);
  const models = project.models || (project.modelPath ? [project.modelPath] : null);
  
  const nextIteration = (e) => {
    e.stopPropagation();
    if (!models) return;
    setActiveIteration((prev) => (prev + 1) % models.length);
  };

  const prevIteration = (e) => {
    e.stopPropagation();
    if (!models) return;
    setActiveIteration((prev) => (prev - 1 + models.length) % models.length);
  };

  return (
    <motion.div
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

        {models && (
          <div className="w-full h-[300px] mb-6 rounded-xl overflow-hidden border border-white/10 relative z-20 group/canvas cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors">
            <Canvas shadows dpr={[1, 2]} camera={{ fov: 45, position: [0, 0, 5] }} gl={{ alpha: true, antialias: true }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00F0FF" />
              <Stage environment="city" intensity={0.5} adjustCamera={1.2}>
                <InteractiveModel url={models[activeIteration]} disableTransparency={project.disableTransparency} />
              </Stage>
              <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={false} makeDefault />
            </Canvas>
            
            {/* Iteration Switcher Controls */}
            {models.length > 1 && (
              <>
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-0 group-hover/canvas:opacity-100 transition-opacity">
                  <button 
                    onClick={prevIteration}
                    className="p-2 bg-black/50 hover:bg-primary/20 rounded-full border border-white/10 hover:border-primary/50 text-white transition-all backdrop-blur-sm"
                    aria-label="Previous Iteration"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 opacity-0 group-hover/canvas:opacity-100 transition-opacity">
                  <button 
                    onClick={nextIteration}
                    className="p-2 bg-black/50 hover:bg-primary/20 rounded-full border border-white/10 hover:border-primary/50 text-white transition-all backdrop-blur-sm"
                    aria-label="Next Iteration"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Iteration Label */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 border border-primary/30 rounded-full backdrop-blur-md opacity-0 group-hover/canvas:opacity-100 transition-opacity">
                  <span className="text-[10px] font-mono text-primary tracking-[0.2em] uppercase">
                    ITERATION 0{activeIteration + 1} / 0{models.length}
                  </span>
                </div>
              </>
            )}

            {/* Interactive Hints Overlay */}
            <div className="absolute top-3 right-3 flex flex-col items-end gap-1 opacity-0 group-hover/canvas:opacity-100 transition-opacity duration-300 pointer-events-none">
               <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20 backdrop-blur-sm shadow-glow-primary">CLICK : WIREFRAME</span>
               <span className="text-[10px] font-mono text-white/70 bg-black/50 px-2 py-1 rounded border border-white/10 backdrop-blur-sm">DRAG : ROTATE</span>
            </div>
            
            <div className="absolute bottom-3 left-3 flex items-center gap-2 pointer-events-none">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-glow-primary"></div>
              <span className="text-[10px] font-mono text-white/60 tracking-wider uppercase">
                {models.length > 1 ? `Revision ${activeIteration + 1}.0` : 'Live Simulation'}
              </span>
            </div>
          </div>
        )}

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
  );
};

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
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
