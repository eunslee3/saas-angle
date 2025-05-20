"use client"

import { ideas } from "@/lib/placeholder-data"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useAngleStore } from "@/store/useAngleStore"

export default function AnglePage() {
  const { angle } = useAngleStore()
  console.log('angle: ', angle)

  return (
    <div className="max-w-3xl mx-auto py-6">
      <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to ideas
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-1">{angle?.title}</h1>
        <p className="text-gray-600">{angle?.subtitle}</p>
      </div>

      <div className="space-y-6">
        {/* Micro-Niche */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <span className="text-blue-600 text-sm">✧</span>
            </div>
            <h2 className="font-medium text-gray-900">Micro-Niche</h2>
          </div>
          <p className="text-gray-700">{angle?.microNiche}</p>
        </div>

        {/* Reframed Problem */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <span className="text-blue-600 text-sm">↻</span>
            </div>
            <h2 className="font-medium text-gray-900">Reframed Problem</h2>
          </div>
          <p className="text-gray-700">{angle?.reframedProblem}</p>
        </div>

        {/* Solution */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <span className="text-blue-600 text-sm">↹</span>
            </div>
            <h2 className="font-medium text-gray-900">Solution</h2>
          </div>
          <div className="space-y-3 text-gray-700">
            <p className="text-gray-700">{angle?.solution?.coreProduct}</p>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-gray-900">Key Features</p>
              <ul className="list-disc pl-5 space-y-1">
                {angle?.solution?.keyFeatures?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <span className="text-blue-600 text-sm">◎</span>
            </div>
            <h2 className="font-medium text-gray-900">Target Audience</h2>
          </div>
          <p className="text-gray-700">{angle?.audience}</p>
        </div>

        {/* Monetization Model */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <span className="text-blue-600 text-sm">↗</span>
            </div>
            <h2 className="font-medium text-gray-900">Monetization Model</h2>
          </div>
          <div className="text-gray-700">
            <p className="text-gray-700">{angle?.monetization?.approach}</p>
            <ul className="list-disc pl-5 space-y-1">
              {angle?.monetization?.tiers?.map((tier, index) => (
                <li key={index}>{tier}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Suggested Tech Stack */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <span className="text-blue-600 text-sm">⚙</span>
            </div>
            <h2 className="font-medium text-gray-900">Competitor Analysis</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div className="flex flex-col gap-2">
              <em><p className="text-gray-900">Direct Competitors</p></em>
              <ul className="list-disc pl-5 space-y-1">
                {angle?.competitorAnalysis?.directCompetitors?.map((competitor, index) => (
                  <>
                    <li key={index}>{competitor.name}</li>
                    <li>{competitor.description}</li>
                    <li>{competitor.pricing}</li>
                    <li>{competitor.whyThisProductIsDifferent}</li>
                  </>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2">
            <em><p className="text-gray-900">Indirect Competitors</p></em>
              <ul className="list-disc pl-5 space-y-1">
                {angle?.competitorAnalysis?.indirectCompetitors?.map((competitor, index) => (
                  <>
                    <li key={index}>{competitor.name}</li>
                    <li>{competitor.description}</li>
                    <li>{competitor.pricing}</li>
                    <li>{competitor.whyThisProductCanStealMarketShare}</li>
                  </>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}