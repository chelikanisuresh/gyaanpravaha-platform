// src/app/api/backfill-mistakes/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

    const studentId = user.id

    // Get all past attempts with saved answers
    const { data: attempts, error: attemptsErr } = await supabase
      .from('student_quiz_attempts')
      .select('subject, chapter_id, answers')
      .eq('student_id', studentId)
      .not('answers', 'is', null)

    if (attemptsErr) return NextResponse.json({ error: attemptsErr.message }, { status: 500 })
    if (!attempts?.length) return NextResponse.json({ inserted: 0, reason: 'no attempts' })

    // Get already-journaled entries to avoid duplicates
    const { data: existing } = await supabase
      .from('mistake_journal')
      .select('subject, chapter_id, question_id')
      .eq('student_id', studentId)

    const existingKeys = new Set(
      (existing ?? []).map((e: any) => `${e.subject}-${e.chapter_id}-${e.question_id}`)
    )

    const toInsert: any[] = []

    for (const attempt of attempts) {
      // Parse answers JSON
      let parsedAnswers: any[] = []
      try {
        parsedAnswers = typeof attempt.answers === 'string'
          ? JSON.parse(attempt.answers)
          : (attempt.answers ?? [])
      } catch { continue }

      const wrongAnswers = parsedAnswers.filter((a: any) => a.correct === false)
      if (!wrongAnswers.length) continue

      // Load quiz content for this subject dynamically
      let chapterQuiz: any = null
      try {
        if (attempt.subject === 'english') {
          const { getQuiz } = await import('@/lib/quiz-content')
          chapterQuiz = getQuiz(attempt.chapter_id)
        } else if (attempt.subject === 'maths') {
          const { getMthQuiz } = await import('@/lib/mth-quiz-content')
          chapterQuiz = getMthQuiz(attempt.chapter_id)
        } else if (attempt.subject === 'science') {
          const { getSciQuiz } = await import('@/lib/sci-quiz-content')
          chapterQuiz = getSciQuiz(attempt.chapter_id)
        } else if (attempt.subject === 'history') {
          const { getHCQuiz } = await import('@/lib/hc-quiz-content')
          chapterQuiz = getHCQuiz(attempt.chapter_id)
        } else if (attempt.subject === 'geo') {
          const { getGeoQuiz } = await import('@/lib/geo-quiz-content')
          chapterQuiz = getGeoQuiz(attempt.chapter_id)
        } else if (attempt.subject === 'sanskrit') {
          const { getSktQuiz } = await import('@/lib/skt-quiz-content')
          chapterQuiz = getSktQuiz(attempt.chapter_id)
        } else if (attempt.subject === 'ict') {
          const { getICTQuiz } = await import('@/lib/ict-quiz-content')
          chapterQuiz = getICTQuiz(attempt.chapter_id)
        } else if (attempt.subject === 'rapid') {
          const { getRapidQuiz } = await import('@/lib/rapid-quiz-content')
          chapterQuiz = getRapidQuiz(attempt.chapter_id)
        }
      } catch (e) {
        console.error('Failed to load quiz for', attempt.subject, e)
        continue
      }

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
      const { error: upsertErr } = await supabase
        .from('mistake_journal')
        .upsert(toInsert, { onConflict: 'student_id,subject,chapter_id,question_id', ignoreDuplicates: true })
      if (upsertErr) {
        console.error('Upsert error:', upsertErr)
        return NextResponse.json({ error: upsertErr.message }, { status: 500 })
      }
    }

    return NextResponse.json({ 
      inserted: toInsert.length,
      attempts_found: attempts.length,
      wrong_total: attempts.reduce((s, a) => {
        try {
          const p = typeof a.answers === 'string' ? JSON.parse(a.answers) : a.answers
          return s + p.filter((x: any) => x.correct === false).length
        } catch { return s }
      }, 0)
    })

  } catch (err: any) {
    console.error('Backfill route error:', err)
    return NextResponse.json({ error: err?.message ?? 'Unknown error' }, { status: 500 })
  }
}
