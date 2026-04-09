'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'

const RATING_QS = [
  { id:'rating_overall',   label:'Overall satisfaction' },
  { id:'rating_content',   label:'Quality of lesson content' },
  { id:'rating_child_eng', label:"Your child's engagement" },
  { id:'rating_parent_db', label:'Usefulness of parent dashboard' },
]
const RLABELS = ['','Poor','Fair','Good','Great','Excellent']

export default function FeedbackPage() {
  const [parentName, setParentName] = useState('Parent')
  const [userId,     setUserId]     = useState<string|null>(null)
  const [ratings,    setRatings]    = useState<Record<string,number>>({})
  const [liked,      setLiked]      = useState('')
  const [improve,    setImprove]    = useState('')
  const [features,   setFeatures]   = useState('')
  const [loading,    setLoading]    = useState(false)
  const [error,      setError]      = useState('')
  const [done,       setDone]       = useState(false)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data:{ user } } = await supabase.auth.getUser()
      if (!user) return
      setUserId(user.id)
      const { data:p } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .maybeSingle()
      if (p?.full_name) setParentName(p.full_name)
    }
    load()
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!userId) { setError('Not logged in. Please refresh and try again.'); return }

    setLoading(true)
    try {
      const supabase = createClient()
      const { error: insertError } = await supabase.from('feedback').insert({
        parent_id:        userId,
        rating_overall:   ratings['rating_overall']   || null,
        rating_content:   ratings['rating_content']   || null,
        rating_child_eng: ratings['rating_child_eng'] || null,
        rating_parent_db: ratings['rating_parent_db'] || null,
        liked:            liked    || null,
        improve:          improve  || null,
        features:         features || null,
      })

      if (insertError) throw insertError
      setDone(true)
    } catch (err: any) {
      console.error('Feedback error:', err)
      setError(err.message || 'Failed to submit. Please try again.')
    }
    setLoading(false)
  }

  const reset = () => {
    setDone(false)
    setRatings({})
    setLiked('')
    setImprove('')
    setFeatures('')
    setError('')
  }

  if (done) return (
    <ParentSidebarLayout parentName={parentName}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'70vh', padding:'40px' }}>
        <div style={{ textAlign:'center', maxWidth:'360px' }}>
          <div style={{ width:'60px', height:'60px', borderRadius:'50%', background:'#D8F3DC', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path d="M5 13l6 6 10-10" stroke="#2D6A4F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'22px', color:'#1B4332', marginBottom:'8px' }}>Thank you!</h2>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280', lineHeight:1.6, marginBottom:'20px' }}>
            Your feedback has been saved. We read every response and it directly shapes what we build next.
          </p>
          <button onClick={reset} style={{ background:'#D8F3DC', color:'#1B4332', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', padding:'9px 20px', borderRadius:'8px', border:'none', cursor:'pointer' }}>
            Submit another
          </button>
        </div>
      </div>
    </ParentSidebarLayout>
  )

  return (
    <ParentSidebarLayout parentName={parentName}>
      <div style={{ maxWidth:'600px', padding:'28px 28px 60px' }}>
        <h1 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'22px', color:'#1B4332', marginBottom:'4px' }}>Feedback</h1>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280', marginBottom:'24px' }}>
          Help us improve — we read every response.
        </p>

        <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

          {/* Rating questions */}
          <div style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', overflow:'hidden' }}>
            {RATING_QS.map(({ id, label }, i, arr) => (
              <div key={id} style={{ padding:'14px 18px', borderBottom:i<arr.length-1?'1px solid #F3F4F6':'none' }}>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#374151', marginBottom:'10px' }}>{label}</p>
                <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                  {[1,2,3,4,5].map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRatings(p => ({ ...p, [id]:s }))}
                      style={{
                        width:'38px', height:'38px', borderRadius:'8px', cursor:'pointer',
                        border:`1.5px solid ${ratings[id]>=s ? '#2D6A4F' : '#E5E7EB'}`,
                        background: ratings[id]>=s ? '#D8F3DC' : 'white',
                        fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px',
                        color: ratings[id]>=s ? '#1B4332' : '#9CA3AF',
                      }}>
                      {s}
                    </button>
                  ))}
                  {ratings[id] && (
                    <span style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#9CA3AF', marginLeft:'4px' }}>
                      {RLABELS[ratings[id]]}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Open ended */}
          <div style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', padding:'20px', display:'flex', flexDirection:'column', gap:'16px' }}>
            {[
              { label:'What do you like most?',             val:liked,    set:setLiked,    ph:'What is working well...' },
              { label:'What should we improve?',            val:improve,  set:setImprove,  ph:'Be honest — we want to know...' },
              { label:'What features would you like next?', val:features, set:setFeatures, ph:'e.g. video lessons, more subjects...' },
            ].map(({ label, val, set, ph }) => (
              <div key={label}>
                <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'#6B7280', marginBottom:'6px', textTransform:'uppercase', letterSpacing:'0.05em' }}>
                  {label}
                </label>
                <textarea
                  value={val}
                  onChange={e => set(e.target.value)}
                  placeholder={ph}
                  style={{ width:'100%', padding:'10px 14px', fontFamily:'var(--font-body)', fontSize:'14px', color:'#374151', background:'#F9FAFB', border:'1.5px solid #E5E7EB', borderRadius:'8px', outline:'none', resize:'vertical', minHeight:'72px', lineHeight:1.6 }}
                />
              </div>
            ))}
          </div>

          {error && (
            <div style={{ background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:'10px', padding:'12px 16px' }}>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#991B1B' }}>⚠️ {error}</p>
            </div>
          )}

          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px' }}>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#9CA3AF' }}>
              Responses are private and go directly to our team.
            </p>
            <button
              type="submit"
              disabled={loading}
              style={{ background:'#2D6A4F', color:'white', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', padding:'10px 22px', borderRadius:'8px', border:'none', cursor:loading?'not-allowed':'pointer', opacity:loading?0.7:1, flexShrink:0 }}>
              {loading ? 'Saving...' : 'Submit feedback'}
            </button>
          </div>

        </form>
      </div>
    </ParentSidebarLayout>
  )
}
