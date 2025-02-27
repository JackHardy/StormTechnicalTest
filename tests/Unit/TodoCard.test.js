import {flushPromises, mount} from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import TodoCard from "@/components/Todo/TodoCard.vue";
import { useTodoListStore } from "@/stores/TodoListStore.js";
import {format, subDays} from "date-fns";
import {ExclamationTriangleIcon} from "@heroicons/vue/24/solid";
import TodoCardButtons from "@/components/Buttons/Todo/TodoCardButtons.vue";
import {createPinia, setActivePinia} from "pinia";
import {createApp} from "vue";

const app = createApp({})

describe("TodoCard.vue", () => {
  let todoListStore;

  beforeEach(() => {
    const pinia = createPinia()
    app.use(pinia)
    setActivePinia(pinia)
    todoListStore = useTodoListStore();
  });

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

    expect(wrapper.vm.open).toBe(false);
    await wrapper.trigger("click");
    expect(wrapper.vm.open).toBe(true);
    await wrapper.trigger("click");
    expect(wrapper.vm.open).toBe(false);
  });

  it("check to do button show on hover", async () => {
    const wrapper = mount(TodoCard, {
      props: { todo: mockTodo, cardIndex: 1 },
    });

    await wrapper.trigger("mouseover");
    expect(wrapper.findComponent(TodoCardButtons).exists()).toBe(true);
  });

  it("progresses the status to in progress when the progress button is clicked", async () => {
    const progressTodo = vi.spyOn(todoListStore, 'progressTodo');
    const wrapper = mount(TodoCard, {
      props: { todo: mockTodo, cardIndex: 1 },
    });

    await wrapper.trigger("mouseover");
    const todoCardButtonsWrapper = wrapper.findComponent(TodoCardButtons)
    const buttonWrapper = todoCardButtonsWrapper.find({ ref: 'progress-button' })
    await buttonWrapper.trigger("click");
    expect(progressTodo).toHaveBeenCalledTimes(1);
    expect(progressTodo).toHaveBeenCalledWith(wrapper.props('cardIndex'), 'in-progress');
  });

  it("progresses the status to complete when the complete button is clicked", async () => {
    const progressTodo = vi.spyOn(todoListStore, 'progressTodo');
    const inProgressTodo = { ...mockTodo, status: 'in-progress' };
    const wrapper = mount(TodoCard, {
      props: { todo: inProgressTodo, cardIndex: 1 },
    });

    await wrapper.trigger("mouseover");
    const todoCardButtonsWrapper = wrapper.findComponent(TodoCardButtons)
    const buttonWrapper = todoCardButtonsWrapper.find({ ref: 'complete-button' })
    await buttonWrapper.trigger("click");
    expect(progressTodo).toHaveBeenCalledTimes(1);
    expect(progressTodo).toHaveBeenCalledWith(wrapper.props('cardIndex'), 'complete');
  });

  it("progresses the status back to todo when the hold button is clicked", async () => {
    const progressTodo = vi.spyOn(todoListStore, 'progressTodo');
    const inProgressTodo = { ...mockTodo, status: 'in-progress' };
    const wrapper = mount(TodoCard, {
      props: { todo: inProgressTodo, cardIndex: 1 },
    });

    await wrapper.trigger("mouseover");
    const todoCardButtonsWrapper = wrapper.findComponent(TodoCardButtons)
    const buttonWrapper = todoCardButtonsWrapper.find({ ref: 'hold-button' })
    await buttonWrapper.trigger("click");
    expect(progressTodo).toHaveBeenCalledTimes(1);
    expect(progressTodo).toHaveBeenCalledWith(wrapper.props('cardIndex'), 'todo');
  });

  it("todo is deleted when the delete button is clicked", async () => {
    const deleteTodo = vi.spyOn(todoListStore, 'deleteTodo');
    const wrapper = mount(TodoCard, {
      props: { todo: mockTodo, cardIndex: 1 },
    });

    await wrapper.trigger("mouseover");
    const todoCardButtonsWrapper = wrapper.findComponent(TodoCardButtons)
    const buttonWrapper = todoCardButtonsWrapper.find({ ref: 'delete-button' })
    await buttonWrapper.trigger("click");
    expect(deleteTodo).toHaveBeenCalledTimes(1);
    await flushPromises();
    expect(todoListStore.todos).toHaveLength(0);
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
    todoListStore.editingIndex = 2;
    const wrapper = mount(TodoCard, {
      props: { todo: mockTodo, cardIndex: 1 },
    });

    expect(wrapper.classes()).toContain("pointer-events-none");
  });
});
