import { NextResponse } from "next/server";

import {
    corsResponse,
    optionsResponse,
} from "@/lib/cors";
import {assignLabelToTask, getLabelsByTaskId, labelExists, taskExists} from "@/services/tasks";

export async function OPTIONS() {
    return optionsResponse();
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ taskId: string }> }
) {
    try {
        const { taskId } = await params;

        const exists = await taskExists(taskId);

        if (!exists) {
            return corsResponse(
                NextResponse.json(
                    { error: "Task not found" },
                    { status: 404 }
                )
            );
        }

        const taskLabels = await getLabelsByTaskId(taskId);

        return corsResponse(
            NextResponse.json(taskLabels)
        );
    } catch (error) {
        console.error("Failed to get task labels:", error);

        return corsResponse(
            NextResponse.json(
                { error: "Failed to get task labels" },
                { status: 500 }
            )
        );
    }
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ taskId: string }> }
) {
    try {
        const { taskId } = await params;
        const body = await req.json();

        if (!body.labelId || typeof body.labelId !== "string") {
            return corsResponse(
                NextResponse.json(
                    { error: "labelId is required" },
                    { status: 400 }
                )
            );
        }

        const taskExistsResult = await taskExists(taskId);

        if (!taskExistsResult) {
            return corsResponse(
                NextResponse.json(
                    { error: "Task not found" },
                    { status: 404 }
                )
            );
        }

        const labelExistsResult = await labelExists(body.labelId);

        if (!labelExistsResult) {
            return corsResponse(
                NextResponse.json(
                    { error: "Label not found" },
                    { status: 404 }
                )
            );
        }

        const assignment = await assignLabelToTask(
            taskId,
            body.labelId
        );

        return corsResponse(
            NextResponse.json(
                assignment,
                { status: 201 }
            )
        );
    } catch (error: Error) {
        console.error("Failed to assign label:", error);
        if (error?.cause?.code === "23505") {
            return corsResponse(
                NextResponse.json(
                    { error: "Label already assigned to task" },
                    { status: 409 }
                )
            );
        }

        return corsResponse(
            NextResponse.json(
                { error: "Failed to assign label" },
                { status: 500 }
            )
        );
    }
}