'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FlashCard {
  word: string
  meaning: string
}

interface Props {
  subject: string
  chapterId: number
  chapterTitle: string
  onClose: () => void
}

async function loadCards(subject: string, chapterId: number): Promise<FlashCard[]> {
  try {
    let wordMap: Record<string, { meaning: string; display?: string }> = {}

    if (subject === 'english') {
      const { getWordMap } = await import('@/lib/tooltip-words')
      wordMap = getWordMap(chapterId)
    } else if (subject === 'maths') {
      const { getMthWordMap } = await import('@/lib/mth-tooltip-words')
      wordMap = getMthWordMap(chapterId)
    } else if (subject === 'science') {
      const { getSciWordMap } = await import('@/lib/sci-tooltip-words')
      wordMap = getSciWordMap(chapterId)
    } else if (subject === 'history') {
      const { getHCWordMap } = await import('@/lib/hc-tooltip-words')
      wordMap = getHCWordMap(chapterId)
    } else if (subject === 'geo') {
      const { getGeoWordMap } = await import('@/lib/geo-tooltip-words')
      wordMap = getGeoWordMap(chapterId)
    } else if (subject === 'sanskrit') {
      const { getSktWordMap } = await import('@/lib/skt-tooltip-words')
      wordMap = getSktWordMap(chapterId)
    } else if (subject === 'ict') {
      const { getICTWordMap } = await import('@/lib/ict-tooltip-words')
      wordMap = getICTWordMap(chapterId)
    } else if (subject === 'marathi') {
      const { getMarWordMap } = await import('@/lib/mar-tooltip-words')
      wordMap = getMarWordMap(chapterId)
    } else if (subject === 'rapid') {
      const { getRapidWordMap } = await import('@/lib/rapid-tooltip-words')
      wordMap = getRapidWordMap(chapterId)
    }

    return Object.entries(wordMap).map(([key, val]) => ({
      word:    val.display ?? key,
      meaning: val.meaning,
    })).filter(c => c.word && c.meaning)

  } catch { return [] }
}

const SUBJECT_THEME: Record<string, { color: string; light: string; mid: string }> = {
  english:  { color: '#1B4332', light: '#F0FDF4', mid: '#2D6A4F' },
  maths:    { color: '#1E3A5F', light: '#EFF6FF', mid: '#1D4ED8' },
  science:  { color: '#3B1F5E', light: '#F5F3FF', mid: '#6D28D9' },
  history:  { color: '#7C2D12', light: '#FFF7ED', mid: '#C2410C' },
  geo:      { color: '#064E3B', light: '#ECFDF5', mid: '#065F46' },
  sanskrit: { color: '#78350F', light: '#FFFBEB', mid: '#B45309' },
  ict:      { color: '#1E40AF', light: '#EFF6FF', mid: '#2563EB' },
  marathi:  { color: '#831843', light: '#FDF2F8', mid: '#9D174D' },
  rapid:    { color: '#065F46', light: '#ECFDF5', mid: '#047857' },
}

export default function VocabFlashcards({ subject, chapterId, chapterTitle, onClose }: Props) {
  const [cards,     setCards]     = useState<FlashCard[]>([])
  const [pending,   setPending]   = useState<FlashCard[]>([])
  const [mastered,  setMastered]  = useState<FlashCard[]>([])
  const [flipped,   setFlipped]   = useState(false)
  const [loading,   setLoading]   = useState(true)
  const [phase,     setPhase]     = useState<'cards'|'done'>('cards')

  const theme = SUBJECT_THEME[subject] ?? SUBJECT_THEME.english

  useEffect(() => {
    loadCards(subject, chapterId).then(c => {
      // Shuffle
      const shuffled = [...c].sort(() => Math.random() - 0.5)
      setCards(shuffled)
      setPending(shuffled)
      setLoading(false)
    })
  }, [subject, chapterId])

  const currentCard = pending[0]

  const handleGotIt = () => {
    setFlipped(false)
    const [done, ...rest] = pending
    setMastered(prev => [...prev, done])
    setPending(rest)
    if (rest.length === 0) setPhase('done')
  }

  const handleReviewAgain = () => {
    setFlipped(false)
    const [current, ...rest] = pending
    // Put it at the end
    setPending([...rest, current])
  }

  const handleRestart = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setPending(shuffled)
    setMastered([])
    setFlipped(false)
    setPhase('cards')
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{ width: '28px', height: '28px', borderRadius: '50%', border: `3px solid ${theme.light}`, borderTopColor: theme.color }}/>
    </div>
  )

  if (cards.length === 0) return (
    <div style={{ textAlign: 'center', padding: '60px 24px' }}>
      <p style={{ fontSize: '40px', marginBottom: '12px' }}>📭</p>
      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', color: '#374151' }}>No vocabulary words for this chapter</p>
      <button onClick={onClose} style={{ marginTop: '20px', background: theme.color, color: 'white', border: 'none', borderRadius: '12px', padding: '12px 24px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>← Back</button>
    </div>
  )

  if (phase === 'done') return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '40px 24px', textAlign: 'center' }}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🏆</div>
      </motion.div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', color: theme.color, marginBottom: '8px' }}>
        All {cards.length} words mastered!
      </h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7280', marginBottom: '32px' }}>
        You know all the vocabulary from {chapterTitle}
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button onClick={handleRestart}
          style={{ background: theme.light, color: theme.color, border: `1.5px solid ${theme.color}30`, borderRadius: '12px', padding: '12px 24px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
          🔁 Practice again
        </button>
        <button onClick={onClose}
          style={{ background: theme.color, color: 'white', border: 'none', borderRadius: '12px', padding: '12px 24px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
          Done ✓
        </button>
      </div>
    </div>
  )

  const progress = mastered.length / cards.length

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '24px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <button onClick={onClose}
          style={{ background: 'white', border: '1.5px solid #E5E7EB', borderRadius: '10px', padding: '7px 14px', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '13px', color: '#64748B', cursor: 'pointer' }}>
          ← Back
        </button>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#374151' }}>Vocabulary</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#94A3B8' }}>
            {mastered.length} mastered · {pending.length} remaining
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden', marginBottom: '24px' }}>
        <motion.div animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.4 }}
          style={{ height: '100%', background: `linear-gradient(90deg, ${theme.color}, ${theme.mid})`, borderRadius: '3px' }}/>
      </div>

      {/* Flash card */}
      <AnimatePresence mode="wait">
        {currentCard && (
          <motion.div key={currentCard.word}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ perspective: '1000px', marginBottom: '20px', cursor: 'pointer' }}
            onClick={() => setFlipped(f => !f)}>
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              style={{ transformStyle: 'preserve-3d', position: 'relative', minHeight: '220px' }}>

              {/* Front — word */}
              <div style={{
                backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                position: 'absolute', inset: 0,
                background: `linear-gradient(135deg, ${theme.color}, ${theme.mid})`,
                borderRadius: '24px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', padding: '32px',
                boxShadow: `0 8px 32px ${theme.color}30`,
              }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>tap to reveal meaning</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: 'white', textAlign: 'center', lineHeight: 1.3 }}>
                  {currentCard.word}
                </p>
              </div>

              {/* Back — meaning */}
              <div style={{
                backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                position: 'absolute', inset: 0,
                background: theme.light,
                border: `2px solid ${theme.color}20`,
                borderRadius: '24px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', padding: '32px',
              }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: theme.color, textAlign: 'center', marginBottom: '12px' }}>
                  {currentCard.word}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#374151', textAlign: 'center', lineHeight: 1.7 }}>
                  {currentCard.meaning}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons — only show after flip */}
      <AnimatePresence>
        {flipped && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleReviewAgain}
              style={{ flex: 1, background: '#FEF2F2', color: '#DC2626', border: '1.5px solid #FCA5A5', borderRadius: '14px', padding: '14px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
              ↺ Review again
            </button>
            <button onClick={handleGotIt}
              style={{ flex: 1, background: '#F0FDF4', color: '#166534', border: '1.5px solid #86EFAC', borderRadius: '14px', padding: '14px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
              ✓ Got it!
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint text before flip */}
      {!flipped && (
        <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#94A3B8' }}>
          Tap the card to see the meaning
        </p>
      )}
    </div>
  )
}
