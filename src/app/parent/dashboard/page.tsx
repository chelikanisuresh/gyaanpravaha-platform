'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'
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
  const [step, setStep]           = useState<'form'|'payment'>('form')
  const [childName, setChildName] = useState('')
  const [childEmail, setChildEmail] = useState('')
  const [password, setPassword]   = useState('')
  const [confirm, setConfirm]     = useState('')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 8)  { setError('Minimum 8 characters.'); return }
    setStep('payment')
  }

  const handlePayment = async () => {
    setLoading(true); setError('')
    try {
      const res  = await fetch('/api/add-child', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ childName, childEmail, password }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to add child')
      onSuccess()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
      <div style={{ background:'white', borderRadius:'20px', padding:'32px', width:'100%', maxWidth:'480px', maxHeight:'90vh', overflowY:'auto' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px' }}>
          <h2 style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'20px', color:'#1B4332' }}>Add another child</h2>
          <button onClick={onClose} style={{ background:'#F3F4F6', border:'none', borderRadius:'8px', width:'32px', height:'32px', cursor:'pointer', fontSize:'16px' }}>✕</button>
        </div>
        {step === 'form' ? (
          <form onSubmit={handleForm} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
            <div>
              <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#374151', marginBottom:'6px' }}>Child's full name</label>
              <input type="text" value={childName} onChange={e => setChildName(e.target.value)} required placeholder="Enter full name"
                style={{ width:'100%', padding:'10px 14px', borderRadius:'10px', border:'1px solid #E5E7EB', fontFamily:'var(--font-body)', fontSize:'14px', boxSizing:'border-box' }}/>
            </div>
            <div>
              <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#374151', marginBottom:'6px' }}>School Gmail ID</label>
              <input type="email" value={childEmail} onChange={e => setChildEmail(e.target.value)} required placeholder="child@school.edu"
                style={{ width:'100%', padding:'10px 14px', borderRadius:'10px', border:'1px solid #E5E7EB', fontFamily:'var(--font-body)', fontSize:'14px', boxSizing:'border-box' }}/>
            </div>
            <div>
              <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#374151', marginBottom:'6px' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} placeholder="Minimum 8 characters"
                style={{ width:'100%', padding:'10px 14px', borderRadius:'10px', border:'1px solid #E5E7EB', fontFamily:'var(--font-body)', fontSize:'14px', boxSizing:'border-box' }}/>
            </div>
            <div>
              <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#374151', marginBottom:'6px' }}>Confirm password</label>
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required placeholder="Re-enter password"
                style={{ width:'100%', padding:'10px 14px', borderRadius:'10px', border:'1px solid #E5E7EB', fontFamily:'var(--font-body)', fontSize:'14px', boxSizing:'border-box' }}/>
            </div>
            {error && <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#DC2626' }}>{error}</p>}
            <button type="submit" style={{ padding:'12px', borderRadius:'10px', border:'none', background:'#1B4332', color:'white', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', cursor:'pointer', marginTop:'8px' }}>
              Continue to payment →
            </button>
          </form>
        ) : (
          <div>
            <div style={{ background:'#F0FDF4', borderRadius:'12px', padding:'20px', marginBottom:'20px' }}>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', color:'#1B4332', marginBottom:'12px' }}>Order summary</p>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#374151' }}>Gyaanpravaha Annual Plan</p>
                <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', color:'#1B4332' }}>₹4,999</p>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#6B7280' }}>Student</p>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#374151' }}>{childName}</p>
              </div>
            </div>
            {error && <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#DC2626', marginBottom:'12px' }}>{error}</p>}
            <div style={{ display:'flex', gap:'10px' }}>
              <button onClick={() => setStep('form')} style={{ flex:1, padding:'12px', borderRadius:'10px', border:'1px solid #E5E7EB', background:'white', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', color:'#374151', cursor:'pointer' }}>Back</button>
              <button onClick={handlePayment} disabled={loading} style={{ flex:2, padding:'12px', borderRadius:'10px', border:'none', background:loading ? '#9CA3AF' : '#1B4332', color:'white', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', cursor:loading ? 'not-allowed' : 'pointer' }}>
                {loading ? 'Processing...' : 'Pay ₹4,999 securely'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ParentDashboard() {
  const router = useRouter()
  const [children,    setChildren]    = useState<Child[]>([])
  const [activeChild, setActiveChild] = useState(0)
  const [showAdd,     setShowAdd]     = useState(false)
  const [parentName,  setParentName]  = useState('Parent')

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: profile } = await supabase.from('profiles').select('role, full_name').eq('id', user.id).maybeSingle()
      if (profile?.role !== 'parent') { router.push('/login'); return }
      setParentName(profile?.full_name || 'Parent')
    }
    load()
  }, [router])

  const stats = MOCK_STATS[activeChild] ?? MOCK_STATS[0]

  return (
    <ParentSidebarLayout parentName={parentName}>
      <div>
        {/* Child selector */}
        {children.length > 1 && (
          <div style={{ display:'flex', gap:'8px', marginBottom:'20px' }}>
            {children.map((c, i) => (
              <button key={c.id} onClick={() => setActiveChild(i)}
                style={{ padding:'7px 18px', borderRadius:'20px', border: activeChild === i ? '2px solid #1B4332' : '1px solid #E5E7EB', background: activeChild === i ? '#1B4332' : 'white', color: activeChild === i ? 'white' : '#374151', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', cursor:'pointer' }}>
                {c.full_name}
              </button>
            ))}
          </div>
        )}

        {/* Stats row */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:'12px', marginBottom:'24px' }}>
          {[
            { label:'Chapters done',  value:`${stats.chaptersCompleted}/${stats.totalChapters}`, color:'#1E40AF', bg:'#DBEAFE' },
            { label:'Avg quiz score', value:`${stats.avgScore}%`,                                color:'#065F46', bg:'#D8F3DC' },
            { label:'Study streak',   value:`${stats.streak} days`,                              color:'#92400E', bg:'#FEF3C7' },
            { label:'Today',          value:`${stats.todayMins} min`,                            color:'#7C3AED', bg:'#F5F3FF' },
          ].map(s => (
            <div key={s.label} style={{ background:s.bg, borderRadius:'14px', padding:'16px' }}>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'22px', color:s.color, lineHeight:1 }}>{s.value}</p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:s.color, opacity:0.75, marginTop:'4px' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Current chapter */}
        <div style={{ background:'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius:'16px', padding:'20px 24px', marginBottom:'20px', display:'flex', alignItems:'center', gap:'16px' }}>
          <AnimatedBook/>
          <div>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'rgba(255,255,255,0.6)', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'4px' }}>Currently reading</p>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'17px', color:'white' }}>{stats.currentChapter}</p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'rgba(255,255,255,0.55)', marginTop:'3px' }}>Last studied {stats.lastStudied}</p>
          </div>
        </div>

        {/* Recent activity */}
        <div style={{ background:'white', borderRadius:'16px', border:'1px solid #E5E7EB', padding:'20px 24px', marginBottom:'20px' }}>
          <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#1B4332', marginBottom:'14px' }}>Recent activity</p>
          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            {ACTIVITY.filter(a => children.length <= 1 || a.childIdx === activeChild).slice(0, 4).map((a, i) => (
              <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'10px' }}>
                <span style={{ fontSize:'16px', flexShrink:0 }}>{a.emoji}</span>
                <div style={{ flex:1 }}>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#374151' }}>{a.text}</p>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'#9CA3AF', marginTop:'2px' }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation starter */}
        <div style={{ background:'#FFFBF0', borderRadius:'16px', border:'1px solid #FDE68A', padding:'20px 24px', marginBottom:'20px' }}>
          <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#92400E', marginBottom:'4px' }}>💬 Tonight's conversation starter</p>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#374151', lineHeight:1.6 }}>
            {STARTERS[new Date().getDay() % STARTERS.length]}
          </p>
        </div>

        <NoTutorCard/>
        <div style={{ marginTop:'16px' }}><SelfRelianceStaircase/></div>

        {showAdd && (
          <AddChildModal
            onClose={() => setShowAdd(false)}
            onSuccess={() => setShowAdd(false)}
          />
        )}
      </div>
    </ParentSidebarLayout>
  )
}
