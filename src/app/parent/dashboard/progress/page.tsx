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

const CHAPTER_NAMES: Record<string, Record<number, string>> = {
  english:   { 1:'Whistles and Shaving Bristles', 2:'If I Were Lord of Tartary', 3:'The Fun They Had', 4:'In Morning Dew', 5:'The Boy Who Outran the Wind', 6:'The Blind Boy', 7:'Three Questions', 8:'From a Railway Carriage' },
  maths:     { 1:'Whole Numbers', 2:'HCF and LCM', 3:'Area and Perimeter', 4:'Volume', 5:'Fractions', 6:'Percentage', 7:'Ratio and Proportion', 8:'Basic Geometrical Concepts', 9:'Angles', 10:'Circles', 11:'Vedic Knowledge' },
  science:   { 1:'Magnetism', 2:'Simple Machines', 3:'Work and Energy', 4:'Intro to Chemistry', 5:'Structure of Atom', 6:'Physical & Chemical Changes', 7:'Cell', 8:'The Leaf', 9:'Respiratory System' },
  history:   { 1:'The Vedas', 2:'Essence of Hinduism', 3:'The Great Preachers', 4:'The Preamble', 5:'India Lives in Villages', 6:'The Power of Determination' },
  geography: { 1:'Earth Structure', 2:'Latitudes and Longitudes', 3:'Motions of the Earth', 4:'Maps', 5:'Natural Vegetation', 6:'Our Country India', 7:'Climate and Wildlife' },
  sanskrit:  { 1:'Prarthana', 2:'Vivekananda', 3:'Sanchalana Geetam', 4:'Sanskritabhasha Grihe Grihe', 5:'Sankhyah', 6:'Sandhi', 7:'Bhutakalah', 8:'Sambhashanam' },
  ict:       { 1:'Intro to Computers', 2:'Input and Output Devices', 3:'Storage Devices', 4:'MS Word', 5:'The Internet' },
}

function scoreColor(score: number) {
  if (score >= 80) return '#10B981'
  if (score >= 60) return '#F59E0B'
  return '#EF4444'
}

function ProgressInner() {
  const searchParams                = useSearchParams()
  const [children, setChildren]     = useState<Child[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [parentName, setParentName] = useState('Parent')
  const [loading, setLoading]       = useState(true)
  const [openSubject, setOpenSubject] = useState<string | null>(null)

  // Real data
  const [secMap,   setSecMap]   = useState<Record<string, number>>({})
  const [scoreMap, setScoreMap] = useState<Record<string, number>>({})

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
        setSelectedId(searchParams.get('child') || profiles[0].id)
      }
    }
    load()
  }, [searchParams])

  useEffect(() => {
    if (!selectedId) return
    loadProgress(selectedId)
  }, [selectedId])

  const loadProgress = async (studentId: string) => {
    setLoading(true)
    const supabase = createClient()

    const [{ data: sections }, { data: quizzes }] = await Promise.all([
      supabase.from('student_lesson_progress').select('subject, chapter_id').eq('student_id', studentId),
      supabase.from('student_quiz_attempts').select('subject, chapter_id, score').eq('student_id', studentId),
    ])

    const sm: Record<string, number> = {}
    sections?.forEach((s: any) => {
      const k = `${s.subject}-${s.chapter_id}`
      sm[k] = (sm[k] || 0) + 1
    })
    setSecMap(sm)

    const qm: Record<string, number> = {}
    quizzes?.forEach((q: any) => {
      const k = `${q.subject}-${q.chapter_id}`
      if (!(k in qm) || q.score > qm[k]) qm[k] = q.score
    })
    setScoreMap(qm)
    setLoading(false)
  }

  const hasAnyData = Object.keys(secMap).length > 0 || Object.keys(scoreMap).length > 0

  return (
    <ParentSidebarLayout parentName={parentName}>
      <div>
        {children.length > 1 && (
          <ChildTabs children={children} selectedId={selectedId} onSelect={setSelectedId}/>
        )}

        <div style={{ marginBottom:'24px' }}>
          <h1 style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'24px', color:'#1B4332', marginBottom:'4px' }}>Chapter Progress</h1>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#9CA3AF' }}>Detailed breakdown of every chapter across all 7 subjects</p>
        </div>

        {loading && (
          <p style={{ fontFamily:'var(--font-body)', color:'#9CA3AF', padding:'20px' }}>Loading progress...</p>
        )}

        {!loading && !hasAnyData && (
          <div style={{ background:'white', borderRadius:'16px', border:'1px solid #E5E7EB', padding:'56px', textAlign:'center' }}>
            <p style={{ fontSize:'40px', marginBottom:'12px' }}>📖</p>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'18px', color:'#1B4332', marginBottom:'8px' }}>No progress yet</p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#9CA3AF' }}>
              Once your child starts reading chapters, their progress will appear here.
            </p>
          </div>
        )}

        {!loading && hasAnyData && Object.entries(SUBJECT_META).map(([key, meta]) => {
          const completed = Array.from({ length: meta.total }, (_, i) => i + 1)
            .filter(chId => (secMap[`${key}-${chId}`] || 0) >= 7).length
          const started = Array.from({ length: meta.total }, (_, i) => i + 1)
            .filter(chId => (secMap[`${key}-${chId}`] || 0) > 0).length
          const isOpen = openSubject === key

          return (
            <div key={key} style={{ background:'white', borderRadius:'16px', border:'1px solid #E5E7EB', marginBottom:'12px', overflow:'hidden' }}>
              {/* Subject header — clickable to expand */}
              <button
                onClick={() => setOpenSubject(isOpen ? null : key)}
                style={{ width:'100%', padding:'18px 24px', display:'flex', alignItems:'center', gap:'12px', background:'none', border:'none', cursor:'pointer', textAlign:'left' }}>
                <span style={{ fontSize:'20px' }}>{meta.emoji}</span>
                <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'15px', color:'#1B4332', flex:1 }}>{meta.label}</p>
                <span style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color: completed > 0 ? meta.color : '#9CA3AF', background:'#F3F4F6', padding:'3px 12px', borderRadius:'10px' }}>
                  {completed}/{meta.total} done
                </span>
                <span style={{ color:'#9CA3AF', fontSize:'18px', marginLeft:'4px' }}>{isOpen ? '▾' : '▸'}</span>
              </button>

              {/* Chapter breakdown */}
              {isOpen && (
                <div style={{ borderTop:'1px solid #F3F4F6', padding:'16px 24px' }}>
                  {Array.from({ length: meta.total }, (_, i) => i + 1).map(chId => {
                    const secsDone  = secMap[`${key}-${chId}`] || 0
                    const score     = scoreMap[`${key}-${chId}`]
                    const isComplete = secsDone >= 7
                    const isStarted  = secsDone > 0 && !isComplete
                    const chName     = CHAPTER_NAMES[key]?.[chId] || `Chapter ${chId}`

                    return (
                      <div key={chId} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'10px 0', borderBottom:'1px solid #F9FAFB' }}>
                        {/* Status dot */}
                        <div style={{ width:'28px', height:'28px', borderRadius:'50%', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', background: isComplete ? '#D8F3DC' : isStarted ? '#FEF3C7' : '#F3F4F6', fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'11px', color: isComplete ? '#1B4332' : isStarted ? '#92400E' : '#D1D5DB' }}>
                          {isComplete ? '✓' : chId}
                        </div>

                        {/* Chapter name */}
                        <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color: isComplete ? '#1B4332' : isStarted ? '#374151' : '#9CA3AF', flex:1 }}>{chName}</p>

                        {/* Sections read */}
                        {(isStarted || isComplete) && (
                          <span style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'#9CA3AF' }}>{secsDone}/7 sections</span>
                        )}

                        {/* Quiz score */}
                        {score != null ? (
                          <span style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color: scoreColor(score), background:'#F3F4F6', padding:'2px 10px', borderRadius:'8px' }}>
                            {score}%
                          </span>
                        ) : isComplete ? (
                          <span style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'#D1D5DB' }}>Quiz not taken</span>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </ParentSidebarLayout>
  )
}

export default function ProgressPage() {
  return <Suspense fallback={<div style={{ padding:'40px', fontFamily:'var(--font-body)', color:'#9CA3AF' }}>Loading...</div>}><ProgressInner/></Suspense>
}
