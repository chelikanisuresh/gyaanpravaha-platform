'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'

interface Payment {
  id: string
  parent_name: string
  parent_email: string
  razorpay_payment_id: string
  razorpay_order_id: string
  amount_paise: number
  student_count: number
  status: string
  invoice_number: string
  created_at: string
}

function invoiceHTML(p: Payment): string {
  const date   = new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  const amount = (p.amount_paise / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Invoice ${p.invoice_number}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Georgia,serif;color:#1a1a1a;background:white;padding:48px;max-width:760px;margin:0 auto}
.header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:48px;padding-bottom:24px;border-bottom:2px solid #1B4332}
.brand-name{font-size:22px;font-weight:bold;color:#1B4332}.invoice-title{font-size:28px;font-weight:bold;color:#1B4332;letter-spacing:2px;text-transform:uppercase}
.invoice-num{font-size:13px;color:#6B7280;margin-top:4px}.status-badge{display:inline-block;background:#D8F3DC;color:#1B4332;font-size:11px;font-weight:bold;padding:3px 12px;border-radius:20px;margin-top:8px}
.bill-to{margin-bottom:36px}.bill-to h3{font-size:11px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
table{width:100%;border-collapse:collapse;margin-bottom:32px}th{background:#F9FAFB;padding:10px 16px;text-align:left;font-size:12px;color:#6B7280;font-weight:600;border-bottom:1px solid #E5E7EB}
td{padding:14px 16px;border-bottom:1px solid #F3F4F6;font-size:14px}.total-row td{font-weight:bold;font-size:16px;color:#1B4332;border-top:2px solid #1B4332;border-bottom:none}
.footer{margin-top:48px;padding-top:24px;border-top:1px solid #E5E7EB;font-size:12px;color:#9CA3AF;text-align:center}
</style></head><body>
<div class="header">
  <div><p class="brand-name">Gyaanpravaha</p><p style="font-size:12px;color:#6B7280;margin-top:4px">gyaanpravaha.in</p></div>
  <div style="text-align:right"><p class="invoice-title">Invoice</p><p class="invoice-num">No: ${p.invoice_number}</p><p class="invoice-num">Date: ${date}</p><span class="status-badge">${p.status.toUpperCase()}</span></div>
</div>
<div class="bill-to"><h3>Billed To</h3><p style="font-size:15px;font-weight:bold">${p.parent_name}</p><p style="color:#6B7280;margin-top:4px">${p.parent_email}</p></div>
<table><tr><th>Description</th><th>Students</th><th>Amount</th></tr>
<tr><td>Gyaanpravaha Annual Subscription</td><td>${p.student_count}</td><td>₹${amount}</td></tr>
<tr class="total-row"><td colspan="2">Total</td><td>₹${amount}</td></tr></table>
<div style="font-size:12px;color:#6B7280"><p>Payment ID: ${p.razorpay_payment_id || '—'}</p></div>
<div class="footer"><p>Thank you for your subscription. For support: support@gyaanpravaha.in</p></div>
</body></html>`
}

export default function InvoicesContent() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('payments')
        .select('*')
        .eq('status', 'paid')
        .order('created_at', { ascending: false })
      setPayments(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = payments.filter(p =>
    !search ||
    p.parent_name?.toLowerCase().includes(search.toLowerCase()) ||
    p.parent_email?.toLowerCase().includes(search.toLowerCase()) ||
    p.invoice_number?.toLowerCase().includes(search.toLowerCase())
  )

  const downloadInvoice = (p: Payment) => {
    const html  = invoiceHTML(p)
    const blob  = new Blob([html], { type: 'text/html' })
    const url   = URL.createObjectURL(blob)
    const a     = document.createElement('a')
    a.href      = url
    a.download  = `Invoice-${p.invoice_number}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ maxWidth: '960px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', color: '#1F2937', marginBottom: '4px' }}>Invoices</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#64748B' }}>All paid subscription invoices. Download as HTML to print or share.</p>
      </div>

      <input
        type="text"
        placeholder="Search by name, email or invoice number…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', padding: '11px 16px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none', marginBottom: '20px', boxSizing: 'border-box' }}
      />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <p style={{ fontFamily: 'var(--font-body)', color: '#94A3B8' }}>Loading…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '18px', border: '1.5px solid #E2E8F0' }}>
          <p style={{ fontSize: '40px', marginBottom: '12px' }}>🧾</p>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', color: '#374151' }}>No invoices found</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              style={{ background: 'white', borderRadius: '14px', border: '1.5px solid #F1F5F9', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>🧾</div>
              <div style={{ flex: 1, minWidth: '180px' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1F2937', marginBottom: '2px' }}>{p.parent_name || '—'}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8' }}>{p.parent_email}</p>
              </div>
              <div style={{ minWidth: '120px' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#374151' }}>{p.invoice_number || '—'}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#94A3B8' }}>
                  {new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '16px', color: '#1B4332', minWidth: '80px' }}>
                ₹{(p.amount_paise / 100).toLocaleString('en-IN')}
              </p>
              <button onClick={() => downloadInvoice(p)}
                style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', color: 'white', border: 'none', borderRadius: '10px', padding: '9px 18px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                ⬇ Download
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
