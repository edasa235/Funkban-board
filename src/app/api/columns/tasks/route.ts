import {createTask, gettasksbycolumnid} from "@/services/tasks";
import {NextResponse} from "next/server";
import {corsResponse} from "@/lib/cors";

export async function GET(
    req: Request,
    {params}: { params: Promise<{ columnId: string }> }
) {
    const {columnId} = await params;
    const column = await gettasksbycolumnid(columnId);
    return corsResponse(NextResponse.json(column));
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const task = await createTask(body.columnId);
        return corsResponse(NextResponse.json(task));
    } catch (error) {
        console.error(error);
    }
}