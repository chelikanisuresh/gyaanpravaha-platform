'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const NAV_ITEMS = [
  { href: '/student/dashboard', label: 'Dashboard', emoji: '🏠' },
  { href: '/student/subjects',  label: 'Subjects',  emoji: '📚' },
  { href: '/student/profile',   label: 'Profile',   emoji: '👤' },
]

interface SidebarLayoutProps {
  children: React.ReactNode
  studentName?: string
}

export default function SidebarLayout({ children, studentName = 'Student' }: SidebarLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const SidebarContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '36px', height: '36px', background: '#74C69D', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6 8h8M10 4v8" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="10" cy="8" r="1.2" fill="#1B4332"/>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '15px', color: 'white', lineHeight: 1 }}>Gyaanpravaha</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.5)', lineHeight: 1, marginTop: '2px' }}>ज्ञानप्रवाह</p>
          </div>
        </Link>
      </div>

      {/* Student info */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#74C69D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '15px', color: '#1B4332', flexShrink: 0 }}>
            {studentName[0]}
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: 'white', lineHeight: 1, marginBottom: '2px' }}>{studentName}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Student</p>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '12px 12px' }}>
        {NAV_ITEMS.map(({ href, label, emoji }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 14px', borderRadius: '12px', marginBottom: '4px',
                textDecoration: 'none',
                background: isActive ? 'rgba(116,198,157,0.2)' : 'transparent',
                border: isActive ? '1px solid rgba(116,198,157,0.3)' : '1px solid transparent',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{ fontSize: '18px', flexShrink: 0 }}>{emoji}</span>
              <span style={{
                fontFamily: 'var(--font-heading)', fontWeight: isActive ? 700 : 600,
                fontSize: '14px', color: isActive ? '#74C69D' : 'rgba(255,255,255,0.75)',
              }}>
                {label}
              </span>
              {isActive && <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#74C69D' }}/>}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: '12px 12px 20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px 14px', borderRadius: '12px', width: '100%',
            background: 'transparent', border: '1px solid transparent',
            cursor: 'pointer', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent' }}
        >
          <span style={{ fontSize: '18px' }}>🚪</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>Log out</span>
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAF9' }}>
      <style>{`
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
          .mobile-bottom-nav { display: flex !important; }
          .main-content { margin-left: 0 !important; padding-bottom: 72px !important; }
        }
        @media (min-width: 769px) {
          .sidebar-desktop { display: flex !important; }
          .mobile-bottom-nav { display: none !important; }
        }
      `}</style>

      {/* Desktop sidebar */}
      <div className="sidebar-desktop" style={{
        width: '220px', flexShrink: 0,
        background: '#1B4332',
        position: 'fixed', top: 0, left: 0, bottom: 0,
        flexDirection: 'column',
        zIndex: 100,
        boxShadow: '2px 0 12px rgba(0,0,0,0.08)',
      }}>
        <SidebarContent />
      </div>

      {/* Main content */}
      <div className="main-content" style={{ flex: 1, marginLeft: '220px', minHeight: '100vh' }}>
        {children}
      </div>

      {/* Mobile bottom nav */}
      <div className="mobile-bottom-nav" style={{
        display: 'none',
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: '#1B4332', borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '8px 0 12px', zIndex: 100,
        justifyContent: 'space-around', alignItems: 'center',
      }}>
        {NAV_ITEMS.map(({ href, label, emoji }) => {
          const isActive = pathname === href
          return (
            <Link key={href} href={href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', textDecoration: 'none', padding: '4px 16px' }}>
              <span style={{ fontSize: '22px' }}>{emoji}</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', color: isActive ? '#74C69D' : 'rgba(255,255,255,0.5)' }}>{label}</span>
            </Link>
          )
        })}
        <button onClick={handleLogout} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 16px' }}>
          <span style={{ fontSize: '22px' }}>🚪</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>Log out</span>
        </button>
      </div>
    </div>
  )
}
