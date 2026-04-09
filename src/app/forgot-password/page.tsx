'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (resetError) {
      setError(resetError.message || 'Failed to send reset email. Please try again.')
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  if (sent) return (
    <div style={{ minHeight:'100vh', background:'#F8FAF9', display:'flex', alignItems:'center', justifyContent:'center', padding:'24px' }}>
      <div style={{ background:'white', borderRadius:'20px', border:'1px solid #E5E7EB', padding:'40px', maxWidth:'420px', width:'100%', textAlign:'center', boxShadow:'0 4px 24px rgba(0,0,0,0.06)' }}>
        <div style={{ width:'64px', height:'64px', borderRadius:'50%', background:'#D8F3DC', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M4 14l7 7 13-13" stroke="#2D6A4F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'22px', color:'#1B4332', marginBottom:'10px' }}>Check your email</h2>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280', lineHeight:1.7, marginBottom:'8px' }}>
          We sent a password reset link to
        </p>
        <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'15px', color:'#1B4332', marginBottom:'24px' }}>
          {email}
        </p>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#9CA3AF', lineHeight:1.6, marginBottom:'28px' }}>
          Click the link in the email to reset your password. The link expires in 1 hour. Check your spam folder if you do not see it.
        </p>
        <Link href="/login" style={{ display:'block', background:'#2D6A4F', color:'white', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', padding:'12px', borderRadius:'10px', textDecoration:'none', textAlign:'center' }}>
          Back to login
        </Link>
        <button
          onClick={() => { setSent(false); setEmail('') }}
          style={{ background:'none', border:'none', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:'13px', color:'#9CA3AF', marginTop:'16px', display:'block', width:'100%' }}>
          Try a different email
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'#F8FAF9', display:'flex', alignItems:'center', justifyContent:'center', padding:'24px' }}>
      <div style={{ background:'white', borderRadius:'20px', border:'1px solid #E5E7EB', padding:'40px', maxWidth:'420px', width:'100%', boxShadow:'0 4px 24px rgba(0,0,0,0.06)' }}>

        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:'32px' }}>
          <div style={{ width:'48px', height:'48px', background:'#1B4332', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}>
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
              <path d="M6 8h8M10 4v8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="10" cy="8" r="1.2" fill="#74C69D"/>
            </svg>
          </div>
          <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'18px', color:'#1B4332', lineHeight:1 }}>Gyaanpravaha</p>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'#9CA3AF', marginTop:'3px' }}>ज्ञानप्रवाह</p>
        </div>

        <h1 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'22px', color:'#1B4332', marginBottom:'6px' }}>Forgot password?</h1>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280', lineHeight:1.6, marginBottom:'28px' }}>
          Enter your parent account email and we will send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          <div>
            <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'#6B7280', marginBottom:'6px', textTransform:'uppercase', letterSpacing:'0.05em' }}>
              Parent email address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              style={{ width:'100%', padding:'11px 14px', fontFamily:'var(--font-body)', fontSize:'15px', color:'#1F2937', background:'white', border:'1.5px solid #E5E7EB', borderRadius:'10px', outline:'none', transition:'border-color 0.15s' }}
              onFocus={e => e.target.style.borderColor='#2D6A4F'}
              onBlur={e => e.target.style.borderColor='#E5E7EB'}
            />
          </div>

          {error && (
            <div style={{ background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:'9px', padding:'11px 14px' }}>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#991B1B' }}>⚠️ {error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ background:'#2D6A4F', color:'white', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'15px', padding:'12px', borderRadius:'10px', border:'none', cursor:loading?'not-allowed':'pointer', opacity:loading?0.7:1, transition:'opacity 0.15s' }}>
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </form>

        <div style={{ textAlign:'center', marginTop:'24px', paddingTop:'24px', borderTop:'1px solid #F3F4F6' }}>
          <Link href="/login" style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280', textDecoration:'none' }}>
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
