import {db} from "@/lib/db";
import { columns} from "@/DB/schema";
import {eq} from "drizzle-orm";

export async function getColumnsByBoardId(boardId: string) {
    return db
        .select()
        .from(columns)
        .where(eq(columns.boardId, boardId));
}
//2. Get a single column'
export async function getColumnById(columnId: string) {
    const result = await db
        .select()
        .from(columns)
        .where(eq(columns.id, columnId))
        .limit(1);
    return result[0];
}
//3. Create a column
export async function createcolumn( data: { boardId: string, name: string, position: number }) {
   return db
   .insert(columns)
       .values(data);
}
//4. Update a column
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
export async function updateposistion(
    id: string,
    position: number
) {
    return db
        .update(columns)
        .set({
            position
        })
        .where(eq(columns.id, id));
}