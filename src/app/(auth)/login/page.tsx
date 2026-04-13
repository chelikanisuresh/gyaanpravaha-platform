'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'

const LOGO = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 5 C12 5 7 4 3 5.5 L3 17 C7 15.5 12 16.5 12 16.5 C12 16.5 17 15.5 21 17 L21 5.5 C17 4 12 5 12 5Z" fill="white" fillOpacity="0.9"/>
    <line x1="12" y1="5" x2="12" y2="16.5" stroke="#1B4332" strokeWidth="0.8" strokeOpacity="0.4"/>
    <line x1="5" y1="7.5" x2="10.5" y2="7" stroke="#1B4332" strokeWidth="0.6" strokeOpacity="0.35"/>
    <line x1="5" y1="9.5" x2="10.5" y2="9" stroke="#1B4332" strokeWidth="0.6" strokeOpacity="0.35"/>
    <line x1="5" y1="11.5" x2="10.5" y2="11" stroke="#1B4332" strokeWidth="0.6" strokeOpacity="0.35"/>
    <line x1="13.5" y1="7" x2="19" y2="7.5" stroke="#1B4332" strokeWidth="0.6" strokeOpacity="0.35"/>
    <line x1="13.5" y1="9" x2="19" y2="9.5" stroke="#1B4332" strokeWidth="0.6" strokeOpacity="0.35"/>
    <line x1="13.5" y1="11" x2="19" y2="11.5" stroke="#1B4332" strokeWidth="0.6" strokeOpacity="0.35"/>
    <ellipse cx="12" cy="21" rx="2.2" ry="3.2" fill="#74C69D" fillOpacity="0.95"/>
    <ellipse cx="8.5" cy="21.5" rx="1.8" ry="2.6" fill="#74C69D" fillOpacity="0.75" transform="rotate(-28 8.5 21.5)"/>
    <ellipse cx="15.5" cy="21.5" rx="1.8" ry="2.6" fill="#74C69D" fillOpacity="0.75" transform="rotate(28 15.5 21.5)"/>
    <ellipse cx="5.5" cy="22" rx="1.4" ry="2" fill="#74C69D" fillOpacity="0.5" transform="rotate(-50 5.5 22)"/>
    <ellipse cx="18.5" cy="22" rx="1.4" ry="2" fill="#74C69D" fillOpacity="0.5" transform="rotate(50 18.5 22)"/>
    <path d="M3 23 Q7.5 21.5 12 23 Q16.5 24.5 21 23" stroke="#74C69D" strokeWidth="0.8" strokeOpacity="0.6" fill="none" strokeLinecap="round"/>
  </svg>
)

function InputField({ label, type, value, onChange, placeholder, hint }: {
  label: string; type: string; value: string; onChange: (v: string) => void; placeholder: string; hint?: string
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: '18px' }}>
      <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#374151', marginBottom: '7px' }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: `1.5px solid ${focused ? '#2D6A4F' : '#E5E7EB'}`, fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1F2937', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s', background: 'white' }}/>
      {hint && <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginTop: '5px' }}>{hint}</p>}
    </div>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  const handleLogin = async () => {
    setError('')
    if (!email.trim() || !password.trim()) { setError('Please enter your email and password.'); return }
    setLoading(true)
    const supabase = createClient()
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (authError || !data.user) { setError('Invalid email or password. Please try again.'); setLoading(false); return }
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).maybeSingle()
    if (profile?.role === 'parent')  router.push('/parent/dashboard')
    else if (profile?.role === 'admin') router.push('/admin')
    else router.push('/student/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      <style>{`@media(max-width:768px){.login-left{display:none!important}}`}</style>

      {/* ── Left panel ── */}
      <div className="login-left" style={{ width: '45%', background: 'linear-gradient(160deg,#0D2B1F 0%,#1B4332 60%,#2D6A4F 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '48px', position: 'relative', overflow: 'hidden' }}>
        {/* Background circles */}
        {[300, 500, 700].map((size, i) => (
          <motion.div key={i} animate={{ rotate: 360 }} transition={{ duration: 30 + i * 10, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', width: `${size}px`, height: `${size}px`, borderRadius: '50%', border: '1px dashed rgba(116,198,157,0.1)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}/>
        ))}

        {/* Logo */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg,rgba(255,255,255,0.15),rgba(255,255,255,0.05))', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.15)' }}>
              {LOGO}
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: 'white', lineHeight: 1 }}>Gyaanpravaha</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>ज्ञानप्रवाह</p>
            </div>
          </Link>
        </div>

        {/* Centre content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '36px', color: 'white', lineHeight: 1.2, marginBottom: '16px' }}>
              Welcome back.<br/>
              <span style={{ color: '#74C69D' }}>Keep learning.</span>
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, maxWidth: '320px' }}>
              Your chapters, quiz scores and progress are waiting for you. Pick up right where you left off.
            </p>
          </motion.div>

          {/* Feature pills */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '36px' }}>
            {[
              { icon: '📚', text: '8 subjects · Maharashtra State Board' },
              { icon: '🎯', text: 'Quiz after every chapter' },
              { icon: '👨‍👩‍👦', text: 'Parents track progress in real time' },
            ].map(item => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px' }}>
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>{item.text}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>© 2026 Gyaanpravaha · gyaanpravaha.in</p>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', background: '#F8FAFF' }}>
        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: '420px' }}>

          {/* Mobile logo */}
          <Link href="/" style={{ display: 'none', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '32px' }} className="mobile-logo">
            <div style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{LOGO}</div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: '#1B4332' }}>Gyaanpravaha</p>
          </Link>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: '#1B4332', marginBottom: '6px' }}>Log in</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#64748B', marginBottom: '32px' }}>
            Welcome back! Enter your credentials to continue.
          </p>

          <InputField label="Email address" type="email" value={email} onChange={setEmail} placeholder="you@example.com"/>
          <InputField label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••"/>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '10px', padding: '12px 16px', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '16px', flexShrink: 0 }}>⚠️</span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#DC2626' }}>{error}</p>
            </motion.div>
          )}

          <motion.button onClick={handleLogin} disabled={loading}
            whileHover={!loading ? { scale: 1.02, boxShadow: '0 8px 24px rgba(27,67,50,0.25)' } : {}}
            whileTap={!loading ? { scale: 0.97 } : {}}
            style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: loading ? '#9CA3AF' : 'linear-gradient(135deg,#1B4332,#2D6A4F)', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', marginBottom: '20px' }}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }}/>
                Signing in...
              </span>
            ) : 'Log in →'}
          </motion.button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }}/>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#D1D5DB' }}>or</p>
            <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }}/>
          </div>

          <div style={{ background: 'white', borderRadius: '14px', border: '1.5px solid #E5E7EB', padding: '18px 20px', marginBottom: '24px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#64748B', lineHeight: 1.7 }}>
              Don't have an account?{' '}
              <Link href="/register" style={{ color: '#1B4332', fontFamily: 'var(--font-heading)', fontWeight: 700, textDecoration: 'none' }}>Register here</Link>
              {' '}— takes less than 5 minutes.
            </p>
          </div>

          <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8' }}>
            School admin?{' '}
            <Link href="/admin/login" style={{ color: '#64748B', fontFamily: 'var(--font-heading)', fontWeight: 600, textDecoration: 'none' }}>Admin portal →</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
