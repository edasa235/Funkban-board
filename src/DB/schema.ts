
import {
    integer,
    pgTable,
    primaryKey,
    text,
    timestamp,
    uuid,
    varchar
} from "drizzle-orm/pg-core";

export const boards = pgTable("boards", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", {
        length: 100
    }).notNull(),
    createdAt: timestamp("created_at")
        .defaultNow()
});

export const columns = pgTable("columns", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),
    boardId: uuid("board_id")
        .references(() => boards.id, {
            onDelete: "cascade"
        })
        .notNull(),
    name: varchar("name", {
        length: 50
    }),
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
    }).notNull().default("Medium"),

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
    }).notNull().unique()
});
export const taskLabels = pgTable(
    "task_labels",
    {
        taskId: uuid("task_id")
            .references(() => tasks.id, {
                onDelete: "cascade",
            })
            .notNull(),

        labelId: uuid("label_id")
            .references(() => labels.id, {
                onDelete: "cascade",
            })
            .notNull(),
    },
    (table) => [
        primaryKey({
            columns: [
                table.taskId,
                table.labelId,
            ],
        }),
    ]
);