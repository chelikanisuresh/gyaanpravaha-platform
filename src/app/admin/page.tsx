'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import AdminLayout from '@/components/AdminLayout'
import QuestionsContent from '@/components/admin-questions-content'
import WritingContent from '@/components/admin-writing-content'
import ExamContent from '@/components/admin-exam-content'
import SubscriptionsContent from '@/components/admin-subscriptions-content'
import InvoicesContent from '@/components/admin-invoices-content'
import { motion } from 'framer-motion'

interface Student { id: string; full_name: string; email: string; ai_quiz_enabled?: boolean }
interface LessonProgress { student_id: string; subject: string; chapter_id: number }
interface QuizAttempt { student_id: string; subject: string; chapter_id: number; score: number; created_at: string }
interface ClassQuestion { id: string; subject: string; chapter_title: string; question: string; is_active: boolean; created_at: string }
interface QuestionAttempt { student_id: string; question_id: string }

const SUBJECTS: Record<string, { label: string; emoji: string; color: string; light: string; total: number }> = {
  english:        { label:'English',     emoji:'📖', color:'#4338CA', light:'#EEF2FF', total:8  },
  maths:          { label:'Mathematics', emoji:'📐', color:'#1E3A8A', light:'#DBEAFE', total:11 },
  science:        { label:'Science',     emoji:'🔬', color:'#0F766E', light:'#CCFBF1', total:9  },
  'history-civics': { label:'History',  emoji:'🏛️', color:'#78350F', light:'#FEF3C7', total:6  },
  geography:      { label:'Geography',   emoji:'🌍', color:'#075985', light:'#DBEAFE', total:7  },
  sanskrit:       { label:'Sanskrit',    emoji:'🕉️', color:'#713F12', light:'#FEF9C3', total:8  },
  ict:            { label:'ICT',         emoji:'💻', color:'#4C1D95', light:'#EDE9FE', total:5  },
  marathi:        { label:'मराठी',       emoji:'📝', color:'#701A75', light:'#FAE8FF', total:17 },
  'rapid-reader': { label:'Rapid Reader', emoji:'📗', color:'#7C3AED', light:'#F5F3FF', total:19 },
}

function scoreColor(s: number) { return s >= 80 ? '#059669' : s >= 60 ? '#D97706' : '#DC2626' }
function scoreBg(s: number)    { return s >= 80 ? '#D1FAE5' : s >= 60 ? '#FEF3C7' : '#FEE2E2' }

function Counter({ target }: { target: number }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!target) return
    let n = 0
    const step = Math.max(1, Math.ceil(target / 20))
    const t = setInterval(() => { n = Math.min(n + step, target); setVal(n); if (n >= target) clearInterval(t) }, 40)
    return () => clearInterval(t)
  }, [target])
  return <>{val}</>
}

function AdminDashboardInner() {
  const router = useRouter()
  const [checking,  setChecking]  = useState(true)
  const [adminName, setAdminName] = useState('Admin')
  const [loading,   setLoading]   = useState(true)
  const [students,         setStudents]         = useState<Student[]>([])
  const [lessonProgress,   setLessonProgress]   = useState<LessonProgress[]>([])
  const [quizAttempts,     setQuizAttempts]      = useState<QuizAttempt[]>([])
  const [classQuestions,   setClassQuestions]   = useState<ClassQuestion[]>([])
  const [questionAttempts, setQuestionAttempts] = useState<QuestionAttempt[]>([])
  const [selectedStudent,  setSelectedStudent]  = useState<Student | null>(null)

  useEffect(() => {
    const check = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/admin/login'); return }
      const { data: profile } = await supabase.from('profiles').select('role, full_name').eq('id', user.id).maybeSingle()
      if (profile?.role !== 'admin') { router.push('/admin/login'); return }
      setAdminName((profile?.full_name || 'Admin').split(' ')[0])
      setChecking(false)
      loadData()
    }
    check()
  }, [router])

  const loadData = async () => {
    setLoading(true)
    const supabase = createClient()
    const [{ data: s }, { data: p }, { data: q }, { data: cq }, { data: qa }] = await Promise.all([
      supabase.from('profiles').select('id, full_name, email, ai_quiz_enabled').eq('role', 'student').order('full_name'),
      supabase.from('student_lesson_progress').select('student_id, subject, chapter_id'),
      supabase.from('student_quiz_attempts').select('student_id, subject, chapter_id, score, created_at').order('created_at', { ascending: false }),
      supabase.from('class_questions').select('id, subject, chapter_title, question, is_active, created_at').order('created_at', { ascending: false }),
      supabase.from('class_question_attempts').select('student_id, question_id'),
    ])
    setStudents(s || []); setLessonProgress(p || []); setQuizAttempts(q || [])
    setClassQuestions(cq || []); setQuestionAttempts(qa || [])
    setLoading(false)
  }

  // ── Computed ──
  const totalQuizzes   = quizAttempts.length
  const allScores      = quizAttempts.map(a => a.score)
  const overallAvg     = allScores.length ? Math.round(allScores.reduce((a,b)=>a+b,0)/allScores.length) : null
  const activeQuestions = classQuestions.filter(q => q.is_active).length

  if (checking) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#F8FAFF' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{ width:'20px', height:'20px', border:'2px solid #E2E8F0', borderTopColor:'#4338CA', borderRadius:'50%' }}/>
    </div>
  )



  // ── Main dashboard ──
  return (
    <AdminLayout adminName={adminName}>{(activeTab, setActiveTab) => {
      if (selectedStudent) {
    const sp = lessonProgress.filter(p => p.student_id === selectedStudent.id)
    const sq = quizAttempts.filter(a => a.student_id === selectedStudent.id)
    const spMap: Record<string, Set<number>> = {}
    sp.forEach(p => { if (!spMap[p.subject]) spMap[p.subject] = new Set(); spMap[p.subject].add(p.chapter_id) })
    const sqMap: Record<string, Record<number, number>> = {}
    sq.forEach(a => { if (!sqMap[a.subject]) sqMap[a.subject] = {}; if (!(a.chapter_id in sqMap[a.subject])) sqMap[a.subject][a.chapter_id] = a.score })
    const totalDone = new Set(sp.map(p => `${p.subject}-${p.chapter_id}`)).size
    const studentScores = sq.map(a => a.score)
    const studentAvg = studentScores.length ? Math.round(studentScores.reduce((a,b)=>a+b,0)/studentScores.length) : null

        return (
        <div style={{ maxWidth: '900px' }}>
          {/* Back + header */}
          <div style={{ display:'flex', alignItems:'center', gap:'16px', marginBottom:'28px' }}>
            <button onClick={() => setSelectedStudent(null)}
              style={{ display:'flex', alignItems:'center', gap:'6px', background:'white', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'8px 14px', cursor:'pointer', fontFamily:'var(--font-heading)', fontWeight:600, fontSize:'13px', color:'#64748B' }}>
              ← Back
            </button>
            <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
              <div style={{ width:'44px', height:'44px', borderRadius:'50%', background:'linear-gradient(135deg,#4338CA,#6366F1)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'16px', color:'white' }}>
                {(selectedStudent.full_name || 'S').charAt(0)}
              </div>
              <div>
                <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'20px', color:'#1F2937' }}>{selectedStudent.full_name || 'Student'}</p>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#94A3B8' }}>{selectedStudent.email}</p>
              </div>
            </div>
            <div style={{ marginLeft:'auto', display:'flex', gap:'12px', alignItems:'center' }}>
              {/* AI Quiz toggle */}
              <button
                onClick={async () => {
                  const supabase = createClient()
                  const newVal = !selectedStudent.ai_quiz_enabled
                  await supabase.from('profiles').update({ ai_quiz_enabled: newVal }).eq('id', selectedStudent.id)
                  setSelectedStudent({ ...selectedStudent, ai_quiz_enabled: newVal })
                  setStudents(prev => prev.map(s => s.id === selectedStudent.id ? { ...s, ai_quiz_enabled: newVal } : s))
                }}
                style={{ display:'flex', alignItems:'center', gap:'8px', padding:'10px 16px', borderRadius:'12px', border:`2px solid ${selectedStudent.ai_quiz_enabled ? '#7C3AED' : '#E5E7EB'}`, background: selectedStudent.ai_quiz_enabled ? '#F5F3FF' : 'white', cursor:'pointer', transition:'all 0.2s' }}>
                <span style={{ fontSize:'16px' }}>✨</span>
                <div style={{ textAlign:'left' }}>
                  <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color: selectedStudent.ai_quiz_enabled ? '#7C3AED' : '#94A3B8', lineHeight:1 }}>AI Quiz</p>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color: selectedStudent.ai_quiz_enabled ? '#6D28D9' : '#CBD5E1', marginTop:'2px' }}>{selectedStudent.ai_quiz_enabled ? 'Enabled' : 'Disabled'}</p>
                </div>
                <div style={{ width:'32px', height:'18px', borderRadius:'9px', background: selectedStudent.ai_quiz_enabled ? '#7C3AED' : '#E5E7EB', position:'relative', transition:'all 0.2s', flexShrink:0 }}>
                  <div style={{ position:'absolute', top:'3px', left: selectedStudent.ai_quiz_enabled ? '17px' : '3px', width:'12px', height:'12px', borderRadius:'50%', background:'white', transition:'all 0.2s', boxShadow:'0 1px 3px rgba(0,0,0,0.2)' }}/>
                </div>
              </button>
              <div style={{ background:'#EEF2FF', borderRadius:'12px', padding:'10px 16px', textAlign:'center' }}>
                <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'20px', color:'#4338CA', lineHeight:1 }}>{totalDone}</p>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'#818CF8', marginTop:'2px' }}>Chapters</p>
              </div>
              {studentAvg !== null && (
                <div style={{ background:scoreBg(studentAvg), borderRadius:'12px', padding:'10px 16px', textAlign:'center' }}>
                  <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'20px', color:scoreColor(studentAvg), lineHeight:1 }}>{studentAvg}%</p>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:scoreColor(studentAvg), marginTop:'2px' }}>Avg score</p>
                </div>
              )}
            </div>
          </div>

          {/* Subject breakdown */}
          <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
            {Object.entries(SUBJECTS).map(([key, s]) => {
              const done   = spMap[key]?.size || 0
              const scores = Object.values(sqMap[key] || {})
              const avg    = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : null
              const pct    = Math.round((done / s.total) * 100)
              return (
                <motion.div key={key} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                  style={{ background:'white', borderRadius:'18px', border:'1.5px solid #F1F5F9', padding:'20px 24px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
                    <div style={{ width:'40px', height:'40px', minWidth:'40px', borderRadius:'12px', background:s.light, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>{s.emoji}</div>
                    <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'15px', color:'#1F2937', flex:1 }}>{s.label}</p>
                    <span style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:s.color, background:s.light, padding:'3px 12px', borderRadius:'20px' }}>{done}/{s.total} done</span>
                    {avg !== null && <span style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:scoreColor(avg), background:scoreBg(avg), padding:'3px 12px', borderRadius:'20px' }}>⭐ {avg}%</span>}
                  </div>
                  {/* Progress bar */}
                  <div style={{ height:'5px', background:'#F1F5F9', borderRadius:'3px', overflow:'hidden', marginBottom:'12px' }}>
                    <motion.div initial={{ width:0 }} animate={{ width:`${pct}%` }} transition={{ duration:0.8 }}
                      style={{ height:'100%', background:s.color, borderRadius:'3px', opacity: done > 0 ? 1 : 0.2 }}/>
                  </div>
                  {/* Chapter tiles */}
                  <div style={{ display:'flex', gap:'5px', flexWrap:'wrap' }}>
                    {Array.from({ length: s.total }, (_, i) => i+1).map(chId => {
                      const read  = spMap[key]?.has(chId)
                      const score = sqMap[key]?.[chId]
                      return (
                        <div key={chId} title={`Ch.${chId}${score != null ? ` — ${score}%` : ''}`}
                          style={{ width:'40px', height:'44px', borderRadius:'10px', background: read ? (score != null ? scoreBg(score) : s.light) : '#F8FAFC', border:`1px solid ${read ? (score != null ? scoreColor(score)+'30' : s.color+'30') : '#E2E8F0'}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', cursor:'default' }}>
                          <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'11px', color: read ? (score != null ? scoreColor(score) : s.color) : '#CBD5E1', lineHeight:1 }}>{chId}</p>
                          {score != null && <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'9px', color:scoreColor(score), marginTop:'2px' }}>{score}%</p>}
                        </div>
                      )
                    })}
                  </div>
                  {done === 0 && <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#CBD5E1', marginTop:'8px' }}>No activity yet</p>}
                </motion.div>
              )
            })}
          </div>
        </div>
        )
      }
      return (
      <div style={{ maxWidth:'960px' }}>

        {/* Greeting */}
        <motion.div initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }} style={{ marginBottom:'24px' }}>
          <h1 style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'26px', color:'#1F2937', marginBottom:'4px' }}>
            Welcome back, {adminName} 👋
          </h1>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#64748B' }}>Here is what is happening across the platform today.</p>
        </motion.div>

        {/* Stats row */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'12px', marginBottom:'28px' }}>
          {[
            { label:'Total students',     value: students.length,   emoji:'🎓', bg:'#EEF2FF', color:'#4338CA', sub:'#818CF8' },
            { label:'Quiz attempts',      value: totalQuizzes,      emoji:'✅', bg:'#F0FDF4', color:'#0F766E', sub:'#34D399' },
            { label:'Avg quiz score',     value: overallAvg !== null ? `${overallAvg}%` : '—', emoji:'📊', bg:'#FEF3C7', color:'#92400E', sub:'#F59E0B', noCounter: true },
            { label:'Active questions',   value: activeQuestions,   emoji:'📝', bg:'#FDF4FF', color:'#701A75', sub:'#C084FC' },
            { label:'Q&A answers',        value: questionAttempts.length, emoji:'✍️', bg:'#F0F9FF', color:'#075985', sub:'#38BDF8' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} transition={{ delay:i*0.06 }}
              style={{ background:s.bg, borderRadius:'18px', padding:'20px' }}>
              <span style={{ fontSize:'22px', display:'block', marginBottom:'8px' }}>{s.emoji}</span>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'26px', color:s.color, lineHeight:1, marginBottom:'4px' }}>
                {loading ? '—' : s.noCounter ? s.value : <Counter target={typeof s.value === 'number' ? s.value : 0}/>}
              </p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:s.sub }}>{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:'6px', marginBottom:'20px', background:'#F1F5F9', borderRadius:'14px', padding:'4px', width:'fit-content' }}>
          {(['overview','students','questions'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ padding:'9px 20px', borderRadius:'11px', border:'none', background: activeTab===tab ? 'white' : 'transparent', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color: activeTab===tab ? '#1F2937' : '#94A3B8', cursor:'pointer', boxShadow: activeTab===tab ? '0 1px 4px rgba(0,0,0,0.08)' : 'none', transition:'all 0.15s' }}>
              {tab==='overview' ? '📊 Overview' : tab==='students' ? '🎓 Students' : '📝 Questions'}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ display:'flex', alignItems:'center', gap:'12px', padding:'40px' }}>
            <motion.div animate={{ rotate:360 }} transition={{ duration:1, repeat:Infinity, ease:'linear' }}
              style={{ width:'18px', height:'18px', border:'2px solid #E2E8F0', borderTopColor:'#4338CA', borderRadius:'50%' }}/>
            <p style={{ fontFamily:'var(--font-body)', color:'#94A3B8' }}>Loading data...</p>
          </div>
        ) : (
          <>
            {/* ── OVERVIEW ── */}
            {activeTab === 'overview' && (
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                {Object.entries(SUBJECTS).map(([key, s], idx) => {
                  const subjectQ   = quizAttempts.filter(a => a.subject === key)
                  const subjectP   = lessonProgress.filter(p => p.subject === key)
                  const studentsStarted = new Set(subjectP.map(p => p.student_id)).size
                  const allSubjScores  = subjectQ.map(a => a.score)
                  const avg = allSubjScores.length ? Math.round(allSubjScores.reduce((a,b)=>a+b,0)/allSubjScores.length) : null
                  return (
                    <motion.div key={key} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:idx*0.04 }}
                      style={{ background:'white', borderRadius:'18px', border:'1.5px solid #F1F5F9', padding:'20px 24px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px', flexWrap:'wrap' }}>
                        <div style={{ width:'40px', height:'40px', minWidth:'40px', borderRadius:'12px', background:s.light, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>{s.emoji}</div>
                        <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'15px', color:'#1F2937', flex:1 }}>{s.label}</p>
                        <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                          <span style={{ background:'#F1F5F9', borderRadius:'20px', padding:'4px 12px', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#374151' }}>👥 {studentsStarted}/{students.length} students</span>
                          <span style={{ background:'#F1F5F9', borderRadius:'20px', padding:'4px 12px', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#374151' }}>🎯 {subjectQ.length} quiz attempts</span>
                          {avg !== null && <span style={{ background:scoreBg(avg), borderRadius:'20px', padding:'4px 12px', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:scoreColor(avg) }}>📊 {avg}% avg</span>}
                        </div>
                      </div>
                      {/* Per-chapter completion across all students */}
                      <div style={{ display:'flex', gap:'4px' }}>
                        {Array.from({ length: s.total }, (_, i) => i+1).map(chId => {
                          const completions = students.filter(st => subjectP.some(p => p.student_id === st.id && p.chapter_id === chId)).length
                          const pct = students.length ? Math.round((completions/students.length)*100) : 0
                          return (
                            <div key={chId} title={`Ch.${chId}: ${completions}/${students.length} students`} style={{ flex:1 }}>
                              <div style={{ height:'30px', background:'#F1F5F9', borderRadius:'6px', overflow:'hidden', position:'relative' }}>
                                <div style={{ height:'100%', width:`${pct}%`, background:s.color, opacity:0.75 }}/>
                                <p style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'10px', color: pct > 40 ? 'white' : '#94A3B8', margin:0 }}>{chId}</p>
                              </div>
                              <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:'#94A3B8', textAlign:'center', marginTop:'3px' }}>{pct}%</p>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}

            {/* ── STUDENTS ── */}
            {activeTab === 'students' && (
              <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                {students.length === 0 ? (
                  <div style={{ textAlign:'center', padding:'60px', background:'white', borderRadius:'18px', border:'1.5px solid #E2E8F0' }}>
                    <p style={{ fontSize:'40px', marginBottom:'12px' }}>🎓</p>
                    <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'16px', color:'#374151' }}>No students yet</p>
                  </div>
                ) : students.map((student, i) => {
                  const sp = lessonProgress.filter(p => p.student_id === student.id)
                  const sq = quizAttempts.filter(a => a.student_id === student.id)
                  const chapDone = new Set(sp.map(p => `${p.subject}-${p.chapter_id}`)).size
                  const scores   = sq.map(a => a.score)
                  const avg      = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : null
                  const lastDate = sq[0]?.created_at ? new Date(sq[0].created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short' }) : sp.length ? 'Reading' : '—'
                  return (
                    <motion.button key={student.id} onClick={() => setSelectedStudent(student)}
                      initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.04 }}
                      whileHover={{ y:-1, boxShadow:'0 4px 16px rgba(0,0,0,0.06)' }}
                      style={{ background:'white', borderRadius:'16px', border:'1.5px solid #F1F5F9', padding:'16px 20px', display:'flex', alignItems:'center', gap:'14px', cursor:'pointer', textAlign:'left', width:'100%' }}>
                      <div style={{ width:'44px', height:'44px', minWidth:'44px', borderRadius:'50%', background:'linear-gradient(135deg,#4338CA,#6366F1)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'16px', color:'white', flexShrink:0 }}>
                        {(student.full_name || 'S').charAt(0)}
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'15px', color:'#1F2937', marginBottom:'3px' }}>{student.full_name || '—'}</p>
                        <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#94A3B8', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{student.email}</p>
                      </div>
                      <div style={{ display:'flex', gap:'12px', flexShrink:0 }}>
                        <div style={{ textAlign:'center', background:'#EEF2FF', borderRadius:'10px', padding:'8px 14px' }}>
                          <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'18px', color:'#4338CA', lineHeight:1 }}>{chapDone}</p>
                          <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:'#818CF8', marginTop:'2px' }}>chapters</p>
                        </div>
                        {avg !== null ? (
                          <div style={{ textAlign:'center', background:scoreBg(avg), borderRadius:'10px', padding:'8px 14px' }}>
                            <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'18px', color:scoreColor(avg), lineHeight:1 }}>{avg}%</p>
                            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:scoreColor(avg), marginTop:'2px' }}>avg score</p>
                          </div>
                        ) : (
                          <div style={{ textAlign:'center', background:'#F8FAFC', borderRadius:'10px', padding:'8px 14px' }}>
                            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', color:'#CBD5E1', lineHeight:1 }}>—</p>
                            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:'#CBD5E1', marginTop:'2px' }}>no quizzes</p>
                          </div>
                        )}
                        <div style={{ textAlign:'center' }}>
                          <p style={{ fontFamily:'var(--font-heading)', fontWeight:600, fontSize:'12px', color:'#94A3B8' }}>{lastDate}</p>
                          <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:'#CBD5E1', marginTop:'2px' }}>last active</p>
                        </div>
                      </div>
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'4px', flexShrink:0 }}>
                        <span style={{ fontSize:'14px' }}>{student.ai_quiz_enabled ? '✨' : '○'}</span>
                        <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', color: student.ai_quiz_enabled ? '#7C3AED' : '#CBD5E1' }}>AI Quiz</p>
                      </div>
                      <span style={{ color:'#E2E8F0', fontSize:'20px', flexShrink:0 }}>›</span>
                    </motion.button>
                  )
                })}
              </div>
            )}

            {/* ── EXAM MODE ── */}
            {activeTab === 'exam' && <ExamContent/>}

            {/* ── SUBSCRIPTIONS ── */}
            {activeTab === 'subscriptions' && <SubscriptionsContent/>}

            {/* ── INVOICES ── */}
            {activeTab === 'invoices' && <InvoicesContent/>}

            {/* ── QUESTIONS ── */}
            {activeTab === 'questions' && <QuestionsContent/>}

            {/* ── WRITING ── */}
            {activeTab === 'writing' && <WritingContent/>}
          </>
        )}
      </div>
      )
    }}
    </AdminLayout>
  )
}

export default AdminDashboardInner
