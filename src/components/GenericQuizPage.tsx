'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'

export interface QuizTheme {
  primary: string; mid: string; accent: string; heroBg: string
}

export interface QuizConfig {
  subject: string
  dashboardSection: string
  subjectLabel: string
  chapterRoute: string
  theme: QuizTheme
  getQuizFn: (id: number) => any
  getChapterFn: (id: number) => any
}

type Phase = 'intro' | 'question' | 'feedback' | 'results'
interface Answer { questionId: number; given: string; correct: boolean; marksEarned: number }

function isCorrectMCQ(q: any, given: string) { return given.trim().toUpperCase() === q.answer.trim().toUpperCase() }
function isAutoCorrect(q: any) { return q.type === 'sentence' || q.type === 'long_answer' }
function scoreForAnswer(q: any, given: string) { return (q.type === 'mcq' || q.type === 'single_word') ? (isCorrectMCQ(q, given) ? q.marks : 0) : q.marks }
function partLabel(type: string) {
  if (type === 'mcq') return 'Part A — Multiple choice'
  if (type === 'single_word') return 'Part B — Single word'
  if (type === 'sentence') return 'Part C — Sentence'
  return 'Part D — Long answer'
}

const OPT_COLORS = ['#EEF2FF','#F0FDF4','#FFF7ED','#FDF4FF']
const OPT_BORDERS = ['#C7D2FE','#BBF7D0','#FED7AA','#E9D5FF']
const OPT_TEXT   = ['#3730A3','#166534','#9A3412','#7E22CE']

function IntroScreen({ chapter, quiz, theme, onStart }: { chapter: any; quiz: any; theme: QuizTheme; onStart: () => void }) {
  return (
    <div style={{ maxWidth: '540px', margin: '48px auto', padding: '0 24px', textAlign: 'center' }}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
        style={{ width: '80px', height: '80px', borderRadius: '50%', background: `${theme.accent}40`, border: `2px solid ${theme.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '36px' }}>
        🎯
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: theme.primary, marginBottom: '6px' }}>
        Ready for the quiz?
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
        style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#64748B', lineHeight: 1.7, marginBottom: '28px' }}>
        Assessment for <strong style={{ color: theme.primary }}>{chapter.title}</strong> · {quiz.totalMarks} marks total
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        style={{ background: 'white', borderRadius: '18px', border: '1.5px solid #E2E8F0', padding: '20px 24px', marginBottom: '20px', textAlign: 'left' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '14px' }}>Assessment overview</p>
        {[['Total marks', `${quiz.totalMarks} marks`], ['Questions', `${quiz.questions.length} questions`],
          ['Part A', '5 multiple choice (1 mark each)'], ['Part B', '5 single word answers (1 mark each)'],
          ['Part C', '5 sentence forming (2 marks each)'], ['Part D', '1 long answer (5 marks)']
        ].map(([l, v]) => (
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F8FAFC', gap: '12px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9CA3AF', flexShrink: 0 }}>{l}</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#374151', textAlign: 'right' }}>{v}</p>
          </div>
        ))}
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '12px', padding: '12px 16px', marginBottom: '24px', display: 'flex', gap: '10px', textAlign: 'left' }}>
        <span style={{ fontSize: '16px', flexShrink: 0 }}>💡</span>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#92400E', lineHeight: 1.6 }}>Parts C & D are reviewed by your teacher. Write your best attempt.</p>
      </motion.div>
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.03, boxShadow: `0 8px 24px ${theme.primary}40` }} whileTap={{ scale: 0.97 }}
        onClick={onStart}
        style={{ background: `linear-gradient(135deg,${theme.primary},${theme.mid})`, color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', padding: '14px 40px', borderRadius: '14px', border: 'none', cursor: 'pointer' }}>
        Let's go! →
      </motion.button>
    </div>
  )
}

function QuestionCard({ question, onSubmit, theme }: { question: any; onSubmit: (a: string) => void; theme: QuizTheme }) {
  const [selected, setSelected] = useState('')
  const [textVal,  setTextVal]  = useState('')
  const isSentence = question.type === 'sentence', isLong = question.type === 'long_answer'
  const canSubmit  = question.type === 'mcq' ? selected !== '' : question.type === 'single_word' ? textVal.trim().length > 0 : textVal.trim().split(/\s+/).length >= 3
  const wordCount  = textVal.trim().split(/\s+/).filter(Boolean).length
  const minWords   = isLong ? 60 : isSentence ? 5 : 0

  return (
    <div style={{ maxWidth: '680px', margin: '32px auto', padding: '0 24px' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ display: 'inline-block', background: `${theme.accent}30`, border: `1px solid ${theme.accent}`, borderRadius: '8px', padding: '4px 12px', marginBottom: '12px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: theme.primary, letterSpacing: '0.06em' }}>{partLabel(question.type)} · {question.marks} mark{question.marks > 1 ? 's' : ''}</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        style={{ background: 'white', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '26px 28px', marginBottom: '18px', boxShadow: `0 2px 12px ${theme.primary}08` }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '17px', color: theme.primary, lineHeight: 1.6 }}>{question.question}</p>
        {isAutoCorrect(question) && question.hint && (
          <div style={{ background: `${theme.accent}20`, borderRadius: '10px', padding: '10px 14px', marginTop: '14px', display: 'flex', gap: '8px' }}>
            <span style={{ fontSize: '14px' }}>💡</span>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: theme.mid, lineHeight: 1.6 }}>{question.hint}</p>
          </div>
        )}
      </motion.div>

      {question.type === 'mcq' && question.options && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {question.options.map((opt: any, i: number) => (
            <motion.button key={opt.label} onClick={() => setSelected(opt.label)}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.05 }}
              whileHover={{ x: 3 }} whileTap={{ scale: 0.99 }}
              style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', borderRadius: '14px', border: selected === opt.label ? `2px solid ${OPT_BORDERS[i%4]}` : '1.5px solid #F1F5F9', background: selected === opt.label ? OPT_COLORS[i%4] : 'white', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ width: '32px', height: '32px', minWidth: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: selected === opt.label ? OPT_BORDERS[i%4] : '#F8FAFC', flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: selected === opt.label ? OPT_TEXT[i%4] : '#94A3B8' }}>{opt.label}</span>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: selected === opt.label ? OPT_TEXT[i%4] : '#374151', lineHeight: 1.5 }}>{opt.text}</p>
            </motion.button>
          ))}
        </div>
      )}

      {question.type === 'single_word' && (
        <input type="text" value={textVal} onChange={e => setTextVal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && canSubmit && onSubmit(textVal.trim())}
          placeholder="Type your answer..."
          style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: `1.5px solid ${theme.accent}60`, fontFamily: 'var(--font-body)', fontSize: '15px', color: '#1F2937', outline: 'none', boxSizing: 'border-box', marginBottom: '20px', background: 'white' }}/>
      )}

      {(isSentence || isLong) && (
        <div style={{ marginBottom: '14px' }}>
          <textarea value={textVal} onChange={e => setTextVal(e.target.value)}
            placeholder={isLong ? 'Write your answer here (min. 60 words)...' : 'Write your sentence here...'}
            rows={isLong ? 8 : 4}
            style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', border: `1.5px solid ${theme.accent}60`, fontFamily: 'var(--font-body)', fontSize: '15px', color: '#1F2937', outline: 'none', resize: 'vertical', lineHeight: 1.8, boxSizing: 'border-box', background: 'white' }}/>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: wordCount >= minWords ? theme.primary : '#94A3B8', marginTop: '6px' }}>
            {wordCount} word{wordCount !== 1 ? 's' : ''}{minWords > 0 ? ` (min. ${minWords})` : ''}
          </p>
        </div>
      )}

      <motion.button onClick={() => { const ans = question.type === 'mcq' ? selected : textVal.trim(); if (ans) onSubmit(ans) }}
        disabled={!canSubmit} whileHover={canSubmit ? { scale: 1.02, boxShadow: `0 6px 20px ${theme.primary}30` } : {}} whileTap={canSubmit ? { scale: 0.97 } : {}}
        style={{ background: canSubmit ? `linear-gradient(135deg,${theme.primary},${theme.mid})` : '#E2E8F0', color: canSubmit ? 'white' : '#94A3B8', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', padding: '13px 30px', borderRadius: '12px', border: 'none', cursor: canSubmit ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}>
        Submit answer →
      </motion.button>
    </div>
  )
}

function FeedbackCard({ question, given, correct, marksEarned, onNext, isLast, theme }: { question: any; given: string; correct: boolean; marksEarned: number; onNext: () => void; isLast: boolean; theme: QuizTheme }) {
  const auto  = isAutoCorrect(question)
  const color = auto ? theme.primary : correct ? '#166534' : '#991B1B'
  const bg    = auto ? `${theme.accent}20` : correct ? '#F0FDF4' : '#FEF2F2'
  const border= auto ? theme.accent : correct ? '#86EFAC' : '#FCA5A5'
  return (
    <div style={{ maxWidth: '680px', margin: '32px auto', padding: '0 24px' }}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}
        style={{ background: bg, borderRadius: '16px', border: `1.5px solid ${border}`, padding: '18px 22px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <span style={{ fontSize: '28px', flexShrink: 0 }}>{auto ? '✍️' : correct ? '✅' : '❌'}</span>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color, marginBottom: '2px' }}>{auto ? 'Answer recorded!' : correct ? 'Correct! 🎉' : 'Not quite!'}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color, opacity: 0.75 }}>
            {auto ? `${marksEarned} mark${marksEarned !== 1 ? 's' : ''} awarded.` : correct ? `${marksEarned} mark${marksEarned !== 1 ? 's' : ''} earned!` : 'Correct answer shown below.'}
          </p>
        </div>
        <div style={{ background: 'white', borderRadius: '10px', padding: '8px 14px', flexShrink: 0, border: `1px solid ${border}` }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '16px', color }}>{marksEarned}/{question.marks}</p>
        </div>
      </motion.div>

      {[
        { show: true,            label:'Your answer',   content: given,        bg:'white',   border:'#E2E8F0' },
        { show: !auto && !correct, label:'Correct answer', content: question.type === 'mcq' && question.options ? question.options.find((o: any) => o.label === question.answer)?.text || question.answer : question.answer, bg:'#F0FDF4', border:'#BBF7D0' },
        { show: auto,            label:'Sample answer', content: question.answer, bg:`${theme.accent}15`, border:theme.accent },
        { show: true,            label: auto ? 'How to approach this' : correct ? 'Why this is correct' : "Let's revisit this", content: question.reexplanation, bg:'white', border:'#E2E8F0' },
      ].filter(row => row.show).map((row, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i }}
          style={{ background: row.bg, borderRadius: '14px', border: `1.5px solid ${row.border}`, padding: '18px 22px', marginBottom: '12px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>{row.label}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', lineHeight: 1.8 }}>{row.content}</p>
        </motion.div>
      ))}

      <motion.button onClick={onNext} whileHover={{ scale: 1.02, boxShadow: `0 6px 20px ${theme.primary}30` }} whileTap={{ scale: 0.97 }}
        style={{ background: `linear-gradient(135deg,${theme.primary},${theme.mid})`, color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', padding: '13px 30px', borderRadius: '12px', border: 'none', cursor: 'pointer', marginTop: '8px' }}>
        {isLast ? '📊 See my results' : 'Next question →'}
      </motion.button>
    </div>
  )
}

function ResultsScreen({ chapterId, chapter, answers, quiz, theme, config, onRetry, onBack }: any) {
  const score = answers.reduce((s: number, a: Answer) => s + a.marksEarned, 0)
  const pct   = Math.round((score / quiz.totalMarks) * 100)
  const grade = pct >= 80 ? { label:'Excellent!',  emoji:'🌟', color: theme.primary, bg:`${theme.accent}30`, border: theme.accent }
              : pct >= 60 ? { label:'Good job!',   emoji:'👍', color:'#D97706', bg:'#FEF3C7', border:'#FDE68A' }
              : { label:'Keep going!', emoji:'💪', color:'#DC2626', bg:'#FEF2F2', border:'#FCA5A5' }
  const partScores = [
    { label:'Part A — MCQ', type:'mcq', max:5, color:'#4338CA' },
    { label:'Part B — Single word', type:'single_word', max:5, color:'#166534' },
    { label:'Part C — Sentences', type:'sentence', max:10, color:'#9A3412' },
    { label:'Part D — Long answer', type:'long_answer', max:5, color:'#7E22CE' },
  ].map(p => ({ ...p, earned: answers.filter((a: Answer) => quiz.questions.find((q: any) => q.id === a.questionId)?.type === p.type).reduce((s: number, a: Answer) => s + a.marksEarned, 0) }))

  return (
    <div style={{ maxWidth: '560px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} style={{ fontSize: '52px', marginBottom: '16px' }}>{grade.emoji}</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: theme.primary, marginBottom: '6px' }}>{grade.label}</motion.h1>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
          style={{ display: 'inline-block', background: grade.bg, border: `2px solid ${grade.border}`, borderRadius: '20px', padding: '12px 28px', margin: '12px 0' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '36px', color: grade.color, lineHeight: 1 }}>{score}/{quiz.totalMarks}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: grade.color, opacity: 0.75, marginTop: '2px' }}>{pct}% · {chapter.title}</p>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        style={{ background: 'white', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '22px 24px', marginBottom: '16px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '16px' }}>Score breakdown</p>
        {partScores.map((p, i) => (
          <div key={p.type} style={{ marginBottom: i < 3 ? '14px' : '0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151' }}>{p.label}</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: p.color }}>{p.earned}/{p.max}</p>
            </div>
            <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${(p.earned/p.max)*100}%` }} transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                style={{ height: '100%', background: p.color, borderRadius: '3px', opacity: p.earned === p.max ? 1 : 0.65 }}/>
            </div>
          </div>
        ))}
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        style={{ background: '#FFF7ED', borderRadius: '14px', border: '1px solid #FED7AA', padding: '14px 18px', marginBottom: '24px', display: 'flex', gap: '10px' }}>
        <span style={{ fontSize: '16px', flexShrink: 0 }}>📝</span>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#92400E', lineHeight: 1.6 }}>Parts C & D are reviewed by your teacher. Final marks will be updated once reviewed.</p>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} style={{ display: 'flex', gap: '12px' }}>
        <motion.button onClick={onBack} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          style={{ flex: 1, background: 'white', color: theme.primary, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', padding: '13px 20px', borderRadius: '12px', border: `1.5px solid ${theme.accent}`, cursor: 'pointer' }}>
          ← Back to {config.subjectLabel}
        </motion.button>
        <motion.button onClick={onRetry} whileHover={{ scale: 1.02, boxShadow: `0 6px 20px ${theme.primary}30` }} whileTap={{ scale: 0.97 }}
          style={{ flex: 1, background: `linear-gradient(135deg,${theme.primary},${theme.mid})`, color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', padding: '13px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
          Try again
        </motion.button>
      </motion.div>
    </div>
  )
}

export default function GenericQuizPage({ config }: { config: QuizConfig }) {
  const params    = useParams()
  const router    = useRouter()
  const chapterId = Number(params.id)
  const quiz      = config.getQuizFn(chapterId)
  const chapter   = config.getChapterFn(chapterId)

  const [phase,           setPhase]           = useState<Phase>('intro')
  const [questionIdx,     setQuestionIdx]     = useState(0)
  const [answers,         setAnswers]         = useState<Answer[]>([])
  const [currentFeedback, setCurrentFeedback] = useState<{ given: string; correct: boolean; marksEarned: number } | null>(null)
  const [studentId,       setStudentId]       = useState('')

  useEffect(() => {
    const init = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setStudentId(user.id)
    }
    init()
  }, [router])

  if (!quiz || !chapter) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <p style={{ fontFamily: 'var(--font-body)', color: '#94A3B8' }}>Quiz not found.</p>
    </div>
  )

  const questions = quiz.questions
  const currentQ  = questions[questionIdx]
  const isLast    = questionIdx === questions.length - 1
  const score     = answers.reduce((s, a) => s + a.marksEarned, 0)
  const pct       = Math.round((score / quiz.totalMarks) * 100)

  const handleSubmit = (given: string) => {
    const correct = isAutoCorrect(currentQ) ? true : isCorrectMCQ(currentQ, given)
    setCurrentFeedback({ given, correct, marksEarned: scoreForAnswer(currentQ, given) })
    setPhase('feedback')
  }

  const handleNext = () => {
    if (!currentFeedback) return
    const newAnswers = [...answers, { questionId: currentQ.id, given: currentFeedback.given, correct: currentFeedback.correct, marksEarned: currentFeedback.marksEarned }]
    setAnswers(newAnswers)
    setCurrentFeedback(null)
    if (isLast) {
      const total = newAnswers.reduce((s, a) => s + a.marksEarned, 0)
      const pct   = Math.round((total / quiz.totalMarks) * 100)
      createClient().from('student_quiz_attempts').insert({ student_id: studentId, chapter_id: chapterId, subject: config.subject, score: pct, marks_earned: total, total_marks: quiz.totalMarks, answers: JSON.stringify(newAnswers), created_at: new Date().toISOString() })
      setPhase('results')
    } else { setQuestionIdx(i => i + 1); setPhase('question') }
  }

  const TopBar = () => (
    <div style={{ background: `linear-gradient(135deg,${config.theme.primary},${config.theme.mid})`, position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button onClick={() => router.push(`/student/dashboard?section=${config.dashboardSection}`)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontSize: '13px' }}>{config.subjectLabel}</button>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white' }}>{chapter.title} — Quiz</p>
        </div>
        {(phase === 'question' || phase === 'feedback') && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Q{Math.min(questionIdx+1, questions.length)}/{questions.length}</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: config.theme.accent }}>{score}/{quiz.totalMarks}</p>
          </div>
        )}
      </div>
      {(phase === 'question' || phase === 'feedback') && (
        <div style={{ height: '3px', background: 'rgba(255,255,255,0.1)' }}>
          <motion.div animate={{ width: `${(questionIdx/questions.length)*100}%` }} style={{ height: '100%', background: config.theme.accent }}/>
        </div>
      )}
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: config.theme.heroBg }}>
      <style>{`* { box-sizing: border-box; } textarea, input { font-family: var(--font-body) !important; }`}</style>
      <TopBar/>
      <AnimatePresence mode="wait">
        {phase === 'intro'    && <motion.div key="intro"   initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><IntroScreen chapter={chapter} quiz={quiz} theme={config.theme} onStart={() => setPhase('question')}/></motion.div>}
        {phase === 'question' && currentQ && <motion.div key={`q-${questionIdx}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}><QuestionCard question={currentQ} onSubmit={handleSubmit} theme={config.theme}/></motion.div>}
        {phase === 'feedback' && currentQ && currentFeedback && <motion.div key={`f-${questionIdx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><FeedbackCard question={currentQ} given={currentFeedback.given} correct={currentFeedback.correct} marksEarned={currentFeedback.marksEarned} onNext={handleNext} isLast={isLast} theme={config.theme}/></motion.div>}
        {phase === 'results'  && <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><ResultsScreen chapterId={chapterId} chapter={chapter} answers={answers} quiz={quiz} theme={config.theme} config={config} onRetry={() => { setPhase('intro'); setQuestionIdx(0); setAnswers([]); setCurrentFeedback(null) }} onBack={() => router.push(`/student/dashboard?section=${config.dashboardSection}`)}/></motion.div>}
      </AnimatePresence>
    </div>
  )
}
