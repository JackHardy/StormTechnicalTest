<script setup>
import {
  ArrowPathIcon,
  CheckBadgeIcon,
  PencilSquareIcon,
  PlayIcon,
  StopIcon,
  TrashIcon
} from "@heroicons/vue/24/solid/index.js";
import {useTodoListStore} from "@/stores/TodoListStore.js";

defineProps({
  todo: {
    type: Object,
    required: true,
  },
  cardIndex: {
    type: Number,
    required: true,
  },
});

const TodoListStore = useTodoListStore();

defineEmits(['edit']);
</script>

<template>
    <div v-if="todo.status === 'in-progress'" class="size-7 flex items-center rounded-full p-1 hover:bg-brand-red hover:text-white size-5 text-brand-red"
         @click.stop="TodoListStore.progressTodo(cardIndex, 'todo')">
      <StopIcon class="size-5 mx-auto"/>
    </div>
    <div v-if="todo.status === 'todo'" class="size-7 flex items-center rounded-full p-1 hover:bg-brand-red hover:text-white size-5 text-brand-red"
         @click.stop="TodoListStore.progressTodo(cardIndex, 'in-progress')">
      <PlayIcon class="size-5 mx-auto"/>
    </div>
    <div v-if="todo.status === 'in-progress'" class="size-7 flex items-center rounded-full p-1 hover:bg-brand-red hover:text-white size-5 text-brand-red"
         @click.stop="TodoListStore.progressTodo(cardIndex, 'complete')">
      <CheckBadgeIcon class="size-5 mx-auto"/>
    </div>
    <div class="size-7 flex items-center rounded-full p-1 hover:bg-brand-red hover:text-white size-5 text-brand-red"
         @click.stop="TodoListStore.editTodo(todo, cardIndex); $emit('edit')">
      <PencilSquareIcon class="size-5 mx-auto"/>
    </div>
    <div class="size-7 flex items-center rounded-full p-1 hover:bg-brand-red hover:text-white size-5 text-brand-red"
         @click.stop="TodoListStore.deleteTodo(todo.id)">
      <TrashIcon class="size-5 mx-auto"/>
    </div>
</template>
