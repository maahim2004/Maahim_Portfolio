import { motion } from 'framer-motion';
import { useRef } from 'react';
import { FileText, ExternalLink, ArrowDown, CheckCircle2, ShieldCheck, Compass } from 'lucide-react';
import HeroEffects from '../components/3d/HeroEffects';

export default function HeroSection() {
  const containerRef = useRef(null);

  const pillars = [
    {
      title: "Turbomachinery & CAD Systems",
      desc: "Developing multi-stage turbofan rotors, modular skids, and parametric CAD assemblies tailored for aerodynamic performance and mechanical endurance."
    },
    {
      title: "Thermal & CFD Simulation",
      desc: "Conducting thermodynamic cycle modeling, Rankine HAZOP sensitivity, and computational fluid dynamics built for precision and thermal efficiency."
    },
    {
      title: "Standards Assurance & DFM",
      desc: "Implementing rigorous testing protocols aligned with ASME, ISO, and industrial standards to ensure structural integrity and manufacturability."
    }
  ];

  const standards = [
    { num: "01", text: "Kinematic Architecture & Finite Stress Verification" },
    { num: "02", text: "Compliance-Driven Design (ASME PTC 4, PTC 6, BPVC Sec. VIII)" },
    { num: "03", text: "Design for Manufacturability (DFM) & Prototyping" }
  ];

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen w-full pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-transparent"
    >
      {/* Background Architectural Drafting Layer */}
      <HeroEffects />

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        {/* Top Meta Breadcrumb Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-borderLight/80 backdrop-blur-[2px]"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-textDefault font-bold">
              PORTFOLIO DOSSIER
            </span>
            <span className="text-borderLight">|</span>
            <span className="text-xs font-mono uppercase tracking-widest text-textMuted">
              TURBOMACHINERY • CAD • THERMAL SYSTEMS
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-textMuted bg-[#FAF8F2]/90 py-1 px-3 rounded-full border border-borderLight w-fit">
            <span>SVNIT SURAT</span>
            <span className="text-primary font-bold">/</span>
            <span className="text-primary font-bold">MECHANICAL ENGINEERING</span>
          </div>
        </motion.div>

        {/* Main Editorial Hero Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-5xl"
        >
          <div className="inline-block mb-3 px-3.5 py-1 rounded-md bg-white/90 border border-borderLight shadow-paper text-primary font-mono text-xs font-bold uppercase tracking-widest">
            MAAHIM NIMESH PATEL
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight uppercase leading-[0.95] mb-6 drop-shadow-sm">
            <span className="text-primary">MECHANICAL</span>{" "}
            <span className="text-textDefault">DESIGN</span> <br className="hidden sm:inline" />
            <span className="text-textDefault bg-clip-text">ENGINEERING</span>
          </h1>

          <p className="text-textMuted text-base sm:text-lg md:text-xl font-normal max-w-3xl leading-relaxed mb-10 bg-[#FAF8F2]/80 backdrop-blur-[2px] p-4 rounded-xl border border-borderLight/60">
            From multi-stage turbomachinery and thermal power BTG cycles to robotic prosthetics and fluid simulation, 
            engineering mission-critical mechanical systems that withstand the harshest operating conditions.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a 
              href="https://drive.google.com/drive/folders/1vM5ls7EUAPbmPj6pRI50LJ-Z-BaOENr8?usp=drive_link" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primaryDark rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-candy"
            >
              <FileText className="w-4 h-4" />
              <span>Access Documentation & Drive</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-surfaceMuted border border-borderLight text-textDefault rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-paper"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-3.5 h-3.5 text-primary" />
            </button>
          </div>
        </motion.div>

        {/* 3-Column Pillars - Clean Engineering Specification Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-borderLight"
        >
          {pillars.map((item, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-borderLight shadow-paper flex flex-col justify-between">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 shadow-sm"></span>
                <h3 className="font-display font-bold text-base text-textDefault uppercase tracking-tight">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-textMuted leading-relaxed pl-5 font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <div className="mt-14 flex justify-center items-center">
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-textMuted hover:text-primary transition-colors py-2 px-4 rounded-full border border-borderLight bg-white/70 backdrop-blur-sm shadow-sm"
          >
            <span>Scroll to About Profile</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
}
