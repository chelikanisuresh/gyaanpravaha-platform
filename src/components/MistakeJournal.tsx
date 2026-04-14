'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'

interface MistakeEntry {
  id: string
  subject: string
  chapter_id: number
  question_id: number
  question_text: string
  question_type: string
  wrong_answer: string
  correct_answer: string
  reexplanation: string
  section_id: number
  options: { label: string; text: string }[] | null
  resolved: boolean
  created_at: string
}

// Fetch the section content for a given subject/chapter/section
// Uses each file's own getSection/getMarChapter functions — no default export needed
async function fetchSectionContent(subject: string, chapterId: number, sectionId: number): Promise<string> {
  try {
    if (subject === 'english') {
      const { getSection } = await import('@/lib/chapter-content')
      return getSection(chapterId, sectionId)?.content ?? ''
    } else if (subject === 'maths') {
      const { getSection } = await import('@/lib/mth-chapter-content')
      return getSection(chapterId, sectionId)?.content ?? ''
    } else if (subject === 'science') {
      const { getSection } = await import('@/lib/sci-chapter-content')
      return getSection(chapterId, sectionId)?.content ?? ''
    } else if (subject === 'history') {
      const { getSection } = await import('@/lib/hc-chapter-content')
      return getSection(chapterId, sectionId)?.content ?? ''
    } else if (subject === 'geo') {
      const { getSection } = await import('@/lib/geo-chapter-content')
      return getSection(chapterId, sectionId)?.content ?? ''
    } else if (subject === 'sanskrit') {
      const { getSection } = await import('@/lib/skt-chapter-content')
      return getSection(chapterId, sectionId)?.content ?? ''
    } else if (subject === 'ict') {
      const { getSection } = await import('@/lib/ict-chapter-content')
      return getSection(chapterId, sectionId)?.content ?? ''
    } else if (subject === 'marathi') {
      const { getMarChapter } = await import('@/lib/mar-chapter-content')
      const chapter = getMarChapter(chapterId)
      return chapter?.sections?.find((s: any) => s.id === sectionId)?.content ?? ''
    } else if (subject === 'rapid') {
      const mod = await import(`@/lib/rapid-chapters/ch-${chapterId}`)
      const chapter = mod.default
      return chapter?.sections?.find((s: any) => s.id === sectionId)?.content ?? ''
    }
    return ''
  } catch {
    return ''
  }
}

// Backfill past quiz attempts via server-side API
async function backfillMistakes(studentId: string) {
  try {
    await fetch('/api/backfill-mistakes', { method: 'POST' })
  } catch { /* silent fail — backfill is best-effort */ }
}

const SUBJECT_LABELS: Record<string, { label: string; emoji: string; color: string; light: string }> = {
  english:  { label: 'English',        emoji: '📖', color: '#1B4332', light: '#F0FDF4' },
  maths:    { label: 'Mathematics',    emoji: '🔢', color: '#1E3A5F', light: '#EFF6FF' },
  science:  { label: 'Science',        emoji: '🔬', color: '#3B1F5E', light: '#F5F3FF' },
  history:  { label: 'History & Civics',emoji: '🏛️', color: '#7C2D12', light: '#FFF7ED' },
  geo:      { label: 'Geography',      emoji: '🌍', color: '#064E3B', light: '#ECFDF5' },
  sanskrit: { label: 'Sanskrit',       emoji: '🕉️', color: '#78350F', light: '#FFFBEB' },
  ict:      { label: 'ICT',            emoji: '💻', color: '#1E40AF', light: '#EFF6FF' },
  marathi:  { label: 'मराठी',          emoji: '📜', color: '#831843', light: '#FDF2F8' },
  rapid:    { label: 'Rapid Reader',   emoji: '📚', color: '#065F46', light: '#ECFDF5' },
}

function JournalEntry({
  entry, onResolved,
}: {
  entry: MistakeEntry
  onResolved: (id: string) => void
}) {
  const [showContext, setShowContext]   = useState(false)
  const [contextText, setContextText]  = useState('')
  const [loadingCtx,  setLoadingCtx]   = useState(false)
  const [showAnswer,  setShowAnswer]   = useState(false)
  const [mcqSelected, setMcqSelected] = useState<string | null>(null)
  const [inputVal,    setInputVal]     = useState('')
  const [result,      setResult]       = useState<'correct'|'wrong'|null>(null)
  const subj = SUBJECT_LABELS[entry.subject] ?? { label: entry.subject, emoji: '📚', color: '#374151', light: '#F9FAFB' }

  const handleReadContext = async () => {
    if (showContext) { setShowContext(false); return }
    setLoadingCtx(true)
    const text = await fetchSectionContent(entry.subject, entry.chapter_id, entry.section_id)
    setContextText(text)
    setLoadingCtx(false)
    setShowContext(true)
  }

  const handleDoneReading = () => {
    setShowContext(false)
    setShowAnswer(true)
  }

  const checkAnswer = async () => {
    const given = entry.question_type === 'mcq' ? (mcqSelected ?? '') : inputVal.trim()
    const correct = entry.correct_answer.trim()
    const isCorrect = entry.question_type === 'mcq'
      ? given === correct
      : given.toLowerCase() === correct.toLowerCase()

    if (isCorrect) {
      setResult('correct')
      // Mark resolved in DB
      const supabase = createClient()
      await supabase.from('mistake_journal')
        .update({ resolved: true, resolved_at: new Date().toISOString() })
        .eq('id', entry.id)
      setTimeout(() => onResolved(entry.id), 1200)
    } else {
      setResult('wrong')
      setTimeout(() => setResult(null), 2000)
    }
  }

  return (
    <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
      style={{ background: 'white', borderRadius: '16px', border: `1.5px solid ${subj.color}20`, overflow: 'hidden', marginBottom: '10px' }}>

      {/* Question header */}
      <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <span style={{ fontSize: '16px', flexShrink: 0, marginTop: '2px' }}>{subj.emoji}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: subj.color, background: subj.light, padding: '2px 10px', borderRadius: '20px' }}>
              {subj.label} · Ch {entry.chapter_id}
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#94A3B8' }}>
              Your answer: <span style={{ color: '#DC2626', fontWeight: 600 }}>{entry.wrong_answer}</span>
            </span>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1F2937', lineHeight: 1.6 }}>{entry.question_text}</p>
        </div>
        {!showAnswer && (
          <button onClick={handleReadContext}
            style={{ flexShrink: 0, background: loadingCtx ? '#F1F5F9' : showContext ? subj.light : subj.color, color: showContext ? subj.color : 'white', border: `1px solid ${subj.color}40`, borderRadius: '10px', padding: '7px 14px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {loadingCtx ? 'Loading…' : showContext ? 'Hide context' : 'Read context →'}
          </button>
        )}
      </div>

      {/* Section content — inline */}
      <AnimatePresence>
        {showContext && contextText && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden', borderTop: `1px solid ${subj.color}15` }}>
            <div style={{ padding: '16px 18px 18px', background: subj.light }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: subj.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                Read this section carefully
              </p>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', lineHeight: 2, maxHeight: '240px', overflowY: 'auto' }}>
                {contextText.split('\\n\\n').map((para, i) => (
                  <p key={i} style={{ marginBottom: '12px' }}>{para}</p>
                ))}
              </div>
              <button onClick={handleDoneReading}
                style={{ marginTop: '12px', background: subj.color, color: 'white', border: 'none', borderRadius: '10px', padding: '9px 20px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
                Done reading — answer now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Answer input */}
      <AnimatePresence>
        {showAnswer && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden', borderTop: `1px solid ${subj.color}20`, padding: '14px 18px', background: '#FAFAFA' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#374151', marginBottom: '10px' }}>Now try again:</p>

            {entry.question_type === 'mcq' && entry.options ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                {entry.options.map(opt => (
                  <button key={opt.label} onClick={() => setMcqSelected(opt.label)}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 14px', borderRadius: '10px', border: `1.5px solid ${mcqSelected === opt.label ? subj.color : '#E5E7EB'}`, background: mcqSelected === opt.label ? subj.light : 'white', cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: subj.color, width: '18px', flexShrink: 0 }}>{opt.label}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151' }}>{opt.text}</span>
                  </button>
                ))}
              </div>
            ) : (
              <input type="text" value={inputVal} onChange={e => setInputVal(e.target.value)}
                placeholder="Type your answer…"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none', marginBottom: '12px', boxSizing: 'border-box' }}
              />
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={checkAnswer}
                disabled={entry.question_type === 'mcq' ? !mcqSelected : !inputVal.trim()}
                style={{ background: subj.color, color: 'white', border: 'none', borderRadius: '10px', padding: '9px 20px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', cursor: 'pointer', opacity: (entry.question_type === 'mcq' ? !mcqSelected : !inputVal.trim()) ? 0.4 : 1 }}>
                Submit answer
              </button>
              {result === 'correct' && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#059669' }}>
                  ✅ Correct! Well done.
                </motion.span>
              )}
              {result === 'wrong' && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#DC2626' }}>
                  Not quite — try reading the context again
                </motion.span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function MistakeJournal({ studentId }: { studentId: string }) {
  const [entries,  setEntries]  = useState<MistakeEntry[]>([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    if (!studentId) return
    const load = async () => {
      // Backfill past quiz attempts first (idempotent — skips already-journaled)
      await backfillMistakes(studentId)

      const supabase = createClient()
      const { data } = await supabase
        .from('mistake_journal')
        .select('*')
        .eq('student_id', studentId)
        .eq('resolved', false)
        .order('created_at', { ascending: false })
        .limit(10)
      setEntries(data ?? [])
      setLoading(false)
    }
    load()
  }, [studentId])

  const handleResolved = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  const pendingCount = entries.length

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
      style={{ background: 'white', borderRadius: '20px', border: `1.5px solid ${pendingCount > 0 ? '#FCA5A5' : '#D8F3DC'}`, padding: '20px 24px', marginBottom: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: pendingCount > 0 ? '16px' : '0' }}>
        <span style={{ fontSize: '20px' }}>📝</span>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: pendingCount > 0 ? '#991B1B' : '#1B4332' }}>
            Mistake Journal
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: pendingCount > 0 ? '#DC2626' : '#52B788', marginTop: '2px' }}>
            {loading ? 'Loading…' : pendingCount > 0
              ? `${pendingCount} question${pendingCount > 1 ? 's' : ''} to revisit — read the context and try again`
              : 'All mistakes cleared — great work! ✅'}
          </p>
        </div>
        {!loading && pendingCount > 0 && (
          <div style={{ background: '#FEE2E2', border: '1.5px solid #FCA5A5', borderRadius: '20px', padding: '4px 14px', flexShrink: 0 }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '18px', color: '#991B1B' }}>{pendingCount}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#DC2626', marginLeft: '4px' }}>pending</span>
          </div>
        )}
      </div>

      {/* Entries */}
      {!loading && pendingCount > 0 && (
        <AnimatePresence mode="popLayout">
          {entries.map(entry => (
            <JournalEntry key={entry.id} entry={entry} onResolved={handleResolved} />
          ))}
        </AnimatePresence>
      )}
    </motion.div>
  )
}
