'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'

// ── Types ─────────────────────────────────────────────────────────────────────
interface Profile { full_name: string; email: string }

interface Stats {
  totalChaptersDone: number
  totalSections: number
  avgScore: number | null
  bestScore: number | null
  quizzesTaken: number
  subjectProgress: Record<string, { done: number; total: number; avg: number | null }>
}

// ── Subject config ────────────────────────────────────────────────────────────
const SUBJECTS = [
  { key:'english',       label:'English',       emoji:'📖', total:8,  color:'#4338CA', light:'#EEF2FF' },
  { key:'maths',         label:'Mathematics',   emoji:'📐', total:11, color:'#1E3A8A', light:'#DBEAFE' },
  { key:'science',       label:'Science',       emoji:'🔬', total:9,  color:'#0F766E', light:'#CCFBF1' },
  { key:'history-civics',label:'History',       emoji:'🏛️', total:6,  color:'#78350F', light:'#FEF3C7' },
  { key:'geography',     label:'Geography',     emoji:'🌍', total:7,  color:'#075985', light:'#DBEAFE' },
  { key:'sanskrit',      label:'Sanskrit',      emoji:'🕉️', total:8,  color:'#713F12', light:'#FEF9C3' },
  { key:'ict',           label:'ICT',           emoji:'💻', total:5,  color:'#4C1D95', light:'#EDE9FE' },
  { key:'marathi',       label:'मराठी',         emoji:'📝', total:17, color:'#701A75', light:'#FAE8FF' },
]

// ── Achievement badges ────────────────────────────────────────────────────────
function getBadges(stats: Stats) {
  const badges = []
  if (stats.totalChaptersDone >= 1)  badges.push({ emoji:'📖', label:'First chapter!',    desc:'Completed your first chapter',       color:'#4338CA', bg:'#EEF2FF' })
  if (stats.quizzesTaken >= 1)       badges.push({ emoji:'✅', label:'Quiz starter',      desc:'Took your first quiz',               color:'#0F766E', bg:'#F0FDF4' })
  if (stats.avgScore != null && stats.avgScore >= 80) badges.push({ emoji:'⭐', label:'High scorer',      desc:'80%+ average quiz score',           color:'#92400E', bg:'#FEF3C7' })
  if (stats.avgScore != null && stats.avgScore >= 90) badges.push({ emoji:'🏆', label:'Excellence!',      desc:'90%+ average quiz score',           color:'#78350F', bg:'#FEF9C3' })
  if (stats.totalChaptersDone >= 5)  badges.push({ emoji:'🔥', label:'On a roll!',        desc:'Completed 5+ chapters',              color:'#9A3412', bg:'#FFF7ED' })
  if (stats.totalChaptersDone >= 10) badges.push({ emoji:'💎', label:'Chapter champion',  desc:'Completed 10+ chapters',             color:'#6D28D9', bg:'#F5F3FF' })
  if (stats.totalChaptersDone >= 54) badges.push({ emoji:'🎓', label:'All done!',         desc:'Completed all 54 chapters',          color:'#1B4332', bg:'#D8F3DC' })
  const multiSubject = Object.values(stats.subjectProgress).filter(s => s.done > 0).length
  if (multiSubject >= 3) badges.push({ emoji:'🌈', label:'Multi-subject',     desc:'Active in 3+ subjects',              color:'#4C1D95', bg:'#EDE9FE' })
  if (stats.bestScore === 100) badges.push({ emoji:'💯', label:'Perfect score!',   desc:'Got 100% on a quiz',                color:'#166534', bg:'#F0FDF4' })
  return badges
}

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!target) return
    let n = 0
    const step = Math.max(1, Math.ceil(target / 20))
    const t = setInterval(() => { n = Math.min(n + step, target); setVal(n); if (n >= target) clearInterval(t) }, 40)
    return () => clearInterval(t)
  }, [target])
  return <>{val}{suffix}</>
}

// ── Right sidebar ─────────────────────────────────────────────────────────────
function ProfileSidebar({ stats }: { stats: Stats | null }) {
  const badges = stats ? getBadges(stats) : []
  const QUOTES = [
    { text: 'The more that you read, the more things you will know.', author: 'Dr. Seuss' },
    { text: 'Education is not the filling of a pail but the lighting of a fire.', author: 'W.B. Yeats' },
    { text: 'Learning is not attained by chance; it must be sought with ardour.', author: 'Abigail Adams' },
    { text: 'The beautiful thing about learning is that no one can take it away from you.', author: 'B.B. King' },
    { text: 'An investment in knowledge pays the best interest.', author: 'Benjamin Franklin' },
    { text: 'Knowledge is power. Information is liberating.', author: 'Kofi Annan' },
    { text: 'Strive for progress, not perfection.', author: 'Unknown' },
  ]
  const quote = QUOTES[new Date().getDay() % QUOTES.length]

  return (
    <div style={{ width: '280px', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Learning stats */}
      {stats && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          style={{ background: 'white', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '22px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '16px' }}>Learning stats</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
            {[
              { label:'Chapters done',  value: stats.totalChaptersDone, suffix:'',  bg:'#EEF2FF', text:'#4338CA', sub:'#818CF8' },
              { label:'Quizzes taken',  value: stats.quizzesTaken,      suffix:'',  bg:'#F0FDF4', text:'#166534', sub:'#4ADE80' },
              { label:'Avg score',      value: stats.avgScore ?? 0,     suffix:'%', bg:'#FEF3C7', text:'#92400E', sub:'#F59E0B', hide: stats.avgScore === null },
              { label:'Best score',     value: stats.bestScore ?? 0,    suffix:'%', bg:'#FDF4FF', text:'#7E22CE', sub:'#C084FC', hide: stats.bestScore === null },
            ].filter(s => !s.hide).map((s, i) => (
              <motion.div key={s.label} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 + i * 0.08, type: 'spring' }}
                style={{ background: s.bg, borderRadius: '14px', padding: '14px 12px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', color: s.text, lineHeight: 1 }}>
                  <Counter target={s.value} suffix={s.suffix}/>
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: s.sub, marginTop: '4px', lineHeight: 1.3 }}>{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Subject progress mini bars */}
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '12px' }}>Progress by subject</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {SUBJECTS.map(subj => {
              const prog = stats.subjectProgress[subj.key]
              const done = prog?.done || 0
              const pct  = Math.round((done / subj.total) * 100)
              const avg  = prog?.avg
              return (
                <div key={subj.key}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '13px' }}>{subj.emoji}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#64748B' }}>{subj.label}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {avg !== null && avg !== undefined && (
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', color: avg >= 80 ? '#059669' : avg >= 60 ? '#D97706' : '#DC2626' }}>{avg}%</span>
                      )}
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: subj.color }}>{done}/{subj.total}</span>
                    </div>
                  </div>
                  <div style={{ height: '5px', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.4 }}
                      style={{ height: '100%', background: subj.color, borderRadius: '3px', opacity: done > 0 ? 1 : 0.2 }}/>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Achievement badges */}
      {badges.length > 0 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
          style={{ background: 'white', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '22px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '14px' }}>🏅 Achievements</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {badges.map((badge, i) => (
              <motion.div key={badge.label} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.06 }}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: badge.bg, borderRadius: '12px', border: `1px solid ${badge.color}20` }}>
                <span style={{ fontSize: '22px', flexShrink: 0 }}>{badge.emoji}</span>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: badge.color, marginBottom: '1px' }}>{badge.label}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: badge.color, opacity: 0.75, lineHeight: 1.4 }}>{badge.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Not yet earned hint */}
      {badges.length === 0 && stats && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
          style={{ background: 'white', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '22px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏅</div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1F2937', marginBottom: '6px' }}>Achievements await!</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#94A3B8', lineHeight: 1.6 }}>Complete chapters and quizzes to unlock badges here.</p>
        </motion.div>
      )}

      {/* Quote of the day */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
        style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '20px', padding: '22px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '60px', opacity: 0.08, lineHeight: 1 }}>"</div>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#74C69D', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>Quote of the day</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.75, marginBottom: '10px', fontStyle: 'italic' }}>"{quote.text}"</p>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#74C69D' }}>— {quote.author}</p>
      </motion.div>
    </div>
  )
}

// ── Main profile page ─────────────────────────────────────────────────────────
export default function StudentProfilePage({ studentId }: { studentId: string }) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [stats,   setStats]   = useState<Stats | null>(null)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()

      // Profile
      const { data: p } = await supabase.from('profiles').select('full_name, email').eq('id', studentId).single()
      setProfile(p)

      // Lesson progress
      const { data: progress } = await supabase
        .from('student_lesson_progress').select('subject, chapter_id, section_id').eq('student_id', studentId)

      // Quiz attempts
      const { data: quizzes } = await supabase
        .from('student_quiz_attempts').select('subject, chapter_id, score').eq('student_id', studentId).order('created_at', { ascending: false })

      // Build subject progress map
      const sectionMap: Record<string, Record<number, number>> = {}
      progress?.forEach((r: any) => {
        if (!sectionMap[r.subject]) sectionMap[r.subject] = {}
        sectionMap[r.subject][r.chapter_id] = (sectionMap[r.subject][r.chapter_id] || 0) + 1
      })

      const subjectProgress: Record<string, { done: number; total: number; avg: number | null }> = {}
      SUBJECTS.forEach(subj => {
        const chapters = sectionMap[subj.key] || {}
        const done = Object.values(chapters).filter(n => n >= 7).length
        // quiz avg for this subject
        const subjectScores = quizzes?.filter((q: any) => q.subject === subj.key).map((q: any) => q.score) || []
        const avg = subjectScores.length ? Math.round(subjectScores.reduce((a, b) => a + b, 0) / subjectScores.length) : null
        subjectProgress[subj.key] = { done, total: subj.total, avg }
      })

      const totalChaptersDone = Object.values(subjectProgress).reduce((sum, s) => sum + s.done, 0)
      const allScores = quizzes?.map((q: any) => q.score) || []
      const avgScore  = allScores.length ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : null
      const bestScore = allScores.length ? Math.max(...allScores) : null

      setStats({
        totalChaptersDone,
        totalSections: progress?.length || 0,
        avgScore,
        bestScore,
        quizzesTaken: quizzes?.length || 0,
        subjectProgress,
      })
    }
    load()
  }, [studentId])

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'S'

  return (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', width: '100%' }}>

      {/* ── Left column ── */}
      <div style={{ flex: 1, minWidth: 0, maxWidth: '480px' }}>

        {/* Hero card */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ background: 'linear-gradient(135deg,#1B4332 0%,#2D6A4F 60%,#1B4332 100%)', borderRadius: '24px', padding: '36px 32px', textAlign: 'center', marginBottom: '16px', position: 'relative', overflow: 'hidden' }}>

          {/* Background rings */}
          {[140, 200, 260].map((size, i) => (
            <motion.div key={i} animate={{ scale: [1, 1.05, 1], opacity: [0.06, 0.12, 0.06] }} transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.2 }}
              style={{ position: 'absolute', width: `${size}px`, height: `${size}px`, borderRadius: '50%', border: '1px solid rgba(116,198,157,0.4)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}/>
          ))}

          {/* Avatar */}
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
            <div style={{ width: '88px', height: '88px', borderRadius: '50%', background: 'linear-gradient(135deg,#52B788,#74C69D)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '32px', color: '#1B4332', border: '3px solid rgba(255,255,255,0.2)', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
              {initials}
            </div>
            <div style={{ position: 'absolute', bottom: 2, right: 2, width: '20px', height: '20px', borderRadius: '50%', background: '#52B788', border: '2px solid #1B4332', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', color: 'white', marginBottom: '4px', lineHeight: 1.2 }}>
            {profile?.full_name || 'Student'}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginBottom: '20px' }}>
            {profile?.email}
          </motion.p>

          {/* Quick stats pills */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: 'Grade 6',       icon: '📚' },
              { label: 'Student',       icon: '🎓' },
              { label: 'All Subjects',  icon: '✅' },
            ].map(pill => (
              <span key={pill.label} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '5px 14px', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '12px', color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span>{pill.icon}</span> {pill.label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Account details */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ background: 'white', borderRadius: '20px', border: '1.5px solid #E2E8F0', overflow: 'hidden', marginBottom: '14px' }}>
          <div style={{ padding: '16px 22px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>👤</span>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1F2937' }}>Account details</p>
          </div>
          {[
            { label:'Full name',    value: profile?.full_name || '—', icon:'✏️',  color:'#4338CA' },
            { label:'Login email',  value: profile?.email     || '—', icon:'📧',  color:'#0F766E' },
            { label:'Account type', value:'Student',                   icon:'🎓',  color:'#166534' },
            { label:'School',       value:'Singhania School, Thane',   icon:'🏫',  color:'#78350F' },
            { label:'Grade',        value:'Grade 6',                   icon:'📚',  color:'#4C1D95' },
            { label:'Subjects',     value:'8 subjects enrolled',       icon:'📋',  color:'#075985' },
          ].map(({ label, value, icon, color }, i) => (
            <motion.div key={label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.05 }}
              style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 22px', borderBottom: i < 5 ? '1px solid #F8FAFC' : 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F8FAFC' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
              <div style={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '10px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                {icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#94A3B8', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '14px', color: '#1F2937' }}>{value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Password note */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
          style={{ background: 'linear-gradient(135deg,#FFFBEB,#FEF3C7)', borderRadius: '16px', border: '1.5px solid #FDE68A', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
          <div style={{ width: '38px', height: '38px', minWidth: '38px', borderRadius: '10px', background: '#FEF3C7', border: '1px solid #FDE68A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>🔑</div>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#92400E', marginBottom: '4px' }}>Password managed by parent</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#B45309', lineHeight: 1.6 }}>
              To change your password, ask your parent to update it from their dashboard.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Right sidebar ── */}
      <ProfileSidebar stats={stats}/>
    </div>
  )
}
