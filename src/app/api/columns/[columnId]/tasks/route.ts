import {
    createTask,
    gettasksbycolumnid,
} from "@/services/tasks";

import { NextResponse } from "next/server";

import {
    corsResponse,
    optionsResponse,
} from "@/lib/cors";

export async function OPTIONS() {
    return optionsResponse();
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ columnId: string }> }
) {
    try {
        const { columnId } = await params;

        const tasks = await gettasksbycolumnid(columnId);

        return corsResponse(
            NextResponse.json(tasks)
        );
    } catch (error) {
        console.error("Failed to get tasks:", error);

        return corsResponse(
            NextResponse.json(
                { error: "Failed to get tasks" },
                { status: 500 }
            )
        );
    }
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ columnId: string }> }
) {
    try {
        const { columnId } = await params;
        const body = await req.json();

        if (!body.title || typeof body.title !== "string") {
            return corsResponse(
                NextResponse.json(
                    { error: "Title is required" },
                    { status: 400 }
                )
            );
        }

        if (
            body.priority !== undefined &&
            !["Low", "Medium", "High"].includes(body.priority)
        ) {
            return corsResponse(
                NextResponse.json(
                    {
                        error: "Priority must be Low, Medium, or High",
                    },
                    { status: 400 }
                )
            );
        }

        const task = await createTask({
            title: body.title,
            description: body.description,
            priority: body.priority,
            columnId,
        });

        return corsResponse(
            NextResponse.json(task, {
                status: 201,
            })
        );
    } catch (error) {
        console.error("Failed to create task:", error);

        if (
            error instanceof Error &&
            error.message === "Column not found"
        ) {
            return corsResponse(
                NextResponse.json(
                    { error: "Column not found" },
                    { status: 404 }
                )
            );
        }

        return corsResponse(
            NextResponse.json(
                {
                    error: "Failed to create task",
                    details:
                        error instanceof Error
                            ? error.message
                            : String(error),
                },
                { status: 500 }
            )
        );
    }
}