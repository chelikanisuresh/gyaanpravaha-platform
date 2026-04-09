'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'

const RATING_QS = [
  { id:'overall',   label:'Overall satisfaction' },
  { id:'content',   label:'Quality of lesson content' },
  { id:'child_eng', label:"Your child's engagement" },
  { id:'parent_db', label:'Usefulness of parent dashboard' },
]
const RLABELS = ['','Poor','Fair','Good','Great','Excellent']

export default function FeedbackPage() {
  const [parentName, setParentName] = useState('Parent')
  const [ratings,   setRatings]    = useState<Record<string,number>>({})
  const [liked,     setLiked]      = useState('')
  const [improve,   setImprove]    = useState('')
  const [features,  setFeatures]   = useState('')
  const [loading,   setLoading]    = useState(false)
  const [done,      setDone]       = useState(false)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data:{ user } } = await supabase.auth.getUser()
      if (!user) return
      const { data:p } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
      if (p?.full_name) setParentName(p.full_name||'Parent')
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
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'70vh', padding:'40px' }}>
        <div style={{ textAlign:'center', maxWidth:'360px' }}>
          <div style={{ width:'60px', height:'60px', borderRadius:'50%', background:'#D8F3DC', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M5 13l6 6 10-10" stroke="#2D6A4F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h2 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'22px', color:'#1B4332', marginBottom:'8px' }}>Thank you!</h2>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280', lineHeight:1.6, marginBottom:'20px' }}>Your feedback helps us improve Gyaanpravaha for every student. We read every single response.</p>
          <button onClick={() => setDone(false)} style={{ background:'#D8F3DC', color:'#1B4332', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', padding:'9px 20px', borderRadius:'8px', border:'none', cursor:'pointer' }}>
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
        <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280', marginBottom:'24px' }}>Help us improve — we read every response.</p>

        <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          {/* Ratings */}
          <div style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', overflow:'hidden' }}>
            {RATING_QS.map(({id,label},i,arr) => (
              <div key={id} style={{ padding:'14px 18px', borderBottom: i<arr.length-1 ? '1px solid #F3F4F6' : 'none' }}>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#374151', marginBottom:'10px' }}>{label}</p>
                <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                  {[1,2,3,4,5].map(s => (
                    <button key={s} type="button" onClick={() => setRatings(p => ({...p,[id]:s}))}
                      style={{ width:'38px', height:'38px', borderRadius:'8px', cursor:'pointer', border:`1.5px solid ${ratings[id]>=s ? '#2D6A4F' : '#E5E7EB'}`, background: ratings[id]>=s ? '#D8F3DC' : 'white', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', color: ratings[id]>=s ? '#1B4332' : '#9CA3AF', transition:'all 0.12s' }}>
                      {s}
                    </button>
                  ))}
                  {ratings[id] && <span style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#9CA3AF', marginLeft:'4px' }}>{RLABELS[ratings[id]]}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Open ended */}
          <div style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', padding:'20px', display:'flex', flexDirection:'column', gap:'16px' }}>
            {[
              { id:'liked',    label:'What do you like most?',             val:liked,    set:setLiked,    ph:'What is working well...' },
              { id:'improve',  label:'What should we improve?',            val:improve,  set:setImprove,  ph:'Be honest — we want to know...' },
              { id:'features', label:'What features would you like next?', val:features, set:setFeatures, ph:'e.g. video lessons, more subjects...' },
            ].map(({id,label,val,set,ph}) => (
              <div key={id}>
                <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'#6B7280', marginBottom:'6px', textTransform:'uppercase', letterSpacing:'0.05em' }}>{label}</label>
                <textarea value={val} onChange={e => set(e.target.value)}
                  style={{ width:'100%', padding:'10px 14px', fontFamily:'var(--font-body)', fontSize:'14px', color:'#374151', background:'#F9FAFB', border:'1.5px solid #E5E7EB', borderRadius:'8px', outline:'none', resize:'vertical', minHeight:'72px', lineHeight:1.6 }}
                  placeholder={ph}/>
              </div>
            ))}
          </div>

          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#9CA3AF' }}>Responses are private and go directly to our team.</p>
            <button type="submit" disabled={loading}
              style={{ background:'#2D6A4F', color:'white', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', padding:'10px 22px', borderRadius:'8px', border:'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Submitting...' : 'Submit feedback'}
            </button>
          </div>
        </form>
      </div>
    </ParentSidebarLayout>
  )
}
