import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest, res: NextResponse) {
  const accessToken = request.cookies.get("demand-token")?.value;

  const routes = ["/profile", "/messages"];

  if (
    routes.some((route) => request.nextUrl.pathname.includes(route)) &&
    !accessToken
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
