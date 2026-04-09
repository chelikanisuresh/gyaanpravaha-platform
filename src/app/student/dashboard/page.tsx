'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SidebarLayout from '@/components/SidebarLayout'

const CHAPTERS = [
  { id: 1, title: 'Whistles and Shaving Bristles', type: 'Prose',     minutes: 15, completed: true,  score: 88, sectionsRead: 7 },
  { id: 2, title: 'If I Were Lord of Tartary',     type: 'Poetry',    minutes: 12, completed: true,  score: 76, sectionsRead: 7 },
  { id: 3, title: 'The Fun They Had',              type: 'Story',     minutes: 16, completed: true,  score: 92, sectionsRead: 7 },
  { id: 4, title: 'In Morning Dew',                type: 'Poetry',    minutes: 11, completed: false, score: null, sectionsRead: 3 },
  { id: 5, title: 'The Boy Who Outran the Wind',   type: 'Biography', minutes: 18, completed: false, score: null, sectionsRead: 0 },
  { id: 6, title: 'The Blind Boy',                 type: 'Poetry',    minutes: 12, completed: false, score: null, sectionsRead: 0 },
  { id: 7, title: 'Three Questions',               type: 'Story',     minutes: 20, completed: false, score: null, sectionsRead: 0 },
  { id: 8, title: 'From a Railway Carriage',       type: 'Poetry',    minutes: 10, completed: false, score: null, sectionsRead: 0 },
]

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  Prose:     { bg: '#D8F3DC', text: '#1B4332' },
  Poetry:    { bg: '#FEF3C7', text: '#92400E' },
  Story:     { bg: '#EDE9FE', text: '#5B21B6' },
  Biography: { bg: '#FFE4E6', text: '#9F1239' },
}

const STREAK = 5
const STUDENT_NAME = 'Arjun'

function ScoreRing({ score }: { score: number }) {
  const color = score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444'
  return (
    <div style={{ position: 'relative', width: '44px', height: '44px', flexShrink: 0 }}>
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r="18" fill="none" stroke="#E5E7EB" strokeWidth="4"/>
        <circle cx="22" cy="22" r="18" fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={`${(score / 100) * 113} 113`} strokeLinecap="round"
          transform="rotate(-90 22 22)"/>
      </svg>
      <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '11px', color, margin: 0 }}>
        {score}%
      </p>
    </div>
  )
}

export default function StudentDashboard() {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 17) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  const completedChapters = CHAPTERS.filter(c => c.completed).length
  const overallProgress = Math.round((completedChapters / CHAPTERS.length) * 100)
  const avgScore = Math.round(CHAPTERS.filter(c => c.score !== null).reduce((a, c) => a + (c.score || 0), 0) / CHAPTERS.filter(c => c.score !== null).length)
  const nextChapter = CHAPTERS.find(c => !c.completed)

  return (
    <SidebarLayout studentName={STUDENT_NAME}>
      <style>{`
        @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pop { 0%{transform:scale(0.95);opacity:0} 100%{transform:scale(1);opacity:1} }
        .stat-card { animation: slideUp 0.5s ease forwards; opacity: 0; }
        .chapter-card { transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
        .chapter-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(45,106,79,0.12); }
      `}</style>

      <div style={{ padding: '28px 32px 60px' }}>

        {/* Greeting */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(20px,3vw,28px)', color: '#1B4332', marginBottom: '4px' }}>
            {greeting}, {STUDENT_NAME}! 👋
          </h1>
          <p style={{ fontSize: '14px', color: '#6B7280' }}>
            {nextChapter ? `Keep going — "${nextChapter.title}" is waiting for you` : 'You have completed all chapters — amazing work!'}
          </p>
        </div>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Chapters done',    value: `${completedChapters}/${CHAPTERS.length}`, emoji: '📚', bg: '#D8F3DC', color: '#1B4332', delay: '0ms'   },
            { label: 'Average score',    value: `${avgScore}%`,                             emoji: '⭐', bg: '#FEF3C7', color: '#92400E', delay: '80ms'  },
            { label: 'Day streak',       value: `${STREAK} days`,                           emoji: '🔥', bg: '#FFE4E6', color: '#9F1239', delay: '160ms' },
            { label: 'Overall progress', value: `${overallProgress}%`,                      emoji: '📈', bg: '#EDE9FE', color: '#5B21B6', delay: '240ms' },
          ].map(({ label, value, emoji, bg, color, delay }) => (
            <div key={label} className="stat-card" style={{ background: bg, borderRadius: '14px', padding: '16px', animationDelay: delay }}>
              <span style={{ fontSize: '22px', display: 'block', marginBottom: '8px' }}>{emoji}</span>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '22px', color, lineHeight: 1, marginBottom: '4px' }}>{value}</p>
              <p style={{ fontSize: '12px', color: '#6B7280' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Continue banner */}
        {nextChapter && (
          <div style={{
            background: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
            borderRadius: '16px', padding: '20px 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '16px', marginBottom: '28px', flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '30px' }}>▶️</span>
              <div>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#74C69D', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Continue where you left off</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: 'white', marginBottom: '2px' }}>{nextChapter.title}</p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                  {nextChapter.sectionsRead > 0 ? `${nextChapter.sectionsRead} of 7 sections read` : `${nextChapter.minutes} min read · 7 sections`}
                </p>
              </div>
            </div>
            <Link href={`/student/chapter/${nextChapter.id}`} style={{
              background: '#74C69D', color: '#1B4332',
              fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px',
              padding: '11px 22px', borderRadius: '10px', textDecoration: 'none', flexShrink: 0,
            }}>
              {nextChapter.sectionsRead > 0 ? 'Continue →' : 'Start →'}
            </Link>
          </div>
        )}

        {/* English chapters */}
        <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '17px', color: '#1B4332', marginBottom: '2px' }}>English chapters</h2>
            <p style={{ fontSize: '13px', color: '#9CA3AF' }}>{completedChapters} of {CHAPTERS.length} completed · {overallProgress}% progress</p>
          </div>
          <Link href="/student/subjects" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#2D6A4F', textDecoration: 'none', background: '#D8F3DC', padding: '7px 14px', borderRadius: '8px' }}>
            All subjects →
          </Link>
        </div>

        {/* Progress bar */}
        <div style={{ height: '8px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
          <div style={{ height: '100%', width: `${overallProgress}%`, background: 'linear-gradient(90deg,#2D6A4F,#52B788)', borderRadius: '4px', transition: 'width 1s ease' }}/>
        </div>

        {/* Chapter list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {CHAPTERS.map(chapter => {
            const typeStyle = TYPE_COLORS[chapter.type]
            const isNext = chapter.id === nextChapter?.id
            return (
              <div key={chapter.id} className="chapter-card" style={{
                background: 'white', borderRadius: '14px', padding: '16px 20px',
                border: isNext ? '2px solid #2D6A4F' : chapter.completed ? '1px solid #D8F3DC' : '1px solid #E5E7EB',
                display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', overflow: 'hidden',
              }}>
                {chapter.completed && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#10B981', borderRadius: '14px 0 0 14px' }}/>}
                {isNext && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#2D6A4F', borderRadius: '14px 0 0 14px' }}/>}

                <div style={{ width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: chapter.completed ? '#D8F3DC' : isNext ? '#2D6A4F' : '#F3F4F6', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '15px', color: chapter.completed ? '#1B4332' : isNext ? 'white' : '#9CA3AF' }}>
                  {chapter.completed ? '✓' : chapter.id}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332' }}>{chapter.title}</p>
                    {isNext && <span style={{ background: '#2D6A4F', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', padding: '2px 8px', borderRadius: '10px', flexShrink: 0 }}>UP NEXT</span>}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontFamily: 'var(--font-heading)', fontWeight: 700, background: typeStyle.bg, color: typeStyle.text }}>{chapter.type}</span>
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{chapter.minutes} min</span>
                    {chapter.sectionsRead > 0 && !chapter.completed && (
                      <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 600 }}>{chapter.sectionsRead}/7 sections read</span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                  {chapter.score !== null && <ScoreRing score={chapter.score}/>}
                  <Link href={`/student/chapter/${chapter.id}`} style={{
                    fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px',
                    padding: '8px 14px', borderRadius: '8px', textDecoration: 'none',
                    background: chapter.completed ? '#F0FDF4' : isNext ? '#2D6A4F' : '#F3F4F6',
                    color: chapter.completed ? '#2D6A4F' : isNext ? 'white' : '#9CA3AF',
                    border: chapter.completed ? '1px solid #D8F3DC' : 'none',
                  }}>
                    {chapter.completed ? 'Review' : isNext ? 'Continue' : chapter.sectionsRead > 0 ? 'Resume' : 'Start'}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Streak + quote */}
        <div style={{ marginTop: '20px', background: 'white', borderRadius: '16px', padding: '20px 24px', border: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '15px', color: '#1B4332' }}>🔥 {STREAK} day streak!</p>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#F59E0B', background: '#FEF3C7', padding: '4px 12px', borderRadius: '20px' }}>Best: 7 days</span>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day, i) => (
              <div key={day} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: '6px', borderRadius: '3px', background: i < STREAK ? '#F59E0B' : '#E5E7EB', marginBottom: '4px' }}/>
                <p style={{ fontSize: '10px', color: '#9CA3AF', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>{day}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '14px', background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '16px', padding: '20px 24px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#74C69D', marginBottom: '6px' }}>💬 Today's thought</p>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: 'white', lineHeight: 1.4 }}>"The more that you read, the more things you will know."</p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>— Dr. Seuss</p>
        </div>

      </div>
    </SidebarLayout>
  )
}
