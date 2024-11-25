import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Button from "../Button.vue";
import Spinner from "../Spinner.vue";

describe("ButtonComponent", () => {
    it("renders with default props", () => {
        const wrapper = mount(Button, {
            props: {
                buttonText: "Click Me",
                onClick: vi.fn(),
            },
        });

        expect(wrapper.text()).toContain("Click Me");
        expect(wrapper.find("button").attributes("type")).toBe("button");
        expect(wrapper.find("button").classes()).toContain("bg-primary");
    });

    it("applies correct variant styles", () => {
        const wrapper = mount(Button, {
            props: {
                buttonText: "Click Me",
                variant: "secondary",
                onClick: vi.fn(),
            },
        });

        expect(wrapper.find("button").classes()).toContain("bg-gray-200");
    });

    it("disables the button when disabled prop is true", async () => {
        const wrapper = mount(Button, {
            props: {
                buttonText: "Click Me",
                disabled: true,
                onClick: vi.fn(),
            },
        });

        const button = wrapper.find("button");
        expect(button.attributes("disabled")).toBeDefined();
        expect(button.classes()).toContain("disabled:cursor-not-allowed");
    });

    it("shows a spinner when loading is true", () => {
        const wrapper = mount(Button, {
            props: {
                buttonText: "Loading",
                loading: true,
                onClick: vi.fn(),
            },
            global: {
                components: { Spinner },
            },
        });

        expect(wrapper.findComponent(Spinner).exists()).toBe(true);
    });

    it("does not trigger onClick when button is disabled", async () => {
        const onClickMock = vi.fn();
        const wrapper = mount(Button, {
            props: {
                buttonText: "Click Me",
                disabled: true,
                onClick: onClickMock,
            },
        });

        await wrapper.find("button").trigger("click");
        expect(onClickMock).not.toHaveBeenCalled();
    });

    it("triggers onClick event when clicked", async () => {
        const onClickMock = vi.fn();
        const wrapper = mount(Button, {
            props: {
                buttonText: "Click Me",
                onClick: onClickMock,
            },
        });

        await wrapper.find("button").trigger("click");
        expect(onClickMock).toHaveBeenCalledOnce();
    });

    it("allows custom styles through the style prop", () => {
        const customStyle = "custom-class";
        const wrapper = mount(Button, {
            props: {
                buttonText: "Click Me",
                style: customStyle,
                onClick: vi.fn(),
            },
        });

        expect(wrapper.find("button").classes()).toContain(customStyle);
    });
});
