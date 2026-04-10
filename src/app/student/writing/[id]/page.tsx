'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getChapter } from '@/lib/chapter-content'

interface Prompt {
  id: string
  chapter_id: number
  prompt_text: string
  min_words: number
  max_words: number
  deadline: string
}

interface Submission {
  id: string
  content: string
  word_count: number
  ai_score: number | null
  ai_feedback: string | null
  ai_improvement: string | null
  final_score: number | null
  admin_comment: string | null
  status: 'submitted' | 'reviewed' | 'released'
  created_at: string
}

type Phase = 'loading' | 'no_prompt' | 'write' | 'submitted' | 'released'

export default function StudentWritingPage() {
  const params    = useParams()
  const router    = useRouter()
  const chapterId = Number(params.id)
  const chapter   = getChapter(chapterId)

  const [phase,      setPhase]      = useState<Phase>('loading')
  const [prompt,     setPrompt]     = useState<Prompt | null>(null)
  const [submission, setSubmission] = useState<Submission | null>(null)
  const [content,    setContent]    = useState('')
  const [studentId,  setStudentId]  = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error,      setError]      = useState('')

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setStudentId(user.id)

      // Load prompt for this chapter
      const { data: prompts } = await supabase
        .from('writing_prompts')
        .select('*')
        .eq('chapter_id', chapterId)
        .order('created_at', { ascending: false })
        .limit(1)

      if (!prompts?.length) { setPhase('no_prompt'); return }
      const p = prompts[0] as Prompt
      setPrompt(p)

      // Check for existing submission
      const { data: subs } = await supabase
        .from('writing_submissions')
        .select('*')
        .eq('student_id', user.id)
        .eq('prompt_id', p.id)
        .order('created_at', { ascending: false })
        .limit(1)

      if (subs?.length) {
        const sub = subs[0] as Submission
        setSubmission(sub)
        setPhase(sub.status === 'released' ? 'released' : 'submitted')
      } else {
        setPhase('write')
      }
    }
    load()
  }, [chapterId, router])

  const handleSubmit = async () => {
    if (!prompt || !studentId) return
    if (wordCount < prompt.min_words) {
      setError(`Please write at least ${prompt.min_words} words. You have ${wordCount}.`)
      return
    }
    setError('')
    setSubmitting(true)

    try {
      const supabase = createClient()

      // Save submission first
      const { data: sub, error: subErr } = await supabase
        .from('writing_submissions')
        .insert({
          student_id:  studentId,
          prompt_id:   prompt.id,
          chapter_id:  chapterId,
          content:     content.trim(),
          word_count:  wordCount,
          status:      'submitted',
        })
        .select()
        .single()

      if (subErr) throw subErr

      // Trigger AI evaluation via API route
      await fetch('/api/evaluate-writing', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: sub.id,
          promptText:   prompt.prompt_text,
          content:      content.trim(),
          chapterTitle: chapter?.title || '',
        }),
      })

      setSubmission({ ...sub, status: 'submitted' })
      setPhase('submitted')
    } catch (e) {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const canSubmit = prompt
    ? wordCount >= prompt.min_words && wordCount <= (prompt.max_words || 99999)
    : false

  const deadlineStr = prompt
    ? new Date(prompt.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  const scoreColor = (s: number) => s >= 16 ? '#10B981' : s >= 12 ? '#F59E0B' : '#EF4444'

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAF9' }}>
      <style>{`* { box-sizing: border-box; } textarea { font-family: var(--font-body) !important; }`}</style>

      {/* Top bar */}
      <div style={{ background: '#1B4332', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: '6px', position: 'sticky', top: 0, zIndex: 100 }}>
        <button onClick={() => router.push('/student/dashboard?section=english')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontSize: '13px', padding: '4px 8px' }}>Dashboard</button>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
        <button onClick={() => router.push('/student/dashboard?section=english')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontSize: '13px', padding: '4px 8px' }}>English</button>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
        <button onClick={() => router.push(`/student/chapter/${chapterId}`)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontSize: '13px', padding: '4px 8px' }}>{chapter?.title}</button>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white' }}>Writing prompt</p>
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '36px 24px 80px' }}>

        {/* Loading */}
        {phase === 'loading' && (
          <div style={{ textAlign: 'center', paddingTop: '80px' }}>
            <p style={{ fontFamily: 'var(--font-body)', color: '#9CA3AF' }}>Loading...</p>
          </div>
        )}

        {/* No prompt assigned yet */}
        {phase === 'no_prompt' && (
          <div style={{ textAlign: 'center', paddingTop: '80px' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>📝</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: '#1B4332', marginBottom: '8px' }}>
              No prompt assigned yet
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280', lineHeight: 1.7, marginBottom: '24px' }}>
              Your teacher hasn't assigned a writing prompt for this chapter yet. Check back soon!
            </p>
            <button onClick={() => router.push('/student/dashboard?section=english')} style={{ background: '#2D6A4F', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', padding: '12px 24px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>
              ← Back to English
            </button>
          </div>
        )}

        {/* Write phase */}
        {phase === 'write' && prompt && (
          <>
            {/* Chapter badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ background: '#D8F3DC', color: '#1B4332', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', padding: '4px 12px', borderRadius: '20px' }}>
                {chapter?.title}
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9CA3AF' }}>
                Due {deadlineStr}
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', color: '#1B4332', marginBottom: '8px' }}>
              ✍️ Writing prompt
            </h1>

            {/* The prompt */}
            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px 28px', marginBottom: '24px' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>Your prompt</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px', color: '#1B4332', lineHeight: 1.55 }}>
                {prompt.prompt_text}
              </p>
            </div>

            {/* Guidelines */}
            <div style={{ background: '#FEF3C7', borderRadius: '12px', border: '1px solid #FDE68A', padding: '14px 18px', marginBottom: '24px', display: 'flex', gap: '10px' }}>
              <span style={{ fontSize: '16px', flexShrink: 0 }}>💡</span>
              <div>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#92400E', marginBottom: '4px' }}>Writing guidelines</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#92400E', lineHeight: 1.6 }}>
                  Write between <strong>{prompt.min_words}</strong> and <strong>{prompt.max_words}</strong> words.
                  Use your own words. Refer to what you read in the chapter.
                  Your answer will be reviewed by your teacher before a final score is given.
                </p>
              </div>
            </div>

            {/* Text area */}
            <div style={{ marginBottom: '8px' }}>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Start writing your answer here..."
                rows={12}
                style={{ width: '100%', padding: '18px', borderRadius: '14px', border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-body)', fontSize: '15px', color: '#374151', outline: 'none', resize: 'vertical', lineHeight: 1.8 }}
              />
            </div>

            {/* Word count bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ flex: 1, height: '6px', background: '#E5E7EB', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '3px', transition: 'width 0.3s, background 0.3s', width: `${Math.min((wordCount / prompt.max_words) * 100, 100)}%`, background: wordCount < prompt.min_words ? '#F59E0B' : wordCount <= prompt.max_words ? '#10B981' : '#EF4444' }}/>
              </div>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: wordCount < prompt.min_words ? '#F59E0B' : wordCount <= prompt.max_words ? '#10B981' : '#EF4444', minWidth: '90px', textAlign: 'right' }}>
                {wordCount} / {prompt.max_words} words
              </p>
            </div>

            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#991B1B' }}>{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!canSubmit || submitting}
              style={{ background: canSubmit && !submitting ? '#2D6A4F' : '#E5E7EB', color: canSubmit && !submitting ? 'white' : '#9CA3AF', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', padding: '14px 32px', borderRadius: '12px', border: 'none', cursor: canSubmit && !submitting ? 'pointer' : 'not-allowed', transition: 'all 0.15s' }}
            >
              {submitting ? 'Submitting...' : 'Submit my answer →'}
            </button>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginTop: '10px' }}>
              Once submitted, your answer will be sent for AI evaluation and teacher review.
            </p>
          </>
        )}

        {/* Submitted — awaiting review */}
        {phase === 'submitted' && submission && prompt && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '32px' }}>⏳</div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '22px', color: '#1B4332', marginBottom: '8px' }}>Answer submitted!</h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7280', lineHeight: 1.7 }}>
                Your writing has been evaluated by AI and is now with your teacher for review.
                Your final score will appear here once your teacher releases it.
              </p>
            </div>

            {/* What they submitted */}
            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px', marginBottom: '16px' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>Your answer</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', lineHeight: 1.8 }}>{submission.content}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginTop: '10px' }}>{submission.word_count} words</p>
            </div>

            <div style={{ background: '#FEF3C7', borderRadius: '12px', border: '1px solid #FDE68A', padding: '14px 18px', marginBottom: '24px', display: 'flex', gap: '10px' }}>
              <span style={{ fontSize: '16px', flexShrink: 0 }}>📝</span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#92400E', lineHeight: 1.6 }}>
                Your teacher will review this soon. The score and feedback will appear here once released.
              </p>
            </div>

            <button onClick={() => router.push('/student/dashboard?section=english')} style={{ background: '#2D6A4F', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', padding: '12px 24px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>
              ← Back to English
            </button>
          </>
        )}

        {/* Released — show score and feedback */}
        {phase === 'released' && submission && prompt && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: submission.final_score! >= 16 ? '#D1FAE5' : submission.final_score! >= 12 ? '#FEF3C7' : '#FEE2E2', border: `4px solid ${scoreColor(submission.final_score!)}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: scoreColor(submission.final_score!), lineHeight: 1 }}>{submission.final_score}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: scoreColor(submission.final_score!) }}>/ 20</p>
              </div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '22px', color: '#1B4332', marginBottom: '8px' }}>Your writing score</h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>{chapter?.title}</p>
            </div>

            {/* AI Feedback */}
            {submission.ai_feedback && (
              <div style={{ background: '#F0FDF4', borderRadius: '16px', border: '1px solid #D8F3DC', padding: '20px 24px', marginBottom: '16px' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#40916C', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>Feedback</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1B4332', lineHeight: 1.75 }}>{submission.ai_feedback}</p>
              </div>
            )}

            {/* One thing to improve */}
            {submission.ai_improvement && (
              <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px 24px', marginBottom: '16px' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>One thing to improve</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', lineHeight: 1.75 }}>{submission.ai_improvement}</p>
              </div>
            )}

            {/* Teacher comment */}
            {submission.admin_comment && (
              <div style={{ background: '#EDE9FE', borderRadius: '16px', border: '1px solid #C4B5FD', padding: '20px 24px', marginBottom: '16px' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#5B21B6', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>Teacher's note</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#4C1D95', lineHeight: 1.75 }}>{submission.admin_comment}</p>
              </div>
            )}

            {/* Their answer */}
            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px 24px', marginBottom: '24px' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>Your answer</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', lineHeight: 1.8 }}>{submission.content}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginTop: '10px' }}>{submission.word_count} words</p>
            </div>

            <button onClick={() => router.push('/student/dashboard?section=english')} style={{ background: '#2D6A4F', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', padding: '12px 24px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>
              ← Back to English
            </button>
          </>
        )}
      </div>
    </div>
  )
}
