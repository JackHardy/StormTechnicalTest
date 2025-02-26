<script setup>
import {computed, ref} from "vue";
import { TrashIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/solid'
import { useTodoListStore } from "@/stores/TodoListStore.js";
import { isToday, isPast } from "date-fns";

const props = defineProps({
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
const open = ref(false);
const warning = computed(() => {
  return isToday(props.todo.deadline_at) || isPast(props.todo.deadline_at);
});
</script>

<template>
  <div
      :class="[open ? 'h-48' : 'h-fit']"
      class="group py-4 overflow-hidden gap-4 flex flex-col justify-between rounded-lg bg-white shadow-lg border border-brand-gray cursor-pointer hover:ring-brand-red hover:ring hover:ring-offset-2 hover:border-none hover-shadow-xl"
       @click="open = !open">
    <div class="px-4 sm:px-6 flex items-center justify-between h-10">
      <div class="flex gap-2">
        <div class="relative flex size-7">
          <div class="z-10 size-7 flex items-center rounded-full p-1 bg-brand-red text-white">
            <div v-if="warning">
              <ExclamationTriangleIcon class="size-5 mx-auto"/>
            </div>
            <p v-else class="w-full text-center">
              {{ cardIndex }}
            </p>
          </div>
          <div :class="{ 'animate-ping': warning }" class="absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></div>
        </div>
        <div>
          {{ todo.title }}
        </div>
      </div>
      <div>
        <div class="size-7 flex items-center rounded-full p-1 hidden group-hover:block hover:bg-brand-red hover:text-white size-5 text-brand-red"
        @click="TodoListStore.deleteTodo(todo.id)">
          <TrashIcon class="size-5 mx-auto"/>
        </div>
      </div>
    </div>
    <div v-if="open && todo.description" class="max-h-24 px-4 sm:px-6 overflow-y-auto">
      {{ todo.description }}
    </div>
    <div class="flex px-4 sm:px-6 text-2xs text-gray-300 w-full justify-end select-none">
      {{ `created by ${todo.created_by} at ${todo.created_at}` }}
    </div>
  </div>
</template>
