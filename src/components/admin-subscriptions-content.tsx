'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'

interface Payment {
  id: string
  parent_name: string
  parent_email: string
  razorpay_payment_id: string
  amount_paise: number
  student_count: number
  status: string
  invoice_number: string
  created_at: string
}

interface Profile {
  id: string
  full_name: string
  email: string
  role: string
}

export default function SubscriptionsContent() {
  const [payments,  setPayments]  = useState<Payment[]>([])
  const [filter,    setFilter]    = useState<'all' | 'paid' | 'inactive'>('all')
  const [loading,   setLoading]   = useState(true)
  const [search,    setSearch]    = useState('')

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false })
      setPayments(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = payments.filter(p => {
    const matchSearch = !search ||
      p.parent_name?.toLowerCase().includes(search.toLowerCase()) ||
      p.parent_email?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || p.status === filter
    return matchSearch && matchFilter
  })

  const totalRevenue   = payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount_paise, 0)
  const activeCount    = payments.filter(p => p.status === 'paid').length
  const inactiveCount  = payments.filter(p => p.status !== 'paid').length

  const statusBadge = (status: string) => {
    const styles: Record<string, { bg: string; color: string }> = {
      paid:    { bg: '#D1FAE5', color: '#065F46' },
      failed:  { bg: '#FEE2E2', color: '#991B1B' },
      pending: { bg: '#FEF3C7', color: '#92400E' },
    }
    const s = styles[status] ?? { bg: '#F1F5F9', color: '#64748B' }
    return (
      <span style={{ background: s.bg, color: s.color, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', padding: '3px 12px', borderRadius: '20px', textTransform: 'capitalize' }}>
        {status}
      </span>
    )
  }

  return (
    <div style={{ maxWidth: '960px' }}>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px' }}>
        {[
          { label: 'Total Revenue', value: `₹${(totalRevenue / 100).toLocaleString('en-IN')}`, emoji: '💰', bg: '#F0FDF4', color: '#1B4332' },
          { label: 'Active Subscriptions', value: activeCount, emoji: '✅', bg: '#EEF2FF', color: '#4338CA' },
          { label: 'Inactive / Failed', value: inactiveCount, emoji: '⚠️', bg: '#FEF3C7', color: '#92400E' },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, borderRadius: '16px', padding: '20px 24px', border: '1.5px solid #E5E7EB' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: s.color, marginBottom: '6px', opacity: 0.7 }}>{s.emoji} {s.label}</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: s.color, lineHeight: 1 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search and filter */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: '200px', padding: '10px 16px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none' }}
        />
        {(['all', 'paid', 'inactive'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: '10px 20px', borderRadius: '12px', border: 'none', background: filter === f ? '#1B4332' : '#F1F5F9', color: filter === f ? 'white' : '#374151', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', cursor: 'pointer', textTransform: 'capitalize' }}>
            {f === 'all' ? 'All' : f === 'paid' ? '✅ Active' : '⚠️ Inactive'}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <p style={{ fontFamily: 'var(--font-body)', color: '#94A3B8' }}>Loading…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '18px', border: '1.5px solid #E2E8F0' }}>
          <p style={{ fontSize: '40px', marginBottom: '12px' }}>💳</p>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', color: '#374151' }}>No subscriptions found</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              style={{ background: 'white', borderRadius: '14px', border: '1.5px solid #F1F5F9', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1F2937', marginBottom: '2px' }}>{p.parent_name || '—'}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8' }}>{p.parent_email}</p>
              </div>
              <div style={{ textAlign: 'center', minWidth: '80px' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '16px', color: '#1B4332' }}>₹{(p.amount_paise / 100).toLocaleString('en-IN')}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#94A3B8' }}>{p.student_count} student{p.student_count > 1 ? 's' : ''}</p>
              </div>
              <div>{statusBadge(p.status)}</div>
              <div style={{ textAlign: 'right', minWidth: '100px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8' }}>
                  {new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#CBD5E1' }}>{p.invoice_number || '—'}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
