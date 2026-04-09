'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface ParentSidebarLayoutProps {
  children: React.ReactNode
  parentName?: string
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export default function ParentSidebarLayout({
  children,
  parentName = 'Parent',
  activeTab = 'overview',
  onTabChange,
}: ParentSidebarLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [dashboardOpen, setDashboardOpen] = useState(true)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const initial = parentName.charAt(0).toUpperCase()

  const dashboardTabs = [
    { key: 'overview', label: 'Overview', emoji: '📊', href: '/parent/overview' },
    { key: 'progress', label: 'Progress', emoji: '📚', href: '/parent/progress' },
    { key: 'writing',  label: 'Writing',  emoji: '✍️', href: '/parent/writing'  },
  ]

  const topLevelLinks = [
    { href: '/parent/password',     label: 'Password',     emoji: '🔑' },
    { href: '/parent/subscription', label: 'Subscription', emoji: '📅' },
    { href: '/parent/feedback',     label: 'Feedback',     emoji: '💬', badge: 'New' },
    { href: '/parent/profile',      label: 'Profile',      emoji: '👤' },
  ]

  const SidebarContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>

      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '34px', height: '34px', minWidth: '34px', background: '#74C69D', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M6 8h8M10 4v8" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="10" cy="8" r="1.2" fill="#1B4332"/>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: 'white', lineHeight: 1 }}>Gyaanpravaha</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.45)', lineHeight: 1, marginTop: '2px' }}>ज्ञानप्रवाह</p>
          </div>
        </Link>
      </div>

      {/* Parent info */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', minWidth: '36px', borderRadius: '50%',
            background: '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '15px', color: 'white',
            flexShrink: 0, overflow: 'hidden',
          }}>
            {initial}
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white', lineHeight: 1, marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {parentName}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.45)' }}>Parent account</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px' }}>

        {/* Dashboard — expandable */}
        <button
          onClick={() => setDashboardOpen(p => !p)}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
            padding: '10px 12px', borderRadius: '10px', marginBottom: '2px',
            background: pathname === '/parent/dashboard' ? 'rgba(116,198,157,0.15)' : 'transparent',
            border: '1px solid transparent', cursor: 'pointer', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
          onMouseLeave={e => { e.currentTarget.style.background = pathname === '/parent/dashboard' ? 'rgba(116,198,157,0.15)' : 'transparent' }}
        >
          <span style={{ fontSize: '15px' }}>🏠</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'rgba(255,255,255,0.85)', flex: 1, textAlign: 'left' }}>Dashboard</span>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', transition: 'transform 0.2s', display: 'inline-block', transform: dashboardOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
        </button>

        {/* Sub-tabs */}
        {dashboardOpen && (
          <div style={{ paddingLeft: '12px', marginBottom: '6px' }}>
            {dashboardTabs.map(({ key, label, emoji, href }) => {
              const isActive = pathname === href
              return (
                <button
                  key={key}
                  onClick={() => onTabChange?.(key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
                    padding: '8px 12px', borderRadius: '9px', marginBottom: '2px',
                    background: isActive ? 'rgba(116,198,157,0.2)' : 'transparent',
                    border: isActive ? '1px solid rgba(116,198,157,0.25)' : '1px solid transparent',
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                >
                  <span style={{ fontSize: '13px' }}>{emoji}</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: isActive ? 700 : 500, fontSize: '12px', color: isActive ? '#74C69D' : 'rgba(255,255,255,0.6)' }}>
                    {label}
                  </span>
                  {isActive && <div style={{ marginLeft: 'auto', width: '5px', height: '5px', borderRadius: '50%', background: '#74C69D' }}/>}
                </button>
              )
            })}
          </div>
        )}

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '6px 0 8px' }}/>

        {/* Top level links */}
        {topLevelLinks.map(({ href, label, emoji, badge }) => {
          const isActive = pathname === href
          return (
            <Link key={href} href={href} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '10px', marginBottom: '2px',
              textDecoration: 'none',
              background: isActive ? 'rgba(116,198,157,0.2)' : 'transparent',
              border: isActive ? '1px solid rgba(116,198,157,0.25)' : '1px solid transparent',
              transition: 'all 0.15s',
            }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{ fontSize: '15px' }}>{emoji}</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: isActive ? 700 : 600, fontSize: '13px', color: isActive ? '#74C69D' : 'rgba(255,255,255,0.75)' }}>
                {label}
              </span>
              {badge && <span style={{ marginLeft: 'auto', background: '#F59E0B', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '9px', padding: '2px 6px', borderRadius: '6px' }}>{badge}</span>}
              {isActive && !badge && <div style={{ marginLeft: 'auto', width: '5px', height: '5px', borderRadius: '50%', background: '#74C69D' }}/>}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: '10px 10px 20px', borderTop: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 12px', borderRadius: '10px', width: '100%',
            background: 'transparent', border: '1px solid transparent',
            cursor: 'pointer', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent' }}
        >
          <span style={{ fontSize: '15px' }}>🚪</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>Log out</span>
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAF9' }}>
      <style>{`
        @media (max-width: 768px) {
          .parent-sidebar { display: none !important; }
          .parent-main { margin-left: 0 !important; }
        }
        @media (min-width: 769px) {
          .parent-sidebar { display: flex !important; }
        }
      `}</style>

      <div className="parent-sidebar" style={{
        width: '230px', flexShrink: 0, background: '#1B4332',
        position: 'fixed', top: 0, left: 0, bottom: 0,
        flexDirection: 'column', zIndex: 100,
        boxShadow: '2px 0 12px rgba(0,0,0,0.08)',
      }}>
        <SidebarContent />
      </div>

      <div className="parent-main" style={{ flex: 1, marginLeft: '230px', minHeight: '100vh' }}>
        {children}
      </div>
    </div>
  )
}
