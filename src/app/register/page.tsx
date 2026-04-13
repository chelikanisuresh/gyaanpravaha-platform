'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'

type Step = 'parent' | 'students_count' | 'payment' | 'register_students' | 'success'
interface StudentForm { childName: string; schoolEmail: string; password: string; confirmPassword: string }
const emptyStudent = (): StudentForm => ({ childName: '', schoolEmail: '', password: '', confirmPassword: '' })

const LOGO = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 5 C12 5 7 4 3 5.5 L3 17 C7 15.5 12 16.5 12 16.5 C12 16.5 17 15.5 21 17 L21 5.5 C17 4 12 5 12 5Z" fill="white" fillOpacity="0.9"/>
    <line x1="12" y1="5" x2="12" y2="16.5" stroke="#1B4332" strokeWidth="0.8" strokeOpacity="0.4"/>
    <ellipse cx="12" cy="21" rx="2.2" ry="3.2" fill="#74C69D" fillOpacity="0.95"/>
    <ellipse cx="8.5" cy="21.5" rx="1.8" ry="2.6" fill="#74C69D" fillOpacity="0.75" transform="rotate(-28 8.5 21.5)"/>
    <ellipse cx="15.5" cy="21.5" rx="1.8" ry="2.6" fill="#74C69D" fillOpacity="0.75" transform="rotate(28 15.5 21.5)"/>
  </svg>
)

// ── Shared input ──────────────────────────────────────────────────────────────
function Input({ label, type = 'text', value, onChange, placeholder, hint, required = false }: {
  label: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string; hint?: string; required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#374151', marginBottom: '6px' }}>
        {label}{required && <span style={{ color: '#EF4444', marginLeft: '3px' }}>*</span>}
      </label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: '100%', padding: '12px 16px', borderRadius: '11px', border: `1.5px solid ${focused ? '#2D6A4F' : '#E5E7EB'}`, fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1F2937', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s', background: 'white' }}/>
      {hint && <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>{hint}</p>}
    </div>
  )
}

// ── Error box ─────────────────────────────────────────────────────────────────
function ErrorBox({ msg }: { msg: string }) {
  if (!msg) return null
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
      style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ fontSize: '16px', flexShrink: 0 }}>⚠️</span>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#DC2626' }}>{msg}</p>
    </motion.div>
  )
}

// ── Step progress ─────────────────────────────────────────────────────────────
function StepBar({ step }: { step: Step }) {
  const steps = [
    { id: 'parent',          label: 'Your details', icon: '👤' },
    { id: 'students_count',  label: 'Students',     icon: '👦' },
    { id: 'payment',         label: 'Payment',      icon: '💳' },
    { id: 'register_students', label: 'Setup',      icon: '✅' },
  ]
  const currentIdx = steps.findIndex(s => s.id === step)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '32px' }}>
      {steps.map((s, i) => {
        const done   = i < currentIdx
        const active = i === currentIdx
        return (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: i < steps.length - 1 ? 1 : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? '#1B4332' : active ? '#1B4332' : '#F1F5F9', transition: 'all 0.3s' }}>
                {done
                  ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: active ? 'white' : '#9CA3AF' }}>{i + 1}</span>}
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: done || active ? '#1B4332' : '#9CA3AF', whiteSpace: 'nowrap' }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: '2px', background: done ? '#1B4332' : '#E5E7EB', borderRadius: '1px', minWidth: '16px', transition: 'background 0.3s' }}/>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Layout wrapper ────────────────────────────────────────────────────────────
function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      {/* Top nav */}
      <div style={{ width: '100%', maxWidth: '560px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(27,67,50,0.2)' }}>{LOGO}</div>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: '#1B4332', lineHeight: 1 }}>Gyaanpravaha</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#40916C', marginTop: '1px' }}>ज्ञानप्रवाह</p>
          </div>
        </Link>
        <Link href="/login" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '13px', color: '#64748B', textDecoration: 'none', border: '1px solid #E5E7EB', padding: '8px 16px', borderRadius: '10px', background: 'white' }}>
          Log in
        </Link>
      </div>
      {children}
    </div>
  )
}

// ── Card ──────────────────────────────────────────────────────────────────────
function Card({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      style={{ width: '100%', maxWidth: '520px', background: 'white', borderRadius: '24px', border: '1.5px solid #E2E8F0', padding: '40px 36px', boxShadow: '0 8px 40px rgba(0,0,0,0.06)' }}>
      {children}
    </motion.div>
  )
}

// ── Primary button ────────────────────────────────────────────────────────────
function PrimaryBtn({ children, onClick, disabled, loading }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean; loading?: boolean }) {
  return (
    <motion.button onClick={onClick} disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02, boxShadow: '0 8px 24px rgba(27,67,50,0.25)' } : {}}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: disabled || loading ? '#9CA3AF' : 'linear-gradient(135deg,#1B4332,#2D6A4F)', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', cursor: disabled || loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
      {loading && <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }}/>}
      {children}
    </motion.button>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function RegisterPage() {
  const router  = useRouter()
  const [step,  setStep]  = useState<Step>('parent')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [parentName,     setParentName]     = useState('')
  const [parentEmail,    setParentEmail]    = useState('')
  const [parentPassword, setParentPassword] = useState('')
  const [parentConfirm,  setParentConfirm]  = useState('')
  const [studentCount,   setStudentCount]   = useState<1|2>(1)
  const PRICE = 4999
  const totalAmount = studentCount * PRICE

  const [paymentId,     setPaymentId]     = useState('')
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [orderId,       setOrderId]       = useState('')
  const [students, setStudents] = useState<StudentForm[]>([emptyStudent()])
  const [createdStudents, setCreatedStudents] = useState<string[]>([])

  useEffect(() => {
    setStudents(Array.from({ length: studentCount }, (_, i) => students[i] || emptyStudent()))
  }, [studentCount])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  const updateStudent = (idx: number, field: keyof StudentForm, value: string) =>
    setStudents(prev => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s))

  const handleParentSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    if (!parentName.trim())        return setError('Please enter your full name.')
    if (!parentEmail.includes('@')) return setError('Please enter a valid email address.')
    if (parentPassword.length < 8) return setError('Password must be at least 8 characters.')
    if (parentPassword !== parentConfirm) return setError('Passwords do not match.')
    setStep('students_count')
  }

  const handlePayment = async () => {
    setLoading(true); setError('')
    try {
      const orderRes  = await fetch('/api/razorpay/create-order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ studentCount }) })
      const orderData = await orderRes.json()
      if (!orderRes.ok) throw new Error(orderData.error || 'Failed to create order')
      setOrderId(orderData.orderId)
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, amount: orderData.amount, currency: 'INR',
        name: 'Gyaanpravaha', description: `Annual subscription — ${studentCount} student${studentCount > 1 ? 's' : ''}`,
        order_id: orderData.orderId, prefill: { name: parentName, email: parentEmail },
        theme: { color: '#1B4332' },
        handler: async (response: any) => {
          const verifyRes  = await fetch('/api/razorpay/verify-payment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature, parentName, parentEmail, studentCount, amountPaise: orderData.amount }) })
          const verifyData = await verifyRes.json()
          if (!verifyRes.ok) throw new Error(verifyData.error || 'Payment verification failed')
          setPaymentId(response.razorpay_payment_id); setInvoiceNumber(verifyData.invoiceNumber)
          setLoading(false); setStep('register_students')
        },
        modal: { ondismiss: () => { setLoading(false); setError('Payment cancelled. Please try again.') } },
      }
      const rzp = new (window as any).Razorpay(options)
      rzp.on('payment.failed', (res: any) => { setLoading(false); setError(`Payment failed: ${res.error.description}`) })
      rzp.open()
    } catch (err: any) { setError(err.message || 'Something went wrong.'); setLoading(false) }
  }

  const handleRegisterStudents = async () => {
    setError(''); setLoading(true)
    for (const student of students) {
      if (!student.childName.trim()) { setError('Please enter child name.'); setLoading(false); return }
      if (!student.schoolEmail.includes('@')) { setError('Please enter a valid email for each student.'); setLoading(false); return }
      if (student.password.length < 8) { setError('Student password must be at least 8 characters.'); setLoading(false); return }
      if (student.password !== student.confirmPassword) { setError('Student passwords do not match.'); setLoading(false); return }
    }
    try {
      const supabase = createClient()
      const { data: parentData, error: parentError } = await supabase.auth.signUp({ email: parentEmail, password: parentPassword, options: { data: { full_name: parentName, role: 'parent' } } })
      if (parentError) throw new Error(parentError.message)
      const parentId = parentData.user?.id
      const names: string[] = []
      for (const student of students) {
        const res = await fetch('/api/register-student', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ childName: student.childName, schoolEmail: student.schoolEmail, password: student.password, parentId, paymentId, invoiceNumber, orderId }) })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to register student')
        names.push(student.childName)
      }
      setCreatedStudents(names); setStep('success')
    } catch (err: any) { setError(err.message || 'Something went wrong.') }
    setLoading(false)
  }

  // ── Success ─────────────────────────────────────────────────────────────────
  if (step === 'success') return (
    <PageLayout>
      <Card>
        <div style={{ textAlign: 'center' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
            style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg,#D8F3DC,#B7E4C7)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '36px' }}>
            🎉
          </motion.div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: '#1B4332', marginBottom: '8px' }}>You're all set!</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#64748B', lineHeight: 1.7, marginBottom: '28px' }}>
            {createdStudents.join(' and ')} can now log in and start learning. An invoice has been sent to your email.
          </p>
          <div style={{ background: '#F0FDF4', borderRadius: '16px', border: '1px solid #D8F3DC', padding: '20px', marginBottom: '24px', textAlign: 'left' }}>
            {createdStudents.map((name, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: i < createdStudents.length - 1 ? '1px solid #D8F3DC' : 'none' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1B4332', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '13px', color: 'white' }}>{name[0]}</div>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332' }}>{name}</p>
                <span style={{ marginLeft: 'auto', background: '#D8F3DC', color: '#1B4332', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', padding: '2px 10px', borderRadius: '20px' }}>Ready ✓</span>
              </div>
            ))}
          </div>
          <PrimaryBtn onClick={() => router.push('/login')}>Go to login →</PrimaryBtn>
        </div>
      </Card>
    </PageLayout>
  )

  // ── Register students ───────────────────────────────────────────────────────
  if (step === 'register_students') return (
    <PageLayout>
      <Card>
        <StepBar step={step}/>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '22px', color: '#1B4332', marginBottom: '4px' }}>Set up student accounts</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>Create login credentials your child will use on the platform.</p>
        {students.map((student, idx) => (
          <div key={idx} style={{ background: '#F8FAFF', borderRadius: '16px', border: '1.5px solid #E2E8F0', padding: '20px', marginBottom: '16px' }}>
            {students.length > 1 && <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#1B4332', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>Student {idx + 1}</p>}
            <Input label="Child's full name" value={student.childName} onChange={v => updateStudent(idx, 'childName', v)} placeholder="Enter your child's name" required/>
            <Input label="Student email" type="email" value={student.schoolEmail} onChange={v => updateStudent(idx, 'schoolEmail', v)} placeholder="student@example.com" hint="Your child will use this to log in" required/>
            <Input label="Student password" type="password" value={student.password} onChange={v => updateStudent(idx, 'password', v)} placeholder="Min. 8 characters" required/>
            <Input label="Confirm password" type="password" value={student.confirmPassword} onChange={v => updateStudent(idx, 'confirmPassword', v)} placeholder="Re-enter password" required/>
          </div>
        ))}
        <ErrorBox msg={error}/>
        <PrimaryBtn onClick={handleRegisterStudents} loading={loading}>
          {loading ? 'Creating accounts...' : 'Create accounts and finish →'}
        </PrimaryBtn>
      </Card>
    </PageLayout>
  )

  // ── Payment ─────────────────────────────────────────────────────────────────
  if (step === 'payment') return (
    <PageLayout>
      <Card>
        <StepBar step={step}/>
        <button onClick={() => setStep('students_count')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', fontFamily: 'var(--font-body)', fontSize: '13px', marginBottom: '20px', padding: 0 }}>← Back</button>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '22px', color: '#1B4332', marginBottom: '4px' }}>Complete payment</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>One payment, full year access for {studentCount} student{studentCount > 1 ? 's' : ''}.</p>
        <div style={{ background: 'linear-gradient(135deg,#F0FDF4,#ECFDF5)', borderRadius: '16px', border: '1px solid #D8F3DC', padding: '20px', marginBottom: '24px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#40916C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>Order summary</p>
          {[
            ['Annual Plan × ' + studentCount, `₹${totalAmount.toLocaleString('en-IN')}`],
            ['Duration', 'Full year 2025–26'],
            ['Parent', parentName],
          ].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#64748B' }}>{l}</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332' }}>{v}</p>
            </div>
          ))}
          <div style={{ height: '1px', background: '#D8F3DC', margin: '12px 0' }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: '#1B4332' }}>Total</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '22px', color: '#1B4332' }}>₹{totalAmount.toLocaleString('en-IN')}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {['UPI', 'Cards', 'Net Banking', 'Wallets'].map(m => (
            <span key={m} style={{ padding: '4px 12px', background: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', fontFamily: 'var(--font-body)', fontSize: '12px', color: '#64748B' }}>{m}</span>
          ))}
        </div>
        <ErrorBox msg={error}/>
        <PrimaryBtn onClick={handlePayment} loading={loading}>
          {loading ? 'Opening payment...' : `Pay ₹${totalAmount.toLocaleString('en-IN')} securely`}
        </PrimaryBtn>
        <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', marginTop: '10px' }}>🔒 Secured by Razorpay · 256-bit SSL</p>
      </Card>
    </PageLayout>
  )

  // ── Student count ───────────────────────────────────────────────────────────
  if (step === 'students_count') return (
    <PageLayout>
      <Card>
        <StepBar step={step}/>
        <button onClick={() => setStep('parent')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', fontFamily: 'var(--font-body)', fontSize: '13px', marginBottom: '20px', padding: 0 }}>← Back</button>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '22px', color: '#1B4332', marginBottom: '4px' }}>How many children?</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>Select how many children to register. Maximum 2 per family.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          {([1, 2] as const).map(count => (
            <button key={count} onClick={() => setStudentCount(count)}
              style={{ padding: '24px 16px', borderRadius: '16px', cursor: 'pointer', textAlign: 'center', border: studentCount === count ? '2px solid #1B4332' : '1.5px solid #E5E7EB', background: studentCount === count ? '#F0FDF4' : 'white', transition: 'all 0.15s' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '40px', color: '#1B4332', lineHeight: 1, marginBottom: '4px' }}>{count}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#64748B', marginBottom: '12px' }}>{count === 1 ? 'student' : 'students'}</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color: '#1B4332' }}>₹{(PRICE * count).toLocaleString('en-IN')}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>per year</p>
            </button>
          ))}
        </div>
        <PrimaryBtn onClick={() => setStep('payment')}>Continue to payment →</PrimaryBtn>
      </Card>
    </PageLayout>
  )

  // ── Parent details (Step 1) ─────────────────────────────────────────────────
  return (
    <PageLayout>
      <Card>
        <StepBar step={step}/>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', color: '#1B4332', marginBottom: '4px' }}>Create your parent account</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#64748B', marginBottom: '28px', lineHeight: 1.6 }}>
          You register, you pay, you set everything up. Your child just logs in and learns.
        </p>
        <form onSubmit={handleParentSubmit}>
          <Input label="Your full name" value={parentName} onChange={setParentName} placeholder="Enter your full name" required/>
          <Input label="Your email address" type="email" value={parentEmail} onChange={setParentEmail} placeholder="you@example.com" hint="Invoice and updates will be sent here" required/>
          <Input label="Create a password" type="password" value={parentPassword} onChange={setParentPassword} placeholder="Minimum 8 characters" required/>
          <Input label="Confirm password" type="password" value={parentConfirm} onChange={setParentConfirm} placeholder="Re-enter your password" required/>
          <ErrorBox msg={error}/>
          <PrimaryBtn>Continue →</PrimaryBtn>
          <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', marginTop: '10px' }}>By registering you agree to our terms of service.</p>
        </form>
        <div style={{ height: '1px', background: '#F1F5F9', margin: '20px 0' }}/>
        <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#64748B' }}>
          Already registered? <Link href="/login" style={{ color: '#1B4332', fontFamily: 'var(--font-heading)', fontWeight: 700, textDecoration: 'none' }}>Log in</Link>
        </p>
      </Card>
    </PageLayout>
  )
}
