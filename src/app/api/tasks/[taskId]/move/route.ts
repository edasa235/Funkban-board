import {NextResponse} from "next/server";
import {moveTask} from "@/services/tasks";
import {corsResponse} from "@/lib/cors";


export async function PATCH(
    req: Request,
    {params}: { params: Promise<{ taskId: string }> }
) {
    const {taskId} = await params;
    const body = await req.json();

    const task = await moveTask(
        taskId,
        body.columnId
    );

    return corsResponse(NextResponse.json(task));
}