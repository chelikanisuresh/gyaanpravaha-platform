'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'
import ChildTabs from '@/components/ChildTabs'

interface Child { id: string; full_name: string; email: string }

const SUBJECT_META: Record<string, { label: string; emoji: string; color: string; total: number }> = {
  english:   { label: 'English',          emoji: '📚', color: '#7C3AED', total: 8  },
  maths:     { label: 'Mathematics',      emoji: '📐', color: '#1E40AF', total: 11 },
  science:   { label: 'Science',          emoji: '🔬', color: '#065F46', total: 9  },
  history:   { label: 'History & Civics', emoji: '🏛️', color: '#92400E', total: 6  },
  geography: { label: 'Geography',        emoji: '🌍', color: '#065F46', total: 7  },
  sanskrit:  { label: 'Sanskrit',         emoji: '🕉️', color: '#B45309', total: 8  },
  ict:       { label: 'ICT',              emoji: '💻', color: '#0369A1', total: 5  },
}

interface SubjectSummary {
  subject:           string
  chaptersCompleted: number
  totalChapters:     number
  avgScore:          number | null
  quizzesTaken:      number
}

function scoreColor(score: number) {
  if (score >= 80) return '#10B981'
  if (score >= 60) return '#F59E0B'
  return '#EF4444'
}

function OverviewInner() {
  const searchParams              = useSearchParams()
  const [children, setChildren]   = useState<Child[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [parentName, setParentName] = useState('Parent')
  const [subjects, setSubjects]   = useState<SubjectSummary[]>([])
  const [loading, setLoading]     = useState(true)
  const [totalCompleted, setTotalCompleted] = useState(0)
  const [overallAvg, setOverallAvg]         = useState<number | null>(null)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: p } = await supabase.from('profiles').select('full_name').eq('id', user.id).maybeSingle()
      if (p?.full_name) setParentName(p.full_name)
      const { data: links } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id)
      if (!links?.length) { setLoading(false); return }
      const { data: profiles } = await supabase.from('profiles').select('id, full_name, email').in('id', links.map((l: any) => l.student_id))
      if (profiles?.length) {
        setChildren(profiles as Child[])
        const initial = searchParams.get('child') || profiles[0].id
        setSelectedId(initial)
      }
    }
    load()
  }, [searchParams])

  useEffect(() => {
    if (!selectedId) return
    loadSubjectData(selectedId)
  }, [selectedId])

  const loadSubjectData = async (studentId: string) => {
    setLoading(true)
    const supabase = createClient()

    const [{ data: sections }, { data: quizzes }] = await Promise.all([
      supabase.from('student_lesson_progress').select('subject, chapter_id').eq('student_id', studentId),
      supabase.from('student_quiz_attempts').select('subject, chapter_id, score').eq('student_id', studentId),
    ])

    // Build section count map: subject-chapterId → count
    const secMap: Record<string, number> = {}
    sections?.forEach((s: any) => {
      const k = `${s.subject}-${s.chapter_id}`
      secMap[k] = (secMap[k] || 0) + 1
    })

    // Build best score map: subject-chapterId → best score
    const scoreMap: Record<string, number> = {}
    quizzes?.forEach((q: any) => {
      const k = `${q.subject}-${q.chapter_id}`
      if (!(k in scoreMap) || q.score > scoreMap[k]) scoreMap[k] = q.score
    })

    const summaries: SubjectSummary[] = Object.entries(SUBJECT_META).map(([key, meta]) => {
      const completed = Array.from({ length: meta.total }, (_, i) => i + 1)
        .filter(chId => (secMap[`${key}-${chId}`] || 0) >= 7).length

      const subjectScores = Array.from({ length: meta.total }, (_, i) => i + 1)
        .filter(chId => `${key}-${chId}` in scoreMap)
        .map(chId => scoreMap[`${key}-${chId}`])

      const avgScore = subjectScores.length
        ? Math.round(subjectScores.reduce((a, b) => a + b, 0) / subjectScores.length)
        : null

      return { subject: key, chaptersCompleted: completed, totalChapters: meta.total, avgScore, quizzesTaken: subjectScores.length }
    })

    setSubjects(summaries)

    const allCompleted = summaries.reduce((a, s) => a + s.chaptersCompleted, 0)
    setTotalCompleted(allCompleted)

    const allScores = summaries.flatMap(s => s.avgScore != null ? [s.avgScore] : [])
    setOverallAvg(allScores.length ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : null)

    setLoading(false)
  }

  const totalChapters = Object.values(SUBJECT_META).reduce((a, m) => a + m.total, 0)

  return (
    <ParentSidebarLayout parentName={parentName}>
      <div>
        {children.length > 1 && (
          <ChildTabs children={children} selectedId={selectedId} onSelect={setSelectedId}/>
        )}

        {/* Top summary */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:'12px', marginBottom:'28px' }}>
          {[
            { label:'Total chapters done', value:`${totalCompleted}/${totalChapters}`, color:'#1E40AF', bg:'#DBEAFE' },
            { label:'Overall avg score',   value: overallAvg != null ? `${overallAvg}%` : '—', color:'#065F46', bg:'#D8F3DC' },
            { label:'Subjects started',    value:`${subjects.filter(s => s.chaptersCompleted > 0 || s.quizzesTaken > 0).length}/7`, color:'#7C3AED', bg:'#F5F3FF' },
          ].map(s => (
            <div key={s.label} style={{ background:s.bg, borderRadius:'14px', padding:'16px' }}>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'22px', color:s.color, lineHeight:1 }}>{loading ? '—' : s.value}</p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:s.color, opacity:0.75, marginTop:'4px' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* No activity yet */}
        {!loading && totalCompleted === 0 && (
          <div style={{ background:'white', borderRadius:'16px', border:'1px solid #E5E7EB', padding:'48px', textAlign:'center', marginBottom:'20px' }}>
            <p style={{ fontSize:'40px', marginBottom:'12px' }}>📖</p>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'18px', color:'#1B4332', marginBottom:'8px' }}>No chapters read yet</p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#9CA3AF' }}>Progress will appear here once your child starts reading.</p>
          </div>
        )}

        {/* Subject cards */}
        {!loading && subjects.map(s => {
          const meta = SUBJECT_META[s.subject]
          const pct  = Math.round((s.chaptersCompleted / s.totalChapters) * 100)
          return (
            <div key={s.subject} style={{ background:'white', borderRadius:'16px', border:'1px solid #E5E7EB', padding:'20px 24px', marginBottom:'14px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px', flexWrap:'wrap' }}>
                <span style={{ fontSize:'20px' }}>{meta.emoji}</span>
                <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'16px', color:'#1B4332' }}>{meta.label}</p>
                <div style={{ marginLeft:'auto', display:'flex', gap:'8px', flexWrap:'wrap' }}>
                  <span style={{ background:'#F3F4F6', borderRadius:'10px', padding:'3px 12px', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#374151' }}>
                    {s.chaptersCompleted}/{s.totalChapters} chapters
                  </span>
                  {s.avgScore != null && (
                    <span style={{ background:'#F3F4F6', borderRadius:'10px', padding:'3px 12px', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color: scoreColor(s.avgScore) }}>
                      Avg {s.avgScore}%
                    </span>
                  )}
                </div>
              </div>
              {/* Progress bar */}
              <div style={{ height:'8px', background:'#F3F4F6', borderRadius:'4px', overflow:'hidden', marginBottom:'8px' }}>
                <div style={{ height:'100%', width:`${pct}%`, background: meta.color, borderRadius:'4px', transition:'width 0.5s' }}/>
              </div>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#9CA3AF' }}>
                {pct}% complete{s.quizzesTaken > 0 ? ` · ${s.quizzesTaken} quiz${s.quizzesTaken > 1 ? 'zes' : ''} taken` : ''}
              </p>
            </div>
          )
        })}
      </div>
    </ParentSidebarLayout>
  )
}

export default function OverviewPage() {
  return <Suspense fallback={<div style={{ padding:'40px', fontFamily:'var(--font-body)', color:'#9CA3AF' }}>Loading...</div>}><OverviewInner/></Suspense>
}
