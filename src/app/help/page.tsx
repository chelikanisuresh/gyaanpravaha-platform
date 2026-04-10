'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const ISSUE_TYPES = [
  { value: 'login',     label: 'Login problem',    emoji: '🔐', desc: 'Cannot log in or forgot password' },
  { value: 'technical', label: 'Technical problem', emoji: '🔧', desc: 'Something is broken or not loading' },
  { value: 'content',   label: 'Content issue',     emoji: '📚', desc: 'Error in lesson, quiz or writing prompt' },
  { value: 'billing',   label: 'Billing query',     emoji: '💳', desc: 'Payment or subscription question' },
  { value: 'other',     label: 'Other',              emoji: '💬', desc: 'Any other question or concern' },
]

export default function PublicHelpPage() {
  const [type,        setType]        = useState('')
  const [fullName,    setFullName]    = useState('')
  const [email,       setEmail]       = useState('')
  const [phone,       setPhone]       = useState('')
  const [childName,   setChildName]   = useState('')
  const [childEmail,  setChildEmail]  = useState('')
  const [description, setDescription] = useState('')
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState('')
  const [submitted,   setSubmitted]   = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!type)             { setError('Please select an issue type.'); return }
    if (!fullName.trim())  { setError('Please enter your full name.'); return }
    if (!email.trim())     { setError('Please enter your email address.'); return }
    if (!description.trim()) { setError('Please describe your issue.'); return }

    setLoading(true)
    try {
      const supabase = createClient()
      const { data, error: insertError } = await supabase
        .from('public_support_tickets')
        .insert({
          full_name:   fullName.trim(),
          email:       email.trim(),
          phone:       phone.trim() || null,
          child_name:  childName.trim() || null,
          child_email: childEmail.trim() || null,
          type,
          description: description.trim(),
        })
        .select('ticket_ref')
        .single()

      if (insertError) throw insertError
      setSubmitted(data.ticket_ref)
    } catch (err: any) {
      setError(err.message || 'Failed to submit. Please try again or email hello@gyaanpravaha.in')
    }
    setLoading(false)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px',
    fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1F2937',
    background: 'white', border: '1.5px solid #E5E7EB', borderRadius: '10px',
    outline: 'none', transition: 'border-color 0.15s',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontFamily: 'var(--font-heading)', fontWeight: 700,
    fontSize: '12px', color: '#6B7280', marginBottom: '6px',
    textTransform: 'uppercase', letterSpacing: '0.05em',
  }

  if (submitted) return (
    <div style={{ minHeight: '100vh', background: '#F8FAF9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #E5E7EB', padding: '48px 40px', maxWidth: '460px', width: '100%', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#D8F3DC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M4 14l7 7 13-13" stroke="#2D6A4F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '22px', color: '#1B4332', marginBottom: '8px' }}>
          Ticket raised!
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280', lineHeight: 1.7, marginBottom: '12px' }}>
          Your ticket reference is:
        </p>
        <div style={{ background: '#F0FDF4', border: '1px solid #D8F3DC', borderRadius: '10px', padding: '12px 20px', marginBottom: '20px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color: '#1B4332' }}>{submitted}</p>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7280', lineHeight: 1.6, marginBottom: '28px' }}>
          We will respond to <strong>{email}</strong> within 24 hours on working days. Please save your ticket reference for follow-up.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <Link href="/login" style={{ background: '#2D6A4F', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none' }}>
            Go to login
          </Link>
          <Link href="/" style={{ background: '#F3F4F6', color: '#374151', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none' }}>
            Home
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAF9' }}>

      {/* Simple header */}
      <div style={{ background: 'white', borderBottom: '1px solid #E5E7EB', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '34px', height: '34px', background: '#1B4332', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M6 8h8M10 4v8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="10" cy="8" r="1.2" fill="#74C69D"/>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '15px', color: '#1B4332', lineHeight: 1 }}>Gyaanpravaha</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#9CA3AF', marginTop: '2px' }}>ज्ञानप्रवाह</p>
          </div>
        </Link>
        <Link href="/login" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#2D6A4F', textDecoration: 'none' }}>
          Back to login →
        </Link>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '36px 24px 60px' }}>

        {/* Page heading */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: '#1B4332', marginBottom: '8px' }}>
            How can we help you?
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7280', lineHeight: 1.6 }}>
            No login needed. Fill in the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>

          {/* ── FORM ── */}
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '28px' }}>

            {/* Issue type */}
            <p style={labelStyle}>What is your issue?</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
              {ISSUE_TYPES.map(({ value, label, emoji, desc }) => (
                <button key={value} type="button" onClick={() => setType(value)} style={{
                  padding: '12px', borderRadius: '10px', textAlign: 'left', cursor: 'pointer',
                  border: `1.5px solid ${type === value ? '#2D6A4F' : '#E5E7EB'}`,
                  background: type === value ? '#F0FDF4' : 'white',
                  transition: 'all 0.15s',
                }}>
                  <p style={{ fontSize: '16px', marginBottom: '4px' }}>{emoji}</p>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: type === value ? '#1B4332' : '#374151', marginBottom: '2px' }}>{label}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', lineHeight: 1.3 }}>{desc}</p>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Your details */}
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332', paddingBottom: '8px', borderBottom: '1px solid #F3F4F6' }}>
                Your details
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Full name <span style={{ color: '#EF4444' }}>*</span></label>
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required placeholder="Your full name" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#2D6A4F'} onBlur={e => e.target.style.borderColor = '#E5E7EB'}/>
                </div>
                <div>
                  <label style={labelStyle}>Email address <span style={{ color: '#EF4444' }}>*</span></label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#2D6A4F'} onBlur={e => e.target.style.borderColor = '#E5E7EB'}/>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Phone number <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(optional)</span></label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#2D6A4F'} onBlur={e => e.target.style.borderColor = '#E5E7EB'}/>
              </div>

              {/* Child details */}
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332', paddingBottom: '8px', borderBottom: '1px solid #F3F4F6', marginTop: '4px' }}>
                Child details <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '12px', color: '#9CA3AF' }}>(helps us locate the account faster)</span>
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Child&apos;s name <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(optional)</span></label>
                  <input type="text" value={childName} onChange={e => setChildName(e.target.value)} placeholder="Child's full name" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#2D6A4F'} onBlur={e => e.target.style.borderColor = '#E5E7EB'}/>
                </div>
                <div>
                  <label style={labelStyle}>Child&apos;s school Gmail <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(optional)</span></label>
                  <input type="email" value={childEmail} onChange={e => setChildEmail(e.target.value)} placeholder="child@school.edu" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#2D6A4F'} onBlur={e => e.target.style.borderColor = '#E5E7EB'}/>
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={labelStyle}>Describe your issue <span style={{ color: '#EF4444' }}>*</span></label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} required
                  placeholder="Tell us exactly what happened, what you expected, and what you saw instead. The more detail you give us, the faster we can help."
                  style={{ ...inputStyle, minHeight: '110px', resize: 'vertical', lineHeight: 1.6 }}
                  onFocus={e => e.target.style.borderColor = '#2D6A4F'} onBlur={e => e.target.style.borderColor = '#E5E7EB'}
                />
              </div>

              {error && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '9px', padding: '11px 14px' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#991B1B' }}>⚠️ {error}</p>
                </div>
              )}

              <button type="submit" disabled={loading} style={{ background: '#2D6A4F', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', padding: '13px', borderRadius: '10px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'opacity 0.15s' }}>
                {loading ? 'Submitting...' : '🎫 Submit ticket'}
              </button>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', textAlign: 'center' }}>
                Fields marked <span style={{ color: '#EF4444' }}>*</span> are required
              </p>
            </form>
          </div>

          {/* ── RIGHT — Info ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* Contact */}
            <div style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '14px', padding: '20px' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white', marginBottom: '8px' }}>📬 Email us directly</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: '10px' }}>
                For urgent issues write directly to:
              </p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#74C69D' }}>hello@gyaanpravaha.in</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>
                We respond within 24 hours on working days.
              </p>
            </div>

            {/* Response times */}
            <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '18px' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332', marginBottom: '12px' }}>⏱️ Response times</p>
              {[
                { type: '🔐 Login problem',    time: 'Within 2 hours',  color: '#EF4444' },
                { type: '🔧 Technical problem', time: 'Within 4 hours',  color: '#10B981' },
                { type: '📚 Content issue',     time: 'Within 24 hours', color: '#F59E0B' },
                { type: '💳 Billing query',     time: 'Within 24 hours', color: '#F59E0B' },
                { type: '💬 Other',             time: 'Within 48 hours', color: '#9CA3AF' },
              ].map(({ type, time, color }) => (
                <div key={type} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#374151' }}>{type}</p>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color }}>{time}</span>
                </div>
              ))}
            </div>

            {/* Already have an account */}
            <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '14px', padding: '16px' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#92400E', marginBottom: '6px' }}>
                Already have an account?
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#B45309', lineHeight: 1.5, marginBottom: '12px' }}>
                If you can log in, you can also raise tickets from inside the parent dashboard under Help.
              </p>
              <Link href="/login" style={{ display: 'block', background: '#1B4332', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', padding: '9px 14px', borderRadius: '8px', textDecoration: 'none', textAlign: 'center' }}>
                Go to login →
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
