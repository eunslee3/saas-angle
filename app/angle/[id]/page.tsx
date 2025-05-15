import { ideas } from "@/lib/placeholder-data"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function AnglePage({ params }: { params: { id: string } }) {
  const idea = ideas.find((idea) => idea.id === params.id)

  if (!idea) {
    notFound()
  }

  // This would normally come from an API call based on the idea
  // Using placeholder data for demonstration
  const angle = {
    title: `New Angle on ${idea.title}`,
    subtitle: "AI-generated opportunity analysis and execution plan",
    microNiche:
      "Knowledge management platform specifically designed for indie game developers, focusing on narrative design, asset management, and collaborative worldbuilding.",
    reframedProblem:
      "Current knowledge management tools don't address the unique needs of game narrative design - tracking character arcs, maintaining story consistency, and managing branching dialogues while collaborating with small teams.",
    targetAudience: [
      "Independent game developers and small studios (1-10 people)",
      "Narrative designers and writers working on story-driven games",
      "Game design teachers and students",
    ],
    monetization: {
      approach: "Freemium Approach",
      tiers: [
        "Free tier: Basic narrative templates, single project limit",
        "Pro tier ($15/mo): Unlimited projects, advanced features",
        "Team tier ($49/mo): Collaboration tools, asset sharing",
      ],
    },
    techStack: {
      frontend: ["Next.js", "Tailwind CSS", "React Query"],
      backend: ["Node.js", "PostgreSQL", "Prisma ORM"],
    },
    buildPlan: [
      { day: "D1", task: "Project setup, database schema, authentication" },
      { day: "D2-3", task: "Core narrative template system and editor" },
      { day: "D4-5", task: "Character/plot management features" },
      { day: "D6", task: "Export functionality and asset organization" },
      { day: "D7", task: "Testing, bug fixes, and initial launch" },
    ],
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to ideas
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-1">{angle.title}</h1>
        <p className="text-gray-600">{angle.subtitle}</p>
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
          <p className="text-gray-700">{angle.microNiche}</p>
        </div>

        {/* Reframed Problem */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <span className="text-blue-600 text-sm">↻</span>
            </div>
            <h2 className="font-medium text-gray-900">Reframed Problem</h2>
          </div>
          <p className="text-gray-700">{angle.reframedProblem}</p>
        </div>

        {/* Target Audience */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <span className="text-blue-600 text-sm">◎</span>
            </div>
            <h2 className="font-medium text-gray-900">Target Audience</h2>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {angle.targetAudience.map((audience, index) => (
              <li key={index}>{audience}</li>
            ))}
          </ul>
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
            <p className="font-medium mb-2">{angle.monetization.approach}</p>
            <ul className="list-disc pl-5 space-y-1">
              {angle.monetization.tiers.map((tier, index) => (
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
            <h2 className="font-medium text-gray-900">Suggested Tech Stack</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="font-medium mb-1">Frontend</p>
              <ul className="list-disc pl-5 space-y-1">
                {angle.techStack.frontend.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">Backend</p>
              <ul className="list-disc pl-5 space-y-1">
                {angle.techStack.backend.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 7-Day Build Plan */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <span className="text-blue-600 text-sm">↹</span>
            </div>
            <h2 className="font-medium text-gray-900">7-Day Build Plan</h2>
          </div>
          <div className="space-y-3 text-gray-700">
            {angle.buildPlan.map((step, index) => (
              <div key={index} className="flex">
                <div className="font-medium text-amber-600 w-10">{step.day}</div>
                <div>{step.task}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
