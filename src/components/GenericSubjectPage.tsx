'use client'

import { useState, useEffect } from 'react'
import VocabFlashcards from '@/components/VocabFlashcards'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import ClassQuestionsWidget from '@/components/ClassQuestionsWidget'

// ── Types ─────────────────────────────────────────────────────────────────────
export interface SubjectChapter {
  id: number
  title: string
  type: string
  emoji: string
  estimatedReadMins: number
}

export interface TypeColor {
  bg: string; text: string; border: string; emoji: string; desc: string
}

export interface SubjectTheme {
  // Identity
  title: string
  nativeTitle?: string
  emoji: string
  subject: string        // supabase subject key
  description: string
  bookSeries: string     // e.g. "Maths Connexion · Class 6"

  // Routes
  chapterRoute: string   // e.g. "mth-chapter"
  quizRoute:   string    // e.g. "mth-quiz"

  // Colors
  heroBg:     string     // gradient for hero banner
  heroBorder: string
  primaryDark: string    // dark primary color (gradients, UP NEXT)
  primaryMid:  string
  primaryLight: string   // light tint
  accentColor: string    // accent/highlight
  counterBg:   string
  counterText: string
  counterSub:  string
  scoreBg:     string
  scoreText:   string
  scoreSub:    string
  progressColor: string

  // Type colors
  typeColors: Record<string, TypeColor>

  // Sidebar
  tips: string[]
  floatEmojis: string[]
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!target) return
    let n = 0
    const step = Math.max(1, Math.ceil(target / 25))
    const t = setInterval(() => { n = Math.min(n + step, target); setVal(n); if (n >= target) clearInterval(t) }, 35)
    return () => clearInterval(t)
  }, [target])
  return <>{val}{suffix}</>
}

function ProgressRing({ pct, size = 72, stroke = 7, color }: { pct: number; size?: number; stroke?: number; color: string }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={stroke}/>
      <motion.circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - (circ * pct / 100) }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        transform={`rotate(-90 ${size/2} ${size/2})`}/>
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central"
        fill={color} fontSize={size * 0.22} fontWeight="800" fontFamily="var(--font-heading)">{pct}%</text>
    </svg>
  )
}

// ── Chapter card ──────────────────────────────────────────────────────────────
function ChapterCard({ chapter, secsDone, score, isCompleted, isStarted, isCurrent, index, theme, onFlashcards }: {
  chapter: SubjectChapter; secsDone: number; score?: number
  isCompleted: boolean; isStarted: boolean; isCurrent: boolean; index: number; theme: SubjectTheme
  onFlashcards?: () => void
}) {
  const tc = theme.typeColors[chapter.type] || { bg: '#F9FAFB', text: '#374151', border: '#E5E7EB', emoji: '📄', desc: '' }
  const ctaLabel = isCompleted ? 'Review' : isStarted ? 'Resume' : 'Start'

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * index, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
      <Link href={`/student/${theme.chapterRoute}/${chapter.id}`} style={{ textDecoration: 'none', display: 'block' }}>
        <motion.div
          whileHover={{ y: -2, boxShadow: `0 6px 20px ${theme.primaryDark}18` }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{
            background: isCompleted ? theme.primaryLight : isCurrent ? `${theme.primaryLight}CC` : 'white',
            borderRadius: '16px',
            border: isCompleted ? `1.5px solid ${theme.accentColor}60` : isCurrent ? `1.5px solid ${theme.accentColor}` : '1.5px solid #F1F5F9',
            padding: '16px 18px',
            display: 'flex', alignItems: 'center', gap: '14px',
            cursor: 'pointer', position: 'relative', overflow: 'hidden',
          }}>
          {isCurrent && <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '35%', background: `linear-gradient(135deg,transparent,${theme.accentColor}15)`, pointerEvents: 'none' }}/>}

          {/* Avatar */}
          <div style={{ width: '46px', height: '46px', minWidth: '46px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: isCompleted ? `${theme.accentColor}40` : isCurrent ? theme.primaryDark : '#F8FAFC', fontSize: isCompleted ? '18px' : '20px', fontFamily: 'var(--font-heading)', fontWeight: 800, color: isCompleted ? theme.primaryDark : isCurrent ? 'white' : '#9CA3AF' }}>
            {isCompleted ? '✓' : chapter.emoji}
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', flexWrap: 'wrap' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: isCompleted ? theme.primaryDark : isCurrent ? theme.primaryDark : '#1F2937', lineHeight: 1.3 }}>
                {chapter.title}
              </p>
              {isCurrent && !isCompleted && (
                <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  style={{ background: theme.primaryDark, color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '9px', padding: '2px 7px', borderRadius: '20px', flexShrink: 0, letterSpacing: '0.06em' }}>
                  UP NEXT
                </motion.span>
              )}
              {isCompleted && score != null && (
                <span style={{ background: score >= 80 ? '#D1FAE5' : score >= 60 ? '#FEF3C7' : '#FEE2E2', color: score >= 80 ? '#065F46' : score >= 60 ? '#92400E' : '#991B1B', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', padding: '2px 9px', borderRadius: '20px', flexShrink: 0 }}>
                  ⭐ {score}%
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ background: tc.bg, color: tc.text, border: `1px solid ${tc.border}`, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', padding: '2px 9px', borderRadius: '20px' }}>{tc.emoji} {chapter.type}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8' }}>⏱ {chapter.estimatedReadMins} min</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8' }}>📋 7 sections</span>
              {isStarted && <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '12px', color: '#F59E0B' }}>{secsDone}/7 done</span>}
            </div>
            {isStarted && (
              <div style={{ marginTop: '7px', height: '3px', background: '#E2E8F0', borderRadius: '2px', width: '130px', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${(secsDone/7)*100}%` }} transition={{ duration: 0.6 }}
                  style={{ height: '100%', background: '#F59E0B', borderRadius: '2px' }}/>
              </div>
            )}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end', flexShrink: 0 }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', padding: '8px 18px', borderRadius: '10px', background: isCompleted ? 'white' : isCurrent ? theme.primaryDark : '#F1F5F9', color: isCompleted ? theme.primaryDark : isCurrent ? 'white' : '#64748B', border: isCompleted ? `1.5px solid ${theme.accentColor}60` : 'none' }}>
              {ctaLabel}
            </span>
            {isCompleted && onFlashcards && (
              <button
                onClick={e => { e.preventDefault(); e.stopPropagation(); onFlashcards() }}
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', padding: '5px 12px', borderRadius: '8px', background: `${theme.accentColor}25`, color: theme.primaryDark, border: `1px solid ${theme.accentColor}40`, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                🃏 Flashcards
              </button>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

// ── Right sidebar ─────────────────────────────────────────────────────────────
function RightSidebar({ chapters, completedCount, avgScore, progress, scores, theme }: {
  chapters: SubjectChapter[]; completedCount: number; avgScore: number | null
  progress: Record<number, number>; scores: Record<number, number>; theme: SubjectTheme
}) {
  const tip = theme.tips[new Date().getDay() % theme.tips.length]
  const typeCounts = chapters.reduce((acc, ch) => { const done = (progress[ch.id] || 0) >= 7; acc[ch.type] = (acc[ch.type] || 0) + (done ? 1 : 0); return acc }, {} as Record<string, number>)
  const typeTotal  = chapters.reduce((acc, ch) => { acc[ch.type] = (acc[ch.type] || 0) + 1; return acc }, {} as Record<string, number>)

  return (
    <div style={{ width: '256px', minWidth: '256px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
        style={{ background: 'white', borderRadius: '18px', border: '1.5px solid #E2E8F0', padding: '20px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '14px' }}>Your progress</p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <div style={{ flex: 1, background: theme.counterBg, borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '22px', color: theme.counterText, lineHeight: 1 }}>{completedCount}/{chapters.length}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: theme.counterSub, marginTop: '3px' }}>Chapters</p>
          </div>
          {avgScore !== null && (
            <div style={{ flex: 1, background: theme.scoreBg, borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '22px', color: theme.scoreText, lineHeight: 1 }}>{avgScore}%</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: theme.scoreSub, marginTop: '3px' }}>Quiz avg</p>
            </div>
          )}
        </div>
        {Object.entries(typeTotal).map(([type, total]) => {
          const done = typeCounts[type] || 0
          const tc   = theme.typeColors[type]
          if (!tc) return null
          return (
            <div key={type} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#64748B' }}>{tc.emoji} {type}</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: tc.text }}>{done}/{total}</span>
              </div>
              <div style={{ height: '4px', background: '#F1F5F9', borderRadius: '2px', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${(done/total)*100}%` }} transition={{ duration: 0.8, delay: 0.4 }}
                  style={{ height: '100%', background: tc.text, borderRadius: '2px', opacity: 0.7 }}/>
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* Study tip */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
        style={{ background: 'linear-gradient(135deg,#FFF7ED,#FFFBEB)', borderRadius: '18px', border: '1.5px solid #FED7AA', padding: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span style={{ fontSize: '16px' }}>💡</span>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#92400E' }}>Study tip</p>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#78350F', lineHeight: 1.7 }}>{tip}</p>
      </motion.div>

      {/* Chapter types */}
      {Object.keys(theme.typeColors).length > 0 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
          style={{ background: 'white', borderRadius: '18px', border: '1.5px solid #E2E8F0', padding: '18px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '12px' }}>Chapter types</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {Object.entries(theme.typeColors).map(([type, tc]) => (
              <div key={type} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>{tc.emoji}</span>
                <div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: tc.text, marginBottom: '1px' }}>{type}</p>
                  {tc.desc && <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#94A3B8', lineHeight: 1.5 }}>{tc.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quiz scores */}
      {Object.keys(scores).length > 0 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
          style={{ background: 'white', borderRadius: '18px', border: '1.5px solid #E2E8F0', padding: '18px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '12px' }}>Quiz scores</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {chapters.filter(c => scores[c.id] != null).map(ch => (
              <div key={ch.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#64748B', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Ch.{ch.id} {ch.title}</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', flexShrink: 0, color: scores[ch.id] >= 80 ? '#059669' : scores[ch.id] >= 60 ? '#D97706' : '#DC2626' }}>{scores[ch.id]}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

// ── Main generic component ────────────────────────────────────────────────────
export default function GenericSubjectPage({ chapters, theme, studentId }: {
  chapters: SubjectChapter[]; theme: SubjectTheme; studentId: string
}) {
  const [progress,         setProgress]         = useState<Record<number, number>>({})
  const [scores,           setScores]           = useState<Record<number, number>>({})
  const [flashcardChapter, setFlashcardChapter] = useState<SubjectChapter | null>(null)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: secs } = await supabase.from('student_lesson_progress').select('chapter_id').eq('student_id', studentId).eq('subject', theme.subject)
      const countMap: Record<number, number> = {}
      secs?.forEach((r: any) => { countMap[r.chapter_id] = (countMap[r.chapter_id] || 0) + 1 })
      setProgress(countMap)
      const { data: quiz } = await supabase.from('student_quiz_attempts').select('chapter_id, score').eq('student_id', studentId).eq('subject', theme.subject).order('created_at', { ascending: false })
      const scoreMap: Record<number, number> = {}
      quiz?.forEach((r: any) => { if (!(r.chapter_id in scoreMap)) scoreMap[r.chapter_id] = r.score })
      setScores(scoreMap)
    }
    load()
  }, [studentId, theme.subject])

  const currentChapter  = chapters.find(c => (progress[c.id] || 0) < 7)
  const completedCount  = chapters.filter(c => (progress[c.id] || 0) >= 7).length
  const overallProgress = Math.round((completedCount / chapters.length) * 100)
  const avgScore        = Object.values(scores).length ? Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length) : null

  if (flashcardChapter) return (
    <VocabFlashcards
      subject={theme.subject}
      chapterId={flashcardChapter.id}
      chapterTitle={flashcardChapter.title}
      onClose={() => setFlashcardChapter(null)}
    />
  )

  return (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', width: '100%' }}>

      {/* ── Left main column ── */}
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ background: theme.heroBg, borderRadius: '24px', padding: '24px 28px', marginBottom: '18px', border: `1px solid ${theme.heroBorder}`, position: 'relative', overflow: 'hidden' }}>
          {theme.floatEmojis.map((em, i) => (
            <motion.div key={i} animate={{ y: [0, -8-i*2, 0], rotate: [0, i%2===0?5:-5, 0] }} transition={{ duration: 4+i, repeat: Infinity, delay: i*0.8 }}
              style={{ position: 'absolute', top: i < 2 ? `${14+i*8}px` : `${16+i*6}px`, right: i < 2 ? `${90-i*46}px` : `${60-i*10}px`, fontSize: `${26-i*2}px`, opacity: 0.22-i*0.03, pointerEvents: 'none' }}>
              {em}
            </motion.div>
          ))}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: theme.primaryDark, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{theme.emoji}</div>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: theme.primaryMid, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{theme.bookSeries}</p>
                  <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: theme.primaryDark, lineHeight: 1 }}>
                    {theme.title}{theme.nativeTitle ? <span style={{ fontSize: '18px', marginLeft: '8px', opacity: 0.7 }}>{theme.nativeTitle}</span> : null}
                  </h1>
                </div>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: theme.primaryMid, lineHeight: 1.6, maxWidth: '380px' }}>{theme.description}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
              <ProgressRing pct={overallProgress} size={76} stroke={7} color={theme.primaryDark}/>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ background: 'white', borderRadius: '10px', padding: '8px 14px', border: `1px solid ${theme.heroBorder}`, textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '18px', color: theme.primaryDark, lineHeight: 1 }}><Counter target={completedCount}/>{`/${chapters.length}`}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: theme.primaryMid, marginTop: '2px' }}>Chapters</p>
                </div>
                {avgScore !== null && (
                  <div style={{ background: theme.scoreBg, borderRadius: '10px', padding: '8px 14px', border: `1px solid ${theme.heroBorder}`, textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '18px', color: theme.scoreText, lineHeight: 1 }}><Counter target={avgScore} suffix="%"/></p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: theme.scoreSub, marginTop: '2px' }}>Avg score</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* UP NEXT */}
        {currentChapter && (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.4 }} style={{ marginBottom: '20px' }}>
            <Link href={`/student/${theme.chapterRoute}/${currentChapter.id}`} style={{ textDecoration: 'none' }}>
              <motion.div whileHover={{ scale: 1.015, boxShadow: `0 14px 36px ${theme.primaryDark}30` }} whileTap={{ scale: 0.99 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                style={{ background: `linear-gradient(135deg,${theme.primaryDark},${theme.primaryMid})`, borderRadius: '18px', padding: '22px 26px', display: 'flex', alignItems: 'center', gap: '18px', boxShadow: `0 6px 20px ${theme.primaryDark}22` }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', color: `${theme.accentColor}CC`, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '5px' }}>
                    {(progress[currentChapter.id] || 0) > 0 ? '📖 Continue reading' : '▶️ Start reading'}
                  </p>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color: 'white', lineHeight: 1.25, marginBottom: '3px' }}>{currentChapter.title}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Chapter {currentChapter.id} · {currentChapter.type} · {currentChapter.estimatedReadMins} min read</p>
                  {(progress[currentChapter.id] || 0) > 0 && (
                    <div style={{ marginTop: '10px', height: '3px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', width: '180px', overflow: 'hidden' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${((progress[currentChapter.id]||0)/7)*100}%` }} transition={{ duration: 0.8, delay: 0.3 }}
                        style={{ height: '100%', background: theme.accentColor, borderRadius: '2px' }}/>
                    </div>
                  )}
                </div>
                <motion.div animate={{ x: [0,4,0] }} transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(255,255,255,0.2)' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 9h10M10 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
        )}

        {/* Chapter list */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
          All chapters
        </motion.p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
          {chapters.map((chapter, i) => {
            const secsDone = progress[chapter.id] || 0
            return (
              <ChapterCard key={chapter.id} chapter={chapter} secsDone={secsDone} score={scores[chapter.id]}
                isCompleted={secsDone >= 7} isStarted={secsDone > 0 && secsDone < 7}
                isCurrent={chapter.id === currentChapter?.id} index={i} theme={theme}
                onFlashcards={secsDone >= 7 ? () => setFlashcardChapter(chapter) : undefined}/>
            )
          })}
        </div>
        <ClassQuestionsWidget subject={theme.subject} studentId={studentId}/>
      </div>

      {/* ── Right sidebar ── */}
      <div style={{ flexShrink: 0 }}>
        <RightSidebar chapters={chapters} completedCount={completedCount} avgScore={avgScore} progress={progress} scores={scores} theme={theme}/>
      </div>
    </div>
  )
}
