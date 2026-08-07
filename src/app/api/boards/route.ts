import {createBoard, getAllBoards} from "@/services/boards";
import {NextResponse} from "next/server";
import {corsResponse} from "@/lib/cors";

export async function GET() {
    const boards = await getAllBoards();

    return corsResponse(
        NextResponse.json(boards)
    );

}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        if (!body.name || typeof body.name !== "string") {
            return corsResponse(
                NextResponse.json(
                    {error: "Name is required"},
                    {status: 400}
                )
            );
        }
        const board = await createBoard(body.name);
        return NextResponse.json(board, {status: 201});
    } catch (error) {
        console.error("Failed to create boards:", error);
        return NextResponse.json(
            {error: "Failed to create boards"},
            {status: 500}
        );
    }
}