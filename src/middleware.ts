import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import NextAuth from "next-auth";
import authConfig from "@/utils/auth.config";

const { auth } = NextAuth(authConfig);

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname } = nextUrl;

  const session = await auth();

  if (pathname.startsWith("/sign-in")) {
    return !session
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/", nextUrl));
  }

  return !session
    ? NextResponse.redirect(new URL("/sign-in", nextUrl))
    : NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|logo.png).*)",
  ],
};
