'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'

export default function ParentPasswordPage() {
  const [child, setChild] = useState<{ name: string; id: string } | null>(null)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchChild = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: links } = await supabase
        .from('parent_student_links').select('student_id').eq('parent_id', user.id).single()
      if (!links) return

      const { data: profile } = await supabase
        .from('profiles').select('id, full_name').eq('id', links.student_id).single()
      if (profile) setChild({ id: profile.id, name: profile.full_name || 'Student' })
    }
    fetchChild()
  }, [])

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (newPassword !== confirmPassword) { setError('Passwords do not match.'); return }
    if (newPassword.length < 8) { setError('Password must be at least 8 characters.'); return }

    setLoading(true)
    const res = await fetch('/api/reset-child-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ childId: child?.id, newPassword }),
    })

    if (res.ok) {
      setMessage(`Password updated successfully! Share the new password with ${child?.name}.`)
      setNewPassword('')
      setConfirmPassword('')
    } else {
      setError('Failed to update password. Please try again.')
    }
    setLoading(false)
  }

  return (
    <ParentSidebarLayout>
      <div style={{ maxWidth: '520px', padding: '28px 28px 60px' }}>

        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: '#1B4332', marginBottom: '6px' }}>
            {child?.name ? `${child.name}'s password` : 'Child password'}
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280', lineHeight: 1.6 }}>
            Only you as the parent can change your child's login password. After updating, share the new password with your child so they can log in.
          </p>
        </div>

        {/* Info card */}
        <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '14px', padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ fontSize: '20px', flexShrink: 0 }}>💡</span>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#92400E', marginBottom: '4px' }}>Password tips</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#B45309', lineHeight: 1.6 }}>
              Choose a password that is easy for your child to remember but hard to guess. Avoid using their name or birthday. A mix of letters and numbers works well.
            </p>
          </div>
        </div>

        {/* Form */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #F3F4F6' }}>
            <div style={{ width: '44px', height: '44px', minWidth: '44px', borderRadius: '50%', background: '#D8F3DC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: '#1B4332' }}>
              {child?.name?.charAt(0) || 'S'}
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: '#1B4332', marginBottom: '2px' }}>{child?.name || 'Student'}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>Student account</p>
            </div>
          </div>

          {message && (
            <div style={{ background: '#D8F3DC', border: '1px solid #A7F3D0', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px' }}>✅</span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#065F46' }}>{message}</p>
            </div>
          )}

          <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label className="label" htmlFor="newPw">New password</label>
              <input
                id="newPw" type="password" className="input"
                placeholder="Minimum 8 characters"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required minLength={8}
              />
            </div>
            <div>
              <label className="label" htmlFor="confirmPw">Confirm new password</label>
              <input
                id="confirmPw" type="password" className="input"
                placeholder="Re-enter the password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="8" cy="8" r="7" stroke="#EF4444" strokeWidth="1.5"/>
                  <path d="M8 5v3.5M8 11h.01" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#991B1B' }}>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !child}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px', opacity: (loading || !child) ? 0.7 : 1, cursor: (loading || !child) ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Updating...' : 'Update password'}
            </button>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', textAlign: 'center' }}>
              After updating, share the new password with {child?.name || 'your child'} so they can log in.
            </p>
          </form>
        </div>

      </div>
    </ParentSidebarLayout>
  )
}
