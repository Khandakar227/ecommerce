import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
 const access_token = request.cookies.get('access_token')?.value
 const pathname = request.nextUrl.pathname;

 if ((pathname.startsWith('/admin/dashboard') || pathname.startsWith('/admin/profile')) && !access_token)
 {
   return NextResponse.redirect(new URL('/admin/login', request.url))

 }
 if (pathname.startsWith('/admin/login') && access_token)
 {
  return NextResponse.redirect(new URL('/admin/dashboard', request.url))
 }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*'],
}