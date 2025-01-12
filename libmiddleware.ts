import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth-storage')
  const userType = authToken ? JSON.parse(authToken.value).state.userType : null

  // Protect doctor routes
  if (request.nextUrl.pathname.startsWith('/dashboard') || 
      request.nextUrl.pathname.startsWith('/patients') || 
      request.nextUrl.pathname.startsWith('/analytics')) {
    if (userType !== 'doctor') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/patients/:path*', '/analytics/:path*']
}

