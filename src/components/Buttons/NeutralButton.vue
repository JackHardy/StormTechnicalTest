<script setup>
import {ArrowPathIcon} from "@heroicons/vue/24/solid/index.js";

defineProps({
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value),
  },
  isThinking: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button :disabled="disabled"
          :type="type"
          :class="{'pointer-events-none': isThinking || disabled}"
          class="flex w-full justify-center rounded-md border border-brand-red px-4 py-2 text-sm font-medium
          text-brand-red hover:bg-brand-red hover:text-white focus:outline-none focus:ring-2
          focus:ring-brand-red focus:ring-offset-2 disabled:opacity-25">
    <slot v-if="!isThinking"/>
    <ArrowPathIcon v-else class="animate-spin size-5 text-white"/>
  </button>
</template>
