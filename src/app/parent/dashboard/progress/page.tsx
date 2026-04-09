'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'
import PageShell from '@/components/PageShell'

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

const TYPE_BADGE: Record<string, string> = { Prose: 'badge-green', Poetry: 'badge-amber', Story: 'badge-neutral', Biography: 'badge-neutral' }

function ScoreBar({ score, max = 100 }: { score: number; max?: number }) {
  const pct = Math.round((score / max) * 100)
  const color = pct >= 80 ? 'var(--brand)' : pct >= 60 ? 'var(--amber)' : 'var(--red)'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div className="progress-bar" style={{ flex: 1 }}>
        <div className="progress-fill" style={{ width: `${pct}%`, background: color }}/>
      </div>
      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px', color, minWidth: '40px', textAlign: 'right' }}>{score}/{max}</span>
    </div>
  )
}

export default function ProgressPage() {
  const [parentName, setParentName] = useState('Parent')
  const [childName, setChildName] = useState('Student')

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: p } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
      if (p?.full_name) setParentName(p.full_name)
      const { data: l } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id).single()
      if (!l) return
      const { data: c } = await supabase.from('profiles').select('full_name').eq('id', l.student_id).single()
      if (c?.full_name) setChildName(c.full_name)
    }
    load()
  }, [])

  const completed = CHAPTERS.filter(c => c.completed).length
  const avg = Math.round(CHAPTERS.filter(c => c.score).reduce((a, c) => a + (c.score || 0), 0) / CHAPTERS.filter(c => c.score).length)

  return (
    <ParentSidebarLayout parentName={parentName}>
      <PageShell title="Progress" subtitle={`${childName} · ${completed} of 8 chapters completed · ${avg}% average score`} maxWidth="820px">

        {/* Overall bar */}
        <div className="card" style={{ padding: '16px 20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px', color: 'var(--gray-700)' }}>English — overall progress</p>
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', color: 'var(--brand)' }}>{completed}/8 chapters</p>
          </div>
          <div className="progress-bar" style={{ height: '8px' }}>
            <div className="progress-fill" style={{ width: `${Math.round((completed / 8) * 100)}%` }}/>
          </div>
        </div>

        {/* Chapters */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {CHAPTERS.map((ch, i) => (
            <div key={ch.id} style={{ padding: '16px 20px', borderBottom: i < CHAPTERS.length - 1 ? '1px solid var(--border-subtle)' : 'none', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>

              {/* Number / check */}
              <div style={{ width: '32px', height: '32px', minWidth: '32px', borderRadius: 'var(--radius-pill)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: ch.completed ? 'var(--brand-tint)' : ch.sectionsRead > 0 ? 'var(--amber-bg)' : 'var(--gray-100)', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '13px', color: ch.completed ? 'var(--brand-deep)' : ch.sectionsRead > 0 ? 'var(--amber)' : 'var(--gray-400)' }}>
                {ch.completed ? '✓' : ch.id}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px', color: 'var(--gray-900)' }}>{ch.title}</p>
                  <span className={`badge ${TYPE_BADGE[ch.type] || 'badge-neutral'}`} style={{ fontSize: '11px', padding: '2px 8px' }}>{ch.type}</span>
                </div>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: ch.score !== null ? '8px' : 0 }}>
                  {[{ l: 'Sections', v: `${ch.sectionsRead}/7` }, { l: 'Time', v: `${ch.timeSpent}m` }, { l: 'Attempts', v: String(ch.attempts) }].map(({ l, v }) => (
                    <div key={l}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gray-400)', marginBottom: '1px' }}>{l}</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', color: 'var(--gray-700)' }}>{v}</p>
                    </div>
                  ))}
                </div>
                {ch.score !== null && (
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gray-400)', marginBottom: '5px' }}>Quiz score</p>
                    <ScoreBar score={ch.score}/>
                  </div>
                )}
              </div>

              {/* Status pill */}
              <span className={`badge ${ch.completed ? 'badge-green' : ch.sectionsRead > 0 ? 'badge-amber' : 'badge-neutral'}`} style={{ fontSize: '11px', padding: '3px 10px', flexShrink: 0 }}>
                {ch.completed ? 'Done' : ch.sectionsRead > 0 ? 'In progress' : 'Not started'}
              </span>
            </div>
          ))}
        </div>

      </PageShell>
    </ParentSidebarLayout>
  )
}
