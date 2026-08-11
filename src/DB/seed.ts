import { db } from "@/lib/db";
import {
    boards,
    columns,
    tasks,
    labels,
    taskLabels
} from "./schema";
async function seed() {
    console.log("Seeding database...");

    const [board1, board2] = await db.insert(boards).values([
        {
            name: "Development Board"
        },
        {
            name: "Project Planning"
        }
    ]).returning();

    const [todo, development, done] = await db.insert(columns).values([
        {
            boardId: board1.id,
            name: "Todo",
            position: 1
        },
        {
            boardId: board1.id,
            name: "Development",
            position: 2
        },
        {
            boardId: board1.id,
            name: "Done",
            position: 3
        },
        {
            boardId: board2.id,
            name: "Planning",
            position: 1
        }
    ]).returning();

    const [task1, task2, task3, task4] = await db.insert(tasks).values([
        {
            title: "Implement API",
            description: "Create the REST API endpoints",
            priority: "High",
            columnId: development.id
        },
        {
            title: "Write documentation",
            description: "Document the API with Swagger",
            priority: "Medium",
            columnId: todo.id
        },
        {
            title: "Test database",
            description: "Test database operations",
            priority: "High",
            columnId: todo.id
        },
        {
            title: "Finish project",
            description: "Prepare the final demonstration",
            priority: "Low",
            columnId: done.id
        }
    ]).returning();

    const [bug, feature, documentation] = await db.insert(labels).values([
        {
            name: "Bug"
        },
        {
            name: "Feature"
        },
        {
            name: "Documentation"
        }
    ]).returning();

    await db.insert(taskLabels).values([
        {
            taskId: task1.id,
            labelId: feature.id
        },
        {
            taskId: task2.id,
            labelId: documentation.id
        },
        {
            taskId: task3.id,
            labelId: bug.id
        },
        {
            taskId: task4.id,
            labelId: documentation.id
        }
    ]);

    console.log("Database seeded successfully!");
}

seed().catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
});