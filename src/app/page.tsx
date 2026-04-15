'use client'

import { useState, useEffect, useRef } from 'react'
import { TOTAL_CHAPTERS, TOTAL_SECTIONS, SUBJECT_COUNT } from '@/lib/subjects-config'
import Link from 'next/link'

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


// ── Product Preview Slider ─────────────────────────────────────────────────────
const SLIDES = [
  {
    label: 'Student Dashboard',
    tag: 'For students',
    tagColor: '#74C69D',
    color: '#1B4332',
    accent: '#52B788',
    description: 'All subjects at a glance with progress, streaks and next chapter to read.',
    mockup: (
      <div style={{ fontFamily:'var(--font-heading)', background:'#F0FDF4', borderRadius:'16px', padding:'20px', height:'100%' }}>
        {/* Greeting */}
        <div style={{ background:'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius:'12px', padding:'16px', marginBottom:'14px' }}>
          <p style={{ fontSize:'11px', color:'#74C69D', fontWeight:700, marginBottom:'4px' }}>Good morning, Arjun! 👋</p>
          <p style={{ fontSize:'18px', color:'white', fontWeight:900, lineHeight:1.2 }}>3 of 90 chapters done</p>
          <div style={{ marginTop:'8px', height:'4px', background:'rgba(255,255,255,0.15)', borderRadius:'2px', overflow:'hidden' }}>
            <div style={{ width:'8%', height:'100%', background:'#74C69D', borderRadius:'2px' }}/>
          </div>
        </div>
        {/* Stats row */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'8px', marginBottom:'14px' }}>
          {([{e:'📚',v:'3',l:'Chapters'},{e:'⭐',v:'82%',l:'Avg score'},{e:'🔥',v:'5',l:'Day streak'}] as {e:string,v:string,l:string}[]).map(({e,v,l}) => (
            <div key={l} style={{ background:'white', borderRadius:'10px', padding:'10px', textAlign:'center' }}>
              <div style={{ fontSize:'16px', marginBottom:'2px' }}>{e}</div>
              <div style={{ fontSize:'14px', fontWeight:900, color:'#1B4332', lineHeight:1 }}>{v}</div>
              <div style={{ fontSize:'9px', color:'#9CA3AF', marginTop:'2px' }}>{l}</div>
            </div>
          ))}
        </div>
        {/* Subject grid */}
        <p style={{ fontSize:'9px', color:'#9CA3AF', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'8px' }}>Your subjects</p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px' }}>
          {[['📖','English','#1B4332','3/8'],['🔢','Maths','#1E3A5F','0/11'],['🔬','Science','#3B1F5E','0/9'],['🌍','Geography','#064E3B','0/7']].map(([e,l,c,p]) => (
            <div key={l} style={{ background:'white', borderRadius:'8px', padding:'8px', display:'flex', alignItems:'center', gap:'6px' }}>
              <span style={{ fontSize:'14px' }}>{e}</span>
              <div>
                <p style={{ fontSize:'10px', fontWeight:800, color:c, lineHeight:1 }}>{l}</p>
                <p style={{ fontSize:'8px', color:'#9CA3AF', marginTop:'1px' }}>{p} chapters</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: 'Chapter Reader',
    tag: 'Read & learn',
    tagColor: '#60A5FA',
    color: '#1E3A5F',
    accent: '#3B82F6',
    description: 'Every chapter in 7 easy sections. Read at your pace, listen with voice, confirm when ready.',
    mockup: (
      <div style={{ fontFamily:'var(--font-body)', background:'#F8FAFF', borderRadius:'16px', padding:'20px', height:'100%' }}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'14px' }}>
          <div style={{ width:'28px', height:'28px', borderRadius:'8px', background:'#1E3A5F', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px' }}>📖</div>
          <div>
            <p style={{ fontSize:'11px', fontWeight:800, color:'#1E3A5F', lineHeight:1 }}>Whistles and Shaving Bristles</p>
            <p style={{ fontSize:'9px', color:'#9CA3AF' }}>Section 4 of 7 · English</p>
          </div>
        </div>
        {/* Progress dots */}
        <div style={{ display:'flex', gap:'4px', marginBottom:'14px' }}>
          {[1,2,3,4,5,6,7].map(i => (
            <div key={i} style={{ flex:1, height:'4px', borderRadius:'2px', background: i<=4 ? '#1E3A5F' : '#E2E8F0' }}/>
          ))}
        </div>
        {/* Content */}
        <div style={{ background:'white', borderRadius:'10px', padding:'12px', marginBottom:'10px' }}>
          <p style={{ fontSize:'10px', color:'#374151', lineHeight:1.8 }}>
            Mr Gillman was what people called an <span style={{ background:'#DBEAFE', borderRadius:'3px', padding:'0 3px', color:'#1E40AF', fontWeight:600 }}>efficiency expert</span>. He had an <span style={{ background:'#DBEAFE', borderRadius:'3px', padding:'0 3px', color:'#1E40AF', fontWeight:600 }}>eagle eye</span> for wasted movement. Every morning he timed himself shaving to see if he could do it faster than the day before...
          </p>
        </div>
        {/* Voice bar */}
        <div style={{ background:'#1E3A5F', borderRadius:'10px', padding:'10px 12px', display:'flex', alignItems:'center', gap:'8px' }}>
          <div style={{ width:'24px', height:'24px', borderRadius:'50%', background:'#3B82F6', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px', color:'white' }}>▶</div>
          <div style={{ flex:1 }}>
            <div style={{ height:'3px', background:'rgba(255,255,255,0.2)', borderRadius:'2px', overflow:'hidden' }}>
              <div style={{ width:'35%', height:'100%', background:'#60A5FA', borderRadius:'2px' }}/>
            </div>
          </div>
          <p style={{ fontSize:'9px', color:'rgba(255,255,255,0.6)' }}>Reading aloud…</p>
        </div>
        {/* Mark read button */}
        <div style={{ marginTop:'10px', background:'#1E3A5F', borderRadius:'8px', padding:'8px', textAlign:'center' }}>
          <p style={{ fontSize:'10px', color:'white', fontWeight:700 }}>✓ Mark section as read</p>
        </div>
      </div>
    ),
  },
  {
    label: 'Smart Quiz',
    tag: 'Test yourself',
    tagColor: '#A78BFA',
    color: '#3B1F5E',
    accent: '#8B5CF6',
    description: 'Wrong answer? The concept is explained again instantly. No red marks — just better understanding.',
    mockup: (
      <div style={{ fontFamily:'var(--font-body)', background:'#F5F3FF', borderRadius:'16px', padding:'20px', height:'100%' }}>
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
          <p style={{ fontSize:'9px', fontWeight:700, color:'#6D28D9', textTransform:'uppercase', letterSpacing:'0.08em' }}>Science · Chapter 1</p>
          <p style={{ fontSize:'9px', color:'#9CA3AF' }}>Q 3 of 14</p>
        </div>
        <div style={{ height:'3px', background:'#E5E7EB', borderRadius:'2px', marginBottom:'14px', overflow:'hidden' }}>
          <div style={{ width:'21%', height:'100%', background:'#8B5CF6', borderRadius:'2px' }}/>
        </div>
        {/* Question */}
        <div style={{ background:'white', borderRadius:'10px', padding:'12px', marginBottom:'10px' }}>
          <p style={{ fontSize:'11px', fontWeight:700, color:'#1F2937', lineHeight:1.5 }}>
            What property of a magnet allows it to attract iron objects even without touching them?
          </p>
        </div>
        {/* Options */}
        <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
          {[['A','Gravity','neutral'],['B','Magnetic field','correct'],['C','Electric charge','neutral'],['D','Friction','wrong']].map(([l,t,s]) => (
            <div key={l} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'8px 10px', borderRadius:'8px', background: s==='correct'?'#D1FAE5':s==='wrong'?'#FEE2E2':'white', border:`1px solid ${s==='correct'?'#10B981':s==='wrong'?'#EF4444':'#E5E7EB'}` }}>
              <div style={{ width:'18px', height:'18px', borderRadius:'50%', background: s==='correct'?'#10B981':s==='wrong'?'#EF4444':'#F3F4F6', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'8px', fontWeight:800, color: s!=='neutral'?'white':'#9CA3AF', flexShrink:0 }}>{l}</div>
              <p style={{ fontSize:'10px', color: s==='correct'?'#065F46':s==='wrong'?'#991B1B':'#374151', fontWeight: s!=='neutral'?700:400 }}>{t}</p>
              {s==='correct' && <span style={{ marginLeft:'auto', fontSize:'9px', color:'#10B981' }}>✓ Correct!</span>}
              {s==='wrong' && <span style={{ marginLeft:'auto', fontSize:'9px', color:'#EF4444' }}>✗</span>}
            </div>
          ))}
        </div>
        {/* Re-explanation */}
        <div style={{ marginTop:'10px', background:'#FEE2E2', borderRadius:'8px', padding:'8px', border:'1px solid #EF4444' }}>
          <p style={{ fontSize:'9px', fontWeight:700, color:'#991B1B', marginBottom:'2px' }}>✗ Not quite! Here is why:</p>
          <p style={{ fontSize:'9px', color:'#991B1B', lineHeight:1.5 }}>A magnetic field is the invisible force around a magnet that pulls on iron objects without touching them.</p>
        </div>
      </div>
    ),
  },
  {
    label: 'Parent Dashboard',
    tag: 'For parents',
    tagColor: '#FBBF24',
    color: '#78350F',
    accent: '#F59E0B',
    description: 'Full visibility into progress, scores, exam results and mistakes — no surprises.',
    mockup: (
      <div style={{ fontFamily:'var(--font-body)', background:'#FFFBEB', borderRadius:'16px', padding:'20px', height:'100%' }}>
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' }}>
          <div>
            <p style={{ fontSize:'11px', fontWeight:800, color:'#78350F' }}>Arjun&apos;s Progress</p>
            <p style={{ fontSize:'9px', color:'#B45309' }}>Updated just now</p>
          </div>
          <div style={{ background:'#D1FAE5', borderRadius:'20px', padding:'4px 10px' }}>
            <p style={{ fontSize:'9px', fontWeight:700, color:'#065F46' }}>● Active</p>
          </div>
        </div>
        {/* Exam result */}
        <div style={{ background:'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius:'10px', padding:'12px', marginBottom:'10px', display:'flex', alignItems:'center', gap:'10px' }}>
          <span style={{ fontSize:'16px' }}>📋</span>
          <div style={{ flex:1 }}>
            <p style={{ fontSize:'10px', fontWeight:700, color:'white' }}>Unit Test 1 Result</p>
            <p style={{ fontSize:'9px', color:'rgba(255,255,255,0.6)' }}>Attempted 12 Apr 2026</p>
          </div>
          <div style={{ textAlign:'center' }}>
            <p style={{ fontSize:'20px', fontWeight:900, color:'#74C69D', lineHeight:1 }}>78%</p>
            <p style={{ fontSize:'8px', color:'rgba(255,255,255,0.5)' }}>Score</p>
          </div>
        </div>
        {/* Subject progress */}
        <p style={{ fontSize:'9px', fontWeight:700, color:'#92400E', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'8px' }}>Subject progress</p>
        <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
          {([{e:'📖',l:'English',c:'#1B4332',score:82,done:3,total:8},{e:'🔢',l:'Maths',c:'#1E3A5F',score:0,done:0,total:11},{e:'🔬',l:'Science',c:'#3B1F5E',score:0,done:0,total:9}] as {e:string,l:string,c:string,score:number,done:number,total:number}[]).map(({e,l,c,score,done,total}) => (
            <div key={l} style={{ background:'white', borderRadius:'8px', padding:'8px 10px', display:'flex', alignItems:'center', gap:'8px' }}>
              <span style={{ fontSize:'12px' }}>{e}</span>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'3px' }}>
                  <p style={{ fontSize:'9px', fontWeight:700, color:c }}>{l}</p>
                  <p style={{ fontSize:'9px', color:'#9CA3AF' }}>{done}/{total}</p>
                </div>
                <div style={{ height:'3px', background:'#F1F5F9', borderRadius:'2px', overflow:'hidden' }}>
                  <div style={{ width:`${(done/total)*100}%`, height:'100%', background:c, borderRadius:'2px' }}/>
                </div>
              </div>
              {score > 0 && <p style={{ fontSize:'9px', fontWeight:700, color:c }}>{score}%</p>}
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

function ProductSlider() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setActive(a => (a + 1) % SLIDES.length)
        setAnimating(false)
      }, 300)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (i: number) => {
    if (i === active) return
    setAnimating(true)
    setTimeout(() => { setActive(i); setAnimating(false) }, 300)
  }

  const slide = SLIDES[active]

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px', alignItems:'center' }}>

      {/* Left — text + nav */}
      <div>
        {/* Tab pills */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'32px' }}>
          {SLIDES.map((s, i) => (
            <button key={s.label} onClick={() => goTo(i)}
              style={{ padding:'7px 16px', borderRadius:'20px', border:`1.5px solid ${i === active ? s.tagColor : 'rgba(255,255,255,0.12)'}`, background: i === active ? `${s.tagColor}20` : 'transparent', color: i === active ? s.tagColor : 'rgba(255,255,255,0.4)', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', cursor:'pointer', transition:'all 0.2s' }}>
              {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(8px)' : 'translateY(0)', transition:'opacity 0.3s, transform 0.3s' }}>
          <span style={{ display:'inline-block', background:`${slide.tagColor}25`, color:slide.tagColor, fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', padding:'4px 12px', borderRadius:'20px', letterSpacing:'0.06em', marginBottom:'16px' }}>
            {slide.tag}
          </span>
          <h3 style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'clamp(22px,3vw,32px)', color:'white', marginBottom:'14px', lineHeight:1.2 }}>
            {slide.label}
          </h3>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'15px', color:'rgba(255,255,255,0.6)', lineHeight:1.75 }}>
            {slide.description}
          </p>
        </div>

        {/* Progress dots */}
        <div style={{ display:'flex', gap:'8px', marginTop:'32px' }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              style={{ width: i === active ? '28px' : '8px', height:'8px', borderRadius:'4px', border:'none', background: i === active ? SLIDES[i].tagColor : 'rgba(255,255,255,0.2)', cursor:'pointer', transition:'all 0.3s', padding:0 }}/>
          ))}
        </div>
      </div>

      {/* Right — phone mockup */}
      <div style={{ display:'flex', justifyContent:'center' }}>
        <div style={{ width:'280px', background:'#111827', borderRadius:'32px', padding:'12px', boxShadow:'0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)', position:'relative' }}>
          {/* Phone notch */}
          <div style={{ width:'80px', height:'24px', background:'#111827', borderRadius:'0 0 14px 14px', position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', zIndex:2, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ width:'40px', height:'4px', background:'#1F2937', borderRadius:'2px' }}/>
          </div>
          {/* Screen */}
          <div style={{ borderRadius:'22px', overflow:'hidden', background:'white', minHeight:'420px',
            opacity: animating ? 0 : 1, transform: animating ? 'scale(0.97)' : 'scale(1)',
            transition:'opacity 0.3s, transform 0.3s' }}>
            {/* Status bar */}
            <div style={{ background:slide.color, padding:'8px 16px 4px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'9px', color:'white' }}>9:41</p>
              <p style={{ fontSize:'9px', color:'white' }}>●●● WiFi 🔋</p>
            </div>
            {/* Content */}
            <div style={{ padding:'12px', minHeight:'388px' }}>
              {slide.mockup}
            </div>
          </div>
          {/* Home bar */}
          <div style={{ height:'20px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ width:'60px', height:'4px', background:'rgba(255,255,255,0.15)', borderRadius:'2px' }}/>
          </div>
        </div>
      </div>
    </div>
  )
}

function StudentIllustration() {
  return (
    <svg viewBox="0 0 320 320" width="100%" style={{ maxWidth: '380px' }} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="220" width="240" height="14" rx="7" fill="#1B4332" opacity="0.15"/>
      <rect x="60" y="234" width="8" height="40" rx="4" fill="#1B4332" opacity="0.12"/>
      <rect x="252" y="234" width="8" height="40" rx="4" fill="#1B4332" opacity="0.12"/>
      <rect x="90" y="195" width="70" height="28" rx="4" fill="#D8F3DC" stroke="#2D6A4F" strokeWidth="1.5"/>
      <rect x="160" y="195" width="70" height="28" rx="4" fill="#F0FDF4" stroke="#2D6A4F" strokeWidth="1.5"/>
      <line x1="160" y1="196" x2="160" y2="222" stroke="#2D6A4F" strokeWidth="2"/>
      <line x1="100" y1="204" x2="150" y2="204" stroke="#40916C" strokeWidth="1" opacity="0.5"/>
      <line x1="100" y1="210" x2="145" y2="210" stroke="#40916C" strokeWidth="1" opacity="0.5"/>
      <line x1="100" y1="216" x2="148" y2="216" stroke="#40916C" strokeWidth="1" opacity="0.5"/>
      <line x1="170" y1="204" x2="220" y2="204" stroke="#40916C" strokeWidth="1" opacity="0.5"/>
      <line x1="170" y1="210" x2="215" y2="210" stroke="#40916C" strokeWidth="1" opacity="0.5"/>
      <line x1="170" y1="216" x2="218" y2="216" stroke="#40916C" strokeWidth="1" opacity="0.5"/>
      <rect x="128" y="150" width="64" height="70" rx="12" fill="#2D6A4F"/>
      <path d="M148 150 L160 165 L172 150" stroke="white" strokeWidth="2" fill="none"/>
      <rect x="95" y="158" width="36" height="14" rx="7" fill="#2D6A4F" transform="rotate(20 95 158)"/>
      <rect x="182" y="155" width="36" height="14" rx="7" fill="#2D6A4F" transform="rotate(-20 182 155)"/>
      <circle cx="108" cy="196" r="10" fill="#F5C4B3"/>
      <circle cx="210" cy="193" r="10" fill="#F5C4B3"/>
      <rect x="152" y="110" width="16" height="20" rx="8" fill="#F5C4B3"/>
      <circle cx="160" cy="92" r="36" fill="#F5C4B3"/>
      <path d="M124 84 Q130 50 160 52 Q190 50 196 84 Q190 60 160 62 Q130 60 124 84Z" fill="#1B4332"/>
      <ellipse cx="148" cy="90" rx="5" ry="6" fill="white"/>
      <ellipse cx="172" cy="90" rx="5" ry="6" fill="white"/>
      <circle cx="149" cy="91" r="3" fill="#1B4332"/>
      <circle cx="173" cy="91" r="3" fill="#1B4332"/>
      <circle cx="150" cy="90" r="1" fill="white"/>
      <circle cx="174" cy="90" r="1" fill="white"/>
      <path d="M150 104 Q160 112 170 104" stroke="#1B4332" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M143 82 Q148 79 153 82" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M167 82 Q172 79 177 82" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <g style={{ animation: 'float1 3s ease-in-out infinite' }}>
        <polygon points="50,60 53,70 63,70 55,76 58,86 50,80 42,86 45,76 37,70 47,70" fill="#F59E0B" opacity="0.9"/>
      </g>
      <g style={{ animation: 'float2 3.5s ease-in-out infinite' }}>
        <circle cx="272" cy="70" r="18" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2"/>
        <circle cx="272" cy="70" r="4" fill="#F59E0B"/>
        <rect x="269" y="79" width="6" height="4" rx="1" fill="#F59E0B" opacity="0.8"/>
      </g>
      <g style={{ animation: 'float3 2.8s ease-in-out infinite' }}>
        <polygon points="280,140 282,147 289,147 284,151 286,158 280,154 274,158 276,151 271,147 278,147" fill="#74C69D" opacity="0.9"/>
      </g>
      <g style={{ animation: 'float1 4s ease-in-out infinite 0.5s' }}>
        <rect x="30" y="140" width="28" height="36" rx="3" fill="#6366F1" opacity="0.8"/>
        <rect x="34" y="145" width="16" height="2" rx="1" fill="white" opacity="0.7"/>
        <rect x="34" y="150" width="14" height="2" rx="1" fill="white" opacity="0.7"/>
        <rect x="34" y="155" width="16" height="2" rx="1" fill="white" opacity="0.7"/>
      </g>
      <g style={{ animation: 'float2 3.2s ease-in-out infinite 0.8s' }}>
        <rect x="285" y="165" width="6" height="28" rx="2" fill="#EF4444" opacity="0.8" transform="rotate(20 285 165)"/>
        <polygon points="290,191 285,188 288,196" fill="#1B4332" opacity="0.8" transform="rotate(20 285 165)"/>
      </g>
      <style>{`
        @keyframes float1 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-10px) rotate(5deg); } }
        @keyframes float3 { 0%, 100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-8px) scale(1.1); } }
      `}</style>
    </svg>
  )
}

function ParentIllustration() {
  return (
    <svg viewBox="0 0 300 240" width="100%" style={{ maxWidth: '340px' }} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="80" y="10" width="140" height="220" rx="20" fill="white" stroke="#E5E7EB" strokeWidth="2"/>
      <rect x="85" y="20" width="130" height="200" rx="14" fill="#F0FDF4"/>
      <circle cx="150" cy="15" r="4" fill="#E5E7EB"/>
      <rect x="85" y="20" width="130" height="36" rx="14" fill="#2D6A4F"/>
      <rect x="85" y="42" width="130" height="14" fill="#2D6A4F"/>
      <text x="150" y="40" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="sans-serif">My child's progress</text>
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
      <rect x="95" y="175" width="110" height="32" rx="8" fill="#D8F3DC"/>
      <text x="105" y="188" fill="#1B4332" fontSize="9" fontWeight="700" fontFamily="sans-serif">🔥 7 day streak!</text>
      <text x="105" y="200" fill="#40916C" fontSize="7" fontFamily="sans-serif">Keep it going!</text>
      <g style={{ animation: 'floatB 3s ease-in-out infinite' }}>
        <rect x="180" y="8" width="56" height="28" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
        <circle cx="192" cy="22" r="7" fill="#10B981"/>
        <text x="192" y="26" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="sans-serif">✓</text>
        <text x="202" y="19" fill="#1B4332" fontSize="7" fontWeight="700" fontFamily="sans-serif">Quiz</text>
        <text x="202" y="27" fill="#40916C" fontSize="7" fontFamily="sans-serif">done!</text>
      </g>
      <style>{`@keyframes floatB { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }`}</style>
    </svg>
  )
}

export default function HomePage() {
  const [dashboardHref, setDashboardHref] = useState('')

  useEffect(() => {
    const checkAuth = async () => {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Check role — parent or student
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle()

      if (profile?.role === 'parent') {
        setDashboardHref('/parent/dashboard')
      } else if (profile?.role === 'admin') {
        setDashboardHref('/admin')
      } else {
        setDashboardHref('/student/dashboard')
      }
    }
    checkAuth()
  }, [])
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

  const chapters  = useCounter(TOTAL_CHAPTERS,  1200, statsVisible)
  const sections  = useCounter(TOTAL_SECTIONS,   1400, statsVisible)
  const questions = useCounter(1338, 1600, statsVisible)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--white)', overflowX: 'hidden' }}>
      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spinSlow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes pulseGreen { 0%,100%{box-shadow:0 0 0 0 rgba(45,106,79,0.25);} 50%{box-shadow:0 0 0 14px rgba(45,106,79,0);} }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
        .hero-anim { animation: fadeInUp 0.8s ease forwards; }
        .hero-sub  { animation: fadeInUp 0.8s ease 0.2s both; }
        .hero-btns { animation: fadeInUp 0.8s ease 0.4s both; }
        .hero-illo { animation: fadeInUp 0.9s ease 0.3s both; }
        .spin-slow { animation: spinSlow 18s linear infinite; }
        .btn-pulse { animation: pulseGreen 2.5s ease-in-out infinite; }
        .cursor { display:inline-block; width:3px; height:1em; background:#74C69D; margin-left:4px; vertical-align:middle; animation:blink 0.8s step-end infinite; }
        .card-hover { transition:transform 0.25s, box-shadow 0.25s; }
        .card-hover:hover { transform:translateY(-5px); box-shadow:0 16px 32px rgba(45,106,79,0.12); }
        @media(max-width:640px){ .hero-grid{grid-template-columns:1fr!important;} .hero-illo{display:none!important;} }
      `}</style>

      {/* NAV */}
      <nav style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 5%', height:'68px',
        borderBottom:'1px solid var(--gray-200)',
        position:'sticky', top:0,
        background:'rgba(255,255,255,0.96)',
        backdropFilter:'blur(10px)', zIndex:100,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'38px', height:'38px', borderRadius:'10px', background:'linear-gradient(135deg,#52B788,#74C69D)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 4px 12px rgba(82,183,136,0.3)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 5 C12 5 7 4 3 5.5 L3 17 C7 15.5 12 16.5 12 16.5 C12 16.5 17 15.5 21 17 L21 5.5 C17 4 12 5 12 5Z" fill="white" fillOpacity="0.9"/>
              <line x1="12" y1="5" x2="12" y2="16.5" stroke="#1B4332" strokeWidth="0.8" strokeOpacity="0.4"/>
              <ellipse cx="12" cy="21" rx="2.2" ry="3.2" fill="#1B4332" fillOpacity="0.95"/>
              <ellipse cx="8.5" cy="21.5" rx="1.8" ry="2.6" fill="#1B4332" fillOpacity="0.75" transform="rotate(-28 8.5 21.5)"/>
              <ellipse cx="15.5" cy="21.5" rx="1.8" ry="2.6" fill="#1B4332" fillOpacity="0.75" transform="rotate(28 15.5 21.5)"/>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'17px', color:'var(--green-deepest)', lineHeight:1 }}>Gyaanpravaha</p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:'var(--green-mid)', lineHeight:1, marginTop:'2px' }}>ज्ञानप्रवाह</p>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <Link href="/gk" className="btn-secondary" style={{ padding:'8px 18px', fontSize:'13px' }}>Learn for free</Link>
          {dashboardHref ? (
            <Link href={dashboardHref} className="btn-primary" style={{ padding:'8px 18px', fontSize:'13px' }}>
              Go to Dashboard →
            </Link>
          ) : (
            <>
              <Link href="/login" className="btn-outline" style={{ padding:'8px 18px', fontSize:'13px' }}>Log in</Link>
              <Link href="/register" className="btn-primary btn-pulse" style={{ padding:'8px 18px', fontSize:'13px' }}>Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        background:'linear-gradient(135deg, var(--green-deepest) 0%, var(--green-dark) 55%, var(--green-mid) 100%)',
        padding:'80px 5% 100px', position:'relative', overflow:'hidden',
      }}>
        <div className="spin-slow" style={{ position:'absolute', top:'-80px', right:'-80px', width:'360px', height:'360px', borderRadius:'50%', border:'2px dashed rgba(116,198,157,0.2)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'280px', height:'280px', borderRadius:'50%', background:'rgba(216,243,220,0.06)', pointerEvents:'none' }}/>

        <div className="hero-grid" style={{ maxWidth:'1100px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px', alignItems:'center' }}>
          <div>
            <div className="hero-anim" style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(116,198,157,0.18)', border:'1px solid rgba(116,198,157,0.3)', borderRadius:'20px', padding:'5px 14px', marginBottom:'24px' }}>
              <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#74C69D', display:'inline-block' }}/>
              <span style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#74C69D' }}>Now live — start learning today</span>
            </div>
            <h1 className="hero-anim" style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'clamp(40px, 5vw, 62px)', color:'white', lineHeight:1.12, marginBottom:'10px' }}>
              <span style={{ color:'#74C69D', display:'block', minHeight:'1.15em' }}>
                {typed}<span className="cursor"/>
              </span>
            </h1>
            <p className="hero-sub" style={{ fontFamily:'var(--font-body)', fontSize:'17px', color:'rgba(255,255,255,0.78)', lineHeight:1.75, marginBottom:'36px', maxWidth:'480px' }}>
              A digital learning platform that brings your syllabus to life. Every chapter explained simply, every concept practised smartly, every step tracked closely.
            </p>
            <div className="hero-btns" style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
              <Link href="/gk" className="btn-primary" style={{ background:'#74C69D', color:'var(--green-deepest)', fontSize:'15px', padding:'13px 28px', fontWeight:800 }}>
                Learn for free
              </Link>
              <Link href="/register" className="btn-outline" style={{ borderColor:'rgba(255,255,255,0.4)', color:'white', fontSize:'15px', padding:'13px 28px' }}>
                Register now
              </Link>
            </div>
          </div>
          <div className="hero-illo" style={{ display:'flex', justifyContent:'center' }}>
            <StudentIllustration />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} style={{ padding:'52px 5%', background:'var(--green-deepest)' }}>
        <div style={{ maxWidth:'800px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'24px', textAlign:'center' }}>
          {[
            { count: chapters,  suffix: '',  label: 'Chapters covered' },
            { count: sections,  suffix: '+', label: 'Lesson sections' },
            { count: questions, suffix: '+', label: 'Practice questions' },
          ].map(({ count, suffix, label }) => (
            <div key={label}>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'clamp(36px,5vw,52px)', color:'#74C69D', lineHeight:1 }}>{count}{suffix}</p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'rgba(255,255,255,0.55)', marginTop:'6px' }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FREE GK BANNER */}
      <section style={{ padding:'48px 5%', background:'var(--amber-light)', borderTop:'1px solid #FDE68A', borderBottom:'1px solid #FDE68A' }}>
        <div style={{ maxWidth:'860px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'24px', flexWrap:'wrap' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
            <span style={{ fontSize:'36px' }}>🎓</span>
            <div>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'18px', color:'#92400E', marginBottom:'4px' }}>Try Gyaanpravaha for free — no account needed</p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#B45309' }}>Explore our General Knowledge section. No login, no payment. Just learning.</p>
            </div>
          </div>
          <Link href="/gk" className="btn-primary" style={{ background:'#F59E0B', color:'white', flexShrink:0, padding:'12px 28px', fontSize:'15px' }}>
            Start learning free
          </Link>
        </div>
      </section>



      {/* PRODUCT PREVIEW SLIDER */}
      <section style={{ padding:'72px 5%', background:'#0D1F17', overflow:'hidden', position:'relative' }}>

        {/* Background grid */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(116,198,157,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(116,198,157,0.04) 1px, transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none' }}/>

        <div style={{ maxWidth:'1100px', margin:'0 auto', position:'relative', zIndex:1 }}>
          <Reveal>
            <p style={{ textAlign:'center', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'#74C69D', textTransform:'uppercase', letterSpacing:'0.15em', marginBottom:'12px' }}>See it in action</p>
            <h2 style={{ textAlign:'center', fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'clamp(26px,4vw,40px)', color:'white', marginBottom:'16px', lineHeight:1.15 }}>
              Built for how kids actually learn
            </h2>
            <p style={{ textAlign:'center', fontFamily:'var(--font-body)', fontSize:'16px', color:'rgba(255,255,255,0.5)', marginBottom:'52px', maxWidth:'480px', margin:'0 auto 52px' }}>
              Every screen designed for an 11-year-old — clear, warm, and distraction-free.
            </p>
          </Reveal>

          <ProductSlider />
        </div>
      </section>

      {/* SUBJECTS */}
      <section style={{ padding:'64px 5%', background:'white' }}>
        <div style={{ maxWidth:'960px', margin:'0 auto' }}>
          <Reveal>
            <p style={{ textAlign:'center', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'var(--green-mid)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'10px' }}>What's covered</p>
            <h2 style={{ textAlign:'center', fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'clamp(24px,4vw,36px)', color:'var(--green-deepest)', marginBottom:'8px' }}>
              All 9 subjects. Every chapter.
            </h2>

          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:'12px' }}>
            {[
              { emoji:'📖', label:'English',         chapters:8,  color:'#1B4332', bg:'#D8F3DC' },
              { emoji:'🔢', label:'Mathematics',     chapters:11, color:'#1E3A5F', bg:'#DBEAFE' },
              { emoji:'🔬', label:'Science',         chapters:9,  color:'#3B1F5E', bg:'#EDE9FE' },
              { emoji:'🏛️', label:'History & Civics', chapters:6,  color:'#7C2D12', bg:'#FFEDD5' },
              { emoji:'🌍', label:'Geography',       chapters:7,  color:'#064E3B', bg:'#ECFDF5' },
              { emoji:'🕉️', label:'Sanskrit',        chapters:8,  color:'#78350F', bg:'#FEF3C7' },
              { emoji:'💻', label:'ICT',             chapters:5,  color:'#1E40AF', bg:'#EFF6FF' },
              { emoji:'📜', label:'मराठी',           chapters:17, color:'#831843', bg:'#FDF2F8' },
              { emoji:'📚', label:'Rapid Reader',    chapters:19, color:'#065F46', bg:'#ECFDF5' },
            ].map(({ emoji, label, chapters, color, bg }) => (
              <Reveal key={label}>
                <div className="card card-hover" style={{ padding:'20px', textAlign:'center', background:bg, border:`1px solid ${color}20` }}>
                  <span style={{ fontSize:'28px', display:'block', marginBottom:'10px' }}>{emoji}</span>
                  <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'15px', color, marginBottom:'4px' }}>{label}</p>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color, opacity:0.7 }}>{chapters} chapters</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding:'88px 5%', background:'var(--green-pale)' }}>
        <div style={{ maxWidth:'960px', margin:'0 auto' }}>
          <Reveal>
            <p style={{ textAlign:'center', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'var(--green-mid)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'10px' }}>How it works</p>
            <h2 style={{ textAlign:'center', fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'clamp(26px,4vw,38px)', color:'var(--green-deepest)', marginBottom:'52px' }}>Three steps to mastering every chapter</h2>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'24px' }}>
            {[
              { delay:0,   emoji:'📖', step:'01', title:'Learn it',       desc:'Every chapter explained in 7 easy sections — friendly, simple language just like a tuition teacher. Confirm each section as you go.',          color:'var(--green-dark)' },
              { delay:150, emoji:'✅', step:'02', title:'Know it',        desc:'Unlock the quiz after reading. MCQs, fill in the blanks, sentence forming, and long answers. Wrong answer? Concept re-explained immediately.', color:'#6366F1' },
              { delay:300, emoji:'🌊', step:'03', title:'Flow with it',   desc:'Track your progress, build daily streaks, and give parents full visibility into how well you are doing. Knowledge that flows stays forever.',   color:'var(--amber)' },
            ].map(({ delay, emoji, step, title, desc, color }) => (
              <Reveal key={step} delay={delay}>
                <div className="card card-hover" style={{ textAlign:'center', padding:'40px 28px', position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', top:'-16px', right:'-16px', width:'80px', height:'80px', borderRadius:'50%', background:`${color}12` }}/>
                  <div style={{ fontSize:'38px', marginBottom:'14px' }}>{emoji}</div>
                  <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'34px', height:'34px', borderRadius:'50%', background:color, color:'white', fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'13px', marginBottom:'12px' }}>{step}</div>
                  <h3 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'21px', color:'var(--green-deepest)', marginBottom:'10px' }}>{title}</h3>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'var(--gray-600)', lineHeight:1.75 }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:'88px 5%' }}>
        <div style={{ maxWidth:'960px', margin:'0 auto' }}>
          <Reveal>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'var(--green-mid)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'10px', textAlign:'center' }}>What you get</p>
            <h2 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'clamp(26px,4vw,38px)', color:'var(--green-deepest)', marginBottom:'52px', textAlign:'center' }}>Everything a student needs to excel</h2>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))', gap:'16px' }}>
            {[
              { emoji:'📚', title:'Chapter-by-chapter lessons',  desc:'Every chapter broken into 7 easy sections with a confirmation gate. Read at your own pace — assessment only unlocks when you are ready.', delay:0 },
              { emoji:'🎯', title:'Smart assessments',           desc:'MCQs, fill in the blanks, sentence forming, and long answers — all structured in one quiz per chapter. 25 marks, 4 question types.', delay:100 },
              { emoji:'💡', title:'Instant re-explanation',      desc:'Wrong answer? We immediately show the concept again from the lesson. No red marks. Just better understanding and a second chance.', delay:200 },
              { emoji:'✍️', title:'Writing practice',            desc:'Writing prompts assigned by your teacher, AI-evaluated instantly, reviewed by admin before your final score is released.', delay:0 },
              { emoji:'📊', title:'Parent dashboard',            desc:'Parents see chapter scores, time spent studying, weak areas flagged, writing submissions — complete visibility in one place.', delay:100 },
              { emoji:'🔥', title:'Streak tracking',             desc:'Study every day and watch your streak grow. Small daily habits build the biggest results over a full academic year.', delay:200 },
            ].map(({ emoji, title, desc, delay }) => (
              <Reveal key={title} delay={delay}>
                <div className="card card-hover" style={{ padding:'28px', display:'flex', flexDirection:'column', gap:'10px' }}>
                  <span style={{ fontSize:'30px' }}>{emoji}</span>
                  <h3 style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'16px', color:'var(--green-deepest)' }}>{title}</h3>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'var(--gray-600)', lineHeight:1.75 }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOR PARENTS */}
      <section style={{ padding:'88px 5%', background:'var(--green-pale)' }}>
        <div style={{ maxWidth:'980px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'56px', alignItems:'center' }}>
          <Reveal>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'var(--green-mid)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'12px' }}>For parents</p>
            <h2 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'clamp(24px,4vw,34px)', color:'var(--green-deepest)', marginBottom:'16px' }}>Stay close to your child's learning</h2>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'15px', color:'var(--gray-600)', lineHeight:1.75, marginBottom:'28px' }}>You register, you set the password, you stay in control. Your dashboard gives you complete visibility into what your child is studying and how they are performing.</p>
            {['Chapter-wise scores and progress', 'Time spent studying per subject', 'Weak chapters highlighted clearly', 'Writing prompt submissions and scores', 'Subscription status and renewal date'].map(item => (
              <div key={item} style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px' }}>
                <div style={{ width:'22px', height:'22px', borderRadius:'50%', background:'var(--green-mint)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5L9 3" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'var(--gray-700)' }}>{item}</p>
              </div>
            ))}
          </Reveal>
          <Reveal delay={200}>
            <div style={{ display:'flex', justifyContent:'center' }}><ParentIllustration /></div>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding:'88px 5%' }}>
        <div style={{ maxWidth:'520px', margin:'0 auto', textAlign:'center' }}>
          <Reveal>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'var(--green-mid)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'10px' }}>Pricing</p>
            <h2 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'clamp(24px,4vw,36px)', color:'var(--green-deepest)', marginBottom:'40px' }}>One subscription.<br/>Full year of learning.</h2>
            <div className="card" style={{ padding:'44px 36px', border:'2.5px solid var(--green-dark)', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:'-40px', right:'-40px', width:'120px', height:'120px', borderRadius:'50%', background:'var(--green-pale)' }}/>
              <div className="badge badge-green" style={{ marginBottom:'20px' }}>Annual plan</div>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'56px', color:'var(--green-deepest)', lineHeight:1 }}>₹4,999</p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'var(--gray-400)', marginBottom:'32px' }}>per student · per academic year</p>
              {['All subjects — chapter by chapter', '7 sections + quiz per chapter', 'Writing prompts and AI evaluation', 'Parent progress dashboard', 'AI doubt solver', 'Full academic year access'].map(item => (
                <div key={item} style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px', textAlign:'left' }}>
                  <div style={{ width:'20px', height:'20px', borderRadius:'50%', background:'var(--green-mint)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'var(--gray-700)' }}>{item}</p>
                </div>
              ))}
              <Link href="/register" className="btn-primary" style={{ width:'100%', justifyContent:'center', padding:'15px', fontSize:'16px', marginTop:'20px', display:'flex' }}>Register and get access</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'80px 5%', background:'linear-gradient(135deg, var(--green-deepest) 0%, var(--green-dark) 100%)', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div className="spin-slow" style={{ position:'absolute', top:'-100px', left:'50%', transform:'translateX(-50%)', width:'500px', height:'500px', borderRadius:'50%', border:'1.5px dashed rgba(116,198,157,0.15)', pointerEvents:'none' }}/>
        <Reveal>
          <h2 style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'clamp(28px,4vw,44px)', color:'white', marginBottom:'16px' }}>Ready to start your journey?</h2>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'16px', color:'rgba(255,255,255,0.7)', marginBottom:'36px', maxWidth:'420px', margin:'0 auto 36px' }}>Join Gyaanpravaha and experience learning that truly flows.</p>
          <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/gk" className="btn-outline" style={{ borderColor:'rgba(255,255,255,0.4)', color:'white', fontSize:'15px', padding:'13px 28px' }}>Try for free first</Link>
            <Link href="/register" className="btn-primary" style={{ background:'#74C69D', color:'var(--green-deepest)', fontSize:'15px', padding:'13px 28px', fontWeight:800 }}>Register now</Link>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer style={{ background:'var(--green-deepest)', padding:'44px 5%', display:'flex', flexDirection:'column', alignItems:'center', gap:'12px', textAlign:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'34px', height:'34px', borderRadius:'9px', background:'linear-gradient(135deg,#52B788,#74C69D)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 5 C12 5 7 4 3 5.5 L3 17 C7 15.5 12 16.5 12 16.5 C12 16.5 17 15.5 21 17 L21 5.5 C17 4 12 5 12 5Z" fill="white" fillOpacity="0.9"/>
              <line x1="12" y1="5" x2="12" y2="16.5" stroke="#1B4332" strokeWidth="0.8" strokeOpacity="0.4"/>
              <ellipse cx="12" cy="21" rx="2.2" ry="3.2" fill="#1B4332" fillOpacity="0.95"/>
              <ellipse cx="8.5" cy="21.5" rx="1.8" ry="2.6" fill="#1B4332" fillOpacity="0.75" transform="rotate(-28 8.5 21.5)"/>
              <ellipse cx="15.5" cy="21.5" rx="1.8" ry="2.6" fill="#1B4332" fillOpacity="0.75" transform="rotate(28 15.5 21.5)"/>
            </svg>
          </div>
          <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'17px', color:'white' }}>Gyaanpravaha</p>
        </div>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'rgba(255,255,255,0.45)' }}>Learn it. Know it. Flow with it.</p>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'rgba(255,255,255,0.28)' }}>© 2026 Gyaanpravaha · gyaanpravaha.in</p>
        <Link href="/admin/login" style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'rgba(255,255,255,0.18)', textDecoration:'none', marginTop:'4px' }}>Admin</Link>
      </footer>
    </div>
  )
}
