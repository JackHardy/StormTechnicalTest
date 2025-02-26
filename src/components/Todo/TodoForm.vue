<script setup>
import {useTodoListStore} from "@/stores/TodoListStore.js";
import {XCircleIcon} from "@heroicons/vue/24/solid/index.js";
import TextInput from "@/components/Form/TextInput.vue";
import PrimaryButton from "@/components/Buttons/PrimaryButton.vue";
import NeutralButton from "@/components/Buttons/NeutralButton.vue";
import DateInput from "@/components/Form/DateInput.vue";

const TodoListStore = useTodoListStore();
</script>

<template>
    <div class="relative border p-8 md:rounded-lg bg-white">
      <div class="grid sm:grid-cols-5 lg:grid-cols-9 gap-4">
        <TextInput class="sm:col-span-2 lg:col-span-3"
                   v-model="TodoListStore.form.title"
                   label="Title"
                   @update:modelValue="delete TodoListStore.errors.title"
                   :error="TodoListStore.errors?.title"/>
        <TextInput class="sm:col-span-3 lg:col-span-4"
                   optional
                   v-model="TodoListStore.form.description"
                   label="Description"
                   @update:modelValue="delete TodoListStore.errors.description"
                   :error="TodoListStore.errors?.description"/>
        <DateInput class="sm:col-span-3 lg:col-span-2"
                   v-model="TodoListStore.form.deadline_at"
                   label="Deadline"
                   @update:modelValue="delete TodoListStore.errors.deadline_at"
                   :error="TodoListStore.errors?.deadline_at"/>
      </div>
      <div class="mt-4 flex items-center w-full gap-4 justify-between sm:justify-end">
        <NeutralButton class="w-28" @click="TodoListStore.resetForm()">
          Reset
        </NeutralButton>
        <PrimaryButton :disabled="!TodoListStore.isFormDirty"
                       class="w-24"
                       type="submit"
                       :is-thinking="TodoListStore.isThinking"
                       @click="TodoListStore.storeTodo()">
          Create
        </PrimaryButton>
      </div>
      <XCircleIcon class="absolute top-2 right-2 size-6 mx-auto text-brand-red cursor-pointer" @click="TodoListStore.closeNewTodo()"/>
    </div>
</template>
