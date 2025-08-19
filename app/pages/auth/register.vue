<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { z } from 'zod/v4'

const schema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    passwordConfirm: z.string(),
  })
  .check((data) => {
    if (data.value.password !== data.value.passwordConfirm) {
      data.issues.push({
        code: 'custom',
        path: ['passwordConfirm'],
        message: 'Passwords do not math',
        input: data.value.passwordConfirm,
      })
    }
  })

type Schema = z.output<typeof schema>

const state = reactive({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
})

const loading = ref(false)

const toast = useToast()
const session = useUserSession()

const onRegister = async (event: FormSubmitEvent<Schema>) => {
  try {
    loading.value = true
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        name: event.data.name,
        email: event.data.email,
        password: event.data.password,
      },
    })

    if (!response.success) {
      throw Error('Registration failed')
    }

    await session.fetch()

    await navigateTo('/')
  } catch {
    toast.add({
      color: 'error',
      title: 'Failed to create account',
      description: 'Please check your details and try again.',
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-[400px] mx-auto">
    <h1 class="text-2xl font-bold text-center my-4">Register</h1>
    <UForm :schema :state @submit="onRegister" class="space-y-3">
      <UFormField name="name" label="Name" required>
        <UInput class="w-full" placeholder="Enter your name" v-model="state.name" />
      </UFormField>
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
      <UFormField name="passwordConfirm" label="passwordConfirm" required>
        <UInput
          class="w-full"
          placeholder="Confirm your password"
          v-model="state.passwordConfirm"
          type="password"
        />
      </UFormField>
      <UButton :loading type="submit">Register</UButton>
    </UForm>
  </div>
</template>

<style scoped></style>
