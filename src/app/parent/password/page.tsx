'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'
import PageShell from '@/components/PageShell'

export default function PasswordPage() {
  const [child, setChild] = useState<{ name: string; id: string } | null>(null)
  const [parentName, setParentName] = useState('Parent')
  const [pw, setPw] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: p } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
      if (p?.full_name) setParentName(p.full_name)
      const { data: l } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id).single()
      if (!l) return
      const { data: c } = await supabase.from('profiles').select('id, full_name').eq('id', l.student_id).single()
      if (c) setChild({ id: c.id, name: c.full_name || 'Student' })
    }
    load()
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(''); setMsg('')
    if (pw !== confirm) { setErr('Passwords do not match.'); return }
    if (pw.length < 8) { setErr('Minimum 8 characters.'); return }
    setLoading(true)
    const res = await fetch('/api/reset-child-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ childId: child?.id, newPassword: pw }) })
    if (res.ok) { setMsg('Password updated successfully! Share the new password with ' + child?.name + '.'); setPw(''); setConfirm('') }
    else setErr('Update failed. Please try again.')
    setLoading(false)
  }

  return (
    <ParentSidebarLayout parentName={parentName}>
      <PageShell title="Password" subtitle={child ? 'Change ' + child.name + "'s login password" : "Change your child's login password"} maxWidth="520px">
        <div style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', background: 'var(--amber-bg)', border: '1px solid var(--amber-border)', marginBottom: '24px', display: 'flex', gap: '10px' }}>
          <span style={{ fontSize: '16px', flexShrink: 0 }}>💡</span>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#92400E', lineHeight: 1.6 }}>Only you can change your child&apos;s password. After updating, share it with them so they can log in.</p>
        </div>
        {msg && <div style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', background: 'var(--green-ok-bg)', border: '1px solid rgba(22,163,74,0.2)', marginBottom: '20px' }}><p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--green-ok)' }}>✓ {msg}</p></div>}
        <div className="card" style={{ padding: '24px' }}>
          {child && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '18px', marginBottom: '18px', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: 'var(--radius-pill)', background: 'var(--brand-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: 'var(--brand-deep)' }}>{child.name.charAt(0)}</div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px', color: 'var(--gray-900)' }}>{child.name}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gray-400)' }}>Student account</p>
              </div>
            </div>
          )}
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div><label className="label">New password</label><input type="password" className="input" placeholder="Minimum 8 characters" value={pw} onChange={e => setPw(e.target.value)} required minLength={8}/></div>
            <div><label className="label">Confirm password</label><input type="password" className="input" placeholder="Re-enter password" value={confirm} onChange={e => setConfirm(e.target.value)} required/></div>
            {err && <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--red)' }}>{err}</p>}
            <button type="submit" disabled={loading || !child} className="btn-primary" style={{ alignSelf: 'flex-start', opacity: (loading || !child) ? 0.6 : 1 }}>{loading ? 'Updating...' : 'Update password'}</button>
          </form>
        </div>
      </PageShell>
    </ParentSidebarLayout>
  )
}
