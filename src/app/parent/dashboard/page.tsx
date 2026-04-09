'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'

const ACTIVITY = [
  { emoji: '📖', text: 'Read section 3 of "In Morning Dew"',       time: '2h ago' },
  { emoji: '✅', text: 'Completed quiz for "The Fun They Had"',      time: 'Yesterday' },
  { emoji: '📝', text: 'Submitted writing for "The Fun They Had"',  time: 'Yesterday' },
  { emoji: '🔥', text: 'Maintained 5 day study streak',              time: '2 days ago' },
  { emoji: '📖', text: 'Completed "Whistles and Shaving Bristles"',  time: '3 days ago' },
]

const ACTION_ITEMS = [
  { id: 1, urgency: 'high',   emoji: '⏰', title: 'Writing deadline in 2 days',     desc: '"In Morning Dew" prompt due Apr 15. Not submitted yet.' },
  { id: 2, urgency: 'medium', emoji: '⚠️', title: 'Chapter needs attention',         desc: '"If I Were Lord of Tartary" scored 76%. Encourage a retry.' },
]

const STARTERS = [
  'What do you think the scarecrow in "In Morning Dew" finds most puzzling about the world?',
  'If you could ask Tolstoy one question about "Three Questions", what would it be?',
  'Do you think Milkha Singh would have become a champion without everything he went through?',
]

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
      const { data: l } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id).single()
      if (!l) return
      const { data: c } = await supabase.from('profiles').select('full_name').eq('id', l.student_id).single()
      if (c?.full_name) setChildName(c.full_name.split(' ')[0])
    }
    load()
  }, [])

  const progress = Math.round((3 / 8) * 100)

  return (
    <ParentSidebarLayout parentName={parentName}>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} .s-up{animation:slideUp 0.4s ease forwards;opacity:0}`}</style>
      <div style={{ maxWidth: '900px', padding: '28px 28px 60px' }}>

        {/* Greeting */}
        <div className="s-up" style={{ marginBottom: '24px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(20px,3vw,28px)', color: '#1B4332', marginBottom: '4px' }}>
            {greeting}, {parentName}! 👋
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>
            Here is everything you need to know about {childName}&apos;s learning today.
          </p>
        </div>

        {/* Action items */}
        {ACTION_ITEMS.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>Needs attention</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ACTION_ITEMS.map((item, i) => (
                <div key={item.id} className="s-up" style={{ animationDelay: `${i * 60}ms`, display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '14px 18px', borderRadius: '12px', border: `1px solid ${item.urgency === 'high' ? '#FECACA' : '#FDE68A'}`, background: item.urgency === 'high' ? '#FEF2F2' : '#FEF3C7' }}>
                  <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.emoji}</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: item.urgency === 'high' ? '#991B1B' : '#92400E', marginBottom: '2px' }}>{item.title}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: item.urgency === 'high' ? '#B91C1C' : '#B45309', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two column */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>

          {/* Today */}
          <div style={{ background: 'linear-gradient(135deg, #1B4332, #2D6A4F)', borderRadius: '16px', padding: '20px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#74C69D', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '14px' }}>Today</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
              {[{ label: 'Studied', value: '22 mins', emoji: '⏱️' }, { label: 'Streak', value: '5 days', emoji: '🔥' }].map(({ label, value, emoji }) => (
                <div key={label} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px' }}>
                  <span style={{ fontSize: '16px', display: 'block', marginBottom: '6px' }}>{emoji}</span>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '17px', color: '#74C69D', lineHeight: 1 }}>{value}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginTop: '3px' }}>{label}</p>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '10px', padding: '11px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '3px' }}>Currently reading</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white', marginBottom: '7px' }}>In Morning Dew</p>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '43%', background: '#74C69D', borderRadius: '2px' }}/>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>3 of 7 sections read</p>
            </div>
          </div>

          {/* Progress snapshot */}
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '16px' }}>Progress snapshot</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
              <div style={{ position: 'relative', width: '68px', height: '68px', flexShrink: 0 }}>
                <svg width="68" height="68" viewBox="0 0 68 68">
                  <circle cx="34" cy="34" r="28" fill="none" stroke="#E5E7EB" strokeWidth="6"/>
                  <circle cx="34" cy="34" r="28" fill="none" stroke="#2D6A4F" strokeWidth="6"
                    strokeDasharray={`${(progress / 100) * 176} 176`} strokeLinecap="round" transform="rotate(-90 34 34)"/>
                </svg>
                <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: '#1B4332', margin: 0 }}>{progress}%</p>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '22px', color: '#1B4332', lineHeight: 1, marginBottom: '3px' }}>3/8</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#6B7280' }}>Chapters done</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#2D6A4F', marginTop: '4px' }}>85% avg score</p>
              </div>
            </div>
            <div style={{ background: '#F0FDF4', borderRadius: '9px', padding: '9px 12px', display: 'flex', alignItems: 'center', gap: '7px' }}>
              <span style={{ fontSize: '13px' }}>🕐</span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#065F46' }}>
                {childName} last studied <strong>2 hours ago</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Activity feed */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Recent activity</p>
            <Link href="/parent/dashboard/progress" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#2D6A4F', textDecoration: 'none' }}>Full progress →</Link>
          </div>
          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
            {ACTIVITY.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 18px', borderBottom: i < ACTIVITY.length - 1 ? '1px solid #F9FAFB' : 'none' }}>
                <span style={{ fontSize: '15px', flexShrink: 0 }}>{item.emoji}</span>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', flex: 1 }}>{item.text}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', flexShrink: 0 }}>{item.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation starter */}
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>Ask {childName} this today</p>
          <div style={{ background: '#FEF3C7', borderRadius: '14px', border: '1px solid #FDE68A', padding: '18px 20px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: '#92400E', lineHeight: 1.55, marginBottom: '8px' }}>
              &ldquo;{STARTERS[tipIndex]}&rdquo;
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#B45309' }}>
              Based on what {childName} is reading. Asking even one question doubles retention.
            </p>
          </div>
        </div>

        {/* Quick nav */}
        <div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>Explore</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
            {[
              { href: '/parent/dashboard/overview', emoji: '📊', title: 'Overview',  desc: 'Stats, subjects, password',       bg: '#D8F3DC', color: '#1B4332' },
              { href: '/parent/dashboard/progress', emoji: '📚', title: 'Progress',  desc: 'Chapter scores and detail',       bg: '#EDE9FE', color: '#5B21B6' },
              { href: '/parent/dashboard/writing',  emoji: '✍️', title: 'Writing',   desc: 'Prompts and submissions',         bg: '#FEF3C7', color: '#92400E' },
            ].map(({ href, emoji, title, desc, bg, color }) => (
              <Link key={href} href={href} style={{ textDecoration: 'none' }}>
                <div style={{ background: bg, borderRadius: '14px', padding: '18px 16px', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', border: `1px solid ${bg}` }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <span style={{ fontSize: '26px', display: 'block', marginBottom: '10px' }}>{emoji}</span>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color, marginBottom: '3px' }}>{title}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color, opacity: 0.7, lineHeight: 1.4 }}>{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </ParentSidebarLayout>
  )
}
