'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getSktQuiz, type Question } from '@/lib/skt-quiz-content'
import { getChapter } from '@/lib/ict-chapter-content'

// ── Types ─────────────────────────────────────────────────────────────────────

type Phase = 'intro' | 'question' | 'feedback' | 'results'

interface Answer {
  questionId: number
  given: string
  correct: boolean
  marksEarned: number
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function partLabel(type: Question['type']) {
  if (type === 'mcq')         return 'Part A — Multiple choice'
  if (type === 'single_word') return 'Part B — Single word answer'
  if (type === 'sentence')    return 'Part C — Sentence forming'
  return 'Part D — Long answer'
}

function markLabel(q: Question) {
  return q.marks === 1 ? '1 mark' : `${q.marks} marks`
}

function isCorrectMCQ(q: Question, given: string) {
  return given.trim().toUpperCase() === q.answer.trim().toUpperCase()
}

function scoreForAnswer(q: Question, given: string): number {
  if (q.type === 'mcq' || q.type === 'single_word') {
    return isCorrectMCQ(q, given) ? q.marks : 0
  }
  // Sentence and long answer: auto-full marks (teacher/AI reviews later)
  // For MVP we give full marks and flag for review
  return q.marks
}

function isAutoCorrect(q: Question): boolean {
  return q.type === 'sentence' || q.type === 'long_answer'
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ProgressBar({ current, total, score, maxScore }: { current: number; total: number; score: number; maxScore: number }) {
  return (
    <div style={{ background: '#1B4332', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
            Question {Math.min(current + 1, total)} of {total}
          </p>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#74C69D' }}>
            {score} / {maxScore} marks
          </p>
        </div>
        <div style={{ height: '5px', background: 'rgba(255,255,255,0.15)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(current / total) * 100}%`, background: '#74C69D', borderRadius: '3px', transition: 'width 0.4s ease' }}/>
        </div>
      </div>
    </div>
  )
}

function IntroScreen({ chapterTitle, totalMarks, questionCount, onStart }: {
  chapterTitle: string; totalMarks: number; questionCount: number; onStart: () => void
}) {
  return (
    <div style={{ maxWidth: '560px', margin: '60px auto', padding: '0 24px', textAlign: 'center' }}>
      <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#D8F3DC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '32px' }}>
        🎯
      </div>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', color: '#1B4332', marginBottom: '8px' }}>
        Ready for the quiz?
      </h1>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7280', lineHeight: 1.7, marginBottom: '28px' }}>
        You are about to take the assessment for <strong style={{ color: '#1B4332' }}>{chapterTitle}</strong>.
      </p>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px 24px', marginBottom: '28px', textAlign: 'left' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '14px' }}>Assessment overview</p>
        {[
          ['Total marks', `${totalMarks} marks`],
          ['Questions', `${questionCount} questions`],
          ['Part A', '5 multiple choice questions (1 mark each)'],
          ['Part B', '5 single word answers (1 mark each)'],
          ['Part C', '5 sentence forming questions (2 marks each)'],
          ['Part D', '1 long answer question (5 marks)'],
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '8px 0', borderBottom: '1px solid #F9FAFB', gap: '12px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9CA3AF', flexShrink: 0 }}>{label}</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#374151', textAlign: 'right' }}>{value}</p>
          </div>
        ))}
      </div>

      <div style={{ background: '#FEF3C7', borderRadius: '12px', border: '1px solid #FDE68A', padding: '14px 18px', marginBottom: '24px', display: 'flex', gap: '10px', alignItems: 'flex-start', textAlign: 'left' }}>
        <span style={{ fontSize: '18px', flexShrink: 0 }}>💡</span>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#92400E', lineHeight: 1.6 }}>
          For sentence and long answer questions, write your best attempt in your own words. These will be reviewed and marks awarded accordingly.
        </p>
      </div>

      <button
        onClick={onStart}
        style={{ background: '#2D6A4F', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', padding: '14px 36px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        Start the quiz →
      </button>
    </div>
  )
}

function QuestionCard({ question, questionIndex, totalQuestions, onSubmit }: {
  question: Question
  questionIndex: number
  totalQuestions: number
  onSubmit: (answer: string) => void
}) {
  const [selected, setSelected]   = useState('')
  const [textValue, setTextValue] = useState('')

  const canSubmit = question.type === 'mcq'
    ? selected !== ''
    : question.type === 'single_word'
    ? textValue.trim().length > 0
    : textValue.trim().split(/\s+/).length >= 3

  const handleSubmit = () => {
    const ans = question.type === 'mcq' ? selected : textValue.trim()
    if (!ans) return
    onSubmit(ans)
  }

  const isSentence  = question.type === 'sentence'
  const isLong      = question.type === 'long_answer'
  const minWords    = isLong ? 60 : isSentence ? 5 : 0
  const wordCount   = textValue.trim().split(/\s+/).filter(Boolean).length

  return (
    <div style={{ maxWidth: '680px', margin: '32px auto', padding: '0 24px' }}>
      {/* Part label */}
      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>
        {partLabel(question.type)} · {markLabel(question)}
      </p>

      {/* Question */}
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px 28px', marginBottom: '20px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '17px', color: '#1B4332', lineHeight: 1.55, marginBottom: isAutoCorrect(question) && question.hint ? '16px' : '0' }}>
          {question.question}
        </p>
        {isAutoCorrect(question) && question.hint && (
          <div style={{ background: '#F0FDF4', borderRadius: '10px', padding: '12px 16px', marginTop: '12px', display: 'flex', gap: '8px' }}>
            <span style={{ fontSize: '14px', flexShrink: 0 }}>💡</span>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#2D6A4F', lineHeight: 1.6 }}>{question.hint}</p>
          </div>
        )}
      </div>

      {/* MCQ options */}
      {question.type === 'mcq' && question.options && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {question.options.map(opt => (
            <button
              key={opt.label}
              onClick={() => setSelected(opt.label)}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px',
                borderRadius: '12px', border: selected === opt.label ? '2px solid #2D6A4F' : '1.5px solid #E5E7EB',
                background: selected === opt.label ? '#F0FDF4' : 'white',
                cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
              }}
            >
              <div style={{ width: '30px', height: '30px', minWidth: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: selected === opt.label ? '#2D6A4F' : '#F3F4F6', flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: selected === opt.label ? 'white' : '#9CA3AF' }}>{opt.label}</span>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: selected === opt.label ? '#1B4332' : '#374151', lineHeight: 1.5 }}>{opt.text}</p>
            </button>
          ))}
        </div>
      )}

      {/* Single word input */}
      {question.type === 'single_word' && (
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={textValue}
            onChange={e => setTextValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && canSubmit && handleSubmit()}
            placeholder="Type your answer here..."
            style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-body)', fontSize: '15px', color: '#374151', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
      )}

      {/* Sentence / long answer textarea */}
      {(isSentence || isLong) && (
        <div style={{ marginBottom: '12px' }}>
          <textarea
            value={textValue}
            onChange={e => setTextValue(e.target.value)}
            placeholder={isLong ? 'Write your answer here (minimum 60 words)...' : 'Write your sentence here...'}
            rows={isLong ? 8 : 3}
            style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-body)', fontSize: '15px', color: '#374151', outline: 'none', resize: 'vertical', lineHeight: 1.7, boxSizing: 'border-box' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: wordCount >= minWords ? '#2D6A4F' : '#9CA3AF' }}>
              {wordCount} word{wordCount !== 1 ? 's' : ''}{minWords > 0 ? ` (minimum ${minWords})` : ''}
            </p>
            {question.type === 'long_answer' && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>
                Reviewed by teacher
              </p>
            )}
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        style={{
          background: canSubmit ? '#2D6A4F' : '#E5E7EB',
          color: canSubmit ? 'white' : '#9CA3AF',
          fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px',
          padding: '13px 28px', borderRadius: '10px', border: 'none',
          cursor: canSubmit ? 'pointer' : 'not-allowed', transition: 'all 0.15s',
        }}
        onMouseEnter={e => { if (canSubmit) e.currentTarget.style.opacity = '0.88' }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
      >
        Submit answer →
      </button>
    </div>
  )
}

function FeedbackCard({ question, given, correct, marksEarned, onNext, isLast }: {
  question: Question; given: string; correct: boolean; marksEarned: number
  onNext: () => void; isLast: boolean
}) {
  const auto = isAutoCorrect(question)

  return (
    <div style={{ maxWidth: '680px', margin: '32px auto', padding: '0 24px' }}>
      {/* Result banner */}
      <div style={{
        background: auto ? '#F0FDF4' : correct ? '#F0FDF4' : '#FEF2F2',
        borderRadius: '14px',
        border: `1.5px solid ${auto ? '#74C69D' : correct ? '#74C69D' : '#FCA5A5'}`,
        padding: '18px 22px', marginBottom: '16px',
        display: 'flex', alignItems: 'center', gap: '14px',
      }}>
        <span style={{ fontSize: '24px', flexShrink: 0 }}>{auto ? '✍️' : correct ? '✅' : '❌'}</span>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', color: auto ? '#1B4332' : correct ? '#1B4332' : '#991B1B', marginBottom: '2px' }}>
            {auto ? 'Answer recorded!' : correct ? 'Correct!' : 'Not quite!'}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: auto ? '#2D6A4F' : correct ? '#2D6A4F' : '#DC2626' }}>
            {auto ? `Your answer has been saved. ${marksEarned} mark${marksEarned !== 1 ? 's' : ''} awarded.` : correct ? `Well done — ${marksEarned} mark${marksEarned !== 1 ? 's' : ''} earned!` : `The correct answer is shown below.`}
          </p>
        </div>
        <div style={{ background: auto ? '#D8F3DC' : correct ? '#D8F3DC' : '#FEE2E2', borderRadius: '8px', padding: '6px 12px', flexShrink: 0 }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: auto ? '#1B4332' : correct ? '#1B4332' : '#991B1B' }}>
            {marksEarned}/{question.marks}
          </p>
        </div>
      </div>

      {/* Your answer */}
      <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '18px 22px', marginBottom: '12px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Your answer</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', lineHeight: 1.7 }}>{given}</p>
      </div>

      {/* Correct answer (for MCQ/single word wrong) */}
      {!auto && !correct && (
        <div style={{ background: '#F0FDF4', borderRadius: '14px', border: '1px solid #D8F3DC', padding: '18px 22px', marginBottom: '12px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#40916C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Correct answer</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1B4332', lineHeight: 1.7, fontWeight: 600 }}>
            {question.type === 'mcq' && question.options
              ? question.options.find(o => o.label === question.answer)?.text || question.answer
              : question.answer}
          </p>
        </div>
      )}

      {/* Sample answer for sentence/long answer */}
      {auto && (
        <div style={{ background: '#F0FDF4', borderRadius: '14px', border: '1px solid #D8F3DC', padding: '18px 22px', marginBottom: '12px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#40916C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Sample answer</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1B4332', lineHeight: 1.7 }}>{question.answer}</p>
        </div>
      )}

      {/* Re-explanation */}
      <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '18px 22px', marginBottom: '24px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
          {auto ? 'How to approach this' : correct ? 'Why this is correct' : 'Let us revisit this'}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', lineHeight: 1.75 }}>{question.reexplanation}</p>
      </div>

      {/* Next */}
      <button
        onClick={onNext}
        style={{ background: '#2D6A4F', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', padding: '13px 28px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        {isLast ? '📊 See my results' : 'Next question →'}
      </button>
    </div>
  )
}

function ResultsScreen({ chapterId, chapterTitle, answers, questions, totalMarks, onRetry, onBack }: {
  chapterId: number; chapterTitle: string; answers: Answer[]
  questions: Question[]; totalMarks: number; onRetry: () => void; onBack: () => void
}) {
  const score = answers.reduce((sum, a) => sum + a.marksEarned, 0)
  const pct   = Math.round((score / totalMarks) * 100)
  const correct = answers.filter(a => a.correct).length

  const grade = pct >= 80 ? { label: 'Excellent!', color: '#10B981', bg: '#D1FAE5', emoji: '🌟' }
               : pct >= 60 ? { label: 'Good job!',  color: '#F59E0B', bg: '#FEF3C7', emoji: '👍' }
               : { label: 'Keep going!', color: '#EF4444', bg: '#FEE2E2', emoji: '💪' }

  const partScores = [
    { label: 'Part A — MCQ',              type: 'mcq',          max: 5  },
    { label: 'Part B — Single word',      type: 'single_word',  max: 5  },
    { label: 'Part C — Sentence forming', type: 'sentence',     max: 10 },
    { label: 'Part D — Long answer',      type: 'long_answer',  max: 5  },
  ].map(p => ({
    ...p,
    earned: answers.filter(a => questions.find(q => q.id === a.questionId)?.type === p.type)
                   .reduce((s, a) => s + a.marksEarned, 0),
  }))

  return (
    <div style={{ maxWidth: '580px', margin: '40px auto', padding: '0 24px' }}>
      {/* Score circle */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ width: '110px', height: '110px', borderRadius: '50%', background: grade.bg, border: `4px solid ${grade.color}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: grade.color, lineHeight: 1 }}>{score}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: grade.color }}>/ {totalMarks}</p>
        </div>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '22px', color: '#1B4332', marginBottom: '4px' }}>
          {grade.emoji} {grade.label}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>
          {pct}% · {correct} of {questions.filter(q => q.type === 'mcq' || q.type === 'single_word').length} objective questions correct
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9CA3AF', marginTop: '4px' }}>
          {chapterTitle}
        </p>
      </div>

      {/* Part breakdown */}
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px 24px', marginBottom: '20px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '14px' }}>
          Score breakdown
        </p>
        {partScores.map((p, i) => (
          <div key={p.type} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < 3 ? '1px solid #F9FAFB' : 'none' }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', marginBottom: '4px' }}>{p.label}</p>
              <div style={{ height: '5px', background: '#E5E7EB', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(p.earned / p.max) * 100}%`, background: p.earned === p.max ? '#10B981' : p.earned > 0 ? '#F59E0B' : '#EF4444', borderRadius: '3px', transition: 'width 0.6s ease' }}/>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', minWidth: '48px', textAlign: 'right' }}>{p.earned}/{p.max}</p>
          </div>
        ))}
      </div>

      {/* Note for auto-marked */}
      <div style={{ background: '#FEF3C7', borderRadius: '12px', border: '1px solid #FDE68A', padding: '14px 18px', marginBottom: '24px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '16px', flexShrink: 0 }}>📝</span>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#92400E', lineHeight: 1.6 }}>
          Part C and Part D answers are reviewed by your teacher. Final marks for those sections will be updated once reviewed.
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={onBack}
          style={{ flex: 1, background: 'white', color: '#2D6A4F', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', padding: '13px 20px', borderRadius: '10px', border: '1.5px solid #2D6A4F', cursor: 'pointer' }}
        >
          ← Back to English
        </button>
        <button
          onClick={onRetry}
          style={{ flex: 1, background: '#2D6A4F', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', padding: '13px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}
        >
          Try again
        </button>
      </div>
    </div>
  )
}

// ── Main quiz page ─────────────────────────────────────────────────────────────

export default function QuizPage() {
  const params    = useParams()
  const router    = useRouter()
  const chapterId = Number(params.id)

  const quiz    = getSktQuiz(chapterId)
  const chapter = getChapter(chapterId)

  const [phase,        setPhase]        = useState<Phase>('intro')
  const [questionIdx,  setQuestionIdx]  = useState(0)
  const [answers,      setAnswers]      = useState<Answer[]>([])
  const [currentFeedback, setCurrentFeedback] = useState<{ given: string; correct: boolean; marksEarned: number } | null>(null)
  const [studentId,    setStudentId]    = useState('')

  useEffect(() => {
    const init = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setStudentId(user.id)
    }
    init()
  }, [router])

  const saveResult = async (finalAnswers: Answer[]) => {
    if (!studentId || !quiz) return
    const supabase  = createClient()
    const total     = finalAnswers.reduce((s, a) => s + a.marksEarned, 0)
    const pct       = Math.round((total / quiz.totalMarks) * 100)
    await supabase.from('student_quiz_attempts').insert({
      student_id:    studentId,
      chapter_id:    chapterId,
      subject:       'sanskrit',
      score:         pct,
      marks_earned:  total,
      total_marks:   quiz.totalMarks,
      answers:       JSON.stringify(finalAnswers),
      created_at:    new Date().toISOString(),
    })
  }

  if (!quiz || !chapter) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <p style={{ fontFamily: 'var(--font-body)', color: '#9CA3AF' }}>Quiz not found.</p>
    </div>
  )

  const questions = quiz.questions
  const currentQ  = questions[questionIdx]
  const isLast    = questionIdx === questions.length - 1

  const handleSubmitAnswer = (given: string) => {
    const correct     = isAutoCorrect(currentQ) ? true : isCorrectMCQ(currentQ, given)
    const marksEarned = scoreForAnswer(currentQ, given)
    const fb = { given, correct, marksEarned }
    setCurrentFeedback(fb)
    setPhase('feedback')
  }

  const handleNext = () => {
    if (!currentFeedback) return
    const newAnswers = [...answers, { questionId: currentQ.id, given: currentFeedback.given, correct: currentFeedback.correct, marksEarned: currentFeedback.marksEarned }]
    setAnswers(newAnswers)
    setCurrentFeedback(null)

    if (isLast) {
      saveResult(newAnswers)
      setPhase('results')
    } else {
      setQuestionIdx(i => i + 1)
      setPhase('question')
    }
  }

  const handleRetry = () => {
    setPhase('intro')
    setQuestionIdx(0)
    setAnswers([])
    setCurrentFeedback(null)
  }

  const score = answers.reduce((s, a) => s + a.marksEarned, 0)

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAF9' }}>
      <style>{`* { box-sizing: border-box; } textarea, input { font-family: var(--font-body) !important; }`}</style>

      {/* Top bar */}
      <div style={{ background: '#1B4332', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: '6px', position: 'sticky', top: 0, zIndex: 100 }}>
        <button onClick={() => router.push('/student/dashboard?section=sanskrit')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontSize: '13px', padding: '4px 8px' }}>
          Dashboard
        </button>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>›</span>
        <button onClick={() => router.push('/student/dashboard?section=sanskrit')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontSize: '13px', padding: '4px 8px' }}>
          English
        </button>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>›</span>
        <button onClick={() => router.push(`/student/skt-chapter/${chapterId}`)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontSize: '13px', padding: '4px 8px' }}>
          {chapter.title}
        </button>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>›</span>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white' }}>Quiz</p>
      </div>

      {/* Progress bar (only during question/feedback) */}
      {(phase === 'question' || phase === 'feedback') && (
        <ProgressBar current={questionIdx} total={questions.length} score={score} maxScore={quiz.totalMarks} />
      )}

      {/* Content */}
      {phase === 'intro' && (
        <IntroScreen
          chapterTitle={chapter.title}
          totalMarks={quiz.totalMarks}
          questionCount={questions.length}
          onStart={() => setPhase('question')}
        />
      )}

      {phase === 'question' && currentQ && (
        <QuestionCard
          question={currentQ}
          questionIndex={questionIdx}
          totalQuestions={questions.length}
          onSubmit={handleSubmitAnswer}
        />
      )}

      {phase === 'feedback' && currentQ && currentFeedback && (
        <FeedbackCard
          question={currentQ}
          given={currentFeedback.given}
          correct={currentFeedback.correct}
          marksEarned={currentFeedback.marksEarned}
          onNext={handleNext}
          isLast={isLast}
        />
      )}

      {phase === 'results' && (
        <ResultsScreen
          chapterId={chapterId}
          chapterTitle={chapter.title}
          answers={answers}
          questions={questions}
          totalMarks={quiz.totalMarks}
          onRetry={handleRetry}
          onBack={() => router.push('/student/dashboard?section=sanskrit')}
        />
      )}
    </div>
  )
}
