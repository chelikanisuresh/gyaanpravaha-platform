'use client'

import { useState, useEffect } from 'react'
import VocabFlashcards from '@/components/VocabFlashcards'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import ClassQuestionsWidget from '@/components/ClassQuestionsWidget'

const CHAPTERS = [
  { id: 1, title: 'Whistles and Shaving Bristles', type: 'Prose',     emoji: '✂️', estimatedReadMins: 15 },
  { id: 2, title: 'If I Were Lord of Tartary',     type: 'Poetry',    emoji: '👑', estimatedReadMins: 12 },
  { id: 3, title: 'The Fun They Had',              type: 'Story',     emoji: '🤖', estimatedReadMins: 16 },
  { id: 4, title: 'In Morning Dew',                type: 'Poetry',    emoji: '🌿', estimatedReadMins: 11 },
  { id: 5, title: 'The Boy Who Outran the Wind',   type: 'Biography', emoji: '🏃', estimatedReadMins: 18 },
  { id: 6, title: 'The Blind Boy',                 type: 'Poetry',    emoji: '🌟', estimatedReadMins: 12 },
  { id: 7, title: 'Three Questions',               type: 'Story',     emoji: '🤔', estimatedReadMins: 20 },
  { id: 8, title: 'From a Railway Carriage',       type: 'Poetry',    emoji: '🚂', estimatedReadMins: 10 },
]

const TYPE_CONFIG: Record<string, { bg: string; text: string; border: string; emoji: string; desc: string }> = {
  'Prose':     { bg: '#EEF2FF', text: '#3730A3', border: '#C7D2FE', emoji: '📄', desc: 'Descriptive writing in everyday language' },
  'Poetry':    { bg: '#FFF7ED', text: '#9A3412', border: '#FED7AA', emoji: '🎭', desc: 'Expressive verse with rhythm and imagery'  },
  'Story':     { bg: '#F0FDF4', text: '#166534', border: '#BBF7D0', emoji: '📖', desc: 'Narrative with characters and plot'        },
  'Biography': { bg: '#FDF4FF', text: '#7E22CE', border: '#E9D5FF', emoji: '👤', desc: 'True account of a person\'s life'         },
}

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

function ProgressRing({ pct, size = 72, stroke = 7, color = '#4338CA' }: { pct: number; size?: number; stroke?: number; color?: string }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={stroke}/>
      <motion.circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ} initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - (circ * pct / 100) }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        transform={`rotate(-90 ${size/2} ${size/2})`}/>
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central"
        fill="#1E1B4B" fontSize={size * 0.22} fontWeight="800" fontFamily="var(--font-heading)">{pct}%</text>
    </svg>
  )
}

function ChapterCard({ chapter, secsDone, score, isCompleted, isStarted, isCurrent, index, onFlashcards }: {
  chapter: typeof CHAPTERS[0]; secsDone: number; score?: number
  isCompleted: boolean; isStarted: boolean; isCurrent: boolean; index: number
  onFlashcards?: () => void
}) {
  const tc = TYPE_CONFIG[chapter.type] || { bg: '#F9FAFB', text: '#374151', border: '#E5E7EB', emoji: '📄', desc: '' }
  const ctaLabel = isCompleted ? 'Review' : isStarted ? 'Resume' : 'Start'

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
      <Link href={`/student/chapter/${chapter.id}`} style={{ textDecoration: 'none', display: 'block' }}>
        <motion.div
          whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(67,56,202,0.09)' }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{
            background: isCompleted ? 'linear-gradient(135deg,#F0FDF4,#ECFDF5)' : isCurrent ? 'linear-gradient(135deg,#EEF2FF,#F5F3FF)' : 'white',
            borderRadius: '16px',
            border: isCompleted ? '1.5px solid #86EFAC' : isCurrent ? '1.5px solid #A5B4FC' : '1.5px solid #F1F5F9',
            padding: '16px 18px',
            display: 'flex', alignItems: 'center', gap: '14px',
            cursor: 'pointer', position: 'relative', overflow: 'hidden',
          }}>

          {isCurrent && <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '35%', background: 'linear-gradient(135deg,transparent,rgba(165,180,252,0.12))', pointerEvents: 'none' }}/>}

          {/* Avatar */}
          <div style={{
            width: '46px', height: '46px', minWidth: '46px', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            background: isCompleted ? '#D1FAE5' : isCurrent ? '#4338CA' : '#F8FAFC',
            fontSize: isCompleted ? '18px' : '20px',
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            color: isCompleted ? '#065F46' : isCurrent ? 'white' : '#9CA3AF',
          }}>
            {isCompleted ? '✓' : chapter.emoji}
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', flexWrap: 'wrap' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: isCompleted ? '#065F46' : isCurrent ? '#1E1B4B' : '#1F2937', lineHeight: 1.3 }}>
                {chapter.title}
              </p>
              {isCurrent && !isCompleted && (
                <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  style={{ background: '#4338CA', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '9px', padding: '2px 7px', borderRadius: '20px', flexShrink: 0, letterSpacing: '0.06em' }}>
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
              <span style={{ background: tc.bg, color: tc.text, border: `1px solid ${tc.border}`, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', padding: '2px 9px', borderRadius: '20px' }}>
                {tc.emoji} {chapter.type}
              </span>
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
            <span style={{
              fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px',
              padding: '8px 18px', borderRadius: '10px',
              background: isCompleted ? 'white' : isCurrent ? '#4338CA' : '#F1F5F9',
              color: isCompleted ? '#4338CA' : isCurrent ? 'white' : '#64748B',
              border: isCompleted ? '1.5px solid #C7D2FE' : 'none',
            }}>{ctaLabel}</span>
            {isCompleted && onFlashcards && (
              <button
                onClick={e => { e.preventDefault(); e.stopPropagation(); onFlashcards() }}
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', padding: '5px 12px', borderRadius: '8px', background: '#D8F3DC', color: '#1B4332', border: '1px solid #86EFAC', cursor: 'pointer', whiteSpace: 'nowrap' }}>
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
function RightSidebar({ completedCount, avgScore, progress, scores }: {
  completedCount: number; avgScore: number | null
  progress: Record<number, number>; scores: Record<number, number>
}) {
  const tips = [
    'Read each section twice — once for understanding, once to notice how the writer uses words.',
    'For poetry, say the lines out loud. The rhythm helps you remember the meaning.',
    'When you finish a chapter, try to explain it in 3 sentences in your own words.',
    'Pay attention to the character\'s feelings — this helps with long answer questions.',
  ]
  const tip = tips[new Date().getDay() % tips.length]

  const typeCounts = CHAPTERS.reduce((acc, ch) => {
    const done = (progress[ch.id] || 0) >= 7
    acc[ch.type] = (acc[ch.type] || 0) + (done ? 1 : 0)
    return acc
  }, {} as Record<string, number>)

  const typeTotal = CHAPTERS.reduce((acc, ch) => {
    acc[ch.type] = (acc[ch.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div style={{ width: '260px', minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

      {/* Overall stats */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
        style={{ background: 'white', borderRadius: '18px', border: '1.5px solid #E2E8F0', padding: '20px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '14px' }}>Your progress</p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <div style={{ flex: 1, background: '#EEF2FF', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '22px', color: '#4338CA', lineHeight: 1 }}>{completedCount}/8</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#818CF8', marginTop: '3px' }}>Chapters</p>
          </div>
          {avgScore !== null && (
            <div style={{ flex: 1, background: '#FFF7ED', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '22px', color: '#C2410C', lineHeight: 1 }}>{avgScore}%</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#FB923C', marginTop: '3px' }}>Quiz avg</p>
            </div>
          )}
        </div>

        {/* Chapter type progress */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {Object.entries(typeTotal).map(([type, total]) => {
            const done = typeCounts[type] || 0
            const tc   = TYPE_CONFIG[type]
            return (
              <div key={type}>
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
        </div>
      </motion.div>

      {/* Reading tip */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
        style={{ background: 'linear-gradient(135deg,#FFF7ED,#FFFBEB)', borderRadius: '18px', border: '1.5px solid #FED7AA', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span style={{ fontSize: '18px' }}>💡</span>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#92400E' }}>Study tip</p>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#78350F', lineHeight: 1.7 }}>{tip}</p>
      </motion.div>

      {/* Chapter types guide */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
        style={{ background: 'white', borderRadius: '18px', border: '1.5px solid #E2E8F0', padding: '20px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '12px' }}>Chapter types</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {Object.entries(TYPE_CONFIG).map(([type, tc]) => (
            <div key={type} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>{tc.emoji}</span>
              <div>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: tc.text, marginBottom: '1px' }}>{type}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#94A3B8', lineHeight: 1.5 }}>{tc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent quiz scores */}
      {Object.keys(scores).length > 0 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
          style={{ background: 'white', borderRadius: '18px', border: '1.5px solid #E2E8F0', padding: '20px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '12px' }}>Quiz scores</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {CHAPTERS.filter(c => scores[c.id] != null).map(ch => {
              const s = scores[ch.id]
              return (
                <div key={ch.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#64748B', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Ch.{ch.id} {ch.title}</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: s >= 80 ? '#059669' : s >= 60 ? '#D97706' : '#DC2626', flexShrink: 0 }}>{s}%</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function EnglishSubjectPage({ studentId }: { studentId: string }) {
  const [progress,         setProgress]         = useState<Record<number, number>>({})
  const [scores,           setScores]           = useState<Record<number, number>>({})
  const [flashcardChapter, setFlashcardChapter] = useState<typeof CHAPTERS[0] | null>(null)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: secs } = await supabase.from('student_lesson_progress').select('chapter_id').eq('student_id', studentId).eq('subject', 'english')
      const countMap: Record<number, number> = {}
      secs?.forEach((r: any) => { countMap[r.chapter_id] = (countMap[r.chapter_id] || 0) + 1 })
      setProgress(countMap)
      const { data: quiz } = await supabase.from('student_quiz_attempts').select('chapter_id, score').eq('student_id', studentId).eq('subject', 'english').order('created_at', { ascending: false })
      const scoreMap: Record<number, number> = {}
      quiz?.forEach((r: any) => { if (!(r.chapter_id in scoreMap)) scoreMap[r.chapter_id] = r.score })
      setScores(scoreMap)
    }
    load()
  }, [studentId])

  const currentChapter  = CHAPTERS.find(c => (progress[c.id] || 0) < 7)
  const completedCount  = CHAPTERS.filter(c => (progress[c.id] || 0) >= 7).length
  const overallProgress = Math.round((completedCount / CHAPTERS.length) * 100)
  const avgScore        = Object.values(scores).length ? Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length) : null

  return (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', width: '100%' }}>

      {/* ── Left main column ── */}
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ background: 'linear-gradient(135deg,#EEF2FF 0%,#F5F3FF 60%,#EDE9FE 100%)', borderRadius: '24px', padding: '24px 28px', marginBottom: '18px', border: '1px solid #C7D2FE', position: 'relative', overflow: 'hidden' }}>
          <motion.div animate={{ y: [0,-8,0], rotate: [0,5,0] }} transition={{ duration: 5, repeat: Infinity }} style={{ position: 'absolute', top: '14px', right: '90px', fontSize: '26px', opacity: 0.25 }}>📜</motion.div>
          <motion.div animate={{ y: [0,-6,0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} style={{ position: 'absolute', top: '22px', right: '44px', fontSize: '20px', opacity: 0.2 }}>✒️</motion.div>
          <motion.div animate={{ y: [0,-10,0] }} transition={{ duration: 6, repeat: Infinity, delay: 0.5 }} style={{ position: 'absolute', bottom: '14px', right: '60px', fontSize: '22px', opacity: 0.18 }}>📚</motion.div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#4338CA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>📖</div>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#6366F1', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Your syllabus</p>
                  <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: '#1E1B4B', lineHeight: 1 }}>English</h1>
                </div>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#4338CA', lineHeight: 1.6, maxWidth: '380px' }}>
                Stories, poems, biographies and prose — exploring language through great writing.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
              <ProgressRing pct={overallProgress} size={76} stroke={7} color="#4338CA"/>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ background: 'white', borderRadius: '10px', padding: '8px 14px', border: '1px solid #E0E7FF', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '18px', color: '#4338CA', lineHeight: 1 }}><Counter target={completedCount}/>/8</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#818CF8', marginTop: '2px' }}>Chapters</p>
                </div>
                {avgScore !== null && (
                  <div style={{ background: '#FFF7ED', borderRadius: '10px', padding: '8px 14px', border: '1px solid #FED7AA', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '18px', color: '#C2410C', lineHeight: 1 }}><Counter target={avgScore} suffix="%"/></p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#FB923C', marginTop: '2px' }}>Avg score</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* UP NEXT */}
        {currentChapter && (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.4 }} style={{ marginBottom: '20px' }}>
            <Link href={`/student/chapter/${currentChapter.id}`} style={{ textDecoration: 'none' }}>
              <motion.div whileHover={{ scale: 1.015, boxShadow: '0 14px 36px rgba(67,56,202,0.22)' }} whileTap={{ scale: 0.99 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                style={{ background: 'linear-gradient(135deg,#3730A3,#4338CA,#4F46E5)', borderRadius: '18px', padding: '22px 26px', display: 'flex', alignItems: 'center', gap: '18px', boxShadow: '0 6px 20px rgba(67,56,202,0.22)' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', color: '#A5B4FC', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '5px' }}>
                    {(progress[currentChapter.id] || 0) > 0 ? '📖 Continue reading' : '▶️ Start reading'}
                  </p>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color: 'white', lineHeight: 1.25, marginBottom: '3px' }}>{currentChapter.title}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Chapter {currentChapter.id} · {currentChapter.type} · {currentChapter.estimatedReadMins} min read</p>
                  {(progress[currentChapter.id] || 0) > 0 && (
                    <div style={{ marginTop: '10px', height: '3px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', width: '180px', overflow: 'hidden' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${((progress[currentChapter.id]||0)/7)*100}%` }} transition={{ duration: 0.8, delay: 0.3 }}
                        style={{ height: '100%', background: '#A5B4FC', borderRadius: '2px' }}/>
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
          {CHAPTERS.map((chapter, i) => {
            const secsDone = progress[chapter.id] || 0
            return (
              <ChapterCard key={chapter.id} chapter={chapter} secsDone={secsDone} score={scores[chapter.id]}
                isCompleted={secsDone >= 7} isStarted={secsDone > 0 && secsDone < 7}
                isCurrent={chapter.id === currentChapter?.id} index={i}
                onFlashcards={secsDone >= 7 ? () => setFlashcardChapter(chapter) : undefined}/>
            )
          })}
        </div>
        <ClassQuestionsWidget subject="english" studentId={studentId}/>
      </div>

      {/* ── Right sidebar ── */}
      <div style={{ flexShrink: 0 }}>
        <RightSidebar completedCount={completedCount} avgScore={avgScore} progress={progress} scores={scores}/>
      </div>
    </div>
  )
}
