import { describe, it, expect } from "vitest";
import { toTitleCase, extractPageTitle } from "../string.util"; // Adjust to your file path

describe("Utility Functions", () => {
    describe("toTitleCase", () => {
        it("should capitalize the first letter and lowercase the rest", () => {
            expect(toTitleCase("hello")).toBe("Hello");
            expect(toTitleCase("HELLO")).toBe("Hello");
            expect(toTitleCase("hELLo")).toBe("Hello");
        });

        it("should handle empty strings", () => {
            expect(toTitleCase("")).toBe("");
        });

        it("should handle single character strings", () => {
            expect(toTitleCase("a")).toBe("A");
            expect(toTitleCase("A")).toBe("A");
        });
    });

    describe("extractPageTitle", () => {
        it("should extract and format the page title from a URL", () => {
            const url = "/example.com/my-page-title";
            expect(extractPageTitle(url)).toBe("My Page Title");
        });

        it("should handle URLs with multiple words", () => {
            const url = "/example.com/multi-word-title-example";
            expect(extractPageTitle(url)).toBe("Multi Word Title Example");
        });

        it("should handle edge cases like trailing slashes", () => {
            const url = "/example.com/trailing-slash/";
            expect(extractPageTitle(url)).toBe("Trailing Slash");
        });
    });
});
