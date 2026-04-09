'use client'

// ── WRITING PAGE ──────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'
import PageShell from '@/components/PageShell'

const PROMPTS = [
  { id: 1, chapter: 'Whistles and Shaving Bristles', prompt: 'Write about a rule in your family that you think is unusual but useful.', submitted: true,  score: 16, max: 20, status: 'released', deadline: 'Apr 5' },
  { id: 2, chapter: 'The Fun They Had',              prompt: 'Do you think schools of the future will be better or worse than today?',  submitted: true,  score: null, max: 20, status: 'pending',  deadline: 'Apr 10' },
  { id: 3, chapter: 'In Morning Dew',                prompt: 'Write about something you observe every day but never really think about.', submitted: false, score: null, max: 20, status: 'assigned', deadline: 'Apr 15' },
]

function ScoreBar({ score, max }: { score: number; max: number }) {
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

export function WritingPage() {
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

  return (
    <ParentSidebarLayout parentName={parentName}>
      <PageShell title="Writing prompts" subtitle={`${childName}'s writing assignments and scores`} maxWidth="760px">

        <div style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', background: 'var(--gray-50)', border: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-500)', lineHeight: 1.6 }}>
            Writing prompts are assigned per chapter. AI evaluates the submission first, then our team reviews it before releasing the final score.
          </p>
        </div>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {PROMPTS.map((wp, i) => (
            <div key={wp.id} style={{ padding: '18px 20px', borderBottom: i < PROMPTS.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{wp.chapter}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px', color: 'var(--gray-900)', lineHeight: 1.5 }}>{wp.prompt}</p>
                </div>
                <span className={`badge ${wp.status === 'released' ? 'badge-green' : wp.status === 'pending' ? 'badge-amber' : 'badge-neutral'}`} style={{ fontSize: '11px', flexShrink: 0 }}>
                  {wp.status === 'released' ? '✓ Score released' : wp.status === 'pending' ? '⏳ Under review' : '📝 Not submitted'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                {[{ l: 'Deadline', v: wp.deadline }, { l: 'Submitted', v: wp.submitted ? 'Yes' : 'No' }].map(({ l, v }) => (
                  <div key={l}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gray-400)', marginBottom: '1px' }}>{l}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', color: l === 'Submitted' ? (wp.submitted ? 'var(--brand)' : 'var(--red)') : 'var(--gray-700)' }}>{v}</p>
                  </div>
                ))}
                {wp.score !== null && (
                  <div style={{ flex: 1, minWidth: '140px' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gray-400)', marginBottom: '5px' }}>Score</p>
                    <ScoreBar score={wp.score} max={wp.max}/>
                  </div>
                )}
                {wp.submitted && wp.score === null && <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--amber)', fontStyle: 'italic' }}>Awaiting admin review</p>}
              </div>
            </div>
          ))}
        </div>

      </PageShell>
    </ParentSidebarLayout>
  )
}

export default WritingPage
