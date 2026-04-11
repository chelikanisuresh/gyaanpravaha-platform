import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

function generateInvoiceNumber(): string {
  const year  = new Date().getFullYear()
  const rand  = Math.floor(10000 + Math.random() * 90000)
  return `GP-${year}-${rand}`
}

export async function POST(request: NextRequest) {
  // Initialise inside handler — env vars available at runtime, not build time
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      parentName,
      parentEmail,
      studentCount,
      amountPaise,
    } = await request.json()

    // ── Verify signature ──────────────────────────────────────────────────────
    const body      = `${razorpay_order_id}|${razorpay_payment_id}`
    const expected  = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex')

    if (expected !== razorpay_signature) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 })
    }

    // ── Store payment in Supabase ─────────────────────────────────────────────
    const invoiceNumber = generateInvoiceNumber()

    const { error: dbError } = await supabaseAdmin
      .from('payments')
      .insert({
        parent_email:        parentEmail,
        parent_name:         parentName,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount_paise:        amountPaise,
        student_count:       studentCount,
        status:              'paid',
        invoice_number:      invoiceNumber,
      })

    if (dbError) {
      console.error('DB insert error:', dbError)
      // Payment is verified — don't fail, just log
    }

    return NextResponse.json({
      success:        true,
      invoiceNumber,
      paymentId:      razorpay_payment_id,
    })
  } catch (err: any) {
    console.error('Verify payment error:', err)
    return NextResponse.json(
      { error: err.message || 'Verification failed' },
      { status: 500 }
    )
  }
}
