import * as functions from 'firebase-functions/v1'
import * as admin from 'firebase-admin'

admin.initializeApp()

interface LeadData {
  name: string
  email: string
  phone: string
  city: string
  occupation: string
  course: string
  message: string
  status: string
}

function getBrevoApiKey(): string {
  const config = functions.config()
  return config.brevo?.api_key || process.env.BREVO_API_KEY || ''
}

function getBrevoSenderEmail(): string {
  const config = functions.config()
  return config.brevo?.sender_email || process.env.BREVO_SENDER_EMAIL || 'no-reply@globaltradingacademy.com'
}

function getNotificationEmail(): string {
  const config = functions.config()
  return config.notification?.email || process.env.NOTIFICATION_EMAIL || ''
}

function getInviteLink(): string {
  const config = functions.config()
  return config.invite?.link || process.env.INVITE_LINK || 'https://globaltradingacademy.github.io/'
}

async function sendBrevoEmail(to: string, subject: string, html: string) {
  const apiKey = getBrevoApiKey()
  if (!apiKey) {
    throw new Error('Brevo API key is not configured')
  }

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      sender: {
        name: 'Global Trading Academy',
        email: getBrevoSenderEmail(),
      },
      to: [{ email: to }],
      subject,
      html,
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Brevo request failed ${response.status}: ${body}`)
  }
}

export const onLeadCreated = functions.firestore
  .document('leads/{leadId}')
  .onCreate(async (snap) => {
    const lead = snap.data() as LeadData
    const notificationEmail = getNotificationEmail()

    if (!notificationEmail) {
      functions.logger.warn('NOTIFICATION_EMAIL not configured — skipping owner notification')
    } else {
      const ownerHtml = `
        <h2>New Lead — Global Trading Academy</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #eee;">${lead.name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #eee;">${lead.email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #eee;">${lead.phone}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">City</td><td style="padding:8px;border:1px solid #eee;">${lead.city}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Occupation</td><td style="padding:8px;border:1px solid #eee;">${lead.occupation}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Course</td><td style="padding:8px;border:1px solid #eee;">${lead.course}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Message</td><td style="padding:8px;border:1px solid #eee;">${lead.message}</td></tr>
        </table>
      `

      try {
        await sendBrevoEmail(notificationEmail, `New Lead: ${lead.name} — ${lead.course}`, ownerHtml)
        functions.logger.info('Owner notification sent', { leadId: snap.id })
      } catch (error) {
        functions.logger.error('Failed to send owner notification', error)
      }
    }

    if (lead.email) {
      const inviteLink = getInviteLink()
      const userHtml = `
        <h2>Thanks for contacting Global Trading Academy</h2>
        <p>Hi ${lead.name},</p>
        <p>We received your inquiry for <strong>${lead.course}</strong>. Our team will contact you soon.</p>
        <p>Click the link below to get started:</p>
        <p><a href="${inviteLink}" style="color:#2563eb">${inviteLink}</a></p>
        <p>Best regards,<br/>Global Trading Academy</p>
      `

      try {
        await sendBrevoEmail(lead.email, 'Your invitation from Global Trading Academy', userHtml)
        functions.logger.info('Invitation email sent to lead', { leadId: snap.id, email: lead.email })
      } catch (error) {
        functions.logger.error('Failed to send invitation email to lead', { leadId: snap.id, error })
      }
    }

    return null
  })
