'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { TOTAL_CHAPTERS, SUBJECT_COUNT } from '@/lib/subjects-config'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'
import { motion } from 'framer-motion'

interface Child { id: string; full_name: string; email: string }

const SUBJECT_META: Record<string, { label: string; emoji: string; color: string; light: string; total: number }> = {
  english:        { label:'English',     emoji:'📖', color:'#4338CA', light:'#EEF2FF', total:8  },
  maths:          { label:'Mathematics', emoji:'📐', color:'#1E3A8A', light:'#DBEAFE', total:11 },
  science:        { label:'Science',     emoji:'🔬', color:'#0F766E', light:'#CCFBF1', total:9  },
  'history-civics': { label:'History',  emoji:'🏛️', color:'#78350F', light:'#FEF3C7', total:6  },
  geography:      { label:'Geography',   emoji:'🌍', color:'#075985', light:'#DBEAFE', total:7  },
  sanskrit:       { label:'Sanskrit',    emoji:'🕉️', color:'#713F12', light:'#FEF9C3', total:8  },
  ict:            { label:'ICT',         emoji:'💻', color:'#4C1D95', light:'#EDE9FE', total:5  },
  marathi:        { label:'मराठी',       emoji:'📝', color:'#701A75', light:'#FAE8FF', total:17 },
}

function ProgressRing({ pct, color, size = 60 }: { pct: number; color: string; size?: number }) {
  const r = (size - 7) / 2, circ = 2 * Math.PI * r
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#F1F5F9" strokeWidth="7"/>
      <motion.circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="7"
        strokeLinecap="round" strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - (circ * pct / 100) }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        transform={`rotate(-90 ${size/2} ${size/2})`}/>
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central"
        fill={color} fontSize={size * 0.22} fontWeight="800" fontFamily="var(--font-heading)">{pct}%</text>
    </svg>
  )
}

function OverviewInner() {
  const searchParams = useSearchParams()
  const [children,    setChildren]   = useState<Child[]>([])
  const [selectedId,  setSelectedId] = useState('')
  const [parentName,  setParentName] = useState('Parent')
  const [subjects,    setSubjects]   = useState<{ key: string; done: number; total: number; avg: number | null; quizzesTaken: number }[]>([])
  const [loading,     setLoading]    = useState(true)
  const [totalDone,   setTotalDone]  = useState(0)
  const [overallAvg,  setOverallAvg] = useState<number | null>(null)

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

  useEffect(() => { if (selectedId) loadData(selectedId) }, [selectedId])

  const loadData = async (studentId: string) => {
    setLoading(true)
    const supabase = createClient()
    const [{ data: sections }, { data: quizzes }] = await Promise.all([
      supabase.from('student_lesson_progress').select('subject, chapter_id').eq('student_id', studentId),
      supabase.from('student_quiz_attempts').select('subject, chapter_id, score').eq('student_id', studentId),
    ])
    const secMap: Record<string, number> = {}
    sections?.forEach((s: any) => { const k = `${s.subject}-${s.chapter_id}`; secMap[k] = (secMap[k] || 0) + 1 })
    // Keep ALL quiz scores per subject (not just first per chapter) — matches student dashboard
    const subjectScores: Record<string, number[]> = {}
    quizzes?.forEach((q: any) => {
      if (!subjectScores[q.subject]) subjectScores[q.subject] = []
      subjectScores[q.subject].push(q.score)
    })

    // Also keep best score per chapter for "quizzesTaken" count
    const scoreMap: Record<string, number> = {}
    quizzes?.forEach((q: any) => { const k = `${q.subject}-${q.chapter_id}`; if (!(k in scoreMap)) scoreMap[k] = q.score })

    const data = Object.entries(SUBJECT_META).map(([key, meta]) => {
      const done = Array.from({ length: meta.total }, (_, i) => i+1).filter(chId => (secMap[`${key}-${chId}`] || 0) >= 7).length
      const scores = subjectScores[key] || []
      const chaptersTaken = new Set(quizzes?.filter((q:any) => q.subject === key).map((q:any) => q.chapter_id) || []).size
      return { key, done, total: meta.total, avg: scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : null, quizzesTaken: chaptersTaken }
    })
    setSubjects(data)
    setTotalDone(data.reduce((a,s)=>a+s.done, 0))
    // Use all individual scores directly — same method as student dashboard
    const allScores = quizzes?.map((q: any) => q.score) || []
    setOverallAvg(allScores.length ? Math.round(allScores.reduce((a:number,b:number)=>a+b,0)/allScores.length) : null)
    setLoading(false)
  }

  return (
    <ParentSidebarLayout parentName={parentName}>
      <div style={{ maxWidth: '900px' }}>
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '24px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', color: '#1B4332', marginBottom: '4px' }}>Overview</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#64748B' }}>All subjects at a glance</p>
        </motion.div>

        {/* Child tabs */}
        {children.length > 1 && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {children.map(c => {
              const isActive = selectedId === c.id
              return (
                <button key={c.id} onClick={() => setSelectedId(c.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', borderRadius: '20px', border: isActive ? '2px solid #1B4332' : '1.5px solid #E5E7EB', background: isActive ? '#1B4332' : 'white', color: isActive ? 'white' : '#374151', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s' }}>
                  <div style={{ width: '22px', height: '22px', minWidth: '22px', borderRadius: '50%', background: isActive ? 'rgba(255,255,255,0.2)' : '#D8F3DC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '10px', color: isActive ? 'white' : '#1B4332', flexShrink: 0 }}>
                    {(c.full_name || 'S').charAt(0).toUpperCase()}
                  </div>
                  {(c.full_name || 'Student').split(' ')[0]}
                </button>
              )
            })}
          </div>
        )}

        {/* Summary stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '28px' }}>
          {[
            { label: 'Total chapters done', value: loading ? '—' : `${totalDone}/{TOTAL_CHAPTERS}`, bg: '#EEF2FF', color: '#4338CA', sub: '#818CF8' },
            { label: 'Overall avg score',   value: loading ? '—' : overallAvg !== null ? `${overallAvg}%` : '—', bg: '#F0FDF4', color: '#0F766E', sub: '#34D399' },
            { label: 'Subjects active',     value: loading ? '—' : `${subjects.filter(s=>s.done>0||s.quizzesTaken>0).length}/{SUBJECT_COUNT}`, bg: '#FEF3C7', color: '#92400E', sub: '#F59E0B' },
          ].map(s => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
              style={{ background: s.bg, borderRadius: '16px', padding: '18px 20px' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: s.color, lineHeight: 1, marginBottom: '4px' }}>{s.value}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: s.sub }}>{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Subject cards */}
        {loading ? <p style={{ fontFamily: 'var(--font-body)', color: '#94A3B8' }}>Loading...</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
            {subjects.map((s, i) => {
              const meta = SUBJECT_META[s.key]
              const pct  = Math.round((s.done / s.total) * 100)
              return (
                <motion.div key={s.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
                  style={{ background: 'white', borderRadius: '18px', border: '1.5px solid #F1F5F9', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = meta.color; e.currentTarget.style.boxShadow = `0 6px 20px ${meta.color}18` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#F1F5F9'; e.currentTarget.style.boxShadow = 'none' }}>
                  <ProgressRing pct={pct} color={meta.color}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '18px' }}>{meta.emoji}</span>
                      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1F2937' }}>{meta.label}</p>
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>{s.done}/{s.total} chapters done</p>
                    {s.avg !== null ? (
                      <span style={{ background: s.avg >= 80 ? '#D1FAE5' : s.avg >= 60 ? '#FEF3C7' : '#FEE2E2', color: s.avg >= 80 ? '#065F46' : s.avg >= 60 ? '#92400E' : '#991B1B', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', padding: '2px 10px', borderRadius: '20px' }}>
                        ⭐ {s.avg}% avg score
                      </span>
                    ) : s.done === 0 ? (
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#CBD5E1' }}>Not started yet</span>
                    ) : (
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#CBD5E1' }}>No quiz taken yet</span>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </ParentSidebarLayout>
  )
}

export default function OverviewPage() {
  return <Suspense fallback={<div style={{ padding:'40px', fontFamily:'var(--font-body)', color:'#9CA3AF' }}>Loading...</div>}><OverviewInner/></Suspense>
}
