import { describe, test, expect } from "vitest";
import { formatDate } from "../date.util";

describe("formatDate", () => {
    test("handles invalid date gracefully", () => {
        const invalidDate = "invalid-date";
        const formattedDate = formatDate(invalidDate);

        expect(formattedDate).toBe("Invalid Date");
    });
});
