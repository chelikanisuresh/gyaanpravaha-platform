'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getChapter, type Chapter, type Section } from '@/lib/hc-chapter-content'
import { getHCWordMap as getWordMap, type WordMap } from '@/lib/hc-tooltip-words'
import { useReadTimer, formatTime } from '@/hooks/useReadTimer'

// ── Inline word tooltip ───────────────────────────────────────────────────────

function TooltipWord({ word, meaning }: { word: string; meaning: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline' }}>
      <span
        onClick={() => setOpen(o => !o)}
        style={{
          background: '#D8F3DC',
          color: '#1B4332',
          borderRadius: '4px',
          padding: '1px 5px',
          cursor: 'pointer',
          fontWeight: 600,
          transition: 'background 0.15s',
          display: 'inline',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#B7E4C7')}
        onMouseLeave={e => (e.currentTarget.style.background = '#D8F3DC')}
      >
        {word}
      </span>
      {open && (
        <span style={{
          position: 'absolute', bottom: 'calc(100% + 6px)', left: '50%',
          transform: 'translateX(-50%)', zIndex: 200,
          background: '#1B4332', color: 'white',
          fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.55,
          padding: '10px 14px', borderRadius: '10px',
          width: '220px', boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
          display: 'block', whiteSpace: 'normal',
        }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#74C69D', display: 'block', marginBottom: '4px' }}>
            {word}
          </span>
          {meaning}
          {/* Arrow */}
          <span style={{ position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid #1B4332' }}/>
        </span>
      )}
    </span>
  )
}

// Parse text and inject tooltip spans for known vocabulary words
function renderWithTooltips(text: string, wordMap: WordMap): React.ReactNode {
  if (!wordMap || Object.keys(wordMap).length === 0) return text

  // Build sorted list of phrases (longest first to avoid partial matches)
  const phrases = Object.keys(wordMap).sort((a, b) => b.length - a.length)

  // Build regex that matches any known word/phrase (word boundary aware)
  const escaped = phrases.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern  = new RegExp(`(${escaped.join('|')})`, 'gi')

  const parts = text.split(pattern)
  return (
    <>
      {parts.map((part, i) => {
        const key = part.toLowerCase()
        const entry = wordMap[key]
        if (entry) {
          return <TooltipWord key={i} word={part} meaning={entry.meaning} />
        }
        return part
      })}
    </>
  )
}

// ── Section sidebar ──────────────────────────────────────────────────────────

function SectionSidebar({
  sections,
  completedSections,
  currentSection,
  onSelect,
}: {
  sections: Section[]
  completedSections: Set<number>
  currentSection: number
  onSelect: (id: number) => void
}) {
  return (
    <div style={{ width: '220px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>
        Sections
      </p>
      {sections.map(section => {
        const isDone    = completedSections.has(section.id)
        const isCurrent = section.id === currentSection
        const isLocked  = !isDone && section.id !== currentSection && section.id > Math.min(currentSection, ...Array.from(completedSections).concat([0])) + 1

        return (
          <button
            key={section.id}
            disabled={isLocked}
            onClick={() => !isLocked && onSelect(section.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '9px 12px', borderRadius: '10px', textAlign: 'left',
              border: isCurrent ? '1.5px solid #2D6A4F' : '1px solid #E5E7EB',
              background: isCurrent ? '#F0FDF4' : isDone ? '#F8FAF9' : 'white',
              cursor: isLocked ? 'not-allowed' : 'pointer',
              opacity: isLocked ? 0.45 : 1,
              width: '100%',
              transition: 'all 0.15s',
            }}
          >
            <div style={{
              width: '22px', height: '22px', minWidth: '22px', borderRadius: '50%', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isDone ? '#2D6A4F' : isCurrent ? '#D8F3DC' : isLocked ? '#F3F4F6' : '#F3F4F6',
              fontSize: '11px',
            }}>
              {isDone
                ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                : isLocked
                  ? <span style={{ color: '#9CA3AF' }}>🔒</span>
                  : <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: isCurrent ? '#1B4332' : '#9CA3AF' }}>{section.id}</span>
              }
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: isDone ? '#2D6A4F' : isCurrent ? '#1B4332' : '#6B7280', lineHeight: 1.4 }}>
              {section.title}
            </p>
          </button>
        )
      })}
    </div>
  )
}

// ── Section content ──────────────────────────────────────────────────────────

function SectionContent({
  section,
  isLastSection,
  isCompleted,
  onComplete,
  elapsed,
  minReadSeconds,
  wordMap,
}: {
  section: Section
  isLastSection: boolean
  isCompleted: boolean
  onComplete: () => void
  elapsed: number
  minReadSeconds: number
  wordMap: WordMap
}) {
  const readGateMet = !section.minReadSeconds || elapsed >= section.minReadSeconds
  const timeLeft    = section.minReadSeconds ? Math.max(0, section.minReadSeconds - elapsed) : 0

  // Only apply tooltips in Section 4 (the lesson text)
  const useTooltips = section.id === 4

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{ width: '28px', height: '28px', minWidth: '28px', borderRadius: '50%', background: '#2D6A4F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: 'white' }}>{section.id}</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: '#1B4332' }}>
          {section.title}
        </h2>
        {section.minReadSeconds && (
          <div style={{ marginLeft: 'auto', background: elapsed >= section.minReadSeconds ? '#D8F3DC' : '#FEF3C7', border: `1px solid ${elapsed >= section.minReadSeconds ? '#74C69D' : '#FDE68A'}`, borderRadius: '20px', padding: '4px 12px', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <span style={{ fontSize: '12px' }}>{elapsed >= section.minReadSeconds ? '⏱️ Read' : '⏱️'}</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: elapsed >= section.minReadSeconds ? '#1B4332' : '#92400E' }}>
              {elapsed >= section.minReadSeconds ? 'Done' : formatTime(timeLeft) + ' left'}
            </span>
          </div>
        )}
      </div>

      {/* Tooltip hint — only in lesson section */}
      {section.id === 4 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <span style={{ background: '#D8F3DC', color: '#1B4332', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '12px', borderRadius: '4px', padding: '1px 6px' }}>highlighted words</span>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>— tap any green word to see its meaning</p>
        </div>
      )}

      {/* Content */}
      <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '28px', marginBottom: '20px' }}>
        {section.content.split('\n\n').map((para, i) => {
          if (para.startsWith('PART ') || para.startsWith('STANZA ') || para.startsWith('─────')) {
            return (
              <div key={i} style={{ margin: '20px 0 10px', paddingBottom: '8px', borderBottom: para.startsWith('─') ? '1px solid #E5E7EB' : 'none' }}>
                {!para.startsWith('─') && (
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '13px', color: '#2D6A4F', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{para}</p>
                )}
              </div>
            )
          }
          if (para.startsWith('•')) {
            return (
              <ul key={i} style={{ margin: '0 0 12px 16px', padding: 0 }}>
                {para.split('\n').filter(l => l.startsWith('•')).map((line, j) => (
                  <li key={j} style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#374151', lineHeight: 1.75, marginBottom: '4px' }}>
                    {line.slice(2)}
                  </li>
                ))}
              </ul>
            )
          }
          // Word meanings table rows
          if (para.includes(' — ') && section.id === 5) {
            const [term, ...rest] = para.split(' — ')
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px', padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332' }}>{term}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', lineHeight: 1.5 }}>{rest.join(' — ')}</p>
              </div>
            )
          }
          // Numbered recap items
          if (/^\d+\./.test(para)) {
            return (
              <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '24px', height: '24px', minWidth: '24px', borderRadius: '50%', background: '#D8F3DC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#1B4332' }}>{para.charAt(0)}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#374151', lineHeight: 1.75 }}>{para.slice(3)}</p>
              </div>
            )
          }
          return (
            <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#374151', lineHeight: 1.8, marginBottom: '12px' }}>
              {useTooltips ? renderWithTooltips(para, wordMap) : para}
            </p>
          )
        })}
      </div>

      {/* Timer gate message for read section */}
      {section.minReadSeconds && !readGateMet && (
        <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '12px', padding: '14px 18px', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ fontSize: '18px' }}>⏱️</span>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#92400E', lineHeight: 1.5 }}>
            Please spend at least 3 minutes reading this section before marking it done. <strong>{formatTime(timeLeft)}</strong> remaining.
          </p>
        </div>
      )}

      {/* Continue / Complete button */}
      {!isCompleted && (
        <button
          onClick={onComplete}
          disabled={!readGateMet}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: readGateMet ? '#2D6A4F' : '#E5E7EB',
            color: readGateMet ? 'white' : '#9CA3AF',
            fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px',
            padding: '12px 24px', borderRadius: '10px', border: 'none',
            cursor: readGateMet ? 'pointer' : 'not-allowed',
            transition: 'all 0.15s',
          }}
        >
          {isLastSection ? '✅ Yes, I am ready for the quiz!' : '✓ Got it! Continue →'}
        </button>
      )}

      {isCompleted && !isLastSection && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#D8F3DC', borderRadius: '10px', padding: '10px 18px' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="#1B4332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332' }}>Section completed</p>
        </div>
      )}
    </div>
  )
}

// ── Summary screen before quiz ───────────────────────────────────────────────

function SummaryScreen({ chapter, onStartQuiz }: { chapter: Chapter; onStartQuiz: () => void }) {
  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#D8F3DC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
        <span style={{ fontSize: '28px' }}>📚</span>
      </div>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', color: '#1B4332', marginBottom: '8px' }}>
        You have read the entire chapter!
      </h1>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7280', lineHeight: 1.7, marginBottom: '32px' }}>
        Great work completing all 7 sections of <strong style={{ color: '#1B4332' }}>{chapter.title}</strong>. Let us check what you have understood.
      </p>

      {/* Recap summary */}
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px', textAlign: 'left', marginBottom: '28px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '14px' }}>
          What you covered
        </p>
        {['About the chapter', 'About the authors', 'Learning outcomes', 'The full text', 'Word meanings', 'Values learnt', 'Quick recap'].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: i < 6 ? '1px solid #F9FAFB' : 'none' }}>
            <div style={{ width: '20px', height: '20px', minWidth: '20px', borderRadius: '50%', background: '#2D6A4F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151' }}>Section {i + 1} — {item}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onStartQuiz}
        style={{ background: '#2D6A4F', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', padding: '14px 32px', borderRadius: '12px', border: 'none', cursor: 'pointer', transition: 'opacity 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        🎯 Start the quiz
      </button>
    </div>
  )
}

// ── Main reader page ─────────────────────────────────────────────────────────

export default function ChapterReaderPage() {
  const params  = useParams()
  const router  = useRouter()
  const chapterId = Number(params.id)

  const chapter = getChapter(chapterId)

  const [currentSection,    setCurrentSection]    = useState(1)
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set())
  const [showSummary,       setShowSummary]       = useState(false)
  const [studentName,       setStudentName]       = useState('Student')

  const { elapsed, reset: resetTimer } = useReadTimer(true)

  // Min read seconds: only Section 4 has the 3-min gate
  const currentSec = chapter?.sections.find(s => s.id === currentSection)
  const minRead    = currentSec?.minReadSeconds ?? 0

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: p } = await supabase.from('profiles').select('full_name').eq('id', user.id).maybeSingle()
      if (p?.full_name) setStudentName((p.full_name || 'Student').split(' ')[0])

      // Load progress from Supabase
      const { data: progress } = await supabase
        .from('student_lesson_progress')
        .select('section_id')
        .eq('student_id', user.id)
        .eq('chapter_id', chapterId)

      if (progress?.length) {
        const done = new Set(progress.map((r: any) => r.section_id))
        setCompletedSections(done)
        // Resume from first incomplete section
        const firstIncomplete = chapter?.sections.find(s => !done.has(s.id))
        if (firstIncomplete) setCurrentSection(firstIncomplete.id)
      }
    }
    load()
  }, [chapterId, chapter, router])

  // Save progress when a section is completed
  const completeSection = async (sectionId: number) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const newCompleted = new Set(completedSections)
    newCompleted.add(sectionId)
    setCompletedSections(newCompleted)

    await supabase.from('student_lesson_progress').upsert({
      student_id:   user.id,
      chapter_id:   chapterId,
      section_id:   sectionId,
      completed_at: new Date().toISOString(),
    })

    // Move to next section or show summary
    if (!chapter) return
    const nextSection = chapter.sections.find(s => s.id > sectionId)
    if (nextSection) {
      setCurrentSection(nextSection.id)
      resetTimer()
    } else {
      // All 7 sections done → show summary
      setShowSummary(true)
    }
  }

  if (!chapter) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <p style={{ fontFamily: 'var(--font-body)', color: '#9CA3AF' }}>Chapter not found.</p>
    </div>
  )

  if (showSummary) return (
    <div style={{ minHeight: '100vh', background: '#F8FAF9' }}>
      <div style={{ background: '#1B4332', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <button onClick={() => router.push('/student/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontSize: '13px', padding: '4px 8px' }}>Dashboard</button>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>›</span>
        <button onClick={() => router.push('/student/dashboard?section=history')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontSize: '13px', padding: '4px 8px' }}>History & Civics</button>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>›</span>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white' }}>{chapter.title}</p>
      </div>
      <SummaryScreen chapter={chapter} onStartQuiz={() => router.push(`/student/hc-quiz/${chapterId}`)}/>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAF9' }}>
      <style>{`@media(max-width:900px){.reader-layout{flex-direction:column !important}.reader-sidebar{width:100% !important;flex-direction:row !important;overflow-x:auto}}`}</style>

      {/* Top bar */}
      <div style={{ background: '#1B4332', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Breadcrumb: Dashboard → History & Civics → Chapter */}
          <button onClick={() => router.push('/student/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontSize: '13px', padding: '4px 8px', borderRadius: '6px' }}>
            Dashboard
          </button>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>›</span>
          <button onClick={() => router.push('/student/dashboard?section=history')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontSize: '13px', padding: '4px 8px', borderRadius: '6px' }}>
            History & Civics
          </button>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>›</span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white', lineHeight: 1 }}>{chapter.title}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>{chapter.type} · {chapter.estimatedReadMins} min read</p>
          </div>
        </div>
        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{completedSections.size}/7 sections</p>
          <div style={{ width: '100px', height: '5px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(completedSections.size / 7) * 100}%`, background: '#74C69D', borderRadius: '3px', transition: 'width 0.5s ease' }}/>
          </div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#74C69D' }}>
            {formatTime(elapsed)}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="reader-layout" style={{ display: 'flex', gap: '28px', padding: '28px 36px 60px' }}>

        {/* Sidebar */}
        <div className="reader-sidebar">
          <SectionSidebar
            sections={chapter.sections}
            completedSections={completedSections}
            currentSection={currentSection}
            onSelect={id => { setCurrentSection(id); resetTimer() }}
          />
        </div>

        {/* Content */}
        {currentSec && (
          <SectionContent
            section={currentSec}
            isLastSection={currentSection === 7}
            isCompleted={completedSections.has(currentSection)}
            onComplete={() => completeSection(currentSection)}
            elapsed={elapsed}
            minReadSeconds={minRead}
            wordMap={getWordMap(chapterId)}
          />
        )}
      </div>
    </div>
  )
}
