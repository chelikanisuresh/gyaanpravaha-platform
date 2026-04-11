'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  const handleLogin = async () => {
    setError('')
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.')
      return
    }
    setLoading(true)
    const supabase = createClient()

    // Sign in
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (authError || !data.user) {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
      return
    }

    // Check role = admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, full_name')
      .eq('id', data.user.id)
      .maybeSingle()

    if (profile?.role !== 'admin') {
      await supabase.auth.signOut()
      setError('This account does not have admin access.')
      setLoading(false)
      return
    }

    router.push('/admin')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin()
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #0F2027 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>
      {/* Card */}
      <div style={{
        background: 'white', borderRadius: '24px',
        padding: '48px 40px', width: '100%', maxWidth: '420px',
        boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
      }}>

        {/* Logo mark */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', fontSize: '26px',
          }}>
            🛡️
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 900,
            fontSize: '24px', color: '#1B4332', marginBottom: '4px',
          }}>
            Admin Portal
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9CA3AF',
          }}>
            Gyaanpravaha — Teacher & Admin Access
          </p>
        </div>

        {/* Email */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block', fontFamily: 'var(--font-heading)',
            fontWeight: 700, fontSize: '13px', color: '#374151', marginBottom: '6px',
          }}>
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="admin@gyaanpravaha.in"
            style={{
              width: '100%', padding: '12px 16px',
              borderRadius: '12px', border: '1.5px solid #E5E7EB',
              fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1B4332',
              outline: 'none', boxSizing: 'border-box',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => e.target.style.borderColor = '#2D6A4F'}
            onBlur={e => e.target.style.borderColor = '#E5E7EB'}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block', fontFamily: 'var(--font-heading)',
            fontWeight: 700, fontSize: '13px', color: '#374151', marginBottom: '6px',
          }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="••••••••"
            style={{
              width: '100%', padding: '12px 16px',
              borderRadius: '12px', border: '1.5px solid #E5E7EB',
              fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1B4332',
              outline: 'none', boxSizing: 'border-box',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => e.target.style.borderColor = '#2D6A4F'}
            onBlur={e => e.target.style.borderColor = '#E5E7EB'}
          />
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#FEF2F2', border: '1px solid #FCA5A5',
            borderRadius: '10px', padding: '12px 16px', marginBottom: '20px',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span style={{ fontSize: '16px', flexShrink: 0 }}>⚠️</span>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#DC2626' }}>
              {error}
            </p>
          </div>
        )}

        {/* Login button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%', padding: '14px',
            borderRadius: '12px', border: 'none',
            background: loading ? '#9CA3AF' : 'linear-gradient(135deg, #1B4332, #2D6A4F)',
            color: 'white', fontFamily: 'var(--font-heading)',
            fontWeight: 700, fontSize: '15px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.88' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
        >
          {loading ? 'Signing in...' : '🔐 Sign in to Admin Portal'}
        </button>

        {/* Divider */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          margin: '24px 0',
        }}>
          <div style={{ flex: 1, height: '1px', background: '#F3F4F6' }}/>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#D1D5DB' }}>or</p>
          <div style={{ flex: 1, height: '1px', background: '#F3F4F6' }}/>
        </div>

        {/* Student link */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9CA3AF' }}>
            Are you a student?{' '}
            <a
              href="/login"
              style={{
                color: '#2D6A4F', fontFamily: 'var(--font-heading)',
                fontWeight: 700, textDecoration: 'none',
              }}
            >
              Go to student login →
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
