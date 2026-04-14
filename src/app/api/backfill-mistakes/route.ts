// src/app/api/backfill-mistakes/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ALL_QUIZZES } from '@/lib/quiz-content'
import { ALL_MTH_QUIZZES } from '@/lib/mth-quiz-content'
import { ALL_SCI_QUIZZES } from '@/lib/sci-quiz-content'
import { ALL_HC_QUIZZES } from '@/lib/hc-quiz-content'
import { ALL_GEO_QUIZZES } from '@/lib/geo-quiz-content'
import { ALL_SKT_QUIZZES } from '@/lib/skt-quiz-content'
import { ALL_ICT_QUIZZES } from '@/lib/ict-quiz-content'
import { getRapidQuiz } from '@/lib/rapid-quiz-content'

const QUIZ_MAP: Record<string, any[]> = {
  english:  ALL_QUIZZES,
  maths:    ALL_MTH_QUIZZES,
  science:  ALL_SCI_QUIZZES,
  history:  ALL_HC_QUIZZES,
  geo:      ALL_GEO_QUIZZES,
  sanskrit: ALL_SKT_QUIZZES,
  ict:      ALL_ICT_QUIZZES,
  rapid:    Array.from({ length: 19 }, (_, i) => getRapidQuiz(i + 1)).filter(Boolean) as any[],
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

    const studentId = user.id

    // Get all past attempts with saved answers
    const { data: attempts } = await supabase
      .from('student_quiz_attempts')
      .select('subject, chapter_id, answers')
      .eq('student_id', studentId)
      .not('answers', 'is', null)

    if (!attempts?.length) return NextResponse.json({ inserted: 0 })

    // Get already-journaled entries
    const { data: existing } = await supabase
      .from('mistake_journal')
      .select('subject, chapter_id, question_id')
      .eq('student_id', studentId)

    const existingKeys = new Set(
      (existing ?? []).map((e: any) => `${e.subject}-${e.chapter_id}-${e.question_id}`)
    )

    const toInsert: any[] = []

    for (const attempt of attempts) {
      let parsedAnswers: any[] = []
      try {
        parsedAnswers = typeof attempt.answers === 'string'
          ? JSON.parse(attempt.answers)
          : attempt.answers
      } catch { continue }

      const wrongAnswers = parsedAnswers.filter((a: any) => a.correct === false)
      if (!wrongAnswers.length) continue

      const quizList = QUIZ_MAP[attempt.subject]
      if (!quizList) continue

      const chapterQuiz = quizList.find((q: any) => q.chapterId === attempt.chapter_id)
      if (!chapterQuiz) continue

      for (const wa of wrongAnswers) {
        const key = `${attempt.subject}-${attempt.chapter_id}-${wa.questionId}`
        if (existingKeys.has(key)) continue

        const q = chapterQuiz.questions.find((q: any) => q.id === wa.questionId)
        if (!q) continue

        existingKeys.add(key)
        toInsert.push({
          student_id:     studentId,
          subject:        attempt.subject,
          chapter_id:     attempt.chapter_id,
          question_id:    q.id,
          question_text:  q.question,
          question_type:  q.type,
          wrong_answer:   wa.given,
          correct_answer: q.answer,
          reexplanation:  q.reexplanation ?? '',
          section_id:     q.sectionId ?? 4,
          options:        q.options ? JSON.stringify(q.options) : null,
          resolved:       false,
        })
      }
    }

    if (toInsert.length > 0) {
      const { error: upsertErr } = await supabase.from('mistake_journal')
        .upsert(toInsert, { onConflict: 'student_id,subject,chapter_id,question_id', ignoreDuplicates: true })
      if (upsertErr) {
        console.error('Mistake journal upsert error:', upsertErr)
        return NextResponse.json({ error: upsertErr.message, toInsert: toInsert.length }, { status: 500 })
      }
    }

    return NextResponse.json({ inserted: toInsert.length, found: attempts?.length ?? 0 })
  } catch (err) {
    console.error('Backfill error:', err)
    return NextResponse.json({ error: 'Backfill failed' }, { status: 500 })
  }
}
