import React from 'react';
import { MonitorIcon, WandIcon, ClipboardCheckIcon } from 'lucide-react';
const steps = [{
  title: 'Browse real SaaS products',
  description: 'Explore our curated collection of successful SaaS businesses.',
  icon: MonitorIcon
}, {
  title: "Click 'Twist This' to generate a niche angle",
  description: 'Let AI find unique opportunities and market gaps.',
  icon: WandIcon
}, {
  title: 'Explore your personalized business proposal',
  description: 'Get detailed insights and validation signals for your idea.',
  icon: ClipboardCheckIcon
}];
export const HowItWorks = () => {
  return <div className="py-24 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          How Beachhead Works
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          From browsing to business plan in 10 seconds.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {steps.map((step, i) => (
          <div key={i} className="relative group h-full">
            <div className="flex flex-col justify-center items-center text-center p-8 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-200 h-full min-h-[24rem]">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-200">
                <step.icon className="w-8 h-8" />
              </div>
              <div className="absolute -top-4 left-4 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium">
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
};