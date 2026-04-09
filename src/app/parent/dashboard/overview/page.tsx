// ── OVERVIEW ─────────────────────────────────────────────────
'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'

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

const SUBJECTS = [
  { name:'English',       emoji:'📖', completed:3, total:8, available:true },
  { name:'Mathematics',   emoji:'🔢', available:false },
  { name:'Science',       emoji:'🔬', available:false },
  { name:'History',       emoji:'🏛️', available:false },
  { name:'Geography',     emoji:'🌍', available:false },
  { name:'Sanskrit',      emoji:'📜', available:false },
  { name:'ICT',           emoji:'💻', available:false },
]

function PasswordCard({ childName, childId }: { childName:string; childId:string }) {
  const [open, setOpen] = useState(false)
  const [pw, setPw] = useState(''); const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false); const [msg, setMsg] = useState(''); const [err, setErr] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(''); setMsg('')
    if (pw !== confirm) { setErr('Passwords do not match.'); return }
    if (pw.length < 8)  { setErr('Minimum 8 characters.'); return }
    setLoading(true)
    const res = await fetch('/api/reset-child-password', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ childId, newPassword:pw }) })
    if (res.ok) { setMsg(`Password updated! Share it with ${childName}.`); setPw(''); setConfirm(''); setOpen(false) }
    else setErr('Failed. Please try again.')
    setLoading(false)
  }

  return (
    <div style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', overflow:'hidden' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 18px', borderBottom: open ? '1px solid #F3F4F6' : 'none' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <span style={{ fontSize:'18px' }}>🔑</span>
          <div>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#1B4332', marginBottom:'2px' }}>{childName}&apos;s password</p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'#9CA3AF' }}>Only you can change your child&apos;s login password</p>
          </div>
        </div>
        <button onClick={() => { setOpen(p=>!p); setErr(''); setMsg('') }} style={{ background: open ? '#F3F4F6' : '#D8F3DC', color: open ? '#6B7280' : '#1B4332', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', border:'none', borderRadius:'8px', padding:'7px 14px', cursor:'pointer' }}>
          {open ? 'Cancel' : 'Change'}
        </button>
      </div>
      {msg && <div style={{ padding:'10px 18px', background:'#D8F3DC' }}><p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#065F46' }}>✓ {msg}</p></div>}
      {open && (
        <form onSubmit={submit} style={{ padding:'16px 18px', display:'flex', flexDirection:'column', gap:'12px' }}>
          <div><label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:600, fontSize:'12px', color:'#6B7280', marginBottom:'5px', textTransform:'uppercase', letterSpacing:'0.05em' }}>New password</label><input type="password" style={{ width:'100%', padding:'10px 14px', fontFamily:'var(--font-body)', fontSize:'14px', color:'#1F2937', background:'white', border:'1.5px solid #E5E7EB', borderRadius:'8px', outline:'none' }} placeholder="Minimum 8 characters" value={pw} onChange={e=>setPw(e.target.value)} required minLength={8}/></div>
          <div><label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:600, fontSize:'12px', color:'#6B7280', marginBottom:'5px', textTransform:'uppercase', letterSpacing:'0.05em' }}>Confirm password</label><input type="password" style={{ width:'100%', padding:'10px 14px', fontFamily:'var(--font-body)', fontSize:'14px', color:'#1F2937', background:'white', border:'1.5px solid #E5E7EB', borderRadius:'8px', outline:'none' }} placeholder="Re-enter password" value={confirm} onChange={e=>setConfirm(e.target.value)} required/></div>
          {err && <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#EF4444' }}>{err}</p>}
          <button type="submit" disabled={loading} style={{ background:'#2D6A4F', color:'white', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', padding:'10px 20px', borderRadius:'8px', border:'none', cursor:'pointer', alignSelf:'flex-start', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Updating...' : 'Update password'}
          </button>
        </form>
      )}
    </div>
  )
}

export function OverviewPage() {
  const [parentName, setParentName] = useState('Parent')
  const [child, setChild] = useState<{ name:string; id:string }|null>(null)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data:{ user } } = await supabase.auth.getUser()
      if (!user) return
      const { data:p } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
      if (p?.full_name) setParentName(p.full_name)
      const { data:l } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id).single()
      if (!l) return
      const { data:c } = await supabase.from('profiles').select('id, full_name').eq('id', l.student_id).single()
      if (c) setChild({ id:c.id, name:c.full_name||'Student' })
    }
    load()
  }, [])

  const completed = CHAPTERS.filter(c=>c.completed).length
  const timeTotal  = CHAPTERS.reduce((a,c)=>a+c.timeSpent, 0)
  const avgScore   = Math.round(CHAPTERS.filter(c=>c.score).reduce((a,c)=>a+(c.score||0),0)/CHAPTERS.filter(c=>c.score).length)
  const weak       = CHAPTERS.filter(c=>c.score!==null && (c.score||0)<70)

  return (
    <ParentSidebarLayout parentName={parentName}>
      <div style={{ maxWidth:'820px', padding:'28px 28px 60px' }}>
        <h1 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'22px', color:'#1B4332', marginBottom:'4px' }}>Overview</h1>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280', marginBottom:'24px' }}>{child?.name||'Student'}&apos;s performance and account summary</p>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', marginBottom:'24px' }}>
          {[
            { emoji:'📚', value:`${completed}/8`, label:'Chapters done',  bg:'#D8F3DC', color:'#1B4332' },
            { emoji:'⭐', value:`${avgScore}%`,    label:'Avg score',      bg:'#FEF3C7', color:'#92400E' },
            { emoji:'⏱️', value:`${timeTotal}m`,   label:'Time studying',  bg:'#EDE9FE', color:'#5B21B6' },
            { emoji:'🔥', value:'5 days',           label:'Day streak',     bg:'#FFE4E6', color:'#9F1239' },
          ].map(({ emoji, value, label, bg, color }) => (
            <div key={label} style={{ background:bg, borderRadius:'12px', padding:'14px' }}>
              <span style={{ fontSize:'18px', display:'block', marginBottom:'8px' }}>{emoji}</span>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'20px', color, lineHeight:1, marginBottom:'3px' }}>{value}</p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#6B7280' }}>{label}</p>
            </div>
          ))}
        </div>

        {weak.length > 0 && (
          <div style={{ background:'#FEF2F2', border:'1.5px solid #FECACA', borderRadius:'12px', padding:'14px 18px', marginBottom:'20px' }}>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#991B1B', marginBottom:'8px' }}>⚠️ Needs attention</p>
            {weak.map(ch => (
              <div key={ch.id} style={{ display:'flex', justifyContent:'space-between', marginBottom:'4px' }}>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#7F1D1D' }}>{ch.title}</p>
                <span style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#EF4444' }}>{ch.score}%</span>
              </div>
            ))}
          </div>
        )}

        {child && <div style={{ marginBottom:'20px' }}>{/* label */}<p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'10px' }}>Child password</p><PasswordCard childName={child.name} childId={child.id}/></div>}

        <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'10px' }}>Subjects</p>
        <div style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', overflow:'hidden' }}>
          {SUBJECTS.map((s,i,arr) => (
            <div key={s.name} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'12px 18px', borderBottom: i<arr.length-1 ? '1px solid #F9FAFB' : 'none' }}>
              <span style={{ fontSize:'16px' }}>{s.emoji}</span>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: s.available ? '5px' : 0 }}>
                  <p style={{ fontFamily:'var(--font-body)', fontWeight:500, fontSize:'13px', color: s.available ? '#1B4332' : '#9CA3AF' }}>{s.name}</p>
                  {s.available ? <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'#2D6A4F' }}>{s.completed}/{s.total}</p> : <span style={{ background:'#F3F4F6', color:'#9CA3AF', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'10px', padding:'2px 8px', borderRadius:'20px' }}>Coming soon</span>}
                </div>
                {s.available && <div style={{ height:'5px', background:'#E5E7EB', borderRadius:'3px', overflow:'hidden' }}><div style={{ height:'100%', width:`${Math.round(((s.completed||0)/(s.total||1))*100)}%`, background:'#2D6A4F', borderRadius:'3px' }}/></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ParentSidebarLayout>
  )
}

export default OverviewPage
