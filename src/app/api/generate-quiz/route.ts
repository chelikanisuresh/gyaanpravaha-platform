// src/app/api/generate-quiz/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    // Auth check — must be a valid logged-in student
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

    // Check AI quiz is enabled for this student
    const { data: profile } = await supabase
      .from('profiles')
      .select('ai_quiz_enabled')
      .eq('id', user.id)
      .maybeSingle()

    if (!profile?.ai_quiz_enabled) {
      return NextResponse.json({ error: 'AI quiz not enabled' }, { status: 403 })
    }

    const { prompt } = await req.json()

    // Call Anthropic API directly — no SDK needed
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY ?? '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Anthropic API error' }, { status: 500 })
    }

    const data = await response.json()
    const raw = data.content?.[0]?.text ?? ''

    // Parse JSON safely
    const jsonMatch = raw.match(/\[[\s\S]*\]/)
    if (!jsonMatch) return NextResponse.json({ error: 'Invalid AI response' }, { status: 500 })

    const questions = JSON.parse(jsonMatch[0])
    return NextResponse.json({ questions })

  } catch (err) {
    console.error('Quiz generation error:', err)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
