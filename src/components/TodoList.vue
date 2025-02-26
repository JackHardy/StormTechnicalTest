<script setup>
import TodoCard from "@/components/TodoCard.vue";
import {useTodoListStore} from "@/stores/TodoListStore.js";

const TodoListStore = useTodoListStore();
</script>

<template>
  <div class="grid lg:grid-cols-3 sm:grid-cols-2 gap-4 border p-8 md:rounded-lg">
    <TodoCard v-for="(todo, index) in TodoListStore.todos" :index="todo.id" :todo="todo" :card-index="index + 1"/>
  </div>
</template>
