'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<'student' | 'parent'>('student')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please check and try again.')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    })

    if (signupError) {
      if (signupError.message.includes('already registered')) {
        setError('This email is already registered. Please log in instead.')
      } else {
        setError('Something went wrong. Please try again.')
      }
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
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
        <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '48px 36px', textAlign: 'center' }}>
          <div style={{
            width: '64px', height: '64px',
            background: 'var(--emerald-light)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M6 14l5.5 5.5L22 9" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '24px', color: 'var(--green-deepest)', marginBottom: '12px' }}>
            Account created!
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-600)', marginBottom: '8px' }}>
            We have sent a verification email to:
          </p>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: 'var(--green-dark)', marginBottom: '24px' }}>
            {email}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-600)', marginBottom: '32px' }}>
            Please check your inbox and click the verification link to activate your account.
          </p>
          <Link href="/login" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Go to login
          </Link>
        </div>
      </div>
    )
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
          Create your account
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--gray-600)',
          textAlign: 'center',
          marginBottom: '28px',
        }}>
          Join Gyaanpravaha and start learning today
        </p>

        {/* Role toggle */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          marginBottom: '24px',
          background: 'var(--gray-100)',
          borderRadius: 'var(--radius-md)',
          padding: '4px',
        }}>
          {(['student', 'parent'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              style={{
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '14px',
                transition: 'all 0.2s',
                background: role === r ? 'var(--green-dark)' : 'transparent',
                color: role === r ? 'white' : 'var(--gray-600)',
              }}
            >
              {r === 'student' ? 'I am a student' : 'I am a parent'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

          <div>
            <label className="label" htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              type="text"
              className="input"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

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
            <label className="label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className="label" htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              type="password"
              className="input"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
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
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gray-400)', textAlign: 'center', lineHeight: 1.5 }}>
            By creating an account you agree to our terms of service and privacy policy.
          </p>

        </form>

        <hr className="divider" />

        <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-600)' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--green-dark)', fontWeight: 600, textDecoration: 'none' }}>
            Log in
          </Link>
        </p>
      </div>

      <p style={{ marginTop: '24px', fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gray-400)', textAlign: 'center' }}>
        For students and parents of Singhania School, Thane
      </p>

    </div>
  )
}
