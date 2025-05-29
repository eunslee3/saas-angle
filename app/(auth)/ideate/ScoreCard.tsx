import React from 'react'
import { InfoIcon, QuoteIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface ScoreCardProps {
  status?: 'pending' | 'final'
  score: {
    scores: {
      [key: string]: number
    }
    explanation: string
  },
  idea: string
}

export const ScoreCard = ({ status = 'pending', score, idea }: ScoreCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'bg-green-500'
    if (score >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }
  const getScoreBackground = (score: number) => {
    if (score >= 70) return 'bg-green-100 dark:bg-green-500/10'
    if (score >= 40) return 'bg-yellow-100 dark:bg-yellow-500/10'
    return 'bg-red-100 dark:bg-red-500/10'
  }
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Beachhead Score
          </h3>
          <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
            <InfoIcon className="w-4 h-4" />
          </button>
        </div>
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          {status === 'pending' ? 'Preliminary Score' : 'Final Score ✓'}
        </span>
      </div>
      {/* Idea Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-start space-x-3">
          <QuoteIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-1" />
          <div className="space-y-2 min-w-0">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Idea:
            </p>
            <p className="text-base text-gray-900 dark:text-white leading-relaxed">
              {idea}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {Object.entries(score.scores).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
              {key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {value}/100
              </span>
            </div>
            <div className="relative w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className={`absolute left-0 top-0 h-full ${getScoreColor(value)}`}
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
        <div
          className={`mt-6 p-4 rounded-lg ${getScoreBackground(Object.values(score.scores).reduce((a, b) => a + b, 0) / Object.keys(score.scores).length)}`}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {score.explanation}
          </p>
        </div>
      </div>
    </div>
  )
}
