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

const WRITING_PROMPTS = [
  { id: 1, chapter: 'Whistles and Shaving Bristles', prompt: 'Write about a rule in your family that you think is unusual but useful.', submitted: true, score: 16, maxScore: 20, status: 'released', deadline: 'Apr 5' },
  { id: 2, chapter: 'The Fun They Had', prompt: 'Do you think schools of the future will be better or worse than today?', submitted: true, score: null, maxScore: 20, status: 'pending', deadline: 'Apr 10' },
  { id: 3, chapter: 'In Morning Dew', prompt: 'Write about something you observe every day but have never really thought about.', submitted: false, score: null, maxScore: 20, status: 'assigned', deadline: 'Apr 15' },
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

function PasswordResetCard({ childName, childId }: { childName: string; childId: string }) {
  const [showForm, setShowForm] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    if (newPassword !== confirmPassword) { setError('Passwords do not match.'); return }
    if (newPassword.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true)
    const res = await fetch('/api/reset-child-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ childId, newPassword }),
    })
    if (res.ok) {
      setMessage(`Password updated! Share the new password with ${childName}.`)
      setNewPassword('')
      setConfirmPassword('')
      setShowForm(false)
    } else {
      setError('Failed to update password. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
      <div style={{ padding: '14px 20px', borderBottom: showForm ? '1px solid #F3F4F6' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>🔑</span>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332', marginBottom: '2px' }}>{childName}&apos;s password</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>Only you can change your child&apos;s login password</p>
          </div>
        </div>
        <button onClick={() => { setShowForm(p => !p); setError(''); setMessage('') }}
          style={{ background: showForm ? '#F3F4F6' : '#D8F3DC', color: showForm ? '#6B7280' : '#1B4332', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', border: 'none', borderRadius: '8px', padding: '7px 12px', cursor: 'pointer' }}>
          {showForm ? 'Cancel' : 'Change'}
        </button>
      </div>
      {message && <div style={{ padding: '10px 20px', background: '#D8F3DC' }}><p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#065F46' }}>✓ {message}</p></div>}
      {showForm && (
        <form onSubmit={handleReset} style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label className="label" htmlFor="newPw">New password</label>
            <input id="newPw" type="password" className="input" placeholder="Minimum 8 characters" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={8}/>
          </div>
          <div>
            <label className="label" htmlFor="confirmPw">Confirm password</label>
            <input id="confirmPw" type="password" className="input" placeholder="Re-enter password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required/>
          </div>
          {error && <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#EF4444' }}>{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '11px', fontSize: '14px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Updating...' : 'Update password'}
          </button>
        </form>
      )}
    </div>
  )
}

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'writing'>('overview')
  const [child, setChild] = useState<{ name: string; email: string; id: string } | null>(null)
  const [parentName, setParentName] = useState('Parent')

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: parentProfile } = await supabase
        .from('profiles').select('full_name').eq('id', user.id).single()
      if (parentProfile?.full_name) setParentName(parentProfile.full_name)

      const { data: links } = await supabase
        .from('parent_student_links').select('student_id').eq('parent_id', user.id).single()
      if (!links) return

      const { data: childProfile } = await supabase
        .from('profiles').select('id, full_name, email').eq('id', links.student_id).single()
      if (childProfile) setChild({ id: childProfile.id, name: childProfile.full_name || 'Student', email: childProfile.email })
    }
    fetchData()
  }, [])

  const completedChapters = CHAPTERS.filter(c => c.completed).length
  const totalTimeSpent = CHAPTERS.reduce((a, c) => a + c.timeSpent, 0)
  const avgScore = Math.round(CHAPTERS.filter(c => c.score).reduce((a, c) => a + (c.score || 0), 0) / CHAPTERS.filter(c => c.score).length)
  const weakChapters = CHAPTERS.filter(c => c.score !== null && c.score < 70)
  const childName = child?.name || 'your child'

  return (
    <ParentSidebarLayout parentName={parentName} activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as any)}>
      <style>{`
        @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .slide-up { animation: slideUp 0.4s ease forwards; }
        .card-hover { transition: transform 0.2s, box-shadow 0.2s; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(45,106,79,0.1); }
      `}</style>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px', padding: '24px 24px 60px' }}>

        {/* ── LEFT — MAIN CONTENT ── */}
        <div>
          {/* Child header */}
          <div className="slide-up" style={{ background: 'linear-gradient(135deg, #1B4332, #2D6A4F)', borderRadius: '18px', padding: '18px 22px', marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '44px', height: '44px', minWidth: '44px', borderRadius: '50%', background: '#74C69D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '18px', color: '#1B4332', flexShrink: 0 }}>
                {child?.name?.charAt(0) || 'S'}
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '17px', color: 'white', marginBottom: '2px' }}>{child?.name || 'Student'}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Grade 6</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { label: 'Chapters', value: `${completedChapters}/8` },
                { label: 'Avg', value: `${avgScore}%` },
                { label: 'Time', value: `${totalTimeSpent}m` },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '10px', padding: '8px 12px', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: '#74C69D', lineHeight: 1 }}>{value}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── OVERVIEW ── */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px' }}>
                {[
                  { label: 'Chapters', value: `${completedChapters}/8`, emoji: '📚', bg: '#D8F3DC', color: '#1B4332' },
                  { label: 'Avg score', value: `${avgScore}%`,          emoji: '⭐', bg: '#FEF3C7', color: '#92400E' },
                  { label: 'Time',      value: `${totalTimeSpent}m`,    emoji: '⏱️', bg: '#EDE9FE', color: '#5B21B6' },
                  { label: 'Streak',    value: '5 days',                emoji: '🔥', bg: '#FFE4E6', color: '#9F1239' },
                ].map(({ label, value, emoji, bg, color }) => (
                  <div key={label} style={{ background: bg, borderRadius: '12px', padding: '12px' }}>
                    <span style={{ fontSize: '18px', display: 'block', marginBottom: '6px' }}>{emoji}</span>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '18px', color, lineHeight: 1, marginBottom: '2px' }}>{value}</p>
                    <p style={{ fontSize: '11px', color: '#6B7280' }}>{label}</p>
                  </div>
                ))}
              </div>

              {weakChapters.length > 0 && (
                <div style={{ background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: '12px', padding: '14px 18px' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#991B1B', marginBottom: '8px' }}>⚠️ Needs attention</p>
                  {weakChapters.map(ch => (
                    <div key={ch.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#7F1D1D' }}>{ch.title}</p>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#EF4444' }}>{ch.score}%</span>
                    </div>
                  ))}
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#B91C1C', marginTop: '6px' }}>Encourage {childName} to review and retake the quiz.</p>
                </div>
              )}

              {child && <PasswordResetCard childName={child.name} childId={child.id}/>}

              <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
                <div style={{ padding: '12px 18px', borderBottom: '1px solid #F3F4F6' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332' }}>Subject overview</p>
                </div>
                {[
                  { name: 'English', emoji: '📖', completed: 3, total: 8, score: 85, available: true },
                  { name: 'Mathematics', emoji: '🔢', available: false },
                  { name: 'Science', emoji: '🔬', available: false },
                ].map((s, i, arr) => (
                  <div key={s.name} style={{ padding: '11px 18px', borderBottom: i < arr.length - 1 ? '1px solid #F9FAFB' : 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '16px' }}>{s.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: s.available ? '#1B4332' : '#9CA3AF' }}>{s.name}</p>
                        {s.available ? <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#2D6A4F' }}>{s.completed}/{s.total}</p> : <span style={{ fontSize: '11px', color: '#9CA3AF' }}>Coming soon</span>}
                      </div>
                      <div style={{ height: '5px', background: '#E5E7EB', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${s.available && s.total ? Math.round(((s.completed || 0) / s.total) * 100) : 0}%`, background: '#2D6A4F', borderRadius: '3px' }}/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── PROGRESS ── */}
          {activeTab === 'progress' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {CHAPTERS.map(ch => {
                const typeStyle = TYPE_COLORS[ch.type]
                return (
                  <div key={ch.id} className="card-hover" style={{ background: 'white', borderRadius: '12px', border: ch.completed ? '1px solid #D8F3DC' : '1px solid #E5E7EB', padding: '14px 18px', position: 'relative', overflow: 'hidden' }}>
                    {ch.completed && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: '#10B981', borderRadius: '12px 0 0 12px' }}/>}
                    {ch.sectionsRead > 0 && !ch.completed && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: '#F59E0B', borderRadius: '12px 0 0 12px' }}/>}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
                      <div style={{ width: '32px', height: '32px', minWidth: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: ch.completed ? '#D8F3DC' : ch.sectionsRead > 0 ? '#FEF3C7' : '#F3F4F6', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '12px', color: ch.completed ? '#1B4332' : ch.sectionsRead > 0 ? '#92400E' : '#9CA3AF' }}>
                        {ch.completed ? '✓' : ch.id}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332' }}>{ch.title}</p>
                          <span style={{ padding: '2px 7px', borderRadius: '8px', fontSize: '10px', fontFamily: 'var(--font-heading)', fontWeight: 700, background: typeStyle.bg, color: typeStyle.text }}>{ch.type}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                          {[{ label: 'Sections', value: `${ch.sectionsRead}/7` }, { label: 'Time', value: `${ch.timeSpent}m` }, { label: 'Attempts', value: ch.attempts }].map(({ label, value }) => (
                            <div key={label}><p style={{ fontSize: '10px', color: '#9CA3AF' }}>{label}</p><p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#374151' }}>{value}</p></div>
                          ))}
                          {ch.score !== null && (
                            <div style={{ flex: 1, minWidth: '120px' }}>
                              <p style={{ fontSize: '10px', color: '#9CA3AF', marginBottom: '3px' }}>Score</p>
                              <ScoreBar score={ch.score}/>
                            </div>
                          )}
                        </div>
                      </div>
                      <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '10px', fontFamily: 'var(--font-heading)', fontWeight: 700, background: ch.completed ? '#D8F3DC' : ch.sectionsRead > 0 ? '#FEF3C7' : '#F3F4F6', color: ch.completed ? '#1B4332' : ch.sectionsRead > 0 ? '#92400E' : '#9CA3AF' }}>
                        {ch.completed ? 'Done' : ch.sectionsRead > 0 ? 'In progress' : 'Not started'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* ── WRITING ── */}
          {activeTab === 'writing' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {WRITING_PROMPTS.map(wp => (
                <div key={wp.id} className="card-hover" style={{ background: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '16px 18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '10px', flexWrap: 'wrap' }}>
                    <div>
                      <p style={{ fontSize: '10px', color: '#9CA3AF', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{wp.chapter}</p>
                      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332', lineHeight: 1.4, maxWidth: '360px' }}>{wp.prompt}</p>
                    </div>
                    <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '10px', fontFamily: 'var(--font-heading)', fontWeight: 700, background: wp.status === 'released' ? '#D8F3DC' : wp.status === 'pending' ? '#FEF3C7' : '#F3F4F6', color: wp.status === 'released' ? '#1B4332' : wp.status === 'pending' ? '#92400E' : '#6B7280' }}>
                      {wp.status === 'released' ? 'Score released' : wp.status === 'pending' ? 'Under review' : 'Not submitted'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div><p style={{ fontSize: '10px', color: '#9CA3AF' }}>Deadline</p><p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#374151' }}>{wp.deadline}</p></div>
                    <div><p style={{ fontSize: '10px', color: '#9CA3AF' }}>Submitted</p><p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: wp.submitted ? '#10B981' : '#EF4444' }}>{wp.submitted ? 'Yes' : 'No'}</p></div>
                    {wp.score !== null && <div style={{ flex: 1, minWidth: '120px' }}><p style={{ fontSize: '10px', color: '#9CA3AF', marginBottom: '3px' }}>Score</p><ScoreBar score={wp.score} max={wp.maxScore}/></div>}
                    {wp.submitted && wp.score === null && <p style={{ fontSize: '11px', color: '#F59E0B', fontStyle: 'italic' }}>Awaiting admin review</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT ENGAGEMENT PANEL ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* Tip */}
          <div style={{ background: 'linear-gradient(135deg, #1B4332, #2D6A4F)', borderRadius: '14px', padding: '18px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', color: '#74C69D', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>💡 Tip for today</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white', lineHeight: 1.5, marginBottom: '6px' }}>
              Ask {childName} what they read today — even one question builds retention.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
              Children retain 40% more when they explain concepts to a parent.
            </p>
          </div>

          {/* Weekly activity */}
          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '14px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#1B4332', marginBottom: '12px' }}>📅 This week</p>
            {[
              { day: 'Mon', mins: 22 },
              { day: 'Tue', mins: 15 },
              { day: 'Wed', mins: 30 },
              { day: 'Thu', mins: 0 },
              { day: 'Fri', mins: 18 },
              { day: 'Sat', mins: 25 },
              { day: 'Sun', mins: 0 },
            ].map(({ day, mins }) => (
              <div key={day} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '10px', color: '#9CA3AF', width: '24px' }}>{day}</p>
                <div style={{ flex: 1, height: '5px', background: '#F3F4F6', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min((mins / 30) * 100, 100)}%`, background: mins > 0 ? '#2D6A4F' : '#E5E7EB', borderRadius: '3px' }}/>
                </div>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', color: mins > 0 ? '#2D6A4F' : '#9CA3AF', width: '28px', textAlign: 'right' }}>{mins > 0 ? `${mins}m` : '—'}</p>
              </div>
            ))}
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#9CA3AF', marginTop: '8px' }}>Total this week: 110 mins</p>
          </div>

          {/* Conversation starters */}
          <div style={{ background: '#FEF3C7', borderRadius: '14px', border: '1px solid #FDE68A', padding: '14px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#92400E', marginBottom: '10px' }}>🗣️ Conversation starters</p>
            {[
              '"What would you do if you were the king in Three Questions?"',
              '"Would you like to go to school in 2157 like in The Fun They Had?"',
              '"What made Milkha Singh so determined to succeed?"',
            ].map((q, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '8px', padding: '8px 10px', marginBottom: '6px', border: '1px solid #FDE68A' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#92400E', lineHeight: 1.5 }}>{q}</p>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '14px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#1B4332', marginBottom: '10px' }}>⚡ Quick actions</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { label: 'View progress', emoji: '📊', action: () => setActiveTab('progress') },
                { label: 'Check writing', emoji: '✍️', action: () => setActiveTab('writing') },
              ].map(({ label, emoji, action }) => (
                <button key={label} onClick={action} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 12px', background: '#F8FAF9', border: '1px solid #E5E7EB', borderRadius: '9px', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                  <span style={{ fontSize: '14px' }}>{emoji}</span>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '12px', color: '#374151' }}>{label}</p>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </ParentSidebarLayout>
  )
}
