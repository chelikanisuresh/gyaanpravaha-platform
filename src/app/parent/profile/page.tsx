'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'

interface Child { full_name:string; email:string }

export default function ParentProfilePage() {
  const router = useRouter()
  const [profile,  setProfile]  = useState<{ full_name:string; email:string }|null>(null)
  const [children, setChildren] = useState<Child[]>([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data:{ user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data:p } = await supabase.from('profiles').select('full_name, email').eq('id', user.id).maybeSingle()
      setProfile(p)
      const { data:links } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id)
      if (links?.length) {
        const { data:profiles } = await supabase.from('profiles').select('full_name, email').in('id', links.map(l=>l.student_id))
        if (profiles) setChildren(profiles as Child[])
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
      <style>{`@media(max-width:900px){.pf-grid{grid-template-columns:1fr !important}}`}</style>
      <div style={{ padding:'28px 28px 60px' }}>
        <h1 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'22px', color:'#1B4332', marginBottom:'4px' }}>Profile</h1>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280', marginBottom:'24px' }}>Your account and linked children</p>

        <div className="pf-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', alignItems:'start' }}>

          {/* Left — parent */}
          <div>
            {/* Avatar card */}
            <div style={{ background:'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius:'16px', padding:'28px', textAlign:'center', marginBottom:'16px' }}>
              <div style={{ width:'64px', height:'64px', minWidth:'64px', borderRadius:'50%', background:'#74C69D', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'24px', color:'#1B4332', margin:'0 auto 14px' }}>
                {(profile?.full_name||'P').charAt(0)}
              </div>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'20px', color:'white', marginBottom:'4px' }}>{profile?.full_name||'Parent'}</p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'rgba(255,255,255,0.6)' }}>{profile?.email}</p>
              <span style={{ display:'inline-block', background:'rgba(116,198,157,0.2)', color:'#74C69D', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', padding:'4px 12px', borderRadius:'20px', marginTop:'10px' }}>Parent account</span>
            </div>

            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'10px' }}>Account details</p>
            <div style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', overflow:'hidden' }}>
              <Row label="Full name" value={profile?.full_name||'—'}/>
              <Row label="Email" value={profile?.email||'—'}/>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 18px' }}>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280' }}>Subscription</p>
                <span style={{ background:'#D8F3DC', color:'#1B4332', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', padding:'3px 10px', borderRadius:'20px' }}>Active · ₹{(children.length * 4999).toLocaleString('en-IN')}/yr</span>
              </div>
            </div>
          </div>

          {/* Right — children */}
          <div>
            <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'10px' }}>
              {children.length===1?'Child account':`Child accounts (${children.length})`}
            </p>

            {children.length===0 && (
              <div style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', padding:'24px', textAlign:'center' }}>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#9CA3AF' }}>No children linked yet.</p>
              </div>
            )}

            <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              {children.map((child,idx)=>(
                <div key={idx} style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', overflow:'hidden' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', padding:'12px 18px', borderBottom:'1px solid #F3F4F6', background:'#F8FAF9' }}>
                    <div style={{ width:'32px', height:'32px', minWidth:'32px', borderRadius:'50%', background:'#D8F3DC', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'13px', color:'#1B4332' }}>
                      {(child.full_name||'S').charAt(0)}
                    </div>
                    <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#1B4332' }}>
                      {child.full_name||'Student'}{children.length>1?` (Child ${idx+1})`:''}
                    </p>
                  </div>
                  <Row label="School Gmail" value={child.email||'—'}/>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 18px' }}>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280' }}>Grade</p>
                    <p style={{ fontFamily:'var(--font-body)', fontWeight:500, fontSize:'14px', color:'#1B4332' }}>Grade 6</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Visibility reminder */}
            <div style={{ background:'#F0FDF4', border:'1px solid #D8F3DC', borderRadius:'12px', padding:'14px 18px', marginTop:'16px' }}>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#1B4332', marginBottom:'6px' }}>👁️ Your visibility</p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#40916C', lineHeight:1.6 }}>
                You can see every chapter read, every quiz score, and every minute studied. We also tell you exactly where your child needs support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ParentSidebarLayout>
  )
}
