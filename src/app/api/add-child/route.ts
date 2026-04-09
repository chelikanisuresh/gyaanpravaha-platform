import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { childName, childEmail, password } = await req.json()

    // Admin client — created at request time so env vars are available
    const adminSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    // Verify logged-in parent
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Verify parent role
    const { data: profile } = await adminSupabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    if (profile?.role !== 'parent') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    // Max 5 children per parent
    const { data: links } = await adminSupabase
      .from('parent_student_links')
      .select('student_id')
      .eq('parent_id', user.id)
    if (links && links.length >= 5) {
      return NextResponse.json({ error: 'Maximum 5 children allowed per account.' }, { status: 400 })
    }

    // Duplicate email check
    const { data: existing } = await adminSupabase
      .from('profiles')
      .select('id')
      .eq('email', childEmail)
      .single()
    if (existing) {
      return NextResponse.json({ error: 'This school Gmail is already registered.' }, { status: 409 })
    }

    // Create student using admin API — email_confirm: true skips verification
    const { data: newUser, error: createError } = await adminSupabase.auth.admin.createUser({
      email: childEmail,
      password,
      email_confirm: true,
      user_metadata: { full_name: childName, role: 'student' },
    })
    if (createError) throw createError

    // Insert into profiles
    await adminSupabase.from('profiles').insert({
      id: newUser.user.id,
      full_name: childName,
      email: childEmail,
      role: 'student',
    })

    // Link child to parent
    await adminSupabase.from('parent_student_links').insert({
      parent_id: user.id,
      student_id: newUser.user.id,
    })

    return NextResponse.json({ success: true, childId: newUser.user.id })
  } catch (err: any) {
    console.error('Add child error:', err)
    return NextResponse.json({ error: err.message || 'Failed to create child account.' }, { status: 500 })
  }
}
