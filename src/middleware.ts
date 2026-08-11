
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization",
};

export function middleware(request: NextRequest) {
    if (request.method === "OPTIONS") {
        return new NextResponse(null, {
            status: 204,
            headers: corsHeaders,
        });
    }

    const response = NextResponse.next();

    Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    return response;
}

export const config = {
    matcher: "/api/:path*",
};
