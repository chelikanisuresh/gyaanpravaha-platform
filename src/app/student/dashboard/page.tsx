'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

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

const TYPE_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  Prose:     { bg: '#D8F3DC', text: '#1B4332', dot: '#2D6A4F' },
  Poetry:    { bg: '#FEF3C7', text: '#92400E', dot: '#F59E0B' },
  Story:     { bg: '#EDE9FE', text: '#5B21B6', dot: '#6366F1' },
  Biography: { bg: '#FFE4E6', text: '#9F1239', dot: '#EF4444' },
}

const SUBJECTS = [
  { name: 'English',          emoji: '📖', progress: 37, available: true  },
  { name: 'Mathematics',      emoji: '🔢', progress: 0,  available: false },
  { name: 'Science',          emoji: '🔬', progress: 0,  available: false },
  { name: 'History & Civics', emoji: '🏛️', progress: 0,  available: false },
  { name: 'Geography',        emoji: '🌍', progress: 0,  available: false },
  { name: 'Sanskrit',         emoji: '📜', progress: 0,  available: false },
  { name: 'ICT',              emoji: '💻', progress: 0,  available: false },
]

const STREAK = 5
const STUDENT_NAME = 'Arjun'

function ScoreRing({ score }: { score: number }) {
  const color = score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444'
  return (
    <div style={{ position: 'relative', width: '44px', height: '44px', flexShrink: 0 }}>
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r="18" fill="none" stroke="#E5E7EB" strokeWidth="4"/>
        <circle
          cx="22" cy="22" r="18" fill="none"
          stroke={color} strokeWidth="4"
          strokeDasharray={`${(score / 100) * 113} 113`}
          strokeLinecap="round"
          transform="rotate(-90 22 22)"
        />
      </svg>
      <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '11px', color, margin: 0 }}>
        {score}%
      </p>
    </div>
  )
}

function StreakFlame({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {Array.from({ length: Math.min(count, 7) }).map((_, i) => (
        <div key={i} style={{
          width: '18px', height: '24px',
          background: i < count ? '#F59E0B' : '#E5E7EB',
          borderRadius: '50% 50% 40% 40%',
          opacity: i < count ? 1 - (i * 0.08) : 0.3,
          transition: 'all 0.3s',
        }}/>
      ))}
    </div>
  )
}

export default function StudentDashboard() {
  const [activeSubject, setActiveSubject] = useState('English')
  const [greeting, setGreeting] = useState('')
  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 17) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  const completedChapters = CHAPTERS.filter(c => c.completed).length
  const totalChapters = CHAPTERS.length
  const overallProgress = Math.round((completedChapters / totalChapters) * 100)
  const avgScore = Math.round(
    CHAPTERS.filter(c => c.score !== null).reduce((a, c) => a + (c.score || 0), 0) /
    CHAPTERS.filter(c => c.score !== null).length
  )

  const nextChapter = CHAPTERS.find(c => !c.completed)

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAF9', fontFamily: 'var(--font-body)' }}>
      <style>{`
        @keyframes pop { 0%{transform:scale(0.8);opacity:0} 60%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%,100%{opacity:1} 50%{opacity:0.6} }
        @keyframes bounceIn { 0%{transform:scale(0)} 50%{transform:scale(1.2)} 100%{transform:scale(1)} }
        .pop-in { animation: pop 0.4s ease forwards; }
        .slide-up { animation: slideUp 0.5s ease forwards; }
        .chapter-card { transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
        .chapter-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(45,106,79,0.12); }
        .subject-chip { transition: all 0.2s; cursor: pointer; }
        .subject-chip:hover { transform: translateY(-2px); }
        .stat-card { animation: slideUp 0.5s ease forwards; }
        .progress-fill { transition: width 1s ease; }
        .flame { animation: shimmer 2s ease-in-out infinite; }
      `}</style>

      {/* ── TOP NAV ── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 5%', height: '60px',
        background: 'white', borderBottom: '1px solid #E5E7EB',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: '#2D6A4F', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M6 8h8M10 4v8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="10" cy="8" r="1.2" fill="#74C69D"/>
            </svg>
          </div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: '#1B4332' }}>Gyaanpravaha</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Streak badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FEF3C7', borderRadius: '20px', padding: '5px 12px', border: '1px solid #FDE68A' }}>
            <span style={{ fontSize: '16px' }}>🔥</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#92400E' }}>{STREAK} day streak!</span>
          </div>
          {/* Avatar */}
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#2D6A4F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: 'white' }}>
            {STUDENT_NAME[0]}
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '28px 5% 60px' }}>

        {/* ── GREETING ── */}
        <div className="slide-up" style={{ marginBottom: '28px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(22px,4vw,30px)', color: '#1B4332', marginBottom: '4px' }}>
            {greeting}, {STUDENT_NAME}! 👋
          </h1>
          <p style={{ fontSize: '15px', color: '#6B7280' }}>
            {nextChapter
              ? `Ready to continue? Your next chapter is "${nextChapter.title}"`
              : 'You have completed all chapters! Amazing work!'}
          </p>
        </div>

        {/* ── STAT CARDS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '14px', marginBottom: '28px' }}>
          {[
            { label: 'Chapters done',   value: `${completedChapters}/${totalChapters}`, emoji: '📚', bg: '#D8F3DC', color: '#1B4332' },
            { label: 'Average score',   value: `${avgScore}%`,                          emoji: '⭐', bg: '#FEF3C7', color: '#92400E' },
            { label: 'Day streak',      value: `${STREAK} days`,                         emoji: '🔥', bg: '#FFE4E6', color: '#9F1239' },
            { label: 'Overall progress',value: `${overallProgress}%`,                   emoji: '📈', bg: '#EDE9FE', color: '#5B21B6' },
          ].map(({ label, value, emoji, bg, color }, i) => (
            <div key={label} className="stat-card" style={{
              background: bg, borderRadius: '14px', padding: '16px',
              animationDelay: `${i * 80}ms`, opacity: 0,
            }}>
              <span style={{ fontSize: '22px', display: 'block', marginBottom: '8px' }}>{emoji}</span>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '22px', color, lineHeight: 1, marginBottom: '4px' }}>{value}</p>
              <p style={{ fontSize: '12px', color: '#6B7280', fontWeight: 500 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* ── CONTINUE LEARNING BANNER ── */}
        {nextChapter && (
          <div className="pop-in" style={{
            background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)',
            borderRadius: '16px', padding: '20px 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '16px', marginBottom: '28px', flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '32px' }}>▶️</span>
              <div>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#74C69D', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Continue where you left off</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '17px', color: 'white', marginBottom: '4px' }}>{nextChapter.title}</p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                  {nextChapter.sectionsRead > 0
                    ? `${nextChapter.sectionsRead} of 7 sections read`
                    : `${nextChapter.minutes} min read · 7 sections`}
                </p>
              </div>
            </div>
            <Link href={`/student/chapter/${nextChapter.id}`} style={{
              background: '#74C69D', color: '#1B4332',
              fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px',
              padding: '11px 24px', borderRadius: '10px', textDecoration: 'none',
              flexShrink: 0, display: 'inline-block',
            }}>
              {nextChapter.sectionsRead > 0 ? 'Continue →' : 'Start chapter →'}
            </Link>
          </div>
        )}

        {/* ── SUBJECT TABS ── */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>My subjects</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {SUBJECTS.map(subject => (
              <button
                key={subject.name}
                className="subject-chip"
                onClick={() => subject.available && setActiveSubject(subject.name)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '8px 16px', borderRadius: '24px',
                  border: activeSubject === subject.name ? '2px solid #2D6A4F' : '2px solid #E5E7EB',
                  background: activeSubject === subject.name ? '#2D6A4F' : subject.available ? 'white' : '#F9FAFB',
                  cursor: subject.available ? 'pointer' : 'not-allowed',
                  opacity: subject.available ? 1 : 0.5,
                }}
              >
                <span style={{ fontSize: '16px' }}>{subject.emoji}</span>
                <span style={{
                  fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px',
                  color: activeSubject === subject.name ? 'white' : subject.available ? '#374151' : '#9CA3AF',
                }}>
                  {subject.name}
                </span>
                {subject.available && subject.progress > 0 && (
                  <span style={{
                    background: activeSubject === subject.name ? 'rgba(255,255,255,0.25)' : '#D8F3DC',
                    color: activeSubject === subject.name ? 'white' : '#1B4332',
                    fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px',
                    padding: '2px 8px', borderRadius: '10px',
                  }}>
                    {subject.progress}%
                  </span>
                )}
                {!subject.available && (
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>🔒</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── ENGLISH CHAPTERS ── */}
        {activeSubject === 'English' && (
          <div>
            {/* Overall progress bar */}
            <div style={{ background: 'white', borderRadius: '14px', padding: '18px 20px', marginBottom: '16px', border: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332' }}>English progress</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: '#2D6A4F' }}>{completedChapters} of {totalChapters} chapters</p>
              </div>
              <div style={{ height: '10px', background: '#E5E7EB', borderRadius: '5px', overflow: 'hidden' }}>
                <div className="progress-fill" style={{ height: '100%', background: 'linear-gradient(90deg, #2D6A4F, #52B788)', borderRadius: '5px', width: `${overallProgress}%` }}/>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                <p style={{ fontSize: '12px', color: '#9CA3AF' }}>Keep going — you are doing great!</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#2D6A4F' }}>{overallProgress}%</p>
              </div>
            </div>

            {/* Chapter cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {CHAPTERS.map((chapter, idx) => {
                const typeStyle = TYPE_COLORS[chapter.type]
                const isNext = chapter.id === nextChapter?.id
                const isLocked = !chapter.completed && chapter.id > (nextChapter?.id || 1) + 0

                return (
                  <div
                    key={chapter.id}
                    className="chapter-card"
                    onMouseEnter={() => setHoveredChapter(chapter.id)}
                    onMouseLeave={() => setHoveredChapter(null)}
                    style={{
                      background: 'white',
                      borderRadius: '14px',
                      padding: '16px 20px',
                      border: isNext ? '2px solid #2D6A4F' : chapter.completed ? '1px solid #D8F3DC' : '1px solid #E5E7EB',
                      display: 'flex', alignItems: 'center', gap: '16px',
                      position: 'relative', overflow: 'hidden',
                    }}
                  >
                    {/* Completed left accent */}
                    {chapter.completed && (
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#10B981', borderRadius: '14px 0 0 14px' }}/>
                    )}
                    {isNext && (
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#2D6A4F', borderRadius: '14px 0 0 14px' }}/>
                    )}

                    {/* Chapter number */}
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: chapter.completed ? '#D8F3DC' : isNext ? '#2D6A4F' : '#F3F4F6',
                      fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '15px',
                      color: chapter.completed ? '#1B4332' : isNext ? 'white' : '#9CA3AF',
                    }}>
                      {chapter.completed ? '✓' : chapter.id}
                    </div>

                    {/* Chapter info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', lineHeight: 1.3 }}>
                          {chapter.title}
                        </p>
                        {isNext && (
                          <span style={{ background: '#2D6A4F', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', padding: '2px 8px', borderRadius: '10px', flexShrink: 0 }}>
                            UP NEXT
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontFamily: 'var(--font-heading)', fontWeight: 700, background: typeStyle.bg, color: typeStyle.text }}>
                          {chapter.type}
                        </span>
                        <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{chapter.minutes} min</span>
                        {chapter.sectionsRead > 0 && !chapter.completed && (
                          <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 600 }}>
                            {chapter.sectionsRead}/7 sections read
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right side */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                      {chapter.score !== null && <ScoreRing score={chapter.score}/>}
                      <Link
                        href={`/student/chapter/${chapter.id}`}
                        style={{
                          fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px',
                          padding: '8px 16px', borderRadius: '8px', textDecoration: 'none',
                          background: chapter.completed ? '#F0FDF4' : isNext ? '#2D6A4F' : '#F3F4F6',
                          color: chapter.completed ? '#2D6A4F' : isNext ? 'white' : '#9CA3AF',
                          border: chapter.completed ? '1px solid #D8F3DC' : 'none',
                        }}
                      >
                        {chapter.completed ? 'Review' : isNext ? 'Continue' : chapter.sectionsRead > 0 ? 'Resume' : 'Start'}
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── COMING SOON for other subjects ── */}
        {activeSubject !== 'English' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '48px 24px', textAlign: 'center', border: '1px solid #E5E7EB' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>
              {SUBJECTS.find(s => s.name === activeSubject)?.emoji}
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: '#1B4332', marginBottom: '8px' }}>
              {activeSubject} is coming soon!
            </h3>
            <p style={{ fontSize: '14px', color: '#6B7280', maxWidth: '320px', margin: '0 auto' }}>
              We are preparing your {activeSubject} lessons. Meanwhile keep going with English!
            </p>
          </div>
        )}

        {/* ── STREAK SECTION ── */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '20px 24px', marginTop: '20px', border: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: '#1B4332', marginBottom: '2px' }}>
                🔥 {STREAK} day streak!
              </p>
              <p style={{ fontSize: '13px', color: '#6B7280' }}>Study every day to keep your streak alive</p>
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#F59E0B', background: '#FEF3C7', padding: '6px 14px', borderRadius: '20px' }}>
              Best: 7 days
            </span>
          </div>
          <StreakFlame count={STREAK}/>
          <div style={{ display: 'flex', marginTop: '8px', gap: '4px' }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={day} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: i < STREAK ? '#F59E0B' : '#E5E7EB', marginBottom: '4px' }}/>
                <p style={{ fontSize: '10px', color: '#9CA3AF', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>{day}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── MOTIVATIONAL QUOTE ── */}
        <div style={{
          background: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
          borderRadius: '16px', padding: '24px',
          marginTop: '20px', textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', color: '#74C69D', marginBottom: '8px' }}>
            💬 Today's thought
          </p>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: 'white', lineHeight: 1.4 }}>
            "The more that you read, the more things you will know."
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '8px' }}>— Dr. Seuss</p>
        </div>

      </div>
    </div>
  )
}
