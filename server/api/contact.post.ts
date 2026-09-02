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

  await appendRecord('.data/contact-messages.ndjson', { name, email, subject, message })

  // TODO: route by subject — partners@, volunteer@, give@, else hello@ — via your
  // transactional email provider (Resend, Postmark, SES).

  return { ok: true }
})
