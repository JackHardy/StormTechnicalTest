<script setup>
import TodoList from "@/components/TodoList.vue";
import {onBeforeMount} from "vue";
import {useTodoListStore} from "@/stores/TodoListStore.js";

const TodoListStore = useTodoListStore();

onBeforeMount(() => {
  TodoListStore.fetchTodos();
});
</script>

<template>
  <div class="mx-auto max-w-3xl lg:max-w-7xl">
    <h1 class="text-brand-red text-2xl my-4 font-bold ml-4">Todo List</h1>
    <TodoList/>
  </div>
</template>
