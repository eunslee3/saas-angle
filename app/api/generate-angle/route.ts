import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, problem } = body

    if (!title || !problem) {
      return NextResponse.json({ error: "Missing required fields: title and problem" }, { status: 400 })
    }

    // Simulate processing time for AI generation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock angle data based on the input
    const angle = {
      microNiche: `Knowledge management platform specifically designed for indie ${title.toLowerCase()} developers, focusing on narrative design, asset management, and collaborative worldbuilding.`,
      reframedProblem: `Current solutions don't address the unique needs of ${title.toLowerCase()} - ${problem}`,
      audience:
        "Independent developers and small studios (1-10 people), narrative designers and writers working on story-driven projects, and design teachers and students.",
      monetization: {
        approach: "Freemium Approach",
        tiers: [
          "Free tier: Basic templates, single project limit",
          "Pro tier ($15/mo): Unlimited projects, advanced features",
          "Team tier ($49/mo): Collaboration tools, asset sharing",
        ],
      },
      stack: {
        frontend: ["Next.js", "Tailwind CSS", "React Query"],
        backend: ["Node.js", "PostgreSQL", "Prisma ORM"],
      },
      buildPlan: [
        { day: "D1", task: "Project setup, database schema, authentication" },
        { day: "D2-3", task: "Core template system and editor" },
        { day: "D4-5", task: "Management features and user flows" },
        { day: "D6", task: "Export functionality and asset organization" },
        { day: "D7", task: "Testing, bug fixes, and initial launch" },
      ],
    }

    return NextResponse.json({ angle })
  } catch (error) {
    console.error("Error generating angle:", error)
    return NextResponse.json({ error: "Failed to generate angle" }, { status: 500 })
  }
}
