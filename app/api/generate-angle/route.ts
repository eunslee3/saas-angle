import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
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
          - A differentiated solution with clear **workflow integration** or UX edge
          - Competitor insights that identify **unfair advantages**, not just pricing

          Avoid boilerplate or shallow generalizations. Be blunt, specific, and original. This is for a real founder who will act on your input.

          Respond in the following **JSON structure**, filling in each field based on critical thinking:

          {
            "microNiche": "",
            "reframedProblem": "",
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
