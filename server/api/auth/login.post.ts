import { z } from 'zod/v4'

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'Password must be at least 8 characters along'),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, loginSchema.parse)

  const user = await db.query.users.findFirst({
    where: eq(tables.users.email, body.email),
  })

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const result = await verifyPassword(user.passwordHash, body.password)

  if (!result) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  await setUserSession(event, {
    user: {
      id: user.id,
      name: user.name,
    },
    lastLoggedIn: new Date(),
  })

  return { success: true }
})
