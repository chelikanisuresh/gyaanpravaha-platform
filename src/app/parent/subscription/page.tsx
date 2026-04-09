'use client'

import ParentSidebarLayout from '@/components/ParentSidebarLayout'

export default function SubscriptionPage() {
  return (
    <ParentSidebarLayout>
      <div style={{ maxWidth: '520px', padding: '28px 28px 60px' }}>

        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: '#1B4332', marginBottom: '6px' }}>Subscription</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>Your current plan and billing details.</p>
        </div>

        {/* Active plan card */}
        <div style={{ background: 'linear-gradient(135deg, #1B4332, #2D6A4F)', borderRadius: '18px', padding: '24px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#74C69D', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Current plan</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '22px', color: 'white', lineHeight: 1 }}>Annual Plan</p>
            </div>
            <span style={{ background: '#74C69D', color: '#1B4332', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '12px', padding: '5px 12px', borderRadius: '20px' }}>Active</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            {[
              { label: 'Amount paid',   value: '₹2,499' },
              { label: 'Started',       value: 'Apr 2026' },
              { label: 'Renews',        value: 'Mar 2027' },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 12px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginBottom: '3px' }}>{label}</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: 'white' }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What is included */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden', marginBottom: '16px' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #F3F4F6' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332' }}>What is included</p>
          </div>
          {[
            { emoji: '📚', text: 'All subjects — chapter by chapter lessons' },
            { emoji: '✅', text: 'Smart quizzes with instant feedback' },
            { emoji: '✍️', text: 'Writing prompts and AI evaluation' },
            { emoji: '📊', text: 'Parent progress dashboard' },
            { emoji: '🔑', text: 'Full password control for parents' },
            { emoji: '💡', text: 'AI doubt solver — bounded to syllabus' },
          ].map(({ emoji, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 20px', borderBottom: '1px solid #F9FAFB' }}>
              <span style={{ fontSize: '16px' }}>{emoji}</span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151' }}>{text}</p>
            </div>
          ))}
        </div>

        {/* Renewal notice */}
        <div style={{ background: '#F0FDF4', border: '1px solid #D8F3DC', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ fontSize: '20px', flexShrink: 0 }}>📅</span>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332', marginBottom: '4px' }}>Auto-renewal in March 2027</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#40916C', lineHeight: 1.6 }}>
              You will receive a reminder 30 days before renewal. Contact us at hello@gyaanpravaha.in if you have any questions about your subscription.
            </p>
          </div>
        </div>

      </div>
    </ParentSidebarLayout>
  )
}
