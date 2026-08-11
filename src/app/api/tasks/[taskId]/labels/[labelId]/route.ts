import { NextResponse } from "next/server";

import {
    corsResponse,
    optionsResponse,
} from "@/lib/cors";
import {labelExists, removeLabelFromTask, taskExists} from "@/services/tasks";
export async function OPTIONS() {
    return optionsResponse();
}
export async function DELETE(
    req: Request,
    {
        params,
    }: {
        params: Promise<{
            taskId: string;
            labelId: string;
        }>;
    }
) {
    try {
        const { taskId, labelId } = await params;
        const taskExistsResult = await taskExists(taskId);
        if (!taskExistsResult) {
            return corsResponse(
                NextResponse.json(
                    { error: "Task not found" },
                    { status: 404 }
                )
            );
        }
        const labelExistsResult = await labelExists(labelId);
        if (!labelExistsResult) {
            return corsResponse(
                NextResponse.json(
                    { error: "Label not found" },
                    { status: 404 }
                )
            );
        }
        const removed = await removeLabelFromTask(
            taskId,
            labelId
        );
        if (!removed) {
            return corsResponse(
                NextResponse.json(
                    { error: "Label is not assigned to task" },
                    { status: 404 }
                )
            );
        }
        return corsResponse(
            NextResponse.json({
                message: "Label removed from task",
            })
        );
    } catch (error) {
        console.error("Failed to remove label:", error);
        return corsResponse(
            NextResponse.json(
                { error: "Failed to remove label" },
                { status: 500 }
            )
        );
    }
}