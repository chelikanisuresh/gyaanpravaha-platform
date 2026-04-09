'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import SidebarLayout from '@/components/SidebarLayout'

const STREAK = 5
const CHAPTERS_DONE = 3
const TOTAL_CHAPTERS = 8
const AVG_SCORE = 85

export default function StudentProfile() {
  const router = useRouter()
  const [profile, setProfile] = useState<{ full_name: string; email: string } | null>(null)
  const [loading, setLoading] = useState(true)


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
    <SidebarLayout studentName={profile?.full_name || 'Student'}>
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '32px 32px 60px' }}>

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

        {/* Password — parent controlled */}
        <div style={{ background: '#FEF3C7', borderRadius: '16px', border: '1px solid #FDE68A', padding: '16px 20px', marginBottom: '14px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
          <span style={{ fontSize: '20px', flexShrink: 0 }}>🔑</span>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#92400E', marginBottom: '4px' }}>Password is managed by your parent</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#B45309', lineHeight: 1.6 }}>
              If you need to change your password, ask your parent to update it from their account. Your parent set the password during registration and controls it.
            </p>
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



      </div>
    </SidebarLayout>
  )
}
