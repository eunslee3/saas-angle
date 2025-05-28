

import React from 'react'
import {
  ArrowRightIcon,
  SparklesIcon,
  SearchIcon,
  ShieldCheckIcon,
  RocketIcon,
} from 'lucide-react'
import { useRouter } from 'next/navigation';

const benefitTiles = [
  {
    gradient: 'from-blue-400/80 to-blue-600/80',
    darkGradient: 'dark:from-blue-400/20 dark:to-blue-600/20',
    icon: SparklesIcon,
    title: 'Real SaaS Inspiration',
    description:
      'Learn from successful products and adapt winning strategies to new niches',
  },
  {
    gradient: 'from-purple-400/80 to-purple-600/80',
    darkGradient: 'dark:from-purple-400/20 dark:to-purple-600/20',
    icon: SearchIcon,
    title: 'AI-Powered Analysis',
    description: 'Discover profitable market gaps and opportunities instantly',
  },
  {
    gradient: 'from-cyan-400/80 to-cyan-600/80',
    darkGradient: 'dark:from-cyan-400/20 dark:to-cyan-600/20',
    icon: ShieldCheckIcon,
    title: 'Validate First',
    description: 'Get market insights and validation signals before you build',
  },
  {
    gradient: 'from-indigo-400/80 to-indigo-600/80',
    darkGradient: 'dark:from-indigo-400/20 dark:to-indigo-600/20',
    icon: RocketIcon,
    title: 'Launch Faster',
    description: 'Turn validated ideas into revenue-generating products',
  },
]
export const Benefits = () => {
  const router = useRouter();

  return (
    <div className="py-24 bg-white/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Built for indie founders and product hackers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to find and validate your next SaaS idea
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefitTiles.map((tile, i) => (
            <div key={i} className="group">
              <div className="flex flex-col items-center text-center space-y-4">
                <div
                  className={`
                    w-16 h-16 rounded-2xl bg-gradient-to-br ${tile.gradient} ${tile.darkGradient}
                    flex items-center justify-center
                    transform transition-all duration-200
                    group-hover:scale-110 group-hover:shadow-lg
                    backdrop-blur-sm
                  `}
                >
                  <tile.icon
                    className="w-8 h-8 text-white/90 dark:text-white/90"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {tile.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {tile.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <button onClick={() => router.push('/auth')} className="inline-flex items-center space-x-2 text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <span>Start building your SaaS</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
