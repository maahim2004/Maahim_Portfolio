import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './pages/HeroSection';
import AboutSection from './pages/AboutSection';
import ProjectsSection from './pages/ProjectsSection';
import ExperienceSection from './pages/ExperienceSection';
import SkillsSection from './pages/SkillsSection';
import ContactSection from './pages/ContactSection';

function App() {
  return (
    <div className="relative min-h-screen text-textDefault pb-[200px] sm:pb-0">
      <Navbar />
      
      <main className="relative z-10 flex flex-col items-center justify-center w-full">
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
