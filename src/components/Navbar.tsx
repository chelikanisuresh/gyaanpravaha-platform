import Link from 'next/link'

interface NavbarProps {
  rightContent?: React.ReactNode
  showAuthButtons?: boolean
}

export default function Navbar({ rightContent, showAuthButtons = true }: NavbarProps) {
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 5%', height: '64px',
      background: 'white', borderBottom: '1px solid #E5E7EB',
      position: 'sticky', top: 0, zIndex: 100,
      backdropFilter: 'blur(10px)',
    }}>
      {/* Logo — consistent on every page */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <div style={{
          width: '36px', height: '36px',
          background: '#2D6A4F',
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 8h8M10 4v8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="10" cy="8" r="1.2" fill="#74C69D"/>
          </svg>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '17px', color: '#1B4332', lineHeight: 1 }}>
            Gyaanpravaha
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#40916C', lineHeight: 1, marginTop: '2px' }}>
            ज्ञानप्रवाह
          </p>
        </div>
      </Link>

      {/* Right content — passed in per page */}
      {rightContent ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {rightContent}
        </div>
      ) : showAuthButtons ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link href="/gk" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
            Learn for free
          </Link>
          <Link href="/login" className="btn-outline" style={{ padding: '8px 16px', fontSize: '13px' }}>
            Log in
          </Link>
          <Link href="/register" className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
            Register
          </Link>
        </div>
      ) : null}
    </nav>
  )
}
