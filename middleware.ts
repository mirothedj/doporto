import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get("host") || ""

  // Check if the hostname is for the miro subdomain
  if (hostname.startsWith("miro.") || hostname.includes("miro")) {
    // Rewrite to the subdomain folder
    url.pathname = `/subdomain/miro${url.pathname}`
    return NextResponse.rewrite(url)
  }

  // For the main domain, continue as normal
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
