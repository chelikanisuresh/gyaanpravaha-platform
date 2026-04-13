'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'
import { motion, AnimatePresence } from 'framer-motion'

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

const CHAPTER_NAMES: Record<string, Record<number, string>> = {
  english:   { 1:'Whistles and Shaving Bristles', 2:'If I Were Lord of Tartary', 3:'The Fun They Had', 4:'In Morning Dew', 5:'The Boy Who Outran the Wind', 6:'The Blind Boy', 7:'Three Questions', 8:'From a Railway Carriage' },
  maths:     { 1:'Whole Numbers', 2:'H.C.F. and L.C.M.', 3:'Area and Perimeter', 4:'Volume', 5:'Fractions', 6:'Percentage', 7:'Ratio and Proportion', 8:'Basic Geometrical Concepts', 9:'Angles', 10:'Circles', 11:'Vedic Knowledge' },
  science:   { 1:'Magnetism', 2:'Simple Machines', 3:'Work and Energy', 4:'Introduction to Chemistry', 5:'Structure of Atom', 6:'Physical and Chemical Changes', 7:'Cell – The Basic Unit of Life', 8:'The Leaf', 9:'Human Body: Respiratory System' },
  'history-civics': { 1:'The Vedas — Our Sacred Heritage', 2:'Essence of Hinduism', 3:'The Great Preachers', 4:'The Preamble', 5:'India Lives in Villages', 6:'The Power of Determination' },
  geography: { 1:'Our Earth in the Solar System', 2:'The Earth as a Globe — 1', 3:'The Earth as a Globe — 2', 4:'Landforms', 5:'Representation of Geographical Features', 6:'Agriculture in India and World', 7:'North America' },
  sanskrit:  { 1:'Prarthana', 2:'Vivekananda', 3:'Sanchalana Geetam', 4:'Sanskritabhasha Grihe Grihe', 5:'Sankhyah', 6:'Sandhi', 7:'Bhutakalah', 8:'Sambhashanam' },
  ict:       { 1:'File Management', 2:'Artificial Intelligence', 3:'Introduction to HTML', 4:'HTML — Formatting a Web Page', 5:'Creating Tables in HTML' },
  marathi:   { 1:'भारतमाता', 2:'माझा अनुभव', 3:'पाऊस आला! पाऊस आला!', 4:'माहिती घेऊया', 5:'सुगरणीचे घरटे', 6:'हे खरे खरे व्हावे...', 7:'उद्यानात भेटलेला विद्यार्थी', 8:'कुंदाचे साहस', 9:'घर', 10:'बाबांचं पत्र', 11:'मिनूचा जलप्रवास', 12:'चंद्रावरची शाळा', 13:'मोठी आई', 14:'अप्पाजींचे चातुर्य', 15:'होळी आली होळी', 16:'मुक्या प्राण्यांची कैफियत', 17:'पाणपोई' },
}

function ProgressInner() {
  const searchParams = useSearchParams()
  const [children,    setChildren]   = useState<Child[]>([])
  const [selectedId,  setSelectedId] = useState('')
  const [parentName,  setParentName] = useState('Parent')
  const [loading,     setLoading]    = useState(true)
  const [openSubject, setOpenSubject] = useState<string | null>(null)
  const [secMap,      setSecMap]     = useState<Record<string, number>>({})
  const [scoreMap,    setScoreMap]   = useState<Record<string, number>>({})

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
      if (profiles?.length) { setChildren(profiles as Child[]); setSelectedId(searchParams.get('child') || profiles[0].id) }
    }
    load()
  }, [searchParams])

  useEffect(() => { if (selectedId) loadProgress(selectedId) }, [selectedId])

  const loadProgress = async (studentId: string) => {
    setLoading(true)
    const supabase = createClient()
    const [{ data: sections }, { data: quizzes }] = await Promise.all([
      supabase.from('student_lesson_progress').select('subject, chapter_id').eq('student_id', studentId),
      supabase.from('student_quiz_attempts').select('subject, chapter_id, score').eq('student_id', studentId),
    ])
    const sm: Record<string, number> = {}
    sections?.forEach((s: any) => { const k = `${s.subject}-${s.chapter_id}`; sm[k] = (sm[k] || 0) + 1 })
    const qm: Record<string, number> = {}
    quizzes?.forEach((q: any) => { const k = `${q.subject}-${q.chapter_id}`; if (!(k in qm) || q.score > qm[k]) qm[k] = q.score })
    setSecMap(sm); setScoreMap(qm); setLoading(false)
  }

  const hasData = Object.keys(secMap).length > 0 || Object.keys(scoreMap).length > 0

  return (
    <ParentSidebarLayout parentName={parentName}>
      <div style={{ maxWidth: '860px' }}>
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '24px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', color: '#1B4332', marginBottom: '4px' }}>Chapter Progress</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#64748B' }}>Detailed breakdown by subject and chapter</p>
        </motion.div>

        {children.length > 1 && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            {children.map(c => (
              <button key={c.id} onClick={() => setSelectedId(c.id)}
                style={{ padding: '8px 20px', borderRadius: '20px', border: selectedId === c.id ? '2px solid #1B4332' : '1.5px solid #E5E7EB', background: selectedId === c.id ? '#1B4332' : 'white', color: selectedId === c.id ? 'white' : '#374151', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
                {c.full_name}
              </button>
            ))}
          </div>
        )}

        {loading && <p style={{ fontFamily: 'var(--font-body)', color: '#94A3B8', padding: '20px' }}>Loading...</p>}

        {!loading && !hasData && (
          <div style={{ background: 'white', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '56px', textAlign: 'center' }}>
            <p style={{ fontSize: '40px', marginBottom: '12px' }}>📖</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px', color: '#1B4332', marginBottom: '8px' }}>No progress yet</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#94A3B8' }}>Once your child starts reading, progress will appear here.</p>
          </div>
        )}

        {!loading && hasData && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {Object.entries(SUBJECT_META).map(([key, meta], idx) => {
              const completed = Array.from({ length: meta.total }, (_, i) => i+1).filter(chId => (secMap[`${key}-${chId}`] || 0) >= 7).length
              const pct = Math.round((completed / meta.total) * 100)
              const isOpen = openSubject === key

              return (
                <motion.div key={key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}
                  style={{ background: 'white', borderRadius: '18px', border: isOpen ? `1.5px solid ${meta.color}40` : '1.5px solid #F1F5F9', overflow: 'hidden', transition: 'border-color 0.2s' }}>
                  {/* Header */}
                  <button onClick={() => setOpenSubject(isOpen ? null : key)}
                    style={{ width: '100%', padding: '18px 22px', display: 'flex', alignItems: 'center', gap: '14px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                    <div style={{ width: '42px', height: '42px', minWidth: '42px', borderRadius: '12px', background: meta.light, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                      {meta.emoji}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: '#1F2937', marginBottom: '4px' }}>{meta.label}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '100px', height: '4px', background: '#F1F5F9', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, background: meta.color, borderRadius: '2px' }}/>
                        </div>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8' }}>{completed}/{meta.total} chapters</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                      <span style={{ background: meta.light, color: meta.color, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', padding: '4px 12px', borderRadius: '20px' }}>
                        {pct}%
                      </span>
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}
                        style={{ color: '#94A3B8', fontSize: '18px', display: 'block' }}>▾</motion.span>
                    </div>
                  </button>

                  {/* Chapter list */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden', borderTop: `1px solid ${meta.light}` }}>
                        <div style={{ padding: '12px 22px 16px' }}>
                          {Array.from({ length: meta.total }, (_, i) => i + 1).map(chId => {
                            const secsDone   = secMap[`${key}-${chId}`] || 0
                            const score      = scoreMap[`${key}-${chId}`]
                            const isComplete = secsDone >= 7
                            const isStarted  = secsDone > 0 && !isComplete
                            const chName     = CHAPTER_NAMES[key]?.[chId] || `Chapter ${chId}`
                            return (
                              <div key={chId} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '9px 0', borderBottom: chId < meta.total ? '1px solid #F8FAFC' : 'none' }}>
                                <div style={{ width: '28px', height: '28px', minWidth: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isComplete ? meta.color : isStarted ? meta.light : '#F1F5F9', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '11px', color: isComplete ? 'white' : isStarted ? meta.color : '#CBD5E1' }}>
                                  {isComplete ? '✓' : chId}
                                </div>
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: isComplete ? '#1F2937' : isStarted ? '#374151' : '#94A3B8', flex: 1, lineHeight: 1.4 }}>{chName}</p>
                                {isStarted && <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#94A3B8', flexShrink: 0 }}>{secsDone}/7 sections</span>}
                                {score != null ? (
                                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', flexShrink: 0, color: score >= 80 ? '#059669' : score >= 60 ? '#D97706' : '#DC2626', background: score >= 80 ? '#D1FAE5' : score >= 60 ? '#FEF3C7' : '#FEE2E2', padding: '2px 10px', borderRadius: '20px' }}>
                                    {score}%
                                  </span>
                                ) : isComplete ? (
                                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#CBD5E1', flexShrink: 0 }}>Quiz pending</span>
                                ) : null}
                              </div>
                            )
                          })}
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

export default function ProgressPage() {
  return <Suspense fallback={<div style={{ padding:'40px', fontFamily:'var(--font-body)', color:'#9CA3AF' }}>Loading...</div>}><ProgressInner/></Suspense>
}
