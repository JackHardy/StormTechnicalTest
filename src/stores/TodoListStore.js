import { computed } from 'vue'
import { defineStore } from 'pinia'

export const useTodoListStore = defineStore('TodoListStore', {
  state: () => ({
    todos: [],
  }),

  actions: {
    fetchTodos() {
      // fake data mimicking a basic index API call
      const data = {
      todos: [
          {
            id: 1,
            title: 'Tidy the office',
            description: '',
            status: 'todo',
          },
          {
            id: 2,
            title: 'Learn Pinia',
            description: 'You can find the docs at https://pinia.vuejs.org/',
            status: 'in-progress',
          },
          {
            id: 3,
            title: 'Build a Todo App',
            description: 'This should include the ability to add, edit, and delete todos',
            status: 'completed',
          }
        ],
      };

      this.todos = data.todos;
    },
  },
})
