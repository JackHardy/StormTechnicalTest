<script setup>
import OverdueBadge from "@/components/Badges/OverdueBadge.vue";
import InProgressBadge from "@/components/Badges/InProgressBadge.vue";
import TodoBadge from "@/components/Badges/TodoBadge.vue";
import CompleteBadge from "@/components/Badges/CompleteBadge.vue";

defineProps({
  status: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <OverdueBadge v-if="status === 'overdue'"/>
  <TodoBadge v-else-if="status === 'todo'"/>
  <InProgressBadge v-else-if="status === 'in-progress'"/>
  <CompleteBadge v-else-if="status === 'complete'"/>
</template>
