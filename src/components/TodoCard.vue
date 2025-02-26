<script setup>
import {ref} from "vue";

defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

const open = ref(false);
</script>

<template>
  <div
      :class="[open ? 'h-48' : 'h-fit']"
      class="py-4 overflow-hidden gap-4 flex flex-col justify-between rounded-lg bg-white shadow-lg border border-brand-gray cursor-pointer ring ring-transparent hover:ring-brand-red hover:border-none"
       @click="open = !open">
    <div class="px-4 sm:px-6">
      {{ todo.title }}
    </div>
      <div v-if="open && todo.description" class="max-h-24 px-4 sm:px-6 overflow-y-auto">
        {{ todo.description }}
      </div>
      <div class="flex px-4 sm:px-6 text-2xs text-gray-300 w-full justify-end">
        {{ `created by ${todo.created_by} at ${todo.created_at}` }}
      </div>
  </div>
</template>
