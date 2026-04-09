'use client'

// ── No Tutor Required Card ────────────────────────────────────────────────────
export function NoTutorCard() {
  return (
    <div style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '16px', padding: '24px', flex: 1 }}>
      <style>{`@keyframes gp-badge-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}.gp-badge{animation:gp-badge-pulse 2.5s ease-in-out infinite}`}</style>

      <div className="gp-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#74C69D', color: '#1B4332', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '12px', padding: '5px 14px', borderRadius: '20px', marginBottom: '14px' }}>
        <span>🎓</span> No tutor required
      </div>

      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '17px', color: 'white', lineHeight: 1.4, marginBottom: '12px' }}>
        Everything a tutor provides — at a fraction of the cost
      </p>

      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '18px' }}>
        Gyaanpravaha is built so your child can read, understand, quiz, and write completely independently. Parents track progress. Students learn on their own terms.
      </p>

      {/* Comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color: '#74C69D', lineHeight: 1, marginBottom: '4px' }}>₹415<span style={{ fontSize: '12px', fontWeight: 600 }}>/mo</span></p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>Gyaanpravaha · 7 subjects · 24/7 access</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '12px', padding: '14px', position: 'relative', overflow: 'hidden' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color: 'rgba(255,255,255,0.45)', lineHeight: 1, marginBottom: '4px', textDecoration: 'line-through' }}>₹3,000+<span style={{ fontSize: '12px' }}>/mo</span></p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>Private tutor · 1-2 subjects · Scheduled</p>
        </div>
      </div>
    </div>
  )
}

// ── Self Reliance Staircase ───────────────────────────────────────────────────
export function SelfRelianceStaircase() {
  const steps = [
    { label: 'Read',       color: '#D8F3DC', text: '#1B4332', w: 100 },
    { label: 'Understand', color: '#B7E4C7', text: '#1B4332', w: 130 },
    { label: 'Quiz',       color: '#74C69D', text: '#1B4332', w: 160 },
    { label: 'Write',      color: '#52B788', text: 'white',   w: 190 },
    { label: 'Master',     color: '#2D6A4F', text: 'white',   w: 220 },
  ]
  const stepH = 32
  const totalH = steps.length * stepH
  const maxW = 220

  return (
    <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px', flex: 1 }}>
      <style>{`
        @keyframes gp-walk { 0%{transform:translateX(0)} 100%{transform:translateX(8px)} }
        @keyframes gp-bob  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
        .gp-student { animation: gp-bob 0.6s ease-in-out infinite; }
      `}</style>

      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '15px', color: '#1B4332', marginBottom: '4px' }}>
        Your child&apos;s path to self-reliance
      </p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7280', marginBottom: '20px', lineHeight: 1.5 }}>
        Each chapter takes the student from reading all the way to mastery — independently, step by step.
      </p>

      <div style={{ position: 'relative', height: totalH + 40 }}>
        {steps.map((step, i) => {
          const y = (steps.length - 1 - i) * stepH
          const x = (maxW - step.w) / 2
          return (
            <div key={step.label} style={{ position: 'absolute', bottom: y + 24, left: x, width: step.w, height: stepH - 2, background: step.color, borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'center', paddingLeft: '12px', transition: 'all 0.3s' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: step.text }}>{step.label}</p>
            </div>
          )
        })}

        {/* Student figure on step 2 (Understand) */}
        <div className="gp-student" style={{ position: 'absolute', bottom: (steps.length - 1 - 1) * stepH + stepH + 24, left: (maxW - steps[1].w) / 2 + steps[1].w * 0.5 - 8 }}>
          <svg width="16" height="28" viewBox="0 0 16 28" fill="none">
            <circle cx="8" cy="5" r="4" fill="#1B4332"/>
            <line x1="8" y1="9" x2="8" y2="18" stroke="#1B4332" strokeWidth="2" strokeLinecap="round"/>
            <line x1="3" y1="13" x2="8" y2="11" stroke="#1B4332" strokeWidth="2" strokeLinecap="round"/>
            <line x1="13" y1="13" x2="8" y2="11" stroke="#1B4332" strokeWidth="2" strokeLinecap="round"/>
            <line x1="4" y1="18" x2="8" y2="24" stroke="#1B4332" strokeWidth="2" strokeLinecap="round"/>
            <line x1="12" y1="18" x2="8" y2="24" stroke="#1B4332" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Arrow indicating upward journey */}
        <div style={{ position: 'absolute', right: 0, top: 0, height: totalH + 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', paddingRight: '4px' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', transform: 'rotate(-90deg)', whiteSpace: 'nowrap', transformOrigin: 'center' }}>self-reliant →</span>
        </div>
      </div>

      {/* Bottom message */}
      <div style={{ background: '#F0FDF4', borderRadius: '10px', padding: '10px 14px', marginTop: '8px' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#40916C', lineHeight: 1.5 }}>
          No tutor needed. Every step is guided by Gyaanpravaha — your child does it themselves.
        </p>
      </div>
    </div>
  )
}
