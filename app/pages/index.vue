<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <div class="p-10">
    <h1 class="text-3xl text-center font-bold">Protected Page</h1>
    <nuxt-link to="/auth/login">Login</nuxt-link>
  </div>
</template>

<style scoped></style>
