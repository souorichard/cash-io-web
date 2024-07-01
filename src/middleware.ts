import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from './utils/get-url'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  const pathname = request.nextUrl.pathname

  if ((pathname.includes('/auth') || pathname === '/') && token) {
    return NextResponse.redirect(new URL(getUrl('/app')))
  }

  if (pathname === '/' && !token) {
    return NextResponse.redirect(new URL(getUrl('/auth/sign-in')))
  }

  if (pathname.includes('/app') && !token) {
    return NextResponse.redirect(new URL(getUrl('/auth/sign-in')))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
