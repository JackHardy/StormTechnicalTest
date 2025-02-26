<script setup>
import TodoCard from "@/components/Todo/TodoCard.vue";
import {useTodoListStore} from "@/stores/TodoListStore.js";
import {PlusIcon} from "@heroicons/vue/24/solid/index.js";
import TodoForm from "@/components/Todo/TodoForm.vue";

const TodoListStore = useTodoListStore();
</script>

<template>
  <div class="relative">
    <div class="border p-8 mb-10 md:rounded-lg bg-brand-white">
      <h1 class="text-center text-brand-red text-2xl mb-8 font-bold ml-4">Todo List</h1>
      <div class="mb-10 grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
        <TodoCard v-for="(todo, index) in TodoListStore.todos" :index="todo.id" :todo="todo" :card-index="index + 1"/>
      </div>
      <TodoForm v-if="TodoListStore.newTodoOpen"/>
    </div>
    <div class="absolute -bottom-5 w-full flex items-center">
      <div class="mx-auto flex items-center size-10 rounded-full p-1 bg-brand-red text-white cursor-pointer hover:bg-white hover:ring hover:ring-brand-red hover:text-brand-red"
      @click="TodoListStore.openNewTodo()">
        <PlusIcon class="size-8 mx-auto"/>
      </div>
    </div>
  </div>
</template>
