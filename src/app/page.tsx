'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ── Hooks ──────────────────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1400, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start: number
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setCount(Math.floor(p * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return count
}

function useTypingEffect(words: string[], speed = 90, pause = 1800) {
  const [displayed, setDisplayed] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const current = words[wordIdx]
    let t: ReturnType<typeof setTimeout>
    if (!deleting && charIdx < current.length)
      t = setTimeout(() => setCharIdx(i => i + 1), speed)
    else if (!deleting && charIdx === current.length)
      t = setTimeout(() => setDeleting(true), pause)
    else if (deleting && charIdx > 0)
      t = setTimeout(() => setCharIdx(i => i - 1), speed / 2)
    else { setDeleting(false); setWordIdx(i => (i + 1) % words.length) }
    setDisplayed(current.slice(0, charIdx))
    return () => clearTimeout(t)
  }, [charIdx, deleting, wordIdx, words, speed, pause])
  return displayed
}

// ── Animated section wrapper ──────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

// ── Subject tiles ─────────────────────────────────────────────────────────────
const SUBJECTS = [
  { emoji:'📖', label:'English',       chapters:8,  color:'#4338CA', light:'#EEF2FF' },
  { emoji:'📐', label:'Mathematics',   chapters:11, color:'#1E3A8A', light:'#DBEAFE' },
  { emoji:'🔬', label:'Science',       chapters:9,  color:'#0F766E', light:'#CCFBF1' },
  { emoji:'🏛️', label:'History',       chapters:6,  color:'#78350F', light:'#FEF3C7' },
  { emoji:'🌍', label:'Geography',     chapters:7,  color:'#075985', light:'#DBEAFE' },
  { emoji:'🕉️', label:'Sanskrit',      chapters:8,  color:'#713F12', light:'#FEF9C3' },
  { emoji:'💻', label:'ICT',           chapters:5,  color:'#4C1D95', light:'#EDE9FE' },
  { emoji:'📝', label:'मराठी',         chapters:17, color:'#701A75', light:'#FAE8FF' },
]

// ── Platform mockup ───────────────────────────────────────────────────────────
function PlatformMockup() {
  return (
    <div style={{ position: 'relative', maxWidth: '520px', width: '100%' }}>
      {/* Glow */}
      <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(ellipse at center, rgba(116,198,157,0.2) 0%, transparent 70%)', pointerEvents: 'none' }}/>
      {/* Browser chrome */}
      <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)', position: 'relative' }}>
        {/* Title bar */}
        <div style={{ background: '#1B4332', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }}/>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }}/>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }}/>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: '6px', padding: '4px 10px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>gyaanpravaha.in/student/dashboard</p>
          </div>
        </div>
        {/* Mock dashboard */}
        <div style={{ background: '#F0FDF4', padding: '16px', display: 'flex', gap: '12px' }}>
          {/* Sidebar */}
          <div style={{ width: '48px', background: '#1B4332', borderRadius: '10px', padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            {['🏠','📖','📐','🔬','🌍','👤'].map((e, i) => (
              <div key={i} style={{ width: '32px', height: '32px', borderRadius: '8px', background: i === 1 ? 'rgba(116,198,157,0.3)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>{e}</div>
            ))}
          </div>
          {/* Main content */}
          <div style={{ flex: 1 }}>
            {/* Greeting */}
            <div style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '12px', padding: '14px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#74C69D' }}>Good morning 👋</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '14px', color: 'white', marginTop: '2px' }}>Let's go, Arjun!</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <svg width="44" height="44" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4"/>
                  <circle cx="22" cy="22" r="18" fill="none" stroke="#74C69D" strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={`${2*Math.PI*18}`} strokeDashoffset={`${2*Math.PI*18*0.65}`} transform="rotate(-90 22 22)"/>
                  <text x="22" y="22" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="10" fontWeight="800" fontFamily="var(--font-heading)">35%</text>
                </svg>
              </div>
            </div>
            {/* Subject cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '6px' }}>
              {SUBJECTS.slice(0, 4).map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.08 }}
                  style={{ background: `linear-gradient(135deg,${s.color},${s.color}CC)`, borderRadius: '8px', padding: '8px 6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '16px', marginBottom: '3px' }}>{s.emoji}</div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '8px', color: 'white', lineHeight: 1.2 }}>{s.label}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '7px', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>{s.chapters} ch</p>
                </motion.div>
              ))}
            </div>
            {/* Chapter progress */}
            <div style={{ background: 'white', borderRadius: '8px', padding: '10px', marginTop: '10px' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '9px', color: '#1B4332', marginBottom: '8px' }}>📖 English — Chapter 3</p>
              {['Introduction','Story context','Key vocabulary','Analysis'].map((sec, i) => (
                <div key={sec} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: i < 2 ? '#2D6A4F' : i === 2 ? '#E5E7EB' : '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {i < 2 && <svg width="7" height="7" viewBox="0 0 7 7" fill="none"><path d="M1 3.5l1.5 1.5 3.5-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '8px', color: i < 2 ? '#2D6A4F' : '#9CA3AF' }}>{sec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <motion.div animate={{ y: [0,-8,0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '-16px', right: '-20px', background: 'white', borderRadius: '12px', padding: '10px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '20px' }}>⭐</span>
        <div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: '#1B4332', lineHeight: 1 }}>92%</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#6B7280' }}>Quiz score</p>
        </div>
      </motion.div>

      <motion.div animate={{ y: [0,-6,0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        style={{ position: 'absolute', bottom: '20px', left: '-24px', background: 'white', borderRadius: '12px', padding: '10px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '20px' }}>🔥</span>
        <div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: '#1B4332', lineHeight: 1 }}>7 day</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#6B7280' }}>Study streak</p>
        </div>
      </motion.div>
    </div>
  )
}

// ── Parent mockup ─────────────────────────────────────────────────────────────
function ParentMockup() {
  return (
    <div style={{ background: 'white', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '24px', maxWidth: '380px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Parent Dashboard</p>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: '#1B4332' }}>Arjun's progress</p>
        </div>
        <div style={{ background: '#D8F3DC', borderRadius: '10px', padding: '8px 12px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '18px', color: '#1B4332', lineHeight: 1 }}>86%</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#40916C' }}>Avg score</p>
        </div>
      </div>
      {SUBJECTS.slice(0, 6).map((s, i) => {
        const pcts = [75, 55, 88, 40, 100, 30]
        const pct = pcts[i]
        return (
          <div key={s.label} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <span style={{ fontSize: '14px' }}>{s.emoji}</span>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151' }}>{s.label}</p>
              </div>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: pct >= 80 ? '#059669' : pct >= 50 ? '#D97706' : '#6B7280' }}>{pct}%</p>
            </div>
            <div style={{ height: '5px', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }}
                style={{ height: '100%', background: s.color, borderRadius: '3px' }}/>
            </div>
          </div>
        )
      })}
      <div style={{ marginTop: '16px', background: '#FEF3C7', borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '18px' }}>⚠️</span>
        <div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#92400E' }}>Needs attention</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#B45309' }}>History & Civics — only 40% done this week</p>
        </div>
      </div>
    </div>
  )
}

// ── Main landing page ─────────────────────────────────────────────────────────
export default function HomePage() {
  const [dashboardHref, setDashboardHref] = useState('')
  const [scrolled,      setScrolled]      = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true })
  const typed = useTypingEffect(['Learn it.', 'Know it.', 'Flow with it.'], 90, 1800)

  const chapterCount  = useCounter(54,  1200, statsInView)
  const sectionCount  = useCounter(378, 1400, statsInView)
  const questionCount = useCounter(864, 1600, statsInView)

  useEffect(() => {
    const checkAuth = async () => {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle()
      setDashboardHref(profile?.role === 'parent' ? '/parent/dashboard' : '/student/dashboard')
    }
    checkAuth()
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'white', overflowX: 'hidden' }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .cursor { display:inline-block; width:3px; height:1em; background:#74C69D; margin-left:4px; vertical-align:middle; animation:blink 0.8s step-end infinite; border-radius:2px; }
        .spin { animation:spinSlow 20s linear infinite; }
        @media(max-width:768px){ .hero-grid{grid-template-columns:1fr!important} .hide-mobile{display:none!important} .stats-grid{grid-template-columns:repeat(3,1fr)!important} }
        @media(max-width:520px){ .stats-grid{grid-template-columns:1fr!important} }
      `}</style>

      {/* ── Sticky Nav ── */}
      <motion.nav animate={{ boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.08)' : 'none' }}
        style={{ position: 'sticky', top: 0, zIndex: 200, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)', borderBottom: scrolled ? '1px solid #E5E7EB' : '1px solid transparent', padding: '0 5%', height: '66px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(27,67,50,0.25)' }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M10 4v12" stroke="white" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: '#1B4332', lineHeight: 1 }}>Gyaanpravaha</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#40916C', marginTop: '1px', letterSpacing: '0.04em' }}>ज्ञानप्रवाह · Class 6</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {dashboardHref ? (
            <Link href={dashboardHref} style={{ background: '#1B4332', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', padding: '9px 20px', borderRadius: '10px', textDecoration: 'none' }}>
              Go to Dashboard →
            </Link>
          ) : (
            <>
              <Link href="/login" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '13px', color: '#374151', textDecoration: 'none', padding: '9px 16px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>Log in</Link>
              <Link href="/register" style={{ background: '#1B4332', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', padding: '9px 20px', borderRadius: '10px', textDecoration: 'none' }}>Register →</Link>
            </>
          )}
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <section style={{ background: 'linear-gradient(135deg,#0D2B1F 0%,#1B4332 55%,#2D6A4F 100%)', padding: '80px 5% 100px', position: 'relative', overflow: 'hidden' }}>
        {/* Background rings */}
        <div className="spin" style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', border: '1.5px dashed rgba(116,198,157,0.15)', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(82,183,136,0.08), transparent 70%)', pointerEvents: 'none' }}/>

        <div className="hero-grid" style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div>
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(116,198,157,0.15)', border: '1px solid rgba(116,198,157,0.3)', borderRadius: '20px', padding: '6px 16px', marginBottom: '28px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#74C69D', display: 'inline-block' }}/>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#74C69D' }}>Maharashtra State Board · Class 6 · All subjects</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(38px,5vw,60px)', color: 'white', lineHeight: 1.1, marginBottom: '12px' }}>
              Your syllabus.<br/>
              <span style={{ color: '#74C69D', display: 'inline-block', minHeight: '1.15em' }}>
                {typed}<span className="cursor"/>
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, marginBottom: '36px', maxWidth: '460px' }}>
              Every chapter from your Maharashtra State Board textbooks — explained in simple language, assessed thoroughly, tracked by parents. Not generic content. Your exact syllabus.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href="/register" style={{ background: '#74C69D', color: '#1B4332', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '15px', padding: '14px 30px', borderRadius: '12px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 20px rgba(116,198,157,0.4)' }}>
                Get started — ₹4,999/yr →
              </Link>
              <Link href="/login" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Already registered? Log in
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '20px' }}>
              54 chapters · 378 sections · 864 quiz questions · 8 subjects
            </motion.p>
          </div>

          {/* Platform mockup */}
          <motion.div className="hide-mobile" initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center' }}>
            <PlatformMockup/>
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section ref={statsRef} style={{ background: '#0D2B1F', padding: '48px 5%' }}>
        <div className="stats-grid" style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px', textAlign: 'center' }}>
          {[
            { value: chapterCount, suffix: '', label: 'Chapters covered', sub: 'All 8 subjects · MSB syllabus' },
            { value: sectionCount, suffix: '+', label: 'Lesson sections', sub: '7 sections per chapter' },
            { value: questionCount, suffix: '+', label: 'Quiz questions', sub: 'MCQ, fill in blanks & more' },
          ].map(({ value, suffix, label, sub }) => (
            <div key={label}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(40px,5vw,56px)', color: '#74C69D', lineHeight: 1 }}>{value}{suffix}</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: 'white', marginTop: '8px' }}>{label}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Curriculum coverage ── */}
      <section style={{ padding: '88px 5%', background: '#F8FAFF' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeUp>
            <p style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#4338CA', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Complete curriculum</p>
            <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(26px,4vw,40px)', color: '#1B4332', marginBottom: '12px' }}>
              Every subject. Every chapter.<br/>Your exact textbooks.
            </h2>
            <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '15px', color: '#64748B', maxWidth: '560px', margin: '0 auto 52px', lineHeight: 1.7 }}>
              Built chapter by chapter from Maharashtra State Board textbooks — Balbharati English, Maths Connexion, Sulabhbharati Marathi & Sanskrit, and more.
            </p>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {SUBJECTS.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.06}>
                <div style={{ background: 'white', borderRadius: '18px', border: '1.5px solid #F1F5F9', padding: '22px', display: 'flex', alignItems: 'center', gap: '14px', transition: 'all 0.2s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.boxShadow = `0 8px 24px ${s.color}20`; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#F1F5F9'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}>
                  <div style={{ width: '48px', height: '48px', minWidth: '48px', borderRadius: '14px', background: s.light, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                    {s.emoji}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: '#1F2937', marginBottom: '3px' }}>{s.label}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '13px', color: s.color }}>{s.chapters}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8' }}>chapters</span>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{ padding: '88px 5%' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <FadeUp>
            <p style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#1B4332', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>How it works</p>
            <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(26px,4vw,40px)', color: '#1B4332', marginBottom: '52px' }}>Three steps to mastering every chapter</h2>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { step:'01', emoji:'📖', title:'Read', color:'#4338CA', bg:'#EEF2FF', border:'#C7D2FE', desc:'Every chapter is split into 7 short sections — written the way a tutor would explain it, not how a textbook does. Confirm each section to unlock the next.' },
              { step:'02', emoji:'🎯', title:'Quiz', color:'#0F766E', bg:'#F0FDFA', border:'#5EEAD4', desc:'Once all sections are read, take the quiz. Multiple choice, fill in the blanks, sentence forming and long answers. Wrong answer? The concept is explained again immediately.' },
              { step:'03', emoji:'📊', title:'Track', color:'#78350F', bg:'#FFFBEB', border:'#FDE68A', desc:'Parents see scores, chapters done and time spent — in real time. Students build streaks. Progress is visible to everyone who matters.' },
            ].map((item, i) => (
              <FadeUp key={item.step} delay={i * 0.1}>
                <div style={{ background: item.bg, borderRadius: '20px', border: `1.5px solid ${item.border}`, padding: '32px 28px', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '32px' }}>{item.emoji}</span>
                    <div style={{ background: item.color, color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '11px', padding: '3px 10px', borderRadius: '20px' }}>Step {item.step}</div>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', color: item.color, marginBottom: '10px' }}>{item.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', lineHeight: 1.8 }}>{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Parent visibility ── */}
      <section style={{ padding: '88px 5%', background: '#F8FAFF' }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
          <FadeUp>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#1B4332', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>For parents</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(24px,4vw,36px)', color: '#1B4332', marginBottom: '16px', lineHeight: 1.2 }}>
              Full visibility.<br/>Zero guesswork.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#64748B', lineHeight: 1.8, marginBottom: '28px' }}>
              You set the password, you control the account. Your dashboard shows exactly what your child is studying and how well they are doing — no chasing, no wondering.
            </p>
            {[
              'Chapter-by-chapter scores across all 8 subjects',
              'Quiz scores with subject-wise breakdown',
              'Time spent studying each subject',
              'Weak chapters flagged automatically',
              'Real-time — updates the moment your child studies',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '20px', height: '20px', minWidth: '20px', borderRadius: '50%', background: '#D8F3DC', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5L8.5 2" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}
          </FadeUp>
          <FadeUp delay={0.2}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ParentMockup/>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── For schools ── */}
      <section style={{ padding: '88px 5%' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <FadeUp>
            <p style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#78350F', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>For schools</p>
            <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(26px,4vw,40px)', color: '#1B4332', marginBottom: '12px' }}>
              A platform that works alongside your teachers
            </h2>
            <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '15px', color: '#64748B', maxWidth: '520px', margin: '0 auto 52px', lineHeight: 1.7 }}>
              Gyaanpravaha does not replace classroom teaching — it reinforces it. Everything is aligned to the Maharashtra State Board curriculum your school already follows.
            </p>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {[
              { emoji:'📋', title:'State Board curriculum', color:'#4338CA', bg:'#EEF2FF', desc:'Every chapter, section and quiz question is drawn directly from MSB textbooks. No mismatch between school and platform.' },
              { emoji:'✏️', title:'Teachers assign questions', color:'#0F766E', bg:'#F0FDFA', desc:'Teachers can post class questions and writing prompts directly to students on the platform from their school panel.' },
              { emoji:'👨‍👩‍👦', title:'Parent–school alignment', color:'#78350F', bg:'#FFFBEB', desc:'Parents see the same chapter sequence as school. Progress tracking is based on the school\'s own syllabus order.' },
              { emoji:'📈', title:'School-level insights', color:'#4C1D95', bg:'#F5F3FF', desc:'Schools can view aggregate performance across students, identify common weak areas and plan revision sessions accordingly.' },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.08}>
                <div style={{ background: item.bg, borderRadius: '18px', padding: '24px', height: '100%' }}>
                  <div style={{ fontSize: '28px', marginBottom: '14px' }}>{item.emoji}</div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: item.color, marginBottom: '10px' }}>{item.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', lineHeight: 1.75 }}>{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section style={{ padding: '88px 5%', background: '#F8FAFF' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
          <FadeUp>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#1B4332', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Pricing</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(26px,4vw,38px)', color: '#1B4332', marginBottom: '40px', lineHeight: 1.2 }}>
              One price.<br/>A full year of learning.
            </h2>
            <div style={{ background: 'white', borderRadius: '24px', border: '2px solid #1B4332', padding: '44px 40px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: '#F0FDF4' }}/>
              <div style={{ background: '#D8F3DC', color: '#1B4332', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', padding: '4px 14px', borderRadius: '20px', display: 'inline-block', marginBottom: '20px' }}>Annual plan · Academic year 2025–26</div>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '64px', color: '#1B4332', lineHeight: 1 }}>₹4,999</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#9CA3AF', marginBottom: '8px' }}>per student · per academic year</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#40916C', marginBottom: '32px' }}>That's less than ₹14 per day</p>
              {[
                'All 8 subjects — chapter by chapter',
                '54 chapters · 378 sections · 864 questions',
                'Quiz after every chapter',
                'Parent progress dashboard',
                'Teacher question panel',
                'Full academic year access',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', textAlign: 'left' }}>
                  <div style={{ width: '20px', height: '20px', minWidth: '20px', borderRadius: '50%', background: '#D8F3DC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5L8.5 2" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151' }}>{item}</p>
                </div>
              ))}
              <Link href="/register" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1B4332', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', padding: '16px', borderRadius: '14px', textDecoration: 'none', marginTop: '24px', gap: '8px' }}>
                Register and get access →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ padding: '88px 5%', background: 'linear-gradient(135deg,#0D2B1F 0%,#1B4332 60%,#2D6A4F 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="spin" style={{ position: 'absolute', top: '-120px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', borderRadius: '50%', border: '1.5px dashed rgba(116,198,157,0.12)', pointerEvents: 'none' }}/>
        <FadeUp>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(28px,4vw,48px)', color: 'white', marginBottom: '16px', lineHeight: 1.2 }}>
            Ready to transform<br/>how your child learns?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.65)', marginBottom: '36px', maxWidth: '440px', margin: '0 auto 36px', lineHeight: 1.7 }}>
            Join Gyaanpravaha today. Your syllabus, explained simply, assessed thoroughly.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" style={{ background: '#74C69D', color: '#1B4332', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '15px', padding: '14px 32px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 20px rgba(116,198,157,0.35)' }}>
              Register now →
            </Link>
            <Link href="/login" style={{ border: '1.5px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px', padding: '14px 32px', borderRadius: '12px', textDecoration: 'none' }}>
              Already registered? Log in
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: '#0D2B1F', padding: '40px 5%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M10 4v12" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: 'white' }}>Gyaanpravaha</p>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Maharashtra State Board · Class 6 · All subjects · ₹4,999/year</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>© 2026 Gyaanpravaha · gyaanpravaha.in</p>
        <Link href="/admin/login" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.15)', textDecoration: 'none', marginTop: '4px' }}>Admin</Link>
      </footer>
    </div>
  )
}
