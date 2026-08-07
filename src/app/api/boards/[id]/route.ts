import {NextResponse} from "next/server";
import {deleteBoard, getBoardById, updateBoard} from "@/services/boards";
export async function GET(
    request: Request,
    { params }: { params: Promise<{ boardId: string }> }
) {
    const { boardId } = await params;
    const board = await getBoardById(boardId);
    if (!board) {
        return NextResponse.json(
            {
                error: "Board not found"
            },
            {
                status: 404
            }
        );
    }
    return NextResponse.json(board);
}
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ boardId: string }> }
) {
    try {
        const { boardId } = await params;
        const body = await req.json();
        if (!body.name) {
            return NextResponse.json(
                {
                    error: "Name is required"
                },
                {
                    status: 400
                }
            );
        }
        const board = await updateBoard(
            boardId,
            body.name
        );
        return NextResponse.json(board);
    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                error: "Failed to update boards"
            },
            {
                status: 500
            }
        );
    }
}
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ boardId: string }> }
) {
    try {
        const { boardId } = await params;
        const board = await deleteBoard(boardId);
        return NextResponse.json({
            message: "Board deleted",
            board
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Failed to delete boards"
            },
            {
                status: 500
            }
        );
    }
}