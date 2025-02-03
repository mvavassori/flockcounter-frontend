// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow unauthenticated access for the demo domain.
  if (pathname.startsWith(`/websites/${process.env.NEXT_PUBLIC_DEMO_DOMAIN}`)) {
    // don't allow access to settings page
    if (
      !pathname.startsWith(
        `/websites/${process.env.NEXT_PUBLIC_DEMO_DOMAIN}/settings`
      )
    ) {
      return NextResponse.next();
    }
  }

  // Otherwise, check for a valid token.
  const token = await getToken({ req });
  if (!token) {
    // Redirect to sign-in if not authenticated.
    const signInUrl = req.nextUrl.clone();
    signInUrl.pathname = "/api/auth/signin";
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/websites/:path*"],
};
