'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'

interface ExamQuestion {
  id: string
  subject: string
  chapterId: number
  questionId: number
  type: string
  question: string
  options?: { label: string; text: string }[]
  answer: string
  reexplanation: string
  marks: number
}

interface ExamConfig {
  subject: string
  chapter_ids: number[]
  is_active: boolean
  duration_mins: number
  term: string
}

const SUBJECT_LABELS: Record<string, { label: string; emoji: string; color: string }> = {
  english:  { label: 'English',         emoji: '📖', color: '#1B4332' },
  maths:    { label: 'Mathematics',     emoji: '🔢', color: '#1E3A5F' },
  science:  { label: 'Science',         emoji: '🔬', color: '#3B1F5E' },
  history:  { label: 'History & Civics',emoji: '🏛️', color: '#7C2D12' },
  geo:      { label: 'Geography',       emoji: '🌍', color: '#064E3B' },
  sanskrit: { label: 'Sanskrit',        emoji: '🕉️', color: '#78350F' },
  ict:      { label: 'ICT',             emoji: '💻', color: '#1E40AF' },
  marathi:  { label: 'मराठी',           emoji: '📜', color: '#831843' },
  rapid:    { label: 'Rapid Reader',    emoji: '📚', color: '#065F46' },
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Load 5 MCQ questions per chapter from the quiz content
async function loadQuestionsForConfig(configs: ExamConfig[]): Promise<ExamQuestion[]> {
  const all: ExamQuestion[] = []
  for (const config of configs) {
    if (!config.is_active || !config.chapter_ids.length) continue
    let getQuizFn: ((id: number) => any) | null = null
    try {
      if (config.subject === 'english') {
        const m = await import('@/lib/quiz-content'); getQuizFn = m.getQuiz
      } else if (config.subject === 'maths') {
        const m = await import('@/lib/mth-quiz-content'); getQuizFn = m.getMthQuiz
      } else if (config.subject === 'science') {
        const m = await import('@/lib/sci-quiz-content'); getQuizFn = m.getSciQuiz
      } else if (config.subject === 'history') {
        const m = await import('@/lib/hc-quiz-content'); getQuizFn = m.getHCQuiz
      } else if (config.subject === 'geo') {
        const m = await import('@/lib/geo-quiz-content'); getQuizFn = m.getGeoQuiz
      } else if (config.subject === 'sanskrit') {
        const m = await import('@/lib/skt-quiz-content'); getQuizFn = m.getSktQuiz
      } else if (config.subject === 'ict') {
        const m = await import('@/lib/ict-quiz-content'); getQuizFn = m.getICTQuiz
      } else if (config.subject === 'rapid') {
        const m = await import('@/lib/rapid-quiz-content'); getQuizFn = m.getRapidQuiz
      }
    } catch { continue }
    if (!getQuizFn) continue

    for (const chapterId of config.chapter_ids) {
      const quiz = getQuizFn(chapterId)
      if (!quiz) continue
      // Pick 5 MCQ + 2 single_word per chapter, shuffle
      const mcqs      = quiz.questions.filter((q: any) => q.type === 'mcq').slice(0, 5)
      const swqs      = quiz.questions.filter((q: any) => q.type === 'single_word').slice(0, 2)
      const selected  = shuffle([...mcqs, ...swqs])
      selected.forEach((q: any) => {
        all.push({
          id:            `${config.subject}-${chapterId}-${q.id}`,
          subject:       config.subject,
          chapterId,
          questionId:    q.id,
          type:          q.type,
          question:      q.question,
          options:       q.options ? shuffle(q.options) : undefined,
          answer:        q.answer,
          reexplanation: q.reexplanation ?? '',
          marks:         q.marks,
        })
      })
    }
  }
  return shuffle(all)
}

// ── Timer ─────────────────────────────────────────────────────────────────────
function Timer({ totalSecs, onExpire }: { totalSecs: number; onExpire: () => void }) {
  const [remaining, setRemaining] = useState(totalSecs)
  const ref = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    ref.current = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) { clearInterval(ref.current ?? undefined); onExpire(); return 0 }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(ref.current ?? undefined)
  }, [])

  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60
  const pct  = (remaining / totalSecs) * 100
  const urgent = remaining < 300  // last 5 mins

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: `3px solid ${urgent ? '#DC2626' : '#E5E7EB'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: urgent ? '#FEF2F2' : 'white', flexShrink: 0 }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '12px', color: urgent ? '#DC2626' : '#374151' }}>
          {mins}:{secs.toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}

// ── Results screen ────────────────────────────────────────────────────────────
function ResultsScreen({ questions, answers, term, timeTaken, onClose }: {
  questions: ExamQuestion[]
  answers: Record<string, string>
  term: string
  timeTaken: number
  onClose: () => void
}) {
  const correct = questions.filter(q => {
    const given = (answers[q.id] ?? '').trim().toLowerCase()
    return given === q.answer.trim().toLowerCase()
  })
  const totalMarks = questions.reduce((s, q) => s + q.marks, 0)
  const earned     = correct.reduce((s, q) => s + q.marks, 0)
  const pct        = Math.round((earned / totalMarks) * 100)

  // Per subject breakdown
  const subjects = [...new Set(questions.map(q => q.subject))]
  const breakdown = subjects.map(s => {
    const sq = questions.filter(q => q.subject === s)
    const sc = sq.filter(q => (answers[q.id] ?? '').trim().toLowerCase() === q.answer.trim().toLowerCase())
    return { subject: s, total: sq.length, correct: sc.length, pct: Math.round((sc.length / sq.length) * 100) }
  })

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>
          {pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚'}
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: '#1F2937', marginBottom: '8px' }}>
          {term} Exam Result
        </h1>
        <div style={{ background: pct >= 80 ? '#F0FDF4' : pct >= 60 ? '#FEF3C7' : '#FEF2F2', borderRadius: '20px', padding: '20px', marginBottom: '16px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '52px', color: pct >= 80 ? '#166534' : pct >= 60 ? '#92400E' : '#991B1B', lineHeight: 1 }}>{pct}%</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280', marginTop: '6px' }}>{earned} / {totalMarks} marks · {Math.floor(timeTaken / 60)}m {timeTaken % 60}s</p>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>
          {pct >= 80 ? 'Excellent work! You are well prepared.' : pct >= 60 ? 'Good effort! Review the chapters below.' : 'Keep revising — you will get there!'}
        </p>
      </div>

      {/* Subject breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
        {breakdown.map(b => {
          const s = SUBJECT_LABELS[b.subject]
          return (
            <div key={b.subject} style={{ background: 'white', borderRadius: '14px', border: '1.5px solid #F1F5F9', padding: '14px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span>{s?.emoji}</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1F2937', flex: 1 }}>{s?.label}</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '14px', color: b.pct >= 80 ? '#166534' : b.pct >= 60 ? '#92400E' : '#991B1B' }}>{b.pct}%</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8' }}>{b.correct}/{b.total}</span>
              </div>
              <div style={{ height: '5px', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${b.pct}%`, background: s?.color ?? '#1B4332', borderRadius: '3px', transition: 'width 0.8s ease' }}/>
              </div>
            </div>
          )
        })}
      </div>

      <button onClick={onClose}
        style={{ width: '100%', background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', color: 'white', border: 'none', borderRadius: '14px', padding: '16px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', cursor: 'pointer' }}>
        Back to Dashboard
      </button>
    </div>
  )
}

// ── Main Exam component ───────────────────────────────────────────────────────
export default function ExamMode({ studentId, onClose }: { studentId: string; onClose: () => void }) {
  const [phase,     setPhase]     = useState<'loading'|'intro'|'exam'|'results'>('loading')
  const [configs,   setConfigs]   = useState<ExamConfig[]>([])
  const [questions, setQuestions] = useState<ExamQuestion[]>([])
  const [answers,   setAnswers]   = useState<Record<string, string>>({})
  const [qIdx,      setQIdx]      = useState(0)
  const [timeTaken, setTimeTaken] = useState(0)
  const startTime                 = useRef<number>(0)

  const totalDurationMins = configs.length
    ? Math.max(...configs.filter(c => c.is_active).map(c => c.duration_mins))
    : 60
  const term = configs.find(c => c.is_active)?.term ?? 'Term 1'

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data } = await supabase.from('exam_config').select('*').eq('is_active', true)
      if (!data?.length) { setPhase('intro'); setConfigs([]); return }
      setConfigs(data)
      const qs = await loadQuestionsForConfig(data)
      setQuestions(qs)
      setPhase('intro')
    }
    load()
  }, [])

  const startExam = () => {
    startTime.current = Date.now()
    setPhase('exam')
  }

  const submitExam = async () => {
    const taken = Math.round((Date.now() - startTime.current) / 1000)
    setTimeTaken(taken)

    // Score calculation
    const totalMarks = questions.reduce((s, q) => s + q.marks, 0)
    const earned = questions.reduce((s, q) => {
      const given = (answers[q.id] ?? '').trim().toLowerCase()
      return s + (given === q.answer.trim().toLowerCase() ? q.marks : 0)
    }, 0)
    const pct = Math.round((earned / totalMarks) * 100)

    // Save to DB
    const supabase = createClient()
    await supabase.from('exam_attempts').insert({
      student_id:      studentId,
      subject:         configs.map(c => c.subject).join(','),
      term,
      score:           pct,
      total_marks:     totalMarks,
      time_taken_secs: taken,
      answers:         JSON.stringify(answers),
    })
    setPhase('results')
  }

  const currentQ = questions[qIdx]

  if (phase === 'loading') return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{ width: '32px', height: '32px', borderRadius: '50%', border: '3px solid #E5E7EB', borderTopColor: '#1B4332' }}/>
    </div>
  )

  if (phase === 'intro') return (
    <div style={{ maxWidth: '580px', margin: '0 auto', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: '#1F2937', marginBottom: '8px' }}>
        {term} Exam
      </h1>
      {configs.length === 0 ? (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#94A3B8' }}>No exam is currently active. Check back later.</p>
      ) : (
        <>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7280', marginBottom: '28px', lineHeight: 1.7 }}>
            {questions.length} questions across {configs.length} subject{configs.length > 1 ? 's' : ''} · {totalDurationMins} minutes
          </p>
          <div style={{ background: '#FEF3C7', borderRadius: '14px', padding: '16px 20px', marginBottom: '28px', textAlign: 'left' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#92400E', marginBottom: '8px' }}>⚠️ Before you start</p>
            <ul style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#78350F', lineHeight: 2, paddingLeft: '18px' }}>
              <li>Timer starts the moment you click Start</li>
              <li>You cannot pause or go back to previous questions</li>
              <li>Submit before time runs out</li>
            </ul>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button onClick={onClose}
              style={{ padding: '14px 28px', borderRadius: '12px', border: '1.5px solid #E5E7EB', background: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: '#374151', cursor: 'pointer' }}>
              Not now
            </button>
            <button onClick={startExam}
              style={{ padding: '14px 32px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>
              Start Exam →
            </button>
          </div>
        </>
      )}
    </div>
  )

  if (phase === 'results') return (
    <ResultsScreen questions={questions} answers={answers} term={term} timeTaken={timeTaken} onClose={onClose}/>
  )

  // Exam phase
  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '24px' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', background: 'white', borderRadius: '16px', padding: '12px 18px', border: '1.5px solid #F1F5F9' }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#374151' }}>Q{qIdx + 1} of {questions.length}</p>
          <div style={{ height: '4px', background: '#F1F5F9', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${((qIdx + 1) / questions.length) * 100}%`, background: '#1B4332', borderRadius: '2px', transition: 'width 0.3s' }}/>
          </div>
        </div>
        <Timer totalSecs={totalDurationMins * 60} onExpire={submitExam}/>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        {currentQ && (
          <motion.div key={currentQ.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            style={{ background: 'white', borderRadius: '20px', border: '1.5px solid #F1F5F9', padding: '24px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: SUBJECT_LABELS[currentQ.subject]?.color, background: SUBJECT_LABELS[currentQ.subject]?.color + '15', padding: '3px 10px', borderRadius: '20px' }}>
                {SUBJECT_LABELS[currentQ.subject]?.emoji} {SUBJECT_LABELS[currentQ.subject]?.label} · Ch {currentQ.chapterId}
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#94A3B8' }}>{currentQ.marks} mark{currentQ.marks > 1 ? 's' : ''}</span>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#1F2937', lineHeight: 1.7, marginBottom: '18px' }}>{currentQ.question}</p>

            {currentQ.type === 'mcq' && currentQ.options ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {currentQ.options.map(opt => (
                  <button key={opt.label} onClick={() => setAnswers(prev => ({ ...prev, [currentQ.id]: opt.label }))}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', border: `1.5px solid ${answers[currentQ.id] === opt.label ? '#1B4332' : '#E5E7EB'}`, background: answers[currentQ.id] === opt.label ? '#F0FDF4' : 'white', cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332', width: '20px', flexShrink: 0 }}>{opt.label}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151' }}>{opt.text}</span>
                  </button>
                ))}
              </div>
            ) : (
              <input type="text" value={answers[currentQ.id] ?? ''} onChange={e => setAnswers(prev => ({ ...prev, [currentQ.id]: e.target.value }))}
                placeholder="Type your answer…"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}/>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: '12px' }}>
        {qIdx < questions.length - 1 ? (
          <button onClick={() => setQIdx(i => i + 1)}
            disabled={!answers[currentQ?.id]}
            style={{ flex: 1, background: answers[currentQ?.id] ? 'linear-gradient(135deg,#1B4332,#2D6A4F)' : '#F1F5F9', color: answers[currentQ?.id] ? 'white' : '#94A3B8', border: 'none', borderRadius: '14px', padding: '16px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', cursor: answers[currentQ?.id] ? 'pointer' : 'not-allowed' }}>
            Next →
          </button>
        ) : (
          <button onClick={submitExam}
            style={{ flex: 1, background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', color: 'white', border: 'none', borderRadius: '14px', padding: '16px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>
            Submit Exam ✓
          </button>
        )}
      </div>
    </div>
  )
}
