'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'
import PageShell from '@/components/PageShell'

const RATINGS = [
  { id: 'overall',    label: 'Overall satisfaction' },
  { id: 'content',   label: 'Quality of lesson content' },
  { id: 'child_eng', label: "Your child's engagement" },
  { id: 'parent_db', label: 'Usefulness of parent dashboard' },
]
const LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent']

export default function FeedbackPage() {
  const [parentName, setParentName] = useState('Parent')
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [liked, setLiked] = useState('')
  const [improve, setImprove] = useState('')
  const [features, setFeatures] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: p } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
      if (p?.full_name) setParentName(p.full_name)
    }
    load()
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setDone(true); setLoading(false)
  }

  if (done) return (
    <ParentSidebarLayout parentName={parentName}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', padding: '40px' }}>
        <div style={{ textAlign: 'center', maxWidth: '380px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-pill)', background: 'var(--brand-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '20px', color: 'var(--gray-900)', marginBottom: '8px' }}>Thank you!</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: '20px' }}>Your feedback helps us improve Gyaanpravaha for every student. We read every response.</p>
          <button onClick={() => setDone(false)} className="btn-ghost">Submit another</button>
        </div>
      </div>
    </ParentSidebarLayout>
  )

  return (
    <ParentSidebarLayout parentName={parentName}>
      <PageShell title="Feedback" subtitle="Help us make Gyaanpravaha better — we read every response." maxWidth="600px">
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {RATINGS.map(({ id, label }, i, arr) => (
              <div key={id} style={{ padding: '14px 20px', borderBottom: i < arr.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-700)', marginBottom: '10px' }}>{label}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {[1,2,3,4,5].map(s => (
                    <button key={s} type="button" onClick={() => setRatings(p => ({ ...p, [id]: s }))} style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '1px solid ' + (ratings[id] >= s ? 'var(--brand)' : 'var(--border-medium)'), background: ratings[id] >= s ? 'var(--brand-tint)' : 'var(--white)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px', color: ratings[id] >= s ? 'var(--brand-deep)' : 'var(--gray-400)', transition: 'all 0.12s' }}>{s}</button>
                  ))}
                  {ratings[id] && <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gray-400)', marginLeft: '4px' }}>{LABELS[ratings[id]]}</span>}
                </div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { id: 'liked',    label: 'What do you like most?',         val: liked,    set: setLiked,    ph: 'What is working well...' },
              { id: 'improve',  label: 'What should we improve?',        val: improve,  set: setImprove,  ph: 'Be honest — we want to know...' },
              { id: 'features', label: 'What would you like to see next?', val: features, set: setFeatures, ph: 'e.g. video lessons, more subjects...' },
            ].map(({ id, label, val, set, ph }) => (
              <div key={id}>
                <label className="label" htmlFor={id}>{label}</label>
                <textarea id={id} value={val} onChange={e => set(e.target.value)} style={{ width: '100%', padding: '10px 14px', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-700)', background: 'var(--gray-50)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', outline: 'none', resize: 'vertical', minHeight: '72px', lineHeight: 1.6 }} placeholder={ph}/>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gray-400)' }}>Your response is private and goes directly to our team.</p>
            <button type="submit" disabled={loading} className="btn-primary" style={{ opacity: loading ? 0.7 : 1 }}>{loading ? 'Submitting...' : 'Submit feedback'}</button>
          </div>
        </form>
      </PageShell>
    </ParentSidebarLayout>
  )
}
