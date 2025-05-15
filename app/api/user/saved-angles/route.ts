import { NextResponse } from "next/server"

export async function GET() {
  // Mock data for saved angles
  const savedAngles = [
    {
      id: "angle_1",
      ideaId: "1",
      ideaTitle: "Notion for Game Developers",
      microNiche:
        "Knowledge management platform specifically designed for indie game developers, focusing on narrative design, asset management, and collaborative worldbuilding.",
      savedAt: "2023-11-20T14:30:00Z",
    },
    {
      id: "angle_2",
      ideaId: "3",
      ideaTitle: "Code Review Assistant",
      microNiche:
        "Automated code review tool specifically designed for small development teams without dedicated DevOps resources.",
      savedAt: "2023-11-18T09:15:00Z",
    },
    {
      id: "angle_3",
      ideaId: "5",
      ideaTitle: "SaaS Metrics Dashboard",
      microNiche:
        "Analytics platform designed specifically for early-stage SaaS founders to track key growth metrics and identify optimization opportunities.",
      savedAt: "2023-11-15T16:45:00Z",
    },
  ]

  // Add a small delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 700))

  return NextResponse.json({ savedAngles })
}
