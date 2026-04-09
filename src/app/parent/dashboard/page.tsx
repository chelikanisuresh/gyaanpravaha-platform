'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'

// Simulated data — will be replaced with real Supabase queries as content is added
const STUDENT_DATA = {
  chaptersCompleted: 3,
  totalChapters: 8,
  avgScore: 85,
  streak: 5,
  lastStudied: '2 hours ago',
  todayMins: 22,
  currentChapter: 'In Morning Dew',
  currentSections: 3,
  totalSections: 7,
}

const ACTION_ITEMS = [
  { id: 1, type: 'deadline',  emoji: '⏰', title: 'Writing deadline in 2 days', desc: '"In Morning Dew" writing prompt due Apr 15. Your child has not submitted yet.', urgency: 'high' },
  { id: 2, type: 'weak',      emoji: '⚠️', title: 'Chapter needs attention',    desc: '"If I Were Lord of Tartary" scored 76%. Encourage your child to re-read and retake the quiz.', urgency: 'medium' },
]

const ACTIVITY_FEED = [
  { id: 1, emoji: '📖', text: 'Read section 3 of "In Morning Dew"',      time: '2 hours ago' },
  { id: 2, emoji: '✅', text: 'Completed quiz for "The Fun They Had"',     time: 'Yesterday' },
  { id: 3, emoji: '📝', text: 'Submitted writing for "The Fun They Had"', time: 'Yesterday' },
  { id: 4, emoji: '🔥', text: 'Maintained 5 day streak',                  time: '2 days ago' },
  { id: 5, emoji: '📖', text: 'Completed "Whistles and Shaving Bristles"', time: '3 days ago' },
]

const CONVERSATION_STARTERS = [
  'What do you think the scarecrow in "In Morning Dew" finds most confusing about the world?',
  'If you could ask Tolstoy one question about "Three Questions", what would it be?',
  'Do you think Milkha Singh would have become a champion if Partition had not happened?',
]

export default function ParentDashboardPage() {
  const [parentName, setParentName] = useState('Parent')
  const [childName, setChildName] = useState('Student')
  const [greeting, setGreeting] = useState('Good morning')
  const [tipIndex] = useState(Math.floor(Math.random() * CONVERSATION_STARTERS.length))

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 17) setGreeting('Good afternoon')
    else setGreeting('Good evening')

    const fetchData = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: p } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
      if (p?.full_name) setParentName(p.full_name)
      const { data: links } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id).single()
      if (!links) return
      const { data: c } = await supabase.from('profiles').select('full_name').eq('id', links.student_id).single()
      if (c?.full_name) setChildName(c.full_name)
    }
    fetchData()
  }, [])

  const progress = Math.round((STUDENT_DATA.chaptersCompleted / STUDENT_DATA.totalChapters) * 100)

  return (
    <ParentSidebarLayout parentName={parentName}>
      <style>{`
        @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .slide-up { animation: slideUp 0.4s ease forwards; opacity: 0; }
        .nav-card { transition: all 0.2s; cursor: pointer; }
        .nav-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(45,106,79,0.12); }
      `}</style>

      <div style={{ maxWidth: '900px', padding: '24px 24px 60px' }}>

        {/* Greeting */}
        <div className="slide-up" style={{ marginBottom: '24px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(20px,3vw,28px)', color: '#1B4332', marginBottom: '4px' }}>
            {greeting}, {parentName}! 👋
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>
            Here is everything you need to know about {childName}&apos;s learning today.
          </p>
        </div>

        {/* ── ACTION ITEMS — needs attention NOW ── */}
        {ACTION_ITEMS.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Needs your attention</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {ACTION_ITEMS.map((item, i) => (
                <div key={item.id} className="slide-up" style={{
                  animationDelay: `${i * 80}ms`,
                  background: item.urgency === 'high' ? '#FEF2F2' : '#FEF3C7',
                  border: `1.5px solid ${item.urgency === 'high' ? '#FECACA' : '#FDE68A'}`,
                  borderRadius: '14px', padding: '14px 18px',
                  display: 'flex', alignItems: 'flex-start', gap: '12px',
                }}>
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>{item.emoji}</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: item.urgency === 'high' ? '#991B1B' : '#92400E', marginBottom: '3px' }}>{item.title}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: item.urgency === 'high' ? '#B91C1C' : '#B45309', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>

          {/* ── TODAY AT A GLANCE ── */}
          <div style={{ background: 'linear-gradient(135deg, #1B4332, #2D6A4F)', borderRadius: '16px', padding: '20px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#74C69D', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>Today</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              {[
                { label: 'Studied today', value: `${STUDENT_DATA.todayMins} mins`, emoji: '⏱️' },
                { label: 'Day streak',    value: `${STUDENT_DATA.streak} days`,    emoji: '🔥' },
              ].map(({ label, value, emoji }) => (
                <div key={label} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px' }}>
                  <span style={{ fontSize: '18px', display: 'block', marginBottom: '6px' }}>{emoji}</span>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: '#74C69D', lineHeight: 1 }}>{value}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginTop: '3px' }}>{label}</p>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '10px', padding: '12px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>Currently reading</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white', marginBottom: '6px' }}>{STUDENT_DATA.currentChapter}</p>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.round((STUDENT_DATA.currentSections / STUDENT_DATA.totalSections) * 100)}%`, background: '#74C69D', borderRadius: '2px' }}/>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{STUDENT_DATA.currentSections} of {STUDENT_DATA.totalSections} sections read</p>
            </div>
          </div>

          {/* ── PROGRESS SNAPSHOT ── */}
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>Progress snapshot</p>

            {/* Ring */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
              <div style={{ position: 'relative', width: '72px', height: '72px', flexShrink: 0 }}>
                <svg width="72" height="72" viewBox="0 0 72 72">
                  <circle cx="36" cy="36" r="30" fill="none" stroke="#E5E7EB" strokeWidth="7"/>
                  <circle cx="36" cy="36" r="30" fill="none" stroke="#2D6A4F" strokeWidth="7"
                    strokeDasharray={`${(progress / 100) * 188} 188`}
                    strokeLinecap="round" transform="rotate(-90 36 36)"/>
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '16px', color: '#1B4332', lineHeight: 1 }}>{progress}%</p>
                </div>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: '#1B4332', lineHeight: 1, marginBottom: '4px' }}>
                  {STUDENT_DATA.chaptersCompleted}/{STUDENT_DATA.totalChapters}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#6B7280' }}>Chapters completed</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#2D6A4F', marginTop: '4px' }}>{STUDENT_DATA.avgScore}% avg score</p>
              </div>
            </div>

            {/* Last studied */}
            <div style={{ background: '#F0FDF4', borderRadius: '10px', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px' }}>🕐</span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#065F46' }}>
                {childName} last studied <strong>{STUDENT_DATA.lastStudied}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* ── RECENT ACTIVITY ── */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden', marginBottom: '20px' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332' }}>Recent activity</p>
            <Link href="/parent/dashboard/progress" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#2D6A4F', textDecoration: 'none' }}>Full progress →</Link>
          </div>
          {ACTIVITY_FEED.map((item, i) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 20px', borderBottom: i < ACTIVITY_FEED.length - 1 ? '1px solid #F9FAFB' : 'none' }}>
              <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.emoji}</span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', flex: 1 }}>{item.text}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', flexShrink: 0 }}>{item.time}</p>
            </div>
          ))}
        </div>

        {/* ── CONVERSATION STARTER ── */}
        <div style={{ background: '#FEF3C7', borderRadius: '16px', border: '1px solid #FDE68A', padding: '18px 20px', marginBottom: '20px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#92400E', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>🗣️ Ask {childName} this today</p>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', color: '#92400E', lineHeight: 1.5, marginBottom: '8px' }}>
            &ldquo;{CONVERSATION_STARTERS[tipIndex]}&rdquo;
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#B45309' }}>
            Based on what {childName} is currently reading. Asking even one question doubles retention.
          </p>
        </div>

        {/* ── QUICK NAV CARDS ── */}
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Explore</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
          {[
            { href: '/parent/dashboard/overview',  emoji: '📊', title: 'Overview',  desc: 'Full stats, subjects and password management',  bg: '#D8F3DC', color: '#1B4332' },
            { href: '/parent/dashboard/progress',  emoji: '📚', title: 'Progress',  desc: 'Chapter by chapter detail and quiz scores',      bg: '#EDE9FE', color: '#5B21B6' },
            { href: '/parent/dashboard/writing',   emoji: '✍️', title: 'Writing',   desc: 'Writing prompt submissions and scores',          bg: '#FEF3C7', color: '#92400E' },
          ].map(({ href, emoji, title, desc, bg, color }) => (
            <Link key={href} href={href} className="nav-card" style={{
              background: bg, borderRadius: '14px', padding: '18px 16px',
              textDecoration: 'none', display: 'block',
              border: `1px solid ${bg}`,
            }}>
              <span style={{ fontSize: '28px', display: 'block', marginBottom: '10px' }}>{emoji}</span>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '15px', color, marginBottom: '4px' }}>{title}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color, opacity: 0.7, lineHeight: 1.5 }}>{desc}</p>
            </Link>
          ))}
        </div>

      </div>
    </ParentSidebarLayout>
  )
}
