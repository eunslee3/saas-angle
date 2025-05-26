import React from 'react';
import { SparklesIcon } from 'lucide-react';
export const Hero = () => {
  return <div className="relative overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-blue-100/30 to-cyan-100/30 dark:from-blue-900/20 dark:to-cyan-900/20 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-blue-100/30 to-cyan-100/30 dark:from-blue-900/20 dark:to-cyan-900/20 blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
            Discover your next SaaS idea <br className="hidden sm:block" />
            in seconds
          </h1>
          <p className="mt-6 text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Beachhead uses AI to generate niche business proposals from real,
            revenue-generating products.
          </p>
          <div className="mt-10 flex items-center justify-center space-x-4">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200 hover:scale-[1.02] animate-gradient">
              Try it free →
            </button>
            <button className="px-8 py-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
              See examples
            </button>
          </div>
          <div className="mt-20">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Backed by builders from
            </p>
            <div className="flex items-center justify-center space-x-8">
              {[...Array(4)].map((_, i) => <div key={i} className="h-8 w-24 rounded-md bg-gray-200 dark:bg-gray-800" />)}
            </div>
          </div>
        </div>
      </div>
    </div>;
};