'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError('Incorrect email or password. Please try again.')
      setLoading(false)
      return
    }

    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

      if (profile?.role === 'admin') {
        router.push('/admin')
      } else if (profile?.role === 'parent') {
        router.push('/parent/dashboard')
      } else {
        router.push('/student/dashboard')
      }
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--green-pale)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>

      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '32px' }}>
        <div style={{
          width: '40px', height: '40px',
          background: 'var(--green-dark)',
          borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
            <path d="M6 8h8M10 4v8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="10" cy="8" r="1.2" fill="#74C69D"/>
          </svg>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: 'var(--green-deepest)', lineHeight: 1 }}>Gyaanpravaha</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--green-mid)', lineHeight: 1, marginTop: '2px' }}>ज्ञानप्रवाह</p>
        </div>
      </Link>

      {/* Card */}
      <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '40px 36px' }}>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: '26px',
          color: 'var(--green-deepest)',
          marginBottom: '6px',
          textAlign: 'center',
        }}>
          Welcome back!
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--gray-600)',
          textAlign: 'center',
          marginBottom: '32px',
        }}>
          Log in to continue your learning journey
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <div>
            <label className="label" htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="label" htmlFor="password" style={{ margin: 0 }}>Password</label>
              <Link href="/auth/forgot-password" style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--green-dark)',
                textDecoration: 'none',
              }}>
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div style={{
              background: 'var(--red-light)',
              border: '1px solid #FECACA',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="8" cy="8" r="7" stroke="#EF4444" strokeWidth="1.5"/>
                <path d="M8 5v3.5M8 11h.01" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#991B1B' }}>{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '14px',
              fontSize: '15px',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>

        </form>

        <hr className="divider" />

        <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-600)' }}>
          New to Gyaanpravaha?{' '}
          <Link href="/signup" style={{ color: 'var(--green-dark)', fontWeight: 600, textDecoration: 'none' }}>
            Create an account
          </Link>
        </p>
      </div>

      <p style={{ marginTop: '24px', fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gray-400)', textAlign: 'center' }}>
      </p>

    </div>
  )
}
