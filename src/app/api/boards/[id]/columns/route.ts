import {createcolumn, getColumnsByBoardId} from "@/services/columns";
import {NextResponse} from "next/server";
export async function GET(
    req: Request,
    { params }: { params: Promise<{ boardId:string }> }
) {
    const { boardId } = await params;
    const columns = await getColumnsByBoardId(boardId);
    return NextResponse.json(columns);
}
export async function POST(
    req: Request,
    { params }: { params: Promise<{ boardId:string }> }
) {
    const {boardId} = await params;
    const body = await req.json();
    const columns = await createcolumn({
        boardId,
        name: body.name,
        position: body.position,
    })
    return NextResponse.json(columns, {
        status:201
    });}
