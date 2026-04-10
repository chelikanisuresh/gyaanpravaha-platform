'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'
import ParentRightPanel from '@/components/ParentRightPanel'
import AnimatedBook from '@/components/AnimatedBook'
import { NoTutorCard, SelfRelianceStaircase } from '@/components/ValueProps'

interface Child { id: string; full_name: string; email: string }

const MOCK_STATS: Record<number, { chaptersCompleted:number; totalChapters:number; avgScore:number; streak:number; todayMins:number; lastStudied:string; currentChapter:string }> = {
  0: { chaptersCompleted:3, totalChapters:8, avgScore:85, streak:5, todayMins:22, lastStudied:'2 hours ago', currentChapter:'In Morning Dew' },
  1: { chaptersCompleted:1, totalChapters:8, avgScore:91, streak:2, todayMins:14, lastStudied:'1 hour ago',  currentChapter:'If I Were Lord of Tartary' },
}

const ACTIVITY = [
  { emoji:'📖', childIdx:0, text:'Read section 3 of "In Morning Dew"',       time:'2h ago' },
  { emoji:'📖', childIdx:1, text:'Completed section 5 of "If I Were Lord…"', time:'1h ago' },
  { emoji:'✅', childIdx:0, text:'Completed quiz for "The Fun They Had"',      time:'Yesterday' },
  { emoji:'📝', childIdx:0, text:'Submitted writing for "The Fun They Had"',  time:'Yesterday' },
  { emoji:'🔥', childIdx:1, text:'Maintained 2 day study streak',             time:'2 days ago' },
]

const STARTERS = [
  'What do you think the scarecrow in "In Morning Dew" finds most puzzling about the world?',
  'If you were the king in "Three Questions", what would your three answers be?',
  'Do you think Milkha Singh would have been as determined without his struggles?',
]

function AddChildModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [step, setStep] = useState<'form'|'payment'>('form')
  const [childName, setChildName] = useState('')
  const [childEmail, setChildEmail] = useState('')
  const [childGender, setChildGender] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 8) { setError('Minimum 8 characters.'); return }
    setStep('payment')
  }

  const handlePayment = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/add-child', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ childName, childEmail, password, gender: childGender }) })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed to add child.'); setLoading(false); return }
      onSuccess()
    } catch (err: any) { setError(err.message || 'Something went wrong.') }
    setLoading(false)
  }

  const iStyle: React.CSSProperties = { width:'100%', padding:'10px 14px', fontFamily:'var(--font-body)', fontSize:'14px', color:'#1F2937', background:'white', border:'1.5px solid #E5E7EB', borderRadius:'8px', outline:'none' }
  const lStyle: React.CSSProperties = { display:'block', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'#6B7280', marginBottom:'6px', textTransform:'uppercase', letterSpacing:'0.05em' }

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background:'white', borderRadius:'18px', width:'100%', maxWidth:'440px', overflow:'hidden', boxShadow:'0 24px 60px rgba(0,0,0,0.18)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 22px', borderBottom:'1px solid #F3F4F6' }}>
          <div>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'16px', color:'#1B4332' }}>{step==='form'?'Add another child':'Complete payment'}</p>
            <div style={{ display:'flex', gap:'6px', marginTop:'6px' }}>
              <div style={{ width:'24px', height:'4px', borderRadius:'2px', background:'#2D6A4F' }}/>
              <div style={{ width:'24px', height:'4px', borderRadius:'2px', background:step==='payment'?'#2D6A4F':'#E5E7EB' }}/>
            </div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', fontSize:'20px', color:'#9CA3AF' }}>✕</button>
        </div>
        {step==='form' && (
          <form onSubmit={handleForm} style={{ padding:'22px', display:'flex', flexDirection:'column', gap:'14px' }}>
            <div><label style={lStyle}>Child&apos;s full name</label><input type="text" value={childName} onChange={e=>setChildName(e.target.value)} required placeholder="Enter full name" style={iStyle}/></div>
              <div>
                <label style={lStyle}>Child&apos;s gender</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {(['male', 'female'] as const).map(g => (
                    <button key={g} type="button" onClick={() => setChildGender(g)}
                      style={{ flex: 1, padding: '10px', borderRadius: '8px', cursor: 'pointer',
                        fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px',
                        border: childGender === g ? '2px solid #2D6A4F' : '1.5px solid #E5E7EB',
                        background: childGender === g ? '#F0FDF4' : 'white',
                        color: childGender === g ? '#1B4332' : '#6B7280',
                      }}>
                      {g === 'male' ? '👦 Male' : '👧 Female'}
                    </button>
                  ))}
                </div>
              </div>
            <div><label style={lStyle}>Child&apos;s school Gmail</label><input type="email" value={childEmail} onChange={e=>setChildEmail(e.target.value)} required placeholder="e.g. name@school.edu" style={iStyle}/></div>
            <div><label style={lStyle}>Set a password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={8} placeholder="Minimum 8 characters" style={iStyle}/></div>
            <div><label style={lStyle}>Confirm password</label><input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required placeholder="Re-enter password" style={iStyle}/></div>
            {error && <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#EF4444' }}>{error}</p>}
            <button type="submit" style={{ background:'#2D6A4F', color:'white', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', padding:'11px', borderRadius:'8px', border:'none', cursor:'pointer' }}>Continue to payment →</button>
          </form>
        )}
        {step==='payment' && (
          <div style={{ padding:'22px', display:'flex', flexDirection:'column', gap:'16px' }}>
            <button onClick={()=>setStep('form')} style={{ background:'none', border:'none', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:'13px', color:'#9CA3AF', textAlign:'left', padding:0 }}>← Back</button>
            <div style={{ background:'#F8FAF9', borderRadius:'12px', padding:'16px', border:'1px solid #E5E7EB' }}>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'12px' }}>Order summary</p>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'6px' }}>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#374151' }}>Annual plan — {childName}</p>
                <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', color:'#1B4332' }}>₹4,999</p>
              </div>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#9CA3AF' }}>₹415/month · Access to all subjects and features</p>
              <div style={{ borderTop:'1px solid #E5E7EB', marginTop:'10px', paddingTop:'10px', display:'flex', justifyContent:'space-between' }}>
                <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', color:'#1B4332' }}>Total</p>
                <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'16px', color:'#1B4332' }}>₹4,999</p>
              </div>
            </div>
            {error && <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#EF4444' }}>{error}</p>}
            <button onClick={handlePayment} disabled={loading} style={{ background:'#2D6A4F', color:'white', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', padding:'12px', borderRadius:'8px', border:'none', cursor:loading?'not-allowed':'pointer', opacity:loading?0.7:1 }}>
              {loading ? 'Processing...' : 'Pay ₹4,999 and add child'}
            </button>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'#9CA3AF', textAlign:'center' }}>Secured by Razorpay · 256-bit SSL encryption</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ChildCard({ child, index, onView }: { child:Child; index:number; onView:(id:string)=>void }) {
  const s = MOCK_STATS[index] || MOCK_STATS[0]
  const pct = Math.round((s.chaptersCompleted / s.totalChapters) * 100)
  return (
    <div onClick={()=>onView(child.id)} style={{ background:'white', borderRadius:'16px', border:'1px solid #E5E7EB', overflow:'hidden', cursor:'pointer', transition:'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease' }}
      onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 12px 28px rgba(27,67,50,0.12)';e.currentTarget.style.borderColor='#74C69D'}}
      onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='#E5E7EB'}}>
      <div style={{ background:'linear-gradient(135deg,#1B4332,#2D6A4F)', padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'36px', height:'36px', minWidth:'36px', borderRadius:'50%', background:'#74C69D', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'15px', color:'#1B4332', flexShrink:0 }}>
            {(child.full_name||'S').charAt(0)}
          </div>
          <div>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'15px', color:'white', lineHeight:1 }}>{child.full_name||'Student'}</p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'rgba(255,255,255,0.55)', marginTop:'2px' }}>Grade 6 · Active {s.lastStudied}</p>
          </div>
        </div>
        <span style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'rgba(255,255,255,0.5)' }}>→</span>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', borderBottom:'1px solid #F3F4F6' }}>
        {[{l:'Chapters',v:`${s.chaptersCompleted}/${s.totalChapters}`},{l:'Avg score',v:`${s.avgScore}%`},{l:'Streak',v:`${s.streak}d 🔥`}].map(({l,v},i,arr)=>(
          <div key={l} style={{ padding:'10px 12px', borderRight:i<arr.length-1?'1px solid #F3F4F6':'none', textAlign:'center' }}>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'15px', color:'#1B4332', lineHeight:1, marginBottom:'2px' }}>{v}</p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:'#9CA3AF' }}>{l}</p>
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
      <div style={{ padding:'10px 16px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#6B7280' }}>📖 <strong style={{ color:'#1B4332' }}>{s.todayMins} mins</strong> today</p>
        <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'#2D6A4F' }}>View details →</p>
      </div>
    </div>
  )
}

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
    const { data:p } = await supabase.from('profiles').select('full_name').eq('id', user.id).maybeSingle()
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

  const childNames = children.map(c=>(c.full_name||'Student').split(' ')[0])
  const starters = STARTERS.slice(0, Math.max(1, children.length))

  return (
    <ParentSidebarLayout parentName={parentName}>
      <style>{`
        @keyframes sUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .s-up{animation:sUp 0.4s ease forwards;opacity:0}
        @media(max-width:1100px){.dash-grid{grid-template-columns:1fr !important}}
      `}</style>

      <div style={{ padding:'28px 28px 60px' }}>

        {/* ── Header with book animation ── */}
        <div className="s-up" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px', flexWrap:'wrap', gap:'16px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'20px' }}>
            <AnimatedBook size={90}/>
            <div>
              <h1 style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'clamp(20px,3vw,28px)', color:'#1B4332', marginBottom:'4px' }}>
                {greeting}, {parentName}! 👋
              </h1>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280' }}>
                {children.length===0 ? 'No children linked yet.'
                  : children.length===1 ? `Tracking ${(children[0].full_name||'Student').split(' ')[0]}'s learning journey.`
                  : `Tracking ${children.length} children's learning journeys.`}
              </p>
            </div>
          </div>
          <button onClick={()=>setShowModal(true)} style={{ display:'flex', alignItems:'center', gap:'8px', background:'#2D6A4F', color:'white', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', padding:'10px 18px', borderRadius:'10px', border:'none', cursor:'pointer', flexShrink:0, transition:'opacity 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.opacity='0.88'}
            onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
            <span>+</span> Add child
          </button>
        </div>

        {/* ── Visibility value prop banner ── */}
        <div style={{ background:'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius:'16px', padding:'20px 24px', marginBottom:'20px', display:'flex', alignItems:'center', gap:'20px', flexWrap:'wrap' }}>
          <div style={{ flex:1 }}>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'16px', color:'white', marginBottom:'6px' }}>
              You have complete visibility into how your child is learning
            </p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'rgba(255,255,255,0.7)', lineHeight:1.6 }}>
              Every chapter read, every quiz score, every minute studied — and we surface exactly what corrective action you need to take to help your child improve.
            </p>
          </div>
          <div style={{ display:'flex', gap:'10px', flexShrink:0 }}>
            {[{l:'No tutor required',emoji:'🎓'},{l:'₹415/mo · 7 subjects',emoji:'💰'},{l:'Full progress tracking',emoji:'📊'}].map(({l,emoji})=>(
              <div key={l} style={{ background:'rgba(255,255,255,0.12)', borderRadius:'10px', padding:'10px 12px', textAlign:'center', minWidth:'90px' }}>
                <p style={{ fontSize:'18px', marginBottom:'4px' }}>{emoji}</p>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:'rgba(255,255,255,0.8)', lineHeight:1.3 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 2 column layout ── */}
        <div className="dash-grid" style={{ display:'grid', gridTemplateColumns:'1fr 260px', gap:'20px', alignItems:'start' }}>

          {/* ── LEFT ── */}
          <div>

            {/* Action items */}
            {children.length > 0 && (
              <div style={{ marginBottom:'20px' }}>
                <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'10px' }}>Needs attention</p>
                <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                  {[
                    { urgency:'high',   emoji:'⏰', childIdx:0, title:'Writing deadline in 2 days',   desc:'"In Morning Dew" prompt due Apr 15 — not submitted yet.' },
                    { urgency:'medium', emoji:'⚠️', childIdx:0, title:'Chapter needs attention',       desc:'"If I Were Lord of Tartary" scored 76% — encourage a retry.' },
                  ].filter(a=>children[a.childIdx]).map((item,i)=>(
                    <div key={i} style={{ display:'flex', gap:'12px', alignItems:'flex-start', padding:'12px 16px', borderRadius:'12px', border:`1px solid ${item.urgency==='high'?'#FECACA':'#FDE68A'}`, background:item.urgency==='high'?'#FEF2F2':'#FEF3C7' }}>
                      <span style={{ fontSize:'16px', flexShrink:0 }}>{item.emoji}</span>
                      <div>
                        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'2px' }}>
                          <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:item.urgency==='high'?'#991B1B':'#92400E' }}>{item.title}</p>
                          {children.length>1 && children[item.childIdx] && (
                            <span style={{ background:'rgba(0,0,0,0.07)', borderRadius:'20px', padding:'1px 8px', fontFamily:'var(--font-body)', fontSize:'11px', color:item.urgency==='high'?'#991B1B':'#92400E' }}>
                              {(children[item.childIdx].full_name||'Student').split(' ')[0]}
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
              <div style={{ marginBottom:'20px' }}>
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
            <div style={{ marginBottom:'20px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' }}>
                <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.07em' }}>Recent activity</p>
                <Link href="/parent/dashboard/progress" style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#2D6A4F', textDecoration:'none' }}>Full progress →</Link>
              </div>
              <div style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', overflow:'hidden' }}>
                {ACTIVITY.filter(a=>children[a.childIdx]).map((item,i,arr)=>(
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
                    <div style={{ background:bg, borderRadius:'14px', padding:'16px', cursor:'pointer', transition:'transform 0.2s, box-shadow 0.2s' }}
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

            {/* ── VALUE PROPS ── */}
            <div style={{ marginTop:'20px' }}>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'12px' }}>Why Gyaanpravaha</p>
              <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' }}>
                <NoTutorCard/>
                <SelfRelianceStaircase/>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <ParentRightPanel
            childName={childNames[0] || 'your child'}
            tipText="Ask your child what they read today — even one question doubles retention."
            starters={starters}
            quickActions={[
              { label:'View progress', emoji:'📊', href:'/parent/dashboard/progress' },
              { label:'Check writing', emoji:'✍️', href:'/parent/dashboard/writing' },
              { label:'Reset password', emoji:'🔑', href:'/parent/password' },
            ]}
          />
        </div>
      </div>

      {showModal && <AddChildModal onClose={()=>setShowModal(false)} onSuccess={()=>{ setShowModal(false); loadData() }}/>}
    </ParentSidebarLayout>
  )
}
