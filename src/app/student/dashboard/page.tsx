'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import StudentSidebarLayout from '@/components/StudentSidebarLayout'
import StudentDashboardPanel from '@/components/StudentDashboardPanel'
import WordGames, { WordSearch, MeaningMatch } from '@/components/WordGames'

// ── Chapter data ─────────────────────────────────────────────────────────────

const CHAPTERS = [
  { id: 1, title: 'Whistles and Shaving Bristles', type: 'Prose',     emoji: '📖', estimatedReadMins: 15 },
  { id: 2, title: 'If I Were Lord of Tartary',     type: 'Poetry',    emoji: '✨', estimatedReadMins: 12 },
  { id: 3, title: 'The Fun They Had',              type: 'Story',     emoji: '🤖', estimatedReadMins: 16 },
  { id: 4, title: 'In Morning Dew',                type: 'Poetry',    emoji: '🌿', estimatedReadMins: 11 },
  { id: 5, title: 'The Boy Who Outran the Wind',   type: 'Biography', emoji: '🏃', estimatedReadMins: 18 },
  { id: 6, title: 'The Blind Boy',                 type: 'Poetry',    emoji: '🌟', estimatedReadMins: 12 },
  { id: 7, title: 'Three Questions',               type: 'Story',     emoji: '🤔', estimatedReadMins: 20 },
  { id: 8, title: 'From a Railway Carriage',       type: 'Poetry',    emoji: '🚂', estimatedReadMins: 10 },
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
          <WordSearch/>
          <MeaningMatch/>

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
  const overallProgress = Math.round((completedCount / 8) * 100)

  const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
    'Prose':                  { bg: '#D8F3DC', text: '#1B4332' },
    'Poetry':                 { bg: '#FEF3C7', text: '#92400E' },
    'Short story':            { bg: '#EDE9FE', text: '#5B21B6' },
    'Biographical narrative': { bg: '#FFE4E6', text: '#9F1239' },
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Page header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: '#1B4332', marginBottom: '4px' }}>
          📖 English
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>
          Connexion — Class 6, Project 1 · {completedCount} of 8 chapters completed
        </p>
      </div>

      {/* Stats + progress bar */}
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px 24px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>
            Stories, poems, and biographical narratives from Connexion Class 6
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ background: '#D8F3DC', borderRadius: '10px', padding: '10px 16px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: '#1B4332', lineHeight: 1 }}>{completedCount}/8</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#40916C', marginTop: '2px' }}>Chapters</p>
            </div>
            {Object.keys(scores).length > 0 && (
              <div style={{ background: '#FEF3C7', borderRadius: '10px', padding: '10px 16px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: '#92400E', lineHeight: 1 }}>
                  {Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length)}%
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#B45309', marginTop: '2px' }}>Avg score</p>
              </div>
            )}
          </div>
        </div>
        <div style={{ height: '8px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${overallProgress}%`, background: 'linear-gradient(90deg,#2D6A4F,#52B788)', borderRadius: '4px', transition: 'width 0.8s ease' }}/>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginTop: '6px' }}>
          {overallProgress}% complete — keep going!
        </p>
      </div>

      {/* Continue card */}
      {currentChapter && (
        <div style={{ marginBottom: '20px' }}>
          <style>{`@keyframes gp-b{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}.gp-b{animation:gp-b 2.5s ease-in-out infinite}`}</style>
          <div className="gp-b">
            <Link href={`/student/chapter/${currentChapter.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '18px', padding: '22px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#74C69D', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '5px' }}>
                    {(progress[currentChapter.id] || 0) > 0 ? '📖 Continue reading' : '▶️ Start reading'}
                  </p>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color: 'white', lineHeight: 1.3, marginBottom: '4px' }}>
                    {currentChapter.title}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>
                    Chapter {currentChapter.id} · {currentChapter.type} · {currentChapter.estimatedReadMins} min read
                  </p>
                  {(progress[currentChapter.id] || 0) > 0 && (
                    <div style={{ marginTop: '10px', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', width: '180px' }}>
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

      {/* All chapters */}
      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>
        All chapters
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {CHAPTERS.map(chapter => {
          const secsDone    = progress[chapter.id] || 0
          const isCompleted = secsDone >= 7
          const isStarted   = secsDone > 0 && !isCompleted
          const isCurrent   = chapter.id === currentChapter?.id
          const isLocked    = !isCurrent && !isStarted && !isCompleted && chapter.id > (currentChapter?.id || 1)
          const typeStyle   = TYPE_COLORS[chapter.type] || { bg: '#F3F4F6', text: '#374151' }
          const score       = scores[chapter.id]

          const ctaLabel = isCompleted ? 'Review' : isStarted ? 'Resume' : isCurrent ? 'Start' : '—'

          return (
            <div
              key={chapter.id}
              style={{
                background: isCompleted ? '#F0FDF4' : 'white',
                borderRadius: '16px',
                border: isCurrent ? '2px solid #2D6A4F' : isCompleted ? '1px solid #D8F3DC' : '1px solid #E5E7EB',
                padding: '16px 20px',
                display: 'flex', alignItems: 'center', gap: '14px',
                opacity: isLocked ? 0.45 : 1,
                position: 'relative', overflow: 'hidden',
                transition: 'box-shadow 0.15s',
              }}
              onMouseEnter={e => { if (!isLocked) e.currentTarget.style.boxShadow = '0 4px 14px rgba(27,67,50,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
            >
              {/* Left colour bar */}
              {(isCompleted || isCurrent) && (
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: isCompleted ? '#10B981' : '#2D6A4F', borderRadius: '16px 0 0 16px' }}/>
              )}

              {/* Number / check */}
              <div style={{ width: '40px', height: '40px', minWidth: '40px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isCompleted ? '#D8F3DC' : isCurrent ? '#2D6A4F' : '#F3F4F6', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: isCompleted ? '#1B4332' : isCurrent ? 'white' : '#9CA3AF' }}>
                {isCompleted ? '✓' : chapter.id}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', flexWrap: 'wrap' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: isLocked ? '#9CA3AF' : '#1B4332', lineHeight: 1.3 }}>
                    {chapter.title}
                  </p>
                  {isCurrent && !isCompleted && (
                    <span style={{ background: '#2D6A4F', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', padding: '2px 8px', borderRadius: '10px', flexShrink: 0 }}>UP NEXT</span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontFamily: 'var(--font-heading)', fontWeight: 700, background: typeStyle.bg, color: typeStyle.text }}>{chapter.type}</span>
                  <span style={{ fontSize: '12px', color: '#9CA3AF' }}>⏱ {chapter.estimatedReadMins} min</span>
                  <span style={{ fontSize: '12px', color: '#9CA3AF' }}>📋 7 sections</span>
                  {isStarted && <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 600 }}>{secsDone}/7 read</span>}
                  {score != null && (
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444' }}>
                      Score: {score}%
                    </span>
                  )}
                </div>
              </div>

              {/* CTA button */}
              {!isLocked && (
                <Link
                  href={`/student/chapter/${chapter.id}`}
                  style={{
                    fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px',
                    padding: '8px 18px', borderRadius: '8px', textDecoration: 'none', flexShrink: 0,
                    background: isCompleted ? 'white' : isCurrent ? '#2D6A4F' : '#F3F4F6',
                    color: isCompleted ? '#2D6A4F' : isCurrent ? 'white' : '#6B7280',
                    border: isCompleted ? '1px solid #D8F3DC' : 'none',
                  }}
                >
                  {ctaLabel}
                </Link>
              )}
              {isLocked && <span style={{ fontSize: '16px', flexShrink: 0 }}>🔒</span>}
            </div>
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
