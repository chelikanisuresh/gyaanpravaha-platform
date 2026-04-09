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
  { label: 'Password',     href: '/parent/password',     emoji: '🔑' },
  { label: 'Subscription', href: '/parent/subscription', emoji: '📅' },
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

  const NavLink = ({ href, label, emoji, indent = false }: { href: string; label: string; emoji: string; indent?: boolean }) => {
    const isActive = pathname === href
    return (
      <Link href={href} style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: indent ? '6px 10px' : '8px 12px',
        borderRadius: 'var(--radius-md)', marginBottom: '1px',
        textDecoration: 'none',
        background: isActive ? 'var(--brand-pale)' : 'transparent',
        color: isActive ? 'var(--brand-deep)' : indent ? 'var(--gray-500)' : 'var(--gray-700)',
        fontSize: indent ? '13px' : '14px',
        transition: 'background 0.12s, color 0.12s',
      }}
        onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'var(--gray-50)'; e.currentTarget.style.color = 'var(--gray-900)' } }}
        onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = indent ? 'var(--gray-500)' : 'var(--gray-700)' } }}
      >
        <span style={{ fontSize: indent ? '12px' : '14px' }}>{emoji}</span>
        <span style={{ fontFamily: 'var(--font-body)', fontWeight: isActive ? 600 : 400 }}>{label}</span>
        {isActive && <div style={{ marginLeft: 'auto', width: '5px', height: '5px', borderRadius: '50%', background: 'var(--brand)', flexShrink: 0 }}/>}
      </Link>
    )
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--white)' }}>
      <style>{`
        @media (max-width: 768px) {
          .p-sidebar { display: none !important; }
          .p-main { margin-left: 0 !important; }
        }
      `}</style>

      {/* ── Sidebar ── */}
      <aside className="p-sidebar" style={{
        width: '236px', flexShrink: 0,
        background: 'var(--white)',
        borderRight: '1px solid var(--border-subtle)',
        position: 'fixed', top: 0, left: 0, bottom: 0,
        display: 'flex', flexDirection: 'column',
        zIndex: 100,
      }}>

        {/* Logo */}
        <div style={{ padding: '18px 18px 14px', borderBottom: '1px solid var(--border-subtle)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '30px', height: '30px', background: 'var(--brand)', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M6 8h8M10 4v8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                <circle cx="10" cy="8" r="1.2" fill="#74C69D"/>
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: 'var(--gray-900)', lineHeight: 1 }}>Gyaanpravaha</p>
              <p style={{ fontFamily: 'var(--font-devanagari)', fontSize: '10px', color: 'var(--gray-400)', marginTop: '2px' }}>ज्ञानप्रवाह</p>
            </div>
          </Link>
        </div>

        {/* Parent info */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{ width: '32px', height: '32px', minWidth: '32px', borderRadius: 'var(--radius-pill)', background: 'var(--brand-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'var(--brand-deep)', flexShrink: 0 }}>
              {initial}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', color: 'var(--gray-900)', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{parentName}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gray-400)', marginTop: '2px' }}>Parent</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>

          {/* Dashboard */}
          <NavLink href="/parent/dashboard" label="Dashboard" emoji="🏠"/>

          {/* Sub-items */}
          <div style={{ marginLeft: '6px', paddingLeft: '10px', borderLeft: '1px solid var(--border-subtle)', marginBottom: '6px', marginTop: '2px' }}>
            {DASHBOARD_CHILDREN.map(item => <NavLink key={item.href} {...item} indent/>)}
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '6px 0 8px' }}/>

          {/* Other links */}
          {OTHER_LINKS.map(item => <NavLink key={item.href} {...item}/>)}
        </nav>

        {/* Logout */}
        <div style={{ padding: '10px', borderTop: '1px solid var(--border-subtle)' }}>
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 12px', borderRadius: 'var(--radius-md)', width: '100%',
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: 'var(--gray-400)', fontSize: '14px', fontFamily: 'var(--font-body)',
            transition: 'all 0.12s', textAlign: 'left',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-bg)'; e.currentTarget.style.color = 'var(--red)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gray-400)' }}
          >
            <span style={{ fontSize: '14px' }}>🚪</span>
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="p-main" style={{ flex: 1, marginLeft: '236px', minHeight: '100vh', background: 'var(--white)' }}>
        {children}
      </main>
    </div>
  )
}
