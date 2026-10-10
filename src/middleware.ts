import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isProtectedRoute = pathname.startsWith("/dashboard");
    const isAuthenticated = request.cookies.get("auth_token")?.value;

    if (isProtectedRoute && !isAuthenticated) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = "/login";
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
