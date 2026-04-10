'use client'

import StudentSidebarLayout from '@/components/StudentSidebarLayout'
import StudentDashboardPanel from '@/components/StudentDashboardPanel'
import StudentProfile from '@/app/student/profile/page'

// ── Chapter list (English subject) ─────────────────────────────────────────

import { useState, useEffect } from 'react'
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

function EnglishSubjectPage({ studentId }: { studentId: string }) {
  const [progress, setProgress] = useState<Record<number, number>>({})
  const [scores,   setScores]   = useState<Record<number, number>>({})

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: secs } = await supabase
        .from('student_lesson_progress')
        .select('chapter_id')
        .eq('student_id', studentId)

      const countMap: Record<number, number> = {}
      secs?.forEach((r: any) => { countMap[r.chapter_id] = (countMap[r.chapter_id] || 0) + 1 })
      setProgress(countMap)

      const { data: quiz } = await supabase
        .from('student_quiz_attempts')
        .select('chapter_id, score')
        .eq('student_id', studentId)
        .order('created_at', { ascending: false })

      const scoreMap: Record<number, number> = {}
      quiz?.forEach((r: any) => { if (!(r.chapter_id in scoreMap)) scoreMap[r.chapter_id] = r.score })
      setScores(scoreMap)
    }
    load()
  }, [studentId])

  const currentChapter = CHAPTERS.find(c => (progress[c.id] || 0) < 7)
  const completedCount = CHAPTERS.filter(c => (progress[c.id] || 0) >= 7).length

  return (
    <div style={{ maxWidth: '720px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', color: '#1B4332', marginBottom: '4px' }}>
          📖 English
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>
          Connexion — Class 6, Project 1 · {completedCount} of 8 chapters completed
        </p>
      </div>

      {/* Continue card */}
      {currentChapter && (
        <div style={{ marginBottom: '28px' }}>
          <style>{`@keyframes gp-b{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}.gp-b{animation:gp-b 2.5s ease-in-out infinite}`}</style>
          <div className="gp-b">
            <Link href={`/student/chapter/${currentChapter.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '18px', padding: '22px 24px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
                <div style={{ fontSize: '36px', flexShrink: 0 }}>{currentChapter.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#74C69D', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '5px' }}>
                    {(progress[currentChapter.id] || 0) > 0 ? '📖 Continue reading' : '▶️ Start reading'}
                  </p>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '18px', color: 'white', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {currentChapter.title}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginTop: '4px' }}>
                    Chapter {currentChapter.id} · {currentChapter.type}
                  </p>
                  {(progress[currentChapter.id] || 0) > 0 && (
                    <div style={{ marginTop: '10px', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', width: '160px' }}>
                      <div style={{ height: '100%', width: `${((progress[currentChapter.id] || 0) / 7) * 100}%`, background: '#74C69D', borderRadius: '2px' }}/>
                    </div>
                  )}
                </div>
                <div style={{ width: '44px', height: '44px', background: '#74C69D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M6 3l7 6-7 6" stroke="#1B4332" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Chapter list */}
      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>
        All chapters
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {CHAPTERS.map(chapter => {
          const secsDone    = progress[chapter.id] || 0
          const isCompleted = secsDone >= 7
          const isStarted   = secsDone > 0 && !isCompleted
          const isCurrent   = chapter.id === currentChapter?.id
          const isLocked    = !isCurrent && !isStarted && !isCompleted && chapter.id > (currentChapter?.id || 1)

          return (
            <Link key={chapter.id} href={isLocked ? '#' : `/student/chapter/${chapter.id}`}
              style={{ textDecoration: 'none' }} onClick={e => isLocked && e.preventDefault()}>
              <div style={{
                background: isCompleted ? '#F0FDF4' : 'white', borderRadius: '14px',
                border: isCurrent ? '2px solid #2D6A4F' : isCompleted ? '1px solid #D8F3DC' : '1px solid #E5E7EB',
                padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '14px',
                opacity: isLocked ? 0.4 : 1, cursor: isLocked ? 'default' : 'pointer',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
                onMouseEnter={e => { if (!isLocked) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(27,67,50,0.08)' }}}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ width: '42px', height: '42px', minWidth: '42px', borderRadius: '12px', background: isCompleted ? '#2D6A4F' : isCurrent ? '#D8F3DC' : '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isCompleted ? '0' : '20px' }}>
                  {isCompleted
                    ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : isLocked ? <span style={{ fontSize: '16px' }}>🔒</span>
                    : <span>{chapter.emoji}</span>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: isLocked ? '#9CA3AF' : '#1B4332', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '2px' }}>
                    {chapter.title}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>
                    Chapter {chapter.id} · {chapter.type}
                  </p>
                  {isStarted && (
                    <div style={{ marginTop: '5px', height: '3px', background: '#E5E7EB', borderRadius: '2px', width: '100px' }}>
                      <div style={{ height: '100%', width: `${(secsDone / 7) * 100}%`, background: '#2D6A4F', borderRadius: '2px' }}/>
                    </div>
                  )}
                </div>
                <div style={{ flexShrink: 0 }}>
                  {isCompleted && scores[chapter.id] != null
                    ? <span style={{ background: scores[chapter.id] >= 80 ? '#D8F3DC' : scores[chapter.id] >= 60 ? '#FEF3C7' : '#FEE2E2', color: scores[chapter.id] >= 80 ? '#1B4332' : scores[chapter.id] >= 60 ? '#92400E' : '#991B1B', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', padding: '4px 10px', borderRadius: '20px' }}>{scores[chapter.id]}%</span>
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
    </div>
  )
}

// ── Coming soon panel ────────────────────────────────────────────────────────

function ComingSoon({ subject }: { subject: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '22px', color: '#1B4332', marginBottom: '8px' }}>
        {subject} is coming soon!
      </h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7280', maxWidth: '340px', lineHeight: 1.7 }}>
        We are building this subject for you. Complete English first and this will be ready before you know it!
      </p>
    </div>
  )
}

// ── Dashboard panel wrapper ──────────────────────────────────────────────────

function DashboardHome({ studentId }: { studentId: string }) {
  const [name, setName] = useState('')

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: p } = await supabase.from('profiles').select('full_name').eq('id', studentId).maybeSingle()
      if (p?.full_name) setName(p.full_name.split(' ')[0])
    }
    load()
  }, [studentId])

  function getGreeting() {
    const h = new Date().getHours()
    return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
  }

  return (
    <div style={{ maxWidth: '480px' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: '#1B4332', marginBottom: '4px' }}>
        {getGreeting()}{name ? `, ${name}` : ''}! 👋
      </h1>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280', marginBottom: '28px' }}>
        Here is how you are doing today.
      </p>
      <StudentDashboardPanel studentId={studentId}/>
    </div>
  )
}

// ── Profile placeholder ──────────────────────────────────────────────────────

function ProfilePage({ studentId }: { studentId: string }) {
  return (
    <div style={{ maxWidth: '480px' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', color: '#1B4332', marginBottom: '20px' }}>
        👤 Your profile
      </h1>
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>
          Profile settings coming soon.
        </p>
      </div>
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────────────────────

export default function StudentMainPage() {
  return (
    <StudentSidebarLayout>
      {(activeSection, studentId) => {
        switch (activeSection) {
          case 'dashboard': return <DashboardHome studentId={studentId}/>
          case 'english':   return <EnglishSubjectPage studentId={studentId}/>
          case 'maths':     return <ComingSoon subject="Mathematics"/>
          case 'science':   return <ComingSoon subject="Science"/>
          case 'history':   return <ComingSoon subject="History & Civics"/>
          case 'geo':       return <ComingSoon subject="Geography"/>
          case 'sanskrit':  return <ComingSoon subject="Sanskrit"/>
          case 'ict':       return <ComingSoon subject="ICT"/>
          case 'profile':   return <ProfilePage studentId={studentId}/>
          default:          return <DashboardHome studentId={studentId}/>
        }
      }}
    </StudentSidebarLayout>
  )
}
