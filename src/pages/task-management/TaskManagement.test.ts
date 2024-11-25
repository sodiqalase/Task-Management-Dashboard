import { render, screen } from "@testing-library/vue";
import { describe, it, expect, vi } from "vitest";

import TaskManagementPage from "./TaskManagementPage.vue"; // Adjust the import to your file structure
// import { TaskService } from "../../services/task.service";

vi.mock("../../services/task.service", () => ({
    TaskService: {
        getTasks: vi.fn(() => ({
            isLoading: false,
            data: [],
        })),
    },
}));

vi.mock("vue-router", () => ({
    useRoute: vi.fn(),
    useRouter: vi.fn(),
}));

describe("TaskManagementPage.vue", () => {
    it("renders the table with task data", async () => {
        render(TaskManagementPage);

        // Check headers
        const headers = [
            "Title",
            "Description",
            "Status",
            "Priority",
            "DueDate",
        ];
        headers.forEach((header) => {
            expect(screen.queryByText(header)).toBeTruthy(); // Checks if the element exists
        });

        // Check rows are rendered
        expect(screen.queryByText("Task 1")).toBeTruthy();
        expect(screen.queryByText("Description of task 1")).toBeTruthy();
    });
});
