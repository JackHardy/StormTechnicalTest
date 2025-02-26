<script setup>
import TodoList from "@/components/Todo/TodoList.vue";
import {onBeforeMount} from "vue";
import {useTodoListStore} from "@/stores/TodoListStore.js";

const TodoListStore = useTodoListStore();

onBeforeMount(() => {
  TodoListStore.fetchTodos();
});
</script>

<template>
  <div class="mx-auto max-w-3xl lg:max-w-7xl p-8">
    <TodoList/>
  </div>
</template>
