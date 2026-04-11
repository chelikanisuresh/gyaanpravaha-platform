'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface ClassQuestion {
  id: string
  chapter_id: number
  chapter_title: string
  question: string
  model_answer: string
}

interface Attempt {
  question_id: string
  answer: string
}

interface Props {
  subject: string
  studentId: string
}

// ── Single question card ──────────────────────────────────────────────────────

function QuestionCard({
  question,
  attempt,
  onSubmit,
}: {
  question: ClassQuestion
  attempt: Attempt | undefined
  onSubmit: (questionId: string, answer: string) => Promise<void>
}) {
  const [answer,      setAnswer]      = useState(attempt?.answer || '')
  const [showAnswer,  setShowAnswer]  = useState(!!attempt)
  const [submitting,  setSubmitting]  = useState(false)
  const [submitted,   setSubmitted]   = useState(!!attempt)

  const handleSubmit = async () => {
    if (!answer.trim()) return
    setSubmitting(true)
    await onSubmit(question.id, answer.trim())
    setSubmitted(true)
    setShowAnswer(true)
    setSubmitting(false)
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      border: submitted ? '1px solid #D8F3DC' : '1px solid #E5E7EB',
      padding: '22px 24px',
      transition: 'border-color 0.2s',
    }}>
      {/* Chapter tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{
          background: '#F3F4F6', color: '#6B7280',
          fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px',
          padding: '3px 10px', borderRadius: '10px',
        }}>
          Ch {question.chapter_id}: {question.chapter_title}
        </span>
        {submitted && (
          <span style={{
            background: '#D8F3DC', color: '#1B4332',
            fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px',
            padding: '3px 10px', borderRadius: '10px',
          }}>
            ✓ Answered
          </span>
        )}
      </div>

      {/* Question text */}
      <p style={{
        fontFamily: 'var(--font-heading)', fontWeight: 700,
        fontSize: '15px', color: '#1B4332', lineHeight: 1.6, marginBottom: '16px',
      }}>
        {question.question}
      </p>

      {/* Answer textarea — always visible so student can read what they wrote */}
      <textarea
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        disabled={submitted}
        placeholder="Write your answer here..."
        rows={4}
        style={{
          width: '100%', padding: '12px 14px',
          borderRadius: '10px',
          border: submitted ? '1px solid #D8F3DC' : '1px solid #E5E7EB',
          fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151',
          resize: 'vertical', outline: 'none', boxSizing: 'border-box',
          background: submitted ? '#F8FAF9' : 'white',
          lineHeight: 1.6,
        }}
      />

      {/* Submit button */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={submitting || !answer.trim()}
          style={{
            marginTop: '12px',
            padding: '10px 24px', borderRadius: '10px', border: 'none',
            background: !answer.trim() || submitting ? '#E5E7EB' : '#1B4332',
            color: !answer.trim() || submitting ? '#9CA3AF' : 'white',
            fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px',
            cursor: !answer.trim() || submitting ? 'not-allowed' : 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {submitting ? 'Submitting...' : '✓ Submit Answer'}
        </button>
      )}

      {/* Model answer — revealed after submit */}
      {submitted && (
        <div style={{ marginTop: '16px' }}>
          <button
            onClick={() => setShowAnswer(v => !v)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px',
              fontFamily: 'var(--font-heading)', fontWeight: 700,
              fontSize: '13px', color: '#2D6A4F', padding: '0',
              marginBottom: showAnswer ? '10px' : '0',
            }}
          >
            <span style={{ fontSize: '14px' }}>{showAnswer ? '▾' : '▸'}</span>
            {showAnswer ? 'Hide model answer' : 'Show model answer'}
          </button>

          {showAnswer && (
            <div style={{
              background: '#F0FDF4', borderRadius: '12px',
              padding: '16px 18px', borderLeft: '3px solid #52B788',
            }}>
              <p style={{
                fontFamily: 'var(--font-heading)', fontWeight: 700,
                fontSize: '11px', color: '#2D6A4F', marginBottom: '8px',
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                📖 Model Answer
              </p>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '14px',
                color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-wrap',
              }}>
                {question.model_answer}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main widget ───────────────────────────────────────────────────────────────

export default function ClassQuestionsWidget({ subject, studentId }: Props) {
  const [questions,  setQuestions]  = useState<ClassQuestion[]>([])
  const [attempts,   setAttempts]   = useState<Attempt[]>([])
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()

      // Fetch active questions for this subject
      const { data: qs } = await supabase
        .from('class_questions')
        .select('id, chapter_id, chapter_title, question, model_answer')
        .eq('subject', subject)
        .eq('is_active', true)
        .order('created_at', { ascending: true })

      if (!qs?.length) { setLoading(false); return }
      setQuestions(qs)

      // Fetch this student's existing attempts
      const questionIds = qs.map((q: ClassQuestion) => q.id)
      const { data: att } = await supabase
        .from('class_question_attempts')
        .select('question_id, answer')
        .eq('student_id', studentId)
        .in('question_id', questionIds)

      setAttempts((att || []).map((a: any) => ({ question_id: a.question_id, answer: a.answer })))
      setLoading(false)
    }
    load()
  }, [subject, studentId])

  const handleSubmit = async (questionId: string, answer: string) => {
    const supabase = createClient()
    await supabase.from('class_question_attempts').upsert({
      student_id:   studentId,
      question_id:  questionId,
      answer,
      submitted_at: new Date().toISOString(),
    }, { onConflict: 'student_id,question_id' })

    setAttempts(prev => {
      const existing = prev.find(a => a.question_id === questionId)
      if (existing) return prev.map(a => a.question_id === questionId ? { ...a, answer } : a)
      return [...prev, { question_id: questionId, answer }]
    })
  }

  // Don't render at all if no questions
  if (loading || questions.length === 0) return null

  const answeredCount = attempts.length
  const totalCount    = questions.length

  return (
    <div style={{ marginTop: '32px' }}>

      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-heading)', fontWeight: 900,
            fontSize: '18px', color: '#1B4332', marginBottom: '2px',
          }}>
            📝 Class Questions
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7280' }}>
            Questions from your teacher — write your answer, then check the model answer.
          </p>
        </div>

        {/* Progress pill */}
        <div style={{
          background: answeredCount === totalCount ? '#D8F3DC' : '#F3F4F6',
          borderRadius: '20px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: answeredCount === totalCount ? '#2D6A4F' : '#9CA3AF',
          }}/>
          <p style={{
            fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px',
            color: answeredCount === totalCount ? '#1B4332' : '#6B7280',
          }}>
            {answeredCount}/{totalCount} answered
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: '5px', background: '#E5E7EB', borderRadius: '3px', overflow: 'hidden', marginBottom: '20px' }}>
        <div style={{
          height: '100%',
          width: `${(answeredCount / totalCount) * 100}%`,
          background: 'linear-gradient(90deg, #2D6A4F, #52B788)',
          borderRadius: '3px', transition: 'width 0.5s ease',
        }}/>
      </div>

      {/* Question cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {questions.map(q => (
          <QuestionCard
            key={q.id}
            question={q}
            attempt={attempts.find(a => a.question_id === q.id)}
            onSubmit={handleSubmit}
          />
        ))}
      </div>
    </div>
  )
}
