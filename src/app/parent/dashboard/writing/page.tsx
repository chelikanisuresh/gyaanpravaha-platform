'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'
import ChildTabs from '@/components/ChildTabs'
import ParentRightPanel from '@/components/ParentRightPanel'

interface Child { id:string; full_name:string; email:string }

const PROMPTS = [
  { id:1, chapter:'Whistles and Shaving Bristles', prompt:'Write about a rule in your family that you think is unusual but useful.', submitted:true, score:16, max:20, status:'released', deadline:'Apr 5' },
  { id:2, chapter:'The Fun They Had', prompt:'Do you think schools of the future will be better or worse than today? Give reasons.', submitted:true, score:null, max:20, status:'pending', deadline:'Apr 10' },
  { id:3, chapter:'In Morning Dew', prompt:'Write about something you observe every day but never really think about.', submitted:false, score:null, max:20, status:'assigned', deadline:'Apr 15' },
]

function ScoreBar({ score, max=20 }:{ score:number; max?:number }) {
  const pct=Math.round((score/max)*100); const c=pct>=80?'#10B981':pct>=60?'#F59E0B':'#EF4444'
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
      <div style={{ flex:1, height:'7px', background:'#E5E7EB', borderRadius:'4px', overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${pct}%`, background:c, borderRadius:'4px' }}/>
      </div>
      <span style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:c, minWidth:'36px', textAlign:'right' }}>{score}/{max}</span>
    </div>
  )
}

function WritingInner() {
  const searchParams = useSearchParams()
  const [children, setChildren] = useState<Child[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [parentName, setParentName] = useState('Parent')

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data:{ user } } = await supabase.auth.getUser()
      if (!user) return
      const { data:p } = await supabase.from('profiles').select('full_name').eq('id', user.id).maybeSingle()
      if (p?.full_name) setParentName(p.full_name)
      const { data:links } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id)
      if (!links?.length) return
      const { data:profiles } = await supabase.from('profiles').select('id, full_name, email').in('id', links.map(l=>l.student_id))
      if (profiles?.length) { setChildren(profiles as Child[]); setSelectedId(searchParams.get('child') || profiles[0].id) }
    }
    load()
  }, [searchParams])

  const child = children.find(c=>c.id===selectedId)||children[0]
  const childName = (child?.full_name||'Student').split(' ')[0]
  const submitted = PROMPTS.filter(w=>w.submitted).length

  return (
    <ParentSidebarLayout parentName={parentName}>
      <style>{`@media(max-width:1100px){.wr-grid{grid-template-columns:1fr !important}}`}</style>
      <div style={{ padding:'28px 28px 60px' }}>
        <h1 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'22px', color:'#1B4332', marginBottom:'4px' }}>Writing prompts</h1>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280', marginBottom:'20px' }}>
          {childName} · {submitted} of {PROMPTS.length} submitted
        </p>
        <ChildTabs children={children} selectedId={selectedId} onSelect={setSelectedId}/>

        <div className="wr-grid" style={{ display:'grid', gridTemplateColumns:'1fr 260px', gap:'20px', alignItems:'start' }}>
          <div>
            <div style={{ background:'#F0FDF4', border:'1px solid #D8F3DC', borderRadius:'12px', padding:'12px 16px', marginBottom:'16px' }}>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#065F46', lineHeight:1.6 }}>
                AI evaluates each submission first, then our team reviews it before releasing the final score to you.
              </p>
            </div>

            <div style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', overflow:'hidden' }}>
              {PROMPTS.map((wp,i)=>(
                <div key={wp.id} style={{ padding:'18px 20px', borderBottom:i<PROMPTS.length-1?'1px solid #F3F4F6':'none' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'12px', gap:'12px', flexWrap:'wrap' }}>
                    <div style={{ flex:1 }}>
                      <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'4px' }}>{wp.chapter}</p>
                      <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', color:'#1B4332', lineHeight:1.45 }}>{wp.prompt}</p>
                    </div>
                    <span style={{ padding:'4px 10px', borderRadius:'20px', fontSize:'11px', fontFamily:'var(--font-heading)', fontWeight:700, flexShrink:0, background:wp.status==='released'?'#D8F3DC':wp.status==='pending'?'#FEF3C7':'#F3F4F6', color:wp.status==='released'?'#1B4332':wp.status==='pending'?'#92400E':'#6B7280' }}>
                      {wp.status==='released'?'✓ Score released':wp.status==='pending'?'⏳ Under review':'📝 Not submitted'}
                    </span>
                  </div>
                  <div style={{ display:'flex', gap:'18px', alignItems:'center', flexWrap:'wrap' }}>
                    {[{l:'Deadline',v:wp.deadline},{l:'Submitted',v:wp.submitted?'Yes':'No'}].map(({l,v})=>(
                      <div key={l}><p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:'#9CA3AF', marginBottom:'1px' }}>{l}</p><p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:l==='Submitted'?(wp.submitted?'#10B981':'#EF4444'):'#374151' }}>{v}</p></div>
                    ))}
                    {wp.score!==null && <div style={{ flex:1, minWidth:'140px' }}><p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:'#9CA3AF', marginBottom:'5px' }}>Score</p><ScoreBar score={wp.score} max={wp.max}/></div>}
                    {wp.submitted&&wp.score===null && <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#F59E0B', fontStyle:'italic' }}>Awaiting admin review</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ParentRightPanel
            childName={childName}
            tipText="Writing builds critical thinking. Ask your child to read their submission aloud to you before submitting."
            starters={['"What did you write about for the last prompt?"', '"If you could change your answer, what would you write differently?"']}
            quickActions={[
              { label:'View progress', emoji:'📚', href:'/parent/dashboard/progress' },
              { label:'Overview', emoji:'📊', href:'/parent/dashboard/overview' },
            ]}
          />
        </div>
      </div>
    </ParentSidebarLayout>
  )
}

export default function WritingPage() {
  return <Suspense fallback={<></>}><WritingInner/></Suspense>
}
