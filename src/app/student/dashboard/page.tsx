'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import StudentSidebarLayout from '@/components/StudentSidebarLayout'
import StudentDashboardPanel from '@/components/StudentDashboardPanel'
import WordGames from '@/components/WordGames'

// ── Chapter data ─────────────────────────────────────────────────────────────

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

// ── Dashboard home ───────────────────────────────────────────────────────────

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

  const h = new Date().getHours()
  const greeting = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', color: '#1B4332', marginBottom: '4px' }}>
          {greeting}{name ? `, ${name}` : ''}! 👋
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>
          Here is how you are doing today.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,340px) minmax(0,1fr)', gap: '20px', alignItems: 'start' }}>

        {/* Left — gamification panel */}
        <StudentDashboardPanel studentId={studentId}/>

        {/* Right — guide cards + word games */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          <div style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '16px', padding: '22px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#74C69D', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>📚 Ready to study?</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '17px', color: 'white', marginBottom: '10px', lineHeight: 1.4 }}>
              Go to Subjects → English to start reading
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
              Your chapters, section progress and quiz are all waiting for you there.
            </p>
          </div>

          <div style={{ background: '#F0FDF4', borderRadius: '16px', border: '1px solid #D8F3DC', padding: '20px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#2D6A4F', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>How it works</p>
            {[
              { n:'1', t:'Click Subjects → English in the left menu' },
              { n:'2', t:'Read all 7 sections of a chapter' },
              { n:'3', t:'Take the quiz when all sections are done' },
              { n:'4', t:'Watch your mango tree grow! 🥭' },
            ].map(({ n, t }) => (
              <div key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
                <div style={{ width: '24px', height: '24px', minWidth: '24px', borderRadius: '50%', background: '#2D6A4F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: 'white' }}>{n}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', lineHeight: 1.6 }}>{t}</p>
              </div>
            ))}
          </div>

          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '18px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>💡 Study tip</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', lineHeight: 1.7 }}>
              Read at least one section every day. Even 10 minutes beats an hour of distracted studying.
            </p>
          </div>

          <WordGames/>

        </div>
      </div>
    </div>
  )
}

// ── English subject page ─────────────────────────────────────────────────────

function EnglishSubjectPage({ studentId }: { studentId: string }) {
  const [progress, setProgress] = useState<Record<number, number>>({})
  const [scores,   setScores]   = useState<Record<number, number>>({})

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: secs } = await supabase
        .from('student_lesson_progress').select('chapter_id').eq('student_id', studentId)
      const countMap: Record<number, number> = {}
      secs?.forEach((r: any) => { countMap[r.chapter_id] = (countMap[r.chapter_id] || 0) + 1 })
      setProgress(countMap)

      const { data: quiz } = await supabase
        .from('student_quiz_attempts').select('chapter_id, score')
        .eq('student_id', studentId).order('created_at', { ascending: false })
      const scoreMap: Record<number, number> = {}
      quiz?.forEach((r: any) => { if (!(r.chapter_id in scoreMap)) scoreMap[r.chapter_id] = r.score })
      setScores(scoreMap)
    }
    load()
  }, [studentId])

  const currentChapter  = CHAPTERS.find(c => (progress[c.id] || 0) < 7)
  const completedCount  = CHAPTERS.filter(c => (progress[c.id] || 0) >= 7).length

  return (
    <div style={{ maxWidth: '720px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', color: '#1B4332', marginBottom: '4px' }}>
          📖 English
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>
          Connexion — Class 6, Project 1 · {completedCount} of 8 chapters completed
        </p>
      </div>

      {currentChapter && (
        <div style={{ marginBottom: '28px' }}>
          <style>{`@keyframes gp-b{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}.gp-b{animation:gp-b 2.5s ease-in-out infinite}`}</style>
          <div className="gp-b">
            <Link href={`/student/chapter/${currentChapter.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '18px', padding: '22px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
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
              <div style={{ background: isCompleted ? '#F0FDF4' : 'white', borderRadius: '14px',
                border: isCurrent ? '2px solid #2D6A4F' : isCompleted ? '1px solid #D8F3DC' : '1px solid #E5E7EB',
                padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '14px',
                opacity: isLocked ? 0.4 : 1, cursor: isLocked ? 'default' : 'pointer',
                transition: 'transform 0.15s, box-shadow 0.15s' }}
                onMouseEnter={e => { if (!isLocked) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(27,67,50,0.08)' }}}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ width: '42px', height: '42px', minWidth: '42px', borderRadius: '12px',
                  background: isCompleted ? '#2D6A4F' : isCurrent ? '#D8F3DC' : '#F3F4F6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isCompleted ? '0' : '20px' }}>
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

// ── Profile page (inline — no separate SidebarLayout) ────────────────────────

function StudentProfileContent({ studentId }: { studentId: string }) {
  const [profile, setProfile] = useState<{ full_name: string; email: string } | null>(null)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data } = await supabase.from('profiles').select('full_name, email').eq('id', studentId).single()
      setProfile(data)
    }
    load()
  }, [studentId])

  return (
    <div style={{ maxWidth: '560px' }}>
      {/* Profile header */}
      <div style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '20px', padding: '32px', textAlign: 'center', marginBottom: '16px' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#74C69D', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: '#1B4332' }}>
          {profile?.full_name?.[0] || 'S'}
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '22px', color: 'white', marginBottom: '4px' }}>
          {profile?.full_name || 'Student'}
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
          {profile?.email}
        </p>
      </div>

      {/* Account details */}
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden', marginBottom: '14px' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #F3F4F6' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Account details</p>
        </div>
        {[
          { label: 'Full name',    value: profile?.full_name || '—', icon: '👤' },
          { label: 'Login email',  value: profile?.email     || '—', icon: '📧' },
          { label: 'Account type', value: 'Student',                  icon: '🎓' },
          { label: 'School',       value: 'Singhania School, Thane',  icon: '🏫' },
          { label: 'Grade',        value: 'Grade 6',                  icon: '📚' },
        ].map(({ label, value, icon }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 20px', borderBottom: '1px solid #F9FAFB' }}>
            <span style={{ fontSize: '18px', flexShrink: 0 }}>{icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '14px', color: '#1B4332' }}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Password note */}
      <div style={{ background: '#FEF3C7', borderRadius: '16px', border: '1px solid #FDE68A', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <span style={{ fontSize: '20px', flexShrink: 0 }}>🔑</span>
        <div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#92400E', marginBottom: '4px' }}>Password is managed by your parent</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#B45309', lineHeight: 1.6 }}>
            If you need to change your password, ask your parent to update it from their account.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Coming soon ──────────────────────────────────────────────────────────────

function ComingSoon({ subject }: { subject: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
      <div style={{ fontSize: '52px', marginBottom: '16px' }}>🚀</div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '22px', color: '#1B4332', marginBottom: '8px' }}>
        {subject} is coming soon!
      </h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7280', maxWidth: '320px', lineHeight: 1.7 }}>
        We are building this subject for you. Complete English first and it will be ready!
      </p>
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────────────────────

export default function StudentMainPage() {
  return (
    <StudentSidebarLayout>
      {(activeSection, studentId) => {
        switch (activeSection) {
          case 'dashboard': return <DashboardHome           studentId={studentId}/>
          case 'english':   return <EnglishSubjectPage      studentId={studentId}/>
          case 'maths':     return <ComingSoon subject="Mathematics"/>
          case 'science':   return <ComingSoon subject="Science"/>
          case 'history':   return <ComingSoon subject="History & Civics"/>
          case 'geo':       return <ComingSoon subject="Geography"/>
          case 'sanskrit':  return <ComingSoon subject="Sanskrit"/>
          case 'ict':       return <ComingSoon subject="ICT"/>
          case 'profile':   return <StudentProfileContent   studentId={studentId}/>
          default:          return <DashboardHome           studentId={studentId}/>
        }
      }}
    </StudentSidebarLayout>
  )
}
