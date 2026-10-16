import React from 'react';

export default function HeroEffects() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Subtle Architectural Drafting Grid */}
      <div 
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #18181b 1px, transparent 1px),
            linear-gradient(to bottom, #18181b 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 95%)'
        }}
      />

      {/* Architectural Corner Crop Marks */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-textDefault/20"></div>
      <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-textDefault/20"></div>
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-textDefault/20"></div>
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-textDefault/20"></div>
    </div>
  );
}
