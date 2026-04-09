'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'

export default function ParentProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<{ full_name: string; email: string } | null>(null)
  const [child, setChild] = useState<{ full_name: string; email: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data: p } = await supabase.from('profiles').select('full_name, email').eq('id', user.id).single()
      setProfile(p)

      const { data: links } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id).single()
      if (links) {
        const { data: c } = await supabase.from('profiles').select('full_name, email').eq('id', links.student_id).single()
        setChild(c)
      }
      setLoading(false)
    }
    fetchData()
  }, [router])

  if (loading) return (
    <ParentSidebarLayout>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <p style={{ fontFamily: 'var(--font-heading)', color: '#2D6A4F', fontSize: '15px' }}>Loading...</p>
      </div>
    </ParentSidebarLayout>
  )

  return (
    <ParentSidebarLayout parentName={profile?.full_name || 'Parent'}>
      <div style={{ maxWidth: '580px', padding: '28px 28px 60px' }}>

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #1B4332, #2D6A4F)', borderRadius: '18px', padding: '28px', textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ width: '64px', height: '64px', minWidth: '64px', borderRadius: '50%', background: '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', color: 'white', margin: '0 auto 14px' }}>
            {profile?.full_name?.charAt(0) || 'P'}
          </div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: 'white', marginBottom: '4px' }}>{profile?.full_name || 'Parent'}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{profile?.email}</p>
        </div>

        {/* Parent details */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden', marginBottom: '14px' }}>
          <div style={{ padding: '12px 20px', borderBottom: '1px solid #F3F4F6' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Your account</p>
          </div>
          {[
            { label: 'Full name', value: profile?.full_name || '—', emoji: '👤' },
            { label: 'Email',     value: profile?.email || '—',      emoji: '📧' },
            { label: 'Role',      value: 'Parent',                   emoji: '👨‍👩‍👧' },
          ].map(({ label, value, emoji }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', borderBottom: '1px solid #F9FAFB' }}>
              <span style={{ fontSize: '16px' }}>{emoji}</span>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#9CA3AF', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '14px', color: '#1B4332' }}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Child details */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden', marginBottom: '14px' }}>
          <div style={{ padding: '12px 20px', borderBottom: '1px solid #F3F4F6' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Child account</p>
          </div>
          {[
            { label: 'Name',         value: child?.full_name || '—', emoji: '🎓' },
            { label: 'Login email',  value: child?.email || '—',     emoji: '📧' },
            { label: 'Grade',        value: 'Grade 6',               emoji: '📚' },
          ].map(({ label, value, emoji }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', borderBottom: '1px solid #F9FAFB' }}>
              <span style={{ fontSize: '16px' }}>{emoji}</span>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#9CA3AF', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '14px', color: '#1B4332' }}>{value}</p>
              </div>
            </div>
          ))}
        </div>



      </div>
    </ParentSidebarLayout>
  )
}
