<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <div class="p-10">
    <h1 class="text-3xl text-center font-bold">Protected Page</h1>
  </div>
</template>

<style scoped></style>
