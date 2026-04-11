'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface ParentSidebarLayoutProps {
  children: React.ReactNode
  parentName?: string
}

const DASHBOARD_CHILDREN = [
  { label: 'Overview', href: '/parent/dashboard/overview', emoji: '📊' },
  { label: 'Progress', href: '/parent/dashboard/progress', emoji: '📚' },
  { label: 'Writing',  href: '/parent/dashboard/writing',  emoji: '✍️' },
]

const OTHER_LINKS = [
  { label: 'Invoices',     href: '/parent/dashboard/invoices', emoji: '🧾' },
  { label: 'Password',     href: '/parent/password',     emoji: '🔑' },
  { label: 'Subscription', href: '/parent/subscription', emoji: '📅' },
  { label: 'Help',         href: '/parent/help',         emoji: '🎫' },
  { label: 'Feedback',     href: '/parent/feedback',     emoji: '💬' },
  { label: 'Profile',      href: '/parent/profile',      emoji: '👤' },
]

export default function ParentSidebarLayout({ children, parentName = 'Parent' }: ParentSidebarLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const initial = parentName.charAt(0).toUpperCase()

  const SidebarContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '34px', height: '34px', background: '#74C69D', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
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

      {/* Parent info */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '50%', background: '#74C69D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '15px', color: '#1B4332', flexShrink: 0 }}>
            {initial}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white', lineHeight: 1, marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{parentName}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Parent account</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>

        {/* Dashboard link */}
        <Link href="/parent/dashboard" style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '10px 12px', borderRadius: '10px', marginBottom: '2px',
          textDecoration: 'none',
          background: pathname === '/parent/dashboard' ? 'rgba(116,198,157,0.2)' : 'transparent',
          border: pathname === '/parent/dashboard' ? '1px solid rgba(116,198,157,0.3)' : '1px solid transparent',
          transition: 'all 0.15s',
        }}
          onMouseEnter={e => { if (pathname !== '/parent/dashboard') e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
          onMouseLeave={e => { if (pathname !== '/parent/dashboard') e.currentTarget.style.background = 'transparent' }}
        >
          <span style={{ fontSize: '15px' }}>🏠</span>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: pathname === '/parent/dashboard' ? 700 : 500, fontSize: '14px', color: pathname === '/parent/dashboard' ? '#74C69D' : 'rgba(255,255,255,0.8)' }}>Dashboard</span>
          {pathname === '/parent/dashboard' && <div style={{ marginLeft: 'auto', width: '5px', height: '5px', borderRadius: '50%', background: '#74C69D' }}/>}
        </Link>

        {/* Sub items — always visible */}
        <div style={{ marginLeft: '8px', paddingLeft: '12px', borderLeft: '1px solid rgba(255,255,255,0.1)', marginBottom: '6px', marginTop: '2px' }}>
          {DASHBOARD_CHILDREN.map(({ label, href, emoji }) => {
            const isActive = pathname === href
            return (
              <Link key={href} href={href} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '7px 10px', borderRadius: '9px', marginBottom: '2px',
                textDecoration: 'none',
                background: isActive ? 'rgba(116,198,157,0.2)' : 'transparent',
                border: isActive ? '1px solid rgba(116,198,157,0.25)' : '1px solid transparent',
                transition: 'all 0.15s',
              }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
              >
                <span style={{ fontSize: '13px' }}>{emoji}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: isActive ? 700 : 400, fontSize: '13px', color: isActive ? '#74C69D' : 'rgba(255,255,255,0.6)' }}>{label}</span>
                {isActive && <div style={{ marginLeft: 'auto', width: '4px', height: '4px', borderRadius: '50%', background: '#74C69D' }}/>}
              </Link>
            )
          })}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '6px 0 8px' }}/>

        {/* Other links */}
        {OTHER_LINKS.map(({ label, href, emoji }) => {
          const isActive = pathname === href
          return (
            <Link key={href} href={href} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '10px', marginBottom: '2px',
              textDecoration: 'none',
              background: isActive ? 'rgba(116,198,157,0.2)' : 'transparent',
              border: isActive ? '1px solid rgba(116,198,157,0.3)' : '1px solid transparent',
              transition: 'all 0.15s',
            }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{ fontSize: '15px' }}>{emoji}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: isActive ? 700 : 500, fontSize: '14px', color: isActive ? '#74C69D' : 'rgba(255,255,255,0.75)' }}>{label}</span>
              {isActive && <div style={{ marginLeft: 'auto', width: '5px', height: '5px', borderRadius: '50%', background: '#74C69D' }}/>}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: '10px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <button onClick={handleLogout} style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '10px 12px', borderRadius: '10px', width: '100%',
          background: 'transparent', border: '1px solid transparent',
          cursor: 'pointer', transition: 'all 0.15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent' }}
        >
          <span style={{ fontSize: '15px' }}>🚪</span>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px', color: 'rgba(255,255,255,0.45)' }}>Log out</span>
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAF9' }}>
      <style>{`
        @media (max-width: 768px) {
          .p-sidebar { display: none !important; }
          .p-main { margin-left: 0 !important; }
        }
      `}</style>

      <aside className="p-sidebar" style={{
        width: '230px', flexShrink: 0,
        background: '#1B4332',
        position: 'fixed', top: 0, left: 0, bottom: 0,
        display: 'flex', flexDirection: 'column',
        zIndex: 100,
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
      }}>
        <SidebarContent />
      </aside>

      <main className="p-main" style={{ flex: 1, marginLeft: '230px', minHeight: '100vh', background: '#F8FAF9' }}>
        {children}
      </main>
    </div>
  )
}
