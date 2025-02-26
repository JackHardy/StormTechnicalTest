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
            deadline_at: '2025-02-23 12:00:00',
            created_by: 'Jack Hardy',
            created_at: '2025-02-25 13:53:23',
          },
          {
            id: 2,
            title: 'Learn Pinia',
            description: 'You can find the docs at https://pinia.vuejs.org/',
            status: 'in-progress',
            deadline_at: '2025-02-28 10:00:00',
            created_by: 'Victor Saly',
            created_at: '2025-02-24 08:24:34',
          },
          {
            id: 3,
            title: 'Build a Todo App',
            description: 'This should include the ability to add, edit, and delete todos',
            status: 'completed',
            created_by: 'Jack Hardy',
            deadline_at: '2025-02-26 22:00:00',
            created_at: '2025-02-26 15:21:56',
          }
        ],
      };

      this.todos = data.todos;
    },

    deleteTodo(id) {
      // fake a basic delete API call
      const data = {
        success: true,
        message: 'Todo deleted successfully',
      };

      if(data.success) {
        this.todos = this.todos.filter(todo => todo.id !== id);
      }
    }
  },
})
