'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { RAPID_CHAPTERS } from '@/lib/rapid-chapter-content'

const THEME = {
  primary:  '#7C3AED',
  mid:      '#6D28D9',
  accent:   '#DDD6FE',
  heroBg:   '#F5F3FF',
  dark:     '#4C1D95',
}

export default function RapidReaderSubjectPage() {
  const router  = useRouter()
  const [completedChapters, setCompletedChapters] = useState<Set<number>>(new Set())
  const [quizScores, setQuizScores]               = useState<Record<number, number>>({})
  const [loading, setLoading]                     = useState(true)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const [{ data: sections }, { data: quizzes }] = await Promise.all([
        supabase.from('student_lesson_progress').select('chapter_id, section_id').eq('student_id', user.id).eq('subject', 'rapid-reader'),
        supabase.from('student_quiz_attempts').select('chapter_id, score').eq('student_id', user.id).eq('subject', 'rapid-reader').order('created_at', { ascending: false }),
      ])

      const secMap: Record<number, Set<number>> = {}
      sections?.forEach((s: any) => {
        if (!secMap[s.chapter_id]) secMap[s.chapter_id] = new Set()
        secMap[s.chapter_id].add(s.section_id)
      })
      const done = new Set(Object.entries(secMap).filter(([, secs]) => secs.size >= 7).map(([id]) => Number(id)))
      setCompletedChapters(done)

      const scores: Record<number, number> = {}
      quizzes?.forEach((q: any) => { if (!(q.chapter_id in scores)) scores[q.chapter_id] = q.score })
      setQuizScores(scores)
      setLoading(false)
    }
    load()
  }, [router])

  const totalChapters = RAPID_CHAPTERS.length
  const completedCount = completedChapters.size
  const pct = Math.round((completedCount / totalChapters) * 100)

  return (
    <div style={{ minHeight: '100vh', background: THEME.heroBg }}>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${THEME.dark}, ${THEME.primary})`, padding: '40px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ width: '56px', height: '56px', background: 'rgba(255,255,255,0.15)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📗</div>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: THEME.accent, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Rapid Reader</p>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: 'white', lineHeight: 1.2 }}>Swami and Friends</h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>R.K. Narayan · 19 Chapters</p>
            </div>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: '560px', marginBottom: '20px' }}>
            Follow Swaminathan — a mischievous, warm-hearted 10-year-old — through his adventures and misadventures in the fictional South Indian town of Malgudi. A timeless story of friendship, school days, and growing up.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ flex: 1, maxWidth: '300px', height: '8px', background: 'rgba(255,255,255,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: THEME.accent, borderRadius: '4px', transition: 'width 0.8s' }}/>
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white' }}>{completedCount}/{totalChapters} chapters</span>
          </div>
        </div>
      </div>

      {/* Chapters grid */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '32px 24px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
          {RAPID_CHAPTERS.map((chapter) => {
            const done  = completedChapters.has(chapter.id)
            const score = quizScores[chapter.id]
            const scoreColor = score >= 80 ? '#059669' : score >= 60 ? '#D97706' : '#DC2626'
            return (
              <div key={chapter.id}
                onClick={() => router.push(`/student/rapid-chapter/${chapter.id}`)}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${THEME.primary}25` }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                style={{ background: 'white', borderRadius: '16px', padding: '20px', border: `1.5px solid ${done ? THEME.accent : '#F1F5F9'}`, cursor: 'pointer', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '10px', background: done ? THEME.accent : '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '13px', color: done ? THEME.dark : '#94A3B8' }}>
                    {done ? '✓' : chapter.id}
                  </div>
                  {score != null && (
                    <span style={{ background: score >= 80 ? '#D1FAE5' : score >= 60 ? '#FEF3C7' : '#FEE2E2', color: scoreColor, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', padding: '3px 10px', borderRadius: '20px' }}>
                      ⭐ {score}%
                    </span>
                  )}
                </div>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1F2937', marginBottom: '4px', lineHeight: 1.4 }}>{chapter.title}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8' }}>Chapter {chapter.id} · 7 sections</p>
                {done && !score && (
                  <div style={{ marginTop: '10px' }}>
                    <button
                      onClick={e => { e.stopPropagation(); router.push(`/student/rapid-quiz/${chapter.id}`) }}
                      style={{ padding: '6px 14px', borderRadius: '8px', border: `1px solid ${THEME.accent}`, background: THEME.heroBg, color: THEME.primary, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>
                      Take quiz →
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
