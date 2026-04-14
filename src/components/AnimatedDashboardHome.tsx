'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import DailyActivities from '@/components/DailyActivities'
import StudentDashboardPanel from '@/components/StudentDashboardPanel'
import { PLATFORM_SUBJECTS, TOTAL_CHAPTERS } from '@/lib/subjects-config'
import MistakeJournal from '@/components/MistakeJournal'
import ExamMode from '@/components/ExamMode'

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (target === 0) return
    let start = 0
    const step = Math.ceil(target / 30)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setDisplay(target); clearInterval(timer) }
      else setDisplay(start)
    }, 30)
    return () => clearInterval(timer)
  }, [target])
  return <>{display}{suffix}</>
}

// ── Subject card data ─────────────────────────────────────────────────────────
// SUBJECTS imported from subjects-config — see src/lib/subjects-config.ts
const SUBJECTS = PLATFORM_SUBJECTS

// ── Tilt card wrapper ─────────────────────────────────────────────────────────
// ── Subject grid card ─────────────────────────────────────────────────────────
function SubjectCard({
  subject, completed, score, index, onClick
}: {
  subject: typeof SUBJECTS[0]
  completed: number
  score: number | null
  index: number
  onClick: () => void
}) {
  const pct = Math.round((completed / subject.total) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
        <motion.div onClick={onClick}
          whileHover={{ scale: 1.03, boxShadow: `0 16px 32px ${subject.color}35` }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{
            background: `linear-gradient(135deg, ${subject.color}, ${subject.dark})`,
            borderRadius: '20px',
            padding: '22px',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            border: `1px solid ${subject.accent}30`,
          }}>

          {/* Background glow orb */}
          <div style={{
            position: 'absolute', top: '-20px', right: '-20px',
            width: '100px', height: '100px', borderRadius: '50%',
            background: `radial-gradient(circle, ${subject.accent}40, transparent 70%)`,
            pointerEvents: 'none',
          }}/>

          {/* Emoji */}
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
            style={{ fontSize: '32px', marginBottom: '12px', display: 'inline-block' }}>
            {subject.emoji}
          </motion.div>

          {/* Label */}
          <p style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: '16px', color: 'white', marginBottom: '4px', lineHeight: 1.2,
          }}>
            {subject.label}
          </p>

          {/* Chapters count */}
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '12px',
            color: `${subject.accent}CC`, marginBottom: '14px',
          }}>
            {completed}/{subject.total} chapters
          </p>

          {/* Progress bar */}
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', marginBottom: '10px', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ delay: index * 0.07 + 0.4, duration: 0.8, ease: 'easeOut' }}
              style={{ height: '100%', background: subject.accent, borderRadius: '2px' }}
            />
          </div>

          {/* Score badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{
              fontFamily: 'var(--font-heading)', fontWeight: 700,
              fontSize: '11px', color: `${subject.accent}`,
            }}>
              {pct}% done
            </span>
            {score !== null && (
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: index * 0.07 + 0.6, type: 'spring' }}
                style={{
                  background: `${subject.accent}30`,
                  border: `1px solid ${subject.accent}50`,
                  color: subject.accent,
                  fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px',
                  padding: '3px 8px', borderRadius: '20px',
                }}>
                ⭐ {score}%
              </motion.span>
            )}
          </div>
        </motion.div>
    </motion.div>
  )
}

// ── Greeting banner ───────────────────────────────────────────────────────────
function GreetingBanner({ name, totalCompleted, totalChapters }: {
  name: string; totalCompleted: number; totalChapters: number
}) {
  const h = new Date().getHours()
  const greeting = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
  const pct = Math.round((totalCompleted / totalChapters) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #1B4332 100%)',
        borderRadius: '24px',
        padding: '28px 32px',
        marginBottom: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}>

      {/* Animated background circles */}
      {[...Array(3)].map((_, i) => (
        <motion.div key={i}
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 4 + i * 1.5, repeat: Infinity, delay: i * 1 }}
          style={{
            position: 'absolute',
            width: `${150 + i * 80}px`, height: `${150 + i * 80}px`,
            borderRadius: '50%',
            border: '1px solid rgba(116,198,157,0.3)',
            right: `${-40 + i * -30}px`, top: `${-40 + i * -20}px`,
            pointerEvents: 'none',
          }}
        />
      ))}

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#74C69D', marginBottom: '6px' }}>
            {greeting}! 👋
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: 'white', marginBottom: '8px', lineHeight: 1.2 }}>
            {name ? `Let's go, ${name}!` : 'Welcome back!'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
            <AnimatedNumber target={totalCompleted}/> of {totalChapters} chapters completed across all subjects
          </motion.p>
        </div>

        {/* Overall progress ring */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          style={{ flexShrink: 0, textAlign: 'center' }}>
          <svg width="88" height="88" viewBox="0 0 88 88">
            <circle cx="44" cy="44" r="36" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8"/>
            <motion.circle
              cx="44" cy="44" r="36" fill="none"
              stroke="#74C69D" strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 36}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 36 * (1 - pct / 100) }}
              transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
              transform="rotate(-90 44 44)"
            />
            <text x="44" y="44" textAnchor="middle" dominantBaseline="central"
              fill="white" fontSize="16" fontWeight="800"
              fontFamily="var(--font-heading)">
              {pct}%
            </text>
          </svg>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>Overall</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ── Streak / stats row ────────────────────────────────────────────────────────
function StatsRow({ totalCompleted, avgScore, streak }: {
  totalCompleted: number; avgScore: number | null; streak: number
}) {
  const stats = [
    { label: 'Chapters done',  value: totalCompleted, suffix: '',  color: '#1B4332', bg: '#D8F3DC', emoji: '📚' },
    { label: 'Avg quiz score', value: avgScore ?? 0,  suffix: '%', color: '#92400E', bg: '#FEF3C7', emoji: '⭐', hide: avgScore === null },
    { label: 'Day streak',     value: streak,         suffix: '🔥',color: '#1E3A8A', bg: '#DBEAFE', emoji: '🔥' },
  ].filter(s => !s.hide)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: '12px', marginBottom: '24px' }}>
      {stats.map((s, i) => (
        <motion.div key={s.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
          style={{ background: s.bg, borderRadius: '16px', padding: '18px 20px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: s.color, lineHeight: 1, marginBottom: '4px' }}>
            <AnimatedNumber target={s.value} suffix={s.suffix === '%' ? '%' : ''}/>
            {s.suffix === '🔥' && ' 🔥'}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: s.color, opacity: 0.7 }}>{s.label}</p>
        </motion.div>
      ))}
    </div>
  )
}

// ── Main animated dashboard home ──────────────────────────────────────────────
export default function AnimatedDashboardHome({
  studentId,
  onNavigate,
}: {
  studentId: string
  onNavigate: (section: string) => void
}) {
  const [name,          setName]          = useState('')
  const [completedMap,  setCompletedMap]  = useState<Record<string, number>>({})
  const [scoresMap,     setScoresMap]     = useState<Record<string, number | null>>({})
  const [avgScore,      setAvgScore]      = useState<number | null>(null)
  const [loaded,        setLoaded]        = useState(false)
  const [streak,        setStreak]        = useState(0)
  const [dueReviews,    setDueReviews]    = useState<any[]>([])
  const [examActive,    setExamActive]    = useState(false)
  const [examConfig,    setExamConfig]    = useState<any[]>([])
  const [showExam,      setShowExam]      = useState(false)
  const [examResults,   setExamResults]   = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const uid = user.id  // always use auth user.id — never rely on prop timing

      const { data: p } = await supabase.from('profiles').select('full_name').eq('id', uid).maybeSingle()
      if (p?.full_name) setName(p.full_name.split(' ')[0])

      // Count fully completed chapters (7 sections) per subject
      const { data: sectionCounts } = await supabase
        .from('student_lesson_progress')
        .select('subject, chapter_id, section_id')
        .eq('student_id', uid)

      const sectionMap: Record<string, Record<number, number>> = {}
      sectionCounts?.forEach((r: any) => {
        if (!sectionMap[r.subject]) sectionMap[r.subject] = {}
        sectionMap[r.subject][r.chapter_id] = (sectionMap[r.subject][r.chapter_id] || 0) + 1
      })

      const doneMap: Record<string, number> = {}
      Object.entries(sectionMap).forEach(([subj, chapters]) => {
        doneMap[subj] = Object.values(chapters).filter(c => c >= 7).length
      })
      setCompletedMap(doneMap)

      // Quiz scores per subject — use all attempts for avg, most recent per subject for badge
      const { data: quizzes } = await supabase
        .from('student_quiz_attempts')
        .select('subject, chapter_id, score')
        .eq('student_id', uid)
        .order('created_at', { ascending: false })

      const bestScores: Record<string, number> = {}
      quizzes?.forEach((r: any) => {
        // Keep the most recent score per subject (first result since ordered desc)
        if (!(r.subject in bestScores)) bestScores[r.subject] = r.score
      })
      setScoresMap(bestScores)

      const allScores = quizzes?.map((r: any) => r.score) || []
      setAvgScore(allScores.length ? Math.round(allScores.reduce((a: number, b: number) => a + b, 0) / allScores.length) : null)

      // Compute day streak — count consecutive days with activity (quiz or section)
      const { data: activityRows } = await supabase
        .from('student_lesson_progress')
        .select('completed_at')
        .eq('student_id', uid)
        .order('completed_at', { ascending: false })

      const activeDays = new Set((activityRows || []).map((r: any) => {
        const d = new Date(r.completed_at); return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
      }))
      let streakCount = 0
      const today = new Date()
      for (let i = 0; i < 365; i++) {
        const d = new Date(today); d.setDate(today.getDate() - i)
        const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
        if (activeDays.has(key)) streakCount++
        else if (i > 0) break
      }
      setStreak(streakCount)

      // Spaced repetition — find chapters where quiz was done 7+ days ago
      // and student hasn't done a review attempt since
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

      const { data: allQuizzes } = await supabase
        .from('student_quiz_attempts')
        .select('subject, chapter_id, score, created_at')
        .eq('student_id', uid)
        .order('created_at', { ascending: false })

      // Get the FIRST (oldest) attempt per chapter — that's when they originally did it
      const firstAttempts: Record<string, any> = {}
      ;(allQuizzes || []).slice().reverse().forEach((r: any) => {
        const key = `${r.subject}-${r.chapter_id}`
        firstAttempts[key] = r
      })

      // Get the LATEST attempt per chapter — to check if they already reviewed recently
      const latestAttempts: Record<string, any> = {}
      ;(allQuizzes || []).forEach((r: any) => {
        const key = `${r.subject}-${r.chapter_id}`
        if (!latestAttempts[key]) latestAttempts[key] = r
      })

      // Due = first attempt was 7+ days ago AND latest attempt was also 7+ days ago
      const due: any[] = []
      Object.entries(firstAttempts).forEach(([key, first]: any) => {
        const firstDate = new Date(first.created_at)
        const latest    = latestAttempts[key]
        const latestDate = new Date(latest.created_at)
        if (firstDate <= sevenDaysAgo && latestDate <= sevenDaysAgo) {
          const [subject, chapterId] = key.split('-')
          const subjectInfo = SUBJECTS.find(s => s.id === subject)
          due.push({
            subject,
            chapterId: Number(chapterId),
            subjectLabel: subjectInfo?.label ?? subject,
            subjectEmoji: subjectInfo?.emoji ?? '📚',
            subjectColor: subjectInfo?.color ?? '#1B4332',
            subjectLight: subjectInfo?.light ?? '#F0FDF4',
            quizRoute:    subjectInfo?.quizRoute ?? 'quiz',
            originalScore: first.score,
            daysSince: Math.floor((Date.now() - latestDate.getTime()) / (1000 * 60 * 60 * 24)),
          })
        }
      })
      setDueReviews(due.slice(0, 5))  // max 5 at a time

      // Check if any exam is active + fetch all past results
      const [{ data: examData }, { data: examResultsData }] = await Promise.all([
        supabase.from('exam_config')
          .select('subject, chapter_ids, is_active, duration_mins, term')
          .eq('is_active', true),
        supabase.from('exam_attempts')
          .select('term, score, total_marks, created_at')
          .eq('student_id', uid)
          .order('created_at', { ascending: false }),
      ])
      setExamConfig(examData ?? [])
      setExamActive((examData ?? []).length > 0)
      setExamResults(examResultsData ?? [])
      console.log('[Exam] examData:', examData, 'active:', (examData ?? []).length > 0)

      setLoaded(true)
    }

    load()

    // Re-fetch when student returns to this tab after completing a quiz
    const handleVisibility = () => { if (!document.hidden) load() }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [studentId])

  const totalCompleted = Object.values(completedMap).reduce((a, b) => a + b, 0)
  const totalChapters  = TOTAL_CHAPTERS  // from subjects-config

  return (
    <div>
      <GreetingBanner name={name} totalCompleted={totalCompleted} totalChapters={totalChapters}/>

      <StatsRow totalCompleted={totalCompleted} avgScore={avgScore} streak={streak}/>

      {/* ── Exam Mode overlay ── */}
      {showExam && (
        <div style={{ position: 'fixed', inset: 0, background: '#F8FAFF', zIndex: 100, overflowY: 'auto' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', padding: '24px' }}>
            <button onClick={() => setShowExam(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'white', border: '1.5px solid #E5E7EB', borderRadius: '10px', padding: '8px 14px', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '13px', color: '#64748B', cursor: 'pointer', marginBottom: '20px' }}>
              ← Back to Dashboard
            </button>
            <ExamMode studentId={studentId} onClose={() => setShowExam(false)}/>
          </div>
        </div>
      )}

      {/* ── Exam Mode card ── */}
      {loaded && (
        <div style={{ background: 'red', padding: '10px', color: 'white', borderRadius: '8px', marginBottom: '10px' }}>
          DEBUG: loaded={String(loaded)} examActive={String(examActive)} examConfig.length={examConfig.length}
        </div>
      )}
      {loaded && examActive && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '20px', padding: '20px 24px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', boxShadow: '0 4px 20px rgba(27,67,50,0.25)' }}
          onClick={() => setShowExam(true)}>
          <span style={{ fontSize: '28px', flexShrink: 0 }}>📋</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '15px', color: 'white', marginBottom: '3px' }}>
              {examConfig[0]?.term ?? 'Term'} Exam is Live!
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
              Tap to start your exam — {examConfig.length} subject{examConfig.length > 1 ? 's' : ''} · {Math.max(...examConfig.map((c: any) => c.duration_mins))} minutes
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '10px 18px', flexShrink: 0 }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: 'white' }}>Start →</span>
          </div>
        </motion.div>
      )}

      {/* ── Past exam results ── */}
      {examResults.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
            Exam Results
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {examResults.map((result, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                style={{ background: 'white', borderRadius: '14px', border: '1.5px solid #F1F5F9', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '20px', flexShrink: 0 }}>📋</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1F2937' }}>{result.term}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                    {new Date(result.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div style={{ textAlign: 'center', flexShrink: 0 }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color: result.score >= 80 ? '#166534' : result.score >= 60 ? '#92400E' : '#991B1B', lineHeight: 1 }}>{result.score}%</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>Score</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ── Spaced Repetition: Review Card — always visible ── */}
      {loaded && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ background: 'white', borderRadius: '20px', border: `1.5px solid ${dueReviews.length > 0 ? '#FDE68A' : '#D8F3DC'}`, padding: '20px 24px', marginBottom: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: dueReviews.length > 0 ? '14px' : '0' }}>
            <span style={{ fontSize: '20px' }}>🔁</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: dueReviews.length > 0 ? '#92400E' : '#1B4332' }}>
                Chapter Reviews
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: dueReviews.length > 0 ? '#B45309' : '#52B788', marginTop: '2px' }}>
                {dueReviews.length > 0
                  ? `${dueReviews.length} chapter${dueReviews.length > 1 ? 's' : ''} ready for a quick refresh`
                  : 'All caught up — no reviews pending ✅'}
              </p>
            </div>
            {dueReviews.length > 0 && (
              <div style={{ background: '#FEF3C7', border: '1.5px solid #FDE68A', borderRadius: '20px', padding: '4px 14px', flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '18px', color: '#92400E' }}>{dueReviews.length}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#B45309', marginLeft: '4px' }}>due</span>
              </div>
            )}
          </div>
          {dueReviews.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {dueReviews.map((item, i) => (
                <motion.a key={i} href={`/student/${item.quizRoute}/${item.chapterId}`}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.05 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '12px', background: item.subjectLight, border: `1px solid ${item.subjectColor}20`, textDecoration: 'none', cursor: 'pointer' }}>
                  <span style={{ fontSize: '18px' }}>{item.subjectEmoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: item.subjectColor }}>
                      {item.subjectLabel} — Chapter {item.chapterId}
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                      {item.daysSince} days since last attempt · Original score {item.originalScore}%
                    </p>
                  </div>
                  <div style={{ background: item.subjectColor, color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', padding: '6px 14px', borderRadius: '8px', flexShrink: 0 }}>
                    Review →
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* ── Mistake Journal ── */}
      {loaded && studentId && <MistakeJournal studentId={studentId}/>}

      {/* Subject grid */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
        Your subjects
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        {SUBJECTS.map((subject, i) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            completed={completedMap[subject.id] || 0}
            score={scoresMap[subject.id] ?? null}
            index={i}
            onClick={() => onNavigate(subject.id)}
          />
        ))}
      </div>

      {/* Daily activities */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}>
        <DailyActivities/>
      </motion.div>

      {/* Dashboard panel */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        style={{ marginTop: '20px' }}>
        <StudentDashboardPanel studentId={studentId}/>
      </motion.div>
    </div>
  )
}
