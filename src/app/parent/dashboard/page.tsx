'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'



const SUBJECTS = [
  {
    name: 'English', emoji: '📖', available: true,
    chapters: 8, completed: 3, avgScore: 85, timeSpent: 142,
    weak: false,
  },
  { name: 'Mathematics',      emoji: '🔢', available: false, chapters: 0, completed: 0, avgScore: 0, timeSpent: 0, weak: false },
  { name: 'Science',          emoji: '🔬', available: false, chapters: 0, completed: 0, avgScore: 0, timeSpent: 0, weak: false },
  { name: 'History & Civics', emoji: '🏛️', available: false, chapters: 0, completed: 0, avgScore: 0, timeSpent: 0, weak: false },
  { name: 'Geography',        emoji: '🌍', available: false, chapters: 0, completed: 0, avgScore: 0, timeSpent: 0, weak: false },
  { name: 'Sanskrit',         emoji: '📜', available: false, chapters: 0, completed: 0, avgScore: 0, timeSpent: 0, weak: false },
  { name: 'ICT',              emoji: '💻', available: false, chapters: 0, completed: 0, avgScore: 0, timeSpent: 0, weak: false },
]

const CHAPTERS = [
  { id: 1, title: 'Whistles and Shaving Bristles', type: 'Prose',     completed: true,  score: 88, timeSpent: 18, attempts: 1, sectionsRead: 7 },
  { id: 2, title: 'If I Were Lord of Tartary',     type: 'Poetry',    completed: true,  score: 76, timeSpent: 14, attempts: 2, sectionsRead: 7 },
  { id: 3, title: 'The Fun They Had',              type: 'Story',     completed: true,  score: 92, timeSpent: 20, attempts: 1, sectionsRead: 7 },
  { id: 4, title: 'In Morning Dew',                type: 'Poetry',    completed: false, score: null, timeSpent: 8, attempts: 0, sectionsRead: 3 },
  { id: 5, title: 'The Boy Who Outran the Wind',   type: 'Biography', completed: false, score: null, timeSpent: 0, attempts: 0, sectionsRead: 0 },
  { id: 6, title: 'The Blind Boy',                 type: 'Poetry',    completed: false, score: null, timeSpent: 0, attempts: 0, sectionsRead: 0 },
  { id: 7, title: 'Three Questions',               type: 'Story',     completed: false, score: null, timeSpent: 0, attempts: 0, sectionsRead: 0 },
  { id: 8, title: 'From a Railway Carriage',       type: 'Poetry',    completed: false, score: null, timeSpent: 0, attempts: 0, sectionsRead: 0 },
]

const WRITING_PROMPTS = [
  { id: 1, chapter: 'Whistles and Shaving Bristles', prompt: 'Write about a rule in your family that you think is unusual but useful.', submitted: true,  score: 16, maxScore: 20, status: 'released',   deadline: 'Apr 5' },
  { id: 2, chapter: 'The Fun They Had',              prompt: 'Do you think schools of the future will be better or worse than today? Give reasons.', submitted: true,  score: null, maxScore: 20, status: 'pending',    deadline: 'Apr 10' },
  { id: 3, chapter: 'In Morning Dew',                prompt: 'Write about something you observe every day but have never really thought about.', submitted: false, score: null, maxScore: 20, status: 'assigned',   deadline: 'Apr 15' },
]

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  Prose:     { bg: '#D8F3DC', text: '#1B4332' },
  Poetry:    { bg: '#FEF3C7', text: '#92400E' },
  Story:     { bg: '#EDE9FE', text: '#5B21B6' },
  Biography: { bg: '#FFE4E6', text: '#9F1239' },
}

function ScoreBar({ score, max = 100 }: { score: number; max?: number }) {
  const pct = Math.round((score / max) * 100)
  const color = pct >= 80 ? '#10B981' : pct >= 60 ? '#F59E0B' : '#EF4444'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ flex: 1, height: '8px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '4px', transition: 'width 0.8s ease' }}/>
      </div>
      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color, minWidth: '36px' }}>{score}/{max}</span>
    </div>
  )
}

function PasswordResetCard({ childName, childId }: { childName: string; childId: string }) {
  const [showForm, setShowForm] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    if (newPassword !== confirmPassword) { setError('Passwords do not match.'); return }
    if (newPassword.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true)

    const res = await fetch('/api/reset-child-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ childId, newPassword }),
    })

    if (res.ok) {
      setMessage('Password updated successfully! Share the new password with your child.')
      setNewPassword('')
      setConfirmPassword('')
      setShowForm(false)
    } else {
      setError('Failed to update password. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: showForm ? '1px solid #F3F4F6' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '20px' }}>🔑</span>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', marginBottom: '2px' }}>{childName}&apos;s password</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>Only you can change your child&apos;s login password</p>
          </div>
        </div>
        <button
          onClick={() => { setShowForm(p => !p); setError(''); setMessage('') }}
          style={{ background: showForm ? '#F3F4F6' : '#D8F3DC', color: showForm ? '#6B7280' : '#1B4332', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', border: 'none', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer' }}
        >
          {showForm ? 'Cancel' : 'Change password'}
        </button>
      </div>

      {message && (
        <div style={{ padding: '12px 20px', background: '#D8F3DC', borderBottom: '1px solid #A7F3D0' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#065F46' }}>✓ {message}</p>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleReset} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label className="label" htmlFor="newPw">New password for {childName}</label>
            <input id="newPw" type="password" className="input" placeholder="Minimum 8 characters" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={8}/>
          </div>
          <div>
            <label className="label" htmlFor="confirmPw">Confirm new password</label>
            <input id="confirmPw" type="password" className="input" placeholder="Re-enter new password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required/>
          </div>
          {error && <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#EF4444' }}>{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '14px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Updating...' : 'Update password'}
          </button>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', textAlign: 'center' }}>
            After updating, share the new password with {childName} so they can log in.
          </p>
        </form>
      )}
    </div>
  )
}

export default function ParentDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'writing'>('overview')
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [child, setChild] = useState<{ name: string; email: string; id: string } | null>(null)

  useEffect(() => {
    const fetchChild = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: links } = await supabase
        .from('parent_student_links')
        .select('student_id')
        .eq('parent_id', user.id)
        .single()

      if (!links) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .eq('id', links.student_id)
        .single()

      if (profile) {
        setChild({ id: profile.id, name: profile.full_name || 'Student', email: profile.email })
      }
    }
    fetchChild()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const completedChapters = CHAPTERS.filter(c => c.completed).length
  const totalTimeSpent = CHAPTERS.reduce((a, c) => a + c.timeSpent, 0)
  const avgScore = Math.round(CHAPTERS.filter(c => c.score).reduce((a, c) => a + (c.score || 0), 0) / CHAPTERS.filter(c => c.score).length)
  const weakChapters = CHAPTERS.filter(c => c.score !== null && c.score < 70)

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAF9' }}>
      <style>{`
        @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .slide-up { animation: slideUp 0.4s ease forwards; }
        .tab-btn { transition: all 0.2s; cursor: pointer; border: none; }
        .card-hover { transition: transform 0.2s, box-shadow 0.2s; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(45,106,79,0.1); }
      `}</style>

      <Navbar rightContent={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332', lineHeight: 1 }}>Parent</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', lineHeight: 1, marginTop: '2px' }}>Dashboard</p>
          </div>
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <div onClick={() => setShowDropdown(p => !p)} style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: 'white', cursor: 'pointer', border: showDropdown ? '2px solid #818CF8' : '2px solid transparent' }}>
              P
            </div>
            {showDropdown && (
              <div style={{ position: 'absolute', top: '44px', right: 0, background: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', minWidth: '180px', overflow: 'hidden', zIndex: 200 }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #F3F4F6' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', marginBottom: '2px' }}>Parent</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>parent@example.com</p>
                </div>
                <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', width: '100%', border: 'none', background: 'transparent', color: '#EF4444', fontFamily: 'var(--font-body)', fontSize: '14px', cursor: 'pointer', textAlign: 'left' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#FEF2F2')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M10 11l3-3-3-3M13 8H6" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      }/>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '28px 5% 60px' }}>

        {/* Child header */}
        <div className="slide-up" style={{ background: 'linear-gradient(135deg, #1B4332, #2D6A4F)', borderRadius: '20px', padding: '24px 28px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#74C69D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '22px', color: '#1B4332', flexShrink: 0 }}>
              {child?.name || 'Your child'[0]}
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: 'white', marginBottom: '2px' }}>{child?.name || 'Your child'}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>Grade {'6'}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '10px', padding: '10px 16px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: '#74C69D', lineHeight: 1 }}>{completedChapters}/8</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '3px' }}>Chapters</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '10px', padding: '10px 16px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: '#74C69D', lineHeight: 1 }}>{avgScore}%</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '3px' }}>Avg score</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '10px', padding: '10px 16px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: '#74C69D', lineHeight: 1 }}>{totalTimeSpent}m</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '3px' }}>Time spent</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: 'white', borderRadius: '12px', padding: '4px', border: '1px solid #E5E7EB', marginBottom: '20px', width: 'fit-content' }}>
          {([
            { key: 'overview', label: 'Overview',  emoji: '📊' },
            { key: 'progress', label: 'Progress',  emoji: '📚' },
            { key: 'writing',  label: 'Writing',   emoji: '✍️' },
          ] as { key: typeof activeTab; label: string; emoji: string }[]).map(({ key, label, emoji }) => (
            <button key={key} className="tab-btn" onClick={() => setActiveTab(key)} style={{
              padding: '9px 20px', borderRadius: '9px', fontSize: '14px',
              fontFamily: 'var(--font-heading)', fontWeight: 700,
              background: activeTab === key ? '#2D6A4F' : 'transparent',
              color: activeTab === key ? 'white' : '#6B7280',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <span style={{ fontSize: '14px' }}>{emoji}</span>{label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '12px' }}>
              {[
                { label: 'Chapters completed', value: `${completedChapters}/8`, emoji: '📚', bg: '#D8F3DC', color: '#1B4332' },
                { label: 'Average score',      value: `${avgScore}%`,           emoji: '⭐', bg: '#FEF3C7', color: '#92400E' },
                { label: 'Time studying',      value: `${totalTimeSpent} mins`, emoji: '⏱️', bg: '#EDE9FE', color: '#5B21B6' },
                { label: 'Day streak',         value: '5 days',                 emoji: '🔥', bg: '#FFE4E6', color: '#9F1239' },
              ].map(({ label, value, emoji, bg, color }) => (
                <div key={label} style={{ background: bg, borderRadius: '14px', padding: '16px' }}>
                  <span style={{ fontSize: '22px', display: 'block', marginBottom: '8px' }}>{emoji}</span>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color, lineHeight: 1, marginBottom: '4px' }}>{value}</p>
                  <p style={{ fontSize: '12px', color: '#6B7280' }}>{label}</p>
                </div>
              ))}
            </div>

            {/* Weak chapters alert */}
            {weakChapters.length > 0 && (
              <div style={{ background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: '14px', padding: '16px 20px' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#991B1B', marginBottom: '8px' }}>
                  ⚠️ Chapters needing attention
                </p>
                {weakChapters.map(ch => (
                  <div key={ch.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#7F1D1D' }}>{ch.title}</p>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#EF4444' }}>{ch.score}%</span>
                  </div>
                ))}
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#B91C1C', marginTop: '8px' }}>
                  Encourage {child?.name || 'Your child'} to review these chapters and retake the quiz.
                </p>
              </div>
            )}

            {/* Subject overview */}
            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332' }}>Subject overview</p>
              </div>
              {SUBJECTS.map((subject, i) => (
                <div key={subject.name} style={{ padding: '14px 20px', borderBottom: i < SUBJECTS.length - 1 ? '1px solid #F9FAFB' : 'none', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>{subject.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: subject.available ? '#1B4332' : '#9CA3AF' }}>{subject.name}</p>
                      {subject.available
                        ? <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#2D6A4F' }}>{subject.completed}/{subject.chapters} chapters</p>
                        : <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>Coming soon</span>}
                    </div>
                    {subject.available ? (
                      <div style={{ height: '6px', background: '#E5E7EB', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${Math.round((subject.completed / subject.chapters) * 100)}%`, background: '#2D6A4F', borderRadius: '3px' }}/>
                      </div>
                    ) : (
                      <div style={{ height: '6px', background: '#F3F4F6', borderRadius: '3px' }}/>
                    )}
                  </div>
                  {subject.available && subject.avgScore > 0 && (
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#2D6A4F', flexShrink: 0 }}>{subject.avgScore}%</span>
                  )}
                </div>
              ))}
            </div>

            {/* Password reset */}
            <PasswordResetCard childName={child?.name || 'Your child'} childEmail={child?.email || ''}/>

            {/* Subscription */}
            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '20px' }}>📅</span>
                <div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', marginBottom: '2px' }}>Annual subscription — Active</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>Renews March 2027 · ₹2,499/year</p>
                </div>
              </div>
              <span style={{ background: '#D8F3DC', color: '#1B4332', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', padding: '5px 14px', borderRadius: '20px' }}>Active</span>
            </div>
          </div>
        )}

        {/* ── PROGRESS TAB ── */}
        {activeTab === 'progress' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '16px 20px', marginBottom: '4px' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', marginBottom: '4px' }}>English — Chapter by chapter</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7280' }}>{completedChapters} of 8 chapters completed · {avgScore}% average score</p>
            </div>
            {CHAPTERS.map((ch) => {
              const typeStyle = TYPE_COLORS[ch.type]
              return (
                <div key={ch.id} className="card-hover" style={{ background: 'white', borderRadius: '14px', border: ch.completed ? '1px solid #D8F3DC' : '1px solid #E5E7EB', padding: '16px 20px', position: 'relative', overflow: 'hidden' }}>
                  {ch.completed && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#10B981', borderRadius: '14px 0 0 14px' }}/>}
                  {ch.sectionsRead > 0 && !ch.completed && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#F59E0B', borderRadius: '14px 0 0 14px' }}/>}

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flexWrap: 'wrap' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: ch.completed ? '#D8F3DC' : ch.sectionsRead > 0 ? '#FEF3C7' : '#F3F4F6', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: ch.completed ? '#1B4332' : ch.sectionsRead > 0 ? '#92400E' : '#9CA3AF' }}>
                      {ch.completed ? '✓' : ch.id}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332' }}>{ch.title}</p>
                        <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontFamily: 'var(--font-heading)', fontWeight: 700, background: typeStyle.bg, color: typeStyle.text }}>{ch.type}</span>
                      </div>

                      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <div>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', marginBottom: '2px' }}>Sections read</p>
                          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#374151' }}>{ch.sectionsRead}/7</p>
                        </div>
                        <div>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', marginBottom: '2px' }}>Time spent</p>
                          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#374151' }}>{ch.timeSpent} mins</p>
                        </div>
                        <div>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', marginBottom: '2px' }}>Quiz attempts</p>
                          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#374151' }}>{ch.attempts}</p>
                        </div>
                        {ch.score !== null && (
                          <div>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', marginBottom: '6px' }}>Quiz score</p>
                            <ScoreBar score={ch.score} max={100}/>
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ flexShrink: 0 }}>
                      {ch.completed
                        ? <span style={{ background: '#D8F3DC', color: '#1B4332', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', padding: '5px 12px', borderRadius: '20px' }}>Completed</span>
                        : ch.sectionsRead > 0
                          ? <span style={{ background: '#FEF3C7', color: '#92400E', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', padding: '5px 12px', borderRadius: '20px' }}>In progress</span>
                          : <span style={{ background: '#F3F4F6', color: '#9CA3AF', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', padding: '5px 12px', borderRadius: '20px' }}>Not started</span>
                      }
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ── WRITING TAB ── */}
        {activeTab === 'writing' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '16px 20px', marginBottom: '4px' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', marginBottom: '4px' }}>Writing prompts</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7280' }}>Writing assignments assigned by the platform. AI evaluates and admin reviews before scores are released.</p>
            </div>
            {WRITING_PROMPTS.map((wp) => (
              <div key={wp.id} className="card-hover" style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{wp.chapter}</p>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', lineHeight: 1.4, maxWidth: '480px' }}>{wp.prompt}</p>
                  </div>
                  <span style={{
                    padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontFamily: 'var(--font-heading)', fontWeight: 700, flexShrink: 0,
                    background: wp.status === 'released' ? '#D8F3DC' : wp.status === 'pending' ? '#FEF3C7' : '#F3F4F6',
                    color: wp.status === 'released' ? '#1B4332' : wp.status === 'pending' ? '#92400E' : '#6B7280',
                  }}>
                    {wp.status === 'released' ? 'Score released' : wp.status === 'pending' ? 'Under review' : 'Not submitted'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', marginBottom: '2px' }}>Deadline</p>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#374151' }}>{wp.deadline}</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', marginBottom: '2px' }}>Submitted</p>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: wp.submitted ? '#10B981' : '#EF4444' }}>
                      {wp.submitted ? 'Yes' : 'Not yet'}
                    </p>
                  </div>
                  {wp.score !== null && (
                    <div style={{ flex: 1, minWidth: '160px' }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', marginBottom: '6px' }}>Score</p>
                      <ScoreBar score={wp.score} max={wp.maxScore}/>
                    </div>
                  )}
                  {wp.submitted && wp.score === null && (
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#F59E0B', fontStyle: 'italic' }}>Score will appear after admin review</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
