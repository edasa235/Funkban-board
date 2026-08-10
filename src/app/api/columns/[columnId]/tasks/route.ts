import {createTask, gettasksbycolumnid,} from "@/services/tasks";
import { NextResponse } from "next/server";
import { corsResponse } from "@/lib/cors";


export async function GET(
    req: Request,
    { params }: { params: Promise<{ columnId: string }> }
) {
    const { columnId } = await params;

    const tasks = await gettasksbycolumnid(columnId);

    return corsResponse(
        NextResponse.json(tasks)
    );
}


export async function POST(
    req: Request,
    { params }: { params: Promise<{ columnId: string }> }
) {
    try {
        const { columnId } = await params;

        const body = await req.json();

        const task = await createTask({
            title: body.title,
            description: body.description,
            priority: body.priority,
            columnId
        });

        return corsResponse(
            NextResponse.json(task, { status: 201 })
        );

    } catch (error) {
        console.error(error);

        return corsResponse(
            NextResponse.json(
                { error: "Failed to create task" },
                { status: 500 }
            )
        );
    }
}