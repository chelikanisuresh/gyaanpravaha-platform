'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getMarChapter } from '@/lib/mar-chapter-content'
import { getMarWordMap } from '@/lib/mar-tooltip-words'
import { useReadTimer, formatTime } from '@/hooks/useReadTimer'

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
      <span onClick={() => setOpen(o => !o)}
        style={{ background: '#D8F3DC', color: '#1B4332', borderRadius: '4px', padding: '1px 5px', cursor: 'pointer', fontWeight: 600, display: 'inline' }}
        onMouseEnter={e => (e.currentTarget.style.background = '#B7E4C7')}
        onMouseLeave={e => (e.currentTarget.style.background = '#D8F3DC')}>
        {word}
      </span>
      {open && (
        <span style={{ position: 'absolute', bottom: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)', zIndex: 200, background: '#1B4332', color: 'white', fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.55, padding: '10px 14px', borderRadius: '10px', width: '220px', boxShadow: '0 4px 16px rgba(0,0,0,0.18)', display: 'block', whiteSpace: 'normal' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#74C69D', display: 'block', marginBottom: '4px' }}>{word}</span>
          {meaning}
          <span style={{ position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid #1B4332' }}/>
        </span>
      )}
    </span>
  )
}

function renderWithTooltips(text: string, wordMap: Record<string, { meaning: string }>): React.ReactNode {
  if (!wordMap || Object.keys(wordMap).length === 0) return text
  const phrases = Object.keys(wordMap).sort((a, b) => b.length - a.length)
  const escaped = phrases.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = new RegExp(`(${escaped.join('|')})`, 'g')
  const parts = text.split(pattern)
  return <>{parts.map((part, i) => { const entry = wordMap[part]; return entry ? <TooltipWord key={i} word={part} meaning={entry.meaning} /> : part })}</>
}

export default function MarChapterReaderPage() {
  const params = useParams()
  const router = useRouter()
  const chapterId = Number(params.id)
  const chapter = getMarChapter(chapterId)
  const wordMap = getMarWordMap(chapterId)

  const [currentSection, setCurrentSection] = useState(1)
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set())
  const [showSummary, setShowSummary] = useState(false)

  const { elapsed, reset: resetTimer } = useReadTimer(true)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: progress } = await supabase.from('student_lesson_progress').select('section_id').eq('student_id', user.id).eq('chapter_id', chapterId).eq('subject', 'marathi')
      if (progress?.length) {
        const done = new Set(progress.map((r: any) => r.section_id))
        setCompletedSections(done)
        const firstIncomplete = chapter?.sections.find(s => !done.has(s.id))
        if (firstIncomplete) setCurrentSection(firstIncomplete.id)
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
      subject: 'marathi', completed_at: new Date().toISOString(),
    }, { onConflict: 'student_id,chapter_id,section_id' })
    if (!chapter) return
    const next = chapter.sections.find(s => s.id > sectionId)
    if (next) { setCurrentSection(next.id); resetTimer() }
    else setShowSummary(true)
  }

  if (!chapter) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}><p style={{ fontFamily: 'var(--font-body)', color: '#9CA3AF' }}>पाठ सापडला नाही.</p></div>

  if (showSummary) return (
    <div style={{ minHeight: '100vh', background: '#F8FAF9' }}>
      <div style={{ background: '#1B4332', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <button onClick={() => router.push('/student/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontSize: '13px' }}>Dashboard</button>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
        <button onClick={() => router.push('/student/dashboard?section=marathi')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontSize: '13px' }}>मराठी</button>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white' }}>{chapter.titleMarathi}</p>
      </div>
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#D8F3DC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '28px' }}>📚</div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', color: '#1B4332', marginBottom: '8px' }}>तुम्ही संपूर्ण पाठ वाचला!</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7280', lineHeight: 1.7, marginBottom: '32px' }}>
          <strong style={{ color: '#1B4332' }}>{chapter.titleMarathi}</strong> — सर्व ७ विभाग पूर्ण. आता प्रश्नमंजुषा द्या.
        </p>
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px', textAlign: 'left', marginBottom: '28px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '14px' }}>तुम्ही शिकलात</p>
          {['पाठाची ओळख', 'लेखक/कवींबद्दल', 'शिकण्याचे उद्दिष्ट', 'मजकूर', 'शब्दार्थ', 'मूल्ये आणि संदेश', 'थोडक्यात सारांश'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: i < 6 ? '1px solid #F9FAFB' : 'none' }}>
              <div style={{ width: '20px', height: '20px', minWidth: '20px', borderRadius: '50%', background: '#2D6A4F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151' }}>विभाग {i + 1} — {item}</p>
            </div>
          ))}
        </div>
        <button onClick={() => router.push(`/student/mar-quiz/${chapterId}`)}
          style={{ background: '#2D6A4F', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', padding: '14px 32px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
          🎯 प्रश्नमंजुषा सुरू करा
        </button>
      </div>
    </div>
  )

  const currentSec = chapter.sections.find(s => s.id === currentSection)
  const minRead = currentSec?.minReadSeconds ?? 0
  const readGateMet = !minRead || elapsed >= minRead
  const timeLeft = minRead ? Math.max(0, minRead - elapsed) : 0
  const isLastSection = currentSection === 7

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAF9' }}>
      <style>{`@media(max-width:900px){.reader-layout{flex-direction:column !important}.reader-sidebar{width:100% !important;flex-direction:row !important;overflow-x:auto}}`}</style>

      {/* Top bar */}
      <div style={{ background: '#1B4332', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button onClick={() => router.push('/student/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontSize: '13px', borderRadius: '6px', padding: '4px 8px' }}>Dashboard</button>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>›</span>
          <button onClick={() => router.push('/student/dashboard?section=marathi')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontSize: '13px', padding: '4px 8px' }}>मराठी</button>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>›</span>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white', lineHeight: 1 }}>{chapter.titleMarathi}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>{chapter.type} · {chapter.author} · {chapter.estimatedReadMins} मिनिटे</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{completedSections.size}/7 विभाग</p>
          <div style={{ width: '100px', height: '5px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(completedSections.size / 7) * 100}%`, background: '#74C69D', borderRadius: '3px', transition: 'width 0.5s' }}/>
          </div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#74C69D' }}>{formatTime(elapsed)}</p>
        </div>
      </div>

      {/* Body */}
      <div className="reader-layout" style={{ display: 'flex', gap: '28px', padding: '28px 36px 60px' }}>
        {/* Sidebar */}
        <div className="reader-sidebar" style={{ width: '220px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>विभाग</p>
          {chapter.sections.map(section => {
            const isDone = completedSections.has(section.id)
            const isCurrent = section.id === currentSection
            return (
              <button key={section.id} onClick={() => !isDone || isCurrent ? null : setCurrentSection(section.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '10px', textAlign: 'left', border: isCurrent ? '1.5px solid #2D6A4F' : '1px solid #E5E7EB', background: isCurrent ? '#F0FDF4' : isDone ? '#F8FAF9' : 'white', cursor: 'pointer', width: '100%', transition: 'all 0.15s' }}>
                <div style={{ width: '22px', height: '22px', minWidth: '22px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDone ? '#2D6A4F' : isCurrent ? '#D8F3DC' : '#F3F4F6', fontSize: '11px' }}>
                  {isDone ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: isCurrent ? '#1B4332' : '#9CA3AF' }}>{section.id}</span>}
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: isDone ? '#2D6A4F' : isCurrent ? '#1B4332' : '#6B7280', lineHeight: 1.4 }}>{section.title}</p>
              </button>
            )
          })}
        </div>

        {/* Content */}
        {currentSec && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '28px', height: '28px', minWidth: '28px', borderRadius: '50%', background: '#2D6A4F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: 'white' }}>{currentSec.id}</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: '#1B4332' }}>{currentSec.title}</h2>
              {minRead > 0 && (
                <div style={{ marginLeft: 'auto', background: elapsed >= minRead ? '#D8F3DC' : '#FEF3C7', border: `1px solid ${elapsed >= minRead ? '#74C69D' : '#FDE68A'}`, borderRadius: '20px', padding: '4px 12px', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  <span style={{ fontSize: '12px' }}>⏱️</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: elapsed >= minRead ? '#1B4332' : '#92400E' }}>
                    {elapsed >= minRead ? 'वाचन पूर्ण' : formatTime(timeLeft) + ' बाकी'}
                  </span>
                </div>
              )}
            </div>

            {currentSec.id === 4 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <span style={{ background: '#D8F3DC', color: '#1B4332', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '12px', borderRadius: '4px', padding: '1px 6px' }}>हिरव्या शब्दांवर</span>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>— क्लिक करा अर्थ पाहण्यासाठी</p>
              </div>
            )}

            <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '28px', marginBottom: '20px' }}>
              {currentSec.content.split('\n\n').map((para, i) => (
                <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#374151', lineHeight: 1.9, marginBottom: '14px' }}>
                  {currentSec.id === 4 ? renderWithTooltips(para, wordMap) : para}
                </p>
              ))}
            </div>

            {minRead > 0 && !readGateMet && (
              <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '12px', padding: '14px 18px', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '18px' }}>⏱️</span>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#92400E', lineHeight: 1.5 }}>
                  किमान ३ मिनिटे हा विभाग वाचा. <strong>{formatTime(timeLeft)}</strong> बाकी आहे.
                </p>
              </div>
            )}

            {!completedSections.has(currentSection) && (
              <button onClick={() => completeSection(currentSection)} disabled={!readGateMet}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: readGateMet ? '#2D6A4F' : '#E5E7EB', color: readGateMet ? 'white' : '#9CA3AF', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', padding: '12px 24px', borderRadius: '10px', border: 'none', cursor: readGateMet ? 'pointer' : 'not-allowed', transition: 'all 0.15s' }}>
                {isLastSection ? '✅ प्रश्नमंजुषेसाठी तयार आहे!' : '✓ समजले! पुढे जा →'}
              </button>
            )}

            {completedSections.has(currentSection) && !isLastSection && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#D8F3DC', borderRadius: '10px', padding: '10px 18px' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="#1B4332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332' }}>विभाग पूर्ण झाला</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
