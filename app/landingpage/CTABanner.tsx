import React from 'react';
export const CTABanner = () => {
  return <div className="py-24 bg-gradient-to-r from-blue-600 to-cyan-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Turn your next idea into a SaaS
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Use AI to uncover niche, validated product angles in seconds.
        </p>
        <button className="px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 hover:scale-[1.02]">
          Generate your first twist →
        </button>
      </div>
    </div>;
};