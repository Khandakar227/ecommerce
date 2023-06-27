import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
 const access_token = request.cookies.get('access_token')?.value
 if (request.nextUrl.pathname.startsWith('/admin/dashboard') && !access_token)
 {
   return NextResponse.redirect(new URL('/admin/login', request.url))
 }
 if (request.nextUrl.pathname.startsWith('/admin/login') && access_token)
 {
  return NextResponse.redirect(new URL('/admin/dashboard', request.url))
 }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*'],
}