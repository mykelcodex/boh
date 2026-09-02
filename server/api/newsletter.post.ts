export default defineEventHandler(async (event) => {
  const ip = getRequestHeader(event, 'x-forwarded-for') ?? 'local'
  if (!rateLimit(ip)) {
    throw createError({ statusCode: 429, message: 'Too many attempts. Please try again in a minute.' })
  }

  const { email } = await readBody<{ email?: string }>(event)
  const value = (email ?? '').trim()

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
    throw createError({ statusCode: 422, message: 'Please enter a valid email address.' })
  }

  await appendRecord('.data/subscribers.ndjson', { email: value })

  return { ok: true }
})
