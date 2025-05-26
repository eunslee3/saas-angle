import React from 'react';
export const DemoSection = () => {
  return <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            See it in action
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Beachhead is built for speed. Try a twist and get inspired.
          </p>
        </div>
        <div className="relative rounded-2xl bg-gradient-to-b from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 shadow-xl">
          <div className="flex items-center justify-start space-x-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="aspect-[16/9] rounded-lg bg-white dark:bg-gray-900 overflow-hidden">
            {/* Replace with actual screenshot */}
            <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20" />
          </div>
        </div>
        <div className="mt-12 text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200 hover:scale-[1.02] animate-gradient">
            Try it live →
          </button>
        </div>
      </div>
    </div>;
};