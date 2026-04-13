'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import DailyActivities from '@/components/DailyActivities'
import StudentDashboardPanel from '@/components/StudentDashboardPanel'
import { PLATFORM_SUBJECTS, TOTAL_CHAPTERS } from '@/lib/subjects-config'

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
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const sRotX = useSpring(rotX, { stiffness: 200, damping: 20 })
  const sRotY = useSpring(rotY, { stiffness: 200, damping: 20 })

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rotX.set(((e.clientY - cy) / rect.height) * -10)
    rotY.set(((e.clientX - cx) / rect.width) * 10)
  }
  const handleLeave = () => { rotX.set(0); rotY.set(0) }

  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ rotateX: sRotX, rotateY: sRotY, transformStyle: 'preserve-3d', transformPerspective: 800 }}
      className={className}>
      {children}
    </motion.div>
  )
}

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
      <TiltCard>
        <motion.div onClick={onClick}
          whileHover={{ scale: 1.03, boxShadow: `0 20px 40px ${subject.color}40` }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
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
      </TiltCard>
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
