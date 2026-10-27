import { Resend } from 'resend'

const SUBJECTS = ['General enquiry', 'Partner with us', 'Volunteer', 'Donate']

export default defineEventHandler(async (event) => {
  const ip = getRequestHeader(event, 'x-forwarded-for') ?? 'local'
  if (!rateLimit(ip)) {
    throw createError({ statusCode: 429, message: 'Too many messages. Please try again in a minute.' })
  }

  const body = await readBody<Record<string, string>>(event)

  // Honeypot — bots fill hidden fields.
  if (body.website) return { ok: true }

  const name = (body.name ?? '').trim()
  const email = (body.email ?? '').trim()
  const subject = body.subject ?? ''
  const message = (body.message ?? '').trim()

  if (!name || name.length > 120) throw createError({ statusCode: 422, message: 'Please enter your name.' })
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw createError({ statusCode: 422, message: 'Please enter a valid email address.' })
  if (!SUBJECTS.includes(subject)) throw createError({ statusCode: 422, message: 'Please choose a subject.' })
  if (!message || message.length > 4000) throw createError({ statusCode: 422, message: 'Please enter a message.' })

  const config = useRuntimeConfig(event)
  if (!config.resendApiKey) {
    throw createError({ statusCode: 503, message: 'Message delivery is temporarily unavailable. Please email us directly.' })
  }

  try {
    const resend = new Resend(config.resendApiKey)
    await sendContactEmail(resend, { name, email, subject, message })
  } catch (error) {
    console.error('Contact email delivery failed', error)
    throw createError({ statusCode: 502, message: 'We could not send your message. Please try again or email us directly.' })
  }

  return { ok: true }
})
