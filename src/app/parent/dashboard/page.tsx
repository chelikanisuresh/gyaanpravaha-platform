'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface Payment {
  id:                  string
  parent_name:         string
  parent_email:        string
  razorpay_payment_id: string
  razorpay_order_id:   string
  amount_paise:        number
  student_count:       number
  status:              string
  invoice_number:      string
  created_at:          string
}

// ── Invoice HTML (for print/PDF) ──────────────────────────────────────────────

function invoiceHTML(p: Payment): string {
  const date    = new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  const amount  = (p.amount_paise / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })
  const perStu  = (4999).toLocaleString('en-IN', { minimumFractionDigits: 2 })

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title>Invoice ${p.invoice_number} — GyaanPravaha</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Georgia, 'Times New Roman', serif; color: #1a1a1a; background: white; padding: 48px; max-width: 760px; margin: 0 auto; }
  .header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 48px; padding-bottom: 24px; border-bottom: 2px solid #1B4332; }
  .logo-wrap { display: flex; flex-direction: column; gap: 6px; }
  .logo-icon { width: 52px; height: 52px; }
  .brand-name { font-size: 22px; font-weight: bold; color: #1B4332; margin-top: 8px; }
  .brand-san  { font-size: 13px; color: #52B788; }
  .brand-addr { font-size: 11px; color: #6B7280; line-height: 1.6; margin-top: 4px; }
  .invoice-meta { text-align: right; }
  .invoice-title { font-size: 28px; font-weight: bold; color: #1B4332; letter-spacing: 2px; text-transform: uppercase; }
  .invoice-num { font-size: 13px; color: #6B7280; margin-top: 6px; }
  .invoice-date { font-size: 13px; color: #6B7280; margin-top: 3px; }
  .status-badge { display: inline-block; background: #D8F3DC; color: #1B4332; font-size: 11px; font-weight: bold; padding: 3px 12px; border-radius: 20px; margin-top: 8px; letter-spacing: 0.5px; text-transform: uppercase; }
  .bill-to { margin-bottom: 36px; }
  .bill-to h3 { font-size: 11px; color: #9CA3AF; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
  .bill-to p { font-size: 14px; color: #1a1a1a; line-height: 1.7; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
  thead tr { background: #1B4332; }
  thead th { color: white; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; padding: 12px 16px; text-align: left; }
  thead th:last-child { text-align: right; }
  tbody tr { border-bottom: 1px solid #F3F4F6; }
  tbody td { padding: 14px 16px; font-size: 14px; color: #374151; vertical-align: top; }
  tbody td:last-child { text-align: right; font-weight: bold; color: #1B4332; }
  .total-section { display: flex; justify-content: flex-end; }
  .total-box { width: 280px; }
  .total-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; border-bottom: 1px solid #F3F4F6; }
  .total-final { display: flex; justify-content: space-between; padding: 12px 0; font-size: 18px; font-weight: bold; color: #1B4332; border-top: 2px solid #1B4332; margin-top: 4px; }
  .payment-details { background: #F8FAF9; border: 1px solid #D8F3DC; border-radius: 10px; padding: 20px; margin-top: 36px; }
  .payment-details h3 { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #9CA3AF; margin-bottom: 12px; }
  .pd-row { display: flex; gap: 48px; flex-wrap: wrap; }
  .pd-item label { font-size: 11px; color: #9CA3AF; display: block; margin-bottom: 3px; text-transform: uppercase; letter-spacing: 0.5px; }
  .pd-item p { font-size: 13px; color: #1B4332; font-weight: bold; word-break: break-all; }
  .footer { margin-top: 56px; padding-top: 20px; border-top: 1px solid #E5E7EB; display: flex; justify-content: space-between; align-items: center; }
  .footer p { font-size: 11px; color: #9CA3AF; }
  .footer .tagline { font-style: italic; color: #52B788; }
  @media print {
    body { padding: 24px; }
    @page { margin: 0.5cm; }
  }
</style>
</head>
<body>

<div class="header">
  <div class="logo-wrap">
    <svg class="logo-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 66 C8 58 16 54 50 54 C84 54 92 58 92 66 L92 76 C92 76 82 72 50 72 C18 72 8 76 8 76Z" fill="#1B4332"/>
      <line x1="50" y1="54" x2="50" y2="76" stroke="#74C69D" stroke-width="1.5"/>
      <line x1="13" y1="60" x2="45" y2="59" stroke="#74C69D" stroke-width="1" opacity="0.5"/>
      <line x1="13" y1="66" x2="45" y2="65" stroke="#74C69D" stroke-width="1" opacity="0.5"/>
      <line x1="55" y1="59" x2="87" y2="60" stroke="#74C69D" stroke-width="1" opacity="0.5"/>
      <line x1="55" y1="65" x2="87" y2="66" stroke="#74C69D" stroke-width="1" opacity="0.5"/>
      <path d="M50 54 C43 40 38 30 39 22 C40 15 46 13 50 17 C54 13 60 15 61 22 C62 30 57 40 50 54Z" fill="#2D6A4F"/>
      <path d="M50 54 C40 46 34 42 32 35 C30 28 34 24 38 26 C42 28 46 38 50 54Z" fill="#52B788"/>
      <path d="M50 54 C60 46 66 42 68 35 C70 28 66 24 62 26 C58 28 54 38 50 54Z" fill="#52B788"/>
      <path d="M50 52 C47 44 46 37 48 33 C49 31 51 31 52 33 C54 37 53 44 50 52Z" fill="#74C69D"/>
      <circle cx="50" cy="48" r="7" fill="#F59E0B"/>
      <circle cx="50" cy="48" r="3.5" fill="#FDE68A"/>
      <circle cx="50" cy="48" r="1.5" fill="#F59E0B"/>
    </svg>
    <p class="brand-name">GyaanPravaha</p>
    <p class="brand-san">ज्ञानप्रवाह</p>
    <p class="brand-addr">
      501, Pelican, Hiranandani Estate<br/>
      Godbunder Road, Thane — 400607<br/>
      gyaanpravaha.in
    </p>
  </div>
  <div class="invoice-meta">
    <p class="invoice-title">Invoice</p>
    <p class="invoice-num">Invoice No: <strong>${p.invoice_number}</strong></p>
    <p class="invoice-date">Date: ${date}</p>
    <span class="status-badge">✓ Paid</span>
  </div>
</div>

<div class="bill-to">
  <h3>Billed to</h3>
  <p><strong>${p.parent_name}</strong></p>
  <p>${p.parent_email}</p>
</div>

<table>
  <thead>
    <tr>
      <th style="width:50%">Description</th>
      <th>Students</th>
      <th>Rate</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <strong>Gyaanpravaha Annual Subscription</strong><br/>
        <span style="font-size:12px;color:#6B7280">Full academic year 2025–26 · All subjects · Class 6</span>
      </td>
      <td>${p.student_count}</td>
      <td>₹${perStu}</td>
      <td>₹${amount}</td>
    </tr>
  </tbody>
</table>

<div class="total-section">
  <div class="total-box">
    <div class="total-row">
      <span>Subtotal</span>
      <span>₹${amount}</span>
    </div>
    <div class="total-row">
      <span>GST</span>
      <span>Not applicable</span>
    </div>
    <div class="total-final">
      <span>Total Paid</span>
      <span>₹${amount}</span>
    </div>
  </div>
</div>

<div class="payment-details">
  <h3>Payment details</h3>
  <div class="pd-row">
    <div class="pd-item">
      <label>Payment ID</label>
      <p>${p.razorpay_payment_id || '—'}</p>
    </div>
    <div class="pd-item">
      <label>Order ID</label>
      <p>${p.razorpay_order_id}</p>
    </div>
    <div class="pd-item">
      <label>Method</label>
      <p>Razorpay</p>
    </div>
    <div class="pd-item">
      <label>Status</label>
      <p style="color:#1B4332">Paid ✓</p>
    </div>
  </div>
</div>

<div class="footer">
  <p>Thank you for choosing Gyaanpravaha</p>
  <p class="tagline">Learn · Know · Flow</p>
</div>

</body>
</html>`
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ParentDashboardPage() {
  const router   = useRouter()
  const [loading,  setLoading]  = useState(true)
  const [payments, setPayments] = useState<Payment[]>([])
  const [parentEmail, setParentEmail] = useState('')
  const [parentName,  setParentName]  = useState('')

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data: profile } = await supabase.from('profiles').select('role, full_name, email').eq('id', user.id).maybeSingle()
      if (profile?.role !== 'parent') { router.push('/login'); return }

      setParentEmail(profile.email || user.email || '')
      setParentName(profile.full_name || '')

      const { data: pmts } = await supabase
        .from('payments')
        .select('*')
        .eq('parent_email', profile.email || user.email)
        .order('created_at', { ascending: false })

      setPayments(pmts || [])
      setLoading(false)
    }
    load()
  }, [router])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const handlePrintInvoice = (p: Payment) => {
    const html = invoiceHTML(p)
    const win  = window.open('', '_blank')
    if (!win) return
    win.document.write(html)
    win.document.close()
    win.focus()
    setTimeout(() => win.print(), 600)
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#F8FAFC' }}>
      <p style={{ fontFamily: 'Georgia, serif', color: '#9CA3AF' }}>Loading...</p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>

      {/* Top bar */}
      <div style={{ background: '#1B4332', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg width="36" height="36" viewBox="0 0 100 100">
            <path d="M8 66 C8 58 16 54 50 54 C84 54 92 58 92 66 L92 76 C92 76 82 72 50 72 C18 72 8 76 8 76Z" fill="#2D6A4F"/>
            <path d="M50 54 C43 40 38 30 39 22 C40 15 46 13 50 17 C54 13 60 15 61 22 C62 30 57 40 50 54Z" fill="#52B788"/>
            <path d="M50 54 C40 46 34 42 32 35 C30 28 34 24 38 26 C42 28 46 38 50 54Z" fill="#74C69D"/>
            <path d="M50 54 C60 46 66 42 68 35 C70 28 66 24 62 26 C58 28 54 38 50 54Z" fill="#74C69D"/>
            <circle cx="50" cy="48" r="7" fill="#F59E0B"/>
            <circle cx="50" cy="48" r="3" fill="#FDE68A"/>
          </svg>
          <div>
            <p style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '18px', color: 'white', lineHeight: 1 }}>GyaanPravaha</p>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Parent Dashboard</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '14px', color: 'white', lineHeight: 1 }}>{parentName}</p>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{parentEmail}</p>
          </div>
          <button onClick={handleSignOut} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', padding: '8px 14px', color: 'rgba(255,255,255,0.7)', fontFamily: 'Georgia, serif', fontSize: '13px', cursor: 'pointer' }}>
            Sign out
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '40px 24px' }}>

        <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '24px', color: '#1B4332', marginBottom: '6px' }}>
          Payments & Invoices
        </h1>
        <p style={{ fontFamily: 'Georgia, serif', fontSize: '14px', color: '#9CA3AF', marginBottom: '32px' }}>
          View and download your payment invoices
        </p>

        {payments.length === 0 ? (
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '60px', textAlign: 'center' }}>
            <p style={{ fontSize: '40px', marginBottom: '12px' }}>📄</p>
            <p style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '16px', color: '#374151' }}>No payments yet</p>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: '14px', color: '#9CA3AF', marginTop: '6px' }}>Your invoices will appear here after payment.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {payments.map(p => {
              const date   = new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
              const amount = (p.amount_paise / 100).toLocaleString('en-IN')
              return (
                <div key={p.id} style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px 28px' }}>
                  {/* Header row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <p style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '16px', color: '#1B4332' }}>{p.invoice_number}</p>
                        <span style={{ background: '#D8F3DC', color: '#1B4332', fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '11px', padding: '2px 10px', borderRadius: '10px' }}>✓ Paid</span>
                      </div>
                      <p style={{ fontFamily: 'Georgia, serif', fontSize: '13px', color: '#9CA3AF' }}>{date}</p>
                    </div>
                    <p style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '22px', color: '#1B4332' }}>₹{amount}</p>
                  </div>

                  {/* Details */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                    {[
                      { label: 'Plan',         value: 'Annual 2025–26' },
                      { label: 'Students',      value: `${p.student_count} student${p.student_count > 1 ? 's' : ''}` },
                      { label: 'Payment ID',    value: p.razorpay_payment_id || '—' },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p style={{ fontFamily: 'Georgia, serif', fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>{label}</p>
                        <p style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '13px', color: '#374151', wordBreak: 'break-all' }}>{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Download button */}
                  <button
                    onClick={() => handlePrintInvoice(p)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px', border: '1.5px solid #D8F3DC', background: '#F0FDF4', fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '13px', color: '#1B4332', cursor: 'pointer' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2v8M5 7l3 3 3-3M2 12h12" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Download / Print Invoice
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
