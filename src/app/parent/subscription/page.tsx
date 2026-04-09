'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'

export default function SubscriptionPage() {
  const [parentName, setParentName] = useState('Parent')

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data:{ user } } = await supabase.auth.getUser()
      if (!user) return
      const { data:p } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
      if (p?.full_name) setParentName(p.full_name)
    }
    load()
  }, [])

  return (
    <ParentSidebarLayout parentName={parentName}>
      <div style={{ maxWidth:'520px', padding:'28px 28px 60px' }}>
        <h1 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'22px', color:'#1B4332', marginBottom:'4px' }}>Subscription</h1>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280', marginBottom:'24px' }}>Your current plan and billing details</p>

        {/* Plan card */}
        <div style={{ background:'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius:'16px', padding:'22px', marginBottom:'16px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'18px' }}>
            <div>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#74C69D', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'6px' }}>Current plan</p>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'22px', color:'white' }}>Annual Plan</p>
            </div>
            <span style={{ background:'#74C69D', color:'#1B4332', fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'11px', padding:'4px 12px', borderRadius:'20px' }}>Active</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px' }}>
            {[{l:'Paid',v:'₹2,499'},{l:'Started',v:'Apr 2026'},{l:'Renews',v:'Mar 2027'}].map(({l,v}) => (
              <div key={l} style={{ background:'rgba(255,255,255,0.1)', borderRadius:'9px', padding:'11px' }}>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:'rgba(255,255,255,0.5)', marginBottom:'3px' }}>{l}</p>
                <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'14px', color:'white' }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Included */}
        <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'10px' }}>What is included</p>
        <div style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', overflow:'hidden', marginBottom:'16px' }}>
          {['All subjects — chapter by chapter','Smart quizzes with instant feedback','Writing prompts and AI evaluation','Parent progress dashboard','Password control for parents','AI doubt solver'].map((item,i,arr) => (
            <div key={item} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'11px 18px', borderBottom: i<arr.length-1 ? '1px solid #F9FAFB' : 'none' }}>
              <div style={{ width:'16px', height:'16px', borderRadius:'50%', background:'#D8F3DC', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#374151' }}>{item}</p>
            </div>
          ))}
        </div>

        {/* Renewal */}
        <div style={{ background:'#F0FDF4', border:'1px solid #D8F3DC', borderRadius:'12px', padding:'14px 18px' }}>
          <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#1B4332', marginBottom:'4px' }}>Auto-renewal in March 2027</p>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#40916C', lineHeight:1.5 }}>You will get a reminder 30 days before renewal. Questions? hello@gyaanpravaha.in</p>
        </div>
      </div>
    </ParentSidebarLayout>
  )
}
