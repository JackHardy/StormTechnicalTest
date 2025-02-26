import { defineStore } from 'pinia'
import {reactive} from "vue";
import {format, addDays, subDays} from "date-fns";

export const useTodoListStore = defineStore('TodoListStore', {
  state: () => ({
    todos: [],
    errors: {},
    form: {
      title: '',
      description: '',
      status: 'todo',
      deadline_at: '',
    },
    isThinking: false,
    newTodoOpen: false,
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
            status: 'complete',
            deadline_at: format(addDays(new Date(), 1), "yyyy-MM-dd"),
            created_by: 'Jack Hardy',
            created_at: format(subDays(new Date(), 1), "yyyy-MM-dd"),
          },
          {
            id: 2,
            title: 'Learn Pinia',
            description: 'You can find the docs at https://pinia.vuejs.org/',
            status: 'in-progress',
            deadline_at: format(addDays(new Date(), 2), "yyyy-MM-dd"),
            created_by: 'Victor Saly',
            created_at: format(subDays(new Date(), 3), "yyyy-MM-dd"),
          },
          {
            id: 3,
            title: 'Build a Todo App',
            description: 'This should include the ability to add, edit, and delete todos',
            status: 'todo',
            deadline_at: format(new Date(), "yyyy-MM-dd"),
            created_by: 'Jack Hardy',
            created_at: format(subDays(new Date(), 1), "yyyy-MM-dd"),
          }
        ],
      };

      this.todos = data.todos;
    },

    openNewTodo() {
      this.resetForm();
      this.newTodoOpen = true;
    },

    closeNewTodo() {
      this.newTodoOpen = false;
    },

    resetForm() {
      this.resetErrors();
      this.form = {
        title: '',
        description: '',
        status: 'todo',
        deadline_at: '',
        created_by: '',
      };
    },

    resetErrors() {
      this.errors = {};
    },

    async storeTodo() {
      // fake a basic store API call with fake loading time
      this.isThinking = true;
      setTimeout(()=>{
        this.isThinking = false;

        const response = this.validateForm();

        if (response.data.success) {
          this.todos.push({
            id: this.todos.length + 1,
            title: this.form.title,
            description: this.form.description,
            status: 'todo',
            deadline_at: this.form.deadline_at,
            created_by: 'Victor Saly',
            created_at: format(new Date(), "yyyy-MM-dd"),
          });

          this.newTodoOpen = false;
        } else {
          this.errors = response.data.errors;
        }
      }, 2000);
    },

    validateForm() {
      const errors = {};

      if(!this.form.title) {
        errors.title = 'The title field is required';
      }

      if(!this.form.description) {
        errors.description = 'The description field is required';
      }

      if(!this.form.deadline_at) {
        errors.deadline_at = 'The deadline field is required';
      }

      if(Object.keys(errors).length === 0) {
        return {
          data: {
            success: true,
            message: 'Todo created successfully',
          }
        };
      } else {
        return {
          data: {
            success: false,
            message: 'The form contains errors',
            errors: errors,
          }
        };
      }
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

  getters: {
    isFormDirty: (state) => {
      return state.form.title || state.form.description || state.form.deadline_at;
    }
  }
})
