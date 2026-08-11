import {deletecolumn, getColumnById, updatecolumn,} from "@/services/columns";

import {NextResponse} from "next/server";
import {corsResponse, optionsResponse,} from "@/lib/cors";

export async function OPTIONS() {
    return optionsResponse();
}

export async function GET(
    req: Request,
    {params}: { params: Promise<{ columnId: string }> }
) {
    try {
        const {columnId} = await params;

        const column = await getColumnById(columnId);

        return corsResponse(
            NextResponse.json(column)
        );
    } catch (error) {
        console.error("Failed to get column:", error);

        return corsResponse(
            NextResponse.json(
                {error: "Failed to get column"},
                {status: 500}
            )
        );
    }
}

export async function PATCH(
    req: Request,
    {params}: { params: Promise<{ columnId: string }> }
) {
    try {
        const {columnId} = await params;
        const body = await req.json();

        const column = await updatecolumn(
            columnId,
            body
        );

        return corsResponse(
            NextResponse.json(column)
        );
    } catch (error) {
        console.error("Failed to update column:", error);

        return corsResponse(
            NextResponse.json(
                {error: "Failed to update column"},
                {status: 500}
            )
        );
    }
}

export async function DELETE(
    req: Request,
    {params}: { params: Promise<{ columnId: string }> }
) {
    try {
        const {columnId} = await params;

        const column = await deletecolumn(columnId);

        return corsResponse(
            NextResponse.json(column)
        );
    } catch (error) {
        console.error("Failed to delete column:", error);

        return corsResponse(
            NextResponse.json(
                {error: "Failed to delete column"},
                {status: 500}
            )
        );
    }
}