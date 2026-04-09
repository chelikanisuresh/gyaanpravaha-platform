'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'

interface Child {
  id: string
  full_name: string
  email: string
  enrolledDate: string
  renewsDate: string
}

// Mock enrollment dates per child — will come from subscriptions table
const MOCK_DATES = [
  { enrolled: 'Apr 2026', renews: 'Mar 2027' },
  { enrolled: 'Apr 2026', renews: 'Mar 2027' },
  { enrolled: 'May 2026', renews: 'Apr 2027' },
]

const INCLUDED_FEATURES = [
  'All subjects — chapter by chapter',
  'Smart quizzes with instant feedback',
  'Writing prompts and AI evaluation',
  'Parent progress dashboard',
  'Password control for parents',
  'AI doubt solver',
]

export default function SubscriptionPage() {
  const [parentName, setParentName] = useState('Parent')
  const [children,   setChildren]   = useState<Child[]>([])
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: p } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .maybeSingle()
      if (p?.full_name) setParentName(p.full_name)

      const { data: links } = await supabase
        .from('parent_student_links')
        .select('student_id')
        .eq('parent_id', user.id)

      if (links?.length) {
        const ids = links.map(l => l.student_id)
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, full_name, email')
          .in('id', ids)

        if (profiles) {
          const enriched = profiles.map((c, idx) => ({
            ...c,
            full_name: c.full_name || 'Student',
            enrolledDate: MOCK_DATES[idx]?.enrolled || 'Apr 2026',
            renewsDate:   MOCK_DATES[idx]?.renews   || 'Mar 2027',
          })) as Child[]
          setChildren(enriched)
        }
      }
      setLoading(false)
    }
    load()
  }, [])

  const totalAmount = children.length * 2499

  if (loading) return (
    <ParentSidebarLayout parentName={parentName}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'60vh' }}>
        <p style={{ fontFamily:'var(--font-body)', color:'#9CA3AF', fontSize:'14px' }}>Loading...</p>
      </div>
    </ParentSidebarLayout>
  )

  return (
    <ParentSidebarLayout parentName={parentName}>
      <div style={{ maxWidth:'580px', padding:'28px 28px 60px' }}>
        <h1 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'22px', color:'#1B4332', marginBottom:'4px' }}>Subscription</h1>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280', marginBottom:'24px' }}>
          {children.length} {children.length === 1 ? 'child enrolled' : 'children enrolled'} · ₹{totalAmount.toLocaleString('en-IN')} per year total
        </p>

        {/* One card per child */}
        <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'10px' }}>
          Enrolled children
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'24px' }}>
          {children.map((child, idx) => (
            <div key={child.id} style={{ background:'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius:'16px', padding:'20px' }}>
              {/* Child info */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                  <div style={{ width:'36px', height:'36px', minWidth:'36px', borderRadius:'50%', background:'#74C69D', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'14px', color:'#1B4332', flexShrink:0 }}>
                    {(child.full_name||'S').charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'15px', color:'white', lineHeight:1 }}>{child.full_name}</p>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'rgba(255,255,255,0.55)', marginTop:'2px' }}>Annual Plan — Grade 6</p>
                  </div>
                </div>
                <span style={{ background:'#74C69D', color:'#1B4332', fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'11px', padding:'4px 12px', borderRadius:'20px' }}>Active</span>
              </div>

              {/* Billing details */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'8px' }}>
                {[
                  { l:'Amount', v:'₹2,499' },
                  { l:'Enrolled', v:child.enrolledDate },
                  { l:'Renews', v:child.renewsDate },
                ].map(({ l, v }) => (
                  <div key={l} style={{ background:'rgba(255,255,255,0.1)', borderRadius:'9px', padding:'10px 12px' }}>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:'rgba(255,255,255,0.5)', marginBottom:'3px' }}>{l}</p>
                    <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'14px', color:'white' }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Total summary */}
        {children.length > 1 && (
          <div style={{ background:'#F0FDF4', border:'1px solid #D8F3DC', borderRadius:'12px', padding:'14px 18px', marginBottom:'24px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#1B4332', marginBottom:'2px' }}>Total annual spend</p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#40916C' }}>{children.length} children × ₹2,499</p>
            </div>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'20px', color:'#1B4332' }}>₹{totalAmount.toLocaleString('en-IN')}</p>
          </div>
        )}

        {/* What is included */}
        <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'10px' }}>What is included</p>
        <div style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', overflow:'hidden', marginBottom:'16px' }}>
          {INCLUDED_FEATURES.map((item, i, arr) => (
            <div key={item} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'11px 18px', borderBottom:i<arr.length-1?'1px solid #F9FAFB':'none' }}>
              <div style={{ width:'16px', height:'16px', borderRadius:'50%', background:'#D8F3DC', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#374151' }}>{item}</p>
            </div>
          ))}
        </div>

        {/* Renewal notice */}
        <div style={{ background:'#FEF3C7', border:'1px solid #FDE68A', borderRadius:'12px', padding:'14px 18px' }}>
          <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#92400E', marginBottom:'4px' }}>Renewal reminders</p>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#B45309', lineHeight:1.6 }}>
            You will receive a reminder 30 days before each child&apos;s renewal date. Questions? hello@gyaanpravaha.in
          </p>
        </div>

      </div>
    </ParentSidebarLayout>
  )
}
