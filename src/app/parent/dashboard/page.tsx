'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'

interface Child {
  id: string
  full_name: string
  email: string
}

const MOCK_STATS: Record<number, {
  chaptersCompleted: number; totalChapters: number; avgScore: number
  streak: number; todayMins: number; lastStudied: string; currentChapter: string
}> = {
  0: { chaptersCompleted:3, totalChapters:8, avgScore:85, streak:5, todayMins:22, lastStudied:'2 hours ago',  currentChapter:'In Morning Dew' },
  1: { chaptersCompleted:1, totalChapters:8, avgScore:91, streak:2, todayMins:14, lastStudied:'1 hour ago',   currentChapter:'If I Were Lord of Tartary' },
}

const ALL_ACTIVITY = [
  { emoji:'📖', childIdx:0, text:'Read section 3 of "In Morning Dew"',       time:'2h ago' },
  { emoji:'📖', childIdx:1, text:'Completed section 5 of "If I Were Lord…"', time:'1h ago' },
  { emoji:'✅', childIdx:0, text:'Completed quiz for "The Fun They Had"',      time:'Yesterday' },
  { emoji:'📝', childIdx:0, text:'Submitted writing for "The Fun They Had"',  time:'Yesterday' },
  { emoji:'🔥', childIdx:1, text:'Maintained 2 day study streak',             time:'2 days ago' },
]

const STARTERS = [
  'What do you think the scarecrow in "In Morning Dew" finds most puzzling?',
  'If you were the king in "Three Questions", what would your answers be?',
  'Do you think Milkha Singh would have been as determined without his struggles?',
]

// ── Add Child Modal ──────────────────────────────────────────────────────────
function AddChildModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [step, setStep] = useState<'form' | 'payment'>('form')
  const [childName,  setChildName]  = useState('')
  const [childEmail, setChildEmail] = useState('')
  const [password,   setPassword]   = useState('')
  const [confirm,    setConfirm]    = useState('')
  const [loading,    setLoading]    = useState(false)
  const [error,      setError]      = useState('')

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 8)  { setError('Minimum 8 characters.'); return }
    setStep('payment')
  }

  const handlePayment = async () => {
    setLoading(true); setError('')
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not logged in')

      // Duplicate check
      const { data: existing } = await supabase.from('profiles').select('id').eq('email', childEmail).single()
      if (existing) { setError('This school Gmail is already registered.'); setLoading(false); return }

      // Create student
      const { data: newUser, error: signUpErr } = await supabase.auth.signUp({
        email: childEmail, password,
        options: { data: { full_name: childName, role: 'student' } },
      })
      if (signUpErr) throw signUpErr

      // Link to parent
      if (newUser.user) {
        await supabase.from('parent_student_links').insert({ parent_id: user.id, student_id: newUser.user.id })
      }
      onSuccess()
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
    }
    setLoading(false)
  }

  const inputStyle: React.CSSProperties = { width:'100%', padding:'10px 14px', fontFamily:'var(--font-body)', fontSize:'14px', color:'#1F2937', background:'white', border:'1.5px solid #E5E7EB', borderRadius:'8px', outline:'none' }
  const labelStyle: React.CSSProperties = { display:'block', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'#6B7280', marginBottom:'6px', textTransform:'uppercase', letterSpacing:'0.05em' }

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background:'white', borderRadius:'16px', width:'100%', maxWidth:'440px', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 22px', borderBottom:'1px solid #F3F4F6' }}>
          <div>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'16px', color:'#1B4332' }}>
              {step === 'form' ? 'Add another child' : 'Complete payment'}
            </p>
            <div style={{ display:'flex', gap:'6px', marginTop:'6px' }}>
              <div style={{ width:'24px', height:'4px', borderRadius:'2px', background:'#2D6A4F' }}/>
              <div style={{ width:'24px', height:'4px', borderRadius:'2px', background: step==='payment' ? '#2D6A4F' : '#E5E7EB' }}/>
            </div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', fontSize:'20px', color:'#9CA3AF', lineHeight:1 }}>✕</button>
        </div>

        {step === 'form' && (
          <form onSubmit={handleForm} style={{ padding:'22px', display:'flex', flexDirection:'column', gap:'14px' }}>
            <div><label style={labelStyle}>Child&apos;s full name</label><input type="text" value={childName} onChange={e=>setChildName(e.target.value)} required placeholder="Enter full name" style={inputStyle}/></div>
            <div><label style={labelStyle}>Child&apos;s school Gmail</label><input type="email" value={childEmail} onChange={e=>setChildEmail(e.target.value)} required placeholder="e.g. name@school.edu" style={inputStyle}/></div>
            <div><label style={labelStyle}>Set a password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={8} placeholder="Minimum 8 characters" style={inputStyle}/></div>
            <div><label style={labelStyle}>Confirm password</label><input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required placeholder="Re-enter password" style={inputStyle}/></div>
            {error && <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#EF4444' }}>{error}</p>}
            <button type="submit" style={{ background:'#2D6A4F', color:'white', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', padding:'11px', borderRadius:'8px', border:'none', cursor:'pointer' }}>
              Continue to payment →
            </button>
          </form>
        )}

        {step === 'payment' && (
          <div style={{ padding:'22px', display:'flex', flexDirection:'column', gap:'16px' }}>
            <button onClick={()=>setStep('form')} style={{ background:'none', border:'none', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:'13px', color:'#9CA3AF', textAlign:'left', padding:0 }}>← Back</button>
            <div style={{ background:'#F8FAF9', borderRadius:'12px', padding:'16px', border:'1px solid #E5E7EB' }}>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'12px' }}>Order summary</p>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'6px' }}>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#374151' }}>Annual plan — {childName}</p>
                <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', color:'#1B4332' }}>₹2,499</p>
              </div>
              <div style={{ borderTop:'1px solid #E5E7EB', marginTop:'10px', paddingTop:'10px', display:'flex', justifyContent:'space-between' }}>
                <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', color:'#1B4332' }}>Total</p>
                <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'16px', color:'#1B4332' }}>₹2,499</p>
              </div>
            </div>
            {error && <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#EF4444' }}>{error}</p>}
            <button onClick={handlePayment} disabled={loading} style={{ background:'#2D6A4F', color:'white', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', padding:'12px', borderRadius:'8px', border:'none', cursor:loading?'not-allowed':'pointer', opacity:loading?0.7:1 }}>
              {loading ? 'Processing...' : 'Pay ₹2,499 and add child'}
            </button>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'#9CA3AF', textAlign:'center' }}>Secured by Razorpay · 256-bit SSL</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Child card ───────────────────────────────────────────────────────────────
function ChildCard({ child, index, onView }: { child:Child; index:number; onView:(id:string)=>void }) {
  const s = MOCK_STATS[index] || MOCK_STATS[0]
  const pct = Math.round((s.chaptersCompleted / s.totalChapters) * 100)
  return (
    <div style={{ background:'white', borderRadius:'16px', border:'1px solid #E5E7EB', overflow:'hidden' }}>
      <div style={{ background:'linear-gradient(135deg,#1B4332,#2D6A4F)', padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'36px', height:'36px', minWidth:'36px', borderRadius:'50%', background:'#74C69D', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'15px', color:'#1B4332', flexShrink:0 }}>
            {(child.full_name||'S').charAt(0)}
          </div>
          <div>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'15px', color:'white', lineHeight:1 }}>{child.full_name||'Student'}</p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'rgba(255,255,255,0.55)', marginTop:'2px' }}>Grade 6</p>
          </div>
        </div>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'rgba(255,255,255,0.45)' }}>Active {s.lastStudied}</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', borderBottom:'1px solid #F3F4F6' }}>
        {[{l:'Chapters',v:`${s.chaptersCompleted}/${s.totalChapters}`},{l:'Avg score',v:`${s.avgScore}%`},{l:'Streak',v:`${s.streak}d 🔥`}].map(({l,v},i,arr)=>(
          <div key={l} style={{ padding:'11px 12px', borderRight:i<arr.length-1?'1px solid #F3F4F6':'none', textAlign:'center' }}>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'15px', color:'#1B4332', lineHeight:1, marginBottom:'2px' }}>{v}</p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'#9CA3AF' }}>{l}</p>
          </div>
        ))}
      </div>

      <div style={{ padding:'11px 16px', borderBottom:'1px solid #F3F4F6' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'5px' }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#6B7280' }}>{s.currentChapter}</p>
          <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'#2D6A4F' }}>{pct}%</p>
        </div>
        <div style={{ height:'5px', background:'#E5E7EB', borderRadius:'3px', overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${pct}%`, background:'#2D6A4F', borderRadius:'3px', transition:'width 0.8s ease' }}/>
        </div>
      </div>

      <div style={{ padding:'11px 16px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#6B7280' }}>
          📖 <strong style={{ color:'#1B4332' }}>{s.todayMins} mins</strong> today
        </p>
        <button onClick={()=>onView(child.id)} style={{ background:'#D8F3DC', color:'#1B4332', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', padding:'6px 14px', borderRadius:'8px', border:'none', cursor:'pointer' }}>
          View details →
        </button>
      </div>
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function ParentDashboardPage() {
  const [parentName, setParentName] = useState('Parent')
  const [children,   setChildren]   = useState<Child[]>([])
  const [greeting,   setGreeting]   = useState('Good morning')
  const [showModal,  setShowModal]  = useState(false)
  const [tipIndex]                  = useState(()=>Math.floor(Math.random()*STARTERS.length))
  const router = useRouter()

  const loadData = async () => {
    const supabase = createClient()
    const { data:{ user } } = await supabase.auth.getUser()
    if (!user) return
    const { data:p } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
    if (p?.full_name) setParentName((p.full_name||'Parent').split(' ')[0])
    const { data:links } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id)
    if (!links?.length) return
    const { data:profiles } = await supabase.from('profiles').select('id, full_name, email').in('id', links.map(l=>l.student_id))
    if (profiles) setChildren(profiles as Child[])
  }

  useEffect(() => {
    const h = new Date().getHours()
    setGreeting(h<12?'Good morning':h<17?'Good afternoon':'Good evening')
    loadData()
  }, [])

  return (
    <ParentSidebarLayout parentName={parentName}>
      <style>{`@keyframes sUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.s-up{animation:sUp 0.4s ease forwards;opacity:0}`}</style>
      <div style={{ maxWidth:'920px', padding:'28px 28px 60px' }}>

        {/* Header */}
        <div className="s-up" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'24px', flexWrap:'wrap', gap:'12px' }}>
          <div>
            <h1 style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'clamp(20px,3vw,28px)', color:'#1B4332', marginBottom:'4px' }}>
              {greeting}, {parentName}! 👋
            </h1>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280' }}>
              {children.length===0 ? 'No children linked yet.'
                : children.length===1 ? `Tracking ${(children[0]?.full_name||'Student').split(' ')[0]}'s learning journey.`
                : `Tracking ${children.length} children's learning journeys.`}
            </p>
          </div>
          <button onClick={()=>setShowModal(true)} style={{ display:'flex', alignItems:'center', gap:'8px', background:'#2D6A4F', color:'white', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', padding:'10px 18px', borderRadius:'10px', border:'none', cursor:'pointer', flexShrink:0 }}>
            <span>+</span> Add child
          </button>
        </div>

        {/* Action items */}
        {children.length > 0 && (
          <div style={{ marginBottom:'24px' }}>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'10px' }}>Needs attention</p>
            <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
              {[
                { urgency:'high',   emoji:'⏰', childIdx:0, title:'Writing deadline in 2 days',   desc:'"In Morning Dew" prompt due Apr 15 — not submitted yet.' },
                { urgency:'medium', emoji:'⚠️', childIdx:0, title:'Chapter needs attention',       desc:'"If I Were Lord of Tartary" scored 76%.' },
              ].filter(a=>children[a.childIdx]).map((item,i)=>(
                <div key={i} style={{ display:'flex', gap:'12px', alignItems:'flex-start', padding:'12px 16px', borderRadius:'12px', border:`1px solid ${item.urgency==='high'?'#FECACA':'#FDE68A'}`, background:item.urgency==='high'?'#FEF2F2':'#FEF3C7' }}>
                  <span style={{ fontSize:'16px', flexShrink:0 }}>{item.emoji}</span>
                  <div>
                    <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'2px' }}>
                      <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:item.urgency==='high'?'#991B1B':'#92400E' }}>{item.title}</p>
                      {children.length>1 && children[item.childIdx] && (
                        <span style={{ background:'rgba(0,0,0,0.07)', borderRadius:'20px', padding:'1px 8px', fontFamily:'var(--font-body)', fontSize:'11px', color:item.urgency==='high'?'#991B1B':'#92400E' }}>
                          {(children[item.childIdx]?.full_name||'Student').split(' ')[0]}
                        </span>
                      )}
                    </div>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:item.urgency==='high'?'#B91C1C':'#B45309', lineHeight:1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Children cards */}
        {children.length > 0 && (
          <div style={{ marginBottom:'24px' }}>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'10px' }}>
              {children.length===1 ? 'Your child' : 'Your children'}
            </p>
            <div style={{ display:'grid', gridTemplateColumns:children.length>1?'repeat(auto-fit,minmax(300px,1fr))':'1fr', gap:'14px' }}>
              {children.map((child,idx)=>(
                <ChildCard key={child.id} child={child} index={idx} onView={id=>router.push(`/parent/dashboard/overview?child=${id}`)}/>
              ))}
            </div>
          </div>
        )}

        {/* Activity feed */}
        <div style={{ marginBottom:'24px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' }}>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.07em' }}>Recent activity</p>
            <Link href="/parent/dashboard/progress" style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#2D6A4F', textDecoration:'none' }}>Full progress →</Link>
          </div>
          <div style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', overflow:'hidden' }}>
            {ALL_ACTIVITY.filter(a=>children[a.childIdx]).map((item,i,arr)=>(
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'11px 18px', borderBottom:i<arr.length-1?'1px solid #F9FAFB':'none' }}>
                <span style={{ fontSize:'14px', flexShrink:0 }}>{item.emoji}</span>
                {children.length>1 && (
                  <span style={{ background:'#D8F3DC', color:'#1B4332', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'10px', padding:'2px 7px', borderRadius:'20px', flexShrink:0 }}>
                    {(children[item.childIdx]?.full_name||'Student').split(' ')[0]}
                  </span>
                )}
                <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#374151', flex:1 }}>{item.text}</p>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'#9CA3AF', flexShrink:0 }}>{item.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation starters — one per child */}
        {children.length > 0 && (
          <div style={{ marginBottom:'24px' }}>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'10px' }}>Conversation starters</p>
            <div style={{ display:'grid', gridTemplateColumns:children.length>1?'repeat(auto-fit,minmax(280px,1fr))':'1fr', gap:'12px' }}>
              {children.map((child,idx)=>(
                <div key={child.id} style={{ background:'#FEF3C7', borderRadius:'14px', border:'1px solid #FDE68A', padding:'16px 18px' }}>
                  <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#92400E', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'8px' }}>
                    Ask {(child.full_name||'Student').split(' ')[0]}
                  </p>
                  <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', color:'#92400E', lineHeight:1.5, marginBottom:'6px' }}>
                    &ldquo;{STARTERS[(tipIndex+idx)%STARTERS.length]}&rdquo;
                  </p>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'#B45309' }}>Asking even one question doubles retention.</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick nav */}
        <div>
          <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'10px' }}>Explore</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px' }}>
            {[
              { href:'/parent/dashboard/overview', emoji:'📊', title:'Overview',  desc:'Stats, subjects, password',  bg:'#D8F3DC', color:'#1B4332' },
              { href:'/parent/dashboard/progress', emoji:'📚', title:'Progress',  desc:'Chapter scores and detail',  bg:'#EDE9FE', color:'#5B21B6' },
              { href:'/parent/dashboard/writing',  emoji:'✍️', title:'Writing',   desc:'Prompts and submissions',    bg:'#FEF3C7', color:'#92400E' },
            ].map(({href,emoji,title,desc,bg,color})=>(
              <Link key={href} href={href} style={{ textDecoration:'none' }}>
                <div style={{ background:bg, borderRadius:'14px', padding:'16px', cursor:'pointer', transition:'transform 0.2s,box-shadow 0.2s' }}
                  onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 8px 20px rgba(0,0,0,0.08)'}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}>
                  <span style={{ fontSize:'24px', display:'block', marginBottom:'8px' }}>{emoji}</span>
                  <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'14px', color, marginBottom:'3px' }}>{title}</p>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color, opacity:0.7, lineHeight:1.4 }}>{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {showModal && <AddChildModal onClose={()=>setShowModal(false)} onSuccess={()=>{ setShowModal(false); loadData() }}/>}
    </ParentSidebarLayout>
  )
}
