import {db} from "@/lib/db";

import {columns, labels, taskLabels, tasks} from "@/DB/schema";
import {and, eq, ilike} from "drizzle-orm";

export async function gettasksbycolumnid(columnId: string) {
    return db
        .select()
        .from(tasks)
        .where(eq(tasks.columnId, columnId));
}
export async function getTaskById(taskId: string) {
    const result = await db
        .select()
        .from(tasks)
        .where(eq(tasks.id, taskId))
        .limit(1);
    return result[0];
}
export async function createTask(data: {
    title: string;
    description?: string;
    priority?: string;
    columnId: string;
}) {
    const result = await db
        .insert(tasks)
        .values(data)
        .returning();

    return result[0];
}
export async function updateTask(taskId: string, data: { title?: string; description?: string; priority?: string; }) {
    const result = await db
        .update(tasks)
        .set(data)
        .where(eq(tasks.id, taskId))
        .returning();
    return result[0];
}
export async function moveTask(taskId: string, columnId: string) {
    const result = await db
        .update(tasks)
        .set({columnId})
        .where(eq(tasks.id, taskId))
        .returning();
    return result[0];
}
export async function deleteTask(taskId: string) {
    const result = await db
        .delete(tasks)
        .where(eq(tasks.id, taskId))
        .returning();
    return result[0];
}
export async function searchTasks(boardId: string, query: string) {
    return db
        .select()
        .from(tasks)
        .innerJoin(columns, eq(tasks.columnId, columns.id))
        .where(
            and(eq(columns.boardId, boardId), ilike(tasks.title, `%${query}%`))
        );
}
export async function getLabelsByTaskId(taskId: string) {
    return db
        .select({
            id: labels.id,
            name: labels.name,
        })
        .from(taskLabels)
        .innerJoin(labels, eq(taskLabels.labelId, labels.id))
        .where(eq(taskLabels.taskId, taskId));
}

export async function assignLabelToTask(
    taskId: string,
    labelId: string
) {
    const result = await db
        .insert(taskLabels)
        .values({
            taskId,
            labelId,
        })
        .returning();

    return result[0];
}

export async function removeLabelFromTask(
    taskId: string,
    labelId: string
) {
    const result = await db
        .delete(taskLabels)
        .where(
            and(
                eq(taskLabels.taskId, taskId),
                eq(taskLabels.labelId, labelId)
            )
        )
        .returning();

    return result[0];
}

export async function taskExists(taskId: string) {
    const result = await db
        .select({ id: tasks.id })
        .from(tasks)
        .where(eq(tasks.id, taskId))
        .limit(1);

    return result.length > 0;
}

export async function labelExists(labelId: string) {
    const result = await db
        .select({ id: labels.id })
        .from(labels)
        .where(eq(labels.id, labelId))
        .limit(1);

    return result.length > 0;
}