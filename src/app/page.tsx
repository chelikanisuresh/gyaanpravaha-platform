'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ── Typing animation hook ──
function useTypingEffect(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex(i => i + 1), speed)
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(i => i - 1), speed / 2)
    } else if (deleting && charIndex === 0) {
      setDeleting(false)
      setWordIndex(i => (i + 1) % words.length)
    }

    setDisplayed(current.slice(0, charIndex))
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, wordIndex, words, speed, pause])

  return displayed
}

// ── Scroll reveal hook ──
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return { ref, visible }
}

// ── Counter animation ──
function useCounter(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

// ── Reveal section wrapper ──
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

// ── SVG: Student reading illustration ──
function StudentIllustration() {
  return (
    <svg viewBox="0 0 320 320" width="100%" style={{ maxWidth: '380px' }} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Desk */}
      <rect x="40" y="220" width="240" height="14" rx="7" fill="#1B4332" opacity="0.15"/>
      <rect x="60" y="234" width="8" height="40" rx="4" fill="#1B4332" opacity="0.12"/>
      <rect x="252" y="234" width="8" height="40" rx="4" fill="#1B4332" opacity="0.12"/>

      {/* Book open on desk */}
      <rect x="90" y="195" width="70" height="28" rx="4" fill="#D8F3DC" stroke="#2D6A4F" strokeWidth="1.5"/>
      <rect x="160" y="195" width="70" height="28" rx="4" fill="#F0FDF4" stroke="#2D6A4F" strokeWidth="1.5"/>
      <line x1="160" y1="196" x2="160" y2="222" stroke="#2D6A4F" strokeWidth="2"/>
      {/* Book lines */}
      <line x1="100" y1="204" x2="150" y2="204" stroke="#40916C" strokeWidth="1" opacity="0.5"/>
      <line x1="100" y1="210" x2="145" y2="210" stroke="#40916C" strokeWidth="1" opacity="0.5"/>
      <line x1="100" y1="216" x2="148" y2="216" stroke="#40916C" strokeWidth="1" opacity="0.5"/>
      <line x1="170" y1="204" x2="220" y2="204" stroke="#40916C" strokeWidth="1" opacity="0.5"/>
      <line x1="170" y1="210" x2="215" y2="210" stroke="#40916C" strokeWidth="1" opacity="0.5"/>
      <line x1="170" y1="216" x2="218" y2="216" stroke="#40916C" strokeWidth="1" opacity="0.5"/>

      {/* Pencil */}
      <rect x="230" y="188" width="8" height="36" rx="3" fill="#F59E0B" transform="rotate(15 230 188)"/>
      <polygon points="238,222 230,218 234,228" fill="#1B4332" transform="rotate(15 230 188)"/>
      <rect x="230" y="188" width="8" height="6" rx="2" fill="#EF4444" opacity="0.7" transform="rotate(15 230 188)"/>

      {/* Student body */}
      <rect x="128" y="150" width="64" height="70" rx="12" fill="#2D6A4F"/>
      {/* Collar */}
      <path d="M148 150 L160 165 L172 150" stroke="white" strokeWidth="2" fill="none"/>

      {/* Arms */}
      <rect x="95" y="158" width="36" height="14" rx="7" fill="#2D6A4F" transform="rotate(20 95 158)"/>
      <rect x="182" y="155" width="36" height="14" rx="7" fill="#2D6A4F" transform="rotate(-20 182 155)"/>

      {/* Hands */}
      <circle cx="108" cy="196" r="10" fill="#F5C4B3"/>
      <circle cx="210" cy="193" r="10" fill="#F5C4B3"/>

      {/* Neck */}
      <rect x="152" y="110" width="16" height="20" rx="8" fill="#F5C4B3"/>

      {/* Head */}
      <circle cx="160" cy="92" r="36" fill="#F5C4B3"/>

      {/* Hair */}
      <path d="M124 84 Q130 50 160 52 Q190 50 196 84 Q190 60 160 62 Q130 60 124 84Z" fill="#1B4332"/>

      {/* Eyes */}
      <ellipse cx="148" cy="90" rx="5" ry="6" fill="white"/>
      <ellipse cx="172" cy="90" rx="5" ry="6" fill="white"/>
      <circle cx="149" cy="91" r="3" fill="#1B4332"/>
      <circle cx="173" cy="91" r="3" fill="#1B4332"/>
      <circle cx="150" cy="90" r="1" fill="white"/>
      <circle cx="174" cy="90" r="1" fill="white"/>

      {/* Smile */}
      <path d="M150 104 Q160 112 170 104" stroke="#1B4332" strokeWidth="2" strokeLinecap="round" fill="none"/>

      {/* Eyebrows */}
      <path d="M143 82 Q148 79 153 82" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M167 82 Q172 79 177 82" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round" fill="none"/>

      {/* Floating elements - star 1 */}
      <g style={{ animation: 'float1 3s ease-in-out infinite' }}>
        <polygon points="50,60 53,70 63,70 55,76 58,86 50,80 42,86 45,76 37,70 47,70" fill="#F59E0B" opacity="0.9"/>
      </g>

      {/* Floating - lightbulb */}
      <g style={{ animation: 'float2 3.5s ease-in-out infinite' }}>
        <circle cx="272" cy="70" r="18" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2"/>
        <path d="M266 70 Q272 60 278 70 Q278 76 272 78 Q266 76 266 70Z" fill="#F59E0B" opacity="0.6"/>
        <rect x="269" y="79" width="6" height="4" rx="1" fill="#F59E0B" opacity="0.8"/>
        <line x1="272" y1="83" x2="272" y2="86" stroke="#F59E0B" strokeWidth="1.5"/>
        <circle cx="272" cy="70" r="4" fill="#F59E0B"/>
      </g>

      {/* Floating - small star */}
      <g style={{ animation: 'float3 2.8s ease-in-out infinite' }}>
        <polygon points="280,140 282,147 289,147 284,151 286,158 280,154 274,158 276,151 271,147 278,147" fill="#74C69D" opacity="0.9"/>
      </g>

      {/* Floating - book */}
      <g style={{ animation: 'float1 4s ease-in-out infinite 0.5s' }}>
        <rect x="30" y="140" width="28" height="36" rx="3" fill="#6366F1" opacity="0.8"/>
        <rect x="34" y="145" width="16" height="2" rx="1" fill="white" opacity="0.7"/>
        <rect x="34" y="150" width="14" height="2" rx="1" fill="white" opacity="0.7"/>
        <rect x="34" y="155" width="16" height="2" rx="1" fill="white" opacity="0.7"/>
      </g>

      {/* Floating - pencil small */}
      <g style={{ animation: 'float2 3.2s ease-in-out infinite 0.8s' }}>
        <rect x="285" y="165" width="6" height="28" rx="2" fill="#EF4444" opacity="0.8" transform="rotate(20 285 165)"/>
        <polygon points="290,191 285,188 288,196" fill="#1B4332" opacity="0.8" transform="rotate(20 285 165)"/>
      </g>

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.1); }
        }
      `}</style>
    </svg>
  )
}

// ── SVG: Parent dashboard illustration ──
function ParentIllustration() {
  return (
    <svg viewBox="0 0 300 240" width="100%" style={{ maxWidth: '340px' }} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Phone frame */}
      <rect x="80" y="10" width="140" height="220" rx="20" fill="white" stroke="#E5E7EB" strokeWidth="2"/>
      <rect x="85" y="20" width="130" height="200" rx="14" fill="#F0FDF4"/>
      <circle cx="150" cy="15" r="4" fill="#E5E7EB"/>

      {/* App header */}
      <rect x="85" y="20" width="130" height="36" rx="14" fill="#2D6A4F"/>
      <rect x="85" y="42" width="130" height="14" fill="#2D6A4F"/>
      <text x="150" y="40" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="sans-serif">My child's progress</text>

      {/* Subject bars */}
      <rect x="95" y="75" width="110" height="16" rx="8" fill="#E5E7EB"/>
      <rect x="95" y="75" width="88" height="16" rx="8" fill="#2D6A4F"/>
      <text x="95" y="68" fill="#1B4332" fontSize="8" fontWeight="700" fontFamily="sans-serif">English</text>
      <text x="195" y="87" textAnchor="end" fill="#2D6A4F" fontSize="8" fontWeight="700" fontFamily="sans-serif">88%</text>

      <rect x="95" y="110" width="110" height="16" rx="8" fill="#E5E7EB"/>
      <rect x="95" y="110" width="55" height="16" rx="8" fill="#40916C"/>
      <text x="95" y="103" fill="#1B4332" fontSize="8" fontWeight="700" fontFamily="sans-serif">Mathematics</text>
      <text x="195" y="122" textAnchor="end" fill="#40916C" fontSize="8" fontWeight="700" fontFamily="sans-serif">72%</text>

      <rect x="95" y="145" width="110" height="16" rx="8" fill="#E5E7EB"/>
      <rect x="95" y="145" width="33" height="16" rx="8" fill="#F59E0B"/>
      <text x="95" y="138" fill="#1B4332" fontSize="8" fontWeight="700" fontFamily="sans-serif">Science</text>
      <text x="195" y="157" textAnchor="end" fill="#F59E0B" fontSize="8" fontWeight="700" fontFamily="sans-serif">65%</text>

      {/* Streak card */}
      <rect x="95" y="175" width="110" height="32" rx="8" fill="#D8F3DC"/>
      <text x="105" y="188" fill="#1B4332" fontSize="9" fontWeight="700" fontFamily="sans-serif">🔥 7 day streak!</text>
      <text x="105" y="200" fill="#40916C" fontSize="7" fontFamily="sans-serif">Keep it going!</text>

      {/* Floating notification badge */}
      <g style={{ animation: 'float2 3s ease-in-out infinite' }}>
        <rect x="180" y="8" width="56" height="28" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
        <circle cx="192" cy="22" r="7" fill="#10B981"/>
        <text x="192" y="26" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="sans-serif">✓</text>
        <text x="202" y="19" fill="#1B4332" fontSize="7" fontWeight="700" fontFamily="sans-serif">Quiz</text>
        <text x="202" y="27" fill="#40916C" fontSize="7" fontFamily="sans-serif">done!</text>
      </g>

      <style>{`
        @keyframes float2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </svg>
  )
}

// ── Main page ──
export default function HomePage() {
  const typed = useTypingEffect(['Learn it.', 'Know it.', 'Flow with it.'], 90, 1600)
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const chapters   = useCounter(8,  1200, statsVisible)
  const sections   = useCounter(56, 1400, statsVisible)
  const questions  = useCounter(200, 1600, statsVisible)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--white)', overflowX: 'hidden' }}>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatA {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-10px) rotate(6deg); }
        }
        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 0 0 rgba(45,106,79,0.25); }
          50%       { box-shadow: 0 0 0 14px rgba(45,106,79,0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .hero-text { animation: fadeInUp 0.8s ease forwards; }
        .hero-sub  { animation: fadeInUp 0.8s ease 0.2s both; }
        .hero-btns { animation: fadeInUp 0.8s ease 0.4s both; }
        .hero-illo { animation: fadeInUp 0.9s ease 0.3s both; }
        .float-a   { animation: floatA 3.5s ease-in-out infinite; }
        .float-b   { animation: floatB 4s ease-in-out infinite 0.5s; }
        .card-hover { transition: transform 0.25s, box-shadow 0.25s; cursor: default; }
        .card-hover:hover { transform: translateY(-5px); box-shadow: 0 16px 32px rgba(45,106,79,0.12); }
        .btn-pulse { animation: pulse-green 2.5s ease-in-out infinite; }
        .cursor {
          display: inline-block;
          width: 3px;
          height: 1em;
          background: #74C69D;
          margin-left: 4px;
          vertical-align: middle;
          animation: blink 0.8s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .spin-slow { animation: spin-slow 18s linear infinite; }
        @media (max-width: 640px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-illo { display: none !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 5%', height: '68px',
        borderBottom: '1px solid var(--gray-200)',
        position: 'sticky', top: 0,
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px', height: '38px', background: 'var(--green-dark)',
            borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C6.5 2 4 4.5 4 8c0 2 1 3.8 2.5 5v3l3.5-1.5 3.5 1.5v-3C15 11.8 16 10 16 8c0-3.5-2.5-6-6-6z" fill="white" opacity="0.2"/>
              <path d="M6 8h8M10 4v8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="10" cy="8" r="1.2" fill="#74C69D"/>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '17px', color: 'var(--green-deepest)', lineHeight: 1 }}>Gyaanpravaha</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--green-mid)', lineHeight: 1, marginTop: '2px' }}>ज्ञानप्रवाह</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/login" className="btn-outline" style={{ padding: '8px 20px', fontSize: '14px' }}>Log in</Link>
          <Link href="/signup" className="btn-primary btn-pulse" style={{ padding: '8px 20px', fontSize: '14px' }}>Get started</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(135deg, var(--green-deepest) 0%, var(--green-dark) 55%, var(--green-mid) 100%)',
        padding: '80px 5% 100px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative spinning ring */}
        <div className="spin-slow" style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '360px', height: '360px', borderRadius: '50%',
          border: '2px dashed rgba(116,198,157,0.25)',
          pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '280px', height: '280px', borderRadius: '50%',
          background: 'rgba(216,243,220,0.06)',
          pointerEvents: 'none',
        }}/>

        <div className="hero-grid" style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '48px', alignItems: 'center',
        }}>
          {/* Left — text */}
          <div>
            <div className="hero-text" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(116,198,157,0.18)', border: '1px solid rgba(116,198,157,0.35)',
              borderRadius: '20px', padding: '5px 14px', marginBottom: '24px',
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#74C69D', display: 'inline-block', flexShrink: 0 }}/>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#74C69D', fontWeight: 500 }}>Now live — start learning today</span>
            </div>

            <h1 className="hero-text" style={{
              fontFamily: 'var(--font-heading)', fontWeight: 900,
              fontSize: 'clamp(40px, 5vw, 62px)',
              color: 'white', lineHeight: 1.12, marginBottom: '10px',
            }}>
              <span style={{ color: '#74C69D', display: 'block', minHeight: '1.15em' }}>
                {typed}<span className="cursor"/>
              </span>
            </h1>

            <p className="hero-sub" style={{
              fontFamily: 'var(--font-body)', fontSize: '17px',
              color: 'rgba(255,255,255,0.78)', lineHeight: 1.75,
              marginBottom: '36px', maxWidth: '480px',
            }}>
              A digital learning platform that brings your syllabus to life.
              Every chapter explained simply, every concept practised smartly,
              every step tracked closely.
            </p>

            <div className="hero-btns" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/signup" className="btn-primary" style={{
                background: '#74C69D', color: 'var(--green-deepest)',
                fontSize: '16px', padding: '14px 32px', fontWeight: 800,
              }}>
                Start for free
              </Link>
              <Link href="/login" className="btn-outline" style={{
                borderColor: 'rgba(255,255,255,0.4)', color: 'white',
                fontSize: '16px', padding: '14px 32px',
              }}>
                Log in
              </Link>
            </div>
          </div>

          {/* Right — illustration */}
          <div className="hero-illo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <StudentIllustration />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} style={{ padding: '56px 5%', background: 'var(--green-deepest)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', textAlign: 'center' }}>
          {[
            { count: chapters,  suffix: '',  label: 'Chapters covered' },
            { count: sections,  suffix: '+', label: 'Lesson sections' },
            { count: questions, suffix: '+', label: 'Practice questions' },
          ].map(({ count, suffix, label }) => (
            <div key={label}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(36px, 5vw, 52px)', color: '#74C69D', lineHeight: 1 }}>
                {count}{suffix}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginTop: '6px' }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '88px 5%', background: 'var(--green-pale)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <Reveal>
            <p style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: 'var(--green-mid)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>How it works</p>
            <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(26px, 4vw, 38px)', color: 'var(--green-deepest)', marginBottom: '56px' }}>
              Three steps to mastering every chapter
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {[
              {
                delay: 0,
                emoji: '📖',
                step: '01', title: 'Learn it',
                desc: 'Every chapter is explained in simple, friendly language — just like a tuition teacher. Read through 7 sections and confirm as you go.',
                color: 'var(--green-dark)',
              },
              {
                delay: 150,
                emoji: '✅',
                step: '02', title: 'Know it',
                desc: 'Unlock the quiz after reading. MCQs, fill in the blanks, sentence forming, and long answers. Wrong answer? Concept re-explained immediately.',
                color: '#6366F1',
              },
              {
                delay: 300,
                emoji: '🌊',
                step: '03', title: 'Flow with it',
                desc: 'Track your progress, build streaks, and let your parents see exactly how well you are doing. Knowledge that flows stays with you forever.',
                color: 'var(--amber)',
              },
            ].map(({ delay, emoji, step, title, desc, color }) => (
              <Reveal key={step} delay={delay}>
                <div className="card card-hover" style={{ textAlign: 'center', padding: '40px 28px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-16px', right: '-16px', width: '80px', height: '80px', borderRadius: '50%', background: `${color}12` }}/>
                  <div style={{ fontSize: '40px', marginBottom: '16px' }}>{emoji}</div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: color, color: 'white',
                    fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '13px',
                    marginBottom: '14px',
                  }}>
                    {step}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '22px', color: 'var(--green-deepest)', marginBottom: '12px' }}>{title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-600)', lineHeight: 1.75 }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '88px 5%' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <Reveal>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: 'var(--green-mid)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', textAlign: 'center' }}>What you get</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(26px, 4vw, 38px)', color: 'var(--green-deepest)', marginBottom: '56px', textAlign: 'center' }}>
              Everything a student needs to excel
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {[
              { emoji: '📚', title: 'Chapter-by-chapter lessons', desc: 'Every chapter broken into 7 easy sections. Read at your own pace with a confirmation gate at each step.', delay: 0 },
              { emoji: '🎯', title: 'Smart assessments', desc: 'MCQs, fill in the blanks, sentence forming, and long answers — all in one structured quiz per chapter.', delay: 100 },
              { emoji: '💡', title: 'Instant re-explanation', desc: 'Answer wrong and we immediately re-explain that exact concept. No red marks, just better understanding.', delay: 200 },
              { emoji: '✍️', title: 'Writing practice', desc: 'Writing prompts assigned by your teacher, AI-evaluated, and reviewed before your final score is released.', delay: 0 },
              { emoji: '📊', title: 'Parent dashboard', desc: 'Parents see chapter scores, time spent studying, weak areas, and writing submissions — all in one view.', delay: 100 },
              { emoji: '🔥', title: 'Streak tracking', desc: 'Study every day and build your streak. Consistency is the secret to lasting results.', delay: 200 },
            ].map(({ emoji, title, desc, delay }) => (
              <Reveal key={title} delay={delay}>
                <div className="card card-hover" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span style={{ fontSize: '32px' }}>{emoji}</span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '17px', color: 'var(--green-deepest)' }}>{title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-600)', lineHeight: 1.75 }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARENT SECTION ── */}
      <section style={{ padding: '88px 5%', background: 'var(--green-pale)' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '56px', alignItems: 'center' }}>
          <Reveal>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: 'var(--green-mid)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>For parents</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(24px, 4vw, 34px)', color: 'var(--green-deepest)', marginBottom: '16px' }}>
              Stay close to your child's learning
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--gray-600)', lineHeight: 1.75, marginBottom: '28px' }}>
              Your parent dashboard gives you complete visibility — what your child is studying,
              how they are scoring, and where they need more attention.
            </p>
            {[
              'Chapter-wise scores and progress bars',
              'Time spent studying per subject',
              'Weak chapters highlighted clearly',
              'Writing prompt submissions and scores',
              'Subscription status and renewal date',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--green-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M2 5.5l2.5 2.5L9 3" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-700)' }}>{item}</p>
              </div>
            ))}
          </Reveal>
          <Reveal delay={200}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ParentIllustration />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding: '88px 5%' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: 'var(--green-mid)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Pricing</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(24px, 4vw, 36px)', color: 'var(--green-deepest)', marginBottom: '40px' }}>
              One subscription.<br />Full year of learning.
            </h2>
            <div className="card" style={{ padding: '44px 36px', border: '2.5px solid var(--green-dark)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px', borderRadius: '50%', background: 'var(--green-pale)' }}/>
              <div className="badge badge-green" style={{ marginBottom: '20px' }}>Annual plan</div>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '56px', color: 'var(--green-deepest)', lineHeight: 1 }}>₹2,499</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-400)', marginBottom: '32px' }}>per student · per academic year</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', textAlign: 'left' }}>
                {[
                  'All subjects — chapter by chapter',
                  '7 sections + quiz per chapter',
                  'Writing prompts and evaluation',
                  'Parent progress dashboard',
                  'AI doubt solver',
                  'Full academic year access',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--green-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-700)' }}>{item}</p>
                  </div>
                ))}
              </div>
              <Link href="/signup" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: '16px' }}>
                Get started today
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{
        padding: '80px 5%',
        background: 'linear-gradient(135deg, var(--green-deepest) 0%, var(--green-dark) 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="spin-slow" style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '500px', borderRadius: '50%', border: '1.5px dashed rgba(116,198,157,0.2)', pointerEvents: 'none' }}/>
        <Reveal>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(28px, 4vw, 44px)', color: 'white', marginBottom: '16px' }}>
            Ready to start your journey?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginBottom: '36px', maxWidth: '460px', margin: '0 auto 36px' }}>
            Join Gyaanpravaha and experience learning that truly flows.
          </p>
          <Link href="/signup" className="btn-primary" style={{ background: '#74C69D', color: 'var(--green-deepest)', fontSize: '17px', padding: '16px 40px', fontWeight: 800 }}>
            Create your free account
          </Link>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: 'var(--green-deepest)', padding: '44px 5%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '34px', height: '34px', background: 'rgba(255,255,255,0.1)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M6 8h8M10 4v8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="10" cy="8" r="1.2" fill="#74C69D"/>
            </svg>
          </div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '17px', color: 'white' }}>Gyaanpravaha</p>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
          Learn it. Know it. Flow with it.
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.28)' }}>
          © 2026 Gyaanpravaha · gyaanpravaha.in
        </p>
      </footer>

    </div>
  )
}
