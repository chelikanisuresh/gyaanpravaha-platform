'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'
import ChildTabs from '@/components/ChildTabs'

interface Child { id:string; full_name:string; email:string }

export default function PasswordPage() {
  const [children,   setChildren]   = useState<Child[]>([])
  const [selectedId, setSelectedId] = useState('')
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
      const { data:p } = await supabase.from('profiles').select('full_name').eq('id', user.id).maybeSingle()
      if (p?.full_name) setParentName(p.full_name)
      const { data:links } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id)
      if (!links?.length) return
      const { data:profiles } = await supabase.from('profiles').select('id, full_name, email').in('id', links.map(l=>l.student_id))
      if (profiles?.length) { setChildren(profiles as Child[]); setSelectedId(profiles[0].id) }
    }
    load()
  }, [])

  const handleSelect = (id:string) => { setSelectedId(id); setPw(''); setConfirm(''); setMsg(''); setErr('') }
  const child = children.find(c=>c.id===selectedId)||children[0]

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(''); setMsg('')
    if (pw!==confirm) { setErr('Passwords do not match.'); return }
    if (pw.length<8) { setErr('Minimum 8 characters.'); return }
    setLoading(true)
    const res = await fetch('/api/reset-child-password', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ childId:child?.id, newPassword:pw }) })
    if (res.ok) { setMsg(`Password updated! Share the new password with ${child?.full_name||'your child'}.`); setPw(''); setConfirm('') }
    else setErr('Update failed. Please try again.')
    setLoading(false)
  }

  return (
    <ParentSidebarLayout parentName={parentName}>
      <style>{`@media(max-width:900px){.pw-grid{grid-template-columns:1fr !important}}`}</style>
      <div style={{ padding:'28px 28px 60px' }}>
        <h1 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'22px', color:'#1B4332', marginBottom:'4px' }}>Password</h1>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#6B7280', marginBottom:'20px' }}>
          {child ? `Change ${child.full_name||'your child'}'s login password` : "Change your child's login password"}
        </p>
        <ChildTabs children={children} selectedId={selectedId} onSelect={handleSelect}/>

        <div className="pw-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', alignItems:'start' }}>

          {/* Left — form */}
          <div>
            <div style={{ background:'#FEF3C7', border:'1px solid #FDE68A', borderRadius:'12px', padding:'14px 18px', marginBottom:'20px', display:'flex', gap:'10px' }}>
              <span style={{ fontSize:'18px', flexShrink:0 }}>💡</span>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#92400E', lineHeight:1.6 }}>
                Only you can change your child&apos;s password. After updating, share it with them so they can log in.
              </p>
            </div>

            {msg && <div style={{ background:'#D8F3DC', border:'1px solid #A7F3D0', borderRadius:'10px', padding:'12px 16px', marginBottom:'16px' }}><p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#065F46' }}>✓ {msg}</p></div>}

            <div style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', padding:'22px' }}>
              {child && (
                <div style={{ display:'flex', alignItems:'center', gap:'12px', paddingBottom:'18px', marginBottom:'18px', borderBottom:'1px solid #F3F4F6' }}>
                  <div style={{ width:'42px', height:'42px', minWidth:'42px', borderRadius:'50%', background:'#D8F3DC', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'16px', color:'#1B4332' }}>
                    {(child.full_name||'S').charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'15px', color:'#1B4332' }}>{child.full_name||'Student'}</p>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#9CA3AF' }}>{child.email}</p>
                  </div>
                </div>
              )}
              <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                {[{label:'New password',val:pw,set:setPw,ph:'Minimum 8 characters',min:8},{label:'Confirm password',val:confirm,set:setConfirm,ph:'Re-enter password'}].map(({label,val,set,ph,min})=>(
                  <div key={label}>
                    <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'12px', color:'#6B7280', marginBottom:'6px', textTransform:'uppercase', letterSpacing:'0.05em' }}>{label}</label>
                    <input type="password" value={val} onChange={e=>set(e.target.value)} required minLength={min} placeholder={ph}
                      style={{ width:'100%', padding:'11px 14px', fontFamily:'var(--font-body)', fontSize:'14px', color:'#1F2937', border:'1.5px solid #E5E7EB', borderRadius:'8px', outline:'none', transition:'border-color 0.15s' }}
                      onFocus={e=>e.target.style.borderColor='#2D6A4F'}
                      onBlur={e=>e.target.style.borderColor='#E5E7EB'}/>
                  </div>
                ))}
                {err && <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#EF4444' }}>{err}</p>}
                <button type="submit" disabled={loading||!child} style={{ background:'#2D6A4F', color:'white', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'14px', padding:'12px 22px', borderRadius:'8px', border:'none', cursor:(loading||!child)?'not-allowed':'pointer', alignSelf:'flex-start', opacity:(loading||!child)?0.7:1, transition:'opacity 0.15s' }}>
                  {loading?'Updating...':'Update password'}
                </button>
              </form>
            </div>
          </div>

          {/* Right — tips and info */}
          <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
            <div style={{ background:'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius:'14px', padding:'20px' }}>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'11px', color:'#74C69D', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'10px' }}>🔐 Why only parents can change this</p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'rgba(255,255,255,0.8)', lineHeight:1.6 }}>
                Student accounts are intentionally locked from self-service password changes. This keeps you in full control of your child&apos;s access to the platform.
              </p>
            </div>

            <div style={{ background:'white', borderRadius:'14px', border:'1px solid #E5E7EB', padding:'18px' }}>
              <p style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'13px', color:'#1B4332', marginBottom:'12px' }}>💡 Password tips</p>
              {['Choose something your child can remember easily', 'Mix letters and numbers for security', 'Avoid using their name or date of birth', 'Store it safely — you are the only one who can reset it'].map((tip,i)=>(
                <div key={i} style={{ display:'flex', gap:'8px', marginBottom:'8px' }}>
                  <div style={{ width:'18px', height:'18px', borderRadius:'50%', background:'#D8F3DC', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'1px' }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'#374151', lineHeight:1.5 }}>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ParentSidebarLayout>
  )
}
