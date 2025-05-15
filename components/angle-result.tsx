import type { Idea } from "@/lib/types"

export default function AngleResult({ idea }: { idea: Idea }) {
  // This would normally come from an API call based on the idea
  // Using placeholder data for demonstration
  const angle = {
    microNiche: "Remote team productivity tools for creative agencies",
    reframedProblem:
      "Creative agencies struggle to maintain productivity and collaboration when teams work remotely, leading to miscommunication and missed deadlines.",
    targetAudience: "Mid-sized creative agencies (10-50 employees) with distributed teams across multiple time zones.",
    monetization:
      "Tiered subscription model starting at $29/month for small teams, with enterprise plans at $199/month for larger agencies.",
    stack:
      "React, Next.js, Node.js backend, MongoDB for data storage, WebSockets for real-time collaboration, Stripe for payments.",
    buildPlan:
      "MVP in 3 months focusing on core collaboration features, beta testing with 5 agencies, full launch within 6 months with marketing focused on remote-first creative teams.",
  }

  const sections = [
    { title: "Micro-Niche", content: angle.microNiche },
    { title: "Reframed Problem", content: angle.reframedProblem },
    { title: "Target Audience", content: angle.targetAudience },
    { title: "Monetization", content: angle.monetization },
    { title: "Stack", content: angle.stack },
    { title: "Build Plan", content: angle.buildPlan },
  ]

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.title} className="border rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
          <p className="text-gray-700">{section.content}</p>
        </div>
      ))}
    </div>
  )
}
