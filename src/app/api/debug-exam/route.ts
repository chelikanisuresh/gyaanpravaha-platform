// src/app/api/debug-exam/route.ts — TEMPORARY
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'not logged in' })
  
  const { data, error } = await supabase
    .from('exam_config')
    .select('*')
  
  return NextResponse.json({ user_id: user.id, data, error })
}
