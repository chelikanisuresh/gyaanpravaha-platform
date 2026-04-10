import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { submissionId, promptText, content, chapterTitle } = await req.json()

    if (!submissionId || !promptText || !content) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Call Claude API for evaluation
    const aiResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':         'application/json',
        'x-api-key':            process.env.ANTHROPIC_API_KEY!,
        'anthropic-version':    '2023-06-01',
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        max_tokens: 600,
        system: `You are an encouraging English teacher evaluating a Grade 6 student's writing response.
Evaluate the student's answer on exactly these 4 parameters, each out of 5:
1. Relevance — Does the answer actually address the prompt?
2. Understanding — Does the student show they understood the chapter?
3. Language — Is the writing clear, grammatical, and in their own words?
4. Effort — Is the response a genuine, thoughtful attempt?

Respond ONLY with a valid JSON object in this exact format, no preamble, no markdown:
{
  "relevance": <0-5>,
  "understanding": <0-5>,
  "language": <0-5>,
  "effort": <0-5>,
  "total": <sum of above>,
  "feedback": "<2 sentences of warm, encouraging feedback>",
  "improvement": "<1 specific thing the student can do better next time>"
}`,
        messages: [{
          role: 'user',
          content: `Chapter: ${chapterTitle}

Writing prompt: ${promptText}

Student's answer:
${content}

Evaluate this response.`,
        }],
      }),
    })

    const aiData  = await aiResponse.json()
    const rawText = aiData?.content?.[0]?.text || '{}'

    let scores = { relevance: 0, understanding: 0, language: 0, effort: 0, total: 0, feedback: '', improvement: '' }
    try {
      const clean = rawText.replace(/```json|```/g, '').trim()
      scores = JSON.parse(clean)
    } catch {
      // If parsing fails, give neutral scores
      scores = {
        relevance:    3, understanding: 3, language: 3, effort: 3, total: 12,
        feedback:     'Your answer shows a genuine attempt. Keep practising and your writing will improve.',
        improvement:  'Try to include more specific examples from the chapter next time.',
      }
    }

    // Update submission with AI evaluation
    const supabase = await createClient()
    await supabase
      .from('writing_submissions')
      .update({
        ai_score:       scores.total,
        ai_feedback:    scores.feedback,
        ai_improvement: scores.improvement,
        ai_breakdown:   JSON.stringify({ relevance: scores.relevance, understanding: scores.understanding, language: scores.language, effort: scores.effort }),
        status:         'submitted',
      })
      .eq('id', submissionId)

    return NextResponse.json({ success: true, scores })
  } catch (err) {
    console.error('Evaluate writing error:', err)
    return NextResponse.json({ error: 'Evaluation failed' }, { status: 500 })
  }
}
