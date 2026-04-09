'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'
import ChildTabs from '@/components/ChildTabs'

interface Child { id:string; full_name:string; email:string }

const CHAPTERS = [
  { id:1, title:'Whistles and Shaving Bristles', type:'Prose',     completed:true,  score:88, timeSpent:18, attempts:1, sectionsRead:7 },
  { id:2, title:'If I Were Lord of Tartary',     type:'Poetry',    completed:true,  score:76, timeSpent:14, attempts:2, sectionsRead:7 },
  { id:3, title:'The Fun They Had',              type:'Story',     completed:true,  score:92, timeSpent:20, attempts:1, sectionsRead:7 },
  { id:4, title:'In Morning Dew',                type:'Poetry',    completed:false, score:null, timeSpent:8, attempts:0, sectionsRead:3 },
  { id:5, title:'The Boy Who Outran the Wind',   type:'Biography', completed:false, score:null, timeSpent:0, attempts:0, sectionsRead:0 },
  { id:6, title:'The Blind Boy',                 type:'Poetry',    completed:false, score:null, timeSpent:0, attempts:0, sectionsRead:0 },
  { id:7, title:'Three Questions',               type:'Story',     completed:false, score:null, timeSpent:0, attempts:0, sectionsRead:0 },
  { id:8, title:'From a Railway Carriage',       type:'Poetry',    completed:false, score:null, timeSpent:0, attempts:0, sectionsRead:0 },
]
const TYPE_COLORS: Record<string,{bg:string;text:string}> = {
  Prose:{ bg:'#D8F3DC',text:'#1B4332' }, Poetry:{ bg:'#FEF3C7',text:'#92400E' },
  Story:{ bg:'#EDE9FE',text:'#5B21B6' }, Biography:{ bg:'#FFE4E6',text:'#9F1239' },
}

function ScoreBar({ score,max=100 }: { score:number;max?:number }) {
  const pct=Math.round((score/max)*100); const c=pct>=80?'#10B981':pct>=60?'#F59E0B':'#EF4444'
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
      <div style={{ flex:1, height:'7px', background:'#E5E7EB', borderRadius:'4px', overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${pct}%`, background:c, borderRadius:'4px', transition:'width 0.6s ease' }}/>
      </div>
      <span style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:c, minWidth:'36px', textAlign:'right' }}>{score}/{max}</span>
    </div>
  )
}

function ProgressPageInner() {
  const searchParams = useSearchParams()
  const [children,   setChildren]   = useState<Child[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [parentName, setParentName] = useState('Parent')

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data:{ user } } = await supabase.auth.getUser()
      if (!user) return
      const { data:p } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
      if (p?.full_name) setParentName(p.full_name||'Parent')
      const { data:links } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id)
      if (!links?.length) return
      const { data:profiles } = await supabase.from('profiles').select('id, full_name, email').in('id', links.map(l=>l.student_id))
      if (profiles?.length) {
        setChildren(profiles as Child[])
        const fromUrl = searchParams.get('child')
        setSelectedId(fromUrl || profiles[0].id)
      }
    }
    load()
  }, [searchParams])

  const child = children.find(c=>c.id===selectedId)||children[0]
  const completed = CHAPTERS.filter(c=>c.completed).length
  const avg = Math.round(CHAPTERS.filter(c=>c.score).reduce((a,c)=>a+(c.score||0),0)/CHAPTERS.filter(c=>c.score).length)

  return (
    <ParentSidebarLayout parentName={parentName}>
      <div style={{ maxWidth:'820px', padding:'28px 28px 60px' }}>
        <h1 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'22px', color:'#1B4332', marginBottom:'4px' }}>Progress</h1>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280', marginBottom:'20px' }}>
          {child?.full_name} · {completed} of 8 chapters · {avg}% average
        </p>

        <ChildTabs children={children} selectedId={selectedId} onSelect={setSelectedId}/>

        {/* Overall bar */}
        <div style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', padding:'16px 18px', marginBottom:'16px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', color:'#1B4332' }}>English — overall</p>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#2D6A4F' }}>{completed}/8</p>
          </div>
          <div style={{ height:'8px', background:'#E5E7EB', borderRadius:'4px', overflow:'hidden' }}>
            <div style={{ height:'100%', width:`${Math.round((completed/8)*100)}%`, background:'linear-gradient(90deg,#2D6A4F,#52B788)', borderRadius:'4px', transition:'width 1s ease' }}/>
          </div>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
          {CHAPTERS.map(ch=>{
            const ts=TYPE_COLORS[ch.type]
            return (
              <div key={ch.id} style={{ background:'white', borderRadius:'14px', border:ch.completed?'1px solid #D8F3DC':'1px solid #E5E7EB', padding:'16px 18px', position:'relative', overflow:'hidden' }}>
                {ch.completed && <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'3px', background:'#10B981', borderRadius:'14px 0 0 14px' }}/>}
                {ch.sectionsRead>0&&!ch.completed && <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'3px', background:'#F59E0B', borderRadius:'14px 0 0 14px' }}/>}
                <div style={{ display:'flex', alignItems:'flex-start', gap:'12px', flexWrap:'wrap' }}>
                  <div style={{ width:'34px', height:'34px', minWidth:'34px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background:ch.completed?'#D8F3DC':ch.sectionsRead>0?'#FEF3C7':'#F3F4F6', fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'13px', color:ch.completed?'#1B4332':ch.sectionsRead>0?'#92400E':'#9CA3AF' }}>
                    {ch.completed?'✓':ch.id}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px', flexWrap:'wrap' }}>
                      <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', color:'#1B4332' }}>{ch.title}</p>
                      <span style={{ padding:'2px 8px', borderRadius:'10px', fontSize:'11px', fontFamily:'var(--font-heading)', fontWeight:700, background:ts.bg, color:ts.text }}>{ch.type}</span>
                    </div>
                    <div style={{ display:'flex', gap:'16px', flexWrap:'wrap', marginBottom:ch.score!==null?'8px':0 }}>
                      {[{l:'Sections',v:`${ch.sectionsRead}/7`},{l:'Time',v:`${ch.timeSpent}m`},{l:'Attempts',v:String(ch.attempts)}].map(({l,v})=>(
                        <div key={l}><p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:'#9CA3AF', marginBottom:'1px' }}>{l}</p><p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#374151' }}>{v}</p></div>
                      ))}
                    </div>
                    {ch.score!==null && <div><p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:'#9CA3AF', marginBottom:'4px' }}>Quiz score</p><ScoreBar score={ch.score}/></div>}
                  </div>
                  <span style={{ padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontFamily:'var(--font-heading)', fontWeight:700, flexShrink:0, background:ch.completed?'#D8F3DC':ch.sectionsRead>0?'#FEF3C7':'#F3F4F6', color:ch.completed?'#1B4332':ch.sectionsRead>0?'#92400E':'#9CA3AF' }}>
                    {ch.completed?'Done':ch.sectionsRead>0?'In progress':'Not started'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </ParentSidebarLayout>
  )
}

export default function ProgressPage() {
  return (
    <Suspense fallback={<></>}>
      <ProgressPageInner />
    </Suspense>
  )
}
