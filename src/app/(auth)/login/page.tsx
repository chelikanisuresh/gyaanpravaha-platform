'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Tab = 'student' | 'parent'

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [debug, setDebug] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setDebug('')

    const supabase = createClient()

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError('Incorrect email or password.')
      setLoading(false)
      return
    }

    if (data.user) {
      const userId = data.user.id
      setDebug(`User ID: ${userId}`)

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role, email')
        .eq('id', userId)
        .single()

      const debugMsg = `User: ${userId} | Profile: ${JSON.stringify(profile)} | Error: ${JSON.stringify(profileError)}`
      setDebug(debugMsg)
      setLoading(false)

      // Wait 2 seconds so you can read the debug info
      await new Promise(r => setTimeout(r, 2000))

      const role = profile?.role
      if (role === 'admin') window.location.href = '/admin'
      else if (role === 'parent') window.location.href = '/parent/dashboard'
      else window.location.href = '/student/dashboard'
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--green-pale)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '40px 36px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '24px', color: 'var(--green-deepest)', marginBottom: '24px', textAlign: 'center' }}>Log in</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', background: 'var(--gray-100)', borderRadius: 'var(--radius-md)', padding: '4px', marginBottom: '24px' }}>
          {(['student', 'parent'] as Tab[]).map(t => (
            <button key={t} type="button" onClick={() => { setTab(t); setEmail(''); setPassword(''); setError(''); setDebug('') }}
              style={{ padding: '10px', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', background: tab === t ? 'var(--green-dark)' : 'transparent', color: tab === t ? 'white' : 'var(--gray-600)' }}>
              {t === 'student' ? '📚 Student' : '👨‍👩‍👧 Parent'}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="label">Email</label>
            <input type="email" className="input" value={email} onChange={e => setEmail(e.target.value)} required/>
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" className="input" value={password} onChange={e => setPassword(e.target.value)} required/>
          </div>

          {error && <p style={{ color: '#EF4444', fontSize: '13px' }}>{error}</p>}

          {debug && (
            <div style={{ background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: '8px', padding: '12px', fontSize: '11px', fontFamily: 'monospace', wordBreak: 'break-all', color: '#92400E' }}>
              {debug}
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
            {loading ? 'Checking...' : 'Log in'}
          </button>
        </form>

        <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid var(--gray-200)' }}/>
        <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--gray-500)' }}>
          <Link href="/" style={{ color: 'var(--green-dark)', textDecoration: 'none' }}>← Back to home</Link>
        </p>
      </div>
    </div>
  )
}
