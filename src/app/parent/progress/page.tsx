'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'

const CHAPTERS = [
  { id: 1, title: 'Whistles and Shaving Bristles', type: 'Prose',     completed: true,  score: 88, timeSpent: 18, attempts: 1, sectionsRead: 7 },
  { id: 2, title: 'If I Were Lord of Tartary',     type: 'Poetry',    completed: true,  score: 76, timeSpent: 14, attempts: 2, sectionsRead: 7 },
  { id: 3, title: 'The Fun They Had',              type: 'Story',     completed: true,  score: 92, timeSpent: 20, attempts: 1, sectionsRead: 7 },
  { id: 4, title: 'In Morning Dew',                type: 'Poetry',    completed: false, score: null, timeSpent: 8, attempts: 0, sectionsRead: 3 },
  { id: 5, title: 'The Boy Who Outran the Wind',   type: 'Biography', completed: false, score: null, timeSpent: 0, attempts: 0, sectionsRead: 0 },
  { id: 6, title: 'The Blind Boy',                 type: 'Poetry',    completed: false, score: null, timeSpent: 0, attempts: 0, sectionsRead: 0 },
  { id: 7, title: 'Three Questions',               type: 'Story',     completed: false, score: null, timeSpent: 0, attempts: 0, sectionsRead: 0 },
  { id: 8, title: 'From a Railway Carriage',       type: 'Poetry',    completed: false, score: null, timeSpent: 0, attempts: 0, sectionsRead: 0 },
]

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  Prose:     { bg: '#D8F3DC', text: '#1B4332' },
  Poetry:    { bg: '#FEF3C7', text: '#92400E' },
  Story:     { bg: '#EDE9FE', text: '#5B21B6' },
  Biography: { bg: '#FFE4E6', text: '#9F1239' },
}

function ScoreBar({ score, max = 100 }: { score: number; max?: number }) {
  const pct = Math.round((score / max) * 100)
  const color = pct >= 80 ? '#10B981' : pct >= 60 ? '#F59E0B' : '#EF4444'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ flex: 1, height: '8px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '4px', transition: 'width 0.8s ease' }}/>
      </div>
      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color, minWidth: '36px' }}>{score}/{max}</span>
    </div>
  )
}

export default function ProgressPage() {
  const [parentName, setParentName] = useState('Parent')
  const [childName, setChildName] = useState('Student')

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: p } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
      if (p?.full_name) setParentName(p.full_name)
      const { data: links } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id).single()
      if (!links) return
      const { data: c } = await supabase.from('profiles').select('full_name').eq('id', links.student_id).single()
      if (c?.full_name) setChildName(c.full_name)
    }
    fetchData()
  }, [])

  const completedChapters = CHAPTERS.filter(c => c.completed).length
  const avgScore = Math.round(CHAPTERS.filter(c => c.score).reduce((a, c) => a + (c.score || 0), 0) / CHAPTERS.filter(c => c.score).length)

  return (
    <ParentSidebarLayout parentName={parentName} activeTab="progress">
      <div style={{ maxWidth: '800px', padding: '24px 24px 60px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: '#1B4332', marginBottom: '4px' }}>Progress</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>{childName} · {completedChapters} of 8 chapters completed · {avgScore}% average score</p>
        </div>

        {/* Overall progress bar */}
        <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '16px 20px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332' }}>English — Overall</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#2D6A4F' }}>{completedChapters}/8</p>
          </div>
          <div style={{ height: '8px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.round((completedChapters / 8) * 100)}%`, background: 'linear-gradient(90deg, #2D6A4F, #52B788)', borderRadius: '4px', transition: 'width 1s ease' }}/>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {CHAPTERS.map(ch => {
            const typeStyle = TYPE_COLORS[ch.type]
            return (
              <div key={ch.id} style={{ background: 'white', borderRadius: '14px', border: ch.completed ? '1px solid #D8F3DC' : '1px solid #E5E7EB', padding: '16px 20px', position: 'relative', overflow: 'hidden' }}>
                {ch.completed && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#10B981', borderRadius: '14px 0 0 14px' }}/>}
                {ch.sectionsRead > 0 && !ch.completed && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#F59E0B', borderRadius: '14px 0 0 14px' }}/>}

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flexWrap: 'wrap' }}>
                  <div style={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: ch.completed ? '#D8F3DC' : ch.sectionsRead > 0 ? '#FEF3C7' : '#F3F4F6', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '13px', color: ch.completed ? '#1B4332' : ch.sectionsRead > 0 ? '#92400E' : '#9CA3AF' }}>
                    {ch.completed ? '✓' : ch.id}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332' }}>{ch.title}</p>
                      <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontFamily: 'var(--font-heading)', fontWeight: 700, background: typeStyle.bg, color: typeStyle.text }}>{ch.type}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px,1fr))', gap: '12px', marginBottom: ch.score !== null ? '10px' : '0' }}>
                      {[{ label: 'Sections read', value: `${ch.sectionsRead}/7` }, { label: 'Time spent', value: `${ch.timeSpent} mins` }, { label: 'Quiz attempts', value: ch.attempts }].map(({ label, value }) => (
                        <div key={label}>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#9CA3AF', marginBottom: '2px' }}>{label}</p>
                          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#374151' }}>{value}</p>
                        </div>
                      ))}
                    </div>
                    {ch.score !== null && (
                      <div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#9CA3AF', marginBottom: '4px' }}>Quiz score</p>
                        <ScoreBar score={ch.score}/>
                      </div>
                    )}
                  </div>
                  <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontFamily: 'var(--font-heading)', fontWeight: 700, flexShrink: 0, background: ch.completed ? '#D8F3DC' : ch.sectionsRead > 0 ? '#FEF3C7' : '#F3F4F6', color: ch.completed ? '#1B4332' : ch.sectionsRead > 0 ? '#92400E' : '#9CA3AF' }}>
                    {ch.completed ? 'Completed' : ch.sectionsRead > 0 ? 'In progress' : 'Not started'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </ParentSidebarLayout>
  )
}
