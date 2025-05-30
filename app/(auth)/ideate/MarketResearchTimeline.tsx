import React from 'react'
import {
  CheckCircle,
  Loader2,
  Sparkles,
  Search,
  TrendingUp,
  GaugeCircle,
} from 'lucide-react'

interface TimelineStep {
  icon: React.ReactNode
  title: string
  status: 'complete' | 'in-progress' | 'pending'
  description: string
  details: string[]
}

export default function MarketResearchTimeline ({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Validation Progress
        </h3>
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          In Progress
        </span>
      </div>
      <ol className="relative border-l border-gray-200 dark:border-gray-700">
        {steps.map((step, idx) => (
          <li key={idx} className="mb-8 last:mb-0 ml-6">
            <div className="absolute w-10 h-10 flex items-center justify-center rounded-xl -left-5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
              {step.status === 'complete' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : step.status === 'in-progress' ? (
                <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
              ) : (
                <div className="text-gray-400 dark:text-gray-500">
                  {step.icon}
                </div>
              )}
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {step.description}
              </p>
              {step?.details?.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {step.details.map((detail, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-600 dark:text-gray-400 pl-4 border-l-2 border-gray-200 dark:border-gray-700"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
