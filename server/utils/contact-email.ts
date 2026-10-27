export interface ContactSubmission {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactEmail {
  from: string
  to: string[]
  replyTo: string
  subject: string
  text: string
  html: string
}

interface EmailClient {
  emails: {
    send: (email: ContactEmail) => Promise<{
      data: { id: string } | null
      error: { message: string } | null
    }>
  }
}

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;')

export function buildContactEmail(submission: ContactSubmission): ContactEmail {
  const name = escapeHtml(submission.name)
  const email = escapeHtml(submission.email)
  const subject = escapeHtml(submission.subject)
  const message = escapeHtml(submission.message).replaceAll('\n', '<br>')

  return {
    from: 'Bridge of Hope <hello@emitwave.com>',
    to: ['hello@bohreform.org'],
    replyTo: submission.email,
    subject: `Website enquiry: ${submission.subject}`,
    text: [
      `Name: ${submission.name}`,
      `Email: ${submission.email}`,
      `Subject: ${submission.subject}`,
      '',
      submission.message,
    ].join('\n'),
    html: `
      <h1>New website enquiry</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `.trim(),
  }
}

export async function sendContactEmail(
  client: EmailClient,
  submission: ContactSubmission,
): Promise<string> {
  const { data, error } = await client.emails.send(buildContactEmail(submission))

  if (error) throw new Error(error.message)
  if (!data?.id) throw new Error('Resend did not return an email ID.')

  return data.id
}
