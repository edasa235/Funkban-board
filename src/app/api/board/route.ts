import {createBoard, getAllBoards} from "@/services/boards";
import {NextResponse} from "next/server";

export async function GET()  {
    try {
        const boards = await getAllBoards();
        return NextResponse.json(boards);
    }
    catch (error) {
        console.error("failed to get boards:", error);
        return NextResponse.json(
            { error: "Failed to get boards" },
            { status: 500 }
        );
    }
}
export async function POST(req: Request) {
    try {
        const body = await req.json();
        if (!body.name || typeof body.name !== "string") {
            return NextResponse.json(
                { error: "Name is required" },
                { status: 400 }
            );
        }
        const board = await createBoard(body.name);
        return NextResponse.json(board, { status: 201 });
    } catch (error) {
        console.error("Failed to create board:", error);
        return NextResponse.json(
            { error: "Failed to create board" },
            { status: 500 }
        );
    }
}