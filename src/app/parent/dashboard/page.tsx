'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'
import PageShell from '@/components/PageShell'

const STUDENT_DATA = {
  chaptersCompleted: 3, totalChapters: 8,
  avgScore: 85, streak: 5,
  lastStudied: '2 hours ago', todayMins: 22,
  currentChapter: 'In Morning Dew', currentSections: 3, totalSections: 7,
}

const ACTION_ITEMS = [
  { id: 1, urgency: 'high',   emoji: '⏰', title: 'Writing deadline in 2 days',    desc: '"In Morning Dew" prompt is due Apr 15. Your child has not submitted yet.' },
  { id: 2, urgency: 'medium', emoji: '⚠️', title: 'Chapter needs a second attempt', desc: '"If I Were Lord of Tartary" scored 76%. Encourage a re-read and retry.' },
]

const ACTIVITY = [
  { emoji: '📖', text: 'Read section 3 of "In Morning Dew"',       time: '2h ago' },
  { emoji: '✅', text: 'Completed quiz for "The Fun They Had"',      time: 'Yesterday' },
  { emoji: '📝', text: 'Submitted writing for "The Fun They Had"',  time: 'Yesterday' },
  { emoji: '🔥', text: 'Maintained 5 day study streak',              time: '2 days ago' },
  { emoji: '📖', text: 'Completed "Whistles and Shaving Bristles"',  time: '3 days ago' },
]

const STARTERS = [
  'What do you think the scarecrow in "In Morning Dew" finds most puzzling about the world?',
  'If you could ask Tolstoy one question about "Three Questions", what would it be?',
  'Do you think Milkha Singh would have become a champion without everything he went through?',
]

const Section = ({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) => (
  <div style={{ marginBottom: '32px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
      <p className="uppercase-label">{title}</p>
      {action}
    </div>
    {children}
  </div>
)

export default function ParentDashboardPage() {
  const [parentName, setParentName] = useState('Parent')
  const [childName, setChildName] = useState('your child')
  const [greeting, setGreeting] = useState('Good morning')
  const [tipIndex] = useState(() => Math.floor(Math.random() * STARTERS.length))

  useEffect(() => {
    const h = new Date().getHours()
    setGreeting(h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening')
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: p } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
      if (p?.full_name) setParentName(p.full_name.split(' ')[0])
      const { data: links } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id).single()
      if (!links) return
      const { data: c } = await supabase.from('profiles').select('full_name').eq('id', links.student_id).single()
      if (c?.full_name) setChildName(c.full_name.split(' ')[0])
    }
    load()
  }, [])

  const progress = Math.round((STUDENT_DATA.chaptersCompleted / STUDENT_DATA.totalChapters) * 100)

  return (
    <ParentSidebarLayout parentName={parentName}>
      <style>{`@keyframes in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} .a-in{animation:in 0.4s ease forwards;opacity:0}`}</style>
      <PageShell title={`${greeting}, ${parentName}`} subtitle={`Here is everything you need to know about ${childName}'s learning today.`} maxWidth="900px">

        {/* Action items */}
        {ACTION_ITEMS.length > 0 && (
          <Section title="Needs attention">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ACTION_ITEMS.map(item => (
                <div key={item.id} style={{
                  display: 'flex', gap: '14px', alignItems: 'flex-start',
                  padding: '14px 18px', borderRadius: 'var(--radius-lg)',
                  border: `1px solid ${item.urgency === 'high' ? 'var(--red-border)' : 'var(--amber-border)'}`,
                  background: item.urgency === 'high' ? 'var(--red-bg)' : 'var(--amber-bg)',
                }}>
                  <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.emoji}</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '14px', color: item.urgency === 'high' ? '#991B1B' : '#92400E', marginBottom: '3px' }}>{item.title}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: item.urgency === 'high' ? '#B91C1C' : '#B45309', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Two column */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>

          {/* Today snapshot */}
          <div className="card" style={{ padding: '20px' }}>
            <p className="uppercase-label" style={{ marginBottom: '16px' }}>Today</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
              {[
                { label: 'Studied', value: `${STUDENT_DATA.todayMins} mins`, emoji: '⏱️' },
                { label: 'Streak',  value: `${STUDENT_DATA.streak} days`,    emoji: '🔥' },
              ].map(({ label, value, emoji }) => (
                <div key={label} style={{ background: 'var(--gray-50)', borderRadius: 'var(--radius-md)', padding: '12px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '16px', display: 'block', marginBottom: '6px' }}>{emoji}</span>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '18px', color: 'var(--gray-900)', lineHeight: 1 }}>{value}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gray-400)', marginTop: '3px' }}>{label}</p>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--brand-pale)', borderRadius: 'var(--radius-md)', padding: '12px', border: '1px solid var(--border-subtle)' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gray-400)', marginBottom: '4px' }}>Currently reading</p>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', color: 'var(--gray-900)', marginBottom: '8px' }}>{STUDENT_DATA.currentChapter}</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${Math.round((STUDENT_DATA.currentSections / STUDENT_DATA.totalSections) * 100)}%` }}/>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gray-400)', marginTop: '4px' }}>{STUDENT_DATA.currentSections}/{STUDENT_DATA.totalSections} sections</p>
            </div>
          </div>

          {/* Progress snapshot */}
          <div className="card" style={{ padding: '20px' }}>
            <p className="uppercase-label" style={{ marginBottom: '16px' }}>Progress snapshot</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
              <div style={{ position: 'relative', width: '72px', height: '72px', flexShrink: 0 }}>
                <svg width="72" height="72" viewBox="0 0 72 72">
                  <circle cx="36" cy="36" r="30" fill="none" stroke="var(--gray-100)" strokeWidth="7"/>
                  <circle cx="36" cy="36" r="30" fill="none" stroke="var(--brand)" strokeWidth="7"
                    strokeDasharray={`${(progress / 100) * 188} 188`} strokeLinecap="round" transform="rotate(-90 36 36)"/>
                </svg>
                <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: 'var(--gray-900)', margin: 0 }}>{progress}%</p>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '22px', color: 'var(--gray-900)', lineHeight: 1, marginBottom: '4px' }}>{STUDENT_DATA.chaptersCompleted}/{STUDENT_DATA.totalChapters}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-400)' }}>Chapters done</p>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', color: 'var(--brand)', marginTop: '4px' }}>{STUDENT_DATA.avgScore}% avg score</p>
              </div>
            </div>
            <div style={{ background: 'var(--gray-50)', borderRadius: 'var(--radius-md)', padding: '10px 12px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px' }}>🕐</span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gray-500)' }}>
                {childName} last studied <span style={{ fontWeight: 500, color: 'var(--gray-700)' }}>{STUDENT_DATA.lastStudied}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Activity feed */}
        <Section title="Recent activity" action={<Link href="/parent/dashboard/progress" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: 'var(--brand)', textDecoration: 'none' }}>View full progress →</Link>}>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {ACTIVITY.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', borderBottom: i < ACTIVITY.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <span style={{ fontSize: '15px', flexShrink: 0 }}>{item.emoji}</span>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-700)', flex: 1 }}>{item.text}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gray-400)', flexShrink: 0 }}>{item.time}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Conversation starter */}
        <Section title="Ask this today">
          <div className="card" style={{ padding: '20px', background: 'var(--amber-bg)', border: '1px solid var(--amber-border)' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '15px', color: '#92400E', lineHeight: 1.6, marginBottom: '10px' }}>
              &ldquo;{STARTERS[tipIndex]}&rdquo;
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#B45309' }}>
              Based on what {childName} is reading. Asking even one question doubles retention.
            </p>
          </div>
        </Section>

        {/* Quick nav */}
        <Section title="Explore">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
            {[
              { href: '/parent/dashboard/overview', emoji: '📊', title: 'Overview',  desc: 'Stats, subjects, password' },
              { href: '/parent/dashboard/progress', emoji: '📚', title: 'Progress',  desc: 'Chapter scores and detail' },
              { href: '/parent/dashboard/writing',  emoji: '✍️', title: 'Writing',   desc: 'Prompts and submissions' },
            ].map(({ href, emoji, title, desc }) => (
              <Link key={href} href={href} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: '18px', cursor: 'pointer', transition: 'box-shadow 0.15s, border-color 0.15s' }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border-medium)'; el.style.boxShadow = 'var(--shadow-lifted)' }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border-subtle)'; el.style.boxShadow = 'var(--shadow-card)' }}
                >
                  <span style={{ fontSize: '24px', display: 'block', marginBottom: '10px' }}>{emoji}</span>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '14px', color: 'var(--gray-900)', marginBottom: '4px' }}>{title}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gray-400)' }}>{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </Section>

      </PageShell>
    </ParentSidebarLayout>
  )
}
