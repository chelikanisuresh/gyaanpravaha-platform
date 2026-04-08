'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Step = 'details' | 'payment' | 'success'

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('details')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    parentName:      '',
    parentEmail:     '',
    childName:       '',
    childSchoolEmail:'',
    password:        '',
    confirmPassword: '',
  })

  const update = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match. Please check and try again.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }
    if (!form.childSchoolEmail.includes('@')) {
      setError('Please enter a valid school Gmail ID for your child.')
      return
    }

    setStep('payment')
  }

  const handlePayment = async () => {
    setLoading(true)
    setError('')

    try {
      // In production: create Razorpay order via API route
      // For now: simulate payment success and create accounts
      const supabase = createClient()

      // Create student account
      const { error: studentError } = await supabase.auth.signUp({
        email: form.childSchoolEmail,
        password: form.password,
        options: {
          data: {
            full_name: form.childName,
            role: 'student',
          }
        }
      })

      if (studentError && !studentError.message.includes('already registered')) {
        throw studentError
      }

      // Create parent account
      const parentPassword = form.password + '_parent'
      const { error: parentError } = await supabase.auth.signUp({
        email: form.parentEmail,
        password: parentPassword,
        options: {
          data: {
            full_name: form.parentName,
            role: 'parent',
          }
        }
      })

      if (parentError && !parentError.message.includes('already registered')) {
        throw parentError
      }

      setStep('success')
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── Success screen ──
  if (step === 'success') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--green-pale)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="card" style={{ width: '100%', maxWidth: '480px', padding: '48px 36px', textAlign: 'center' }}>
          <div style={{ width: '72px', height: '72px', background: 'var(--emerald-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M7 16l6 6L25 9" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '26px', color: 'var(--green-deepest)', marginBottom: '8px' }}>Welcome to Gyaanpravaha!</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-600)', marginBottom: '28px' }}>
            Your account has been created. Check your email for confirmation.
          </p>

          <div style={{ background: 'var(--green-pale)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '28px', textAlign: 'left' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: 'var(--green-deepest)', marginBottom: '12px' }}>Your login details</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Child login ID</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: 'var(--green-dark)' }}>{form.childSchoolEmail}</p>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: 'var(--green-dark)' }}>The password you set during registration</p>
              </div>
            </div>
          </div>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-500)', marginBottom: '24px' }}>
            A confirmation email has been sent to <strong>{form.parentEmail}</strong> with your child's login details.
          </p>

          <Link href="/login" className="btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
            Log in now
          </Link>
        </div>
      </div>
    )
  }

  // ── Payment screen ──
  if (step === 'payment') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--green-pale)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <Logo />
        <div className="card" style={{ width: '100%', maxWidth: '480px', padding: '40px 36px' }}>
          <button onClick={() => setStep('details')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)', fontFamily: 'var(--font-body)', fontSize: '13px', marginBottom: '24px', padding: 0 }}>
            ← Back to details
          </button>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '24px', color: 'var(--green-deepest)', marginBottom: '6px' }}>Complete payment</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-600)', marginBottom: '28px' }}>One payment. Full year of access for {form.childName}.</p>

          {/* Order summary */}
          <div style={{ background: 'var(--green-pale)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '24px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>Order summary</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-700)' }}>Gyaanpravaha Annual Plan</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: 'var(--green-deepest)' }}>₹2,499</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-500)' }}>Student</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-600)' }}>{form.childName}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-500)' }}>Duration</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-600)' }}>Full academic year 2026</p>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid var(--gray-200)', margin: '12px 0' }}/>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: 'var(--green-deepest)' }}>Total</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '18px', color: 'var(--green-deepest)' }}>₹2,499</p>
            </div>
          </div>

          {/* Payment methods note */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {['UPI', 'Cards', 'Net Banking', 'Wallets'].map(m => (
              <span key={m} style={{ padding: '4px 10px', background: 'white', border: '1px solid var(--gray-200)', borderRadius: '6px', fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gray-600)' }}>{m}</span>
            ))}
          </div>

          {error && (
            <div style={{ background: 'var(--red-light)', border: '1px solid #FECACA', borderRadius: 'var(--radius-md)', padding: '12px 16px', marginBottom: '16px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#991B1B' }}>{error}</p>
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: '16px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Processing...' : 'Pay ₹2,499 securely'}
          </button>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gray-400)', textAlign: 'center', marginTop: '12px' }}>
            Secured by Razorpay · 256-bit SSL encryption
          </p>
        </div>
      </div>
    )
  }

  // ── Details form ──
  return (
    <div style={{ minHeight: '100vh', background: 'var(--green-pale)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <Logo />

      <div className="card" style={{ width: '100%', maxWidth: '480px', padding: '40px 36px' }}>
        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: 'var(--green-dark)' }}>Details</span>
          </div>
          <div style={{ flex: 1, height: '2px', background: 'var(--gray-200)', borderRadius: '1px' }}/>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: 'var(--gray-500)' }}>2</span>
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: 'var(--gray-400)' }}>Payment</span>
          </div>
        </div>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '24px', color: 'var(--green-deepest)', marginBottom: '4px' }}>Register your child</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-600)', marginBottom: '28px' }}>Parents register. You set the password. Your child uses their school Gmail to log in.</p>

        <form onSubmit={handleDetailsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

          {/* Parent section */}
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: 'var(--green-mid)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>Parent details</p>

          <div style={{ marginBottom: '16px' }}>
            <label className="label" htmlFor="parentName">Your full name</label>
            <input id="parentName" type="text" className="input" placeholder="Enter your full name" value={form.parentName} onChange={e => update('parentName', e.target.value)} required autoComplete="name"/>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label className="label" htmlFor="parentEmail">Your email address</label>
            <input id="parentEmail" type="email" className="input" placeholder="you@example.com" value={form.parentEmail} onChange={e => update('parentEmail', e.target.value)} required autoComplete="email"/>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gray-400)', marginTop: '5px' }}>Your child's login details will be sent here</p>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--gray-200)', marginBottom: '20px' }}/>

          {/* Child section */}
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: 'var(--green-mid)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>Child details</p>

          <div style={{ marginBottom: '16px' }}>
            <label className="label" htmlFor="childName">Child's full name</label>
            <input id="childName" type="text" className="input" placeholder="Enter child's full name" value={form.childName} onChange={e => update('childName', e.target.value)} required/>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label className="label" htmlFor="childSchoolEmail">Child's school Gmail ID</label>
            <input id="childSchoolEmail" type="email" className="input" placeholder="e.g. childname@school.edu" value={form.childSchoolEmail} onChange={e => update('childSchoolEmail', e.target.value)} required autoComplete="off"/>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gray-400)', marginTop: '5px' }}>This is the Gmail Suite ID issued by the school. Your child uses this to log in.</p>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label className="label" htmlFor="password">Set a password for your child</label>
            <input id="password" type="password" className="input" placeholder="Minimum 8 characters" value={form.password} onChange={e => update('password', e.target.value)} required minLength={8} autoComplete="new-password"/>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gray-400)', marginTop: '5px' }}>You set this — share it with your child when they are ready to log in</p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label className="label" htmlFor="confirmPassword">Confirm password</label>
            <input id="confirmPassword" type="password" className="input" placeholder="Re-enter the password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} required autoComplete="new-password"/>
          </div>

          {error && (
            <div style={{ background: 'var(--red-light)', border: '1px solid #FECACA', borderRadius: 'var(--radius-md)', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="8" cy="8" r="7" stroke="#EF4444" strokeWidth="1.5"/>
                <path d="M8 5v3.5M8 11h.01" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#991B1B' }}>{error}</p>
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px' }}>
            Continue to payment →
          </button>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gray-400)', textAlign: 'center', marginTop: '12px', lineHeight: 1.5 }}>
            By registering you agree to our terms of service. Annual subscription of ₹2,499 will be charged.
          </p>
        </form>

        <hr style={{ border: 'none', borderTop: '1px solid var(--gray-200)', margin: '20px 0' }}/>
        <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-600)' }}>
          Already registered?{' '}
          <Link href="/login" style={{ color: 'var(--green-dark)', fontWeight: 600, textDecoration: 'none' }}>Log in</Link>
        </p>
      </div>
    </div>
  )
}

function Logo() {
  return (
    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '28px' }}>
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
  )
}
