'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Tab = 'student' | 'parent'

export default function LoginPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('student')
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
      setError('Incorrect email or password. Please check and try again.')
      setLoading(false)
      return
    }

    if (data.user) {
      // Let middleware handle role-based redirect
      router.push('/redirect')
      router.refresh()
    }

    setLoading(false)
  }

  const handleTabChange = (newTab: Tab) => {
    setTab(newTab)
    setEmail('')
    setPassword('')
    setError('')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--green-pale)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>

      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '32px' }}>
        <div style={{ width: '40px', height: '40px', background: 'var(--green-dark)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '26px', color: 'var(--green-deepest)', marginBottom: '6px', textAlign: 'center' }}>
          Welcome back!
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-600)', textAlign: 'center', marginBottom: '28px' }}>
          Who is logging in today?
        </p>

        {/* Tab switcher */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px',
          background: 'var(--gray-100)', borderRadius: 'var(--radius-md)',
          padding: '4px', marginBottom: '28px',
        }}>
          {([
            { key: 'student', label: 'I am a student', emoji: '📚' },
            { key: 'parent',  label: 'I am a parent',  emoji: '👨‍👩‍👧' },
          ] as { key: Tab; label: string; emoji: string }[]).map(({ key, label, emoji }) => (
            <button
              key={key}
              type="button"
              onClick={() => handleTabChange(key)}
              style={{
                padding: '10px 8px', borderRadius: 'var(--radius-sm)',
                border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px',
                transition: 'all 0.2s',
                background: tab === key ? 'var(--green-dark)' : 'transparent',
                color: tab === key ? 'white' : 'var(--gray-600)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              }}
            >
              <span style={{ fontSize: '14px' }}>{emoji}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Context hint */}
        <div style={{
          background: tab === 'student' ? 'var(--green-pale)' : 'var(--indigo-light)',
          border: `1px solid ${tab === 'student' ? 'var(--green-mint)' : '#C7D2FE'}`,
          borderRadius: 'var(--radius-md)', padding: '12px 16px', marginBottom: '24px',
        }}>
          {tab === 'student' ? (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--green-deepest)', lineHeight: 1.5 }}>
              Use your <strong>school Gmail ID</strong> and the password your parent set for you during registration.
            </p>
          ) : (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#3730A3', lineHeight: 1.5 }}>
              Use your <strong>personal email</strong> and the password you created when you registered your child.
            </p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

          <div>
            <label className="label" htmlFor="email">
              {tab === 'student' ? 'School Gmail ID' : 'Your email address'}
            </label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder={tab === 'student' ? 'yourname@school.edu' : 'you@example.com'}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="label" htmlFor="password" style={{ margin: 0 }}>Password</label>
              {tab === 'parent' && (
                <Link href="/forgot-password" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--green-dark)', textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              )}
            </div>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div style={{ background: 'var(--red-light)', border: '1px solid #FECACA', borderRadius: 'var(--radius-md)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
              width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px',
              opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Logging in...' : `Log in as ${tab}`}
          </button>
        </form>

        <hr style={{ border: 'none', borderTop: '1px solid var(--gray-200)', margin: '24px 0' }}/>

        <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-600)' }}>
          New here?{' '}
          <Link href="/register" style={{ color: 'var(--green-dark)', fontWeight: 600, textDecoration: 'none' }}>
            Register your child
          </Link>
        </p>

        <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-500)', marginTop: '8px' }}>
          or{' '}
          <Link href="/gk" style={{ color: 'var(--green-dark)', fontWeight: 600, textDecoration: 'none' }}>
            try GK for free
          </Link>
          {' '}— no account needed
        </p>
      <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-400)', marginTop: '8px' }}>
          Can&apos;t log in?{' '}
          <Link href="/help" style={{ color: 'var(--green-dark)', fontWeight: 600, textDecoration: 'none' }}>
            Get help →
          </Link>
        </p>
      </div>

      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '20px', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-500)', textDecoration: 'none' }}>
        ← Back to home
      </Link>
    </div>
  )
}
