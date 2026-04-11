'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'
import AnimatedBook from '@/components/AnimatedBook'
import { NoTutorCard, SelfRelianceStaircase } from '@/components/ValueProps'

interface Child { id: string; full_name: string; email: string }

interface Stats {
  chaptersCompleted: number
  totalChapters:     number
  avgScore:          number | null
  lastStudied:       string
  currentChapter:    string
}

interface ActivityItem {
  emoji:   string
  text:    string
  time:    string
}

const STARTERS = [
  'What is one new thing your child learned today that surprised them?',
  'Ask your child to explain one chapter they read this week in their own words.',
  'Which subject does your child find most interesting right now, and why?',
  'What was the hardest question in the quiz your child took recently?',
  'Ask your child: if they could change one thing about how they study, what would it be?',
  'What is one fact your child learned this week that they want to share with you?',
  'Ask your child to teach you something they learned from their science chapter.',
]

function AddChildModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [step, setStep]             = useState<'form'|'payment'>('form')
  const [childName, setChildName]   = useState('')
  const [childEmail, setChildEmail] = useState('')
  const [password, setPassword]     = useState('')
  const [confirm, setConfirm]       = useState('')
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')

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

// ── Helpers ───────────────────────────────────────────────────────────────────

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins  = Math.floor(diff / 60000)
  if (mins < 60)   return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)    return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days === 1)  return 'Yesterday'
  return `${days} days ago`
}

const SUBJECT_CHAPTER_COUNTS: Record<string, number> = {
  english: 8, maths: 11, science: 9, history: 6, geography: 7, sanskrit: 8, ict: 5,
}

const CHAPTER_NAMES: Record<string, Record<number, string>> = {
  english:   { 1:'Whistles and Shaving Bristles', 2:'If I Were Lord of Tartary', 3:'The Fun They Had', 4:'In Morning Dew', 5:'The Boy Who Outran the Wind', 6:'The Blind Boy', 7:'Three Questions', 8:'From a Railway Carriage' },
  maths:     { 1:'Whole Numbers', 2:'HCF and LCM', 3:'Area and Perimeter', 4:'Volume', 5:'Fractions', 6:'Percentage', 7:'Ratio and Proportion', 8:'Basic Geometrical Concepts', 9:'Angles', 10:'Circles', 11:'Vedic Knowledge' },
  science:   { 1:'Magnetism', 2:'Simple Machines', 3:'Work and Energy', 4:'Intro to Chemistry', 5:'Structure of Atom', 6:'Physical and Chemical Changes', 7:'Cell', 8:'The Leaf', 9:'Respiratory System' },
  history:   { 1:'The Vedas', 2:'Essence of Hinduism', 3:'The Great Preachers', 4:'The Preamble', 5:'India Lives in Villages', 6:'The Power of Determination' },
  geography: { 1:'Earth Structure', 2:'Latitudes and Longitudes', 3:'Motions of the Earth', 4:'Maps', 5:'Natural Vegetation', 6:'Our Country India', 7:'Climate and Wildlife' },
  sanskrit:  { 1:'Prarthana', 2:'Vivekananda', 3:'Sanchalana Geetam', 4:'Sanskritabhasha Grihe Grihe', 5:'Sankhyah', 6:'Sandhi', 7:'Bhutakalah', 8:'Sambhashanam' },
  ict:       { 1:'Intro to Computers', 2:'Input and Output Devices', 3:'Storage Devices', 4:'MS Word', 5:'The Internet' },
}

// ── Main dashboard ────────────────────────────────────────────────────────────

export default function ParentDashboard() {
  const router = useRouter()
  const [children,    setChildren]    = useState<Child[]>([])
  const [activeChild, setActiveChild] = useState(0)
  const [showAdd,     setShowAdd]     = useState(false)
  const [parentName,  setParentName]  = useState('Parent')
  const [stats,       setStats]       = useState<Stats | null>(null)
  const [activity,    setActivity]    = useState<ActivityItem[]>([])
  const [loading,     setLoading]     = useState(true)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: profile } = await supabase.from('profiles').select('role, full_name').eq('id', user.id).maybeSingle()
      if (profile?.role !== 'parent') { router.push('/login'); return }
      setParentName(profile?.full_name || 'Parent')

      const { data: links } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id)
      if (!links?.length) { setLoading(false); return }
      const { data: profiles } = await supabase.from('profiles').select('id, full_name, email').in('id', links.map((l: any) => l.student_id))
      if (profiles?.length) setChildren(profiles as Child[])
    }
    load()
  }, [router])

  useEffect(() => {
    if (!children.length) return
    loadChildData(children[activeChild].id)
  }, [children, activeChild])

  const loadChildData = async (studentId: string) => {
    setLoading(true)
    const supabase = createClient()

    // Sections read per subject-chapter
    const { data: sections } = await supabase
      .from('student_lesson_progress')
      .select('subject, chapter_id, completed_at')
      .eq('student_id', studentId)
      .order('completed_at', { ascending: false })

    // Quiz attempts
    const { data: quizzes } = await supabase
      .from('student_quiz_attempts')
      .select('subject, chapter_id, score, created_at')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false })

    // ── Compute stats ──
    const sectionMap: Record<string, number> = {}
    sections?.forEach((s: any) => {
      const key = `${s.subject}-${s.chapter_id}`
      sectionMap[key] = (sectionMap[key] || 0) + 1
    })

    // Chapters fully completed (7 sections)
    const completedChapters = Object.keys(sectionMap).filter(k => sectionMap[k] >= 7).length

    // Total chapters across all subjects
    const totalChapters = Object.values(SUBJECT_CHAPTER_COUNTS).reduce((a, b) => a + b, 0)

    // Avg quiz score
    const scores = quizzes?.map((q: any) => q.score) || []
    const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null

    // Last studied
    const lastDate = sections?.[0]?.completed_at
    const lastStudied = lastDate ? timeAgo(lastDate) : 'Not yet'

    // Current chapter — most recent incomplete chapter
    const inProgress = Object.keys(sectionMap)
      .filter(k => sectionMap[k] < 7 && sectionMap[k] > 0)
      .sort((a, b) => sectionMap[b] - sectionMap[a])
    let currentChapter = 'No chapter in progress'
    if (inProgress.length) {
      const [subj, chapId] = inProgress[0].split('-')
      currentChapter = CHAPTER_NAMES[subj]?.[Number(chapId)] || `Chapter ${chapId}`
    }

    setStats({ chaptersCompleted: completedChapters, totalChapters, avgScore, lastStudied, currentChapter })

    // ── Build activity feed ──
    const feed: ActivityItem[] = []

    // Recent sections read
    sections?.slice(0, 3).forEach((s: any) => {
      const name = CHAPTER_NAMES[s.subject]?.[s.chapter_id] || `Chapter ${s.chapter_id}`
      feed.push({ emoji: '📖', text: `Read a section of "${name}"`, time: timeAgo(s.completed_at) })
    })

    // Recent quiz attempts
    quizzes?.slice(0, 2).forEach((q: any) => {
      const name = CHAPTER_NAMES[q.subject]?.[q.chapter_id] || `Chapter ${q.chapter_id}`
      feed.push({ emoji: '✅', text: `Completed quiz for "${name}" — scored ${q.score}%`, time: timeAgo(q.created_at) })
    })

    // Sort by recency (rough — already ordered from DB)
    setActivity(feed.slice(0, 5))
    setLoading(false)
  }

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

        {/* No children yet */}
        {!loading && children.length === 0 && (
          <div style={{ background:'white', borderRadius:'16px', border:'1px solid #E5E7EB', padding:'48px', textAlign:'center', marginBottom:'20px' }}>
            <p style={{ fontSize:'40px', marginBottom:'12px' }}>👶</p>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'18px', color:'#1B4332', marginBottom:'8px' }}>No students linked yet</p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#9CA3AF' }}>Your children's accounts will appear here once registered.</p>
          </div>
        )}

        {/* Stats row */}
        {stats && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:'12px', marginBottom:'24px' }}>
            {[
              { label:'Chapters done',  value:`${stats.chaptersCompleted}/${stats.totalChapters}`, color:'#1E40AF', bg:'#DBEAFE' },
              { label:'Avg quiz score', value: stats.avgScore != null ? `${stats.avgScore}%` : '—',  color:'#065F46', bg:'#D8F3DC' },
              { label:'Last studied',   value: stats.lastStudied,                                    color:'#92400E', bg:'#FEF3C7' },
            ].map(s => (
              <div key={s.label} style={{ background:s.bg, borderRadius:'14px', padding:'16px' }}>
                <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'20px', color:s.color, lineHeight:1 }}>{s.value}</p>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:s.color, opacity:0.75, marginTop:'4px' }}>{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Current chapter */}
        {stats && (
          <div style={{ background:'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius:'16px', padding:'20px 24px', marginBottom:'20px', display:'flex', alignItems:'center', gap:'16px' }}>
            <AnimatedBook/>
            <div>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'rgba(255,255,255,0.6)', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'4px' }}>Currently reading</p>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'17px', color:'white' }}>{stats.currentChapter}</p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'rgba(255,255,255,0.55)', marginTop:'3px' }}>Last studied {stats.lastStudied}</p>
            </div>
          </div>
        )}

        {/* Recent activity */}
        <div style={{ background:'white', borderRadius:'16px', border:'1px solid #E5E7EB', padding:'20px 24px', marginBottom:'20px' }}>
          <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#1B4332', marginBottom:'14px' }}>Recent activity</p>
          {activity.length === 0 ? (
            <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#9CA3AF', textAlign:'center', padding:'16px 0' }}>
              No activity yet — your child hasn't started reading yet.
            </p>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {activity.map((a, i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'10px' }}>
                  <span style={{ fontSize:'16px', flexShrink:0 }}>{a.emoji}</span>
                  <div style={{ flex:1 }}>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#374151' }}>{a.text}</p>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'#9CA3AF', marginTop:'2px' }}>{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
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
            onSuccess={() => { setShowAdd(false); window.location.reload() }}
          />
        )}
      </div>
    </ParentSidebarLayout>
  )
}
