'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

// ── Subject + Chapter map ─────────────────────────────────────────────────────

const SUBJECT_CHAPTERS: Record<string, { id: number; title: string }[]> = {
  maths: [
    { id: 1,  title: 'Whole Numbers' },
    { id: 2,  title: 'H.C.F. and L.C.M.' },
    { id: 3,  title: 'Area and Perimeter' },
    { id: 4,  title: 'Volume' },
    { id: 5,  title: 'Fractions' },
    { id: 6,  title: 'Percentage' },
    { id: 7,  title: 'Ratio and Proportion' },
    { id: 8,  title: 'Basic Geometrical Concepts' },
    { id: 9,  title: 'Angles' },
    { id: 10, title: 'Circles' },
    { id: 11, title: 'Vedic Knowledge' },
  ],
  science: [
    { id: 1, title: 'Magnetism' },
    { id: 2, title: 'Simple Machines' },
    { id: 3, title: 'Work and Energy' },
    { id: 4, title: 'Introduction to Chemistry' },
    { id: 5, title: 'Structure of Atom' },
    { id: 6, title: 'Physical and Chemical Changes' },
    { id: 7, title: 'Cell – The Basic Unit of Life' },
    { id: 8, title: 'The Leaf' },
    { id: 9, title: 'Human Body: Respiratory System' },
  ],
  english: [
    { id: 1, title: 'The Fun They Had' },
    { id: 2, title: 'The Sound of Music' },
    { id: 3, title: 'The Portrait of a Lady' },
    { id: 4, title: 'A Truly Beautiful Mind' },
    { id: 5, title: 'The Ashes That Made Trees Bloom' },
    { id: 6, title: 'Iswaran the Storyteller' },
    { id: 7, title: 'Fair Play' },
    { id: 8, title: 'The Bond of Love' },
  ],
  history: [
    { id: 1, title: 'The Vedas — Our Sacred Heritage' },
    { id: 2, title: 'Essence of Hinduism' },
    { id: 3, title: 'The Great Preachers' },
    { id: 4, title: 'The Preamble' },
    { id: 5, title: 'India Lives in Villages' },
    { id: 6, title: 'The Power of Determination' },
  ],
  geography: [
    { id: 1, title: 'The Earth and Its Structure' },
    { id: 2, title: 'Latitudes and Longitudes' },
    { id: 3, title: 'Motions of the Earth' },
    { id: 4, title: 'Maps' },
    { id: 5, title: 'Natural Vegetation and Wildlife' },
    { id: 6, title: 'Our Country India' },
    { id: 7, title: 'India: Climate, Vegetation and Wildlife' },
  ],
  sanskrit: [
    { id: 1, title: 'Prarthana (Prayer)' },
    { id: 2, title: 'Vivekananda' },
    { id: 3, title: 'Sanchalana Geetam' },
    { id: 4, title: 'Sanskritabhasha Grihe Grihe' },
    { id: 5, title: 'Sankhyah (Numbers 21-40)' },
    { id: 6, title: 'Sandhi' },
    { id: 7, title: 'Bhutakalah (Past Tense)' },
    { id: 8, title: 'Sambhashanam (Conversation)' },
  ],
  ict: [
    { id: 1, title: 'Introduction to Computers' },
    { id: 2, title: 'Input and Output Devices' },
    { id: 3, title: 'Storage Devices' },
    { id: 4, title: 'MS Word' },
    { id: 5, title: 'The Internet' },
  ],
}

const SUBJECT_LABELS: Record<string, { label: string; emoji: string; color: string }> = {
  maths:    { label: 'Mathematics', emoji: '📐', color: '#1E40AF' },
  science:  { label: 'Science',     emoji: '🔬', color: '#065F46' },
  english:  { label: 'English',     emoji: '📚', color: '#7C3AED' },
  history:  { label: 'History & Civics', emoji: '🏛️', color: '#92400E' },
  geography:{ label: 'Geography',   emoji: '🌍', color: '#065F46' },
  sanskrit: { label: 'Sanskrit',    emoji: '🕉️', color: '#B45309' },
  ict:      { label: 'ICT',         emoji: '💻', color: '#0369A1' },
}

interface ClassQuestion {
  id: string
  subject: string
  chapter_id: number
  chapter_title: string
  question: string
  model_answer: string
  created_at: string
  is_active: boolean
}

// ── Main component ────────────────────────────────────────────────────────────

export function QuestionsContent() {
  const router = useRouter()

  // Auth / access
  const [checking, setChecking]   = useState(true)
  const [isAdmin,  setIsAdmin]    = useState(false)

  // Questions list
  const [questions, setQuestions] = useState<ClassQuestion[]>([])
  const [adminName, setAdminName] = useState('Admin')
  const [loading,   setLoading]   = useState(false)

  // Filter
  const [filterSubject, setFilterSubject] = useState<string>('all')

  // Form state
  const [showForm,      setShowForm]      = useState(false)
  const [formSubject,   setFormSubject]   = useState('maths')
  const [formChapter,   setFormChapter]   = useState<number>(1)
  const [formQuestion,  setFormQuestion]  = useState('')
  const [formAnswer,    setFormAnswer]    = useState('')
  const [saving,        setSaving]        = useState(false)
  const [saveMsg,       setSaveMsg]       = useState('')

  // Delete confirm
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // ── Auth check ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const check = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle()
      if (profile?.role !== 'admin') { router.push('/student/dashboard'); return }
      setIsAdmin(true)
      setChecking(false)
    }
    check()
  }, [router])

  // ── Load questions ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isAdmin) return
    loadQuestions()
  }, [isAdmin])

  const loadQuestions = async () => {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('class_questions')
      .select('*')
      .order('created_at', { ascending: false })
    setQuestions(data || [])
    setLoading(false)
  }

  // When subject changes in form, reset chapter to first
  useEffect(() => {
    const chapters = SUBJECT_CHAPTERS[formSubject]
    if (chapters?.length) setFormChapter(chapters[0].id)
  }, [formSubject])

  // ── Save question ───────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!formQuestion.trim() || !formAnswer.trim()) {
      setSaveMsg('Please fill in both the question and the model answer.')
      return
    }
    setSaving(true)
    setSaveMsg('')
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const chapterTitle = SUBJECT_CHAPTERS[formSubject]?.find(c => c.id === formChapter)?.title || ''
    const { error } = await supabase.from('class_questions').insert({
      subject:       formSubject,
      chapter_id:    formChapter,
      chapter_title: chapterTitle,
      question:      formQuestion.trim(),
      model_answer:  formAnswer.trim(),
      created_by:    user?.id,
    })
    if (error) {
      setSaveMsg('Error saving. Please try again.')
    } else {
      setSaveMsg('Question saved successfully!')
      setFormQuestion('')
      setFormAnswer('')
      setShowForm(false)
      loadQuestions()
    }
    setSaving(false)
    setTimeout(() => setSaveMsg(''), 3000)
  }

  // ── Toggle active ───────────────────────────────────────────────────────────
  const toggleActive = async (q: ClassQuestion) => {
    const supabase = createClient()
    await supabase.from('class_questions').update({ is_active: !q.is_active }).eq('id', q.id)
    loadQuestions()
  }

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    const supabase = createClient()
    await supabase.from('class_questions').delete().eq('id', id)
    setDeleteId(null)
    loadQuestions()
  }

  // ── Filtered list ───────────────────────────────────────────────────────────
  const filtered = filterSubject === 'all'
    ? questions
    : questions.filter(q => q.subject === filterSubject)

  // ── Loading / access check ──────────────────────────────────────────────────
  if (checking) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#F8FAFC' }}>
      <p style={{ fontFamily: 'var(--font-body)', color: '#9CA3AF' }}>Checking access...</p>
    </div>
  )

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: '800px' }}>

      {/* Top bar */}
      <div style={{ background: '#1B4332', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', background: '#D8F3DC', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '18px' }}>📝</span>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '18px', color: 'white', lineHeight: 1 }}>Class Questions</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Admin Panel — Gyaanpravaha</p>
          </div>
        </div>
        <button
          onClick={() => { setShowForm(true); setSaveMsg('') }}
          style={{ background: '#52B788', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span style={{ fontSize: '16px' }}>+</span> Add Question
        </button>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
          {[
            { label: 'Total questions', value: questions.length, color: '#1B4332', bg: '#D8F3DC' },
            { label: 'Active',          value: questions.filter(q => q.is_active).length, color: '#065F46', bg: '#A7F3D0' },
            { label: 'Hidden',          value: questions.filter(q => !q.is_active).length, color: '#92400E', bg: '#FEF3C7' },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, borderRadius: '14px', padding: '16px 24px', minWidth: '140px' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: s.color, lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: s.color, marginTop: '4px', opacity: 0.8 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Subject filter */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <button
            onClick={() => setFilterSubject('all')}
            style={{ padding: '6px 16px', borderRadius: '20px', border: filterSubject === 'all' ? '2px solid #1B4332' : '1px solid #E5E7EB', background: filterSubject === 'all' ? '#1B4332' : 'white', color: filterSubject === 'all' ? 'white' : '#374151', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}
          >
            All
          </button>
          {Object.entries(SUBJECT_LABELS).map(([key, s]) => (
            <button
              key={key}
              onClick={() => setFilterSubject(key)}
              style={{ padding: '6px 16px', borderRadius: '20px', border: filterSubject === key ? `2px solid ${s.color}` : '1px solid #E5E7EB', background: filterSubject === key ? s.color : 'white', color: filterSubject === key ? 'white' : '#374151', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}
            >
              {s.emoji} {s.label}
            </button>
          ))}
        </div>

        {/* Questions list */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#9CA3AF', fontFamily: 'var(--font-body)' }}>Loading questions...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
            <p style={{ fontSize: '40px', marginBottom: '12px' }}>📭</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', color: '#374151' }}>No questions yet</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#9CA3AF', marginTop: '4px' }}>Click "Add Question" to get started.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map(q => {
              const subj = SUBJECT_LABELS[q.subject]
              return (
                <div key={q.id} style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px 24px', opacity: q.is_active ? 1 : 0.6 }}>
                  {/* Header row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span style={{ background: subj?.color || '#374151', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', padding: '3px 10px', borderRadius: '10px' }}>
                      {subj?.emoji} {subj?.label}
                    </span>
                    <span style={{ background: '#F3F4F6', color: '#374151', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '11px', padding: '3px 10px', borderRadius: '10px' }}>
                      Ch {q.chapter_id}: {q.chapter_title}
                    </span>
                    {!q.is_active && (
                      <span style={{ background: '#FEF3C7', color: '#92400E', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', padding: '3px 10px', borderRadius: '10px' }}>
                        Hidden
                      </span>
                    )}
                    <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>
                      {new Date(q.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  {/* Question */}
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: '#1B4332', marginBottom: '10px', lineHeight: 1.5 }}>
                    Q: {q.question}
                  </p>

                  {/* Model answer */}
                  <div style={{ background: '#F0FDF4', borderRadius: '10px', padding: '12px 16px', marginBottom: '14px', borderLeft: '3px solid #52B788' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#2D6A4F', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Model Answer</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>{q.model_answer}</p>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => toggleActive(q)}
                      style={{ padding: '7px 16px', borderRadius: '8px', border: '1px solid #E5E7EB', background: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#374151', cursor: 'pointer' }}
                    >
                      {q.is_active ? '👁 Hide' : '👁 Show'}
                    </button>
                    <button
                      onClick={() => setDeleteId(q.id)}
                      style={{ padding: '7px 16px', borderRadius: '8px', border: '1px solid #FEE2E2', background: '#FFF5F5', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#DC2626', cursor: 'pointer' }}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Add question modal ──────────────────────────────────────────────── */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color: '#1B4332' }}>Add Class Question</h2>
              <button onClick={() => setShowForm(false)} style={{ background: '#F3F4F6', border: 'none', borderRadius: '8px', width: '32px', height: '32px', cursor: 'pointer', fontSize: '16px', color: '#374151' }}>✕</button>
            </div>

            {/* Subject */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Subject</label>
              <select
                value={formSubject}
                onChange={e => setFormSubject(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E5E7EB', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', background: 'white', outline: 'none' }}
              >
                {Object.entries(SUBJECT_LABELS).map(([key, s]) => (
                  <option key={key} value={key}>{s.emoji} {s.label}</option>
                ))}
              </select>
            </div>

            {/* Chapter */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Chapter</label>
              <select
                value={formChapter}
                onChange={e => setFormChapter(Number(e.target.value))}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E5E7EB', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', background: 'white', outline: 'none' }}
              >
                {(SUBJECT_CHAPTERS[formSubject] || []).map(c => (
                  <option key={c.id} value={c.id}>Ch {c.id}: {c.title}</option>
                ))}
              </select>
            </div>

            {/* Question */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Question</label>
              <textarea
                value={formQuestion}
                onChange={e => setFormQuestion(e.target.value)}
                placeholder="Type the question here..."
                rows={3}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #E5E7EB', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            {/* Model answer */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#374151', marginBottom: '6px' }}>
                Model Answer / Marking Guide
              </label>
              <textarea
                value={formAnswer}
                onChange={e => setFormAnswer(e.target.value)}
                placeholder="Write the expected answer or marking guide..."
                rows={5}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #E5E7EB', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            {/* Save message */}
            {saveMsg && (
              <div style={{ background: saveMsg.includes('Error') ? '#FEF2F2' : '#F0FDF4', border: `1px solid ${saveMsg.includes('Error') ? '#FCA5A5' : '#86EFAC'}`, borderRadius: '10px', padding: '10px 14px', marginBottom: '16px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: saveMsg.includes('Error') ? '#DC2626' : '#166534' }}>{saveMsg}</p>
              </div>
            )}

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowForm(false)}
                style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #E5E7EB', background: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#374151', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{ flex: 2, padding: '12px', borderRadius: '10px', border: 'none', background: saving ? '#9CA3AF' : '#1B4332', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: 'white', cursor: saving ? 'not-allowed' : 'pointer' }}
              >
                {saving ? 'Saving...' : '✓ Save Question'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirm modal ────────────────────────────────────────────── */}
      {deleteId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
            <p style={{ fontSize: '40px', marginBottom: '12px' }}>🗑️</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '18px', color: '#1B4332', marginBottom: '8px' }}>Delete this question?</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>This action cannot be undone. All student attempts for this question will also be removed.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setDeleteId(null)}
                style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #E5E7EB', background: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#374151', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: '#DC2626', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: 'white', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuestionsContent
