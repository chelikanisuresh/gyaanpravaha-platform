import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id:     process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    const { studentCount } = await request.json()

    if (!studentCount || ![1, 2].includes(studentCount)) {
      return NextResponse.json({ error: 'Invalid student count' }, { status: 400 })
    }

    const amountPaise = studentCount * 499900 // ₹4,999 per student in paise

    const order = await razorpay.orders.create({
      amount:   amountPaise,
      currency: 'INR',
      receipt:  `gp_${Date.now()}`,
      notes: {
        student_count: String(studentCount),
        platform:      'GyaanPravaha',
      },
    })

    return NextResponse.json({
      orderId:      order.id,
      amount:       amountPaise,
      currency:     'INR',
      studentCount,
    })
  } catch (err: any) {
    console.error('Razorpay create order error:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to create order' },
      { status: 500 }
    )
  }
}
