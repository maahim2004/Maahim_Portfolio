import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './pages/HeroSection';
import AboutSection from './pages/AboutSection';
import ProjectsSection from './pages/ProjectsSection';
import ExperienceSection from './pages/ExperienceSection';
import SkillsSection from './pages/SkillsSection';
import ContactSection from './pages/ContactSection';
import HeroTurbofan from './components/3d/HeroTurbofan';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const progress = window.scrollY / scrollHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen text-textDefault pb-[200px] sm:pb-0">
      <Navbar />

      {/* Global 3D Canvas Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
        <Canvas 
          shadows 
          camera={{ position: [0, 0, 10], fov: 35 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
          frameloop="always" 
        >
          <Suspense fallback={null}>
            <HeroTurbofan scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>
      
      <main className="relative z-10 flex flex-col items-center justify-center w-full bg-transparent">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
