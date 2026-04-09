'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'
import PageShell from '@/components/PageShell'

const CHAPTERS = [
  { id: 1, title: 'Whistles and Shaving Bristles', type: 'Prose',     completed: true,  score: 88, timeSpent: 18, sectionsRead: 7 },
  { id: 2, title: 'If I Were Lord of Tartary',     type: 'Poetry',    completed: true,  score: 76, timeSpent: 14, sectionsRead: 7 },
  { id: 3, title: 'The Fun They Had',              type: 'Story',     completed: true,  score: 92, timeSpent: 20, sectionsRead: 7 },
  { id: 4, title: 'In Morning Dew',                type: 'Poetry',    completed: false, score: null, timeSpent: 8, sectionsRead: 3 },
  { id: 5, title: 'The Boy Who Outran the Wind',   type: 'Biography', completed: false, score: null, timeSpent: 0, sectionsRead: 0 },
  { id: 6, title: 'The Blind Boy',                 type: 'Poetry',    completed: false, score: null, timeSpent: 0, sectionsRead: 0 },
  { id: 7, title: 'Three Questions',               type: 'Story',     completed: false, score: null, timeSpent: 0, sectionsRead: 0 },
  { id: 8, title: 'From a Railway Carriage',       type: 'Poetry',    completed: false, score: null, timeSpent: 0, sectionsRead: 0 },
]

function PasswordCard({ childName, childId }: { childName: string; childId: string }) {
  const [open, setOpen] = useState(false)
  const [pw, setPw] = useState(''); const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false); const [msg, setMsg] = useState(''); const [err, setErr] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(''); setMsg('')
    if (pw !== confirm) { setErr('Passwords do not match.'); return }
    if (pw.length < 8) { setErr('Minimum 8 characters.'); return }
    setLoading(true)
    const res = await fetch('/api/reset-child-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ childId, newPassword: pw }) })
    if (res.ok) { setMsg(`Password updated. Share it with ${childName}.`); setPw(''); setConfirm(''); setOpen(false) }
    else setErr('Update failed. Please try again.')
    setLoading(false)
  }

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: open ? '1px solid var(--border-subtle)' : 'none' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px', color: 'var(--gray-900)', marginBottom: '2px' }}>{childName}&apos;s password</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gray-400)' }}>Only you can change your child&apos;s login password</p>
        </div>
        <button onClick={() => { setOpen(p => !p); setErr(''); setMsg('') }} className="btn-ghost" style={{ fontSize: '13px', padding: '5px 14px' }}>
          {open ? 'Cancel' : 'Change'}
        </button>
      </div>
      {msg && <div style={{ padding: '10px 20px', background: 'var(--green-ok-bg)', borderBottom: '1px solid var(--border-subtle)' }}><p style={{ fontSize: '13px', color: 'var(--green-ok)', fontFamily: 'var(--font-body)' }}>✓ {msg}</p></div>}
      {open && (
        <form onSubmit={submit} style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div><label className="label">New password</label><input type="password" className="input" placeholder="Minimum 8 characters" value={pw} onChange={e => setPw(e.target.value)} required minLength={8}/></div>
          <div><label className="label">Confirm password</label><input type="password" className="input" placeholder="Re-enter password" value={confirm} onChange={e => setConfirm(e.target.value)} required/></div>
          {err && <p style={{ fontSize: '13px', color: 'var(--red)', fontFamily: 'var(--font-body)' }}>{err}</p>}
          <button type="submit" disabled={loading} className="btn-primary" style={{ alignSelf: 'flex-start', opacity: loading ? 0.7 : 1 }}>{loading ? 'Updating...' : 'Update password'}</button>
        </form>
      )}
    </div>
  )
}

export default function OverviewPage() {
  const [parentName, setParentName] = useState('Parent')
  const [child, setChild] = useState<{ name: string; id: string } | null>(null)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: p } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
      if (p?.full_name) setParentName(p.full_name)
      const { data: l } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id).single()
      if (!l) return
      const { data: c } = await supabase.from('profiles').select('id, full_name').eq('id', l.student_id).single()
      if (c) setChild({ id: c.id, name: c.full_name || 'Student' })
    }
    load()
  }, [])

  const completed = CHAPTERS.filter(c => c.completed).length
  const timeTotal = CHAPTERS.reduce((a, c) => a + c.timeSpent, 0)
  const avgScore  = Math.round(CHAPTERS.filter(c => c.score).reduce((a, c) => a + (c.score || 0), 0) / CHAPTERS.filter(c => c.score).length)
  const weak      = CHAPTERS.filter(c => c.score !== null && (c.score || 0) < 70)
  const childName = child?.name || 'Student'

  return (
    <ParentSidebarLayout parentName={parentName}>
      <PageShell title="Overview" subtitle={`${childName}'s performance and account summary`} maxWidth="820px">

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '28px' }}>
          {[
            { label: 'Chapters done', value: `${completed}/8`, emoji: '📚' },
            { label: 'Avg score',     value: `${avgScore}%`,   emoji: '⭐' },
            { label: 'Time studying', value: `${timeTotal}m`,  emoji: '⏱️' },
            { label: 'Day streak',    value: '5 days',          emoji: '🔥' },
          ].map(({ label, value, emoji }) => (
            <div key={label} className="card" style={{ padding: '16px' }}>
              <span style={{ fontSize: '18px', display: 'block', marginBottom: '8px' }}>{emoji}</span>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '20px', color: 'var(--gray-900)', lineHeight: 1, marginBottom: '4px' }}>{value}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gray-400)' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Weak chapters */}
        {weak.length > 0 && (
          <div style={{ padding: '14px 18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--red-border)', background: 'var(--red-bg)', marginBottom: '24px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px', color: '#991B1B', marginBottom: '8px' }}>⚠️ Chapters needing attention</p>
            {weak.map(ch => (
              <div key={ch.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#B91C1C' }}>{ch.title}</p>
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px', color: 'var(--red)' }}>{ch.score}%</span>
              </div>
            ))}
          </div>
        )}

        {/* Password */}
        {child && (
          <div style={{ marginBottom: '24px' }}>
            <p className="uppercase-label" style={{ marginBottom: '10px' }}>Child password</p>
            <PasswordCard childName={child.name} childId={child.id}/>
          </div>
        )}

        {/* Subjects */}
        <div>
          <p className="uppercase-label" style={{ marginBottom: '10px' }}>Subjects</p>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {[
              { name: 'English',      emoji: '📖', completed: 3, total: 8, available: true },
              { name: 'Mathematics',  emoji: '🔢', available: false },
              { name: 'Science',      emoji: '🔬', available: false },
              { name: 'History',      emoji: '🏛️', available: false },
              { name: 'Geography',    emoji: '🌍', available: false },
              { name: 'Sanskrit',     emoji: '📜', available: false },
              { name: 'ICT',          emoji: '💻', available: false },
            ].map((s, i, arr) => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', borderBottom: i < arr.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <span style={{ fontSize: '16px' }}>{s.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: s.available ? '6px' : 0 }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px', color: s.available ? 'var(--gray-900)' : 'var(--gray-400)' }}>{s.name}</p>
                    {s.available
                      ? <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--brand)', fontWeight: 500 }}>{s.completed}/{s.total}</p>
                      : <span className="badge badge-neutral" style={{ fontSize: '11px', padding: '2px 8px' }}>Coming soon</span>}
                  </div>
                  {s.available && (
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${Math.round(((s.completed || 0) / (s.total || 1)) * 100)}%` }}/>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </PageShell>
    </ParentSidebarLayout>
  )
}
