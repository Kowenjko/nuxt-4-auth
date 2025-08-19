<script lang="ts" setup>
const session = useUserSession()

const logout = async () => {
  await session.clear()

  await navigateTo('/auth/login')
}
</script>

<template>
  <div>
    <nav class="h-14 px-10 flex align-center items-center justify-between">
      <h2>Nuxt 4 Auth</h2>
      <auth-state>
        <template #default="{ loggedIn }">
          <button v-if="loggedIn" @click="logout">Logout</button>
          <nuxt-link v-else to="/auth/login">Login</nuxt-link>
        </template>
      </auth-state>
    </nav>
    <slot />
  </div>
</template>
