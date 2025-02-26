<script setup>
defineProps({
  error: {
    type: String,
    default: '',
  },
});
</script>

<template>
    <p class="text-xs text-red-500">
        {{ error }}
    </p>
</template>
