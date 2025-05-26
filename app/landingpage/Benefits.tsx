import React from 'react';
import { SparklesIcon, SearchIcon, CheckCircleIcon } from 'lucide-react';
const benefits = [{
  title: 'Get inspired by real SaaS founders',
  description: 'Learn from successful products and adapt their winning strategies to new niches.',
  icon: SparklesIcon
}, {
  title: 'Explore untapped niches instantly',
  description: 'Discover profitable market gaps and opportunities with AI-powered analysis.',
  icon: SearchIcon
}, {
  title: 'Validate before you build',
  description: 'Get instant market insights and validation signals for your ideas.',
  icon: CheckCircleIcon
}];
export const Benefits = () => {
  return <div className="py-20 bg-white/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => <div key={i} className="relative group p-8 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 mb-6">
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {benefit.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {benefit.description}
              </p>
            </div>)}
        </div>
      </div>
    </div>;
};