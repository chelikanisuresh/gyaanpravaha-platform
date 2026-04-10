'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

const CHAPTERS = [
  { id: 1, title: 'Whistles and Shaving Bristles', type: 'Prose',     emoji: '📖' },
  { id: 2, title: 'If I Were Lord of Tartary',     type: 'Poetry',    emoji: '✨' },
  { id: 3, title: 'The Fun They Had',              type: 'Story',     emoji: '🤖' },
  { id: 4, title: 'In Morning Dew',                type: 'Poetry',    emoji: '🌿' },
  { id: 5, title: 'The Boy Who Outran the Wind',   type: 'Biography', emoji: '🏃' },
  { id: 6, title: 'The Blind Boy',                 type: 'Poetry',    emoji: '🌟' },
  { id: 7, title: 'Three Questions',               type: 'Story',     emoji: '🤔' },
  { id: 8, title: 'From a Railway Carriage',       type: 'Poetry',    emoji: '🚂' },
]

function getGreeting() {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
}

export default function StudentDashboard() {
  const router = useRouter()
  const [name,     setName]     = useState('there')
  const [progress, setProgress] = useState<{chapterId:number;sectionsCompleted:number;score:number|null}[]>([])
  const [streak,   setStreak]   = useState(0)
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data: p } = await supabase.from('profiles').select('full_name').eq('id', user.id).maybeSingle()
      if (p?.full_name) setName((p.full_name || 'there').split(' ')[0])

      const { data: sectionRows } = await supabase
        .from('student_lesson_progress')
        .select('chapter_id')
        .eq('student_id', user.id)

      const countMap: Record<number, number> = {}
      sectionRows?.forEach((r) => {
        countMap[r.chapter_id] = (countMap[r.chapter_id] || 0) + 1
      })

      const { data: quizRows } = await supabase
        .from('student_quiz_attempts')
        .select('chapter_id, score')
        .eq('student_id', user.id)
        .order('created_at', { ascending: false })

      const scoreMap: Record<number, number> = {}
      quizRows?.forEach((r) => {
        if (!(r.chapter_id in scoreMap)) scoreMap[r.chapter_id] = r.score
      })

      setProgress(CHAPTERS.map(c => ({
        chapterId:         c.id,
        sectionsCompleted: countMap[c.id] || 0,
        score:             scoreMap[c.id] ?? null,
      })))
      setStreak(3)
      setLoading(false)
    }
    load()
  }, [router])

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7280' }}>Loading...</p>
    </div>
  )

  const completedCount  = progress.filter(p => p.sectionsCompleted >= 7).length
  const currentChapter  = CHAPTERS.find(c => {
    const prog = progress.find(x => x.chapterId === c.id)
    return !prog || prog.sectionsCompleted < 7
  })

  return (
    <div style={{ minHeight: '100vh', background: '#F0FDF4' }}>
      <style>{`
        @keyframes gp-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        .gp-bounce { animation: gp-bounce 2.5s ease-in-out infinite; }
        .gp-card { transition: transform 0.2s, box-shadow 0.2s; }
        .gp-card:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(27,67,50,0.1); }
      `}</style>

      {/* Top bar */}
      <div style={{ background: '#1B4332', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '16px', color: 'white' }}>ज्ञानप्रवाह</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {streak > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(245,158,11,0.18)', borderRadius: '20px', padding: '5px 12px' }}>
              <span>🔥</span>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#FCD34D' }}>{streak} day streak</p>
            </div>
          )}
          <Link href="/student/profile" style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#74C69D', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: '#1B4332', margin: 0 }}>{name.charAt(0)}</p>
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '28px 20px 60px' }}>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: '#1B4332', marginBottom: '4px' }}>
          {getGreeting()}, {name}! 👋
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7280', marginBottom: '28px' }}>
          {completedCount === 0 ? 'Ready to start your first chapter?'
            : completedCount === 8 ? 'You have completed all 8 chapters!'
            : `${completedCount} of 8 chapters done. Keep it up!`}
        </p>

        {/* Big continue button */}
        {currentChapter && (
          <div className="gp-bounce" style={{ marginBottom: '36px' }}>
            <Link href={`/student/chapter/${currentChapter.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '20px', padding: '24px', display: 'flex', alignItems: 'center', gap: '18px', cursor: 'pointer' }}>
                <div style={{ fontSize: '36px', flexShrink: 0 }}>{currentChapter.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#74C69D', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '5px' }}>
                    {(progress.find(p => p.chapterId === currentChapter.id)?.sectionsCompleted || 0) > 0 ? 'Continue reading' : 'Start reading'}
                  </p>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '18px', color: 'white', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {currentChapter.title}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginTop: '4px' }}>
                    Chapter {currentChapter.id} · {currentChapter.type}
                  </p>
                </div>
                <div style={{ width: '44px', height: '44px', background: '#74C69D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M6 3l7 6-7 6" stroke="#1B4332" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Chapter list */}
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '12px' }}>
          All chapters
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {CHAPTERS.map(chapter => {
            const prog        = progress.find(p => p.chapterId === chapter.id)
            const secsDone    = prog?.sectionsCompleted || 0
            const isCompleted = secsDone >= 7
            const isStarted   = secsDone > 0 && !isCompleted
            const isCurrent   = chapter.id === currentChapter?.id
            const isLocked    = !isCurrent && !isStarted && !isCompleted && chapter.id > (currentChapter?.id || 1)

            return (
              <Link key={chapter.id} href={isLocked ? '#' : `/student/chapter/${chapter.id}`}
                style={{ textDecoration: 'none' }} onClick={e => isLocked && e.preventDefault()}>
                <div className={isLocked ? '' : 'gp-card'} style={{
                  background: isCompleted ? '#F0FDF4' : 'white', borderRadius: '14px',
                  border: isCurrent ? '2px solid #2D6A4F' : isCompleted ? '1px solid #D8F3DC' : '1px solid #E5E7EB',
                  padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '14px',
                  opacity: isLocked ? 0.4 : 1, cursor: isLocked ? 'default' : 'pointer',
                }}>
                  <div style={{ width: '42px', height: '42px', minWidth: '42px', borderRadius: '12px',
                    background: isCompleted ? '#2D6A4F' : isCurrent ? '#D8F3DC' : '#F3F4F6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: isCompleted ? '0' : '20px' }}>
                    {isCompleted
                      ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      : isLocked ? <span style={{ fontSize: '16px' }}>🔒</span>
                      : <span>{chapter.emoji}</span>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px',
                      color: isLocked ? '#9CA3AF' : '#1B4332',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '2px' }}>
                      {chapter.title}
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>
                      Chapter {chapter.id} · {chapter.type}
                    </p>
                    {isStarted && (
                      <div style={{ marginTop: '5px', height: '3px', background: '#E5E7EB', borderRadius: '2px', overflow: 'hidden', width: '100px' }}>
                        <div style={{ height: '100%', width: `${(secsDone / 7) * 100}%`, background: '#2D6A4F', borderRadius: '2px' }}/>
                      </div>
                    )}
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    {isCompleted && prog?.score != null
                      ? <span style={{ background: prog.score >= 80 ? '#D8F3DC' : prog.score >= 60 ? '#FEF3C7' : '#FEE2E2',
                          color: prog.score >= 80 ? '#1B4332' : prog.score >= 60 ? '#92400E' : '#991B1B',
                          fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px',
                          padding: '4px 10px', borderRadius: '20px' }}>{prog.score}%</span>
                      : isCompleted
                      ? <span style={{ background: '#D8F3DC', color: '#1B4332', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', padding: '4px 10px', borderRadius: '20px' }}>Done ✓</span>
                      : isStarted
                      ? <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#2D6A4F' }}>{secsDone}/7</span>
                      : null}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', textAlign: 'center', marginTop: '32px', lineHeight: 1.7 }}>
          More subjects coming soon 📚<br/>Complete each chapter to unlock the next one.
        </p>
      </div>
    </div>
  )
}
