import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/', '/gk', '/login', '/register', '/welcome', '/auth', '/redirect']

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route =>
    pathname === route || pathname.startsWith(route + '/')
  )
}

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Not logged in + protected route → go to login
  if (!user && !isPublicRoute(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Logged in + trying to access login or register → redirect based on role
  if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const url = request.nextUrl.clone()
    if (profile?.role === 'admin') {
      url.pathname = '/admin'
    } else if (profile?.role === 'parent') {
      url.pathname = '/parent/dashboard'
    } else {
      url.pathname = '/student/dashboard'
    }
    return NextResponse.redirect(url)
  }

  // Logged in student trying to access parent routes → redirect to student dashboard
  if (user && request.nextUrl.pathname.startsWith('/parent')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role === 'student') {
      const url = request.nextUrl.clone()
      url.pathname = '/student/dashboard'
      return NextResponse.redirect(url)
    }
  }

  // Logged in parent trying to access student routes → redirect to parent dashboard
  if (user && request.nextUrl.pathname.startsWith('/student')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role === 'parent') {
      const url = request.nextUrl.clone()
      url.pathname = '/parent/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
