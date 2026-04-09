'use client'

// ── No Tutor Required Card ────────────────────────────────────────────────────
export function NoTutorCard() {
  return (
    <div style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '16px', padding: '24px', flex: 1, minWidth: '260px' }}>
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
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'14px' }}>
        <div style={{ background:'rgba(255,255,255,0.12)', borderRadius:'12px', padding:'14px' }}>
          <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'20px', color:'#74C69D', lineHeight:1, marginBottom:'4px' }}>₹415<span style={{ fontSize:'12px', fontWeight:600 }}>/mo</span></p>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'rgba(255,255,255,0.7)', lineHeight:1.4 }}>Gyaanpravaha · 7 subjects · 24/7</p>
        </div>
        <div style={{ background:'rgba(255,255,255,0.07)', borderRadius:'12px', padding:'14px' }}>
          <p style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'20px', color:'rgba(255,255,255,0.4)', lineHeight:1, marginBottom:'4px', textDecoration:'line-through' }}>₹3,000+<span style={{ fontSize:'12px' }}>/mo</span></p>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'rgba(255,255,255,0.4)', lineHeight:1.4 }}>Tuition · 1-2 subjects · Scheduled</p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop:'1px solid rgba(255,255,255,0.12)', paddingTop:'14px' }}>
        <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#74C69D', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'10px' }}>Parent visibility</p>
        <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
          {[
            { label:'Gyaanpravaha', detail:'Complete visibility — every chapter, score and minute studied', good:true },
            { label:'Tuitions',     detail:'Zero visibility — you never know how your child is really doing', good:false },
          ].map(({ label, detail, good }) => (
            <div key={label} style={{ display:'flex', gap:'10px', alignItems:'flex-start', background: good ? 'rgba(116,198,157,0.15)' : 'rgba(239,68,68,0.1)', borderRadius:'9px', padding:'10px 12px', border:`1px solid ${good ? 'rgba(116,198,157,0.25)' : 'rgba(239,68,68,0.2)'}` }}>
              <span style={{ fontSize:'14px', flexShrink:0 }}>{good ? '✅' : '❌'}</span>
              <div>
                <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color: good ? '#74C69D' : '#FCA5A5', marginBottom:'2px' }}>{label}</p>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'rgba(255,255,255,0.6)', lineHeight:1.4 }}>{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Self Reliance Staircase ───────────────────────────────────────────────────
// Proper staircase: each step goes one unit right and one unit up
// Step 1 (Read) at bottom-left, Step 5 (Master) at top-right
export function SelfRelianceStaircase() {
  const STEPS = [
    { label:'Read',       color:'#D8F3DC', textColor:'#1B4332', desc:'Each section unlocks the next' },
    { label:'Understand', color:'#B7E4C7', textColor:'#1B4332', desc:'Comprehension questions after reading' },
    { label:'Quiz',       color:'#74C69D', textColor:'#1B4332', desc:'25-mark assessment per chapter' },
    { label:'Write',      color:'#40916C', textColor:'white',   desc:'Creative writing prompt' },
    { label:'Master',     color:'#1B4332', textColor:'white',   desc:'Chapter fully completed' },
  ]

  const n       = STEPS.length   // 5
  const riser   = 36             // height of each step
  const tread   = 52             // width of each step tread
  const totalW  = n * tread      // 260
  const totalH  = n * riser      // 180
  // Student is on step index 1 (Understand — second from bottom)
  const studentStep = 1

  return (
    <div style={{ background:'white', borderRadius:'16px', border:'1px solid #E5E7EB', padding:'24px', flex:1, minWidth:'260px' }}>
      <style>{`
        @keyframes gp-bob  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .gp-student { animation: gp-bob 0.7s ease-in-out infinite; }
      `}</style>

      <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'15px', color:'#1B4332', marginBottom:'4px' }}>
        Your child&apos;s path to self-reliance
      </p>
      <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#6B7280', marginBottom:'20px', lineHeight:1.5 }}>
        Each chapter takes the student from reading all the way to mastery — without a tutor.
      </p>

      {/* Staircase SVG */}
      <div style={{ position:'relative', width:'100%', overflowX:'auto' }}>
        <svg viewBox={`0 0 ${totalW + 60} ${totalH + 40}`} width="100%" style={{ display:'block' }}>

          {/* Draw each step: step i sits at x = i*tread, y = (n-1-i)*riser from top */}
          {STEPS.map((step, i) => {
            const x = i * tread               // left edge of this step's tread
            const y = (n - 1 - i) * riser     // top of this step
            const blockW = totalW - i * tread  // width of the full block below this step
            const blockH = riser               // just the top face height for label

            return (
              <g key={step.label}>
                {/* Full block fills from step top down to bottom */}
                <rect
                  x={x} y={y}
                  width={blockW} height={totalH - y}
                  fill={step.color}
                  stroke="white" strokeWidth="1"
                />
                {/* Step label */}
                <text
                  x={x + 8} y={y + riser / 2 + 5}
                  fontFamily="var(--font-heading)" fontWeight="700" fontSize="12"
                  fill={step.textColor}
                >
                  {step.label}
                </text>
              </g>
            )
          })}

          {/* Student figure sitting on top of studentStep */}
          {(() => {
            const sx = studentStep * tread + tread * 0.4
            const sy = (n - 1 - studentStep) * riser - 26  // above the step surface
            return (
              <g className="gp-student">
                {/* Head */}
                <circle cx={sx + 6} cy={sy + 5} r="5" fill="#1B4332"/>
                {/* Body */}
                <line x1={sx + 6} y1={sy + 10} x2={sx + 6} y2={sy + 20} stroke="#1B4332" strokeWidth="2" strokeLinecap="round"/>
                {/* Arms */}
                <line x1={sx + 1} y1={sy + 14} x2={sx + 6} y2={sy + 12} stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1={sx + 11} y1={sy + 14} x2={sx + 6} y2={sy + 12} stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round"/>
                {/* Legs */}
                <line x1={sx + 3} y1={sy + 20} x2={sx + 6} y2={sy + 26} stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1={sx + 9} y1={sy + 20} x2={sx + 6} y2={sy + 26} stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round"/>
              </g>
            )
          })()}

          {/* Arrow pointing up-right to show direction */}
          <line x1={totalW + 10} y1={totalH} x2={totalW + 10} y2={4} stroke="#D8F3DC" strokeWidth="1.5" strokeDasharray="3 2"/>
          <polygon points={`${totalW + 10},0 ${totalW + 6},8 ${totalW + 14},8`} fill="#74C69D"/>
          <text x={totalW + 16} y={totalH / 2} fontFamily="var(--font-body)" fontSize="9" fill="#9CA3AF" transform={`rotate(-90, ${totalW + 16}, ${totalH / 2})`}>
            mastery
          </text>
        </svg>
      </div>

      {/* Bottom message */}
      <div style={{ background:'#F0FDF4', borderRadius:'10px', padding:'10px 14px', marginTop:'12px' }}>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#40916C', lineHeight:1.5 }}>
          🎯 No tutor needed at any step. Gyaanpravaha guides the student — you just track the progress.
        </p>
      </div>
    </div>
  )
}
