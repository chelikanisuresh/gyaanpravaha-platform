'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'

const LOGO = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 5 C12 5 7 4 3 5.5 L3 17 C7 15.5 12 16.5 12 16.5 C12 16.5 17 15.5 21 17 L21 5.5 C17 4 12 5 12 5Z" fill="white" fillOpacity="0.9"/>
    <line x1="12" y1="5" x2="12" y2="16.5" stroke="#1B4332" strokeWidth="0.8" strokeOpacity="0.4"/>
    <ellipse cx="12" cy="21" rx="2.2" ry="3.2" fill="#74C69D" fillOpacity="0.95"/>
    <ellipse cx="8.5" cy="21.5" rx="1.8" ry="2.6" fill="#74C69D" fillOpacity="0.75" transform="rotate(-28 8.5 21.5)"/>
    <ellipse cx="15.5" cy="21.5" rx="1.8" ry="2.6" fill="#74C69D" fillOpacity="0.75" transform="rotate(28 15.5 21.5)"/>
  </svg>
)

export default function AdminLoginPage() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleLogin = async () => {
    setError('')
    if (!email.trim() || !password.trim()) { setError('Please enter your email and password.'); return }
    setLoading(true)
    const supabase = createClient()
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (authError || !data.user) { setError('Invalid email or password.'); setLoading(false); return }
    const { data: profile } = await supabase.from('profiles').select('role, full_name').eq('id', data.user.id).maybeSingle()
    if (profile?.role !== 'admin') { await supabase.auth.signOut(); setError('This account does not have admin access.'); setLoading(false); return }
    router.push('/admin')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#0A0F1E 0%,#0F1E3A 50%,#0A1628 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden' }}>

      {/* Background grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '40px 40px', pointerEvents: 'none' }}/>

      {/* Glow */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(27,67,50,0.3) 0%, transparent 70%)', pointerEvents: 'none' }}/>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>

        {/* Logo — click to go home */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '36px', textDecoration: 'none' }}>
          <div style={{ width: '46px', height: '46px', background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(27,67,50,0.4)' }}>{LOGO}</div>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: 'white', lineHeight: 1 }}>Gyaanpravaha</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '1px' }}>ज्ञानप्रवाह</p>
          </div>
        </Link>

        {/* Card */}
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', padding: '40px 36px', backdropFilter: 'blur(20px)', boxShadow: '0 32px 80px rgba(0,0,0,0.4)' }}>

          {/* Shield badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(27,67,50,0.5)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', border: '1px solid rgba(116,198,157,0.2)' }}>🛡️</div>
            <div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color: 'white', lineHeight: 1 }}>Admin Portal</h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>Teacher & Admin Access Only</p>
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '7px' }}>Email address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
              placeholder="admin@gyaanpravaha.in"
              style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: `1.5px solid ${focusedField === 'email' ? '#74C69D' : 'rgba(255,255,255,0.12)'}`, background: 'rgba(255,255,255,0.06)', color: 'white', fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' }}/>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '7px' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField(null)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: `1.5px solid ${focusedField === 'password' ? '#74C69D' : 'rgba(255,255,255,0.12)'}`, background: 'rgba(255,255,255,0.06)', color: 'white', fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' }}/>
          </div>

          {/* Error */}
          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: '10px', padding: '12px 16px', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '16px', flexShrink: 0 }}>⚠️</span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#FCA5A5' }}>{error}</p>
            </motion.div>
          )}

          {/* Login button */}
          <motion.button onClick={handleLogin} disabled={loading}
            whileHover={!loading ? { scale: 1.02, boxShadow: '0 8px 24px rgba(27,67,50,0.5)' } : {}}
            whileTap={!loading ? { scale: 0.97 } : {}}
            style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: loading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg,#1B4332,#2D6A4F)', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
            {loading ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.2)', borderTopColor: 'white', borderRadius: '50%' }}/>
                Signing in...
              </>
            ) : '🔐 Sign in to Admin Portal'}
          </motion.button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }}/>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>or</p>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }}/>
          </div>

          <Link href="/login" style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
            Are you a student or parent?{' '}
            <span style={{ color: '#74C69D', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>Go to student login →</span>
          </Link>
        </div>

        {/* Footer */}
        <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.2)', marginTop: '24px' }}>
          © 2026 Gyaanpravaha · Restricted access
        </p>
      </motion.div>
    </div>
  )
}
