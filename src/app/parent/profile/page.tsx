'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'

export default function ParentProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<{ full_name:string; email:string }|null>(null)
  const [child,   setChild]   = useState<{ full_name:string; email:string }|null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data:{ user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data:p } = await supabase.from('profiles').select('full_name, email').eq('id', user.id).single()
      setProfile(p)
      const { data:l } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id).single()
      if (l) {
        const { data:c } = await supabase.from('profiles').select('full_name, email').eq('id', l.student_id).single()
        setChild(c)
      }
      setLoading(false)
    }
    load()
  }, [router])

  const Row = ({ label, value }: { label:string; value:string }) => (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 18px', borderBottom:'1px solid #F9FAFB' }}>
      <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280' }}>{label}</p>
      <p style={{ fontFamily:'var(--font-body)', fontWeight:500, fontSize:'14px', color:'#1B4332' }}>{value}</p>
    </div>
  )

  if (loading) return (
    <ParentSidebarLayout>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'60vh' }}>
        <p style={{ fontFamily:'var(--font-body)', color:'#9CA3AF', fontSize:'14px' }}>Loading...</p>
      </div>
    </ParentSidebarLayout>
  )

  return (
    <ParentSidebarLayout parentName={profile?.full_name||'Parent'}>
      <div style={{ maxWidth:'560px', padding:'28px 28px 60px' }}>
        <h1 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'22px', color:'#1B4332', marginBottom:'4px' }}>Profile</h1>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280', marginBottom:'24px' }}>Your account and linked child details</p>

        {/* Avatar */}
        <div style={{ background:'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius:'16px', padding:'24px', textAlign:'center', marginBottom:'20px' }}>
          <div style={{ width:'60px', height:'60px', minWidth:'60px', borderRadius:'50%', background:'#74C69D', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'22px', color:'#1B4332', margin:'0 auto 12px' }}>
            {(profile?.full_name||'P').charAt(0)||'P'}
          </div>
          <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'18px', color:'white', marginBottom:'3px' }}>{profile?.full_name||'Parent'}</p>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'rgba(255,255,255,0.6)' }}>{profile?.email}</p>
        </div>

        <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'10px' }}>Your account</p>
        <div style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', overflow:'hidden', marginBottom:'20px' }}>
          <Row label="Full name" value={profile?.full_name||'—'}/>
          <Row label="Email" value={profile?.email||'—'}/>
          <Row label="Role" value="Parent"/>
        </div>

        <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'10px' }}>Child account</p>
        <div style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', overflow:'hidden' }}>
          <Row label="Full name" value={child?.full_name||'—'}/>
          <Row label="School Gmail" value={child?.email||'—'}/>
          <Row label="Grade" value="Grade 6"/>
        </div>
      </div>
    </ParentSidebarLayout>
  )
}
