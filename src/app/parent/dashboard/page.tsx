'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { TOTAL_CHAPTERS } from '@/lib/subjects-config'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'
import { motion } from 'framer-motion'

interface Child { id: string; full_name: string; email: string }

const SUBJECT_META: Record<string, { label: string; emoji: string; color: string; total: number }> = {
  english:        { label: 'English',       emoji: '📖', color: '#4338CA', total: 8  },
  maths:          { label: 'Mathematics',   emoji: '📐', color: '#1E3A8A', total: 11 },
  science:        { label: 'Science',       emoji: '🔬', color: '#0F766E', total: 9  },
  'history-civics': { label: 'History',    emoji: '🏛️', color: '#78350F', total: 6  },
  geography:      { label: 'Geography',     emoji: '🌍', color: '#075985', total: 7  },
  sanskrit:       { label: 'Sanskrit',      emoji: '🕉️', color: '#713F12', total: 8  },
  ict:            { label: 'ICT',           emoji: '💻', color: '#4C1D95', total: 5  },
  marathi:        { label: 'मराठी',         emoji: '📝', color: '#701A75', total: 17 },
}

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

export default function ParentDashboardHome() {
  const router = useRouter()
  const [parentName,  setParentName]  = useState('Parent')
  const [children,    setChildren]    = useState<Child[]>([])
  const [activeChild, setActiveChild] = useState(0)
  const [stats, setStats] = useState({ chaptersCompleted: 0, totalChapters: TOTAL_CHAPTERS, avgScore: null as number | null, quizzesTaken: 0, dueReviews: 0 })
  const [subjectProgress, setSubjectProgress] = useState<{ key: string; done: number; total: number; avg: number | null }[]>([])
  const [recentActivity, setRecentActivity]   = useState<{ emoji: string; text: string; time: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: profile } = await supabase.from('profiles').select('role, full_name').eq('id', user.id).maybeSingle()
      if (profile?.role !== 'parent') { router.push('/login'); return }
      setParentName(profile?.full_name?.split(' ')[0] || 'Parent')
      const { data: links } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id)
      if (!links?.length) { setLoading(false); return }
      const { data: profiles } = await supabase.from('profiles').select('id, full_name, email').in('id', links.map((l: any) => l.student_id))
      if (profiles?.length) setChildren(profiles as Child[])
    }
    load()
  }, [router])

  useEffect(() => {
    if (!children[activeChild]) return
    loadChildData(children[activeChild].id)
  }, [children, activeChild])

  const loadChildData = async (studentId: string) => {
    setLoading(true)
    const supabase = createClient()
    const [{ data: sections }, { data: quizzes }] = await Promise.all([
      supabase.from('student_lesson_progress').select('subject, chapter_id, completed_at').eq('student_id', studentId).order('completed_at', { ascending: false }),
      supabase.from('student_quiz_attempts').select('subject, chapter_id, score, created_at').eq('student_id', studentId).order('created_at', { ascending: false }),
    ])

    const secMap: Record<string, number> = {}
    sections?.forEach((s: any) => { const k = `${s.subject}-${s.chapter_id}`; secMap[k] = (secMap[k] || 0) + 1 })

    const scoreMap: Record<string, number> = {}
    quizzes?.forEach((q: any) => { const k = `${q.subject}-${q.chapter_id}`; if (!(k in scoreMap)) scoreMap[k] = q.score })

    const subjectData = Object.entries(SUBJECT_META).map(([key, meta]) => {
      const done = Array.from({ length: meta.total }, (_, i) => i + 1).filter(chId => (secMap[`${key}-${chId}`] || 0) >= 7).length
      const scores = Array.from({ length: meta.total }, (_, i) => i + 1).filter(chId => `${key}-${chId}` in scoreMap).map(chId => scoreMap[`${key}-${chId}`])
      const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null
      return { key, done, total: meta.total, avg }
    })
    setSubjectProgress(subjectData)

    const totalDone = subjectData.reduce((a, s) => a + s.done, 0)
    const allScores = quizzes?.map((q: any) => q.score) || []
    const avgScore  = allScores.length ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : null
    // Count chapters due for review (quiz done 7+ days ago, no recent attempt)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const latestByChapter: Record<string, Date> = {}
    ;(quizzes || []).forEach((q: any) => {
      const key = `${q.subject}-${q.chapter_id}`
      const d = new Date(q.created_at)
      if (!latestByChapter[key] || d > latestByChapter[key]) latestByChapter[key] = d
    })
    const dueReviews = Object.values(latestByChapter).filter(d => d <= sevenDaysAgo).length
    setStats({ chaptersCompleted: totalDone, totalChapters: TOTAL_CHAPTERS, avgScore, quizzesTaken: quizzes?.length || 0, dueReviews })

    // Build recent activity
    const activity: { emoji: string; text: string; time: string }[] = []
    const timeAgo = (dateStr: string) => {
      const diff = Date.now() - new Date(dateStr).getTime()
      const mins = Math.floor(diff / 60000)
      if (mins < 60) return `${mins}m ago`
      const hrs = Math.floor(mins / 60)
      if (hrs < 24) return `${hrs}h ago`
      return `${Math.floor(hrs / 24)}d ago`
    }
    quizzes?.slice(0, 3).forEach((q: any) => {
      const meta = SUBJECT_META[q.subject]
      activity.push({ emoji: '✅', text: `Scored ${q.score}% on ${meta?.label || q.subject} quiz`, time: timeAgo(q.created_at) })
    })
    sections?.slice(0, 3).forEach((s: any) => {
      const meta = SUBJECT_META[s.subject]
      if (!activity.find(a => a.text.includes('section'))) {
        activity.push({ emoji: '📖', text: `Read a section in ${meta?.label || s.subject}`, time: timeAgo(s.completed_at) })
      }
    })
    setRecentActivity(activity.slice(0, 5))
    setLoading(false)
  }

  const pct = Math.round((stats.chaptersCompleted / stats.totalChapters) * 100)
  const child = children[activeChild]

  return (
    <ParentSidebarLayout parentName={parentName}>
      <div style={{ maxWidth: '900px' }}>

        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ marginBottom: '24px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: '#1B4332', marginBottom: '4px' }}>
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {parentName}! 👋
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#64748B' }}>
            Here is how {child?.full_name?.split(' ')[0] || 'your child'} is doing today.
          </p>
        </motion.div>

        {/* Child tabs */}
        {children.length > 1 && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {children.map((c, i) => {
              const isActive = activeChild === i
              return (
                <button key={c.id} onClick={() => setActiveChild(i)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', borderRadius: '20px', border: isActive ? '2px solid #1B4332' : '1.5px solid #E5E7EB', background: isActive ? '#1B4332' : 'white', color: isActive ? 'white' : '#374151', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s' }}>
                  <div style={{ width: '22px', height: '22px', minWidth: '22px', borderRadius: '50%', background: isActive ? 'rgba(255,255,255,0.2)' : '#D8F3DC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '10px', color: isActive ? 'white' : '#1B4332', flexShrink: 0 }}>
                    {(c.full_name || 'S').charAt(0).toUpperCase()}
                  </div>
                  {(c.full_name || 'Student').split(' ')[0]}
                </button>
              )
            })}
          </div>
        )}

        {/* Hero stats */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
          style={{ background: 'linear-gradient(135deg,#0D2B1F 0%,#1B4332 60%,#2D6A4F 100%)', borderRadius: '24px', padding: '28px 32px', marginBottom: '20px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
          {[300, 500].map((size, i) => (
            <motion.div key={i} animate={{ scale: [1,1.05,1], opacity:[0.05,0.1,0.05] }} transition={{ duration: 5+i*2, repeat: Infinity }}
              style={{ position: 'absolute', width: `${size}px`, height: `${size}px`, borderRadius: '50%', border: '1px solid rgba(116,198,157,0.2)', top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none'}}/>
          ))}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#74C69D', marginBottom: '6px' }}>
              {child?.full_name || 'Your child'} — learning progress
            </p>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '32px', color: 'white', lineHeight: 1, marginBottom: '8px' }}>
              {loading ? '—' : <Counter target={stats.chaptersCompleted}/>}
              <span style={{ fontSize: '18px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginLeft: '4px' }}>/ {stats.totalChapters} chapters</span>
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>
              {stats.avgScore !== null ? `${stats.avgScore}% avg quiz score · ` : ''}{stats.quizzesTaken} quiz{stats.quizzesTaken !== 1 ? 'zes' : ''} taken{stats.dueReviews > 0 ? ` · 🔁 ${stats.dueReviews} chapter${stats.dueReviews > 1 ? 's' : ''} due for review` : ''}
            </p>
          </div>
          {/* Progress ring */}
          <div style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}>
            <svg width="90" height="90" viewBox="0 0 90 90">
              <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8"/>
              <motion.circle cx="45" cy="45" r="38" fill="none" stroke="#74C69D" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${2*Math.PI*38}`}
                initial={{ strokeDashoffset: 2*Math.PI*38 }}
                animate={{ strokeDashoffset: 2*Math.PI*38 * (1 - pct/100) }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                transform="rotate(-90 45 45)"/>
              <text x="45" y="45" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="16" fontWeight="800" fontFamily="var(--font-heading)">{pct}%</text>
            </svg>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: '4px' }}>Overall</p>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>

          {/* Subject progress */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ background: 'white', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332' }}>Subject progress</p>
              <Link href="/parent/dashboard/overview" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '12px', color: '#40916C', textDecoration: 'none' }}>See all →</Link>
            </div>
            {loading ? <p style={{ fontFamily: 'var(--font-body)', color: '#94A3B8', fontSize: '13px' }}>Loading...</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {subjectProgress.map(s => {
                  const meta = SUBJECT_META[s.key]
                  const pct  = Math.round((s.done / s.total) * 100)
                  return (
                    <div key={s.key}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '13px' }}>{meta.emoji}</span>
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#374151' }}>{meta.label}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {s.avg !== null && <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: s.avg >= 80 ? '#059669' : s.avg >= 60 ? '#D97706' : '#DC2626' }}>{s.avg}%</span>}
                          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: meta.color }}>{s.done}/{s.total}</span>
                        </div>
                      </div>
                      <div style={{ height: '5px', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.3 }}
                          style={{ height: '100%', background: meta.color, borderRadius: '3px', opacity: s.done > 0 ? 1 : 0.2 }}/>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>

          {/* Recent activity */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            style={{ background: 'white', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332' }}>Recent activity</p>
              <Link href="/parent/dashboard/progress" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '12px', color: '#40916C', textDecoration: 'none' }}>Details →</Link>
            </div>
            {loading ? <p style={{ fontFamily: 'var(--font-body)', color: '#94A3B8', fontSize: '13px' }}>Loading...</p>
            : recentActivity.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <p style={{ fontSize: '32px', marginBottom: '8px' }}>📖</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#94A3B8' }}>No activity yet. Encourage your child to start reading!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recentActivity.map((a, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.06 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', minWidth: '32px', borderRadius: '10px', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>{a.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', lineHeight: 1.5 }}>{a.text}</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{a.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Quick links */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
          {[
            { href: '/parent/dashboard/overview', emoji: '📊', title: 'Overview', desc: 'All subjects at a glance', color: '#4338CA', bg: '#EEF2FF' },
            { href: '/parent/dashboard/progress', emoji: '📚', title: 'Progress', desc: 'Chapter-by-chapter breakdown', color: '#0F766E', bg: '#F0FDFA' },
            { href: '/parent/dashboard/invoices', emoji: '🧾', title: 'Invoices', desc: 'Download receipts', color: '#78350F', bg: '#FFFBEB' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none', display: 'block' }}>
              <motion.div whileHover={{ y: -3, boxShadow: `0 8px 20px ${item.color}15` }} transition={{ type: 'spring', stiffness: 400 }}
                style={{ background: item.bg, borderRadius: '16px', padding: '20px', border: `1px solid ${item.color}20`, cursor: 'pointer' }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '10px' }}>{item.emoji}</span>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: item.color, marginBottom: '4px' }}>{item.title}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: item.color, opacity: 0.7 }}>{item.desc}</p>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </ParentSidebarLayout>
  )
}
