'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

const CHAPTERS = [
  { id: 1, title: 'Whistles and Shaving Bristles' },
  { id: 2, title: 'If I Were Lord of Tartary' },
  { id: 3, title: 'The Fun They Had' },
  { id: 4, title: 'In Morning Dew' },
  { id: 5, title: 'The Boy Who Outran the Wind — Milkha Singh' },
  { id: 6, title: 'The Blind Boy' },
  { id: 7, title: 'Three Questions' },
  { id: 8, title: 'From a Railway Carriage' },
]

interface Prompt {
  id: string
  chapter_id: number
  prompt_text: string
  min_words: number
  max_words: number
  deadline: string
  created_at: string
}

interface Submission {
  id: string
  student_id: string
  prompt_id: string
  chapter_id: number
  content: string
  word_count: number
  ai_score: number | null
  ai_feedback: string | null
  ai_improvement: string | null
  ai_breakdown: string | null
  final_score: number | null
  admin_comment: string | null
  status: 'submitted' | 'reviewed' | 'released'
  created_at: string
  profiles?: { full_name: string; email: string }
}

export default function AdminWritingPage() {
  const [tab,         setTab]         = useState<'prompts' | 'submissions'>('prompts')
  const [prompts,     setPrompts]     = useState<Prompt[]>([])
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading,     setLoading]     = useState(true)
  const [creating,    setCreating]    = useState(false)

  // Create prompt form
  const [form, setForm] = useState({
    chapter_id: 1, prompt_text: '', min_words: 80, max_words: 150,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  })
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')

  // Selected submission for review
  const [reviewing, setReviewing] = useState<Submission | null>(null)
  const [adminComment, setAdminComment] = useState('')
  const [overrideScore, setOverrideScore] = useState<string>('')
  const [releasing, setReleasing] = useState(false)

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    setLoading(true)
    const supabase = createClient()

    const { data: p } = await supabase
      .from('writing_prompts')
      .select('*')
      .order('created_at', { ascending: false })
    setPrompts((p || []) as Prompt[])

    const { data: s } = await supabase
      .from('writing_submissions')
      .select('*, profiles(full_name, email)')
      .order('created_at', { ascending: false })
    setSubmissions((s || []) as Submission[])

    setLoading(false)
  }

  const createPrompt = async () => {
    setFormError('')
    setFormSuccess('')
    if (!form.prompt_text.trim()) { setFormError('Please enter a prompt.'); return }
    if (form.min_words >= form.max_words) { setFormError('Min words must be less than max words.'); return }

    setCreating(true)
    const supabase = createClient()
    const { error } = await supabase.from('writing_prompts').insert({
      chapter_id:  form.chapter_id,
      prompt_text: form.prompt_text.trim(),
      min_words:   form.min_words,
      max_words:   form.max_words,
      deadline:    form.deadline,
    })
    setCreating(false)

    if (error) { setFormError('Failed to create prompt. Try again.'); return }
    setFormSuccess('Prompt created and published to all students!')
    setForm(f => ({ ...f, prompt_text: '' }))
    loadData()
  }

  const releaseToStudent = async () => {
    if (!reviewing) return
    setReleasing(true)
    const supabase = createClient()

    const finalScore = overrideScore !== '' ? Number(overrideScore) : reviewing.ai_score

    await supabase
      .from('writing_submissions')
      .update({
        final_score:   finalScore,
        admin_comment: adminComment.trim() || null,
        status:        'released',
      })
      .eq('id', reviewing.id)

    setReviewing(null)
    setAdminComment('')
    setOverrideScore('')
    setReleasing(false)
    loadData()
  }

  const parseBreakdown = (raw: string | null) => {
    if (!raw) return null
    try { return JSON.parse(raw) } catch { return null }
  }

  const statusBadge = (status: Submission['status']) => {
    const map = {
      submitted: { bg: '#FEF3C7', text: '#92400E', label: '⏳ Awaiting review' },
      reviewed:  { bg: '#EDE9FE', text: '#5B21B6', label: '📋 Reviewed' },
      released:  { bg: '#D8F3DC', text: '#1B4332', label: '✓ Released' },
    }
    return map[status]
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAF9', fontFamily: 'var(--font-body)' }}>
      <style>{`* { box-sizing: border-box; } textarea, input, select { font-family: var(--font-body) !important; }`}</style>

      {/* Header */}
      <div style={{ background: '#1B4332', padding: '16px 32px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: 'white' }}>
          ✍️ Writing Prompts — Admin
        </h1>
      </div>

      <div style={{ padding: '28px 32px 80px' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: 'white', borderRadius: '12px', padding: '4px', border: '1px solid #E5E7EB', width: 'fit-content', marginBottom: '28px' }}>
          {(['prompts', 'submissions'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', background: tab === t ? '#2D6A4F' : 'transparent', color: tab === t ? 'white' : '#6B7280', transition: 'all 0.15s' }}>
              {t === 'prompts' ? `Manage prompts (${prompts.length})` : `Submissions (${submissions.length})`}
            </button>
          ))}
        </div>

        {/* ── PROMPTS TAB ── */}
        {tab === 'prompts' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>

            {/* Create prompt */}
            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: '#1B4332', marginBottom: '20px' }}>
                Create new prompt
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '6px' }}>Chapter</label>
                  <select value={form.chapter_id} onChange={e => setForm(f => ({ ...f, chapter_id: Number(e.target.value) }))}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px', color: '#374151' }}>
                    {CHAPTERS.map(c => <option key={c.id} value={c.id}>{c.id}. {c.title}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '6px' }}>Writing prompt</label>
                  <textarea value={form.prompt_text} onChange={e => setForm(f => ({ ...f, prompt_text: e.target.value }))}
                    placeholder="e.g. Write about a rule in your family that you think is unusual but useful."
                    rows={4} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px', color: '#374151', resize: 'vertical' }}/>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '6px' }}>Min words</label>
                    <input type="number" value={form.min_words} onChange={e => setForm(f => ({ ...f, min_words: Number(e.target.value) }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px', color: '#374151' }}/>
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '6px' }}>Max words</label>
                    <input type="number" value={form.max_words} onChange={e => setForm(f => ({ ...f, max_words: Number(e.target.value) }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px', color: '#374151' }}/>
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '6px' }}>Deadline</label>
                  <input type="date" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px', color: '#374151' }}/>
                </div>

                {formError && <p style={{ fontSize: '13px', color: '#EF4444' }}>{formError}</p>}
                {formSuccess && <p style={{ fontSize: '13px', color: '#10B981' }}>{formSuccess}</p>}

                <button onClick={createPrompt} disabled={creating}
                  style={{ background: creating ? '#E5E7EB' : '#2D6A4F', color: creating ? '#9CA3AF' : 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', padding: '12px', borderRadius: '10px', border: 'none', cursor: creating ? 'not-allowed' : 'pointer' }}>
                  {creating ? 'Publishing...' : 'Publish prompt →'}
                </button>
              </div>
            </div>

            {/* Existing prompts */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: '#1B4332', marginBottom: '16px' }}>
                Published prompts
              </h2>
              {loading ? <p style={{ color: '#9CA3AF', fontSize: '14px' }}>Loading...</p> : prompts.length === 0 ? (
                <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '40px 24px', textAlign: 'center' }}>
                  <p style={{ color: '#9CA3AF', fontSize: '14px' }}>No prompts yet. Create one to get started.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {prompts.map(p => {
                    const ch = CHAPTERS.find(c => c.id === p.chapter_id)
                    const subCount = submissions.filter(s => s.prompt_id === p.id).length
                    return (
                      <div key={p.id} style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '16px 20px' }}>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>Chapter {p.chapter_id} — {ch?.title}</p>
                        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', marginBottom: '10px', lineHeight: 1.4 }}>{p.prompt_text}</p>
                        <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#9CA3AF' }}>
                          <span>📅 Due {new Date(p.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                          <span>📝 {p.min_words}–{p.max_words} words</span>
                          <span>📬 {subCount} submission{subCount !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── SUBMISSIONS TAB ── */}
        {tab === 'submissions' && (
          <div style={{ display: 'grid', gridTemplateColumns: reviewing ? '1fr 1fr' : '1fr', gap: '24px', alignItems: 'start' }}>

            {/* Submissions list */}
            <div>
              {loading ? <p style={{ color: '#9CA3AF', fontSize: '14px' }}>Loading...</p> : submissions.length === 0 ? (
                <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '60px 24px', textAlign: 'center' }}>
                  <p style={{ color: '#9CA3AF', fontSize: '14px' }}>No submissions yet.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {submissions.map(sub => {
                    const badge = statusBadge(sub.status)
                    const ch = CHAPTERS.find(c => c.id === sub.chapter_id)
                    return (
                      <div key={sub.id} style={{ background: 'white', borderRadius: '14px', border: reviewing?.id === sub.id ? '2px solid #2D6A4F' : '1px solid #E5E7EB', padding: '16px 20px', cursor: sub.status !== 'released' ? 'pointer' : 'default' }}
                        onClick={() => { if (sub.status !== 'released') { setReviewing(sub); setAdminComment(sub.admin_comment || ''); setOverrideScore('') } }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', gap: '12px' }}>
                          <div>
                            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332' }}>
                              {sub.profiles?.full_name || 'Student'}
                            </p>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>Ch. {sub.chapter_id} — {ch?.title}</p>
                          </div>
                          <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontFamily: 'var(--font-heading)', fontWeight: 700, background: badge.bg, color: badge.text, flexShrink: 0 }}>
                            {badge.label}
                          </span>
                        </div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7280', lineHeight: 1.5, marginBottom: '8px' }}>
                          {sub.content.slice(0, 120)}{sub.content.length > 120 ? '...' : ''}
                        </p>
                        <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#9CA3AF', flexWrap: 'wrap' }}>
                          <span>{sub.word_count} words</span>
                          {sub.ai_score !== null && <span>AI score: <strong style={{ color: '#374151' }}>{sub.ai_score}/20</strong></span>}
                          {sub.final_score !== null && <span>Final: <strong style={{ color: '#2D6A4F' }}>{sub.final_score}/20</strong></span>}
                          <span>{new Date(sub.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                        </div>
                        {sub.status !== 'released' && (
                          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '12px', color: '#2D6A4F', marginTop: '8px' }}>
                            Click to review and release →
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Review panel */}
            {reviewing && (
              <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px', position: 'sticky', top: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: '#1B4332' }}>Review submission</h2>
                  <button onClick={() => setReviewing(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#9CA3AF' }}>×</button>
                </div>

                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332', marginBottom: '4px' }}>
                  {reviewing.profiles?.full_name}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginBottom: '16px' }}>
                  {reviewing.word_count} words · Submitted {new Date(reviewing.created_at).toLocaleDateString()}
                </p>

                {/* Student's answer */}
                <div style={{ background: '#F8FAF9', borderRadius: '10px', padding: '14px', marginBottom: '16px', maxHeight: '180px', overflowY: 'auto' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', lineHeight: 1.7 }}>{reviewing.content}</p>
                </div>

                {/* AI scores */}
                {reviewing.ai_score !== null && (
                  <div style={{ background: '#F0FDF4', borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#40916C', marginBottom: '10px' }}>AI evaluation — {reviewing.ai_score}/20</p>
                    {reviewing.ai_breakdown && (() => {
                      const b = parseBreakdown(reviewing.ai_breakdown)
                      if (!b) return null
                      return (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '10px' }}>
                          {[['Relevance', b.relevance], ['Understanding', b.understanding], ['Language', b.language], ['Effort', b.effort]].map(([label, score]) => (
                            <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                              <span style={{ color: '#6B7280' }}>{label}</span>
                              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#1B4332' }}>{score}/5</span>
                            </div>
                          ))}
                        </div>
                      )
                    })()}
                    {reviewing.ai_feedback && <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#065F46', lineHeight: 1.6, marginBottom: '6px' }}>{reviewing.ai_feedback}</p>}
                    {reviewing.ai_improvement && <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#065F46', fontStyle: 'italic' }}>Improve: {reviewing.ai_improvement}</p>}
                  </div>
                )}

                {/* Override score */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '6px' }}>
                    Final score (leave blank to use AI score of {reviewing.ai_score}/20)
                  </label>
                  <input type="number" min={0} max={20} value={overrideScore} onChange={e => setOverrideScore(e.target.value)}
                    placeholder={`${reviewing.ai_score ?? '—'}`}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px', color: '#374151' }}/>
                </div>

                {/* Teacher comment */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '6px' }}>
                    Teacher's note (optional — shown to student)
                  </label>
                  <textarea value={adminComment} onChange={e => setAdminComment(e.target.value)}
                    placeholder="e.g. Lovely effort! Your last paragraph was particularly well written."
                    rows={3} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px', color: '#374151', resize: 'none' }}/>
                </div>

                <button onClick={releaseToStudent} disabled={releasing}
                  style={{ width: '100%', background: releasing ? '#E5E7EB' : '#2D6A4F', color: releasing ? '#9CA3AF' : 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', padding: '12px', borderRadius: '10px', border: 'none', cursor: releasing ? 'not-allowed' : 'pointer' }}>
                  {releasing ? 'Releasing...' : '✓ Release score to student'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
