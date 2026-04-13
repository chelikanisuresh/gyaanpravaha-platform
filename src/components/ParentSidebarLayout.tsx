'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface Props { children: React.ReactNode; parentName?: string }

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/parent/dashboard',          emoji: '🏠' },
  { label: 'Overview',  href: '/parent/dashboard/overview', emoji: '📊' },
  { label: 'Progress',  href: '/parent/dashboard/progress', emoji: '📚' },
  { label: 'Writing',   href: '/parent/dashboard/writing',  emoji: '✍️' },
  { label: 'Invoices',  href: '/parent/dashboard/invoices', emoji: '🧾' },
  { label: 'Feedback',  href: '/parent/feedback',           emoji: '💬' },
]

const LOGO = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 5 C12 5 7 4 3 5.5 L3 17 C7 15.5 12 16.5 12 16.5 C12 16.5 17 15.5 21 17 L21 5.5 C17 4 12 5 12 5Z" fill="white" fillOpacity="0.9"/>
    <line x1="12" y1="5" x2="12" y2="16.5" stroke="#1B4332" strokeWidth="0.8" strokeOpacity="0.4"/>
    <line x1="5" y1="7.5" x2="10.5" y2="7" stroke="#1B4332" strokeWidth="0.6" strokeOpacity="0.35"/>
    <line x1="5" y1="9.5" x2="10.5" y2="9" stroke="#1B4332" strokeWidth="0.6" strokeOpacity="0.35"/>
    <line x1="13.5" y1="7" x2="19" y2="7.5" stroke="#1B4332" strokeWidth="0.6" strokeOpacity="0.35"/>
    <line x1="13.5" y1="9" x2="19" y2="9.5" stroke="#1B4332" strokeWidth="0.6" strokeOpacity="0.35"/>
    <ellipse cx="12" cy="21" rx="2.2" ry="3.2" fill="#74C69D" fillOpacity="0.95"/>
    <ellipse cx="8.5" cy="21.5" rx="1.8" ry="2.6" fill="#74C69D" fillOpacity="0.75" transform="rotate(-28 8.5 21.5)"/>
    <ellipse cx="15.5" cy="21.5" rx="1.8" ry="2.6" fill="#74C69D" fillOpacity="0.75" transform="rotate(28 15.5 21.5)"/>
    <path d="M3 23 Q7.5 21.5 12 23 Q16.5 24.5 21 23" stroke="#74C69D" strokeWidth="0.8" strokeOpacity="0.6" fill="none" strokeLinecap="round"/>
  </svg>
)

export default function ParentSidebarLayout({ children, parentName = 'Parent' }: Props) {
  const pathname = usePathname()
  const router   = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const initials = parentName.slice(0, 2).toUpperCase()

  const handleLogout = async () => {
    await createClient().auth.signOut()
    router.push('/')
  }

  const SidebarContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Logo */}
      <div style={{ padding: '20px 18px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg,rgba(255,255,255,0.15),rgba(255,255,255,0.05))', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.12)', flexShrink: 0 }}>
            {LOGO}
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '15px', color: 'white', lineHeight: 1 }}>Gyaanpravaha</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>ज्ञानप्रवाह</p>
          </div>
        </Link>
      </div>

      {/* Parent card */}
      <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '10px 12px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ width: '34px', height: '34px', minWidth: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,#52B788,#74C69D)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '13px', color: '#1B4332', flexShrink: 0 }}>
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white', lineHeight: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{parentName}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>Parent account</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
        {NAV_ITEMS.map(item => {
          const active = pathname === item.href || (item.href !== '/parent/dashboard' && pathname?.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '10px', marginBottom: '2px', textDecoration: 'none', background: active ? 'rgba(116,198,157,0.15)' : 'transparent', outline: active ? '1px solid rgba(116,198,157,0.2)' : '1px solid transparent', transition: 'all 0.15s' }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}>
              <span style={{ fontSize: '15px', width: '22px', textAlign: 'center' }}>{item.emoji}</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: active ? 700 : 500, fontSize: '13px', color: active ? 'white' : 'rgba(255,255,255,0.6)', flex: 1 }}>{item.label}</span>
              {active && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#74C69D' }}/>}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
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
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFF' }}>
      <style>{`
        @media(max-width:768px){ .gp-parent-sidebar{display:none!important} .gp-parent-mobile{display:flex!important} }
        @media(min-width:769px){ .gp-parent-mobile{display:none!important} }
      `}</style>

      {/* Sidebar */}
      <div className="gp-parent-sidebar" style={{ width: '232px', minWidth: '232px', background: 'linear-gradient(180deg,#0D2B1F 0%,#1B4332 100%)', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', zIndex: 50 }}>
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
            <div style={{ flex: 1, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setMobileOpen(false)}/>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Mobile bar */}
        <div className="gp-parent-mobile" style={{ background: 'linear-gradient(135deg,#0D2B1F,#1B4332)', padding: '12px 16px', alignItems: 'center', justifyContent: 'space-between', display: 'none', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={() => setMobileOpen(true)} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer', padding: '7px', borderRadius: '8px', display: 'flex' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2.5 4.5h13M2.5 9h13M2.5 13.5h13" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '26px', height: '26px', borderRadius: '7px', background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{LOGO}</div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: 'white' }}>Gyaanpravaha</p>
          </div>
          <div style={{ width: '32px' }}/>
        </div>
        <div style={{ flex: 1, padding: '28px 36px 60px' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
