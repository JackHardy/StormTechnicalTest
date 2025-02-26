<script setup>
import TodoCard from "@/components/TodoCard.vue";
import {onBeforeMount} from "vue";
import {useTodoListStore} from "@/stores/TodoListStore.js";

const TodoListStore = useTodoListStore();

onBeforeMount(() => {
  TodoListStore.fetchTodos();
});
</script>

<template>
  <div class="mx-auto max-w-2xl">
    <TodoCard v-for="todo in TodoListStore.todos" :index="todo.id" :todo="todo"/>
  </div>
</template>
