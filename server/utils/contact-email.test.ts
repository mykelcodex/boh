import assert from 'node:assert/strict'
import test from 'node:test'

import { buildContactEmail, sendContactEmail } from './contact-email.ts'

test('builds a contact notification for the Bridge of Hope inbox', () => {
  const email = buildContactEmail({
    name: 'Ada Okafor',
    email: 'ada@example.com',
    subject: 'Volunteer',
    message: 'I would like to mentor young people.',
  })

  assert.equal(email.from, 'Bridge of Hope <hello@emitwave.com>')
  assert.deepEqual(email.to, ['hello@bohreform.org'])
  assert.equal(email.replyTo, 'ada@example.com')
  assert.equal(email.subject, 'Website enquiry: Volunteer')
  assert.match(email.text, /Ada Okafor/)
  assert.match(email.text, /I would like to mentor young people\./)
})

test('escapes visitor content before adding it to the HTML email', () => {
  const email = buildContactEmail({
    name: '<Ada & Co>',
    email: 'ada@example.com',
    subject: 'General enquiry',
    message: '<script>alert("x")</script>\nSecond line',
  })

  assert.doesNotMatch(email.html, /<script>/)
  assert.match(email.html, /&lt;Ada &amp; Co&gt;/)
  assert.match(email.html, /&lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt;<br>Second line/)
})

test('sends the built notification through the supplied email client', async () => {
  let sent: ReturnType<typeof buildContactEmail> | undefined
  const client = {
    emails: {
      send: async (email: ReturnType<typeof buildContactEmail>) => {
        sent = email
        return { data: { id: 'email-123' }, error: null }
      },
    },
  }

  const id = await sendContactEmail(client, {
    name: 'Ada Okafor',
    email: 'ada@example.com',
    subject: 'Donate',
    message: 'Please send the details.',
  })

  assert.equal(id, 'email-123')
  assert.equal(sent?.replyTo, 'ada@example.com')
})

test('fails when the email provider rejects the notification', async () => {
  const client = {
    emails: {
      send: async () => ({ data: null, error: { message: 'Rejected' } }),
    },
  }

  await assert.rejects(
    sendContactEmail(client, {
      name: 'Ada Okafor',
      email: 'ada@example.com',
      subject: 'Donate',
      message: 'Please send the details.',
    }),
    /Rejected/,
  )
})
