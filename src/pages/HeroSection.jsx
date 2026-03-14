import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function RotatingGear() {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.5;
    meshRef.current.rotation.z += delta * 0.3;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[2, 0.4, 128, 32]} />
      <meshStandardMaterial 
        color="#00F0FF" 
        wireframe={true} 
        transparent 
        opacity={0.3}
        emissive="#00F0FF"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen w-full flex items-center justify-center pt-20">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Area */}
        <div className="flex flex-col space-y-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="h-[2px] w-12 bg-primary shadow-glow"></div>
            <span className="text-primary font-mono tracking-wider text-sm uppercase">INITIATING SEQUENCE...</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold font-display leading-tight"
          >
            ENGINEERING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary text-glow">
              THE FUTURE
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-textMuted max-w-xl font-light"
          >
            I am <span className="text-white font-medium">Maahim Nimesh Patel</span>, a Mechanical Engineering student at SVNIT specializing in robotics, finite element analysis, and next-generation system prototyping.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <a href="#projects" className="group relative px-6 py-3 rounded-md bg-primary text-background font-bold font-display overflow-hidden flex items-center justify-center gap-2 hover:shadow-glow-primary transition-all">
              <span className="relative z-10">VIEW SCHEMATICS (PROJECTS)</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shimmer"></div>
            </a>
            
            <a href="https://drive.google.com/drive/folders/1vM5ls7EUAPbmPj6pRI50LJ-Z-BaOENr8?usp=drive_link" target="_blank" rel="noopener noreferrer" className="group px-6 py-3 rounded-md border border-white/20 hover:border-secondary/50 glass-panel-hover flex items-center justify-center gap-2 font-display text-textDefault transition-all">
              <span>DOWNLOAD DATA_LOG (RESUME)</span>
              <Download className="w-5 h-5 text-secondary group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* 3D Model Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="h-[400px] md:h-[600px] w-full relative"
        >
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 rounded-full blur-[100px] -z-10"></div>
          <div className="absolute top-4 right-4 w-16 h-16 border-t font-mono text-xs border-r border-primary/30 flex items-start justify-end p-2 text-primary/50">SYS.ON</div>
          <div className="absolute bottom-4 left-4 w-16 h-16 border-b border-l border-primary/30"></div>
          
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#00F0FF" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#FF6E00" />
            <RotatingGear />
          </Canvas>
          
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="text-xs font-mono text-primary tracking-widest uppercase">Scroll to initialize</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
      </motion.div>
    </section>
  );
}
