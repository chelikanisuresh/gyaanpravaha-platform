'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getChapter } from '@/lib/chapter-content'
import { getWordMap, type WordMap } from '@/lib/tooltip-words'
import { useReadTimer, formatTime } from '@/hooks/useReadTimer'
import { motion, AnimatePresence } from 'framer-motion'

// ── Tooltip word ──────────────────────────────────────────────────────────────
function TooltipWord({ word, meaning }: { word: string; meaning: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])
  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline' }}>
      <span onClick={() => setOpen(o => !o)} style={{ background: 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', color: '#3730A3', borderRadius: '4px', padding: '1px 5px', cursor: 'pointer', fontWeight: 600, borderBottom: '2px solid #A5B4FC', display: 'inline', transition: 'all 0.15s' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#C7D2FE' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#EEF2FF,#E0E7FF)' }}>
        {word}
      </span>
      <AnimatePresence>
        {open && (
          <motion.span initial={{ opacity: 0, y: 6, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 4, scale: 0.96 }} transition={{ duration: 0.15 }}
            style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)', zIndex: 200, background: '#1E1B4B', color: 'white', fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.55, padding: '10px 14px', borderRadius: '12px', width: '220px', boxShadow: '0 8px 24px rgba(30,27,75,0.25)', display: 'block', whiteSpace: 'normal' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#A5B4FC', display: 'block', marginBottom: '4px' }}>{word}</span>
            {meaning}
            <span style={{ position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid #1E1B4B' }}/>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

function renderWithTooltips(text: string, wordMap: WordMap): React.ReactNode {
  if (!wordMap || Object.keys(wordMap).length === 0) return text
  const phrases = Object.keys(wordMap).sort((a, b) => b.length - a.length)
  const escaped = phrases.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi')
  const parts = text.split(pattern)
  return <>{parts.map((part, i) => { const e = wordMap[part.toLowerCase()] || wordMap[part]; return e ? <TooltipWord key={i} word={part} meaning={e.meaning}/> : part })}</>
}

// ── Section nav button ────────────────────────────────────────────────────────
function SectionNav({ section, isDone, isCurrent, onClick }: {
  section: { id: number; title: string }; isDone: boolean; isCurrent: boolean; onClick: () => void
}) {
  return (
    <motion.button onClick={onClick} whileHover={{ x: 2 }} transition={{ type: 'spring', stiffness: 400 }}
      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '10px', textAlign: 'left', border: isCurrent ? '1.5px solid #A5B4FC' : '1px solid transparent', background: isCurrent ? '#EEF2FF' : 'transparent', cursor: 'pointer', width: '100%', marginBottom: '2px' }}>
      <div style={{ width: '22px', height: '22px', minWidth: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDone ? '#4338CA' : isCurrent ? '#C7D2FE' : '#F1F5F9', flexShrink: 0 }}>
        {isDone
          ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          : <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', color: isCurrent ? '#4338CA' : '#94A3B8' }}>{section.id}</span>}
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: isDone ? '#4338CA' : isCurrent ? '#1E1B4B' : '#64748B', lineHeight: 1.4 }}>{section.title}</p>
    </motion.button>
  )
}

export default function ChapterReaderPage() {
  const params    = useParams()
  const router    = useRouter()
  const chapterId = Number(params.id)
  const chapter   = getChapter(chapterId)
  const wordMap   = getWordMap(chapterId)

  const [currentSection,    setCurrentSection]    = useState(1)
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set())
  const [showSummary,       setShowSummary]       = useState(false)
  const [studentName,       setStudentName]       = useState('')

  const { elapsed, reset: resetTimer } = useReadTimer(true)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: p } = await supabase.from('profiles').select('full_name').eq('id', user.id).maybeSingle()
      if (p?.full_name) setStudentName(p.full_name.split(' ')[0])
      const { data: progress } = await supabase.from('student_lesson_progress').select('section_id')
        .eq('student_id', user.id).eq('chapter_id', chapterId).eq('subject', 'english')
      if (progress?.length) {
        const done = new Set(progress.map((r: any) => r.section_id))
        setCompletedSections(done)
        const firstIncomplete = chapter?.sections.find(s => !done.has(s.id))
        if (firstIncomplete) setCurrentSection(firstIncomplete.id)
        else setShowSummary(true)
      }
    }
    load()
  }, [chapterId, chapter, router])

  const completeSection = async (sectionId: number) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const newCompleted = new Set(completedSections)
    newCompleted.add(sectionId)
    setCompletedSections(newCompleted)
    await supabase.from('student_lesson_progress').upsert({
      student_id: user.id, chapter_id: chapterId, section_id: sectionId,
      subject: 'english', completed_at: new Date().toISOString(),
    }, { onConflict: 'student_id,chapter_id,section_id' })
    if (!chapter) return
    const next = chapter.sections.find(s => s.id > sectionId)
    if (next) { setCurrentSection(next.id); resetTimer() }
    else setShowSummary(true)
  }

  if (!chapter) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}><p style={{ fontFamily: 'var(--font-body)', color: '#94A3B8' }}>Chapter not found.</p></div>

  // ── Summary screen ──
  if (showSummary) return (
    <div style={{ minHeight: '100vh', background: '#F8FAFF' }}>
      <div style={{ background: 'linear-gradient(135deg,#3730A3,#4338CA)', padding: '16px 28px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button onClick={() => router.push('/student/dashboard?section=english')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontSize: '13px' }}>English</button>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white' }}>{chapter.title}</p>
      </div>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '48px 24px', textAlign: 'center' }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
          style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg,#EEF2FF,#C7D2FE)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '36px' }}>
          📖
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: '#1E1B4B', marginBottom: '8px' }}>
          Chapter complete! 🎉
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#64748B', marginBottom: '32px', lineHeight: 1.7 }}>
          You have read all 7 sections of <strong style={{ color: '#4338CA' }}>{chapter.title}</strong>. Ready to test what you know?
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          style={{ background: 'white', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '24px', marginBottom: '28px', textAlign: 'left' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '14px' }}>Sections completed</p>
          {chapter.sections.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.05 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: i < 6 ? '1px solid #F8FAFC' : 'none' }}>
              <div style={{ width: '20px', height: '20px', minWidth: '20px', borderRadius: '50%', background: '#4338CA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151' }}>{s.title}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(67,56,202,0.3)' }} whileTap={{ scale: 0.97 }}
          onClick={() => router.push(`/student/quiz/${chapterId}`)}
          style={{ background: 'linear-gradient(135deg,#3730A3,#4338CA)', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', padding: '15px 36px', borderRadius: '14px', border: 'none', cursor: 'pointer' }}>
          🎯 Start the quiz →
        </motion.button>
      </div>
    </div>
  )

  const currentSec = chapter.sections.find(s => s.id === currentSection)
  const minRead = currentSec?.minReadSeconds ?? 0
  const readGateMet = !minRead || elapsed >= minRead
  const isLastSection = currentSection === chapter.sections.length

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFF' }}>
      <style>{`@media(max-width:900px){.reader-layout{flex-direction:column !important}.reader-sidebar{width:100% !important;flex-direction:row !important;overflow-x:auto}}`}</style>

      {/* Top bar */}
      <div style={{ background: 'linear-gradient(135deg,#3730A3,#4338CA)', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button onClick={() => router.push('/student/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', fontSize: '13px', padding: '4px 8px', borderRadius: '6px' }}>Dashboard</button>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>›</span>
          <button onClick={() => router.push('/student/dashboard?section=english')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontSize: '13px', padding: '4px 8px' }}>English</button>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>›</span>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white', lineHeight: 1 }}>{chapter.title}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>Chapter {chapterId} · {chapter.type}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{completedSections.size}/7</p>
            <div style={{ width: '80px', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
              <motion.div animate={{ width: `${(completedSections.size/7)*100}%` }} transition={{ duration: 0.4 }}
                style={{ height: '100%', background: '#A5B4FC', borderRadius: '2px' }}/>
            </div>
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#A5B4FC' }}>⏱ {Math.floor(elapsed/60)}:{String(elapsed%60).padStart(2,"0")} min</span>
        </div>
      </div>

      {/* Body */}
      <div className="reader-layout" style={{ display: 'flex', gap: '24px', padding: '28px 32px 60px', maxWidth: '1100px', margin: '0 auto' }}>

        {/* Sidebar */}
        <div className="reader-sidebar" style={{ width: '210px', flexShrink: 0 }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px', padding: '0 4px' }}>Sections</p>
          {chapter.sections.map(section => (
            <SectionNav key={section.id} section={section}
              isDone={completedSections.has(section.id)}
              isCurrent={section.id === currentSection}
              onClick={() => { if (completedSections.has(section.id)) setCurrentSection(section.id) }}/>
          ))}
          <div style={{ marginTop: '20px', padding: '14px', background: '#EEF2FF', borderRadius: '12px', border: '1px solid #C7D2FE' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#4338CA', marginBottom: '4px' }}>
              <span style={{ background: '#C7D2FE', borderRadius: '3px', padding: '1px 5px', marginRight: '5px' }}>tip</span>
              Vocab words
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#6366F1', lineHeight: 1.5 }}>Tap any <span style={{ background: '#EEF2FF', borderBottom: '2px solid #A5B4FC', padding: '0 3px', borderRadius: '2px', color: '#3730A3', fontWeight: 600 }}>highlighted</span> word to see its meaning.</p>
          </div>
        </div>

        {/* Content */}
        {currentSec && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div key={currentSection}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}>

                {/* Section header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ width: '32px', height: '32px', minWidth: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,#3730A3,#4338CA)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '12px', color: 'white' }}>{currentSec.id}</span>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: '#1E1B4B' }}>{currentSec.title}</h2>
                  {minRead > 0 && (
                    <motion.div animate={{ scale: elapsed >= minRead ? [1,1.05,1] : 1 }} transition={{ duration: 0.3 }}
                      style={{ marginLeft: 'auto', background: elapsed >= minRead ? '#EEF2FF' : '#FFF7ED', border: `1px solid ${elapsed >= minRead ? '#C7D2FE' : '#FED7AA'}`, borderRadius: '20px', padding: '4px 12px', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                      <span style={{ fontSize: '12px' }}>⏱</span>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: elapsed >= minRead ? '#4338CA' : '#92400E' }}>
                        {elapsed >= minRead ? 'Ready!' : (() => { const rem = Math.max(0, minRead - elapsed); const m = Math.floor(rem/60); const s = rem%60; return m > 0 ? `${m}m ${s}s left` : `${s}s left` })()}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Content card */}
                <div style={{ background: 'white', borderRadius: '20px', border: '1.5px solid #F1F5F9', padding: '32px', marginBottom: '20px', boxShadow: '0 2px 12px rgba(30,27,75,0.04)' }}>
                  {currentSec.content.split('\n\n').map((para, i) => (
                    <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: '#374151', lineHeight: 2, marginBottom: '16px' }}>
                      {currentSec.id === 5 ? renderWithTooltips(para, wordMap) : para}
                    </p>
                  ))}
                </div>

                {/* Read timer warning */}
                {minRead > 0 && !readGateMet && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '12px', padding: '14px 18px', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ fontSize: '18px' }}>⏱</span>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#92400E', lineHeight: 1.5 }}>
                      Please read for at least <strong>{(() => { const rem = Math.max(0, minRead - elapsed); const m = Math.floor(rem/60); const s = rem%60; return m > 0 ? `${m}m ${s}s` : `${s}s` })()} more</strong> before moving on.
                    </p>
                  </motion.div>
                )}

                {/* Complete button */}
                {!completedSections.has(currentSection) && (
                  <motion.button
                    onClick={() => completeSection(currentSection)} disabled={!readGateMet}
                    whileHover={readGateMet ? { scale: 1.02, boxShadow: '0 6px 20px rgba(67,56,202,0.25)' } : {}}
                    whileTap={readGateMet ? { scale: 0.97 } : {}}
                    style={{ background: readGateMet ? 'linear-gradient(135deg,#3730A3,#4338CA)' : '#E2E8F0', color: readGateMet ? 'white' : '#94A3B8', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', padding: '13px 28px', borderRadius: '12px', border: 'none', cursor: readGateMet ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}>
                    {isLastSection ? '🎉 All done — go to quiz!' : '✓ Got it, next section →'}
                  </motion.button>
                )}

                {completedSections.has(currentSection) && !isLastSection && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#EEF2FF', borderRadius: '12px', padding: '10px 18px', border: '1px solid #C7D2FE' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="#4338CA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#4338CA' }}>Section complete</p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
