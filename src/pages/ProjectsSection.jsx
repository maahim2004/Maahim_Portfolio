import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ExternalLink, Database, Cpu, Cog, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { projects } from '../data/projects';import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, OrbitControls } from '@react-three/drei';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function InteractiveModel({ url, disableTransparency = false }) {
  const { scene } = useGLTF(url);
  
  // Clone the scene and materials to allow multiple independent instances
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
      }
    });
    return clone;
  }, [scene]);

  const modelRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [wireframe, setWireframe] = useState(false);

  // Apply wireframe and emissive materials
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
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
            mat.opacity = 0.25; 
            mat.side = THREE.DoubleSide;
            mat.depthWrite = false;
            mat.blending = THREE.NormalBlending;
          } else {
            mat.transparent = false;
            mat.opacity = 1.0;
            mat.depthWrite = true;
          }
        } else {
          mat.transparent = false;
          mat.opacity = 1.0;
          mat.depthWrite = true;
        }

        if (hovered && !wireframe) {
          mat.emissive = new THREE.Color("#00E5FF"); // Glow Accent
          mat.emissiveIntensity = 0.2;
        } else {
           mat.emissive = new THREE.Color(0x000000);
           mat.emissiveIntensity = 0;
        }
        mat.needsUpdate = true;
      }
    });
  }, [clonedScene, wireframe, hovered, disableTransparency]);

  // Animate scaling on hover
  useFrame((state, delta) => {
    if (modelRef.current) {
      const targetScale = hovered ? 1.05 : 1;
      modelRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
      
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
      object={clonedScene} 
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={(e) => { e.stopPropagation(); setWireframe(!wireframe); }}
    />
  );
}

const IconMap = {
  cpu: <Cpu className="w-8 h-8 text-primary" />,
  cog: <Cog className="w-8 h-8 text-secondary" />,
  database: <Database className="w-8 h-8 text-primary" />
};

function ProjectModal({ project, isOpen, onClose }) {
  const models = project.models || (project.modelPath ? [project.modelPath] : null);
  const [activeIteration, setActiveIteration] = useState(0);
  const [viewMode, setViewMode] = useState(models ? 'model' : 'photos');

  // Reset view mode when project changes
  useEffect(() => {
    setViewMode(models ? 'model' : 'photos');
  }, [project.id, !!models]);

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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          className="relative w-full max-w-6xl max-h-[90vh] glass-panel overflow-hidden border border-white/10 flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-[110] p-2 bg-black/50 hover:bg-primary/20 rounded-full border border-white/10 text-white transition-all shadow-glow-primary"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left: 3D Model / Photos Viewport */}
          <div className="w-full md:w-3/5 h-[400px] md:h-auto bg-black/40 relative border-b md:border-b-0 md:border-r border-white/5 flex flex-col">
            {/* View Mode Toggle */}
            {models && project.images && (
              <div className="absolute top-4 left-4 z-[110] flex bg-black/60 backdrop-blur-md rounded-full border border-white/10 p-1">
                <button 
                  onClick={() => setViewMode('model')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all ${viewMode === 'model' ? 'bg-primary text-black shadow-glow-primary' : 'text-white/60 hover:text-white'}`}
                >
                  3D Analysis
                </button>
                <button 
                  onClick={() => setViewMode('photos')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all ${viewMode === 'photos' ? 'bg-secondary text-black shadow-glow-secondary' : 'text-white/60 hover:text-white'}`}
                >
                  Photo Record
                </button>
              </div>
            )}

            <div className="flex-1 relative overflow-hidden">
              {viewMode === 'model' && models ? (
                <div className="w-full h-full relative group/canvas">
                  <Canvas shadows dpr={[1, 1.5]} camera={{ fov: 45, position: [0, 0, 5] }} gl={{ alpha: true, antialias: true }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00E5FF" />
                    <Stage environment="city" intensity={0.5} adjustCamera={1.2}>
                      <InteractiveModel url={models[activeIteration]} disableTransparency={project.disableTransparency} />
                    </Stage>
                    <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={true} makeDefault />
                  </Canvas>
                  
                  {models.length > 1 && (
                    <>
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <button onClick={prevIteration} className="p-3 bg-black/50 hover:bg-primary/20 rounded-full border border-white/10 text-white transition-all pointer-events-auto backdrop-blur-md"><ChevronLeft className="w-6 h-6" /></button>
                      </div>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <button onClick={nextIteration} className="p-3 bg-black/50 hover:bg-primary/20 rounded-full border border-white/10 text-white transition-all pointer-events-auto backdrop-blur-md"><ChevronRight className="w-6 h-6" /></button>
                      </div>
                    </>
                  )}
                  <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md pointer-events-none">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-glow-primary"></div>
                    <span className="text-[10px] font-mono text-white/80 tracking-widest uppercase">
                      Interactive Simulation Core Active
                    </span>
                  </div>
                </div>
              ) : project.images ? (
                <div className="w-full h-full p-8 md:p-12 overflow-y-auto bg-black/20 flex flex-col gap-8 scrollbar-thin scrollbar-thumb-white/10">
                  {project.images.map((img, i) => (
                    <div key={i} className="group relative">
                      <img src={img} alt={`${project.title} - ${i}`} className="w-full rounded-2xl border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-textMuted font-mono text-sm uppercase tracking-widest">
                  No visualization data available
                </div>
              )}
            </div>
          </div>

          {/* Right: Info Section */}
          <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto flex flex-col bg-background/20 backdrop-blur-md">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase mb-2 block">{project.status}</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white text-glow mb-4">
                  {project.title}
                </h2>
              </div>
              <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                {IconMap[project.icon]}
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-[1px] bg-secondary/50"></div>
                  <span className="text-[10px] font-mono text-secondary tracking-widest uppercase">Project Overview</span>
                </div>
                <p className="text-textMuted leading-relaxed text-lg italic">
                  "{project.fullDescription || project.description}"
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-[1px] bg-primary/50"></div>
                  <span className="text-[10px] font-mono text-primary tracking-widest uppercase">Engineering Challenge</span>
                </div>
                <div className="pl-4 border-l-2 border-primary/30">
                  <p className="text-white/90 font-light">{project.challenge}</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-[1px] bg-white/30"></div>
                  <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">Technical Stack</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, i) => (
                    <span key={i} className="text-xs font-mono text-primary/80 bg-primary/5 px-3 py-1.5 rounded-md border border-primary/20">
                      {tool}
                    </span>
                  ))}
                </div>
              </section>
              
              {/* Section to jump to photos if in model mode */}
              {viewMode === 'model' && project.images && (
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-[1px] bg-secondary/30"></div>
                        <span className="text-[10px] font-mono text-secondary/50 tracking-widest uppercase">Documentation Gallery</span>
                    </div>
                    <button 
                        onClick={() => setViewMode('photos')}
                        className="group w-full relative aspect-video rounded-xl overflow-hidden border border-white/10 hover:border-secondary/50 transition-all shadow-lg"
                    >
                        <img src={project.images[0]} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/10 transition-colors">
                            <span className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-mono text-white tracking-[0.2em] group-hover:bg-secondary group-hover:text-black group-hover:border-transparent transition-all uppercase">
                                View Full Gallery
                            </span>
                        </div>
                    </button>
                </section>
              )}
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
              <span className="text-[9px] font-mono text-textMuted tracking-widest uppercase">Record ID: {project.id}</span>
              <div className="w-2 h-2 rounded-full bg-secondary animate-ping"></div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const ProjectCard = ({ project, idx, onClick }) => {
  const containerRef = useRef(null);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      onClick={() => onClick(project)}
      className="group relative glass-panel overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-500 cursor-pointer"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      <div className="p-8 relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="p-4 bg-background/50 rounded-xl border border-white/5 group-hover:border-primary/30 transition-colors shadow-inner">
            {IconMap[project.icon]}
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs font-mono px-3 py-1 bg-white/5 rounded-full border border-white/10 text-white group-hover:border-primary/50 group-hover:text-primary transition-colors">
              {project.status}
            </span>
            <div className="mt-4 p-2 bg-primary/10 rounded-full text-primary group-hover:bg-primary/20 transition-all opacity-0 group-hover:opacity-100">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-glow transition-all">
          {project.title}
        </h3>
        
        <p className="text-textMuted mb-8 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        <div className="mt-auto flex justify-between items-center">
          <div className="flex -space-x-2">
            {project.tools.slice(0, 3).map((tool, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-background border border-white/10 flex items-center justify-center text-[8px] font-mono text-primary/80" title={tool}>
                {tool.charAt(0)}
              </div>
            ))}
            {project.tools.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-background border border-white/10 flex items-center justify-center text-[8px] font-mono text-textMuted">
                +{project.tools.length - 3}
              </div>
            )}
          </div>
          
          <span className="text-[10px] font-mono text-primary tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
            Open Interface →
          </span>
        </div>

        {/* Cyberpunk decorative lines */}
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-500 m-2"></div>
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-secondary/0 group-hover:border-secondary/50 transition-colors duration-500 m-2"></div>
      </div>
    </motion.div>
  );
};

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-24 relative">
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            isOpen={!!selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
      {/* Background glow */}
      {/* Background glow removed for all-black theme */}

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} onClick={setSelectedProject} />
          ))}
        </div>

      </div>
    </section>
  );
}

// Preload critical models
projects.forEach(project => {
  if (project.models) {
    project.models.forEach(url => useGLTF.preload(url));
  } else if (project.modelPath) {
    useGLTF.preload(project.modelPath);
  }
});
