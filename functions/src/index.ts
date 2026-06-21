import * as functions from 'firebase-functions/v1'
import * as admin from 'firebase-admin'
import nodemailer from 'nodemailer'

admin.initializeApp()

interface LeadData {
  name: string
  phone: string
  city: string
  occupation: string
  course: string
  message: string
  status: string
}

function getSmtpConfig() {
  const config = functions.config().smtp || {}
  return {
    host: config.host || process.env.SMTP_HOST,
    port: Number(config.port || process.env.SMTP_PORT || 587),
    secure: config.secure === 'true' || process.env.SMTP_SECURE === 'true',
    auth: {
      user: config.user || process.env.SMTP_USER,
      pass: config.pass || process.env.SMTP_PASS,
    },
  }
}

function getNotificationEmail(): string {
  const config = functions.config()
  return config.notification?.email || process.env.NOTIFICATION_EMAIL || ''
}

export const onLeadCreated = functions.firestore
  .document('leads/{leadId}')
  .onCreate(async (snap) => {
    const lead = snap.data() as LeadData
    const notificationEmail = getNotificationEmail()

    if (!notificationEmail) {
      functions.logger.warn('NOTIFICATION_EMAIL not configured — skipping email')
      return null
    }

    const smtpConfig = getSmtpConfig()
    if (!smtpConfig.auth.user || !smtpConfig.auth.pass) {
      functions.logger.warn('SMTP credentials not configured — skipping email')
      return null
    }

    const transporter = nodemailer.createTransport(smtpConfig)

    const html = `
      <h2>New Lead — National Trading Academy</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #eee;">${lead.name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #eee;">${lead.phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">City</td><td style="padding:8px;border:1px solid #eee;">${lead.city}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Occupation</td><td style="padding:8px;border:1px solid #eee;">${lead.occupation}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Course</td><td style="padding:8px;border:1px solid #eee;">${lead.course}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Message</td><td style="padding:8px;border:1px solid #eee;">${lead.message}</td></tr>
      </table>
    `

    try {
      await transporter.sendMail({
        from: `"National Trading Academy" <${smtpConfig.auth.user}>`,
        to: notificationEmail,
        subject: `New Lead: ${lead.name} — ${lead.course}`,
        html,
      })
      functions.logger.info('Lead notification email sent', { leadId: snap.id })
    } catch (error) {
      functions.logger.error('Failed to send lead notification email', error)
    }

    return null
  })
