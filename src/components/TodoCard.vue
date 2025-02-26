<script setup>
defineProps({
  todo: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="overflow-hidden rounded-lg bg-white shadow-lg border border-brand-gray">
    <div class="px-4 py-5 sm:px-6">
      {{ todo.title }}
    </div>
    <div class="px-4 py-5 sm:px-6">
      {{ todo.description }}
    </div>
  </div>
</template>
