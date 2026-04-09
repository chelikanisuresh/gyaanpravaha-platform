'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'

const SUBJECTS = [
  {
    id: 'english',
    name: 'English',
    emoji: '📖',
    available: true,
    description: 'Stories, poems, and biographical narratives from Connexion Class 6',
    totalChapters: 8,
    completedChapters: 3,
    avgScore: 85,
    color: '#2D6A4F',
    lightBg: '#D8F3DC',
  },
  { id: 'mathematics',      name: 'Mathematics',      emoji: '🔢', available: false, description: 'Numbers, algebra, geometry and more', totalChapters: 0, completedChapters: 0, avgScore: 0, color: '#6366F1', lightBg: '#EDE9FE' },
  { id: 'science',          name: 'Science',          emoji: '🔬', available: false, description: 'Biology, physics and chemistry fundamentals', totalChapters: 0, completedChapters: 0, avgScore: 0, color: '#0EA5E9', lightBg: '#E0F2FE' },
  { id: 'history-civics',   name: 'History & Civics', emoji: '🏛️', available: false, description: 'Ancient history, civics and the world around us', totalChapters: 0, completedChapters: 0, avgScore: 0, color: '#F59E0B', lightBg: '#FEF3C7' },
  { id: 'geography',        name: 'Geography',        emoji: '🌍', available: false, description: 'Earth, maps, rivers, climate and more', totalChapters: 0, completedChapters: 0, avgScore: 0, color: '#10B981', lightBg: '#ECFDF5' },
  { id: 'sanskrit',         name: 'Sanskrit',         emoji: '📜', available: false, description: 'Classical Sanskrit language and literature', totalChapters: 0, completedChapters: 0, avgScore: 0, color: '#EF4444', lightBg: '#FEF2F2' },
  { id: 'ict',              name: 'ICT',              emoji: '💻', available: false, description: 'Information technology and computers', totalChapters: 0, completedChapters: 0, avgScore: 0, color: '#8B5CF6', lightBg: '#F5F3FF' },
]

const ENGLISH_CHAPTERS = [
  {
    id: 1,
    title: 'Whistles and Shaving Bristles',
    type: 'Prose',
    author: 'Frank B. Gilbreth Jr. & Ernestine Gilbreth Carey',
    minutes: 15,
    sections: 7,
    completed: true,
    score: 88,
    sectionsRead: 7,
    timeSpent: 18,
    valuesLearnt: ['Family bonding', 'Discipline'],
    summary: 'An extract from Cheaper by the Dozen — a warm and humorous account of growing up in a family of fourteen, with a father who ran the home like an efficiency expert.',
  },
  {
    id: 2,
    title: 'If I Were Lord of Tartary',
    type: 'Poetry',
    author: 'Walter de la Mare',
    minutes: 12,
    sections: 7,
    completed: true,
    score: 76,
    sectionsRead: 7,
    timeSpent: 14,
    valuesLearnt: ['Imagination', 'Appreciation for beauty'],
    summary: 'A poem where the poet imagines himself as the all-powerful ruler of a magical, exotic kingdom called Tartary — celebrating the boundless power of human imagination.',
  },
  {
    id: 3,
    title: 'The Fun They Had',
    type: 'Story',
    author: 'Isaac Asimov',
    minutes: 16,
    sections: 7,
    completed: true,
    score: 92,
    sectionsRead: 7,
    timeSpent: 20,
    valuesLearnt: ['Value of human connection', 'Respect for school'],
    summary: 'A science fiction story set in 2157 where children learn from mechanical teachers at home. When two children discover an old paper book about schools, Margie realises what she is missing.',
  },
  {
    id: 4,
    title: 'In Morning Dew',
    type: 'Poetry',
    author: 'Keki N Daruwalla',
    minutes: 11,
    sections: 7,
    completed: false,
    score: null,
    sectionsRead: 3,
    timeSpent: 8,
    valuesLearnt: ['Being observant', 'Curiosity'],
    summary: 'A playful, witty poem written from the perspective of a scarecrow who observes everything around him — birds, seasons, animals — but cannot understand the deeper mysteries of nature.',
  },
  {
    id: 5,
    title: 'The Boy Who Outran the Wind — Milkha Singh',
    type: 'Biography',
    author: 'Biographical narrative',
    minutes: 18,
    sections: 7,
    completed: false,
    score: null,
    sectionsRead: 0,
    timeSpent: 0,
    valuesLearnt: ['Hard work', 'Determination', 'Courage'],
    summary: 'The true story of Milkha Singh who lost everything during the Partition of India but went on to become one of India\'s greatest athletes — earning the title "The Flying Sikh".',
  },
  {
    id: 6,
    title: 'The Blind Boy',
    type: 'Poetry',
    author: 'Colley Cibber',
    minutes: 12,
    sections: 7,
    completed: false,
    score: null,
    sectionsRead: 0,
    timeSpent: 0,
    valuesLearnt: ['Contentment', 'Inner strength'],
    summary: 'A deeply moving poem written from the perspective of a boy blind from birth who, despite never seeing light, finds peace and joy — declaring "Whilst thus I sing, I am a king."',
  },
  {
    id: 7,
    title: 'Three Questions',
    type: 'Story',
    author: 'Leo Tolstoy',
    minutes: 20,
    sections: 7,
    completed: false,
    score: null,
    sectionsRead: 0,
    timeSpent: 0,
    valuesLearnt: ['Wisdom', 'Empathy', 'Living in the present'],
    summary: 'A king seeks answers to three questions — the right time to act, the right person to listen to, and the most important task. A wise hermit teaches him the most profound lesson of his life.',
  },
  {
    id: 8,
    title: 'From a Railway Carriage',
    type: 'Poetry',
    author: 'Robert Louis Stevenson',
    minutes: 10,
    sections: 7,
    completed: false,
    score: null,
    sectionsRead: 0,
    timeSpent: 0,
    valuesLearnt: ['Joy of travel', 'Beauty in ordinary things'],
    summary: 'A fast-moving poem that captures the experience of looking out of a train window — images flashing past in the blink of an eye, ending with the beautiful line "Each a glimpse and gone forever."',
  },
]

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  Prose:     { bg: '#D8F3DC', text: '#1B4332' },
  Poetry:    { bg: '#FEF3C7', text: '#92400E' },
  Story:     { bg: '#EDE9FE', text: '#5B21B6' },
  Biography: { bg: '#FFE4E6', text: '#9F1239' },
}

export default function SubjectsPage() {
  const router = useRouter()
  const [activeSubject, setActiveSubject] = useState('english')
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null)

  const subject = SUBJECTS.find(s => s.id === activeSubject)
  const progress = subject?.totalChapters
    ? Math.round((subject.completedChapters / subject.totalChapters) * 100)
    : 0

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAF9' }}>
      <style>{`
        @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .slide-up { animation: slideUp 0.4s ease forwards; }
        .chapter-row { transition: all 0.2s; cursor: pointer; }
        .chapter-row:hover { background: #F9FAFB !important; }
        .subject-card { transition: all 0.2s; cursor: pointer; }
        .subject-card:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.08); }
      `}</style>

      <Navbar rightContent={
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link href="/student/dashboard" className="btn-outline" style={{ padding: '7px 16px', fontSize: '13px' }}>
            ← Dashboard
          </Link>
        </div>
      }/>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '28px 5% 60px' }}>

        {/* Page title */}
        <div className="slide-up" style={{ marginBottom: '24px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(22px,4vw,30px)', color: '#1B4332', marginBottom: '4px' }}>My Subjects</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>Select a subject to view chapters and start learning</p>
        </div>

        {/* Subject grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '12px', marginBottom: '28px' }}>
          {SUBJECTS.map(s => (
            <div
              key={s.id}
              className="subject-card"
              onClick={() => s.available && setActiveSubject(s.id)}
              style={{
                background: activeSubject === s.id ? s.color : 'white',
                borderRadius: '14px',
                padding: '16px',
                border: activeSubject === s.id ? `2px solid ${s.color}` : '1px solid #E5E7EB',
                opacity: s.available ? 1 : 0.55,
                cursor: s.available ? 'pointer' : 'not-allowed',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ fontSize: '24px' }}>{s.emoji}</span>
                {!s.available && <span style={{ fontSize: '14px' }}>🔒</span>}
                {s.available && activeSubject === s.id && (
                  <span style={{ background: 'rgba(255,255,255,0.2)', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', padding: '2px 8px', borderRadius: '10px' }}>Active</span>
                )}
              </div>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: activeSubject === s.id ? 'white' : '#1B4332', marginBottom: '4px' }}>{s.name}</p>
              {s.available ? (
                <>
                  <div style={{ height: '4px', background: activeSubject === s.id ? 'rgba(255,255,255,0.3)' : '#E5E7EB', borderRadius: '2px', overflow: 'hidden', marginBottom: '4px' }}>
                    <div style={{ height: '100%', width: `${s.totalChapters ? Math.round((s.completedChapters / s.totalChapters) * 100) : 0}%`, background: activeSubject === s.id ? 'white' : s.color, borderRadius: '2px' }}/>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: activeSubject === s.id ? 'rgba(255,255,255,0.7)' : '#9CA3AF' }}>
                    {s.completedChapters}/{s.totalChapters} chapters
                  </p>
                </>
              ) : (
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>Coming soon</p>
              )}
            </div>
          ))}
        </div>

        {/* English subject detail */}
        {activeSubject === 'english' && subject && (
          <div>
            {/* Subject header */}
            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px 24px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: '#1B4332', marginBottom: '4px' }}>English</h2>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7280' }}>{subject.description}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ background: '#D8F3DC', borderRadius: '10px', padding: '10px 16px', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: '#1B4332', lineHeight: 1 }}>{subject.completedChapters}/8</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#40916C', marginTop: '2px' }}>Chapters</p>
                  </div>
                  <div style={{ background: '#FEF3C7', borderRadius: '10px', padding: '10px 16px', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: '#92400E', lineHeight: 1 }}>{subject.avgScore}%</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#B45309', marginTop: '2px' }}>Avg score</p>
                  </div>
                </div>
              </div>
              <div style={{ height: '8px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #2D6A4F, #52B788)', borderRadius: '4px', transition: 'width 0.8s ease' }}/>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginTop: '6px' }}>
                {progress}% complete — keep going!
              </p>
            </div>

            {/* Chapter list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {ENGLISH_CHAPTERS.map((ch) => {
                const typeStyle = TYPE_COLORS[ch.type]
                const isExpanded = expandedChapter === ch.id
                const isNext = !ch.completed && ENGLISH_CHAPTERS.find(c => !c.completed)?.id === ch.id

                return (
                  <div key={ch.id} style={{ background: 'white', borderRadius: '16px', border: ch.completed ? '1px solid #D8F3DC' : isNext ? '2px solid #2D6A4F' : '1px solid #E5E7EB', overflow: 'hidden' }}>

                    {/* Chapter row — always visible */}
                    <div
                      className="chapter-row"
                      onClick={() => setExpandedChapter(isExpanded ? null : ch.id)}
                      style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', background: isExpanded ? '#F9FAFB' : 'white', position: 'relative' }}
                    >
                      {ch.completed && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#10B981', borderRadius: '16px 0 0 16px' }}/>}
                      {isNext && !ch.completed && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#2D6A4F', borderRadius: '16px 0 0 16px' }}/>}

                      {/* Number / check */}
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: ch.completed ? '#D8F3DC' : isNext ? '#2D6A4F' : '#F3F4F6', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: ch.completed ? '#1B4332' : isNext ? 'white' : '#9CA3AF' }}>
                        {ch.completed ? '✓' : ch.id}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', lineHeight: 1.3 }}>{ch.title}</p>
                          {isNext && <span style={{ background: '#2D6A4F', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', padding: '2px 8px', borderRadius: '10px', flexShrink: 0 }}>UP NEXT</span>}
                        </div>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                          <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontFamily: 'var(--font-heading)', fontWeight: 700, background: typeStyle.bg, color: typeStyle.text }}>{ch.type}</span>
                          <span style={{ fontSize: '12px', color: '#9CA3AF' }}>⏱ {ch.minutes} min</span>
                          <span style={{ fontSize: '12px', color: '#9CA3AF' }}>📋 {ch.sections} sections</span>
                          {ch.sectionsRead > 0 && !ch.completed && (
                            <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 600 }}>{ch.sectionsRead}/7 read</span>
                          )}
                          {ch.score !== null && (
                            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: ch.score >= 80 ? '#10B981' : ch.score >= 60 ? '#F59E0B' : '#EF4444' }}>
                              Score: {ch.score}%
                            </span>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                        <Link
                          href={`/student/chapter/${ch.id}`}
                          onClick={e => e.stopPropagation()}
                          style={{
                            fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px',
                            padding: '8px 16px', borderRadius: '8px', textDecoration: 'none',
                            background: ch.completed ? '#F0FDF4' : isNext ? '#2D6A4F' : '#F3F4F6',
                            color: ch.completed ? '#2D6A4F' : isNext ? 'white' : '#9CA3AF',
                            border: ch.completed ? '1px solid #D8F3DC' : 'none',
                          }}
                        >
                          {ch.completed ? 'Review' : isNext ? 'Continue' : ch.sectionsRead > 0 ? 'Resume' : 'Start'}
                        </Link>
                        <span style={{ fontSize: '14px', color: '#9CA3AF', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'none' }}>▾</span>
                      </div>
                    </div>

                    {/* Expanded detail */}
                    {isExpanded && (
                      <div style={{ padding: '0 20px 20px', borderTop: '1px solid #F3F4F6' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px', paddingTop: '16px', marginBottom: '16px' }}>

                          {/* About */}
                          <div>
                            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>About</p>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', lineHeight: 1.65, marginBottom: '8px' }}>{ch.summary}</p>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>By {ch.author}</p>
                          </div>

                          {/* Details */}
                          <div>
                            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Details</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {[
                                { label: 'Read time',        value: `${ch.minutes} minutes` },
                                { label: 'Sections',         value: `${ch.sections} sections` },
                                { label: 'Sections read',    value: `${ch.sectionsRead} / ${ch.sections}` },
                                { label: 'Time spent',       value: ch.timeSpent > 0 ? `${ch.timeSpent} mins` : 'Not started' },
                                { label: 'Quiz score',       value: ch.score !== null ? `${ch.score}%` : 'Not attempted' },
                              ].map(({ label, value }) => (
                                <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9CA3AF' }}>{label}</p>
                                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#374151' }}>{value}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Values */}
                          <div>
                            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Values learnt</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              {ch.valuesLearnt.map(v => (
                                <span key={v} style={{ background: '#D8F3DC', color: '#1B4332', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', padding: '4px 10px', borderRadius: '20px' }}>{v}</span>
                              ))}
                            </div>

                            {/* Section progress */}
                            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', marginTop: '16px' }}>Section progress</p>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              {Array.from({ length: 7 }).map((_, i) => (
                                <div key={i} style={{ flex: 1, height: '8px', borderRadius: '4px', background: i < ch.sectionsRead ? '#2D6A4F' : '#E5E7EB' }}/>
                              ))}
                            </div>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>{ch.sectionsRead} of 7 sections confirmed</p>
                          </div>
                        </div>

                        <Link href={`/student/chapter/${ch.id}`} className="btn-primary" style={{ display: 'inline-flex', padding: '10px 24px', fontSize: '14px' }}>
                          {ch.completed ? 'Review this chapter' : ch.sectionsRead > 0 ? 'Continue reading' : 'Start this chapter'} →
                        </Link>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Coming soon for other subjects */}
        {activeSubject !== 'english' && (
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '56px 24px', textAlign: 'center' }}>
            <span style={{ fontSize: '52px', display: 'block', marginBottom: '16px' }}>
              {SUBJECTS.find(s => s.id === activeSubject)?.emoji}
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '22px', color: '#1B4332', marginBottom: '10px' }}>
              {SUBJECTS.find(s => s.id === activeSubject)?.name} is coming soon!
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280', maxWidth: '360px', margin: '0 auto 24px', lineHeight: 1.7 }}>
              We are preparing your {SUBJECTS.find(s => s.id === activeSubject)?.name} lessons with the same depth and care as English. Meanwhile, keep going with English!
            </p>
            <button onClick={() => setActiveSubject('english')} className="btn-primary" style={{ padding: '11px 28px', fontSize: '14px' }}>
              Go to English →
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
