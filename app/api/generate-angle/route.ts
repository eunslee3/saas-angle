import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { verifyAuthToken } from '@/lib/verifyAuthToken'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const payload = await verifyAuthToken()
    
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, mrr, link, tagline } = body

    console.log({ title, mrr, link, tagline })

    if (!title || !mrr || !link || !tagline) {
      return NextResponse.json(
        { error: 'Missing required fields: title, tagline, mrr, or link' },
        { status: 400 }
      )
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: `You're a SaaS strategist helping a solo developer evaluate the potential of a new product idea. Your goal is to return **high-leverage, strategic insight** that helps them determine whether to build it — and if so, how to best position it.

          You will receive a product title, a tagline, and optionally a problem statement or MRR.
          
          Think like a founder, marketer, and venture analyst — all at once. Your job is not to repeat what the product *is*, but to uncover:
          - The sharpest and smallest **beachhead market** with real urgency
          - How to **reframe the problem** in a way that makes it impossible to ignore
          - A monetization strategy that reflects **user psychology**, **value perception**, and **buying behavior**
          - A **differentiated product solution** with clear UX, workflow, or integration insight — not just benefits or aspirations
          - Competitor insights that identify **unfair advantages**, not just pricing or features
          
          Your response should include a **specific, actionable solution** — framed as what the developer could *actually build*. Don’t just describe a concept. Describe how it would work. Think: what would the dashboard look like? What would the user do first? Why does this model uniquely reduce friction or pain?
          
          Avoid boilerplate or shallow generalizations. Be blunt, specific, and original. This is for a real founder who will act on your input.
          
          Respond in the following **JSON structure**, filling in each field based on critical thinking:

          Do not refer to the new product as if it already exists. It is a proposed solution, and a potential competitor. Never write as if this solution is already launched or available in the market.

          {
            "microNiche": "",
            "reframedProblem": "",
            "solution": {
              "coreProduct": "A subscription-based platform where startups can request design and dev tasks from a curated pool of creatives — like 'Design-as-a-Service' but with hybrid pricing.",
              "keyFeatures": [
                "Project request form with pre-scoped task templates",
                "Team-matching algorithm based on startup’s tech stack and design style",
                "Dashboard to manage active projects and see who’s working on what",
                "Slack integration for async check-ins with contractors"
              ]
            },
            "audience": "",
            "monetization": {
              "approach": "",
              "explanation": []
            },
            "solution": [],
            "competitorAnalysis": {
              "directCompetitors": [
                {
                  "name": "",
                  "description": "",
                  "pricing": "",
                  "whyThisProductIsDifferent": ""
                }
              ],
              "indirectCompetitors": [
                {
                  "name": "",
                  "description": "",
                  "pricing": "",
                  "whyThisProductCanStealMarketShare": ""
                }
              ]
            }
          }

          Here is the product idea:

          Product: ${title}  
          Tagline: ${tagline}  
          Monthly Recurring Revenue: ${mrr}`,
        },
      ],
    })

    const rawContent = response.choices[0].message.content
    console.log('Raw GPT Content:', rawContent)

    let parsedAngle
    try {
      parsedAngle = JSON.parse(rawContent || '{}')
    } catch (err) {
      console.error('Failed to parse angle JSON:', err)
      return NextResponse.json({ error: 'Invalid JSON format from OpenAI' }, { status: 502 })
    }

    return NextResponse.json({ angle: parsedAngle })
  } catch (error) {
    console.error('Error generating angle:', error)
    return NextResponse.json({ error: 'Failed to generate angle' }, { status: 500 })
  }
}
