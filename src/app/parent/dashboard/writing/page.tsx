'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'

const WRITING_PROMPTS = [
  { id: 1, chapter: 'Whistles and Shaving Bristles', prompt: 'Write about a rule in your family that you think is unusual but useful.', submitted: true, score: 16, maxScore: 20, status: 'released', deadline: 'Apr 5' },
  { id: 2, chapter: 'The Fun They Had', prompt: 'Do you think schools of the future will be better or worse than today? Give reasons.', submitted: true, score: null, maxScore: 20, status: 'pending', deadline: 'Apr 10' },
  { id: 3, chapter: 'In Morning Dew', prompt: 'Write about something you observe every day but have never really thought about.', submitted: false, score: null, maxScore: 20, status: 'assigned', deadline: 'Apr 15' },
]

function ScoreBar({ score, max = 20 }: { score: number; max?: number }) {
  const pct = Math.round((score / max) * 100)
  const color = pct >= 80 ? '#10B981' : pct >= 60 ? '#F59E0B' : '#EF4444'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ flex: 1, height: '8px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '4px', transition: 'width 0.8s ease' }}/>
      </div>
      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color, minWidth: '40px' }}>{score}/{max}</span>
    </div>
  )
}

export default function WritingPage() {
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

  const submitted = WRITING_PROMPTS.filter(w => w.submitted).length
  const released = WRITING_PROMPTS.filter(w => w.status === 'released').length

  return (
    <ParentSidebarLayout parentName={parentName} activeTab="writing">
      <div style={{ maxWidth: '760px', padding: '24px 24px 60px' }}>

        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: '#1B4332', marginBottom: '4px' }}>Writing prompts</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>{childName} · {submitted} submitted · {released} scores released</p>
        </div>

        {/* Info banner */}
        <div style={{ background: '#F0FDF4', border: '1px solid #D8F3DC', borderRadius: '12px', padding: '14px 18px', marginBottom: '20px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <span style={{ fontSize: '18px', flexShrink: 0 }}>ℹ️</span>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#065F46', lineHeight: 1.6 }}>
            Writing prompts are assigned per chapter. AI evaluates the submission first, then our team reviews it before releasing the final score to you.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {WRITING_PROMPTS.map(wp => (
            <div key={wp.id} style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px 22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#9CA3AF', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{wp.chapter}</p>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: '#1B4332', lineHeight: 1.45 }}>{wp.prompt}</p>
                </div>
                <span style={{
                  padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontFamily: 'var(--font-heading)', fontWeight: 700, flexShrink: 0,
                  background: wp.status === 'released' ? '#D8F3DC' : wp.status === 'pending' ? '#FEF3C7' : '#F3F4F6',
                  color: wp.status === 'released' ? '#1B4332' : wp.status === 'pending' ? '#92400E' : '#6B7280',
                }}>
                  {wp.status === 'released' ? '✓ Score released' : wp.status === 'pending' ? '⏳ Under review' : '📝 Not submitted'}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#9CA3AF', marginBottom: '2px' }}>Deadline</p>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#374151' }}>{wp.deadline}</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#9CA3AF', marginBottom: '2px' }}>Submitted by {childName}</p>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: wp.submitted ? '#10B981' : '#EF4444' }}>
                    {wp.submitted ? 'Yes ✓' : 'Not yet'}
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#9CA3AF', marginBottom: '2px' }}>Max marks</p>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#374151' }}>{wp.maxScore}</p>
                </div>
                {wp.score !== null && (
                  <div style={{ flex: 1, minWidth: '160px' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#9CA3AF', marginBottom: '6px' }}>Score</p>
                    <ScoreBar score={wp.score} max={wp.maxScore}/>
                  </div>
                )}
                {wp.submitted && wp.score === null && (
                  <div style={{ background: '#FEF3C7', borderRadius: '8px', padding: '8px 12px' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#92400E' }}>Score will appear here after admin review</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ParentSidebarLayout>
  )
}
