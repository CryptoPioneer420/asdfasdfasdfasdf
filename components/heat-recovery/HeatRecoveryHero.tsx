import React from 'react';

const HeatRecoveryHero: React.FC = () => {
  return (
    <div className="relative bg-slate-900 text-white py-16 md:py-24 px-6 rounded-3xl overflow-hidden mb-12 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-slate-900/95 z-10" />
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      <div className="relative z-20 max-w-4xl mx-auto text-center">
        <div className="inline-block px-4 py-1.5 bg-teal-500/20 text-teal-300 rounded-full text-sm font-semibold mb-6 border border-teal-500/30">
          Sustainable Mining Technology
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          Heat Recovery Mining
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
          Turn waste heat into a valuable asset. Discover specialized hardware for Hydromining and Immersion Cooling to increase efficiency and profitability.
        </p>
      </div>
    </div>
  );
};

export default HeatRecoveryHero;