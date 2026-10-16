import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ExternalLink, Database, Cpu, Cog, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { projects } from '../data/projects';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, OrbitControls, Html } from '@react-three/drei';

import { useState, useRef, useEffect, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Preload all 3D project models in background memory for instant modal load times
projects.forEach((project) => {
  const modelList = project.models || (project.modelPath ? [project.modelPath] : []);
  modelList.forEach((url) => {
    if (url) useGLTF.preload(url);
  });
});

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
          mat.emissive = new THREE.Color("#D40028"); // Candy Apple Red Accent
          mat.emissiveIntensity = 0.25;
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
  cpu: <Cpu className="w-7 h-7 text-primary" />,
  cog: <Cog className="w-7 h-7 text-primary" />,
  database: <Database className="w-7 h-7 text-primary" />
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
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/75 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          className="relative w-full max-w-6xl max-h-[90vh] bg-[#FAF8F2] rounded-2xl overflow-hidden border border-borderLight shadow-2xl flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-[110] p-2.5 bg-white hover:bg-primary hover:text-white rounded-full border border-borderLight text-textDefault transition-all shadow-paper"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: 3D Model / Photos Viewport */}
          <div className="w-full md:w-3/5 h-[400px] md:h-auto bg-[#F2EDE3]/50 relative border-b md:border-b-0 md:border-r border-borderLight flex flex-col">
            {/* View Mode Toggle */}
            {models && project.images && (
              <div className="absolute top-4 left-4 z-[110] flex bg-white/90 backdrop-blur-md rounded-full border border-borderLight p-1 shadow-paper">
                <button 
                  onClick={() => setViewMode('model')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all ${viewMode === 'model' ? 'bg-primary text-white shadow-candy font-bold' : 'text-textMuted hover:text-textDefault'}`}
                >
                  3D Analysis
                </button>
                <button 
                  onClick={() => setViewMode('photos')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all ${viewMode === 'photos' ? 'bg-secondary text-white font-bold' : 'text-textMuted hover:text-textDefault'}`}
                >
                  Photo Record
                </button>
              </div>
            )}

            <div className="flex-1 relative overflow-hidden">
              {viewMode === 'model' && models ? (
                <div className="w-full h-full relative group/canvas">
                  <Canvas shadows dpr={[1, 1.5]} camera={{ fov: 45, position: [0, 0, 5] }} gl={{ alpha: true, antialias: true }}>
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[10, 10, 10]} intensity={1.5} color="#FFFFFF" castShadow />
                    <pointLight position={[-8, 6, -5]} intensity={1.5} color="#D40028" />
                    <Suspense fallback={
                      <Html center>
                        <div className="flex flex-col items-center justify-center gap-3 w-48">
                          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-[9px] font-mono text-primary font-bold tracking-[0.2em] uppercase animate-pulse">Loading CAD Analysis</span>
                        </div>
                      </Html>
                    }>
                      <Stage environment="city" intensity={0.6} adjustCamera={1.2}>
                        <InteractiveModel url={models[activeIteration]} disableTransparency={project.disableTransparency} />
                      </Stage>
                    </Suspense>
                    <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={true} makeDefault />
                  </Canvas>
                  
                  {models.length > 1 && (
                    <>
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <button onClick={prevIteration} className="p-3 bg-white/90 hover:bg-primary hover:text-white rounded-full border border-borderLight text-textDefault transition-all pointer-events-auto shadow-paper"><ChevronLeft className="w-5 h-5" /></button>
                      </div>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <button onClick={nextIteration} className="p-3 bg-white/90 hover:bg-primary hover:text-white rounded-full border border-borderLight text-textDefault transition-all pointer-events-auto shadow-paper"><ChevronRight className="w-5 h-5" /></button>
                      </div>
                    </>
                  )}
                  <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-white/90 px-4 py-2 rounded-full border border-borderLight shadow-paper pointer-events-none">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-[10px] font-mono text-textDefault tracking-wider uppercase font-bold">
                      Interactive CAD Model Active
                    </span>
                  </div>
                </div>
              ) : project.images ? (
                <div className="w-full h-full p-8 md:p-12 overflow-y-auto bg-white/50 flex flex-col gap-8 scrollbar-thin">
                  {project.images.map((img, i) => (
                    <div key={i} className="group relative">
                      <img src={img} alt={`${project.title} - ${i}`} className="w-full rounded-xl border border-borderLight shadow-paper transition-transform duration-500 group-hover:scale-[1.01]" />
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
          <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto flex flex-col bg-[#FAF8F2] justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-mono text-primary font-bold tracking-widest uppercase mb-1.5 block">{project.status}</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-textDefault uppercase">
                    {project.title}
                  </h2>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 shrink-0">
                  {IconMap[project.icon]}
                </div>
              </div>

              <div className="space-y-6">
                <section>
                  <div className="flex items-center gap-2 mb-2 text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                    <span>// OVERVIEW</span>
                  </div>
                  <p className="text-textMuted leading-relaxed text-sm">
                    {project.fullDescription || project.description}
                  </p>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-2 text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                    <span>// ENGINEERING CHALLENGE</span>
                  </div>
                  <div className="pl-4 border-l-2 border-primary bg-primary/5 py-2.5 rounded-r-lg">
                    <p className="text-textDefault text-sm">{project.challenge}</p>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-2 text-[10px] font-mono uppercase tracking-widest text-textMuted font-bold">
                    <span>// TECHNICAL STACK</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, i) => (
                      <span key={i} className="text-xs font-mono text-textDefault bg-white px-3 py-1.5 rounded-md border border-borderLight shadow-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </section>
                
                {/* Jump to photos if in model mode */}
                {viewMode === 'model' && project.images && (
                  <section className="pt-2">
                    <button 
                      onClick={() => setViewMode('photos')}
                      className="group w-full relative aspect-video rounded-xl overflow-hidden border border-borderLight hover:border-primary transition-all shadow-paper"
                    >
                      <img src={project.images[0]} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                        <span className="px-4 py-2 bg-white/95 rounded-full text-[10px] font-mono text-textDefault font-bold tracking-widest uppercase shadow-paper">
                          View Full Gallery ({project.images.length})
                        </span>
                      </div>
                    </button>
                  </section>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-borderLight flex justify-between items-center text-[10px] font-mono text-textMuted uppercase">
              <span>RECORD ID: {project.id}</span>
              <span className="text-primary font-bold">VERIFIED SPEC</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const ProjectCard = ({ project, idx, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
      onClick={() => onClick(project)}
      onMouseEnter={() => {
        const models = project.models || (project.modelPath ? [project.modelPath] : null);
        if (models) {
          models.forEach(url => useGLTF.preload(url));
        }
      }}
      className="group relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-borderLight hover:border-primary/60 hover:shadow-paper-lg transition-all duration-300 cursor-pointer flex flex-col justify-between p-8"
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="p-3.5 bg-primary/5 rounded-xl border border-primary/20 group-hover:bg-primary/10 transition-colors">
            {IconMap[project.icon]}
          </div>
          <span className="text-xs font-mono px-3 py-1 bg-primary/10 text-primary font-bold rounded-full border border-primary/20">
            {project.status}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-display font-bold text-textDefault mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-textMuted mb-6 line-clamp-3 leading-relaxed text-sm">
          {project.description}
        </p>
      </div>

      <div className="mt-auto pt-6 border-t border-borderLight flex justify-between items-center">
        <div className="flex flex-wrap gap-1.5">
          {project.tools.slice(0, 3).map((tool, i) => (
            <span key={i} className="px-2 py-0.5 rounded bg-surfaceMuted border border-borderLight text-[10px] font-mono text-textDefault">
              {tool}
            </span>
          ))}
          {project.tools.length > 3 && (
            <span className="px-1.5 py-0.5 text-[10px] font-mono text-textMuted">
              +{project.tools.length - 3}
            </span>
          )}
        </div>
        
        <span className="text-xs font-mono font-bold text-primary tracking-wider uppercase group-hover:translate-x-1 transition-transform flex items-center gap-1">
          Inspect →
        </span>
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

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-borderLight pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-widest text-primary font-bold">
              <span>[02]</span>
              <span>TECHNICAL DOSSIERS</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-extrabold uppercase text-textDefault tracking-tight"
            >
              ENGINEERED SOLUTIONS
            </motion.h2>
          </div>
          
          <div className="text-textMuted font-mono text-xs uppercase tracking-widest">
            {projects.length} VERIFIED CAD & ROBOTICS RECORDS
          </div>
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

// Preloading disabled to save memory on mobile devices
