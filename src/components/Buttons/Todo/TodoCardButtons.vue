<script setup>
import {
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
         @click.stop="TodoListStore.progressTodo(cardIndex, 'todo')"
         ref="hold-button">
      <StopIcon class="size-5 mx-auto"/>
    </div>
    <div v-if="todo.status === 'todo'" class="size-7 flex items-center rounded-full p-1 hover:bg-brand-red hover:text-white size-5 text-brand-red"
         @click.stop="TodoListStore.progressTodo(cardIndex, 'in-progress')"
         ref="progress-button">
      <PlayIcon class="size-5 mx-auto"/>
    </div>
    <div v-if="todo.status === 'in-progress'" class="size-7 flex items-center rounded-full p-1 hover:bg-brand-red hover:text-white size-5 text-brand-red"
         @click.stop="TodoListStore.progressTodo(cardIndex, 'complete')"
         ref="complete-button">
      <CheckBadgeIcon class="size-5 mx-auto"/>
    </div>
    <div class="size-7 flex items-center rounded-full p-1 hover:bg-brand-red hover:text-white size-5 text-brand-red"
         @click.stop="TodoListStore.editTodo(todo, cardIndex); $emit('edit')">
      <PencilSquareIcon class="size-5 mx-auto"/>
    </div>
    <div class="size-7 flex items-center rounded-full p-1 hover:bg-brand-red hover:text-white size-5 text-brand-red"
         @click.stop="TodoListStore.deleteTodo(todo.id)"
         ref="delete-button">
      <TrashIcon class="size-5 mx-auto"/>
    </div>
</template>
