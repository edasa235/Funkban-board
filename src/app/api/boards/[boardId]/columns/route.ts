
import {
    createcolumn,
    getColumnsByBoardId,
} from "@/services/columns";
import { NextResponse } from "next/server";
import { corsResponse } from "@/lib/cors";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ boardId: string }> }
) {
    try {
        const { boardId } = await params;

        const columns = await getColumnsByBoardId(boardId);

        return corsResponse(
            NextResponse.json(columns)
        );
    } catch (error) {
        console.error("Failed to get columns:", error);

        return corsResponse(
            NextResponse.json(
                { error: "Failed to get columns" },
                { status: 500 }
            )
        );
    }
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ boardId: string }> }
) {
    try {
        const { boardId } = await params;
        const body = await req.json();

        if (!body.name || typeof body.name !== "string") {
            return corsResponse(
                NextResponse.json(
                    { error: "Name is required and must be a string" },
                    { status: 400 }
                )
            );
        }

        if (
            body.position !== undefined &&
            (!Number.isInteger(body.position) || body.position < 0)
        ) {
            return corsResponse(
                NextResponse.json(
                    {
                        error: "Position must be a non-negative integer",
                    },
                    { status: 400 }
                )
            );
        }

        const column = await createcolumn({
            boardId,
            name: body.name,
            position: body.position,
        });

        return corsResponse(
            NextResponse.json(
                column,
                { status: 201 }
            )
        );
    } catch (error) {
        console.error("Failed to create column:", error);

        return corsResponse(
            NextResponse.json(
                { error: "Failed to create column" },
                { status: 500 }
            )
        );
    }
}
