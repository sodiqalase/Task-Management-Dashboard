import { render, screen } from "@testing-library/vue";
import { describe, it, expect, vi } from "vitest";

import TaskManagementPage from "./TaskManagementPage.vue";

vi.mock("../../services/task.service", () => ({
    TaskService: {
        getTasks: vi.fn(() => ({
            isLoading: false,
            data: {
                value: {
                    data: [
                        {
                            title: "Task 1",
                            description: "Description of task 1",
                            status: "Pending",
                            priority: "High",
                            dueDate: "2024-11-25",
                        },
                    ],
                },
            },
        })),
    },
}));

vi.mock("vue-router", () => ({
    useRoute: vi.fn(() => ({ query: {} })),
    useRouter: vi.fn(() => ({ push: vi.fn() })),
}));

describe("TaskManagementPage.vue", () => {
    it("renders table headers correctly", async () => {
        render(TaskManagementPage);

        // Wait for task rows to appear
        expect(await screen.findByText("Task 1")).toBeTruthy();
        expect(await screen.findByText("Description of task 1")).toBeTruthy();
    });
});
describe("TaskManagementPage.vue", () => {
    it("renders the table with task data", async () => {
        render(TaskManagementPage);

        // Wait for task rows to appear
        expect(await screen.findByText("Task 1")).toBeTruthy();
        expect(await screen.findByText("Description of task 1")).toBeTruthy();
    });
});