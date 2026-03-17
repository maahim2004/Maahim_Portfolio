import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import HeroTurbofan from '../components/3d/HeroTurbofan';
import HeroEffects from '../components/3d/HeroEffects';

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax and fade effects for smooth transition
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Background Effects Layer */}
      <HeroEffects />
      
      {/* 3D Turbofan Visualization Layer */}
      <motion.div style={{ y, scale, opacity }} className="absolute inset-0 z-0">
        <Canvas 
          shadows 
          camera={{ position: [0, 0, 10], fov: 35 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
          frameloop="always" 
        >
          <Suspense fallback={null}>
            <HeroTurbofan />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* Engineering Status Panel (Top Right) */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute top-24 right-10 z-30 hidden md:block"
      >
        <div className="glass-panel p-4 border-l-2 border-primary/50 font-mono text-[10px] space-y-1">
          <div className="text-primary/70 tracking-widest uppercase mb-2 border-b border-primary/20 pb-1">System Status</div>
          <div className="flex justify-between gap-8">
            <span className="text-textMuted">CAD ENGINE:</span>
            <span className="text-primary animate-pulse">ACTIVE</span>
          </div>
          <div className="flex justify-between gap-8">
            <span className="text-textMuted">SIMULATION CORE:</span>
            <span className="text-primary">READY</span>
          </div>
          <div className="flex justify-between gap-8">
            <span className="text-textMuted">PROPULSION ANALYSIS:</span>
            <span className="text-primary">ONLINE</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content Overlay */}
      <div className="relative z-20 container mx-auto px-6 h-full flex flex-col items-start justify-center text-left pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-block mb-6 px-4 py-1.5 border border-primary/30 rounded-full bg-primary/5 backdrop-blur-md"
          >
            <span className="text-primary font-mono text-[11px] tracking-[0.5em] uppercase">Aerospace Engineering Portfolio</span>
          </motion.div>
          
          <h1 className="text-7xl md:text-[10rem] font-display font-bold leading-[0.8] mb-4 tracking-[0.05em] uppercase bg-gradient-to-b from-white via-white to-primary bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">
            Maahim Patel
          </h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "300px" }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-[3px] bg-primary mb-10 shadow-[0_0_20px_#38bdf8]"
          ></motion.div>
          
          <div className="space-y-6">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xl md:text-2xl text-secondary font-display tracking-[0.2em] md:tracking-[0.4em] uppercase font-bold"
            >
              3rd Year Mechanical Major @ SVNIT Surat | CAD | Turbomachinery
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-textMuted max-w-2xl italic font-light text-lg md:text-xl border-l border-white/10 pl-8 pr-4"
            >
              "Engineering mechanical systems through design, simulation, and visualization."
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="pt-4 pointer-events-auto"
            >
              <a 
                href="https://drive.google.com/drive/folders/1vM5ls7EUAPbmPj6pRI50LJ-Z-BaOENr8?usp=drive_link" 
                target="_blank" 
                rel="noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary/10 border border-primary/50 rounded-full text-primary font-display font-bold text-sm tracking-widest uppercase overflow-hidden transition-all hover:bg-primary hover:text-black hover:shadow-glow-primary"
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-shimmer"></div>
                <FileText className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Access Documentation</span>
                <ExternalLink className="w-4 h-4 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30 cursor-pointer pointer-events-auto"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] font-mono text-primary tracking-[0.4em] uppercase">Begin Inspection</span>
        <div className="flex flex-col items-center">
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-primary text-xl"
          >
            ↓
          </motion.div>
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.2 }}
            className="text-primary/60 text-lg -mt-3"
          >
            ↓
          </motion.div>
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.4 }}
            className="text-primary/30 text-md -mt-3"
          >
            ↓
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
