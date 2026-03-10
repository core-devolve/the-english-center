import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;
        const token = req.nextauth.token;

        // Admin route → unauthenticated ya non-admin → 404
        if (pathname.startsWith("/admin")) {
            if (!token || (token as any)?.role !== "admin") {
                return NextResponse.rewrite(new URL("/404", req.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: () => true, // sab allow, check upar hoga
        },
    }
);

export const config = {
    matcher: [
        // Admin routes
        "/admin/:path*",
        // Secret login page
        "/:path*/login",
        // Sab routes — exist na karne wale bhi
        "/((?!_next/static|_next/image|favicon.ico|api).*)",
    ],
};