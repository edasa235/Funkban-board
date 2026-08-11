import { createBoard, getAllBoards } from "@/services/boards";
import { NextResponse } from "next/server";
import { corsResponse, optionsResponse } from "@/lib/cors";

export async function OPTIONS() {
    return optionsResponse();
}

export async function GET() {
    try {
        const boards = await getAllBoards();

        return corsResponse(
            NextResponse.json(boards)
        );
    } catch (error) {
        console.error("Failed to get boards:", error);

        return corsResponse(
            NextResponse.json(
                { error: "Failed to get boards" },
                { status: 500 }
            )
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.name || typeof body.name !== "string") {
            return corsResponse(
                NextResponse.json(
                    { error: "Name is required" },
                    { status: 400 }
                )
            );
        }

        const board = await createBoard(body.name);

        return corsResponse(
            NextResponse.json(board, { status: 201 })
        );
    } catch (error) {
        console.error("Failed to create board:", error);

        return corsResponse(
            NextResponse.json(
                { error: "Failed to create board" },
                { status: 500 }
            )
        );
    }
}