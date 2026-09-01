<template>
  <div class="app-shell">
    <TheHeader />
    <main class="page-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import TheHeader from './components/layout/TheHeader.vue'
</script>
