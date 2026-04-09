'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

function ResetPasswordInner() {
  const router      = useRouter()
  const searchParams = useSearchParams()
  const [pw,        setPw]        = useState('')
  const [confirm,   setConfirm]   = useState('')
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')
  const [done,      setDone]      = useState(false)
  const [validLink, setValidLink] = useState(true)

  useEffect(() => {
    // Supabase puts the session tokens in the URL hash when redirect happens
    // The client SDK picks them up automatically — we just need to verify
    const supabase = createClient()
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setValidLink(true)
      }
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (pw !== confirm) { setError('Passwords do not match.'); return }
    if (pw.length < 8)  { setError('Password must be at least 8 characters.'); return }

    setLoading(true)
    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({ password: pw })

    if (updateError) {
      setError(updateError.message || 'Failed to update password. Please try again.')
    } else {
      setDone(true)
      setTimeout(() => router.push('/login'), 3000)
    }
    setLoading(false)
  }

  if (!validLink) return (
    <div style={{ minHeight:'100vh', background:'#F8FAF9', display:'flex', alignItems:'center', justifyContent:'center', padding:'24px' }}>
      <div style={{ background:'white', borderRadius:'20px', border:'1px solid #E5E7EB', padding:'40px', maxWidth:'420px', width:'100%', textAlign:'center', boxShadow:'0 4px 24px rgba(0,0,0,0.06)' }}>
        <div style={{ width:'64px', height:'64px', borderRadius:'50%', background:'#FEF2F2', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 9v6M14 18h.01" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="14" cy="14" r="12" stroke="#EF4444" strokeWidth="2"/>
          </svg>
        </div>
        <h2 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'20px', color:'#1B4332', marginBottom:'10px' }}>Link expired</h2>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280', lineHeight:1.6, marginBottom:'24px' }}>
          This password reset link has expired or already been used. Please request a new one.
        </p>
        <Link href="/forgot-password" style={{ display:'block', background:'#2D6A4F', color:'white', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', padding:'12px', borderRadius:'10px', textDecoration:'none', textAlign:'center' }}>
          Request new link
        </Link>
      </div>
    </div>
  )

  if (done) return (
    <div style={{ minHeight:'100vh', background:'#F8FAF9', display:'flex', alignItems:'center', justifyContent:'center', padding:'24px' }}>
      <div style={{ background:'white', borderRadius:'20px', border:'1px solid #E5E7EB', padding:'40px', maxWidth:'420px', width:'100%', textAlign:'center', boxShadow:'0 4px 24px rgba(0,0,0,0.06)' }}>
        <div style={{ width:'64px', height:'64px', borderRadius:'50%', background:'#D8F3DC', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M4 14l7 7 13-13" stroke="#2D6A4F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'22px', color:'#1B4332', marginBottom:'10px' }}>Password updated!</h2>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280', lineHeight:1.6, marginBottom:'8px' }}>
          Your password has been changed successfully.
        </p>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#9CA3AF', marginBottom:'24px' }}>
          Redirecting you to login in a moment...
        </p>
        <Link href="/login" style={{ display:'block', background:'#2D6A4F', color:'white', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', padding:'12px', borderRadius:'10px', textDecoration:'none', textAlign:'center' }}>
          Go to login now
        </Link>
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

        <h1 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'22px', color:'#1B4332', marginBottom:'6px' }}>Set new password</h1>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280', lineHeight:1.6, marginBottom:'28px' }}>
          Choose a strong password for your Gyaanpravaha parent account.
        </p>

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          <div>
            <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'#6B7280', marginBottom:'6px', textTransform:'uppercase', letterSpacing:'0.05em' }}>
              New password
            </label>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              required
              minLength={8}
              placeholder="Minimum 8 characters"
              style={{ width:'100%', padding:'11px 14px', fontFamily:'var(--font-body)', fontSize:'15px', color:'#1F2937', background:'white', border:'1.5px solid #E5E7EB', borderRadius:'10px', outline:'none', transition:'border-color 0.15s' }}
              onFocus={e => e.target.style.borderColor='#2D6A4F'}
              onBlur={e => e.target.style.borderColor='#E5E7EB'}
            />
          </div>

          <div>
            <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'#6B7280', marginBottom:'6px', textTransform:'uppercase', letterSpacing:'0.05em' }}>
              Confirm new password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              placeholder="Re-enter your new password"
              style={{ width:'100%', padding:'11px 14px', fontFamily:'var(--font-body)', fontSize:'15px', color:'#1F2937', background:'white', border:'1.5px solid #E5E7EB', borderRadius:'10px', outline:'none', transition:'border-color 0.15s' }}
              onFocus={e => e.target.style.borderColor='#2D6A4F'}
              onBlur={e => e.target.style.borderColor='#E5E7EB'}
            />
          </div>

          {/* Password strength hint */}
          {pw.length > 0 && (
            <div style={{ background:'#F8FAF9', borderRadius:'8px', padding:'10px 14px' }}>
              {[
                { label:'At least 8 characters', pass: pw.length >= 8 },
                { label:'Contains a number',     pass: /\d/.test(pw) },
                { label:'Contains a letter',     pass: /[a-zA-Z]/.test(pw) },
              ].map(({ label, pass }) => (
                <div key={label} style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px' }}>
                  <span style={{ fontSize:'12px', color: pass ? '#10B981' : '#D1D5DB' }}>{pass ? '✓' : '○'}</span>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color: pass ? '#10B981' : '#9CA3AF' }}>{label}</p>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div style={{ background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:'9px', padding:'11px 14px' }}>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#991B1B' }}>⚠️ {error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ background:'#2D6A4F', color:'white', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'15px', padding:'12px', borderRadius:'10px', border:'none', cursor:loading?'not-allowed':'pointer', opacity:loading?0.7:1, transition:'opacity 0.15s' }}>
            {loading ? 'Updating...' : 'Update password'}
          </button>
        </form>

      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<></>}>
      <ResetPasswordInner />
    </Suspense>
  )
}
