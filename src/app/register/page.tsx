'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

// ── Types ─────────────────────────────────────────────────────────────────────

type Step = 'parent' | 'students_count' | 'payment' | 'register_students' | 'success'

interface StudentForm {
  childName:       string
  schoolEmail:     string
  password:        string
  confirmPassword: string
}

const emptyStudent = (): StudentForm => ({
  childName: '', schoolEmail: '', password: '', confirmPassword: '',
})

// ── Progress indicator ────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: Step }) {
  const steps = [
    { id: 'parent',          label: 'Your details' },
    { id: 'students_count',  label: 'Students'     },
    { id: 'payment',         label: 'Payment'      },
    { id: 'register_students', label: 'Setup'      },
  ]
  const currentIdx = steps.findIndex(s => s.id === step)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '28px' }}>
      {steps.map((s, i) => {
        const done    = i < currentIdx
        const active  = i === currentIdx
        return (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: i < steps.length - 1 ? 1 : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
              <div style={{
                width: '22px', height: '22px', borderRadius: '50%',
                background: done ? 'var(--green-dark)' : active ? 'var(--green-dark)' : 'var(--gray-200)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {done
                  ? <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5L9 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', color: active ? 'white' : 'var(--gray-400)' }}>{i + 1}</span>
                }
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: done || active ? 'var(--green-dark)' : 'var(--gray-400)', whiteSpace: 'nowrap' }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: '2px', background: done ? 'var(--green-dark)' : 'var(--gray-200)', borderRadius: '1px', minWidth: '12px' }}/>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Error box ─────────────────────────────────────────────────────────────────

function ErrorBox({ msg }: { msg: string }) {
  if (!msg) return null
  return (
    <div style={{ background: 'var(--red-light)', border: '1px solid #FECACA', borderRadius: 'var(--radius-md)', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="8" cy="8" r="7" stroke="#EF4444" strokeWidth="1.5"/>
        <path d="M8 5v3.5M8 11h.01" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#991B1B' }}>{msg}</p>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function RegisterPage() {
  const router  = useRouter()
  const [step,  setStep]  = useState<Step>('parent')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Parent form
  const [parentName,     setParentName]     = useState('')
  const [parentEmail,    setParentEmail]    = useState('')
  const [parentPassword, setParentPassword] = useState('')
  const [parentConfirm,  setParentConfirm]  = useState('')

  // Student count + amount
  const [studentCount,   setStudentCount]   = useState<1 | 2>(1)
  const PRICE_PER_STUDENT = 4999
  const totalAmount = studentCount * PRICE_PER_STUDENT

  // Payment result
  const [paymentId,      setPaymentId]      = useState('')
  const [invoiceNumber,  setInvoiceNumber]  = useState('')
  const [orderId,        setOrderId]        = useState('')

  // Student forms (up to 2)
  const [students, setStudents] = useState<StudentForm[]>([emptyStudent()])
  const [createdStudents, setCreatedStudents] = useState<string[]>([])

  // Keep students array in sync with count
  useEffect(() => {
    setStudents(Array.from({ length: studentCount }, (_, i) => students[i] || emptyStudent()))
  }, [studentCount])

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  const updateStudent = (idx: number, field: keyof StudentForm, value: string) => {
    setStudents(prev => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s))
  }

  // ── Step 1: Validate parent details ────────────────────────────────────────
  const handleParentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!parentName.trim())                             return setError('Please enter your full name.')
    if (!parentEmail.includes('@'))                     return setError('Please enter a valid email address.')
    if (parentPassword.length < 8)                     return setError('Password must be at least 8 characters.')
    if (parentPassword !== parentConfirm)               return setError('Passwords do not match.')
    setStep('students_count')
  }

  // ── Step 3: Initiate Razorpay payment ──────────────────────────────────────
  const handlePayment = async () => {
    setLoading(true)
    setError('')
    try {
      // Create Razorpay order on server
      const orderRes = await fetch('/api/razorpay/create-order', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ studentCount }),
      })
      const orderData = await orderRes.json()
      if (!orderRes.ok) throw new Error(orderData.error || 'Failed to create order')

      setOrderId(orderData.orderId)

      // Open Razorpay checkout
      const options = {
        key:      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount:   orderData.amount,
        currency: 'INR',
        name:     'GyaanPravaha',
        description: `Annual subscription — ${studentCount} student${studentCount > 1 ? 's' : ''}`,
        order_id: orderData.orderId,
        prefill: {
          name:  parentName,
          email: parentEmail,
        },
        theme: { color: '#1B4332' },
        handler: async (response: any) => {
          // Verify payment on server
          const verifyRes = await fetch('/api/razorpay/verify-payment', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
              parentName,
              parentEmail,
              studentCount,
              amountPaise: orderData.amount,
            }),
          })
          const verifyData = await verifyRes.json()
          if (!verifyRes.ok) throw new Error(verifyData.error || 'Payment verification failed')

          setPaymentId(response.razorpay_payment_id)
          setInvoiceNumber(verifyData.invoiceNumber)
          setLoading(false)
          setStep('register_students')
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
            setError('Payment was cancelled. Please try again.')
          },
        },
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.on('payment.failed', (res: any) => {
        setLoading(false)
        setError(`Payment failed: ${res.error.description}`)
      })
      rzp.open()
    } catch (err: any) {
      setLoading(false)
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  // ── Step 4: Register student accounts ──────────────────────────────────────
  const handleRegisterStudents = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate all student forms
    for (let i = 0; i < studentCount; i++) {
      const s = students[i]
      if (!s.childName.trim())            return setError(`Please enter the name for student ${i + 1}.`)
      if (!s.schoolEmail.includes('@'))   return setError(`Please enter a valid school Gmail for student ${i + 1}.`)
      if (s.password.length < 8)          return setError(`Password for student ${i + 1} must be at least 8 characters.`)
      if (s.password !== s.confirmPassword) return setError(`Passwords for student ${i + 1} do not match.`)
    }

    setLoading(true)
    const supabase = createClient()
    const created: string[] = []

    try {
      // Create parent account first
      const { error: parentErr } = await supabase.auth.signUp({
        email:    parentEmail,
        password: parentPassword,
        options:  { data: { full_name: parentName, role: 'parent' } },
      })
      if (parentErr && !parentErr.message.includes('already registered')) throw parentErr

      // Create each student account
      for (const s of students.slice(0, studentCount)) {
        const { error: studentErr } = await supabase.auth.signUp({
          email:    s.schoolEmail,
          password: s.password,
          options:  { data: { full_name: s.childName, role: 'student' } },
        })
        if (studentErr && !studentErr.message.includes('already registered')) throw studentErr
        created.push(s.schoolEmail)
      }

      setCreatedStudents(created)
      setStep('success')
    } catch (err: any) {
      setError(err.message || 'Failed to create accounts. Please contact support.')
    } finally {
      setLoading(false)
    }
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (step === 'success') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--green-pale)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <Logo />
        <div className="card" style={{ width: '100%', maxWidth: '520px', padding: '44px 36px', textAlign: 'center' }}>
          {/* Tick */}
          <div style={{ width: '72px', height: '72px', background: '#D8F3DC', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M7 16l6 6L25 9" stroke="#2D6A4F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: 'var(--green-deepest)', marginBottom: '8px' }}>
            Welcome to Gyaanpravaha!
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-600)', marginBottom: '28px' }}>
            Payment successful. All accounts have been created and are ready to use.
          </p>

          {/* Invoice summary */}
          <div style={{ background: 'var(--green-pale)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'var(--green-deepest)' }}>Payment receipt</p>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: 'var(--green-mid)', background: '#D8F3DC', padding: '3px 10px', borderRadius: '10px' }}>
                {invoiceNumber}
              </span>
            </div>
            {[
              { label: 'Amount paid',    value: `₹${totalAmount.toLocaleString('en-IN')}` },
              { label: 'Students',       value: `${studentCount} student${studentCount > 1 ? 's' : ''}` },
              { label: 'Plan',           value: 'Annual 2025–26' },
              { label: 'Payment ID',     value: paymentId },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-500)' }}>{label}</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'var(--green-deepest)', maxWidth: '200px', textAlign: 'right', wordBreak: 'break-all' }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Student accounts created */}
          <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 'var(--radius-lg)', padding: '16px 20px', marginBottom: '24px', textAlign: 'left' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'var(--green-deepest)', marginBottom: '10px' }}>Student login IDs</p>
            {createdStudents.map((email, i) => (
              <div key={email} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '10px', color: 'white' }}>{i + 1}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'var(--green-dark)' }}>{email}</p>
              </div>
            ))}
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gray-400)', marginTop: '8px' }}>Password: the one you set during registration</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link href="/login" className="btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex', padding: '13px' }}>
              Go to student login →
            </Link>
            <Link href="/parent/dashboard" style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: 'var(--green-dark)', textDecoration: 'none', background: 'white' }}>
              View invoice in parent dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ── Step 4: Register students ───────────────────────────────────────────────
  if (step === 'register_students') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--green-pale)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <Logo />
        <div className="card" style={{ width: '100%', maxWidth: '520px', padding: '40px 36px' }}>
          <ProgressBar step={step}/>

          {/* Payment confirmed badge */}
          <div style={{ background: '#D8F3DC', borderRadius: 'var(--radius-md)', padding: '10px 16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#2D6A4F"/><path d="M5 8l2.5 2.5L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#1B4332' }}>
              Payment confirmed · ₹{totalAmount.toLocaleString('en-IN')} · Invoice {invoiceNumber}
            </p>
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '22px', color: 'var(--green-deepest)', marginBottom: '6px' }}>
            Register your {studentCount > 1 ? 'students' : 'student'}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-600)', marginBottom: '24px' }}>
            Set up {studentCount > 1 ? 'each child\'s' : 'your child\'s'} login details below.
          </p>

          <form onSubmit={handleRegisterStudents} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {students.slice(0, studentCount).map((s, idx) => (
              <div key={idx}>
                {studentCount > 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '12px', color: 'white' }}>{idx + 1}</span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: 'var(--green-mid)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Student {idx + 1}
                    </p>
                  </div>
                )}

                <div style={{ marginBottom: '14px' }}>
                  <label className="label">Child's full name</label>
                  <input type="text" className="input" placeholder="Enter full name" value={s.childName}
                    onChange={e => updateStudent(idx, 'childName', e.target.value)} required/>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label className="label">Child's school Gmail ID</label>
                  <input type="email" className="input" placeholder="child@school.edu" value={s.schoolEmail}
                    onChange={e => updateStudent(idx, 'schoolEmail', e.target.value)} required autoComplete="off"/>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gray-400)', marginTop: '5px' }}>
                    The Gmail Suite ID issued by the school — your child uses this to log in
                  </p>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label className="label">Set a password</label>
                  <input type="password" className="input" placeholder="Minimum 8 characters" value={s.password}
                    onChange={e => updateStudent(idx, 'password', e.target.value)} required minLength={8} autoComplete="new-password"/>
                </div>

                <div style={{ marginBottom: idx < studentCount - 1 ? '8px' : '24px' }}>
                  <label className="label">Confirm password</label>
                  <input type="password" className="input" placeholder="Re-enter the password" value={s.confirmPassword}
                    onChange={e => updateStudent(idx, 'confirmPassword', e.target.value)} required autoComplete="new-password"/>
                </div>

                {idx < studentCount - 1 && (
                  <hr style={{ border: 'none', borderTop: '1px solid var(--gray-200)', margin: '20px 0' }}/>
                )}
              </div>
            ))}

            <ErrorBox msg={error}/>

            <button type="submit" className="btn-primary" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Creating accounts...' : `Create ${studentCount > 1 ? 'student accounts' : 'student account'} →`}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Step 3: Payment ─────────────────────────────────────────────────────────
  if (step === 'payment') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--green-pale)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <Logo />
        <div className="card" style={{ width: '100%', maxWidth: '480px', padding: '40px 36px' }}>
          <ProgressBar step={step}/>
          <button onClick={() => setStep('students_count')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)', fontFamily: 'var(--font-body)', fontSize: '13px', marginBottom: '20px', padding: 0 }}>
            ← Back
          </button>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '24px', color: 'var(--green-deepest)', marginBottom: '6px' }}>
            Complete payment
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-600)', marginBottom: '24px' }}>
            One payment. Full year of access for {studentCount} student{studentCount > 1 ? 's' : ''}.
          </p>

          {/* Order summary */}
          <div style={{ background: 'var(--green-pale)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '24px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>Order summary</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-700)' }}>Gyaanpravaha Annual Plan × {studentCount}</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: 'var(--green-deepest)' }}>₹{(PRICE_PER_STUDENT * studentCount).toLocaleString('en-IN')}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-500)' }}>Parent</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-600)' }}>{parentName}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-500)' }}>Students</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-600)' }}>{studentCount}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-500)' }}>Duration</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-600)' }}>Full academic year 2025–26</p>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid var(--gray-200)', margin: '12px 0' }}/>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: 'var(--green-deepest)' }}>Total</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color: 'var(--green-deepest)' }}>₹{totalAmount.toLocaleString('en-IN')}</p>
            </div>
          </div>

          {/* Payment methods */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {['UPI', 'Cards', 'Net Banking', 'Wallets'].map(m => (
              <span key={m} style={{ padding: '4px 10px', background: 'white', border: '1px solid var(--gray-200)', borderRadius: '6px', fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gray-600)' }}>{m}</span>
            ))}
          </div>

          <ErrorBox msg={error}/>

          <button onClick={handlePayment} disabled={loading} className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: '16px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Opening payment...' : `Pay ₹${totalAmount.toLocaleString('en-IN')} securely`}
          </button>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gray-400)', textAlign: 'center', marginTop: '12px' }}>
            Secured by Razorpay · 256-bit SSL encryption
          </p>
        </div>
      </div>
    )
  }

  // ── Step 2: Select number of students ──────────────────────────────────────
  if (step === 'students_count') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--green-pale)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <Logo />
        <div className="card" style={{ width: '100%', maxWidth: '480px', padding: '40px 36px' }}>
          <ProgressBar step={step}/>
          <button onClick={() => setStep('parent')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)', fontFamily: 'var(--font-body)', fontSize: '13px', marginBottom: '20px', padding: 0 }}>
            ← Back
          </button>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '24px', color: 'var(--green-deepest)', marginBottom: '6px' }}>
            How many children?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-600)', marginBottom: '28px' }}>
            Select how many children you would like to register. Maximum 2 per family.
          </p>

          {/* Student count selector */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
            {([1, 2] as const).map(count => (
              <button key={count} onClick={() => setStudentCount(count)}
                style={{
                  padding: '20px 16px', borderRadius: '14px', cursor: 'pointer', textAlign: 'center',
                  border: studentCount === count ? '2px solid var(--green-dark)' : '1.5px solid var(--gray-200)',
                  background: studentCount === count ? '#F0FDF4' : 'white',
                  transition: 'all 0.15s',
                }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '32px', color: 'var(--green-deepest)', lineHeight: 1, marginBottom: '6px' }}>{count}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-600)', marginBottom: '10px' }}>{count === 1 ? 'student' : 'students'}</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: 'var(--green-dark)' }}>₹{(PRICE_PER_STUDENT * count).toLocaleString('en-IN')}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gray-400)' }}>per year</p>
              </button>
            ))}
          </div>

          {/* Price breakdown */}
          <div style={{ background: 'var(--green-pale)', borderRadius: 'var(--radius-md)', padding: '14px 18px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-600)' }}>₹4,999 × {studentCount} student{studentCount > 1 ? 's' : ''}</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'var(--green-deepest)' }}>₹{totalAmount.toLocaleString('en-IN')}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-600)' }}>Duration</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-600)' }}>Full academic year 2025–26</p>
            </div>
          </div>

          <button onClick={() => setStep('payment')} className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px' }}>
            Continue to payment →
          </button>
        </div>
      </div>
    )
  }

  // ── Step 1: Parent details ──────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'var(--green-pale)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <Logo />
      <div className="card" style={{ width: '100%', maxWidth: '480px', padding: '40px 36px' }}>
        <ProgressBar step={step}/>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '24px', color: 'var(--green-deepest)', marginBottom: '4px' }}>
          Create your parent account
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-600)', marginBottom: '28px' }}>
          You register, you pay, you set everything up. Your child just logs in and learns.
        </p>

        <form onSubmit={handleParentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          <div style={{ marginBottom: '16px' }}>
            <label className="label" htmlFor="parentName">Your full name</label>
            <input id="parentName" type="text" className="input" placeholder="Enter your full name"
              value={parentName} onChange={e => setParentName(e.target.value)} required autoComplete="name"/>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label className="label" htmlFor="parentEmail">Your email address</label>
            <input id="parentEmail" type="email" className="input" placeholder="you@example.com"
              value={parentEmail} onChange={e => setParentEmail(e.target.value)} required autoComplete="email"/>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gray-400)', marginTop: '5px' }}>
              Invoice and updates will be sent here
            </p>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label className="label" htmlFor="parentPassword">Create a password for your parent account</label>
            <input id="parentPassword" type="password" className="input" placeholder="Minimum 8 characters"
              value={parentPassword} onChange={e => setParentPassword(e.target.value)} required minLength={8} autoComplete="new-password"/>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label className="label" htmlFor="parentConfirm">Confirm password</label>
            <input id="parentConfirm" type="password" className="input" placeholder="Re-enter the password"
              value={parentConfirm} onChange={e => setParentConfirm(e.target.value)} required autoComplete="new-password"/>
          </div>

          <ErrorBox msg={error}/>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px' }}>
            Continue →
          </button>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gray-400)', textAlign: 'center', marginTop: '12px', lineHeight: 1.5 }}>
            By registering you agree to our terms of service.
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

// ── Logo ──────────────────────────────────────────────────────────────────────

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
