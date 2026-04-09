'use client'

import Link from 'next/link'

interface RightPanelProps {
  childName?: string
  tipText?: string
  weeklyMins?: number[]
  starters?: string[]
  quickActions?: { label: string; emoji: string; href?: string; onClick?: () => void }[]
}

const DEFAULT_WEEK = [22, 15, 30, 0, 18, 25, 0]
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const DEFAULT_TIP = 'Ask your child what they read today — even one question doubles retention.'

export default function ParentRightPanel({
  childName = 'your child',
  tipText = DEFAULT_TIP,
  weeklyMins = DEFAULT_WEEK,
  starters = [],
  quickActions = [],
}: RightPanelProps) {
  const totalMins = weeklyMins.reduce((a, b) => a + b, 0)
  const maxMins = Math.max(...weeklyMins, 30)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '260px', flexShrink: 0 }}>

      {/* Daily tip */}
      <div style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '14px', padding: '18px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', color: '#74C69D', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
          💡 Tip for today
        </p>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white', lineHeight: 1.55, marginBottom: '6px' }}>
          {tipText}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
          Children learn 40% better when a parent takes interest.
        </p>
      </div>

      {/* Weekly activity */}
      <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#1B4332' }}>📅 This week</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>{totalMins} mins total</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: '52px' }}>
          {weeklyMins.map((mins, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ width: '100%', height: `${Math.round((mins / maxMins) * 40) + (mins > 0 ? 4 : 0)}px`, background: mins > 0 ? '#2D6A4F' : '#F3F4F6', borderRadius: '3px 3px 0 0', transition: 'height 0.6s ease', minHeight: mins > 0 ? '4px' : '0' }}/>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#9CA3AF' }}>{DAYS[i]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation starters */}
      {starters.length > 0 && (
        <div style={{ background: '#FEF3C7', borderRadius: '14px', border: '1px solid #FDE68A', padding: '14px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#92400E', marginBottom: '10px' }}>
            🗣️ Ask {childName} today
          </p>
          {starters.map((q, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '8px', padding: '8px 10px', marginBottom: i < starters.length - 1 ? '6px' : 0, border: '1px solid #FDE68A' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#92400E', lineHeight: 1.5 }}>&ldquo;{q}&rdquo;</p>
            </div>
          ))}
        </div>
      )}

      {/* Parent visibility value prop */}
      <div style={{ background: '#F0FDF4', borderRadius: '14px', border: '1px solid #D8F3DC', padding: '14px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#1B4332', marginBottom: '8px' }}>
          👁️ Full visibility
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#40916C', lineHeight: 1.6 }}>
          You can see every chapter read, every score, every minute studied — and we tell you exactly where {childName} needs your support.
        </p>
      </div>

      {/* Quick actions */}
      {quickActions.length > 0 && (
        <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '14px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#1B4332', marginBottom: '10px' }}>⚡ Quick actions</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {quickActions.map(({ label, emoji, href, onClick }) =>
              href ? (
                <Link key={label} href={href} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 12px', background: '#F8FAF9', border: '1px solid #E5E7EB', borderRadius: '9px', textDecoration: 'none', transition: 'background 0.15s' }}>
                  <span style={{ fontSize: '14px' }}>{emoji}</span>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '12px', color: '#374151' }}>{label}</p>
                </Link>
              ) : (
                <button key={label} onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 12px', background: '#F8FAF9', border: '1px solid #E5E7EB', borderRadius: '9px', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'background 0.15s' }}>
                  <span style={{ fontSize: '14px' }}>{emoji}</span>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '12px', color: '#374151' }}>{label}</p>
                </button>
              )
            )}
          </div>
        </div>
      )}

    </div>
  )
}
