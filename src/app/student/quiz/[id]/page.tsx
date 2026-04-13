'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getQuiz, type Question } from '@/lib/quiz-content'
import { getChapter } from '@/lib/chapter-content'
import { motion, AnimatePresence } from 'framer-motion'

type Phase = 'intro' | 'question' | 'feedback' | 'results'
interface Answer { questionId: number; given: string; correct: boolean; marksEarned: number }

function partLabel(type: Question['type']) {
  if (type === 'mcq')         return 'Part A — Multiple choice'
  if (type === 'single_word') return 'Part B — Single word'
  if (type === 'sentence')    return 'Part C — Sentence forming'
  return 'Part D — Long answer'
}

function normalise(s: string) { return s.trim().toLowerCase().replace(/[^a-z0-9./]/g, '') }
function isCorrectMCQ(q: Question, given: string) {
  const givenN = normalise(given)
  if (!givenN) return false
  if (q.type === 'mcq') return givenN === normalise(q.answer)
  const answerN = normalise(q.answer)
  if (givenN === answerN) return true
  const rawTokens = q.answer.split(/[\s=;→,()×÷+\-:|]+/).filter((t: string) => t.trim())
  const normTokens = rawTokens.map((t: string) => normalise(t))
  if (normTokens.some((t: string) => t && t === givenN)) return true
  for (let i = 0; i < normTokens.length - 1; i++) {
    if (normTokens[i] + normTokens[i + 1] === givenN) return true
  }
  return false
}
function scoreForAnswer(q: Question, given: string) { return (q.type === 'mcq' || q.type === 'single_word') ? (isCorrectMCQ(q, given) ? q.marks : 0) : q.marks }
function isAutoCorrect(q: Question) { return q.type === 'sentence' || q.type === 'long_answer' }

// ── Top progress bar ──────────────────────────────────────────────────────────
function TopBar({ chapterId, chapterTitle, current, total, score, maxScore, router }: any) {
  const pct = Math.round((current / total) * 100)
  return (
    <div style={{ background: 'linear-gradient(135deg,#3730A3,#4338CA)', padding: '0', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button onClick={() => router.push('/student/dashboard?section=english')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontSize: '13px' }}>English</button>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
          <button onClick={() => router.push(`/student/chapter/${chapterId}`)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontSize: '13px' }}>{chapterTitle}</button>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white' }}>Quiz</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Q{Math.min(current+1, total)} of {total}</p>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#A5B4FC' }}>{score}/{maxScore} marks</p>
        </div>
      </div>
      <div style={{ height: '3px', background: 'rgba(255,255,255,0.1)' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} style={{ height: '100%', background: '#A5B4FC' }}/>
      </div>
    </div>
  )
}

// ── Intro screen ──────────────────────────────────────────────────────────────
function IntroScreen({ chapterTitle, totalMarks, questionCount, onStart }: { chapterTitle: string; totalMarks: number; questionCount: number; onStart: () => void }) {
  const parts = [
    { label: 'Part A — Multiple choice', count: '5 questions', marks: '5 marks', color: '#EEF2FF', border: '#C7D2FE', text: '#3730A3' },
    { label: 'Part B — Single word',     count: '5 questions', marks: '5 marks', color: '#F0FDF4', border: '#BBF7D0', text: '#166534' },
    { label: 'Part C — Sentences',       count: '5 questions', marks: '10 marks', color: '#FFF7ED', border: '#FED7AA', text: '#9A3412' },
    { label: 'Part D — Long answer',     count: '1 question',  marks: '5 marks', color: '#FDF4FF', border: '#E9D5FF', text: '#7E22CE' },
  ]
  return (
    <div style={{ maxWidth: '560px', margin: '48px auto', padding: '0 24px', textAlign: 'center' }}>
      <motion.div initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200 }}
        style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg,#EEF2FF,#C7D2FE)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '36px' }}>
        🎯
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: '#1E1B4B', marginBottom: '6px' }}>
        Ready to be quizzed?
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
        style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#64748B', lineHeight: 1.7, marginBottom: '28px' }}>
        Assessment for <strong style={{ color: '#4338CA' }}>{chapterTitle}</strong> · {totalMarks} marks total
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px', textAlign: 'left' }}>
        {parts.map((p, i) => (
          <motion.div key={p.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06 }}
            style={{ background: p.color, border: `1px solid ${p.border}`, borderRadius: '14px', padding: '14px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: p.text, marginBottom: '4px' }}>{p.label}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: p.text, opacity: 0.75 }}>{p.count} · {p.marks}</p>
          </motion.div>
        ))}
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '12px', padding: '12px 16px', marginBottom: '24px', display: 'flex', gap: '10px', textAlign: 'left' }}>
        <span style={{ fontSize: '16px', flexShrink: 0 }}>💡</span>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#92400E', lineHeight: 1.6 }}>
          Parts C & D are reviewed by your teacher. Write your best attempt in your own words.
        </p>
      </motion.div>
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(67,56,202,0.3)' }} whileTap={{ scale: 0.97 }}
        onClick={onStart}
        style={{ background: 'linear-gradient(135deg,#3730A3,#4338CA)', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', padding: '14px 40px', borderRadius: '14px', border: 'none', cursor: 'pointer' }}>
        Let's go! →
      </motion.button>
    </div>
  )
}

// ── Question card ─────────────────────────────────────────────────────────────
function QuestionCard({ question, questionIndex, totalQuestions, onSubmit }: { question: Question; questionIndex: number; totalQuestions: number; onSubmit: (a: string) => void }) {
  const [selected,  setSelected]  = useState('')
  const [textValue, setTextValue] = useState('')
  const isSentence = question.type === 'sentence'
  const isLong     = question.type === 'long_answer'
  const canSubmit  = question.type === 'mcq' ? selected !== '' : question.type === 'single_word' ? textValue.trim().length > 0 : textValue.trim().split(/\s+/).length >= 3
  const wordCount  = textValue.trim().split(/\s+/).filter(Boolean).length
  const minWords   = isLong ? 60 : isSentence ? 5 : 0

  const OPTION_COLORS = ['#EEF2FF', '#F0FDF4', '#FFF7ED', '#FDF4FF']
  const OPTION_BORDERS = ['#C7D2FE', '#BBF7D0', '#FED7AA', '#E9D5FF']
  const OPTION_TEXT = ['#3730A3', '#166534', '#9A3412', '#7E22CE']

  return (
    <div style={{ maxWidth: '680px', margin: '32px auto', padding: '0 24px' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'inline-block', background: '#EEF2FF', border: '1px solid #C7D2FE', borderRadius: '8px', padding: '4px 12px', marginBottom: '12px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#4338CA', letterSpacing: '0.06em' }}>{partLabel(question.type)} · {question.marks} mark{question.marks > 1 ? 's' : ''}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        style={{ background: 'white', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '26px 28px', marginBottom: '18px', boxShadow: '0 2px 12px rgba(30,27,75,0.05)' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '17px', color: '#1E1B4B', lineHeight: 1.6 }}>{question.question}</p>
        {isAutoCorrect(question) && question.hint && (
          <div style={{ background: '#EEF2FF', borderRadius: '10px', padding: '10px 14px', marginTop: '14px', display: 'flex', gap: '8px' }}>
            <span style={{ fontSize: '14px' }}>💡</span>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#4338CA', lineHeight: 1.6 }}>{question.hint}</p>
          </div>
        )}
      </motion.div>

      {/* MCQ options */}
      {question.type === 'mcq' && question.options && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {question.options.map((opt, i) => (
            <motion.button key={opt.label} onClick={() => setSelected(opt.label)}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.05 }}
              whileHover={{ x: 3 }} whileTap={{ scale: 0.99 }}
              style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', borderRadius: '14px', border: selected === opt.label ? `2px solid ${OPTION_BORDERS[i % 4]}` : '1.5px solid #F1F5F9', background: selected === opt.label ? OPTION_COLORS[i % 4] : 'white', cursor: 'pointer', textAlign: 'left', transition: 'border 0.15s' }}>
              <div style={{ width: '32px', height: '32px', minWidth: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: selected === opt.label ? OPTION_BORDERS[i % 4] : '#F8FAFC', flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: selected === opt.label ? OPTION_TEXT[i % 4] : '#94A3B8' }}>{opt.label}</span>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: selected === opt.label ? OPTION_TEXT[i % 4] : '#374151', lineHeight: 1.5 }}>{opt.text}</p>
            </motion.button>
          ))}
        </div>
      )}

      {/* Single word */}
      {question.type === 'single_word' && (
        <motion.input initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          type="text" value={textValue} onChange={e => setTextValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && canSubmit && onSubmit(textValue.trim())}
          placeholder="Type your answer here..."
          style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1.5px solid #E2E8F0', fontFamily: 'var(--font-body)', fontSize: '15px', color: '#1E1B4B', outline: 'none', boxSizing: 'border-box', marginBottom: '20px', background: 'white' }}/>
      )}

      {/* Sentence / long */}
      {(isSentence || isLong) && (
        <div style={{ marginBottom: '14px' }}>
          <textarea value={textValue} onChange={e => setTextValue(e.target.value)}
            placeholder={isLong ? 'Write your answer here (min. 60 words)...' : 'Write your sentence here...'}
            rows={isLong ? 8 : 4}
            style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', border: '1.5px solid #E2E8F0', fontFamily: 'var(--font-body)', fontSize: '15px', color: '#1E1B4B', outline: 'none', resize: 'vertical', lineHeight: 1.8, boxSizing: 'border-box', background: 'white' }}/>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: wordCount >= minWords ? '#4338CA' : '#94A3B8', marginTop: '6px' }}>
            {wordCount} word{wordCount !== 1 ? 's' : ''}{minWords > 0 ? ` (min. ${minWords})` : ''}
          </p>
        </div>
      )}

      <motion.button onClick={() => { const ans = question.type === 'mcq' ? selected : textValue.trim(); if (ans) onSubmit(ans) }}
        disabled={!canSubmit}
        whileHover={canSubmit ? { scale: 1.02, boxShadow: '0 6px 20px rgba(67,56,202,0.25)' } : {}}
        whileTap={canSubmit ? { scale: 0.97 } : {}}
        style={{ background: canSubmit ? 'linear-gradient(135deg,#3730A3,#4338CA)' : '#E2E8F0', color: canSubmit ? 'white' : '#94A3B8', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', padding: '13px 30px', borderRadius: '12px', border: 'none', cursor: canSubmit ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}>
        Submit answer →
      </motion.button>
    </div>
  )
}

// ── Feedback card ─────────────────────────────────────────────────────────────
function FeedbackCard({ question, given, correct, marksEarned, onNext, isLast }: { question: Question; given: string; correct: boolean; marksEarned: number; onNext: () => void; isLast: boolean }) {
  const auto = isAutoCorrect(question)
  const bg     = auto ? '#EEF2FF' : correct ? '#F0FDF4' : '#FEF2F2'
  const border = auto ? '#C7D2FE' : correct ? '#86EFAC' : '#FCA5A5'
  const color  = auto ? '#4338CA' : correct ? '#166534' : '#991B1B'
  const icon   = auto ? '✍️' : correct ? '✅' : '❌'
  const label  = auto ? 'Answer recorded!' : correct ? 'Correct! 🎉' : 'Not quite!'

  return (
    <div style={{ maxWidth: '680px', margin: '32px auto', padding: '0 24px' }}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}
        style={{ background: bg, borderRadius: '16px', border: `1.5px solid ${border}`, padding: '18px 22px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <span style={{ fontSize: '28px', flexShrink: 0 }}>{icon}</span>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color, marginBottom: '2px' }}>{label}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color, opacity: 0.75 }}>
            {auto ? `${marksEarned} mark${marksEarned !== 1 ? 's' : ''} awarded for this section.`
                  : correct ? `Well done — ${marksEarned} mark${marksEarned !== 1 ? 's' : ''} earned!`
                  : 'The correct answer is shown below.'}
          </p>
        </div>
        <div style={{ background: 'white', borderRadius: '10px', padding: '8px 14px', flexShrink: 0, border: `1px solid ${border}` }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '16px', color }}>{marksEarned}/{question.marks}</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        style={{ background: 'white', borderRadius: '14px', border: '1.5px solid #F1F5F9', padding: '18px 22px', marginBottom: '12px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>Your answer</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', lineHeight: 1.7 }}>{given}</p>
      </motion.div>

      {!auto && !correct && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          style={{ background: '#F0FDF4', borderRadius: '14px', border: '1.5px solid #BBF7D0', padding: '18px 22px', marginBottom: '12px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', color: '#40916C', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>Correct answer</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1B4332', lineHeight: 1.7, fontWeight: 600 }}>
            {question.type === 'mcq' && question.options ? question.options.find(o => o.label === question.answer)?.text || question.answer : question.answer}
          </p>
        </motion.div>
      )}

      {auto && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          style={{ background: '#EEF2FF', borderRadius: '14px', border: '1.5px solid #C7D2FE', padding: '18px 22px', marginBottom: '12px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', color: '#4338CA', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>Sample answer</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1E1B4B', lineHeight: 1.7 }}>{question.answer}</p>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        style={{ background: 'white', borderRadius: '14px', border: '1.5px solid #F1F5F9', padding: '18px 22px', marginBottom: '24px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>
          {auto ? 'How to approach this' : correct ? 'Why this is correct' : 'Let\'s revisit this'}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', lineHeight: 1.8 }}>{question.reexplanation}</p>
      </motion.div>

      <motion.button onClick={onNext} whileHover={{ scale: 1.02, boxShadow: '0 6px 20px rgba(67,56,202,0.25)' }} whileTap={{ scale: 0.97 }}
        style={{ background: 'linear-gradient(135deg,#3730A3,#4338CA)', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', padding: '13px 30px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
        {isLast ? '📊 See my results' : 'Next question →'}
      </motion.button>
    </div>
  )
}

// ── Results screen ────────────────────────────────────────────────────────────
function ResultsScreen({ chapterId, chapterTitle, answers, questions, totalMarks, onRetry, onBack }: {
  chapterId: number; chapterTitle: string; answers: Answer[]; questions: Question[]; totalMarks: number; onRetry: () => void; onBack: () => void
}) {
  const score   = answers.reduce((s, a) => s + a.marksEarned, 0)
  const pct     = Math.round((score / totalMarks) * 100)
  const correct = answers.filter(a => a.correct).length
  const grade   = pct >= 80 ? { label: 'Excellent!',  color: '#4338CA', bg: '#EEF2FF', border: '#C7D2FE', emoji: '🌟' }
                : pct >= 60 ? { label: 'Good job!',   color: '#D97706', bg: '#FFF7ED', border: '#FED7AA', emoji: '👍' }
                : { label: 'Keep going!', color: '#DC2626', bg: '#FEF2F2', border: '#FCA5A5', emoji: '💪' }

  const partScores = [
    { label: 'Part A — MCQ',         type: 'mcq',         max: 5,  color: '#4338CA' },
    { label: 'Part B — Single word', type: 'single_word', max: 5,  color: '#166534' },
    { label: 'Part C — Sentences',   type: 'sentence',    max: 10, color: '#9A3412' },
    { label: 'Part D — Long answer', type: 'long_answer', max: 5,  color: '#7E22CE' },
  ].map(p => ({ ...p, earned: answers.filter(a => questions.find(q => q.id === a.questionId)?.type === p.type).reduce((s, a) => s + a.marksEarned, 0) }))

  return (
    <div style={{ maxWidth: '560px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200 }}
          style={{ fontSize: '52px', marginBottom: '16px' }}>{grade.emoji}</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: '#1E1B4B', marginBottom: '6px' }}>{grade.label}</motion.h1>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
          style={{ display: 'inline-block', background: grade.bg, border: `2px solid ${grade.border}`, borderRadius: '20px', padding: '12px 28px', margin: '12px 0' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '36px', color: grade.color, lineHeight: 1 }}>{score}/{totalMarks}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: grade.color, opacity: 0.75, marginTop: '2px' }}>{pct}% · {chapterTitle}</p>
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

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
        style={{ display: 'flex', gap: '12px' }}>
        <motion.button onClick={onBack} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          style={{ flex: 1, background: 'white', color: '#4338CA', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', padding: '13px 20px', borderRadius: '12px', border: '1.5px solid #C7D2FE', cursor: 'pointer' }}>
          ← Back to English
        </motion.button>
        <motion.button onClick={onRetry} whileHover={{ scale: 1.02, boxShadow: '0 6px 20px rgba(67,56,202,0.25)' }} whileTap={{ scale: 0.97 }}
          style={{ flex: 1, background: 'linear-gradient(135deg,#3730A3,#4338CA)', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', padding: '13px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
          Try again
        </motion.button>
      </motion.div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function QuizPage() {
  const params    = useParams()
  const router    = useRouter()
  const chapterId = Number(params.id)
  const quiz    = getQuiz(chapterId)
  const chapter = getChapter(chapterId)

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

  const saveResult = async (finalAnswers: Answer[]) => {
    if (!studentId || !quiz) return
    const supabase = createClient()
    const total = finalAnswers.reduce((s, a) => s + a.marksEarned, 0)
    const pct   = Math.round((total / quiz.totalMarks) * 100)
    await supabase.from('student_quiz_attempts').insert({
      student_id: studentId, chapter_id: chapterId, subject: 'english',
      score: pct, marks_earned: total, total_marks: quiz.totalMarks,
      answers: JSON.stringify(finalAnswers), created_at: new Date().toISOString(),
    })
  }

  if (!quiz || !chapter) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <p style={{ fontFamily: 'var(--font-body)', color: '#94A3B8' }}>Quiz not found.</p>
    </div>
  )

  const questions = quiz.questions
  const currentQ  = questions[questionIdx]
  const isLast    = questionIdx === questions.length - 1
  const score     = answers.reduce((s, a) => s + a.marksEarned, 0)

  const handleSubmitAnswer = (given: string) => {
    const correct     = isAutoCorrect(currentQ) ? true : isCorrectMCQ(currentQ, given)
    const marksEarned = scoreForAnswer(currentQ, given)
    setCurrentFeedback({ given, correct, marksEarned })
    setPhase('feedback')
  }

  const handleNext = () => {
    if (!currentFeedback) return
    const newAnswers = [...answers, { questionId: currentQ.id, given: currentFeedback.given, correct: currentFeedback.correct, marksEarned: currentFeedback.marksEarned }]
    setAnswers(newAnswers)
    setCurrentFeedback(null)
    if (isLast) { saveResult(newAnswers); setPhase('results') }
    else { setQuestionIdx(i => i + 1); setPhase('question') }
  }

  const handleRetry = () => { setPhase('intro'); setQuestionIdx(0); setAnswers([]); setCurrentFeedback(null) }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFF' }}>
      <style>{`* { box-sizing: border-box; } textarea, input { font-family: var(--font-body) !important; }`}</style>

      {(phase === 'question' || phase === 'feedback') && (
        <TopBar chapterId={chapterId} chapterTitle={chapter.title} current={questionIdx}
          total={questions.length} score={score} maxScore={quiz.totalMarks} router={router}/>
      )}

      {phase !== 'question' && phase !== 'feedback' && (
        <div style={{ background: 'linear-gradient(135deg,#3730A3,#4338CA)', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button onClick={() => router.push('/student/dashboard?section=english')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontSize: '13px' }}>English</button>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white' }}>{chapter.title} — Quiz</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {phase === 'intro' && <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><IntroScreen chapterTitle={chapter.title} totalMarks={quiz.totalMarks} questionCount={questions.length} onStart={() => setPhase('question')}/></motion.div>}
        {phase === 'question' && currentQ && <motion.div key={`q-${questionIdx}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}><QuestionCard question={currentQ} questionIndex={questionIdx} totalQuestions={questions.length} onSubmit={handleSubmitAnswer}/></motion.div>}
        {phase === 'feedback' && currentQ && currentFeedback && <motion.div key={`f-${questionIdx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><FeedbackCard question={currentQ} given={currentFeedback.given} correct={currentFeedback.correct} marksEarned={currentFeedback.marksEarned} onNext={handleNext} isLast={isLast}/></motion.div>}
        {phase === 'results' && <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><ResultsScreen chapterId={chapterId} chapterTitle={chapter.title} answers={answers} questions={questions} totalMarks={quiz.totalMarks} onRetry={handleRetry} onBack={() => router.push('/student/dashboard?section=english')}/></motion.div>}
      </AnimatePresence>
    </div>
  )
}
