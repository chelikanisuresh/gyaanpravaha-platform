'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const SUBJECTS = [
  { id: 'english',  label: 'English',          emoji: '📖', available: true  },
  { id: 'maths',    label: 'Mathematics',       emoji: '🔢', available: false },
  { id: 'science',  label: 'Science',           emoji: '🔬', available: false },
  { id: 'history',  label: 'History & Civics',  emoji: '🏛️', available: false },
  { id: 'geo',      label: 'Geography',         emoji: '🌍', available: false },
  { id: 'sanskrit', label: 'Sanskrit',          emoji: '📜', available: false },
  { id: 'ict',      label: 'ICT',               emoji: '💻', available: false },
]

type ActiveSection = 'dashboard' | 'english' | 'maths' | 'science' | 'history' | 'geo' | 'sanskrit' | 'ict' | 'profile'

interface Props {
  children: (activeSection: ActiveSection, studentId: string) => React.ReactNode
}

export default function StudentSidebarLayout({ children }: Props) {
  const router = useRouter()
  const [studentName,    setStudentName]    = useState('Student')
  const [studentId,      setStudentId]      = useState('')
  const [activeSection,  setActiveSection]  = useState<ActiveSection>('dashboard')
  const [subjectsOpen,   setSubjectsOpen]   = useState(false)
  const [mobileNavOpen,  setMobileNavOpen]  = useState(false)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setStudentId(user.id)
      const { data: p } = await supabase.from('profiles').select('full_name').eq('id', user.id).maybeSingle()
      if (p?.full_name) setStudentName(p.full_name.split(' ')[0])
    }
    load()
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const initial = studentName.charAt(0).toUpperCase()

  const navItemStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '10px 12px', borderRadius: '10px', marginBottom: '2px',
    textDecoration: 'none', cursor: 'pointer', width: '100%', border: 'none',
    background: active ? 'rgba(116,198,157,0.2)' : 'transparent',
    outline: active ? '1px solid rgba(116,198,157,0.3)' : '1px solid transparent',
    transition: 'all 0.15s',
  })

  const navLabelStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: 'var(--font-heading)', fontWeight: active ? 700 : 500,
    fontSize: '14px', color: active ? 'white' : 'rgba(255,255,255,0.65)',
    lineHeight: 1,
  })

  const SidebarContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <a href="https://gyaanpravaha.in" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '34px', height: '34px', background: '#74C69D', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M10 4v12" stroke="#1B4332" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '15px', color: 'white', lineHeight: 1 }}>Gyaanpravaha</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>ज्ञानप्रवाह</p>
          </div>
        </a>
      </div>

      {/* Student info */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '50%', background: '#74C69D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '15px', color: '#1B4332', flexShrink: 0 }}>
            {initial}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white', lineHeight: 1, marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{studentName}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Student</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>

        {/* Dashboard */}
        <button onClick={() => { setActiveSection('dashboard'); setMobileNavOpen(false) }} style={navItemStyle(activeSection === 'dashboard')}>
          <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>📊</span>
          <span style={navLabelStyle(activeSection === 'dashboard')}>Dashboard</span>
        </button>

        {/* Subjects — collapsible */}
        <button
          onClick={() => setSubjectsOpen(o => !o)}
          style={{ ...navItemStyle(SUBJECTS.some(s => activeSection === s.id)), justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>📚</span>
            <span style={navLabelStyle(SUBJECTS.some(s => activeSection === s.id))}>Subjects</span>
          </div>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
            style={{ transform: subjectsOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}>
            <path d="M2 4l4 4 4-4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Subject children */}
        {subjectsOpen && (
          <div style={{ marginLeft: '12px', marginBottom: '4px' }}>
            {SUBJECTS.map(subject => (
              <button
                key={subject.id}
                onClick={() => { setActiveSection(subject.id as ActiveSection); setMobileNavOpen(false) }}
                style={{ ...navItemStyle(activeSection === subject.id), padding: '8px 12px' }}
              >
                <span style={{ fontSize: '14px', width: '20px', textAlign: 'center' }}>{subject.emoji}</span>
                <span style={{ ...navLabelStyle(activeSection === subject.id), fontSize: '13px' }}>
                  {subject.label}
                </span>
                {!subject.available && (
                  <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-body)', fontSize: '9px', color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '10px', flexShrink: 0 }}>
                    Soon
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Profile */}
        <button onClick={() => { setActiveSection('profile'); setMobileNavOpen(false) }} style={navItemStyle(activeSection === 'profile')}>
          <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>👤</span>
          <span style={navLabelStyle(activeSection === 'profile')}>Profile</span>
        </button>

      </nav>

      {/* Logout */}
      <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'all 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>🚪</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '14px', color: 'rgba(255,255,255,0.55)' }}>Logout</span>
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F0FDF4' }}>
      <style>{`
        @media(max-width:768px){
          .student-sidebar { display: none !important; }
          .student-sidebar.open { display: flex !important; }
          .student-mobile-bar { display: flex !important; }
        }
        @media(min-width:769px){
          .student-mobile-bar { display: none !important; }
        }
      `}</style>

      {/* Desktop sidebar */}
      <div className="student-sidebar" style={{ width: '240px', minWidth: '240px', background: '#1B4332', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', zIndex: 50 }}>
        <SidebarContent/>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileNavOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
          <div style={{ width: '240px', background: '#1B4332', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <SidebarContent/>
          </div>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.5)' }} onClick={() => setMobileNavOpen(false)}/>
        </div>
      )}

      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>

        {/* Mobile top bar */}
        <div className="student-mobile-bar" style={{ background: '#1B4332', padding: '12px 16px', alignItems: 'center', justifyContent: 'space-between', display: 'none' }}>
          <button onClick={() => setMobileNavOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '15px', color: 'white' }}>Gyaanpravaha</p>
          <div style={{ width: '28px' }}/>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, padding: '28px 24px 60px' }}>
          {studentId ? children(activeSection, studentId) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
              <p style={{ fontFamily: 'var(--font-body)', color: '#9CA3AF' }}>Loading...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
