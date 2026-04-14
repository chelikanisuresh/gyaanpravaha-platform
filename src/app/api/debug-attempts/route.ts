// src/app/api/debug-attempts/route.ts
// TEMPORARY — remove after debugging
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { data: attempts } = await supabase
    .from('student_quiz_attempts')
    .select('subject, chapter_id, score, answers, created_at')
    .eq('student_id', user.id)
    .order('created_at', { ascending: false })

  const { data: journal } = await supabase
    .from('mistake_journal')
    .select('subject, chapter_id, question_id, resolved')
    .eq('student_id', user.id)

  // Parse and summarise answers
  const summary = (attempts ?? []).map(a => {
    let parsed: any[] = []
    try {
      parsed = typeof a.answers === 'string' ? JSON.parse(a.answers) : (a.answers ?? [])
    } catch {}
    const wrong = parsed.filter(q => q.correct === false)
    return {
      subject: a.subject,
      chapter_id: a.chapter_id,
      score: a.score,
      total_answers: parsed.length,
      wrong_count: wrong.length,
      wrong_ids: wrong.map(q => q.questionId),
      answers_type: typeof a.answers,
      sample_answer: parsed[0],
    }
  })

  return NextResponse.json({ attempts: summary, journal })
}
