'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'

const SUBJECTS = [
  { id:'english',  label:'English',       emoji:'📖', color:'#4338CA' },
  { id:'maths',    label:'Mathematics',   emoji:'📐', color:'#1E3A8A' },
  { id:'science',  label:'Science',       emoji:'🔬', color:'#0F766E' },
  { id:'history',  label:'History',       emoji:'🏛️', color:'#78350F' },
  { id:'geo',      label:'Geography',     emoji:'🌍', color:'#075985' },
  { id:'sanskrit', label:'Sanskrit',      emoji:'🕉️', color:'#713F12' },
  { id:'ict',      label:'ICT',           emoji:'💻', color:'#4C1D95' },
  { id:'marathi',  label:'मराठी',         emoji:'📝', color:'#701A75' },
]

type ActiveSection = 'dashboard' | 'english' | 'maths' | 'science' | 'history' | 'geo' | 'sanskrit' | 'ict' | 'marathi' | 'profile'

interface Props { children: (activeSection: ActiveSection, studentId: string) => React.ReactNode }

export default function StudentSidebarLayout({ children }: Props) {
  const router = useRouter()
  const [studentName,   setStudentName]   = useState('Student')
  const [studentEmail,  setStudentEmail]  = useState('')
  const [studentId,     setStudentId]     = useState('')
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard')
  const [subjectsOpen,  setSubjectsOpen]  = useState(false)
  const [mobileOpen,    setMobileOpen]    = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const section = params.get('section')
    if (section && ['english','maths','science','history','geo','sanskrit','ict','marathi','profile'].includes(section)) {
      setActiveSection(section as ActiveSection)
      setSubjectsOpen(true)
    }
  }, [])

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      setActiveSection(e.detail as ActiveSection)
      setSubjectsOpen(true)
      setMobileOpen(false)
    }
    window.addEventListener('gp-navigate', handler as EventListener)
    return () => window.removeEventListener('gp-navigate', handler as EventListener)
  }, [])

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setStudentId(user.id)
      const { data: p } = await supabase.from('profiles').select('full_name, email').eq('id', user.id).maybeSingle()
      if (p?.full_name) setStudentName(p.full_name.split(' ')[0])
      if (p?.email) setStudentEmail(p.email)
    }
    load()
  }, [router])

  const handleLogout = async () => {
    await createClient().auth.signOut()
    router.push('/')
  }

  const isSubjectActive = SUBJECTS.some(s => activeSection === s.id)
  const initials = studentName.slice(0, 2).toUpperCase()

  const SidebarContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* Logo */}
      <div style={{ padding: '20px 18px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <button onClick={() => router.push('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: '100%' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg,#52B788,#74C69D)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(82,183,136,0.3)' }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M10 4v12" stroke="#1B4332" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: 'white', lineHeight: 1 }}>Gyaanpravaha</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: 'rgba(255,255,255,0.35)', marginTop: '2px', letterSpacing: '0.03em' }}>ज्ञानप्रवाह</p>
          </div>
        </button>
      </div>

      {/* Student card */}
      <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: 'rgba(255,255,255,0.06)', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.15s' }}
          onClick={() => { setActiveSection('profile'); setMobileOpen(false) }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}>
          <div style={{ width: '34px', height: '34px', minWidth: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,#52B788,#74C69D)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '13px', color: '#1B4332', flexShrink: 0, boxShadow: '0 2px 8px rgba(82,183,136,0.25)' }}>
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white', lineHeight: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{studentName}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Student</p>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
            <path d="M5 4l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto', scrollbarWidth: 'none' }}>

        {/* Dashboard */}
        <NavButton
          icon="🏠"
          label="Dashboard"
          active={activeSection === 'dashboard'}
          onClick={() => { setActiveSection('dashboard'); setMobileOpen(false) }}
        />

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '8px 6px' }}/>

        {/* Subjects toggle */}
        <button
          onClick={() => setSubjectsOpen(o => !o)}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '10px', width: '100%', border: 'none', background: isSubjectActive ? 'rgba(116,198,157,0.12)' : 'transparent', cursor: 'pointer', marginBottom: '2px', justifyContent: 'space-between', transition: 'all 0.15s' }}
          onMouseEnter={e => { if (!isSubjectActive) e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
          onMouseLeave={e => { if (!isSubjectActive) e.currentTarget.style.background = 'transparent' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '15px', width: '22px', textAlign: 'center' }}>📚</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: isSubjectActive ? 700 : 500, fontSize: '13px', color: isSubjectActive ? 'white' : 'rgba(255,255,255,0.6)' }}>Subjects</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ background: 'rgba(116,198,157,0.2)', color: '#74C69D', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', padding: '1px 6px', borderRadius: '10px' }}>8</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
              style={{ transform: subjectsOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', flexShrink: 0, opacity: 0.5 }}>
              <path d="M2 4l4 4 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        <AnimatePresence>
          {subjectsOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden', marginLeft: '8px', marginBottom: '4px' }}>
              {SUBJECTS.map((subject, i) => {
                const isActive = activeSection === subject.id
                return (
                  <motion.button key={subject.id}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                    onClick={() => { setActiveSection(subject.id as ActiveSection); setMobileOpen(false) }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '10px', width: '100%', border: 'none', background: isActive ? `${subject.color}25` : 'transparent', cursor: 'pointer', marginBottom: '1px', textAlign: 'left', transition: 'all 0.15s', position: 'relative' }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}>
                    {isActive && <div style={{ position: 'absolute', left: 0, top: '4px', bottom: '4px', width: '3px', background: subject.color, borderRadius: '0 2px 2px 0' }}/>}
                    <span style={{ fontSize: '13px', width: '20px', textAlign: 'center' }}>{subject.emoji}</span>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: isActive ? 700 : 500, fontSize: '12px', color: isActive ? 'white' : 'rgba(255,255,255,0.55)', flex: 1 }}>{subject.label}</span>
                    {isActive && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: subject.color, flexShrink: 0 }}/>}
                  </motion.button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '8px 6px' }}/>

        <NavButton
          icon="👤"
          label="Profile"
          active={activeSection === 'profile'}
          onClick={() => { setActiveSection('profile'); setMobileOpen(false) }}
        />
      </nav>

      {/* Bottom — logout */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <button onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', transition: 'all 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}>
          <span style={{ fontSize: '14px', width: '22px', textAlign: 'center' }}>🚪</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>Logout</span>
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F0FDF4' }}>
      <style>{`
        @media(max-width:768px){ .gp-sidebar{display:none !important} .gp-sidebar.open{display:flex !important} .gp-mobile-bar{display:flex !important} }
        @media(min-width:769px){ .gp-mobile-bar{display:none !important} }
        nav::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Desktop sidebar */}
      <div className="gp-sidebar" style={{ width: '232px', minWidth: '232px', background: 'linear-gradient(180deg,#0D2B1F 0%,#1B4332 100%)', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', zIndex: 50 }}>
        <SidebarContent/>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
            <motion.div initial={{ x: -232 }} animate={{ x: 0 }} exit={{ x: -232 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ width: '232px', background: 'linear-gradient(180deg,#0D2B1F 0%,#1B4332 100%)', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <SidebarContent/>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ flex: 1, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setMobileOpen(false)}/>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>

        {/* Mobile top bar */}
        <div className="gp-mobile-bar" style={{ background: 'linear-gradient(135deg,#0D2B1F,#1B4332)', padding: '12px 16px', alignItems: 'center', justifyContent: 'space-between', display: 'none', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={() => setMobileOpen(true)} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer', padding: '7px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2.5 4.5h13M2.5 9h13M2.5 13.5h13" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'linear-gradient(135deg,#52B788,#74C69D)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="10" height="10" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M10 4v12" stroke="#1B4332" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: 'white' }}>Gyaanpravaha</p>
          </div>
          <div style={{ width: '32px' }}/>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, padding: '28px 36px 60px' }}>
          {studentId ? children(activeSection, studentId) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #D8F3DC', borderTopColor: '#2D6A4F' }}/>
                <p style={{ fontFamily: 'var(--font-body)', color: '#9CA3AF', fontSize: '14px' }}>Loading...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function NavButton({ icon, label, active, onClick }: { icon: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '10px', width: '100%', border: 'none', background: active ? 'rgba(116,198,157,0.15)' : 'transparent', cursor: 'pointer', marginBottom: '2px', textAlign: 'left', transition: 'all 0.15s', outline: active ? '1px solid rgba(116,198,157,0.2)' : '1px solid transparent' }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}>
      <span style={{ fontSize: '15px', width: '22px', textAlign: 'center' }}>{icon}</span>
      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: active ? 700 : 500, fontSize: '13px', color: active ? 'white' : 'rgba(255,255,255,0.6)' }}>{label}</span>
      {active && <motion.div layoutId="nav-indicator" style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#74C69D' }}/>}
    </button>
  )
}
