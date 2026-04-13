'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getMarQuiz } from '@/lib/mar-quiz-content'
import { getMarChapter } from '@/lib/mar-chapter-content'
import { motion, AnimatePresence } from 'framer-motion'

const THEME = { primary: '#701A75', mid: '#86198F', accent: '#E879F9', heroBg: '#FDF4FF' }

type Phase = 'intro' | 'question' | 'feedback' | 'results'
interface Answer { questionId: number; given: string; correct: boolean; marksEarned: number }

export default function MarQuizPage() {
  const params    = useParams()
  const router    = useRouter()
  const chapterId = Number(params.id)
  const quiz    = getMarQuiz(chapterId)
  const chapter = getMarChapter(chapterId)

  const [phase,      setPhase]      = useState<Phase>('intro')
  const [qIdx,       setQIdx]       = useState(0)
  const [answers,    setAnswers]    = useState<Answer[]>([])
  const [feedback,   setFeedback]   = useState<{ given: string; correct: boolean; marksEarned: number } | null>(null)
  const [studentId,  setStudentId]  = useState('')
  const [selected,   setSelected]   = useState('')
  const [textVal,    setTextVal]    = useState('')

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
      <p style={{ fontFamily: 'var(--font-body)', color: '#94A3B8' }}>प्रश्नमंजुषा सापडली नाही.</p>
    </div>
  )

  const q      = quiz.questions[qIdx]
  const isLast = qIdx === quiz.questions.length - 1
  const score  = answers.reduce((s, a) => s + a.marksEarned, 0)

  const checkCorrect = (given: string) => given.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()

  const handleSubmit = () => {
    const given = q.type === 'mcq' ? selected : textVal.trim()
    if (!given) return
    const correct     = checkCorrect(given)
    const marksEarned = correct ? q.marks : 0
    setFeedback({ given, correct, marksEarned })
    setPhase('feedback')
  }

  const handleNext = () => {
    if (!feedback) return
    const newAnswers = [...answers, { questionId: q.id, given: feedback.given, correct: feedback.correct, marksEarned: feedback.marksEarned }]
    setAnswers(newAnswers)
    setFeedback(null); setSelected(''); setTextVal('')
    if (isLast) {
      const total = newAnswers.reduce((s, a) => s + a.marksEarned, 0)
      const pct   = Math.round((total / quiz.totalMarks) * 100)
      createClient().from('student_quiz_attempts').insert({ student_id: studentId, chapter_id: chapterId, subject: 'marathi', score: pct, marks_earned: total, total_marks: quiz.totalMarks, answers: JSON.stringify(newAnswers), created_at: new Date().toISOString() })
      setPhase('results')
    } else { setQIdx(i => i + 1); setPhase('question') }
  }

  const TopBar = () => (
    <div style={{ background: `linear-gradient(135deg,${THEME.primary},${THEME.mid})`, padding: '0', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button onClick={() => router.push('/student/dashboard?section=marathi')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontSize: '13px' }}>मराठी</button>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white' }}>{chapter.titleMarathi} — प्रश्नमंजुषा</p>
        </div>
        {(phase === 'question' || phase === 'feedback') && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{qIdx+1}/{quiz.questions.length}</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: THEME.accent }}>{score}/{quiz.totalMarks}</p>
          </div>
        )}
      </div>
      {(phase === 'question' || phase === 'feedback') && (
        <div style={{ height: '3px', background: 'rgba(255,255,255,0.1)' }}>
          <motion.div animate={{ width: `${(qIdx/quiz.questions.length)*100}%` }} style={{ height: '100%', background: THEME.accent }}/>
        </div>
      )}
    </div>
  )

  // Results
  if (phase === 'results') {
    const total = answers.reduce((s, a) => s + a.marksEarned, 0)
    const pct   = Math.round((total / quiz.totalMarks) * 100)
    const grade = pct >= 80 ? { label:'अभिनंदन! उत्तम!', emoji:'🏆', color: THEME.primary, bg:`${THEME.accent}20` }
                : pct >= 60 ? { label:'छान प्रयत्न!',     emoji:'👍', color:'#D97706', bg:'#FEF3C7' }
                :              { label:'पुन्हा प्रयत्न करा', emoji:'📚', color:'#DC2626', bg:'#FEF2F2' }
    return (
      <div style={{ minHeight: '100vh', background: THEME.heroBg }}>
        <TopBar/>
        <div style={{ maxWidth: '540px', margin: '40px auto', padding: '0 24px', textAlign: 'center' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} style={{ fontSize: '52px', marginBottom: '16px' }}>{grade.emoji}</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: THEME.primary, marginBottom: '6px' }}>{grade.label}</motion.h1>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
            style={{ display: 'inline-block', background: grade.bg, borderRadius: '20px', padding: '12px 28px', margin: '12px 0 24px', border: `2px solid ${THEME.accent}` }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '36px', color: THEME.primary, lineHeight: 1 }}>{total}/{quiz.totalMarks}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: THEME.mid, marginTop: '2px' }}>{pct}% · {chapter.titleMarathi}</p>
          </motion.div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => router.push('/student/dashboard?section=marathi')}
              style={{ flex: 1, background: 'white', color: THEME.primary, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', padding: '13px 20px', borderRadius: '12px', border: `1.5px solid ${THEME.accent}`, cursor: 'pointer' }}>
              ← मराठीकडे परत जा
            </button>
            <button onClick={() => { setPhase('intro'); setQIdx(0); setAnswers([]); setFeedback(null) }}
              style={{ flex: 1, background: `linear-gradient(135deg,${THEME.primary},${THEME.mid})`, color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', padding: '13px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
              पुन्हा प्रयत्न करा
            </button>
          </div>
        </div>
      </div>
    )
  }

  const canSubmit = q.type === 'mcq' ? selected !== '' : q.type === 'truefalse' ? selected !== '' : textVal.trim().length > 2

  return (
    <div style={{ minHeight: '100vh', background: THEME.heroBg }}>
      <style>{`* { box-sizing: border-box; } textarea, input { font-family: var(--font-body) !important; }`}</style>
      <TopBar/>

      {phase === 'intro' && (
        <div style={{ maxWidth: '500px', margin: '48px auto', padding: '0 24px', textAlign: 'center' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
            style={{ width: '80px', height: '80px', borderRadius: '50%', background: `${THEME.accent}30`, border: `2px solid ${THEME.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '36px' }}>
            🎯
          </motion.div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: THEME.primary, marginBottom: '6px' }}>प्रश्नमंजुषासाठी तयार आहात?</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#64748B', marginBottom: '28px', lineHeight: 1.7 }}>
            <strong style={{ color: THEME.primary }}>{chapter.titleMarathi}</strong> · {quiz.totalMarks} गुण · {quiz.questions.length} प्रश्न
          </p>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setPhase('question')}
            style={{ background: `linear-gradient(135deg,${THEME.primary},${THEME.mid})`, color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', padding: '14px 40px', borderRadius: '14px', border: 'none', cursor: 'pointer' }}>
            सुरू करा! →
          </motion.button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {phase === 'question' && (
          <motion.div key={`q-${qIdx}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            <div style={{ maxWidth: '680px', margin: '32px auto', padding: '0 24px' }}>
              <div style={{ display: 'inline-block', background: `${THEME.accent}20`, border: `1px solid ${THEME.accent}`, borderRadius: '8px', padding: '4px 12px', marginBottom: '12px' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: THEME.primary }}>
                  {q.type === 'mcq' ? 'पर्याय निवडा' : q.type === 'truefalse' ? 'खरे / खोटे' : q.type === 'fillinblank' ? 'रिकाम्या जागी भरा' : 'थोडक्यात उत्तर'} · {q.marks} गुण
                </p>
              </div>
              <div style={{ background: 'white', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '26px 28px', marginBottom: '18px' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '17px', color: THEME.primary, lineHeight: 1.6 }}>{q.question}</p>
              </div>

              {/* MCQ */}
              {(q.type === 'mcq' || q.type === 'fillinblank') && q.options && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  {q.options.map((opt: string, i: number) => (
                    <motion.button key={i} onClick={() => setSelected(opt)} whileHover={{ x: 3 }} whileTap={{ scale: 0.99 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', borderRadius: '14px', border: selected === opt ? `2px solid ${THEME.accent}` : '1.5px solid #F1F5F9', background: selected === opt ? `${THEME.accent}20` : 'white', cursor: 'pointer', textAlign: 'left' }}>
                      <div style={{ width: '30px', height: '30px', minWidth: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: selected === opt ? THEME.accent : '#F8FAFC', flexShrink: 0 }}>
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: selected === opt ? THEME.primary : '#94A3B8' }}>{String.fromCharCode(65+i)}</span>
                      </div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: selected === opt ? THEME.primary : '#374151', lineHeight: 1.5 }}>{opt}</p>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* True/False */}
              {q.type === 'truefalse' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                  {[['True','✓ खरे'], ['False','✗ खोटे']].map(([val, label]) => (
                    <motion.button key={val} onClick={() => setSelected(val)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      style={{ padding: '16px', borderRadius: '14px', border: selected === val ? `2px solid ${THEME.accent}` : '1.5px solid #F1F5F9', background: selected === val ? `${THEME.accent}20` : 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', color: selected === val ? THEME.primary : '#64748B', cursor: 'pointer' }}>
                      {label}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Short answer */}
              {q.type === 'shortanswer' && (
                <textarea value={textVal} onChange={e => setTextVal(e.target.value)} placeholder="तुमचे उत्तर येथे लिहा..." rows={4}
                  style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', border: `1.5px solid ${THEME.accent}60`, fontFamily: 'var(--font-body)', fontSize: '15px', color: '#1F2937', outline: 'none', resize: 'vertical', lineHeight: 1.8, boxSizing: 'border-box', background: 'white', marginBottom: '14px' }}/>
              )}

              <motion.button onClick={handleSubmit} disabled={!canSubmit}
                whileHover={canSubmit ? { scale: 1.02 } : {}} whileTap={canSubmit ? { scale: 0.97 } : {}}
                style={{ background: canSubmit ? `linear-gradient(135deg,${THEME.primary},${THEME.mid})` : '#E2E8F0', color: canSubmit ? 'white' : '#94A3B8', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', padding: '13px 30px', borderRadius: '12px', border: 'none', cursor: canSubmit ? 'pointer' : 'not-allowed' }}>
                उत्तर द्या →
              </motion.button>
            </div>
          </motion.div>
        )}

        {phase === 'feedback' && feedback && (
          <motion.div key={`f-${qIdx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={{ maxWidth: '680px', margin: '32px auto', padding: '0 24px' }}>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}
                style={{ background: feedback.correct ? `${THEME.accent}20` : '#FEF2F2', borderRadius: '16px', border: `1.5px solid ${feedback.correct ? THEME.accent : '#FCA5A5'}`, padding: '18px 22px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '28px', flexShrink: 0 }}>{feedback.correct ? '✅' : '❌'}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: feedback.correct ? THEME.primary : '#991B1B', marginBottom: '2px' }}>{feedback.correct ? 'बरोबर! 🎉' : 'चुकीचे!'}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: feedback.correct ? THEME.mid : '#DC2626', opacity: 0.8 }}>
                    {feedback.correct ? `${feedback.marksEarned} गुण मिळाले!` : 'बरोबर उत्तर खाली दिले आहे.'}
                  </p>
                </div>
                <div style={{ background: 'white', borderRadius: '10px', padding: '8px 14px', border: `1px solid ${feedback.correct ? THEME.accent : '#FCA5A5'}` }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '16px', color: feedback.correct ? THEME.primary : '#991B1B' }}>{feedback.marksEarned}/{q.marks}</p>
                </div>
              </motion.div>

              {[
                { label:'तुमचे उत्तर',   content: feedback.given,    bg:'white',           border:'#E2E8F0' },
                { label:'बरोबर उत्तर',   content: q.correctAnswer,   bg:`${THEME.accent}15`, border: THEME.accent, hide: feedback.correct },
                { label:'स्पष्टीकरण',   content: q.explanation,     bg:'white',           border:'#E2E8F0' },
              ].filter(r => !r.hide).map((row, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i }}
                  style={{ background: row.bg, borderRadius: '14px', border: `1.5px solid ${row.border}`, padding: '18px 22px', marginBottom: '12px' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>{row.label}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', lineHeight: 1.8 }}>{row.content}</p>
                </motion.div>
              ))}

              <motion.button onClick={handleNext} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                style={{ background: `linear-gradient(135deg,${THEME.primary},${THEME.mid})`, color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', padding: '13px 30px', borderRadius: '12px', border: 'none', cursor: 'pointer', marginTop: '8px' }}>
                {isLast ? '📊 निकाल पाहा' : 'पुढे →'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
