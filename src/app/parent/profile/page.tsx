'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'
import PageShell from '@/components/PageShell'

export default function ParentProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<{ full_name: string; email: string } | null>(null)
  const [child, setChild] = useState<{ full_name: string; email: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: p } = await supabase.from('profiles').select('full_name, email').eq('id', user.id).single()
      setProfile(p)
      const { data: l } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id).single()
      if (l) {
        const { data: c } = await supabase.from('profiles').select('full_name, email').eq('id', l.student_id).single()
        setChild(c)
      }
      setLoading(false)
    }
    load()
  }, [router])

  if (loading) return (
    <ParentSidebarLayout>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-400)' }}>Loading...</p>
      </div>
    </ParentSidebarLayout>
  )

  return (
    <ParentSidebarLayout parentName={profile?.full_name || 'Parent'}>
      <PageShell title="Profile" subtitle="Your account and linked child details" maxWidth="580px">

        {/* Parent */}
        <p className="uppercase-label" style={{ marginBottom: '10px' }}>Your account</p>
        <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '24px' }}>
          {[
            { label: 'Full name', value: profile?.full_name || '—' },
            { label: 'Email',     value: profile?.email || '—' },
            { label: 'Role',      value: 'Parent' },
          ].map(({ label, value }, i, arr) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 20px', borderBottom: i < arr.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-500)' }}>{label}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px', color: 'var(--gray-900)' }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Child */}
        <p className="uppercase-label" style={{ marginBottom: '10px' }}>Child account</p>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {[
            { label: 'Full name',   value: child?.full_name || '—' },
            { label: 'School Gmail', value: child?.email || '—' },
            { label: 'Grade',        value: 'Grade 6' },
          ].map(({ label, value }, i, arr) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 20px', borderBottom: i < arr.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-500)' }}>{label}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px', color: 'var(--gray-900)' }}>{value}</p>
            </div>
          ))}
        </div>

      </PageShell>
    </ParentSidebarLayout>
  )
}
