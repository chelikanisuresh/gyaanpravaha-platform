'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Student {
  id: string
  full_name: string
  email: string
}

interface LessonProgress {
  student_id: string
  subject: string
  chapter_id: number
}

interface QuizAttempt {
  student_id: string
  subject: string
  chapter_id: number
  score: number
  marks_earned: number
  total_marks: number
  created_at: string
}

interface ClassQuestion {
  id: string
  subject: string
  chapter_title: string
  question: string
  is_active: boolean
  created_at: string
}

interface QuestionAttempt {
  student_id: string
  question_id: string
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const SUBJECT_LABELS: Record<string, { label: string; emoji: string; color: string; total: number }> = {
  english:   { label: 'English',        emoji: '📚', color: '#7C3AED', total: 8  },
  maths:     { label: 'Mathematics',    emoji: '📐', color: '#1E40AF', total: 11 },
  science:   { label: 'Science',        emoji: '🔬', color: '#065F46', total: 9  },
  history:   { label: 'History & Civics', emoji: '🏛️', color: '#92400E', total: 6 },
  geography: { label: 'Geography',      emoji: '🌍', color: '#065F46', total: 7  },
  sanskrit:  { label: 'Sanskrit',       emoji: '🕉️', color: '#B45309', total: 8  },
  ict:       { label: 'ICT',            emoji: '💻', color: '#0369A1', total: 5  },
}

function scoreColor(score: number) {
  if (score >= 80) return '#10B981'
  if (score >= 60) return '#F59E0B'
  return '#EF4444'
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const router = useRouter()

  const [checking,         setChecking]         = useState(true)
  const [adminName,        setAdminName]         = useState('Admin')
  const [activeTab,        setActiveTab]         = useState<'overview' | 'students' | 'questions'>('overview')

  // Data
  const [students,         setStudents]          = useState<Student[]>([])
  const [lessonProgress,   setLessonProgress]    = useState<LessonProgress[]>([])
  const [quizAttempts,     setQuizAttempts]      = useState<QuizAttempt[]>([])
  const [classQuestions,   setClassQuestions]    = useState<ClassQuestion[]>([])
  const [questionAttempts, setQuestionAttempts]  = useState<QuestionAttempt[]>([])
  const [loading,          setLoading]           = useState(true)

  // Student detail panel
  const [selectedStudent,  setSelectedStudent]   = useState<Student | null>(null)

  // ── Auth check ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const check = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/admin/login'); return }
      const { data: profile } = await supabase.from('profiles').select('role, full_name').eq('id', user.id).maybeSingle()
      if (profile?.role !== 'admin') { router.push('/admin/login'); return }
      setAdminName(profile.full_name?.split(' ')[0] || 'Admin')
      setChecking(false)
      loadData()
    }
    check()
  }, [router])

  // ── Load all data ───────────────────────────────────────────────────────────
  const loadData = async () => {
    setLoading(true)
    const supabase = createClient()

    const [
      { data: studentsData },
      { data: progressData },
      { data: quizData },
      { data: questionsData },
      { data: qAttemptsData },
    ] = await Promise.all([
      supabase.from('profiles').select('id, full_name, email').eq('role', 'student').order('full_name'),
      supabase.from('student_lesson_progress').select('student_id, subject, chapter_id'),
      supabase.from('student_quiz_attempts').select('student_id, subject, chapter_id, score, marks_earned, total_marks, created_at').order('created_at', { ascending: false }),
      supabase.from('class_questions').select('id, subject, chapter_title, question, is_active, created_at').order('created_at', { ascending: false }),
      supabase.from('class_question_attempts').select('student_id, question_id'),
    ])

    setStudents(studentsData || [])
    setLessonProgress(progressData || [])
    setQuizAttempts(quizData || [])
    setClassQuestions(questionsData || [])
    setQuestionAttempts(qAttemptsData || [])
    setLoading(false)
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  // ── Computed stats ──────────────────────────────────────────────────────────

  const totalChaptersCompleted = (() => {
    const map: Record<string, Set<string>> = {}
    lessonProgress.forEach(p => {
      const key = `${p.student_id}-${p.subject}-${p.chapter_id}`
      if (!map[p.student_id]) map[p.student_id] = new Set()
      map[p.student_id].add(`${p.subject}-${p.chapter_id}`)
    })
    return Object.values(map).reduce((sum, s) => sum + s.size, 0)
  })()

  // Sections completed per student per subject-chapter
  const sectionCountMap: Record<string, number> = {}
  lessonProgress.forEach(p => {
    const key = `${p.student_id}-${p.subject}-${p.chapter_id}`
    sectionCountMap[key] = (sectionCountMap[key] || 0) + 1
  })

  // Best quiz score per student per subject-chapter
  const bestScoreMap: Record<string, number> = {}
  quizAttempts.forEach(a => {
    const key = `${a.student_id}-${a.subject}-${a.chapter_id}`
    if (!(key in bestScoreMap) || a.score > bestScoreMap[key]) {
      bestScoreMap[key] = a.score
    }
  })

  if (checking) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#F8FAFC' }}>
      <p style={{ fontFamily: 'var(--font-body)', color: '#9CA3AF' }}>Checking access...</p>
    </div>
  )

  // ── Student detail panel ────────────────────────────────────────────────────
  if (selectedStudent) {
    const sp = lessonProgress.filter(p => p.student_id === selectedStudent.id)
    const sq = quizAttempts.filter(a => a.student_id === selectedStudent.id)
    const sqSet: Record<string, Record<number, number>> = {}
    sq.forEach(a => {
      if (!sqSet[a.subject]) sqSet[a.subject] = {}
      if (!(a.chapter_id in sqSet[a.subject]) || a.score > sqSet[a.subject][a.chapter_id]) {
        sqSet[a.subject][a.chapter_id] = a.score
      }
    })
    const spMap: Record<string, Set<number>> = {}
    sp.forEach(p => {
      if (!spMap[p.subject]) spMap[p.subject] = new Set()
      spMap[p.subject].add(p.chapter_id)
    })

    return (
      <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
        {/* Top bar */}
        <div style={{ background: '#1B4332', padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setSelectedStudent(null)}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', padding: '8px 14px', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            ← Back
          </button>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '16px', color: 'white', lineHeight: 1 }}>{selectedStudent.full_name}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{selectedStudent.email}</p>
          </div>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.entries(SUBJECT_LABELS).map(([key, s]) => {
              const chaptersRead    = spMap[key]?.size || 0
              const quizzesTaken   = Object.keys(sqSet[key] || {}).length
              const avgScore       = quizzesTaken
                ? Math.round(Object.values(sqSet[key] || {}).reduce((a, b) => a + b, 0) / quizzesTaken)
                : null

              return (
                <div key={key} style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <span style={{ fontSize: '22px' }}>{s.emoji}</span>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: '#1B4332' }}>{s.label}</p>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                      <span style={{ background: '#F3F4F6', borderRadius: '10px', padding: '4px 12px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#374151' }}>
                        {chaptersRead}/{s.total} chapters
                      </span>
                      {avgScore !== null && (
                        <span style={{ background: '#F3F4F6', borderRadius: '10px', padding: '4px 12px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: scoreColor(avgScore) }}>
                          Avg: {avgScore}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Chapter breakdown */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {Array.from({ length: s.total }, (_, i) => i + 1).map(chId => {
                      const read  = spMap[key]?.has(chId)
                      const score = sqSet[key]?.[chId]
                      return (
                        <div key={chId} style={{
                          width: '44px', height: '44px', borderRadius: '10px',
                          background: read ? (score != null ? '#D8F3DC' : '#DBEAFE') : '#F3F4F6',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                          border: read ? '1px solid #B7E4C7' : '1px solid #E5E7EB',
                        }}>
                          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '11px', color: read ? '#1B4332' : '#D1D5DB', lineHeight: 1 }}>{chId}</p>
                          {score != null && <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', color: scoreColor(score), marginTop: '2px' }}>{score}%</p>}
                        </div>
                      )
                    })}
                  </div>
                  {chaptersRead === 0 && (
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#D1D5DB', marginTop: '10px' }}>No activity yet</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // ── Main dashboard ──────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>

      {/* Top bar */}
      <div style={{ background: '#1B4332', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', background: '#D8F3DC', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
            🛡️
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '18px', color: 'white', lineHeight: 1 }}>Gyaanpravaha Admin</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Welcome back, {adminName}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link href="/admin/questions" style={{ background: '#52B788', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', padding: '9px 18px', borderRadius: '10px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
            📝 Manage Questions
          </Link>
          <button
            onClick={handleSignOut}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '10px', padding: '9px 16px', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
          >
            Sign out
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          {[
            { label: 'Total students',     value: students.length,                              bg: '#DBEAFE', color: '#1E40AF', emoji: '🎓' },
            { label: 'Chapters completed', value: totalChaptersCompleted,                       bg: '#D8F3DC', color: '#1B4332', emoji: '📖' },
            { label: 'Quiz attempts',      value: quizAttempts.length,                          bg: '#FEF3C7', color: '#92400E', emoji: '📝' },
            { label: 'Class questions',    value: classQuestions.filter(q => q.is_active).length, bg: '#FDF4FF', color: '#7E22CE', emoji: '❓' },
            { label: 'Q&A answers given',  value: questionAttempts.length,                      bg: '#F0FDF4', color: '#065F46', emoji: '✍️' },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '22px' }}>{s.emoji}</span>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: s.color, lineHeight: 1 }}>{loading ? '—' : s.value}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: s.color, opacity: 0.75 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', background: '#F3F4F6', borderRadius: '12px', padding: '4px', width: 'fit-content' }}>
          {(['overview', 'students', 'questions'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 20px', borderRadius: '10px', border: 'none',
                background: activeTab === tab ? 'white' : 'transparent',
                fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px',
                color: activeTab === tab ? '#1B4332' : '#9CA3AF',
                cursor: 'pointer',
                boxShadow: activeTab === tab ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              {tab === 'overview' ? '📊 Overview' : tab === 'students' ? '🎓 Students' : '📝 Questions'}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#9CA3AF', fontFamily: 'var(--font-body)' }}>Loading data...</div>
        ) : (
          <>
            {/* ── OVERVIEW TAB ─────────────────────────────────────────────── */}
            {activeTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {Object.entries(SUBJECT_LABELS).map(([key, s]) => {
                  const subjectProgress = lessonProgress.filter(p => p.subject === key)
                  const subjectQuizzes  = quizAttempts.filter(a => a.subject === key)

                  // Unique chapters completed across all students
                  const chaptersCompletedSet = new Set(subjectProgress.map(p => `${p.student_id}-${p.chapter_id}`))

                  // Best quiz score per student-chapter
                  const bestMap: Record<string, number> = {}
                  subjectQuizzes.forEach(a => {
                    const k = `${a.student_id}-${a.chapter_id}`
                    if (!(k in bestMap) || a.score > bestMap[k]) bestMap[k] = a.score
                  })
                  const avgScore = Object.values(bestMap).length
                    ? Math.round(Object.values(bestMap).reduce((a, b) => a + b, 0) / Object.values(bestMap).length)
                    : null

                  // Students who started this subject
                  const studentsStarted = new Set(subjectProgress.map(p => p.student_id)).size

                  return (
                    <div key={key} style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '20px' }}>{s.emoji}</span>
                        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: '#1B4332' }}>{s.label}</p>
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ background: '#F3F4F6', borderRadius: '10px', padding: '4px 12px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#374151' }}>
                            👥 {studentsStarted}/{students.length} students started
                          </span>
                          <span style={{ background: '#F3F4F6', borderRadius: '10px', padding: '4px 12px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#374151' }}>
                            📖 {chaptersCompletedSet.size} chapter completions
                          </span>
                          {avgScore !== null && (
                            <span style={{ background: '#F3F4F6', borderRadius: '10px', padding: '4px 12px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: scoreColor(avgScore) }}>
                              📊 Avg quiz: {avgScore}%
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Per-chapter completion bar */}
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {Array.from({ length: s.total }, (_, i) => i + 1).map(chId => {
                          const completions = students.filter(st =>
                            subjectProgress.some(p => p.student_id === st.id && p.chapter_id === chId)
                          ).length
                          const pct = students.length ? Math.round((completions / students.length) * 100) : 0
                          return (
                            <div key={chId} title={`Chapter ${chId}: ${completions}/${students.length} students`} style={{ flex: 1 }}>
                              <div style={{ height: '32px', background: '#F3F4F6', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                                <div style={{ height: '100%', width: `${pct}%`, background: s.color, opacity: 0.7, transition: 'width 0.5s' }}/>
                                <p style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '10px', color: pct > 40 ? 'white' : '#9CA3AF', margin: 0 }}>
                                  {chId}
                                </p>
                              </div>
                              <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#9CA3AF', textAlign: 'center', marginTop: '3px' }}>{pct}%</p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* ── STUDENTS TAB ─────────────────────────────────────────────── */}
            {activeTab === 'students' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {students.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
                    <p style={{ fontFamily: 'var(--font-body)', color: '#9CA3AF' }}>No students found.</p>
                  </div>
                ) : students.map(student => {
                  const sp = lessonProgress.filter(p => p.student_id === student.id)
                  const sq = quizAttempts.filter(a => a.student_id === student.id)

                  // Unique chapter completions
                  const chapDone = new Set(sp.map(p => `${p.subject}-${p.chapter_id}`)).size

                  // Average quiz score
                  const bestMap: Record<string, number> = {}
                  sq.forEach(a => {
                    const k = `${a.subject}-${a.chapter_id}`
                    if (!(k in bestMap) || a.score > bestMap[k]) bestMap[k] = a.score
                  })
                  const scores = Object.values(bestMap)
                  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null

                  // Last activity
                  const lastActivity = sq[0]?.created_at
                    ? new Date(sq[0].created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
                    : sp.length ? 'Reading' : 'No activity'

                  return (
                    <button
                      key={student.id}
                      onClick={() => setSelectedStudent(student)}
                      style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'box-shadow 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.06)'}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                    >
                      {/* Avatar */}
                      <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#D8F3DC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '18px', color: '#1B4332', flexShrink: 0 }}>
                        {student.full_name?.[0] || 'S'}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: '#1B4332', marginBottom: '4px' }}>{student.full_name}</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>{student.email}</p>
                      </div>

                      {/* Stats */}
                      <div style={{ display: 'flex', gap: '10px', flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        <div style={{ textAlign: 'center' }}>
                          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: '#1E40AF', lineHeight: 1 }}>{chapDone}</p>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#9CA3AF', marginTop: '2px' }}>chapters</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: avgScore ? scoreColor(avgScore) : '#D1D5DB', lineHeight: 1 }}>
                            {avgScore != null ? `${avgScore}%` : '—'}
                          </p>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#9CA3AF', marginTop: '2px' }}>avg score</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', lineHeight: 1.3 }}>{lastActivity}</p>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#D1D5DB', marginTop: '2px' }}>last active</p>
                        </div>
                      </div>

                      <span style={{ color: '#D1D5DB', fontSize: '18px', flexShrink: 0 }}>›</span>
                    </button>
                  )
                })}
              </div>
            )}

            {/* ── QUESTIONS TAB ─────────────────────────────────────────────── */}
            {activeTab === 'questions' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>
                    {classQuestions.length} total · {classQuestions.filter(q => q.is_active).length} active
                  </p>
                  <Link href="/admin/questions" style={{ background: '#1B4332', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', padding: '9px 18px', borderRadius: '10px', textDecoration: 'none' }}>
                    + Add / Manage
                  </Link>
                </div>

                {classQuestions.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
                    <p style={{ fontSize: '40px', marginBottom: '12px' }}>📭</p>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', color: '#374151' }}>No questions added yet</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#9CA3AF', marginTop: '4px' }}>
                      Go to "Manage Questions" to add class questions.
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {classQuestions.map(q => {
                      const answerCount = questionAttempts.filter(a => a.question_id === q.id).length
                      const subj = Object.entries(SUBJECT_LABELS).find(([key]) => key === q.subject)?.[1]
                      return (
                        <div key={q.id} style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '16px 20px', opacity: q.is_active ? 1 : 0.55 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                            <span style={{ background: subj?.color || '#374151', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', padding: '3px 10px', borderRadius: '10px' }}>
                              {subj?.emoji} {subj?.label}
                            </span>
                            <span style={{ background: '#F3F4F6', color: '#374151', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '11px', padding: '3px 10px', borderRadius: '10px' }}>
                              {q.chapter_title}
                            </span>
                            {!q.is_active && <span style={{ background: '#FEF3C7', color: '#92400E', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', padding: '3px 10px', borderRadius: '10px' }}>Hidden</span>}
                            <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#10B981' }}>
                              ✍️ {answerCount}/{students.length} answered
                            </span>
                          </div>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', lineHeight: 1.5 }}>{q.question}</p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
