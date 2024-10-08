import { NextRequest, NextResponse } from "next/server";

import { getSession } from "./lib/session";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/auth/signin", "/auth/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path === "/") {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  }

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const session = await getSession();

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
