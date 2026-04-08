'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'

const STREAK = 5
const CHAPTERS_DONE = 3
const TOTAL_CHAPTERS = 8
const AVG_SCORE = 85

export default function StudentProfile() {
  const router = useRouter()
  const [profile, setProfile] = useState<{ full_name: string; email: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwMessage, setPwMessage] = useState('')
  const [pwError, setPwError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data } = await supabase
        .from('profiles')
        .select('full_name, email')
        .eq('id', user.id)
        .single()
      setProfile(data)
      setLoading(false)
    }
    fetchProfile()
  }, [router])

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPwError('')
    setPwMessage('')
    if (newPassword !== confirmPassword) { setPwError('Passwords do not match.'); return }
    if (newPassword.length < 8) { setPwError('Password must be at least 8 characters.'); return }
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) { setPwError('Could not update password. Please try again.') }
    else { setPwMessage('Password updated successfully!'); setNewPassword(''); setConfirmPassword(''); setShowPasswordForm(false) }
    setSaving(false)
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#F8FAF9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'var(--font-heading)', color: '#2D6A4F', fontSize: '16px' }}>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAF9' }}>
      <Navbar rightContent={
        <Link href="/student/dashboard" className="btn-outline" style={{ padding: '7px 16px', fontSize: '13px' }}>
          ← Dashboard
        </Link>
      }/>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '32px 5% 60px' }}>

        {/* Profile header */}
        <div style={{ background: 'linear-gradient(135deg, #1B4332, #2D6A4F)', borderRadius: '20px', padding: '32px', textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: '#74C69D', margin: '0 auto 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: '#1B4332',
          }}>
            {profile?.full_name?.[0] || 'S'}
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '22px', color: 'white', marginBottom: '4px' }}>
            {profile?.full_name || 'Student'}
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>
            {profile?.email}
          </p>
          {/* Quick stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
            {[
              { label: 'Chapters', value: `${CHAPTERS_DONE}/${TOTAL_CHAPTERS}` },
              { label: 'Avg score', value: `${AVG_SCORE}%` },
              { label: 'Streak', value: `${STREAK} days` },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 8px' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: 'white', marginBottom: '2px' }}>{value}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.55)' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Account details */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden', marginBottom: '14px' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Account details</p>
          </div>
          {[
            { label: 'Full name',    value: profile?.full_name || '—', icon: '👤' },
            { label: 'Login email',  value: profile?.email || '—',      icon: '📧' },
            { label: 'Account type', value: 'Student',                   icon: '🎓' },
          ].map(({ label, value, icon }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 20px', borderBottom: '1px solid #F9FAFB' }}>
              <span style={{ fontSize: '18px', flexShrink: 0 }}>{icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '14px', color: '#1B4332' }}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Password section */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden', marginBottom: '14px' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Security</p>
          </div>
          <div style={{ padding: '16px 20px' }}>
            {!showPasswordForm ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '18px' }}>🔑</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Password</p>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '14px', color: '#1B4332' }}>••••••••</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPasswordForm(true)}
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#2D6A4F', background: '#D8F3DC', border: 'none', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer' }}
                >
                  Change
                </button>
              </div>
            ) : (
              <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label className="label" htmlFor="newPw">New password</label>
                  <input id="newPw" type="password" className="input" placeholder="Minimum 8 characters" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={8}/>
                </div>
                <div>
                  <label className="label" htmlFor="confirmPw">Confirm new password</label>
                  <input id="confirmPw" type="password" className="input" placeholder="Re-enter new password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required/>
                </div>
                {pwError && <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#EF4444' }}>{pwError}</p>}
                {pwMessage && <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#10B981' }}>{pwMessage}</p>}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" disabled={saving} className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '11px', fontSize: '14px', opacity: saving ? 0.7 : 1 }}>
                    {saving ? 'Saving...' : 'Update password'}
                  </button>
                  <button type="button" onClick={() => { setShowPasswordForm(false); setPwError(''); setNewPassword(''); setConfirmPassword('') }} className="btn-outline" style={{ padding: '11px 18px', fontSize: '14px' }}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Subscription */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden', marginBottom: '14px' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Subscription</p>
          </div>
          <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '18px' }}>📅</span>
              <div>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', marginBottom: '2px' }}>Annual plan — Active</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>Renews: March 2027</p>
              </div>
            </div>
            <span style={{ background: '#D8F3DC', color: '#1B4332', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', padding: '5px 12px', borderRadius: '20px' }}>
              Active
            </span>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            width: '100%', padding: '14px', borderRadius: '12px',
            border: '1.5px solid #FECACA', background: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: '#EF4444',
            cursor: 'pointer', transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#FEF2F2')}
          onMouseLeave={e => (e.currentTarget.style.background = 'white')}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 16H4a1 1 0 01-1-1V3a1 1 0 011-1h3M11 13l4-4-4-4M15 9H7" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Log out
        </button>

      </div>
    </div>
  )
}
