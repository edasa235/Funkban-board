import {db} from "@/lib/db";
import { columns} from "@/DB/schema";
import {eq} from "drizzle-orm";

export async function getColumnsByBoardId(boardId: string) {
    return db
        .select()
        .from(columns)
        .where(eq(columns.boardId, boardId));
}
export async function getColumnById(columnId: string) {
    const result = await db
        .select()
        .from(columns)
        .where(eq(columns.id, columnId))
        .limit(1);
    return result[0];
}
export async function createcolumn( data: { boardId: string, name: string, position: number }) {
   return db
   .insert(columns)
       .values(data);
}
export async function updatecolumn(id: string, data: {
    name?: string;
    position?: number;
}) {
    const result = await db
        .update(columns)
        .set(data)
        .where(eq(columns.id, id))
        .returning();

    return result[0];
}
export async function deletecolumn(id: string) {
    const result = await db
    .delete(columns)
    .where(eq(columns.id, id))
    .returning();
    return result[0];

}