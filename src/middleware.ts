import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/" || pathname.startsWith("/users")) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      const url = new URL("/login", request.url);
      return NextResponse.redirect(url);
    }
  }
  if (pathname === "/login" || pathname === "/register") {
    const token = request.cookies.get("token")?.value;

    if (token) {
      const url = new URL("/", request.url);
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: ["/", "/users", "/users/:path", "/login", "/register"],
};
