'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useReadTimer, formatTime } from '@/hooks/useReadTimer'
import { motion, AnimatePresence } from 'framer-motion'

// ── Types ─────────────────────────────────────────────────────────────────────
export interface ReaderTheme {
  primary: string      // dark  e.g. #1E3A8A
  mid: string          // mid   e.g. #1D4ED8
  accent: string       // light e.g. #93C5FD
  heroBg: string       // light background e.g. #EFF6FF
  tooltipBg: string    // tooltip dark bg
}

export interface ReaderConfig {
  subject: string          // supabase key  e.g. 'maths'
  dashboardSection: string // url param     e.g. 'maths'
  subjectLabel: string     // display label e.g. 'Mathematics'
  chapterRoute: string     // e.g. 'mth-chapter'
  quizRoute: string        // e.g. 'mth-quiz'
  theme: ReaderTheme
  getChapterFn: (id: number) => any
  getWordMapFn: (id: number) => Record<string, { meaning: string }>
}

// ── Tooltip ───────────────────────────────────────────────────────────────────
function TooltipWord({ word, meaning, theme }: { word: string; meaning: string; theme: ReaderTheme }) {
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
      <span onClick={() => setOpen(o => !o)}
        style={{ background: `${theme.accent}40`, color: theme.primary, borderRadius: '4px', padding: '1px 5px', cursor: 'pointer', fontWeight: 600, borderBottom: `2px solid ${theme.accent}`, display: 'inline', transition: 'all 0.15s' }}
        onMouseEnter={e => { e.currentTarget.style.background = `${theme.accent}70` }}
        onMouseLeave={e => { e.currentTarget.style.background = `${theme.accent}40` }}>
        {word}
      </span>
      <AnimatePresence>
        {open && (
          <motion.span initial={{ opacity: 0, y: 6, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }}
            style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)', zIndex: 200, background: theme.tooltipBg, color: 'white', fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.55, padding: '10px 14px', borderRadius: '12px', width: '220px', boxShadow: `0 8px 24px ${theme.primary}40`, display: 'block', whiteSpace: 'normal' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: theme.accent, display: 'block', marginBottom: '4px' }}>{word}</span>
            {meaning}
            <span style={{ position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `6px solid ${theme.tooltipBg}` }}/>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

function renderWithTooltips(text: string, wordMap: Record<string, { meaning: string }>, theme: ReaderTheme): React.ReactNode {
  if (!wordMap || Object.keys(wordMap).length === 0) return text
  const phrases = Object.keys(wordMap).sort((a, b) => b.length - a.length)
  const escaped = phrases.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi')
  const parts = text.split(pattern)
  return <>{parts.map((part, i) => { const e = wordMap[part.toLowerCase()] || wordMap[part]; return e ? <TooltipWord key={i} word={part} meaning={e.meaning} theme={theme}/> : part })}</>
}

// ── Main component ────────────────────────────────────────────────────────────
export default function GenericChapterReader({ config }: { config: ReaderConfig }) {
  const params    = useParams()
  const router    = useRouter()
  const chapterId = Number(params.id)
  const chapter   = config.getChapterFn(chapterId)
  const wordMap   = config.getWordMapFn(chapterId)
  const { theme } = config

  const [currentSection,    setCurrentSection]    = useState(1)
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set())
  const [showSummary,       setShowSummary]       = useState(false)
  const { elapsed, reset: resetTimer } = useReadTimer(true)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: progress } = await supabase.from('student_lesson_progress').select('section_id')
        .eq('student_id', user.id).eq('chapter_id', chapterId).eq('subject', config.subject)
      if (progress?.length) {
        const done = new Set(progress.map((r: any) => r.section_id))
        setCompletedSections(done)
        const firstIncomplete = chapter?.sections.find((s: any) => !done.has(s.id))
        if (firstIncomplete) setCurrentSection(firstIncomplete.id)
        else setShowSummary(true)
      }
    }
    load()
  }, [chapterId, chapter, router, config.subject])

  const completeSection = async (sectionId: number) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const newCompleted = new Set(completedSections)
    newCompleted.add(sectionId)
    setCompletedSections(newCompleted)
    await supabase.from('student_lesson_progress').upsert({
      student_id: user.id, chapter_id: chapterId, section_id: sectionId,
      subject: config.subject, completed_at: new Date().toISOString(),
    }, { onConflict: 'student_id,chapter_id,section_id' })
    if (!chapter) return
    const next = chapter.sections.find((s: any) => s.id > sectionId)
    if (next) { setCurrentSection(next.id); resetTimer() }
    else setShowSummary(true)
  }

  if (!chapter) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <p style={{ fontFamily: 'var(--font-body)', color: '#94A3B8' }}>Chapter not found.</p>
    </div>
  )

  const TopBar = () => (
    <div style={{ background: `linear-gradient(135deg,${theme.primary},${theme.mid})`, padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <button onClick={() => router.push('/student/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', fontSize: '13px', padding: '4px 8px', borderRadius: '6px' }}>Dashboard</button>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
        <button onClick={() => router.push(`/student/dashboard?section=${config.dashboardSection}`)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontSize: '13px', padding: '4px 8px' }}>{config.subjectLabel}</button>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
        <div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white', lineHeight: 1 }}>{chapter.title}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>Chapter {chapterId}</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{completedSections.size}/7</p>
          <div style={{ width: '80px', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div animate={{ width: `${(completedSections.size/7)*100}%` }} transition={{ duration: 0.4 }}
              style={{ height: '100%', background: theme.accent, borderRadius: '2px' }}/>
          </div>
        </div>
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: theme.accent }}>⏱ {formatTime(elapsed)}</span>
      </div>
    </div>
  )

  // ── Summary screen ──
  if (showSummary) return (
    <div style={{ minHeight: '100vh', background: theme.heroBg }}>
      <TopBar/>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '48px 24px', textAlign: 'center' }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
          style={{ width: '80px', height: '80px', borderRadius: '50%', background: `${theme.accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '36px', border: `2px solid ${theme.accent}` }}>
          📖
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: theme.primary, marginBottom: '8px' }}>
          Chapter complete! 🎉
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#64748B', marginBottom: '32px', lineHeight: 1.7 }}>
          All 7 sections of <strong style={{ color: theme.primary }}>{chapter.title}</strong> done. Ready to take the quiz?
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          style={{ background: 'white', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '24px', marginBottom: '28px', textAlign: 'left' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '14px' }}>Sections completed</p>
          {chapter.sections.map((s: any, i: number) => (
            <motion.div key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.05 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: i < 6 ? '1px solid #F8FAFC' : 'none' }}>
              <div style={{ width: '20px', height: '20px', minWidth: '20px', borderRadius: '50%', background: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151' }}>{s.title}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.03, boxShadow: `0 8px 24px ${theme.primary}40` }} whileTap={{ scale: 0.97 }}
          onClick={() => router.push(`/student/${config.quizRoute}/${chapterId}`)}
          style={{ background: `linear-gradient(135deg,${theme.primary},${theme.mid})`, color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', padding: '15px 36px', borderRadius: '14px', border: 'none', cursor: 'pointer' }}>
          🎯 Start the quiz →
        </motion.button>
      </div>
    </div>
  )

  const currentSec = chapter.sections.find((s: any) => s.id === currentSection)
  const minRead = currentSec?.minReadSeconds ?? 0
  const readGateMet = !minRead || elapsed >= minRead
  const isLastSection = currentSection === chapter.sections.length

  return (
    <div style={{ minHeight: '100vh', background: theme.heroBg }}>
      <style>{`@media(max-width:900px){.reader-layout{flex-direction:column !important}.reader-sidebar{width:100% !important;overflow-x:auto}}`}</style>
      <TopBar/>

      <div className="reader-layout" style={{ display: 'flex', gap: '24px', padding: '28px 32px 60px', maxWidth: '1100px', margin: '0 auto' }}>

        {/* Sidebar */}
        <div className="reader-sidebar" style={{ width: '210px', flexShrink: 0 }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Sections</p>
          {chapter.sections.map((section: any) => {
            const isDone    = completedSections.has(section.id)
            const isCurrent = section.id === currentSection
            return (
              <motion.button key={section.id} onClick={() => { if (isDone) setCurrentSection(section.id) }}
                whileHover={{ x: 2 }} transition={{ type: 'spring', stiffness: 400 }}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '10px', textAlign: 'left', border: isCurrent ? `1.5px solid ${theme.accent}` : '1px solid transparent', background: isCurrent ? `${theme.accent}20` : 'transparent', cursor: 'pointer', width: '100%', marginBottom: '2px' }}>
                <div style={{ width: '22px', height: '22px', minWidth: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDone ? theme.primary : isCurrent ? `${theme.accent}50` : '#F1F5F9', flexShrink: 0 }}>
                  {isDone ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', color: isCurrent ? theme.primary : '#94A3B8' }}>{section.id}</span>}
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: isDone ? theme.primary : isCurrent ? theme.primary : '#64748B', lineHeight: 1.4 }}>{section.title}</p>
              </motion.button>
            )
          })}
          <div style={{ marginTop: '16px', padding: '12px', background: `${theme.accent}20`, borderRadius: '12px', border: `1px solid ${theme.accent}40` }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: theme.primary, marginBottom: '4px' }}>💡 Vocab tip</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: theme.mid, lineHeight: 1.5 }}>
              Tap any <span style={{ background: `${theme.accent}40`, borderBottom: `2px solid ${theme.accent}`, padding: '0 3px', borderRadius: '2px', color: theme.primary, fontWeight: 600 }}>highlighted</span> word to see its meaning.
            </p>
          </div>
        </div>

        {/* Content */}
        {currentSec && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div key={currentSection} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ width: '32px', height: '32px', minWidth: '32px', borderRadius: '50%', background: `linear-gradient(135deg,${theme.primary},${theme.mid})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '12px', color: 'white' }}>{currentSec.id}</span>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: theme.primary }}>{currentSec.title}</h2>
                  {minRead > 0 && (
                    <div style={{ marginLeft: 'auto', background: elapsed >= minRead ? `${theme.accent}30` : '#FFF7ED', border: `1px solid ${elapsed >= minRead ? theme.accent : '#FED7AA'}`, borderRadius: '20px', padding: '4px 12px', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                      <span style={{ fontSize: '12px' }}>⏱</span>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: elapsed >= minRead ? theme.primary : '#92400E' }}>
                        {elapsed >= minRead ? 'Ready!' : `${Math.max(0, minRead - elapsed)}s left`}
                      </span>
                    </div>
                  )}
                </div>

                <div style={{ background: 'white', borderRadius: '20px', border: '1.5px solid #F1F5F9', padding: '32px', marginBottom: '20px', boxShadow: `0 2px 12px ${theme.primary}08` }}>
                  {currentSec.content.split('\n\n').map((para: string, i: number) => (
                    <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: '#374151', lineHeight: 2, marginBottom: '16px' }}>
                      {renderWithTooltips(para, wordMap, theme)}
                    </p>
                  ))}
                </div>

                {minRead > 0 && !readGateMet && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '12px', padding: '14px 18px', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ fontSize: '18px' }}>⏱</span>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#92400E', lineHeight: 1.5 }}>
                      Please read for at least <strong>{Math.max(0, minRead - elapsed)} more seconds</strong> before moving on.
                    </p>
                  </motion.div>
                )}

                {!completedSections.has(currentSection) && (
                  <motion.button onClick={() => completeSection(currentSection)} disabled={!readGateMet}
                    whileHover={readGateMet ? { scale: 1.02, boxShadow: `0 6px 20px ${theme.primary}30` } : {}}
                    whileTap={readGateMet ? { scale: 0.97 } : {}}
                    style={{ background: readGateMet ? `linear-gradient(135deg,${theme.primary},${theme.mid})` : '#E2E8F0', color: readGateMet ? 'white' : '#94A3B8', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', padding: '13px 28px', borderRadius: '12px', border: 'none', cursor: readGateMet ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}>
                    {isLastSection ? '🎉 All done — go to quiz!' : '✓ Got it, next section →'}
                  </motion.button>
                )}

                {completedSections.has(currentSection) && !isLastSection && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: `${theme.accent}20`, borderRadius: '12px', padding: '10px 18px', border: `1px solid ${theme.accent}40` }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke={theme.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: theme.primary }}>Section complete</p>
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
