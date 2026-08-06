import dotenv from "dotenv";

dotenv.config({
    path: "/home/mily/funkban/.env"
});

console.log("DATABASE_URL:", process.env.DATABASE_URL);

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/DB/schema";
import { boards } from "@/DB/schema";

const client = postgres(process.env.DATABASE_URL!);

export const db = drizzle(client, {
    schema,
});

async function test() {
    const result = await db.select().from(boards);
    console.log(result);
}

test();