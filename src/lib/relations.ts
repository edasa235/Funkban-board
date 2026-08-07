import { relations } from "drizzle-orm";
import {boards, columns, labels, taskLabels, tasks} from "@/DB/schema";



export const boardsRelations = relations(
    boards,
    ({ many }) => ({
        columns: many(columns)
    })
);


export const columnsRelations = relations(
    columns,
    ({ one, many }) => ({

        board: one(boards, {
            fields: [
                columns.boardId
            ],
            references: [
                boards.id
            ]
        }),

        tasks: many(tasks)

    })
);


export const tasksRelations = relations(
    tasks,
    ({ one, many }) => ({

        column: one(columns, {
            fields: [
                tasks.columnId
            ],
            references: [
                columns.id
            ]
        }),

        taskLabels: many(taskLabels)

    })
);


export const labelsRelations = relations(
    labels,
    ({ many }) => ({

        taskLabels: many(taskLabels)

    })
);


export const taskLabelsRelations = relations(
    taskLabels,
    ({ one }) => ({

        task: one(tasks, {
            fields: [
                taskLabels.taskId
            ],
            references: [
                tasks.id
            ]
        }),


        label: one(labels, {
            fields: [
                taskLabels.labelId
            ],
            references: [
                labels.id
            ]
        })

    })
);