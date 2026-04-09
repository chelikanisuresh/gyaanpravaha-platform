'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'

export default function PasswordPage() {
  const [child,      setChild]      = useState<{ name:string; id:string }|null>(null)
  const [parentName, setParentName] = useState('Parent')
  const [pw,         setPw]         = useState('')
  const [confirm,    setConfirm]    = useState('')
  const [loading,    setLoading]    = useState(false)
  const [msg,        setMsg]        = useState('')
  const [err,        setErr]        = useState('')

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data:{ user } } = await supabase.auth.getUser()
      if (!user) return
      const { data:p } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
      if (p?.full_name) setParentName(p.full_name)
      const { data:l } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id).single()
      if (!l) return
      const { data:c } = await supabase.from('profiles').select('id, full_name').eq('id', l.student_id).single()
      if (c) setChild({ id:c.id, name:c.full_name||'Student' })
    }
    load()
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(''); setMsg('')
    if (pw !== confirm) { setErr('Passwords do not match.'); return }
    if (pw.length < 8)  { setErr('Minimum 8 characters.'); return }
    setLoading(true)
    const res = await fetch('/api/reset-child-password', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ childId:child?.id, newPassword:pw }),
    })
    if (res.ok) { setMsg(`Password updated! Share the new password with ${child?.name}.`); setPw(''); setConfirm('') }
    else setErr('Update failed. Please try again.')
    setLoading(false)
  }

  return (
    <ParentSidebarLayout parentName={parentName}>
      <div style={{ maxWidth:'520px', padding:'28px 28px 60px' }}>
        <h1 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'22px', color:'#1B4332', marginBottom:'4px' }}>Password</h1>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280', marginBottom:'24px' }}>
          {child ? `Change ${child.name}'s login password` : "Change your child's login password"}
        </p>

        <div style={{ background:'#FEF3C7', border:'1px solid #FDE68A', borderRadius:'12px', padding:'14px 18px', marginBottom:'24px', display:'flex', gap:'10px' }}>
          <span style={{ fontSize:'18px', flexShrink:0 }}>💡</span>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#92400E', lineHeight:1.6 }}>
            Only you can change your child&apos;s password. After updating, share it with them so they can log in.
          </p>
        </div>

        {msg && (
          <div style={{ background:'#D8F3DC', border:'1px solid #A7F3D0', borderRadius:'10px', padding:'12px 16px', marginBottom:'16px' }}>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#065F46' }}>✓ {msg}</p>
          </div>
        )}

        <div style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', padding:'22px' }}>
          {child && (
            <div style={{ display:'flex', alignItems:'center', gap:'10px', paddingBottom:'16px', marginBottom:'16px', borderBottom:'1px solid #F3F4F6' }}>
              <div style={{ width:'38px', height:'38px', minWidth:'38px', borderRadius:'50%', background:'#D8F3DC', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'15px', color:'#1B4332' }}>
                {child.name.charAt(0)}
              </div>
              <div>
                <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', color:'#1B4332' }}>{child.name}</p>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#9CA3AF' }}>Student account</p>
              </div>
            </div>
          )}
          <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
            <div>
              <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'#6B7280', marginBottom:'6px', textTransform:'uppercase', letterSpacing:'0.05em' }}>New password</label>
              <input type="password" placeholder="Minimum 8 characters" value={pw} onChange={e=>setPw(e.target.value)} required minLength={8}
                style={{ width:'100%', padding:'10px 14px', fontFamily:'var(--font-body)', fontSize:'14px', color:'#1F2937', background:'white', border:'1.5px solid #E5E7EB', borderRadius:'8px', outline:'none' }}/>
            </div>
            <div>
              <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'#6B7280', marginBottom:'6px', textTransform:'uppercase', letterSpacing:'0.05em' }}>Confirm password</label>
              <input type="password" placeholder="Re-enter password" value={confirm} onChange={e=>setConfirm(e.target.value)} required
                style={{ width:'100%', padding:'10px 14px', fontFamily:'var(--font-body)', fontSize:'14px', color:'#1F2937', background:'white', border:'1.5px solid #E5E7EB', borderRadius:'8px', outline:'none' }}/>
            </div>
            {err && <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#EF4444' }}>{err}</p>}
            <button type="submit" disabled={loading || !child}
              style={{ background:'#2D6A4F', color:'white', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', padding:'10px 22px', borderRadius:'8px', border:'none', cursor:(loading||!child)?'not-allowed':'pointer', alignSelf:'flex-start', opacity:(loading||!child)?0.7:1 }}>
              {loading ? 'Updating...' : 'Update password'}
            </button>
          </form>
        </div>
      </div>
    </ParentSidebarLayout>
  )
}
