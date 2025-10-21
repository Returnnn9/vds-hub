import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/jwt"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value
  const { pathname } = request.nextUrl

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/admin"]
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Admin-only routes
  const adminRoutes = ["/admin"]
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))

  // Auth routes (login, register)
  const authRoutes = ["/login", "/register"]
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  if (!token && isProtectedRoute) {
    // Redirect to login if trying to access protected route without token
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (token) {
    const payload = verifyToken(token)

    if (!payload) {
      // Invalid token, clear it and redirect to login if on protected route
      const response = isProtectedRoute ? NextResponse.redirect(new URL("/login", request.url)) : NextResponse.next()
      response.cookies.delete("auth-token")
      return response
    }

    // Check admin access
    if (isAdminRoute && payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Redirect authenticated users away from auth pages
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
