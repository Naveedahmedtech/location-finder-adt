import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPaths = ["/admin"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isProtected = protectedPaths.some((path) =>
        pathname.startsWith(path)
    );

    if (!isProtected) return NextResponse.next();

    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        const signInUrl = new URL("/auth/login", request.url);
        signInUrl.searchParams.set("callbackUrl", request.url);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

// middleware.ts (continued)
export const config = {
    matcher: ["/admin/:path*"],
};

