import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import TodoCard from "@/components/Todo/TodoCard.vue";
import { useTodoListStore } from "@/stores/TodoListStore.js";
import {format, subDays} from "date-fns";
import {ExclamationTriangleIcon} from "@heroicons/vue/24/solid";

// Mock store
vi.mock("@/stores/TodoListStore.js", () => ({
  useTodoListStore: vi.fn(() => ({})),
}));

describe("TodoCard.vue", () => {
  const mockTodo = {
    title: "Test Todo",
    description: "This is a test description",
    deadline_at: "2025-02-24",
    status: "todo",
    created_by: "Jack Hardy",
    created_at: "2025-02-22",
  };

  it("renders correctly", () => {
    const wrapper = mount(TodoCard, {
      props: { todo: mockTodo, cardIndex: 1 },
    });

    expect(wrapper.text()).toContain("Test Todo");
    expect(wrapper.text()).toContain("Due 2025-02-24");
    expect(wrapper.text()).toContain("created by Jack Hardy at 2025-02-22");
  });

  it("toggles the card details when clicked", async () => {
    const wrapper = mount(TodoCard, {
      props: { todo: mockTodo, cardIndex: 1 },
    });

    expect(wrapper.vm.open).toBe(false); // Initially closed
    await wrapper.trigger("click");
    expect(wrapper.vm.open).toBe(true); // Opens on click
    await wrapper.trigger("click");
    expect(wrapper.vm.open).toBe(false); // Closes on second click
  });

  it("shows warning if the deadline is today or past", () => {
    const overdueTodo = { ...mockTodo, deadline_at: format(subDays(new Date(), 1), "yyyy-MM-dd") }; // Past date
    const wrapper = mount(TodoCard, {
      props: { todo: overdueTodo, cardIndex: 1 },
    });

    expect(wrapper.findComponent(ExclamationTriangleIcon).exists()).toBe(true);
  });

  it("shows due today if the deadline is today", () => {
    const completedTodo = { ...mockTodo, deadline_at: format(new Date(), "yyyy-MM-dd") };
    const wrapper = mount(TodoCard, {
      props: { todo: completedTodo, cardIndex: 1 },
    });

    expect(wrapper.text()).toContain("Test Todo");
    expect(wrapper.text()).toContain("Due today");
    expect(wrapper.text()).toContain("created by Jack Hardy at 2025-02-22");
  });

  it("hides warning if task is complete", () => {
    const completedTodo = { ...mockTodo, status: "complete", deadline_at: format(subDays(new Date(), 1), "yyyy-MM-dd") };
    const wrapper = mount(TodoCard, {
      props: { todo: completedTodo, cardIndex: 1 },
    });

    expect(wrapper.findComponent(ExclamationTriangleIcon).exists()).toBe(false);
  });

  it("disables interactions when another card is being edited", () => {
    useTodoListStore.mockReturnValue({ editingIndex: 2 }); // Simulate another card being edited
    const wrapper = mount(TodoCard, {
      props: { todo: mockTodo, cardIndex: 1 },
    });

    expect(wrapper.classes()).toContain("pointer-events-none");
  });
});
