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
    editingIndex: null,
    isThinking: false,
    formOpen: false,
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

    openForm() {
      this.resetForm();
      this.formOpen = true;
    },

    closeForm() {
      this.formOpen = false;
      this.editingIndex = null;
      this.resetForm();
    },

    editTodo(todo, cardIndex) {
      this.resetErrors();
      this.editingIndex = cardIndex;
      this.form = {
        title: todo.title,
        description: todo.description,
        deadline_at: todo.deadline_at,
      };

      this.formOpen = true;
    },

    resetForm() {
      this.resetErrors();

      if(this.editingIndex !== null) {
        this.form = {
          title: this.todos[this.arrayIndex].title,
          description: this.todos[this.arrayIndex].description,
          deadline_at: this.todos[this.arrayIndex].deadline_at,
        };
        } else {
        this.form = {
          title: '',
          description: '',
          deadline_at: '',
        };
      }
    },

    resetErrors() {
      this.errors = {};
    },

    saveTodo() {
      if(this.editingIndex !== null) {
        this.updateTodo();
      } else {
        this.storeTodo();
      }
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

          this.formOpen = false;
        } else {
          this.errors = response.data.errors;
        }
      }, 2000);
    },

    async updateTodo() {
      // fake a basic update API call with fake loading time
      this.isThinking = true;
      setTimeout(()=>{
        this.isThinking = false;

        const response = this.validateForm();

        if (response.data.success) {
          this.todos[this.arrayIndex].title = this.form.title;
          this.todos[this.arrayIndex].description = this.form.description;
          this.todos[this.arrayIndex].deadline_at = this.form.deadline_at;

          this.formOpen = false;
          this.editingIndex = null;
        } else {
          this.errors = response.data.errors;
        }
      }, 2000);
    },

    // obviously at this point I would want to be passing though an id but for the sake of this example I'm just passing through the card index
    async progressTodo(cardIndex, type) {
      // fake a basic update API call to move through statuses with fake loading time
      this.isThinking = true;
      setTimeout(()=>{
        this.isThinking = false;

        // endpoint would be variable based on the type of status change
        const data = {
          success: true,
          message: 'Todo held successfully',
        };

        if(data.success) {
          this.todos[cardIndex - 1].status = type;
        }
      }, 1000);
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
      this.isThinking = true;
      setTimeout(()=>{
        this.isThinking = false;

        const data = {
          success: true,
          message: 'Todo deleted successfully',
        };

        if(data.success) {
          this.todos = this.todos.filter(todo => todo.id !== id);
        }
      }, 1500);
    }
  },

  getters: {
    isFormDirty: (state) => {
      return state.form.title || state.form.description || state.form.deadline_at;
    },
    arrayIndex: (state) => state.editingIndex - 1,
  }
})
