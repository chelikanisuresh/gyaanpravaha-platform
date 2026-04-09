'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'

interface Child { id:string; full_name:string; email:string; enrolled:string; renews:string }

const MOCK_DATES = [
  { enrolled:'Apr 2026', renews:'Mar 2027' },
  { enrolled:'Apr 2026', renews:'Mar 2027' },
]

const FEATURES = [
  { emoji:'📚', text:'All subjects — chapter by chapter lessons' },
  { emoji:'✅', text:'Smart quizzes with instant feedback' },
  { emoji:'✍️', text:'Writing prompts with AI evaluation' },
  { emoji:'📊', text:'Parent progress dashboard with full visibility' },
  { emoji:'🔑', text:'Password control — parents manage child access' },
  { emoji:'🤖', text:'AI doubt solver — bounded to the syllabus' },
  { emoji:'🎯', text:'Corrective action alerts for parents' },
]

export default function SubscriptionPage() {
  const [parentName, setParentName] = useState('Parent')
  const [children,   setChildren]   = useState<Child[]>([])

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data:{ user } } = await supabase.auth.getUser()
      if (!user) return
      const { data:p } = await supabase.from('profiles').select('full_name').eq('id', user.id).maybeSingle()
      if (p?.full_name) setParentName(p.full_name)
      const { data:links } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id)
      if (links?.length) {
        const { data:profiles } = await supabase.from('profiles').select('id, full_name, email').in('id', links.map(l=>l.student_id))
        if (profiles) {
          setChildren(profiles.map((c,i) => ({ ...c, full_name:c.full_name||'Student', enrolled:MOCK_DATES[i]?.enrolled||'Apr 2026', renews:MOCK_DATES[i]?.renews||'Mar 2027' })) as Child[])
        }
      }
    }
    load()
  }, [])

  const total = children.length * 4999

  return (
    <ParentSidebarLayout parentName={parentName}>
      <style>{`@media(max-width:1000px){.sub-grid{grid-template-columns:1fr !important}}`}</style>
      <div style={{ padding:'28px 28px 60px' }}>
        <h1 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'22px', color:'#1B4332', marginBottom:'4px' }}>Subscription</h1>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280', marginBottom:'24px' }}>
          {children.length} {children.length===1?'child':'children'} enrolled · ₹{total.toLocaleString('en-IN')} per year
        </p>

        {/* Value prop banner */}
        <div style={{ background:'#F0FDF4', border:'1px solid #D8F3DC', borderRadius:'14px', padding:'18px 22px', marginBottom:'24px', display:'flex', alignItems:'center', gap:'20px', flexWrap:'wrap' }}>
          <div style={{ flex:1 }}>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'15px', color:'#1B4332', marginBottom:'6px' }}>No tutor required</p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#40916C', lineHeight:1.6 }}>
              At ₹415/month, Gyaanpravaha gives your child everything a private tutor provides — structured lessons, assessments, writing feedback, and doubt solving — at a fraction of the cost.
            </p>
          </div>
          <div style={{ display:'flex', gap:'10px', flexShrink:0, flexWrap:'wrap' }}>
            <div style={{ background:'white', border:'1px solid #D8F3DC', borderRadius:'10px', padding:'12px 16px', textAlign:'center' }}>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'20px', color:'#2D6A4F', lineHeight:1 }}>₹415</p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:'#9CA3AF', marginTop:'3px' }}>per month</p>
            </div>
            <div style={{ background:'white', border:'1px solid #D8F3DC', borderRadius:'10px', padding:'12px 16px', textAlign:'center' }}>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'20px', color:'#EF4444', lineHeight:1, textDecoration:'line-through', opacity:0.6 }}>₹3,000+</p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:'#9CA3AF', marginTop:'3px' }}>tutor/month</p>
            </div>
          </div>
        </div>

        <div className="sub-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', alignItems:'start' }}>

          {/* Left — child subscription cards + features */}
          <div>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'10px' }}>
              Enrolled children
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'20px' }}>
              {children.map((child)=>(
                <div key={child.id} style={{ background:'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius:'16px', padding:'20px' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                      <div style={{ width:'36px', height:'36px', minWidth:'36px', borderRadius:'50%', background:'#74C69D', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'14px', color:'#1B4332', flexShrink:0 }}>
                        {(child.full_name||'S').charAt(0)}
                      </div>
                      <div>
                        <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'15px', color:'white', lineHeight:1 }}>{child.full_name}</p>
                        <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'rgba(255,255,255,0.55)', marginTop:'2px' }}>Annual Plan · Grade 6</p>
                      </div>
                    </div>
                    <span style={{ background:'#74C69D', color:'#1B4332', fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'11px', padding:'4px 12px', borderRadius:'20px' }}>Active</span>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'8px' }}>
                    {[{l:'Amount',v:'₹4,999'},{l:'Enrolled',v:child.enrolled},{l:'Renews',v:child.renews}].map(({l,v})=>(
                      <div key={l} style={{ background:'rgba(255,255,255,0.1)', borderRadius:'9px', padding:'10px 12px' }}>
                        <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:'rgba(255,255,255,0.5)', marginBottom:'3px' }}>{l}</p>
                        <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'13px', color:'white' }}>{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {children.length > 1 && (
              <div style={{ background:'#F0FDF4', border:'1px solid #D8F3DC', borderRadius:'12px', padding:'14px 18px', marginBottom:'20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#1B4332', marginBottom:'2px' }}>Total annual spend</p>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#40916C' }}>{children.length} children × ₹4,999</p>
                </div>
                <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'22px', color:'#1B4332' }}>₹{total.toLocaleString('en-IN')}</p>
              </div>
            )}

            <div style={{ background:'#FEF3C7', border:'1px solid #FDE68A', borderRadius:'12px', padding:'14px 18px' }}>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#92400E', marginBottom:'4px' }}>Auto-renewal reminders</p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#B45309', lineHeight:1.5 }}>
                You will receive a reminder 30 days before each child&apos;s renewal. Questions? hello@gyaanpravaha.in
              </p>
            </div>
          </div>

          {/* Right — what is included */}
          <div>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'10px' }}>What is included</p>
            <div style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', overflow:'hidden', marginBottom:'16px' }}>
              {FEATURES.map((item,i,arr)=>(
                <div key={item.text} style={{ display:'flex', alignItems:'flex-start', gap:'12px', padding:'13px 18px', borderBottom:i<arr.length-1?'1px solid #F9FAFB':'none' }}>
                  <span style={{ fontSize:'16px', flexShrink:0, marginTop:'1px' }}>{item.emoji}</span>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#374151', lineHeight:1.5 }}>{item.text}</p>
                </div>
              ))}
            </div>

            {/* Comparison vs tutor */}
            <div style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', overflow:'hidden' }}>
              <div style={{ padding:'12px 18px', borderBottom:'1px solid #F3F4F6', background:'#F8FAF9' }}>
                <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#1B4332' }}>Gyaanpravaha vs Private tutor</p>
              </div>
              {[
                { feature:'Monthly cost', gp:'₹415', tutor:'₹3,000+' },
                { feature:'Available', gp:'24/7', tutor:'Scheduled only' },
                { feature:'Parent visibility', gp:'Complete', tutor:'None' },
                { feature:'Consistency', gp:'Always', tutor:'Varies' },
                { feature:'Curriculum aligned', gp:'Yes', tutor:'Depends' },
              ].map(({feature,gp,tutor},i,arr)=>(
                <div key={feature} style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', padding:'10px 18px', borderBottom:i<arr.length-1?'1px solid #F9FAFB':'none' }}>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#6B7280' }}>{feature}</p>
                  <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'#2D6A4F', textAlign:'center' }}>{gp}</p>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#9CA3AF', textAlign:'center' }}>{tutor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ParentSidebarLayout>
  )
}
