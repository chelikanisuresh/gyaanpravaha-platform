'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const NAV_ITEMS = [
  { label: 'Dashboard',     emoji: '🏠', tab: 'overview',      href: null },
  { label: 'Students',      emoji: '🎓', tab: 'students',      href: null },
  { label: 'Exam Mode',     emoji: '📋', tab: 'exam',          href: null },
  { label: 'Subscriptions', emoji: '💳', tab: 'subscriptions', href: null },
  { label: 'Invoices',      emoji: '🧾', tab: 'invoices',      href: null },
  { label: 'Questions',     emoji: '📝', tab: 'questions',     href: null },
  { label: 'Writing',       emoji: '✍️',  tab: 'writing',       href: null },
]

const LOGO = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 5 C12 5 7 4 3 5.5 L3 17 C7 15.5 12 16.5 12 16.5 C12 16.5 17 15.5 21 17 L21 5.5 C17 4 12 5 12 5Z" fill="white" fillOpacity="0.9"/>
    <ellipse cx="12" cy="21" rx="2.2" ry="3.2" fill="#74C69D" fillOpacity="0.95"/>
    <ellipse cx="8.5" cy="21.5" rx="1.8" ry="2.6" fill="#74C69D" fillOpacity="0.75" transform="rotate(-28 8.5 21.5)"/>
    <ellipse cx="15.5" cy="21.5" rx="1.8" ry="2.6" fill="#74C69D" fillOpacity="0.75" transform="rotate(28 15.5 21.5)"/>
  </svg>
)

interface SidebarProps {
  pathname: string | null
  activeTab: string
  setActiveTab: (t: string) => void
  setMobileOpen: (v: boolean) => void
  adminName: string
  initials: string
  onLogout: () => void
}

// Defined OUTSIDE — stable reference, no remount, no stale closures
function AdminSidebar({ pathname, activeTab, setActiveTab, setMobileOpen, adminName, initials, onLogout }: SidebarProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Logo */}
      <div style={{ padding: '20px 18px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg,rgba(255,255,255,0.15),rgba(255,255,255,0.05))', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.12)', flexShrink: 0 }}>
            {LOGO}
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '15px', color: 'white', lineHeight: 1 }}>Gyaanpravaha</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Admin card */}
      <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '10px 12px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ width: '34px', height: '34px', minWidth: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,#4338CA,#6366F1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '13px', color: 'white' }}>
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white', lineHeight: 1 }}>{adminName}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>Administrator</p>
          </div>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}/>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
        {NAV_ITEMS.map(item => {
          const isActive = pathname === '/admin' && activeTab === item.tab
          const style: React.CSSProperties = {
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '9px 12px', borderRadius: '10px', marginBottom: '2px',
            background: isActive ? 'rgba(99,102,241,0.2)' : 'transparent',
            outline: isActive ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
            transition: 'all 0.15s', width: '100%', border: 'none',
            cursor: 'pointer', textAlign: 'left', textDecoration: 'none', color: 'inherit',
          }
          const inner = (
            <>
              <span style={{ fontSize: '15px', width: '22px', textAlign: 'center' }}>{item.emoji}</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: isActive ? 700 : 500, fontSize: '13px', color: isActive ? 'white' : 'rgba(255,255,255,0.6)', flex: 1 }}>{item.label}</span>
              {isActive && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#818CF8', flexShrink: 0 }}/>}
            </>
          )
          return (
            <button key={item.label} style={style}
              onClick={() => { setActiveTab(item.tab!); setMobileOpen(false) }}>
              {inner}
            </button>
          )
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <button onClick={onLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}>
          <span style={{ fontSize: '14px', width: '22px', textAlign: 'center' }}>🚪</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>Sign out</span>
        </button>
      </div>
    </div>
  )
}

interface Props {
  children: ((activeTab: string, setActiveTab: (t: string) => void) => React.ReactNode) | React.ReactNode
  adminName?: string
}

export default function AdminLayout({ children, adminName = 'Admin' }: Props) {
  const pathname  = usePathname()
  const router    = useRouter()
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [activeTab,   setActiveTab]   = useState('overview')
  const initials = (adminName || 'A').slice(0, 2).toUpperCase()

  const handleLogout = async () => {
    await createClient().auth.signOut()
    router.push('/admin/login')
  }

  const sidebarProps: SidebarProps = {
    pathname, activeTab, setActiveTab, setMobileOpen,
    adminName, initials, onLogout: handleLogout,
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFF' }}>
      <style>{`
        @media(max-width:768px){ .gp-admin-sidebar{display:none!important} .gp-admin-mobile{display:flex!important} }
        @media(min-width:769px){ .gp-admin-mobile{display:none!important} }
      `}</style>

      <div className="gp-admin-sidebar" style={{ width: '232px', minWidth: '232px', background: 'linear-gradient(180deg,#1E1B4B 0%,#312E81 100%)', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', zIndex: 50 }}>
        <AdminSidebar {...sidebarProps}/>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
            <motion.div initial={{ x: -232 }} animate={{ x: 0 }} exit={{ x: -232 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ width: '232px', background: 'linear-gradient(180deg,#1E1B4B 0%,#312E81 100%)', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <AdminSidebar {...sidebarProps}/>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ flex: 1, background: 'rgba(0,0,0,0.5)' }} onClick={() => setMobileOpen(false)}/>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="gp-admin-mobile" style={{ background: 'linear-gradient(135deg,#1E1B4B,#312E81)', padding: '12px 16px', alignItems: 'center', justifyContent: 'space-between', display: 'none', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={() => setMobileOpen(true)} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer', padding: '7px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2.5 4.5h13M2.5 9h13M2.5 13.5h13" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: 'white' }}>Gyaanpravaha Admin</p>
          <div style={{ width: '32px' }}/>
        </div>
        <div style={{ padding: '28px 36px 60px' }}>
          {typeof children === 'function' ? children(activeTab, setActiveTab) : children}
        </div>
      </div>
    </div>
  )
}
