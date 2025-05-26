import React from 'react'
import { ArrowRight } from 'lucide-react'
import { TimelineStep } from './TimelineStep'
const steps = [
  {
    title: 'Browse the idea feed',
    description:
      'Explore our curated collection of real, revenue-generating SaaS businesses. Each listing includes MRR, growth metrics, and market positioning.',
    tip: 'Sort by newest to see fresh opportunities first',
  },
  {
    title: 'Filter and search',
    description:
      'Use revenue filters to focus on your target market size, or search by industry, tech stack, or business model.',
    tip: 'Pro tip: Filter by early-stage startups to find emerging niches',
  },
  {
    title: 'Generate your niche angle',
    description:
      "Click 'Generate Niche' on any product that interests you. Our AI will analyze the business model and suggest unique market opportunities.",
    tip: 'Try generating multiple angles to explore different possibilities',
  },
  {
    title: 'Review your personalized twist',
    description:
      'Get a detailed breakdown of your niche opportunity, including target market, positioning strategy, and potential revenue streams.',
  },
  {
    title: 'Save or iterate',
    description:
      'Like what you see? Save the idea to your dashboard. Want to explore more? Generate another angle or browse similar products.',
    tip: 'Build a collection of ideas before choosing your next project',
  },
]
export default function GetStarted() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            How to Use Beachhead
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Follow these simple steps to generate your next SaaS idea
          </p>
        </div>
        {/* Timeline Steps */}
        <div className="relative">
          {steps.map((step, i) => (
            <TimelineStep
              key={i}
              step={i + 1}
              title={step.title}
              description={step.description}
              tip={step.tip}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>
        {/* CTA Button */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:scale-[1.02]">
            <span>Explore the idea feed</span>
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
