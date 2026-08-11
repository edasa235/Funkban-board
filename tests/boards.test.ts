
import {describe, it, expect, vi, beforeEach} from "vitest";
import {createBoard, getAllBoards} from "@/services/boards";
import {GET, POST} from "@/app/api/boards/route";
vi.mock("@/services/boards", () => ({
    getAllBoards: vi.fn(),
    createBoard: vi.fn()
}));
describe("Boards API", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it("GET /api/boards - returns all boards", async () => {
        const boards = [
            {
                id: "1",
                name: "Development Board",
                createdAt: new Date("2026-08-10T13:22:55.962Z")
            },
            {
                id: "2",
                name: "Project Planning",
                createdAt: new Date("2026-08-10T13:22:55.962Z")
            }
        ];
        vi.mocked(getAllBoards).mockResolvedValue(boards);
        const response = await GET();
        const body = await response.json();
        expect(response.status).toBe(200);
        expect(body).toEqual([
            {
                id: "1",
                name: "Development Board",
                createdAt: "2026-08-10T13:22:55.962Z"
            },
            {
                id: "2",
                name: "Project Planning",
                createdAt: "2026-08-10T13:22:55.962Z"
            }
        ]);

        expect(getAllBoards).toHaveBeenCalledOnce();
    });

    it("POST /api/boards - creates a board", async () => {
        const board = {
            id: "1",
            name: "Development Board",
            createdAt: new Date("2026-08-10T13:22:55.977Z")
        };

        vi.mocked(createBoard).mockResolvedValue(board);

        const request = new Request("http://localhost/api/boards", {
            method: "POST",
            body: JSON.stringify({
                name: "Development Board"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const response = await POST(request);
        const body = await response.json();

        expect(response.status).toBe(201);

        expect(body).toEqual({
            id: "1",
            name: "Development Board",
            createdAt: "2026-08-10T13:22:55.977Z"
        });

        expect(createBoard).toHaveBeenCalledWith(
            "Development Board"
        );
    });
});

