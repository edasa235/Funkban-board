import {integer, pgTable, primaryKey, text, timestamp, uuid, varchar} from "drizzle-orm/pg-core";

export const boards = pgTable("boards", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", {
        length: 255
    }).notNull(),
    createdAt: timestamp("created_at")
        .defaultNow()
});
export const columns = pgTable("columns", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),
    boardId: uuid("board_id")
        .references(() => boards.id)
        .notNull(),
    name: varchar("name", {
        length: 50
    }).notNull(),

    position: integer("position")
        .notNull()
});
export const tasks = pgTable("tasks", {
    id: uuid("id")
        .defaultRandom()
        .primaryKey(),

    title: varchar("title", {
        length: 255
    }).notNull(),

    description: text("description"),

    priority: varchar("priority", {
        length: 20
    }),

    columnId: uuid("column_id")
        .references(() => columns.id)
        .notNull(),

    createdAt: timestamp("created_at")
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .defaultNow()
});
export const labels = pgTable("labels", {
    id: uuid("id")
        .defaultRandom()
        .primaryKey(),

    name: varchar("name", {
        length: 50
    }).notNull()
});
export const taskLabels = pgTable(
    "task_labels",
    {
        taskId: uuid("task_id")
            .references(() => tasks.id)
            .notNull(),

        labelId: uuid("label_id")
            .references(() => labels.id)
            .notNull()
    },
    (table) => [
        primaryKey({
            columns: [
                table.taskId,
                table.labelId
            ]
        })
    ]
);