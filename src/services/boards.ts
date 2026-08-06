import {db} from "@/lib/db";
import {boards} from "@/DB/schema";
import {eq} from "drizzle-orm";
export async function getAllBoards() {
    return db
        .select()
        .from(boards);
}
export async function createBoard(name: string) {
    return db
        .insert(boards)
        .values({
            name: name
        })
}
export async function updateboard ( id:string, name: string) {
    const result = await db
        .update(boards)
        .set({ name: name })
        .where(eq(boards.id, id))
    return result[0];
}
export async function deleteBoard (id: string) {
    const result = await db
    .delete(boards)
    .where(eq(boards.id, id))
    return result[0];
}