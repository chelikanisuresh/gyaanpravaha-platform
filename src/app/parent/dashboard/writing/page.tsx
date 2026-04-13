'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'
import { motion, AnimatePresence } from 'framer-motion'

interface Child { id: string; full_name: string; email: string }

interface Prompt {
  id: string
  chapter_id: number
  prompt_text: string
  min_words: number
  max_words: number
  deadline: string
  created_at: string
}

interface Submission {
  id: string
  student_id: string
  prompt_id: string
  chapter_id: number
  content: string
  word_count: number
  ai_score: number | null
  ai_feedback: string | null
  ai_improvement: string | null
  final_score: number | null
  admin_comment: string | null
  status: 'submitted' | 'reviewed' | 'released'
  created_at: string
}

const CHAPTERS: Record<number, string> = {
  1:'Whistles and Shaving Bristles', 2:'If I Were Lord of Tartary',
  3:'The Fun They Had', 4:'In Morning Dew',
  5:'The Boy Who Outran the Wind', 6:'The Blind Boy',
  7:'Three Questions', 8:'From a Railway Carriage',
}

function statusBadge(status: Submission['status']) {
  const map = {
    submitted: { label: 'Submitted',     bg: '#FEF3C7', color: '#92400E' },
    reviewed:  { label: 'Under review',  bg: '#EEF2FF', color: '#4338CA' },
    released:  { label: 'Score released', bg: '#D1FAE5', color: '#065F46' },
  }
  return map[status]
}

function scoreColor(s: number) { return s >= 16 ? '#059669' : s >= 12 ? '#D97706' : '#DC2626' }
function scoreBg(s: number)    { return s >= 16 ? '#D1FAE5' : s >= 12 ? '#FEF3C7' : '#FEE2E2' }

function WritingInner() {
  const searchParams = useSearchParams()
  const [children,    setChildren]   = useState<Child[]>([])
  const [selectedId,  setSelectedId] = useState('')
  const [parentName,  setParentName] = useState('Parent')
  const [prompts,     setPrompts]    = useState<Prompt[]>([])
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading,     setLoading]    = useState(true)
  const [expanded,    setExpanded]   = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: p } = await supabase.from('profiles').select('full_name').eq('id', user.id).maybeSingle()
      if (p?.full_name) setParentName(p.full_name.split(' ')[0])
      const { data: links } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id)
      if (!links?.length) { setLoading(false); return }
      const { data: profiles } = await supabase.from('profiles').select('id, full_name, email').in('id', links.map((l: any) => l.student_id))
      if (profiles?.length) {
        setChildren(profiles as Child[])
        setSelectedId(searchParams.get('child') || profiles[0].id)
      }
    }
    load()
  }, [searchParams])

  useEffect(() => {
    if (!selectedId) return
    loadData(selectedId)
  }, [selectedId])

  const loadData = async (studentId: string) => {
    setLoading(true)
    const supabase = createClient()
    const [{ data: p }, { data: s }] = await Promise.all([
      supabase.from('writing_prompts').select('*').order('created_at', { ascending: false }),
      supabase.from('writing_submissions').select('*').eq('student_id', studentId).order('created_at', { ascending: false }),
    ])
    setPrompts((p || []) as Prompt[])
    setSubmissions((s || []) as Submission[])
    setLoading(false)
  }

  const child = children.find(c => c.id === selectedId)
  const childFirstName = (child?.full_name || 'Your child').split(' ')[0]

  // Match prompts with submissions
  const promptsWithSubs = prompts.map(pr => ({
    ...pr,
    submission: submissions.find(s => s.prompt_id === pr.id) || null,
  }))

  const submitted   = promptsWithSubs.filter(p => p.submission).length
  const released    = promptsWithSubs.filter(p => p.submission?.status === 'released').length
  const avgScore    = (() => {
    const scores = promptsWithSubs.filter(p => p.submission?.final_score != null).map(p => p.submission!.final_score!)
    return scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : null
  })()

  return (
    <ParentSidebarLayout parentName={parentName}>
      <div style={{ maxWidth: '800px' }}>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }} style={{ marginBottom:'24px' }}>
          <h1 style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'24px', color:'#1B4332', marginBottom:'4px' }}>Writing Prompts</h1>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#64748B' }}>
            Writing assignments set by the teacher — {childFirstName}'s submissions and scores appear here.
          </p>
        </motion.div>

        {/* Child tabs */}
        {children.length > 1 && (
          <div style={{ display:'flex', gap:'8px', marginBottom:'20px', flexWrap:'wrap' }}>
            {children.map(c => {
              const isActive = selectedId === c.id
              return (
                <button key={c.id} onClick={() => setSelectedId(c.id)}
                  style={{ display:'flex', alignItems:'center', gap:'8px', padding:'8px 18px', borderRadius:'20px', border: isActive ? '2px solid #1B4332' : '1.5px solid #E5E7EB', background: isActive ? '#1B4332' : 'white', color: isActive ? 'white' : '#374151', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', cursor:'pointer', transition:'all 0.15s' }}>
                  <div style={{ width:'22px', height:'22px', minWidth:'22px', borderRadius:'50%', background: isActive ? 'rgba(255,255,255,0.2)' : '#D8F3DC', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'10px', color: isActive ? 'white' : '#1B4332' }}>
                    {(c.full_name || 'S').charAt(0).toUpperCase()}
                  </div>
                  {(c.full_name || 'Student').split(' ')[0]}
                </button>
              )
            })}
          </div>
        )}

        {/* Stats */}
        {!loading && prompts.length > 0 && (
          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
            style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px', marginBottom:'24px' }}>
            {[
              { label:'Total prompts',     value: prompts.length,         bg:'#EEF2FF', color:'#4338CA', sub:'#818CF8' },
              { label:'Submitted',         value: submitted,               bg:'#FEF3C7', color:'#92400E', sub:'#F59E0B' },
              { label:'Avg score (/20)',   value: avgScore !== null ? `${avgScore}/20` : '—', bg:'#F0FDF4', color:'#0F766E', sub:'#34D399', noCounter:true },
            ].map(s => (
              <div key={s.label} style={{ background:s.bg, borderRadius:'14px', padding:'16px 18px' }}>
                <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'22px', color:s.color, lineHeight:1, marginBottom:'4px' }}>{s.value}</p>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:s.sub }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ display:'flex', alignItems:'center', gap:'10px', padding:'20px' }}>
            <motion.div animate={{ rotate:360 }} transition={{ duration:1, repeat:Infinity, ease:'linear' }}
              style={{ width:'16px', height:'16px', border:'2px solid #E2E8F0', borderTopColor:'#1B4332', borderRadius:'50%' }}/>
            <p style={{ fontFamily:'var(--font-body)', color:'#94A3B8', fontSize:'13px' }}>Loading writing prompts...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && prompts.length === 0 && (
          <motion.div initial={{ opacity:0, scale:0.97 }} animate={{ opacity:1, scale:1 }}
            style={{ background:'white', borderRadius:'20px', border:'1.5px solid #E2E8F0', padding:'64px 40px', textAlign:'center' }}>
            <div style={{ width:'72px', height:'72px', background:'#F0FDF4', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', fontSize:'32px' }}>✍️</div>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'20px', color:'#1B4332', marginBottom:'10px' }}>No writing prompts yet</p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#94A3B8', maxWidth:'380px', margin:'0 auto', lineHeight:1.8 }}>
              Writing assignments will appear here once the teacher assigns them. When {childFirstName} submits a response, you'll see their work and score here.
            </p>
          </motion.div>
        )}

        {/* Prompt cards */}
        {!loading && promptsWithSubs.length > 0 && (
          <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
            {promptsWithSubs.map((pr, i) => {
              const sub    = pr.submission
              const badge  = sub ? statusBadge(sub.status) : null
              const isOpen = expanded === pr.id
              const chName = CHAPTERS[pr.chapter_id] || `Chapter ${pr.chapter_id}`
              const deadline = new Date(pr.deadline).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })

              return (
                <motion.div key={pr.id} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.06 }}
                  style={{ background:'white', borderRadius:'18px', border: isOpen ? '1.5px solid #1B4332' : '1.5px solid #E2E8F0', overflow:'hidden', transition:'border-color 0.2s' }}>

                  {/* Header row */}
                  <button onClick={() => setExpanded(isOpen ? null : pr.id)}
                    style={{ width:'100%', padding:'18px 22px', display:'flex', alignItems:'center', gap:'14px', background:'none', border:'none', cursor:'pointer', textAlign:'left' }}>
                    <div style={{ width:'42px', height:'42px', minWidth:'42px', borderRadius:'12px', background: sub ? '#F0FDF4' : '#F8FAFF', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px' }}>
                      {sub ? '✍️' : '📝'}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px', flexWrap:'wrap' }}>
                        <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#374151' }}>{chName}</p>
                        {badge && <span style={{ background:badge.bg, color:badge.color, fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', padding:'2px 10px', borderRadius:'20px' }}>{badge.label}</span>}
                        {!sub && <span style={{ background:'#F1F5F9', color:'#94A3B8', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', padding:'2px 10px', borderRadius:'20px' }}>Not submitted</span>}
                      </div>
                      <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#94A3B8' }}>
                        Due: {deadline} · {pr.min_words}–{pr.max_words} words
                        {sub && ` · ${sub.word_count} words written`}
                      </p>
                    </div>
                    {sub?.final_score != null && (
                      <div style={{ background:scoreBg(sub.final_score), borderRadius:'12px', padding:'8px 14px', textAlign:'center', flexShrink:0 }}>
                        <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'18px', color:scoreColor(sub.final_score), lineHeight:1 }}>{sub.final_score}/20</p>
                        <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:scoreColor(sub.final_score), marginTop:'2px' }}>Score</p>
                      </div>
                    )}
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration:0.2 }}
                      style={{ color:'#94A3B8', fontSize:'18px', flexShrink:0, display:'block' }}>▾</motion.span>
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.25 }}
                        style={{ overflow:'hidden', borderTop:'1px solid #F0FDF4' }}>
                        <div style={{ padding:'20px 22px' }}>

                          {/* Prompt text */}
                          <div style={{ background:'#F8FAFF', borderRadius:'12px', padding:'16px', marginBottom:'16px', border:'1px solid #E2E8F0' }}>
                            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#94A3B8', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'8px' }}>Writing prompt</p>
                            <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#374151', lineHeight:1.7 }}>{pr.prompt_text}</p>
                          </div>

                          {/* Not submitted state */}
                          {!sub && (
                            <div style={{ background:'#FEF3C7', borderRadius:'12px', padding:'14px 16px', display:'flex', gap:'10px', alignItems:'flex-start' }}>
                              <span style={{ fontSize:'18px', flexShrink:0 }}>⏳</span>
                              <div>
                                <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#92400E', marginBottom:'3px' }}>Not yet submitted</p>
                                <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#B45309', lineHeight:1.6 }}>
                                  {childFirstName} hasn't submitted this writing prompt yet. Deadline is {deadline}.
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Submitted but not released */}
                          {sub && sub.status !== 'released' && (
                            <div style={{ background:'#EEF2FF', borderRadius:'12px', padding:'14px 16px', display:'flex', gap:'10px', alignItems:'flex-start' }}>
                              <span style={{ fontSize:'18px', flexShrink:0 }}>📬</span>
                              <div>
                                <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#4338CA', marginBottom:'3px' }}>Submitted — under review</p>
                                <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#6366F1', lineHeight:1.6 }}>
                                  {childFirstName} submitted {sub.word_count} words on {new Date(sub.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short' })}. The teacher is reviewing it and will release the score soon.
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Released — show full results */}
                          {sub && sub.status === 'released' && (
                            <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                              {/* Score */}
                              {sub.final_score != null && (
                                <div style={{ display:'flex', alignItems:'center', gap:'16px', background:scoreBg(sub.final_score), borderRadius:'14px', padding:'16px 20px' }}>
                                  <div style={{ textAlign:'center' }}>
                                    <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'32px', color:scoreColor(sub.final_score), lineHeight:1 }}>{sub.final_score}</p>
                                    <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:scoreColor(sub.final_score) }}>out of 20</p>
                                  </div>
                                  <div>
                                    <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'16px', color:scoreColor(sub.final_score), marginBottom:'3px' }}>
                                      {sub.final_score >= 16 ? 'Excellent work! 🌟' : sub.final_score >= 12 ? 'Good effort! 👍' : 'Keep practising! 💪'}
                                    </p>
                                    <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:scoreColor(sub.final_score), opacity:0.8 }}>
                                      {sub.word_count} words · {new Date(sub.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short' })}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* Teacher comment */}
                              {sub.admin_comment && (
                                <div style={{ background:'#F0FDF4', borderRadius:'12px', padding:'14px 16px', border:'1px solid #D1FAE5' }}>
                                  <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#065F46', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'8px' }}>Teacher's note</p>
                                  <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#1B4332', lineHeight:1.7, fontStyle:'italic' }}>"{sub.admin_comment}"</p>
                                </div>
                              )}

                              {/* AI feedback */}
                              {sub.ai_feedback && (
                                <div style={{ background:'white', borderRadius:'12px', padding:'14px 16px', border:'1.5px solid #E2E8F0' }}>
                                  <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#94A3B8', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'8px' }}>AI feedback</p>
                                  <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#374151', lineHeight:1.7 }}>{sub.ai_feedback}</p>
                                </div>
                              )}

                              {/* Improvement tip */}
                              {sub.ai_improvement && (
                                <div style={{ background:'#FFFBEB', borderRadius:'12px', padding:'14px 16px', border:'1px solid #FDE68A', display:'flex', gap:'10px' }}>
                                  <span style={{ fontSize:'18px', flexShrink:0 }}>💡</span>
                                  <div>
                                    <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'#92400E', marginBottom:'4px' }}>How to improve</p>
                                    <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#78350F', lineHeight:1.7 }}>{sub.ai_improvement}</p>
                                  </div>
                                </div>
                              )}

                              {/* Child's submission */}
                              <details style={{ background:'#F8FAFF', borderRadius:'12px', border:'1px solid #E2E8F0', overflow:'hidden' }}>
                                <summary style={{ padding:'12px 16px', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#64748B', cursor:'pointer', listStyle:'none', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                                  {childFirstName}'s submission ↓
                                </summary>
                                <div style={{ padding:'0 16px 16px' }}>
                                  <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#374151', lineHeight:1.8, whiteSpace:'pre-wrap' }}>{sub.content}</p>
                                </div>
                              </details>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </ParentSidebarLayout>
  )
}

export default function WritingPage() {
  return <Suspense fallback={<div style={{ padding:'40px', fontFamily:'var(--font-body)', color:'#9CA3AF' }}>Loading...</div>}><WritingInner/></Suspense>
}
