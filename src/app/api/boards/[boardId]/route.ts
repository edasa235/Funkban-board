
import { NextResponse } from "next/server";
import {
    deleteBoard,
    getBoardById,
    updateBoard,
} from "@/services/boards";
import { corsResponse } from "@/lib/cors";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ boardId: string }> }
) {
    try {
        const { boardId } = await params;

        const board = await getBoardById(boardId);

        if (!board) {
            return corsResponse(
                NextResponse.json(
                    { error: "Board not found" },
                    { status: 404 }
                )
            );
        }

        return corsResponse(
            NextResponse.json(board)
        );
    } catch (error) {
        console.error("Failed to get board:", error);

        return corsResponse(
            NextResponse.json(
                { error: "Failed to get board" },
                { status: 500 }
            )
        );
    }
}

export async function PATCH(
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

        const board = await updateBoard(
            boardId,
            body.name
        );

        if (!board) {
            return corsResponse(
                NextResponse.json(
                    { error: "Board not found" },
                    { status: 404 }
                )
            );
        }

        return corsResponse(
            NextResponse.json(board)
        );
    } catch (error) {
        console.error("Failed to update board:", error);

        return corsResponse(
            NextResponse.json(
                { error: "Failed to update board" },
                { status: 500 }
            )
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ boardId: string }> }
) {
    try {
        const { boardId } = await params;

        const board = await deleteBoard(boardId);

        if (!board) {
            return corsResponse(
                NextResponse.json(
                    { error: "Board not found" },
                    { status: 404 }
                )
            );
        }

        return corsResponse(
            NextResponse.json({
                message: "Board deleted",
                board,
            })
        );
    } catch (error) {
        console.error("Failed to delete board:", error);

        return corsResponse(
            NextResponse.json(
                { error: "Failed to delete board" },
                { status: 500 }
            )
        );
    }
}
