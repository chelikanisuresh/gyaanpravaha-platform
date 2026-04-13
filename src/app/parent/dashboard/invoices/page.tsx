'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'
import { motion } from 'framer-motion'

interface Payment {
  id: string; parent_name: string; parent_email: string
  razorpay_payment_id: string; razorpay_order_id: string
  amount_paise: number; student_count: number; status: string
  invoice_number: string; created_at: string
}

function invoiceHTML(p: Payment): string {
  const date   = new Date(p.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })
  const amount = (p.amount_paise / 100).toLocaleString('en-IN', { minimumFractionDigits:2 })
  const perStu = (4999).toLocaleString('en-IN', { minimumFractionDigits:2 })
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Invoice ${p.invoice_number}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Georgia,serif;color:#1a1a1a;background:white;padding:48px;max-width:760px;margin:0 auto}
.header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:48px;padding-bottom:24px;border-bottom:2px solid #1B4332}
.brand-name{font-size:22px;font-weight:bold;color:#1B4332;margin-top:8px}.brand-san{font-size:13px;color:#52B788}
.brand-addr{font-size:11px;color:#6B7280;line-height:1.6;margin-top:4px}
.invoice-title{font-size:28px;font-weight:bold;color:#1B4332;letter-spacing:2px;text-transform:uppercase}
.invoice-num,.invoice-date{font-size:13px;color:#6B7280;margin-top:4px}
.status-badge{display:inline-block;background:#D8F3DC;color:#1B4332;font-size:11px;font-weight:bold;padding:3px 12px;border-radius:20px;margin-top:8px}
.bill-to{margin-bottom:36px}.bill-to h3{font-size:11px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
.bill-to p{font-size:14px;color:#1a1a1a;line-height:1.7}
table{width:100%;border-collapse:collapse;margin-bottom:32px}
thead tr{background:#1B4332}thead th{color:white;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;padding:12px 16px;text-align:left}
thead th:last-child{text-align:right}tbody tr{border-bottom:1px solid #F3F4F6}
tbody td{padding:14px 16px;font-size:14px;color:#374151;vertical-align:top}tbody td:last-child{text-align:right;font-weight:bold;color:#1B4332}
.total-section{display:flex;justify-content:flex-end}.total-box{width:280px}
.total-row{display:flex;justify-content:space-between;padding:8px 0;font-size:14px;border-bottom:1px solid #F3F4F6}
.total-final{display:flex;justify-content:space-between;padding:12px 0;font-size:18px;font-weight:bold;color:#1B4332;border-top:2px solid #1B4332;margin-top:4px}
.payment-details{background:#F8FAF9;border:1px solid #D8F3DC;border-radius:10px;padding:20px;margin-top:36px}
.payment-details h3{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#9CA3AF;margin-bottom:12px}
.pd-row{display:flex;gap:48px;flex-wrap:wrap}.pd-item label{font-size:11px;color:#9CA3AF;display:block;margin-bottom:3px;text-transform:uppercase}
.pd-item p{font-size:13px;color:#1B4332;font-weight:bold;word-break:break-all}
.footer{margin-top:56px;padding-top:20px;border-top:1px solid #E5E7EB;display:flex;justify-content:space-between}
.footer p{font-size:11px;color:#9CA3AF}.tagline{font-style:italic;color:#52B788}
@media print{body{padding:24px}@page{margin:0.5cm}}</style></head><body>
<div class="header">
  <div>
    <p class="brand-name">Gyaanpravaha</p>
    <p class="brand-san">ज्ञानप्रवाह</p>
    <p class="brand-addr">gyaanpravaha.in</p>
  </div>
  <div style="text-align:right">
    <p class="invoice-title">Invoice</p>
    <p class="invoice-num">Invoice No: <strong>${p.invoice_number}</strong></p>
    <p class="invoice-date">Date: ${date}</p>
    <span class="status-badge">✓ Paid</span>
  </div>
</div>
<div class="bill-to"><h3>Billed to</h3><p><strong>${p.parent_name}</strong></p><p>${p.parent_email}</p></div>
<table>
  <thead><tr><th style="width:50%">Description</th><th>Students</th><th>Rate</th><th>Amount</th></tr></thead>
  <tbody><tr>
    <td><strong>Gyaanpravaha Annual Subscription</strong><br/><span style="font-size:12px;color:#6B7280">Full academic year · All subjects</span></td>
    <td>${p.student_count}</td><td>₹${perStu}</td><td>₹${amount}</td>
  </tr></tbody>
</table>
<div class="total-section"><div class="total-box">
  <div class="total-row"><span>Subtotal</span><span>₹${amount}</span></div>
  <div class="total-row"><span>GST</span><span>Not applicable</span></div>
  <div class="total-final"><span>Total Paid</span><span>₹${amount}</span></div>
</div></div>
<div class="payment-details"><h3>Payment details</h3><div class="pd-row">
  <div class="pd-item"><label>Payment ID</label><p>${p.razorpay_payment_id || '—'}</p></div>
  <div class="pd-item"><label>Order ID</label><p>${p.razorpay_order_id}</p></div>
  <div class="pd-item"><label>Method</label><p>Razorpay</p></div>
  <div class="pd-item"><label>Status</label><p style="color:#1B4332">Paid ✓</p></div>
</div></div>
<div class="footer"><p>Thank you for choosing Gyaanpravaha</p><p class="tagline">Learn · Know · Flow</p></div>
</body></html>`
}

export default function ParentInvoicesPage() {
  const router = useRouter()
  const [payments,   setPayments]   = useState<Payment[]>([])
  const [loading,    setLoading]    = useState(true)
  const [parentName, setParentName] = useState('Parent')

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: profile } = await supabase.from('profiles').select('role, full_name, email').eq('id', user.id).maybeSingle()
      if (profile?.role !== 'parent') { router.push('/login'); return }
      setParentName(profile?.full_name?.split(' ')[0] || 'Parent')
      const email = profile?.email || user.email || ''
      const { data: pmts } = await supabase.from('payments').select('*').eq('parent_email', email).order('created_at', { ascending: false })
      setPayments(pmts || [])
      setLoading(false)
    }
    load()
  }, [router])

  const handlePrint = (p: Payment) => {
    const win = window.open('', '_blank')
    if (!win) return
    win.document.write(invoiceHTML(p))
    win.document.close()
    win.focus()
    setTimeout(() => win.print(), 600)
  }

  return (
    <ParentSidebarLayout parentName={parentName}>
      <div style={{ maxWidth: '720px' }}>
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '28px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', color: '#1B4332', marginBottom: '4px' }}>Invoices</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#64748B' }}>View and download your payment receipts</p>
        </motion.div>

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '20px' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{ width: '18px', height: '18px', border: '2px solid #E2E8F0', borderTopColor: '#1B4332', borderRadius: '50%' }}/>
            <p style={{ fontFamily: 'var(--font-body)', color: '#94A3B8', fontSize: '13px' }}>Loading invoices...</p>
          </div>
        )}

        {!loading && payments.length === 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            style={{ background: 'white', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '56px', textAlign: 'center' }}>
            <p style={{ fontSize: '40px', marginBottom: '14px' }}>🧾</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px', color: '#1B4332', marginBottom: '6px' }}>No invoices yet</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#94A3B8' }}>Your payment receipts will appear here after registration.</p>
          </motion.div>
        )}

        {!loading && payments.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {payments.map((p, i) => {
              const date   = new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
              const amount = (p.amount_paise / 100).toLocaleString('en-IN')
              return (
                <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  style={{ background: 'white', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '24px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
                  {/* Header row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: '#1B4332' }}>{p.invoice_number}</p>
                        <span style={{ background: '#D1FAE5', color: '#065F46', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', padding: '3px 10px', borderRadius: '20px' }}>✓ Paid</span>
                      </div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#94A3B8' }}>{date}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: '#1B4332', lineHeight: 1 }}>₹{amount}</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8', marginTop: '3px' }}>Annual subscription</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div style={{ display: 'flex', gap: '0', flexWrap: 'wrap', background: '#F8FAFF', borderRadius: '12px', padding: '14px 18px', marginBottom: '18px', border: '1px solid #E2E8F0' }}>
                    {[
                      { label: 'Plan',        value: 'Full academic year' },
                      { label: 'Students',    value: `${p.student_count} student${p.student_count > 1 ? 's' : ''}` },
                      { label: 'Payment ID',  value: p.razorpay_payment_id || '—' },
                    ].map(({ label, value }, idx) => (
                      <div key={label} style={{ flex: 1, minWidth: '140px', padding: '0 16px', borderRight: idx < 2 ? '1px solid #E2E8F0' : 'none' }}>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '3px' }}>{label}</p>
                        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#374151', wordBreak: 'break-all' }}>{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Download button */}
                  <motion.button onClick={() => handlePrint(p)}
                    whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(27,67,50,0.15)' }} whileTap={{ scale: 0.97 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '12px', border: '1.5px solid #D8F3DC', background: '#F0FDF4', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332', cursor: 'pointer' }}>
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 2v8M5 7l3 3 3-3M2 12h12" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Download / Print Invoice
                  </motion.button>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </ParentSidebarLayout>
  )
}
