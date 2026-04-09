'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'
import PageShell from '@/components/PageShell'

export default function SubscriptionPage() {
  const [parentName, setParentName] = useState('Parent')
  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: p } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
      if (p?.full_name) setParentName(p.full_name)
    }
    load()
  }, [])

  return (
    <ParentSidebarLayout parentName={parentName}>
      <PageShell title="Subscription" subtitle="Your current plan and billing details" maxWidth="520px">
        <div className="card-featured" style={{ marginBottom: '20px', background: 'var(--brand-pale)', border: '1px solid rgba(45,106,79,0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <p className="uppercase-label" style={{ marginBottom: '6px' }}>Current plan</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '22px', color: 'var(--gray-900)', letterSpacing: '-0.3px' }}>Annual Plan</p>
            </div>
            <span className="badge badge-green">Active</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
            {[{ l: 'Paid', v: '₹2,499' }, { l: 'Started', v: 'Apr 2026' }, { l: 'Renews', v: 'Mar 2027' }].map(({ l, v }) => (
              <div key={l} style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '12px', border: '1px solid var(--border-subtle)' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gray-400)', marginBottom: '3px' }}>{l}</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '14px', color: 'var(--gray-900)' }}>{v}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="uppercase-label" style={{ marginBottom: '10px' }}>What is included</p>
        <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '20px' }}>
          {['All subjects — chapter by chapter', 'Smart quizzes with instant feedback', 'Writing prompts and AI evaluation', 'Parent progress dashboard', 'Password control for parents', 'AI doubt solver'].map((item, i, arr) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 20px', borderBottom: i < arr.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
              <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--brand-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="var(--brand-deep)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-700)' }}>{item}</p>
            </div>
          ))}
        </div>
        <div style={{ padding: '14px 18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', background: 'var(--gray-50)' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', color: 'var(--gray-700)', marginBottom: '4px' }}>Auto-renewal in March 2027</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gray-400)', lineHeight: 1.5 }}>You will receive a reminder 30 days before renewal. Questions? hello@gyaanpravaha.in</p>
        </div>
      </PageShell>
    </ParentSidebarLayout>
  )
}
