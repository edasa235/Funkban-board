import {NextResponse} from "next/server";
import {deleteTask, getTaskById, updateTask} from "@/services/tasks";
import {corsResponse} from "@/lib/cors";

export async function GET(
    req: Request,
    {params}: { params: Promise<{ taskId: string }> }
) {
    try {
        const {taskId} = await params;
        const task = await getTaskById(taskId);
        if (!task) {
            return corsResponse(NextResponse.json(
                {error: "Task not found"},
                {status: 404}
            ));
        }
        return corsResponse(NextResponse.json(task));
    } catch (error) {
        console.error("Failed to get task:", error);

        return corsResponse(NextResponse.json(
            {error: "Failed to get task"},
            {status: 500}
        ));
    }

}

export async function PATCH(
    req: Request,
    {params}: { params: Promise<{ taskId: string }> }
) {
    try {
        const {taskId} = await params;
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
            return corsResponse(NextResponse.json(
                {error: "Task not found"},
                {status: 404}
            ));
        }
        return corsResponse(NextResponse.json(task));
    } catch (error) {
        console.error("Failed to update task:", error);

        return corsResponse(NextResponse.json(
            {error: "Failed to update task"},
            {status: 500}
        ));
    }

}

export async function DELETE(
    req: Request,
    {params}: { params: Promise<{ taskId: string }> }
) {
    try {
        const {taskId} = await params;
        const task = await deleteTask(taskId);
        if (!task) {
            return corsResponse(NextResponse.json(
                {error: "Task not found"},
                {status: 404}
            ));
        }
        return corsResponse(NextResponse.json(task));
    } catch (error) {
        console.error("Failed to delete task:", error);

        return corsResponse(NextResponse.json(
            {error: "Failed to delete task"},
            {status: 500}
        ));
    }
}