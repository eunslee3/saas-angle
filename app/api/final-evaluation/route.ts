import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { Anthropic } from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function POST(req: NextRequest) {
  try {
    const { idea, claudeEvaluation, redditSummary, trendSummary } = await req.json()

    if (!idea || !claudeEvaluation) {
      return NextResponse.json({ error: 'Missing required fields: idea and claudeEvaluation' }, { status: 400 })
    }

    const prompt = `
    You are an expert startup evaluator.

    Here is a startup idea:
    "${idea}"

    Strategic Evaluation from Claude:
    ${claudeEvaluation}

    User Pain Points (Reddit Summary):
    ${redditSummary}

    Give a final Beachhead Score from 0 to 100.
    Also explain your reasoning. Highlight which factors influenced the score most.

    Respond in strict JSON:
    {
      "scores": {
        "marketability": number (1–100),
        "monetization": number (1–100),
        "stickiness": number (1–100),
        "niche_strength": number (1–100),
        "retention": number (1–100)
      },
      "explanation": "paragraph"
    }
    `

    const completion = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 512,
      temperature: 0.5,
      messages: [
        { role: 'user', content: prompt }
      ]
    })

    console.log('response', completion)

    // Extract the text content from Claude's response
    const firstBlock = completion.content[0];
    const responseText = firstBlock && firstBlock.type === 'text' ? firstBlock.text : '';
    
    // Parse the JSON response from Claude
    // Parse the JSON response from Claude
    let claudeResponse
    try {
      // Remove markdown code block formatting if present
      let cleanedResponse = responseText.trim()
      
      // Check if response is wrapped in markdown code blocks
      if (cleanedResponse.startsWith('```json') && cleanedResponse.endsWith('```')) {
        // Extract content between ```json and ```
        cleanedResponse = cleanedResponse.slice(7, -3).trim()
      } else if (cleanedResponse.startsWith('```') && cleanedResponse.endsWith('```')) {
        // Extract content between ``` and ```
        cleanedResponse = cleanedResponse.slice(3, -3).trim()
      }
      
      claudeResponse = JSON.parse(cleanedResponse)
    } catch (parseError) {
      console.error('Failed to parse Claude response as JSON:', parseError)
      console.error('Raw response:', responseText)
      return NextResponse.json({ 
        error: 'Claude response not valid JSON', 
        raw: responseText 
      }, { status: 500 })
    }

    // Calculate overall score from individual scores
    const scores = claudeResponse.scores
    const overallScore = Math.round(
      (scores.marketability + scores.monetization + scores.stickiness + 
      scores.niche_strength + scores.retention) / 5
    )

    return NextResponse.json({
      finalScore: overallScore,
      scores: claudeResponse.scores,
      explanation: claudeResponse.explanation,
      rawClaudeResponse: responseText,
      idea
    })

  } catch (err) {
    console.error('Final score error:', err)
    return NextResponse.json({ error: 'Failed to generate final score' }, { status: 500 })
  }
}