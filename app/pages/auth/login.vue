<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { email, z } from 'zod/v4'

const schema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: '',
  password: '',
})

const loading = ref(false)

const toast = useToast()

const onLogin = async (event: FormSubmitEvent<Schema>) => {
  loading.value = true
  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: event.data,
    })

    if (!response.success) {
      throw Error('Login failed')
    }

    await navigateTo('/')
  } catch {
    toast.add({
      color: 'error',
      title: 'Failed to loading',
      description: 'Please check your details and try again.',
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-[400px] mx-auto">
    <h1 class="text-2xl font-bold text-center my-4">Login</h1>
    <UForm :schema :state @submit="onLogin" class="space-y-3">
      <UFormField name="email" label="Email" required>
        <UInput class="w-full" placeholder="Enter your email" v-model="state.email" type="email" />
      </UFormField>
      <UFormField name="password" label="Password" required>
        <UInput
          class="w-full"
          placeholder="Enter your password"
          v-model="state.password"
          type="password"
        />
      </UFormField>

      <div class="flex justify-between items-center">
        <UButton :loading type="submit">Login</UButton>
        <nuxt-link to="/auth/register">Register</nuxt-link>
      </div>
    </UForm>
  </div>
</template>

<style scoped></style>
