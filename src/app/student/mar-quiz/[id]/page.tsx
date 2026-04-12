'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getMarQuiz } from '@/lib/mar-quiz-content'
import { getMarChapter } from '@/lib/mar-chapter-content'

export default function MarQuizPage() {
  const params    = useParams()
  const router    = useRouter()
  const chapterId = Number(params.id)
  const quiz      = getMarQuiz(chapterId)
  const chapter   = getMarChapter(chapterId)

  const [current,   setCurrent]   = useState(0)
  const [answers,   setAnswers]   = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score,     setScore]     = useState(0)
  const [saving,    setSaving]    = useState(false)
  const [showExpl,  setShowExpl]  = useState(false)

  if (!quiz || !chapter) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <p style={{ fontFamily: 'var(--font-body)', color: '#9CA3AF' }}>प्रश्नमंजुषा सापडली नाही.</p>
    </div>
  )

  const q = quiz.questions[current]
  const totalQ = quiz.questions.length
  const isAnswered = answers[q.id] !== undefined

  const handleAnswer = (ans: string) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [q.id]: ans }))
  }

  const handleNext = () => {
    if (current < totalQ - 1) { setCurrent(c => c + 1); setShowExpl(false) }
  }

  const handleSubmit = async () => {
    setSaving(true)
    let total = 0
    quiz.questions.forEach(q => { if (answers[q.id] === q.correctAnswer) total += q.marks })
    setScore(total)
    setSubmitted(true)
    const pct = Math.round((total / quiz.totalMarks) * 100)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('student_quiz_attempts').insert({
        student_id: user.id, chapter_id: chapterId, subject: 'marathi',
        score: pct, marks_earned: total, total_marks: quiz.totalMarks,
        answers: JSON.stringify(answers), created_at: new Date().toISOString(),
      })
    }
    setSaving(false)
  }

  const pct = submitted ? Math.round((score / quiz.totalMarks) * 100) : 0
  const scoreColor = pct >= 80 ? '#10B981' : pct >= 60 ? '#F59E0B' : '#EF4444'

  // ── Results screen ──
  if (submitted) return (
    <div style={{ minHeight: '100vh', background: '#F8FAF9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #E5E7EB', padding: '44px', maxWidth: '520px', width: '100%', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: pct >= 60 ? '#D8F3DC' : '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '36px' }}>
          {pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚'}
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: '#1B4332', marginBottom: '8px' }}>
          {pct >= 80 ? 'अभिनंदन! उत्तम!' : pct >= 60 ? 'छान प्रयत्न!' : 'पुन्हा प्रयत्न करा'}
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7280', marginBottom: '28px' }}>{chapter.titleMarathi}</p>
        <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '28px', marginBottom: '28px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '52px', color: scoreColor, lineHeight: 1 }}>{score}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#9CA3AF', marginTop: '4px' }}>पैकी {quiz.totalMarks} गुण ({pct}%)</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => router.push('/student/dashboard?section=marathi')} style={{ padding: '13px', borderRadius: '12px', border: 'none', background: '#1B4332', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>
            मराठी विषयाकडे परत जा
          </button>
          {pct < 80 && (
            <button onClick={() => router.push(`/student/mar-chapter/${chapterId}`)} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #E5E7EB', background: 'white', color: '#374151', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
              पाठ पुन्हा वाचा
            </button>
          )}
        </div>
      </div>
    </div>
  )

  // ── Quiz screen ──
  return (
    <div style={{ minHeight: '100vh', background: '#F8FAF9' }}>
      {/* Top bar */}
      <div style={{ background: '#1B4332', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: 'white', lineHeight: 1 }}>प्रश्नमंजुषा — {chapter.titleMarathi}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{quiz.totalMarks} गुण · {totalQ} प्रश्न</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{current + 1}/{totalQ}</p>
          <div style={{ width: '100px', height: '5px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${((current + 1) / totalQ) * 100}%`, background: '#74C69D', borderRadius: '3px' }}/>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Question card */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '28px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', minWidth: '32px', borderRadius: '50%', background: '#1B4332', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '13px', color: 'white' }}>{current + 1}</span>
            </div>
            <span style={{ background: '#F0FDF4', border: '1px solid #D8F3DC', borderRadius: '8px', padding: '3px 10px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#1B4332' }}>
              {q.type === 'mcq' ? 'पर्याय निवडा' : q.type === 'truefalse' ? 'खरे / खोटे' : q.type === 'fillinblank' ? 'रिकाम्या जागी भरा' : 'थोडक्यात उत्तर'}
            </span>
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF' }}>{q.marks} गुण</span>
          </div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '17px', color: '#1B4332', lineHeight: 1.5 }}>{q.question}</p>
        </div>

        {/* Options */}
        {(q.type === 'mcq' || q.type === 'fillinblank') && q.options && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            {q.options.map((opt, i) => {
              const selected = answers[q.id] === opt
              const correct  = opt === q.correctAnswer
              const bg = !isAnswered ? 'white' : selected && correct ? '#F0FDF4' : selected && !correct ? '#FEF2F2' : correct ? '#F0FDF4' : 'white'
              const border = !isAnswered ? (selected ? '2px solid #2D6A4F' : '1px solid #E5E7EB') : correct ? '2px solid #10B981' : selected ? '2px solid #EF4444' : '1px solid #E5E7EB'
              return (
                <button key={i} onClick={() => handleAnswer(opt)} disabled={isAnswered}
                  style={{ padding: '14px 18px', borderRadius: '12px', border, background: bg, fontFamily: 'var(--font-body)', fontSize: '15px', color: '#374151', cursor: isAnswered ? 'default' : 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginRight: '10px', color: '#9CA3AF' }}>{String.fromCharCode(65 + i)}.</span>
                  {opt}
                  {isAnswered && correct && <span style={{ float: 'right', color: '#10B981' }}>✓</span>}
                  {isAnswered && selected && !correct && <span style={{ float: 'right', color: '#EF4444' }}>✗</span>}
                </button>
              )
            })}
          </div>
        )}

        {q.type === 'truefalse' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            {['True', 'False'].map(val => {
              const label    = val === 'True' ? '✓ खरे' : '✗ खोटे'
              const selected = answers[q.id] === val
              const correct  = val === q.correctAnswer
              const bg = !isAnswered ? 'white' : selected && correct ? '#F0FDF4' : selected && !correct ? '#FEF2F2' : correct ? '#F0FDF4' : 'white'
              const border = !isAnswered ? (selected ? `2px solid ${val === 'True' ? '#10B981' : '#EF4444'}` : '1px solid #E5E7EB') : correct ? '2px solid #10B981' : selected ? '2px solid #EF4444' : '1px solid #E5E7EB'
              return (
                <button key={val} onClick={() => handleAnswer(val)} disabled={isAnswered}
                  style={{ padding: '16px', borderRadius: '12px', border, background: bg, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', color: val === 'True' ? '#065F46' : '#DC2626', cursor: isAnswered ? 'default' : 'pointer' }}>
                  {label}
                </button>
              )
            })}
          </div>
        )}

        {q.type === 'shortanswer' && (
          <div style={{ marginBottom: '16px' }}>
            <textarea value={answers[q.id] || ''} onChange={e => handleAnswer(e.target.value)}
              placeholder="तुमचे उत्तर येथे लिहा..."
              style={{ width: '100%', minHeight: '100px', padding: '14px', borderRadius: '12px', border: '1px solid #E5E7EB', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', resize: 'vertical', boxSizing: 'border-box' }}/>
          </div>
        )}

        {/* Explanation */}
        {isAnswered && (
          <div style={{ background: answers[q.id] === q.correctAnswer ? '#F0FDF4' : '#FEF2F2', borderRadius: '12px', border: `1px solid ${answers[q.id] === q.correctAnswer ? '#86EFAC' : '#FCA5A5'}`, padding: '16px', marginBottom: '16px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: answers[q.id] === q.correctAnswer ? '#166534' : '#DC2626', marginBottom: '6px' }}>
              {answers[q.id] === q.correctAnswer ? '✓ बरोबर!' : `✗ चुकीचे — बरोबर उत्तर: ${q.correctAnswer}`}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>{q.explanation}</p>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {current > 0 && (
            <button onClick={() => { setCurrent(c => c - 1); setShowExpl(false) }}
              style={{ padding: '12px 20px', borderRadius: '10px', border: '1px solid #E5E7EB', background: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#374151', cursor: 'pointer' }}>
              ← मागे
            </button>
          )}
          {current < totalQ - 1 ? (
            <button onClick={handleNext} disabled={!isAnswered}
              style={{ flex: 1, padding: '13px', borderRadius: '10px', border: 'none', background: isAnswered ? '#1B4332' : '#E5E7EB', color: isAnswered ? 'white' : '#9CA3AF', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', cursor: isAnswered ? 'pointer' : 'not-allowed' }}>
              पुढे →
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={!isAnswered || saving}
              style={{ flex: 1, padding: '13px', borderRadius: '10px', border: 'none', background: isAnswered && !saving ? '#2D6A4F' : '#E5E7EB', color: isAnswered && !saving ? 'white' : '#9CA3AF', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', cursor: isAnswered && !saving ? 'pointer' : 'not-allowed' }}>
              {saving ? 'जतन करत आहे...' : '✅ प्रश्नमंजुषा पूर्ण करा'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
