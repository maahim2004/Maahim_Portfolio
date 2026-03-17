import React from 'react';
import { motion } from 'framer-motion';

export default function HeroEffects() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {/* Subtle Animated Grid */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #38bdf8 1px, transparent 1px),
            linear-gradient(to bottom, #38bdf8 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />

      {/* Scanning Line Effect */}
      <motion.div
        initial={{ top: '-10%' }}
        animate={{ top: '110%' }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent shadow-[0_0_15px_rgba(56,189,248,0.5)] z-20"
      />

      {/* Decorative Corner Brackets */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-primary/20" />
      <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-primary/20" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-primary/20" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-primary/20" />

      {/* Telemetry Text */}
      <div className="absolute top-24 left-10 font-mono text-[9px] text-primary/40 space-y-1 hidden lg:block uppercase tracking-[0.2em]">
        <div>LAT: 21.1702° N</div>
        <div>LON: 72.8311° E</div>
        <div>ALT: 12.4 KM</div>
        <div className="pt-2">VEL: 7.82 KM/S</div>
      </div>

      <div className="absolute bottom-24 right-10 font-mono text-[9px] text-primary/40 text-right hidden lg:block uppercase tracking-[0.2em]">
        <div>PHASE: ASCENT</div>
        <div>THRUST: 104%</div>
        <div>FUEL: 89.2%</div>
        <div className="pt-2 text-primary/60">T+ 00:04:21:05</div>
      </div>

      {/* Faint Moving Light Blooms */}
      {/* Faint Moving Light Blooms Removed for all-black theme */}
    </div>
  );
}
