'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import ClassQuestionsWidget from '@/components/ClassQuestionsWidget'

const CHAPTERS = [
  { id: 1, title: 'Whistles and Shaving Bristles', type: 'Prose',                  emoji: '✂️',  estimatedReadMins: 15 },
  { id: 2, title: 'If I Were Lord of Tartary',     type: 'Poetry',                 emoji: '👑',  estimatedReadMins: 12 },
  { id: 3, title: 'The Fun They Had',              type: 'Story',                  emoji: '🤖',  estimatedReadMins: 16 },
  { id: 4, title: 'In Morning Dew',                type: 'Poetry',                 emoji: '🌿',  estimatedReadMins: 11 },
  { id: 5, title: 'The Boy Who Outran the Wind',   type: 'Biography',              emoji: '🏃',  estimatedReadMins: 18 },
  { id: 6, title: 'The Blind Boy',                 type: 'Poetry',                 emoji: '🌟',  estimatedReadMins: 12 },
  { id: 7, title: 'Three Questions',               type: 'Story',                  emoji: '🤔',  estimatedReadMins: 20 },
  { id: 8, title: 'From a Railway Carriage',       type: 'Poetry',                 emoji: '🚂',  estimatedReadMins: 10 },
]

const TYPE_CONFIG: Record<string, { bg: string; text: string; border: string; emoji: string }> = {
  'Prose':     { bg: '#EEF2FF', text: '#3730A3', border: '#C7D2FE', emoji: '📄' },
  'Poetry':    { bg: '#FFF7ED', text: '#9A3412', border: '#FED7AA', emoji: '🎭' },
  'Story':     { bg: '#F0FDF4', text: '#166534', border: '#BBF7D0', emoji: '📖' },
  'Biography': { bg: '#FDF4FF', text: '#7E22CE', border: '#E9D5FF', emoji: '👤' },
}

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!target) return
    let n = 0
    const step = Math.max(1, Math.ceil(target / 25))
    const t = setInterval(() => {
      n = Math.min(n + step, target)
      setVal(n)
      if (n >= target) clearInterval(t)
    }, 35)
    return () => clearInterval(t)
  }, [target])
  return <>{val}{suffix}</>
}

// ── Progress ring ─────────────────────────────────────────────────────────────
function ProgressRing({ pct, size = 72, stroke = 7, color = '#4338CA' }: {
  pct: number; size?: number; stroke?: number; color?: string
}) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={stroke}/>
      <motion.circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - (circ * pct / 100) }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        transform={`rotate(-90 ${size/2} ${size/2})`}
      />
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central"
        fill="#1E1B4B" fontSize={size * 0.22} fontWeight="800"
        fontFamily="var(--font-heading)">
        {pct}%
      </text>
    </svg>
  )
}

// ── Chapter card ──────────────────────────────────────────────────────────────
function ChapterCard({
  chapter, secsDone, score, isCompleted, isStarted, isCurrent, index
}: {
  chapter: typeof CHAPTERS[0]
  secsDone: number
  score?: number
  isCompleted: boolean
  isStarted: boolean
  isCurrent: boolean
  index: number
}) {
  const typeConfig = TYPE_CONFIG[chapter.type] || { bg: '#F9FAFB', text: '#374151', border: '#E5E7EB', emoji: '📄' }
  const ctaLabel   = isCompleted ? 'Review' : isStarted ? 'Resume' : 'Start'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
      <Link href={`/student/chapter/${chapter.id}`} style={{ textDecoration: 'none', display: 'block' }}>
        <motion.div
          whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(67,56,202,0.1)' }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{
            background: isCompleted ? 'linear-gradient(135deg,#F0FDF4,#ECFDF5)' : isCurrent ? 'linear-gradient(135deg,#EEF2FF,#F5F3FF)' : 'white',
            borderRadius: '18px',
            border: isCompleted ? '1.5px solid #86EFAC' : isCurrent ? '1.5px solid #A5B4FC' : '1.5px solid #F3F4F6',
            padding: '18px 20px',
            display: 'flex', alignItems: 'center', gap: '16px',
            cursor: 'pointer', position: 'relative', overflow: 'hidden',
          }}>

          {/* Subtle background pattern for current */}
          {isCurrent && (
            <div style={{
              position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%',
              background: 'linear-gradient(135deg, transparent, rgba(165,180,252,0.15))',
              pointerEvents: 'none',
            }}/>
          )}

          {/* Chapter number / check avatar */}
          <div style={{
            width: '48px', height: '48px', minWidth: '48px', borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            background: isCompleted ? '#D1FAE5' : isCurrent ? '#4338CA' : '#F3F4F6',
            fontSize: isCompleted ? '20px' : '15px',
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            color: isCompleted ? '#065F46' : isCurrent ? 'white' : '#9CA3AF',
          }}>
            {isCompleted ? '✓' : chapter.emoji}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <p style={{
                fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px',
                color: isCompleted ? '#065F46' : isCurrent ? '#1E1B4B' : '#1F2937',
                lineHeight: 1.3,
              }}>
                {chapter.title}
              </p>
              {isCurrent && !isCompleted && (
                <motion.span
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    background: '#4338CA', color: 'white',
                    fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px',
                    padding: '2px 8px', borderRadius: '20px', flexShrink: 0, letterSpacing: '0.05em',
                  }}>
                  UP NEXT
                </motion.span>
              )}
              {isCompleted && score != null && (
                <span style={{
                  background: score >= 80 ? '#D1FAE5' : score >= 60 ? '#FEF3C7' : '#FEE2E2',
                  color: score >= 80 ? '#065F46' : score >= 60 ? '#92400E' : '#991B1B',
                  fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px',
                  padding: '2px 10px', borderRadius: '20px', flexShrink: 0,
                }}>
                  ⭐ {score}%
                </span>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Type chip */}
              <span style={{
                background: typeConfig.bg, color: typeConfig.text,
                border: `1px solid ${typeConfig.border}`,
                fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px',
                padding: '3px 10px', borderRadius: '20px',
              }}>
                {typeConfig.emoji} {chapter.type}
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>
                ⏱ {chapter.estimatedReadMins} min
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>
                📋 7 sections
              </span>
              {isStarted && (
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '12px', color: '#F59E0B' }}>
                  {secsDone}/7 done
                </span>
              )}
            </div>

            {/* In-progress bar */}
            {isStarted && (
              <div style={{ marginTop: '8px', height: '3px', background: '#E5E7EB', borderRadius: '2px', width: '140px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(secsDone / 7) * 100}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{ height: '100%', background: '#F59E0B', borderRadius: '2px' }}
                />
              </div>
            )}
          </div>

          {/* CTA button */}
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px',
              padding: '9px 20px', borderRadius: '12px', flexShrink: 0,
              background: isCompleted ? 'white' : isCurrent ? '#4338CA' : '#F3F4F6',
              color: isCompleted ? '#4338CA' : isCurrent ? 'white' : '#6B7280',
              border: isCompleted ? '1.5px solid #C7D2FE' : 'none',
              display: 'inline-block',
            }}>
            {ctaLabel}
          </motion.span>
        </motion.div>
      </Link>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function EnglishSubjectPage({ studentId }: { studentId: string }) {
  const [progress, setProgress] = useState<Record<number, number>>({})
  const [scores,   setScores]   = useState<Record<number, number>>({})

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: secs } = await supabase
        .from('student_lesson_progress').select('chapter_id')
        .eq('student_id', studentId).eq('subject', 'english')
      const countMap: Record<number, number> = {}
      secs?.forEach((r: any) => { countMap[r.chapter_id] = (countMap[r.chapter_id] || 0) + 1 })
      setProgress(countMap)

      const { data: quiz } = await supabase
        .from('student_quiz_attempts').select('chapter_id, score')
        .eq('student_id', studentId).eq('subject', 'english')
        .order('created_at', { ascending: false })
      const scoreMap: Record<number, number> = {}
      quiz?.forEach((r: any) => { if (!(r.chapter_id in scoreMap)) scoreMap[r.chapter_id] = r.score })
      setScores(scoreMap)
    }
    load()
  }, [studentId])

  const currentChapter  = CHAPTERS.find(c => (progress[c.id] || 0) < 7)
  const completedCount  = CHAPTERS.filter(c => (progress[c.id] || 0) >= 7).length
  const overallProgress = Math.round((completedCount / CHAPTERS.length) * 100)
  const avgScore        = Object.values(scores).length
    ? Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length)
    : null

  return (
    <div style={{ width: '100%', maxWidth: '860px' }}>

      {/* ── Hero banner ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 50%, #EDE9FE 100%)',
          borderRadius: '24px',
          padding: '28px 32px',
          marginBottom: '20px',
          border: '1px solid #C7D2FE',
          position: 'relative', overflow: 'hidden',
        }}>

        {/* Decorative floating elements */}
        <motion.div animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity }}
          style={{ position: 'absolute', top: '16px', right: '120px', fontSize: '28px', opacity: 0.3 }}>📜</motion.div>
        <motion.div animate={{ y: [0, -6, 0], rotate: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          style={{ position: 'absolute', top: '24px', right: '60px', fontSize: '22px', opacity: 0.25 }}>✒️</motion.div>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
          style={{ position: 'absolute', bottom: '16px', right: '80px', fontSize: '24px', opacity: 0.2 }}>📚</motion.div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: '#4338CA', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '22px', flexShrink: 0,
              }}>📖</div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#6366F1', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Balbharati · Class 6
                </p>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: '#1E1B4B', lineHeight: 1 }}>
                  English
                </h1>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#4338CA', lineHeight: 1.6, maxWidth: '440px' }}>
              Stories, poems, biographies and prose from Connexion Class 6 — exploring language through great writing.
            </p>
          </div>

          {/* Stats cluster */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
            <ProgressRing pct={overallProgress} size={80} stroke={8} color="#4338CA"/>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: 'white', borderRadius: '12px', padding: '10px 16px', border: '1px solid #E0E7FF', minWidth: '90px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color: '#4338CA', lineHeight: 1 }}>
                  <Counter target={completedCount}/>/8
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#818CF8', marginTop: '2px' }}>Chapters</p>
              </div>
              {avgScore !== null && (
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  style={{ background: '#FFF7ED', borderRadius: '12px', padding: '10px 16px', border: '1px solid #FED7AA', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color: '#C2410C', lineHeight: 1 }}>
                    <Counter target={avgScore} suffix="%"/>
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#FB923C', marginTop: '2px' }}>Avg score</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── UP NEXT card ── */}
      {currentChapter && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{ marginBottom: '24px' }}>
          <Link href={`/student/chapter/${currentChapter.id}`} style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.02, boxShadow: '0 16px 40px rgba(67,56,202,0.2)' }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                background: 'linear-gradient(135deg, #3730A3, #4338CA, #4F46E5)',
                borderRadius: '20px', padding: '24px 28px',
                display: 'flex', alignItems: 'center', gap: '20px',
                boxShadow: '0 8px 24px rgba(67,56,202,0.25)',
              }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#A5B4FC', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                  {(progress[currentChapter.id] || 0) > 0 ? '📖 Continue reading' : '▶️ Start reading'}
                </p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '22px', color: 'white', lineHeight: 1.25, marginBottom: '4px' }}>
                  {currentChapter.title}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>
                  Chapter {currentChapter.id} · {currentChapter.type} · {currentChapter.estimatedReadMins} min read
                </p>
                {(progress[currentChapter.id] || 0) > 0 && (
                  <div style={{ marginTop: '12px' }}>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', width: '200px', overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((progress[currentChapter.id] || 0) / 7) * 100}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                        style={{ height: '100%', background: '#A5B4FC', borderRadius: '2px' }}
                      />
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
                      {progress[currentChapter.id]}/7 sections read
                    </p>
                  </div>
                )}
              </div>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '52px', height: '52px', background: 'rgba(255,255,255,0.15)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, border: '1px solid rgba(255,255,255,0.2)',
                }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 10h10M11 6l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </motion.div>
          </Link>
        </motion.div>
      )}

      {/* ── Chapter list ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
        All chapters
      </motion.p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
        {CHAPTERS.map((chapter, i) => {
          const secsDone    = progress[chapter.id] || 0
          const isCompleted = secsDone >= 7
          const isStarted   = secsDone > 0 && !isCompleted
          const isCurrent   = chapter.id === currentChapter?.id
          const score       = scores[chapter.id]
          return (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              secsDone={secsDone}
              score={score}
              isCompleted={isCompleted}
              isStarted={isStarted}
              isCurrent={isCurrent}
              index={i}
            />
          )
        })}
      </div>

      <ClassQuestionsWidget subject="english" studentId={studentId}/>
    </div>
  )
}
