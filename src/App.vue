<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-brand-red text-white">
    <div class="max-w-7xl mx-auto flex items-center p-4">
      <!-- Logo Section -->
      <div class="flex-shrink-0">
        <img class="h-8 w-auto" src="./assets/images/logo.svg" alt="Logo" />
      </div>
      <!-- Navigation Section -->
      <nav class="flex space-x-4 ml-4">
        <RouterLink class="hover:text-gray-700 transition duration-200" to="/">Todo</RouterLink>
        <RouterLink class="hover:text-gray-700 transition duration-200" to="/about"
          >About</RouterLink
        >
      </nav>
    </div>
  </header>
  <RouterView />
</template>
