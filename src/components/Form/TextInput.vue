<script setup>
import InputLabel from "@/components/Form/InputLabel.vue";
import InputError from "@/components/Form/InputError.vue";

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  optional: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex gap-2 items-center">
    <InputLabel v-if="label">
      {{ label }}
    </InputLabel>
      <span class="text-xs text-gray-300">
        {{ optional ? 'Optional' : 'Required' }}
      </span>
    </div>
    <input
      type="text"
      :class="{'ring-red-500': error}"
      :value="modelValue"
      class="block w-full rounded-md ring-0 border bg-brand-white outline-none py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-red px-6"
      @input="emit('update:modelValue', $event.target.value)">
    <InputError v-if="error" :error="error"/>
  </div>
</template>
