import { NextResponse } from "next/server";
import {
    getTaskById,
    updateTask,
    deleteTask
} from "@/services/tasks";
export async function GET(
    req: Request,
    { params }: { params: Promise<{ taskId: string }> }
) {
    try {
        const { taskId } = await params;
        const task = await getTaskById(taskId);
        if (!task) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(task);
    } catch (error) {
        console.error("Failed to get task:", error);

        return NextResponse.json(
            { error: "Failed to get task" },
            { status: 500 }
        );
    }
}
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ taskId: string }> }
) {
    try {
        const { taskId } = await params;
        const body = await req.json();
        const task = await updateTask(
            taskId,
            {
                title: body.title,
                description: body.description,
                priority: body.priority
            }
        );
        if (!task) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(task);
    } catch (error) {
        console.error("Failed to update task:", error);

        return NextResponse.json(
            { error: "Failed to update task" },
            { status: 500 }
        );
    }
}
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ taskId: string }> }
) {
    try {
        const { taskId } = await params;
        const task = await deleteTask(taskId);
        if (!task) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(task);
    } catch (error) {
        console.error("Failed to delete task:", error);
        return NextResponse.json(
            { error: "Failed to delete task" },
            { status: 500 }
        );
    }
}