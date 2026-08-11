
import { NextResponse } from "next/server";

export const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization",
};

export function corsResponse(response: NextResponse) {
    Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    return response;
}

export function optionsResponse() {
    return new NextResponse(null, {
        status: 204,
        headers: corsHeaders,
    });
}

