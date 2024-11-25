import { render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import Status from "../Status.vue";

describe("Status.vue", () => {
    it("renders the correct class and text for 'Pending' status", () => {
        render(Status, {
            props: { status: "Pending" },
        });

        const badge = screen.getByText("Pending");
        expect(badge).toBeTruthy();
        expect(badge.className).toContain("bg-yellow-100 text-yellow-500");
    });

    it("renders the correct class and text for 'In_Progress' status", () => {
        render(Status, {
            props: { status: "In_Progress" },
        });

        const badge = screen.getByText("In Progress");
        expect(badge).toBeTruthy();
        expect(badge.className).toContain("bg-blue-100 text-blue-500");
    });

    it("renders the correct class and text for 'Completed' status", () => {
        render(Status, {
            props: { status: "Completed" },
        });

        const badge = screen.getByText("Completed");
        expect(badge).toBeTruthy();
        expect(badge.className).toContain("bg-green-100 text-green-500");
    });
});
