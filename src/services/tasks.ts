import {db} from "@/lib/db";

import {columns, tasks} from "@/DB/schema";
import {and, eq, ilike} from "drizzle-orm";

export async function gettasksbycolumnid(columnId: string) {
    return db
        .select()
        .from(columns)
        .where(eq(columns.boardId, columnId));
}
export async function gettaskbid(columnId: string) {
    return db
    .select()
    .from(columns)
    .where(eq(columns.id, columnId))
    .limit(1);
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
export async function updateTask(
    taskId: string,
    data: {
        title?: string;
        description?: string;
        priority?: string;
    }
) {
    const result = await db
        .update(tasks)
        .set(data)
        .where(eq(tasks.id, taskId))
        .returning();

    return result[0];
}
export async function moveTask(
    taskId: string,
    columnId: string
) {
    const result = await db
        .update(tasks)
        .set({
            columnId
        })
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
export async function searchTasks(
    boardId: string,
    query: string
) {
    return db
        .select()
        .from(tasks)
        .innerJoin(
            columns,
            eq(tasks.columnId, columns.id)
        )
        .where(
            and(
                eq(columns.boardId, boardId),
                ilike(tasks.title, `%${query}%`)
            )
        );
}