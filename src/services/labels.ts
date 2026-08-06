import {db} from "@/lib/db";
import {labels} from "@/DB/schema";
import {eq} from "drizzle-orm";

export async function getLabels() {
    return db
        .select()
        .from(labels);
}
export async function getLabelById(id: string) {
    const result = await db
        .select()
        .from(labels)
        .where(eq(labels.id, id))
        .limit(1);

    return result[0];
}
export async function createLabel(name: string) {
    const result = await db
        .insert(labels)
        .values({
            name
        })
        .returning();
    return result[0];
}
export async function updateLabel(
    id: string,
    name: string
) {
    const result = await db
        .update(labels)
        .set({
            name
        })
        .where(eq(labels.id, id))
        .returning();

    return result[0];
}
export async function deleteLabel(id: string) {
    const result = await db
        .delete(labels)
        .where(eq(labels.id, id))
        .returning();

    return result[0];
}