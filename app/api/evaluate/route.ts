// app/api/evaluate/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { v4 as uuid } from 'uuid'
import { Anthropic } from '@anthropic-ai/sdk'
import { supabase } from '@/lib/supabaseClient'

// Setup Claude
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

// Input validation
const schema = z.object({
  idea: z.string().min(5),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parse = schema.safeParse(body)
  if (!parse.success) {
    return NextResponse.json({ error: 'Input is too short', status: 400 }, { status: 400 })
  }

  const { idea } = parse.data

  // Step 1: Generate prompt for Claude
  const prompt = `
  You are an experienced startup evaluator. Score the following SaaS idea using this 1–5 rubric:

  Traits:
  1. Marketability – how easy is it to get users excited about this idea?
  2. Monetization Potential – how likely is this idea to make money?
  3. Stickiness – how likely are users to keep coming back?
  4. Niche Strength – how targeted and defensible is this niche?
  5. Retention/NPS Proxy – how likely are users to recommend this?

  Respond in strict JSON:
  {
    scores: {
      "marketability": number (1–100),
      "monetization": number (1–100),
      "stickiness": number (1–100),
      "niche_strength": number (1–100),
      "retention": number (1–100),
    },
    explanation: short paragraph
  }

  Business idea: "${idea}"
  `

  console.log('calling claude')
  // Step 2: Call Claude
  // Using 3.5 Haiku for development purposes
  const completion = await anthropic.messages.create({
    model: 'claude-3-5-haiku-20241022',
    max_tokens: 512,
    temperature: 0.5,
    messages: [
      { role: 'user', content: prompt }
    ]
  })

  // TODO: Use Sonnet 4 for better results
  // const completion = await anthropic.messages.create({
  //   model: 'claude-sonnet-4-20250514',
  //   max_tokens: 512,
  //   temperature: 0.5,
  //   messages: [
  //     { role: 'user', content: prompt }
  //   ]
  // })

  console.log('claude response', completion)

  const firstBlock = completion.content[0];
  const message = firstBlock && firstBlock.type === 'text' ? firstBlock.text : undefined;

  if (!message) {
    return NextResponse.json({ error: 'Claude response missing' }, { status: 500 })
  }

  let parsed
  try {
    parsed = JSON.parse(message)
  } catch {
    return NextResponse.json({ error: 'Failed to parse Claude JSON' }, { status: 500 })
  }

  // Step 3: Save to Supabase
  const { data, error } = await supabase
    .from('evaluations')
    .insert([{
      id: uuid(),
      idea,
      score: parsed,
      status: 'pending',
      created_at: new Date().toISOString(),
    }])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ evaluation: data, status: 200 })
}
