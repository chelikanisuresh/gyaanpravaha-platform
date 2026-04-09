'use client'

// ── No Tutor Required Card ────────────────────────────────────────────────────
export function NoTutorCard() {
  return (
    <div style={{ background:'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius:'16px', padding:'24px', flex:1, minWidth:'260px' }}>
      <style>{`@keyframes gp-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}.gp-badge{animation:gp-pulse 2.5s ease-in-out infinite}`}</style>

      <div className="gp-badge" style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:'#74C69D', color:'#1B4332', fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'12px', padding:'5px 14px', borderRadius:'20px', marginBottom:'14px' }}>
        <span>🎓</span> No tutor required
      </div>

      <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'17px', color:'white', lineHeight:1.4, marginBottom:'12px' }}>
        Everything a tutor provides — at a fraction of the cost
      </p>

      <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'rgba(255,255,255,0.7)', lineHeight:1.7, marginBottom:'18px' }}>
        Gyaanpravaha is built so your child can read, understand, quiz, and write completely independently. You stay in control.
      </p>

      {/* Cost comparison */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'16px' }}>
        <div style={{ background:'rgba(255,255,255,0.12)', borderRadius:'12px', padding:'14px' }}>
          <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'20px', color:'#74C69D', lineHeight:1, marginBottom:'4px' }}>
            ₹415<span style={{ fontSize:'12px', fontWeight:600 }}>/mo</span>
          </p>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'rgba(255,255,255,0.7)', lineHeight:1.4 }}>
            Gyaanpravaha · 7 subjects · 24/7
          </p>
        </div>
        <div style={{ background:'rgba(255,255,255,0.07)', borderRadius:'12px', padding:'14px' }}>
          <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'20px', color:'rgba(255,255,255,0.4)', lineHeight:1, marginBottom:'4px', textDecoration:'line-through' }}>
            ₹3,000+<span style={{ fontSize:'12px' }}>/mo</span>
          </p>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'rgba(255,255,255,0.4)', lineHeight:1.4 }}>
            Tuition · 1-2 subjects · Scheduled
          </p>
        </div>
      </div>

      {/* Visibility comparison */}
      <div style={{ borderTop:'1px solid rgba(255,255,255,0.12)', paddingTop:'14px' }}>
        <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#74C69D', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'10px' }}>
          Parent visibility
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
          <div style={{ display:'flex', gap:'10px', alignItems:'flex-start', background:'rgba(116,198,157,0.15)', borderRadius:'9px', padding:'10px 12px', border:'1px solid rgba(116,198,157,0.25)' }}>
            <span style={{ fontSize:'14px', flexShrink:0 }}>✅</span>
            <div>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'#74C69D', marginBottom:'2px' }}>Gyaanpravaha</p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'rgba(255,255,255,0.6)', lineHeight:1.4 }}>
                Complete visibility — every chapter, score and minute studied
              </p>
            </div>
          </div>
          <div style={{ display:'flex', gap:'10px', alignItems:'flex-start', background:'rgba(239,68,68,0.1)', borderRadius:'9px', padding:'10px 12px', border:'1px solid rgba(239,68,68,0.2)' }}>
            <span style={{ fontSize:'14px', flexShrink:0 }}>❌</span>
            <div>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'#FCA5A5', marginBottom:'2px' }}>Tuitions</p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'rgba(255,255,255,0.45)', lineHeight:1.4 }}>
                Zero visibility — you never know how your child is really doing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Self Reliance Staircase ───────────────────────────────────────────────────
// Staircase goes bottom-left → top-right
// Step i: tread at x=i*tread, y=totalH-(i+1)*riser
// Each step is a standalone rect — no overlap with adjacent steps
export function SelfRelianceStaircase() {
  const STEPS = [
    { label:'Read',       color:'#D8F3DC', textColor:'#1B4332' },
    { label:'Understand', color:'#B7E4C7', textColor:'#1B4332' },
    { label:'Quiz',       color:'#74C69D', textColor:'#1B4332' },
    { label:'Write',      color:'#40916C', textColor:'white'   },
    { label:'Master',     color:'#1B4332', textColor:'white'   },
  ]

  const n     = 5
  const tw    = 72   // tread width per step
  const riser = 36   // step height
  const W     = n * tw     // 240
  const H     = n * riser  // 170

  // Student on step 1 (Understand) - second from bottom
  const sStep = 1
  const sX    = sStep * tw + tw * 0.3   // 72 + 21.6 = 93.6 — within tread of step 1
  const sY    = H - (sStep + 1) * riser  // top of step 1 surface

  return (
    <div style={{ background:'white', borderRadius:'16px', border:'1px solid #E5E7EB', padding:'24px', flex:1, minWidth:'260px' }}>
      <style>{`
        @keyframes gp-bob2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .gp-stu { animation: gp-bob2 0.85s ease-in-out infinite; }
      `}</style>

      <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'15px', color:'#1B4332', marginBottom:'4px' }}>
        Your child&apos;s path to self-reliance
      </p>
      <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#6B7280', marginBottom:'20px', lineHeight:1.5 }}>
        Each chapter takes the student from reading all the way to mastery — without a tutor.
      </p>

      <svg viewBox={`0 0 ${W + 40} ${H + 16}`} width="100%" style={{ display:'block' }}>

        {/* Steps — each one is i*tw wide and goes to the bottom */}
        {STEPS.map((step, i) => {
          const x = i * tw
          const y = H - (i + 1) * riser
          // Height goes from step surface down to the bottom
          const blockH = H - y
          return (
            <g key={step.label}>
              <rect
                x={x} y={y}
                width={tw} height={blockH}
                fill={step.color}
                stroke="white" strokeWidth="1.5"
                rx="2"
              />
              {/* Label on the tread (top riser height) */}
              <text
                x={x + tw / 2}
                y={y + riser / 2 + 4}
                textAnchor="middle"
                fontFamily="var(--font-heading)"
                fontWeight="700"
                fontSize="10"
                fill={step.textColor}
              >
                {step.label}
              </text>
            </g>
          )
        })}

        {/* Upward arrow on right */}
        <line
          x1={W + 16} y1={H + 4}
          x2={W + 16} y2={4}
          stroke="#D8F3DC" strokeWidth="1.5" strokeDasharray="3 2"
        />
        <polygon
          points={`${W + 16},1 ${W + 12},10 ${W + 20},10`}
          fill="#74C69D"
        />

        {/* Student — outer g positions, inner g animates */}
        <g transform={`translate(${sX}, ${sY - 26})`}>
          <g className="gp-stu">
            <circle cx="6" cy="4"  r="4"   fill="#1B4332"/>
            <line x1="6" y1="8"  x2="6" y2="17" stroke="#1B4332" strokeWidth="2"   strokeLinecap="round"/>
            <line x1="1" y1="12" x2="6" y2="10" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="11" y1="12" x2="6" y2="10" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="3" y1="17" x2="6" y2="24" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="9" y1="17" x2="6" y2="24" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round"/>
          </g>
        </g>
      </svg>

      <div style={{ background:'#F0FDF4', borderRadius:'10px', padding:'10px 14px', marginTop:'10px' }}>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#40916C', lineHeight:1.5 }}>
          🎯 No tutor needed at any step. Gyaanpravaha guides the student — you just track the progress.
        </p>
      </div>
    </div>
  )
}
