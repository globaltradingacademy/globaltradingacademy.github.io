import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db, firebaseReady } from './firebase'
import type { Lead, LeadFormData, LeadStatus } from '../types/lead'

async function sendEmailNotification(leadData: LeadFormData): Promise<void> {
  const apiKey = import.meta.env.VITE_BREVO_API_KEY
  const notificationEmail = import.meta.env.VITE_NOTIFICATION_EMAIL

  if (!apiKey || !notificationEmail) {
    console.warn('Brevo API credentials not configured — skipping email')
    return
  }

  const phone = `${leadData.countryCode}${leadData.phone.replace(/\D/g, '')}`

  const htmlContent = `
    <h2>New Lead — National Trading Academy</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #eee;">${leadData.name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #eee;">${phone}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">City</td><td style="padding:8px;border:1px solid #eee;">${leadData.city}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Occupation</td><td style="padding:8px;border:1px solid #eee;">${leadData.occupation}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Course</td><td style="padding:8px;border:1px solid #eee;">${leadData.course}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Message</td><td style="padding:8px;border:1px solid #eee;">${leadData.message || 'No message'}</td></tr>
    </table>
  `

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: 'National Trading Academy',
          email: 'welcomeajaykumar007@gmail.com',
        },
        to: [{ email: notificationEmail }],
        subject: `New Lead: ${leadData.name} — ${leadData.course}`,
        htmlContent,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Brevo API error: ${response.status} - ${JSON.stringify(errorData)}`)
    }

    console.log('Email notification sent successfully via Brevo')
  } catch (error) {
    console.error('Failed to send email notification via Brevo:', error)
    // Don't throw error - email failure shouldn't block lead submission
  }
}

export async function submitLead(formData: LeadFormData): Promise<void> {
  console.log('submitLead called', {
    firebaseReady,
    VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY ?? null,
    VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? null,
  })

  if (!firebaseReady || !db) {
    throw new Error('Firebase is not configured. Please set your environment variables.')
  }

  const phone = `${formData.countryCode}${formData.phone.replace(/\D/g, '')}`

  try {
    const docRef = await addDoc(collection(db, 'leads'), {
      name: formData.name.trim(),
      phone,
      city: formData.city.trim(),
      occupation: formData.occupation,
      course: formData.course,
      message: formData.message.trim(),
      createdAt: serverTimestamp(),
      status: 'new' as LeadStatus,
    })
    console.log('Lead submitted successfully with ID:', docRef.id)

    // Send email notification after saving to Firestore
    await sendEmailNotification(formData)
  } catch (error) {
    console.error('Error submitting lead to Firestore:', error)
    throw error
  }
}

export async function fetchLeads(): Promise<Lead[]> {
  if (!firebaseReady || !db) {
    throw new Error('Firebase is not configured. Please set your environment variables.')
  }

  const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data()
    return {
      id: docSnap.id,
      name: data.name ?? '',
      phone: data.phone ?? '',
      city: data.city ?? '',
      occupation: data.occupation ?? '',
      course: data.course ?? '',
      message: data.message ?? '',
      createdAt: data.createdAt?.toDate?.() ?? null,
      status: (data.status ?? 'new') as LeadStatus,
    }
  })
}

export async function updateLeadStatus(leadId: string, status: LeadStatus): Promise<void> {
  if (!firebaseReady || !db) {
    throw new Error('Firebase is not configured. Please set your environment variables.')
  }

  await updateDoc(doc(db, 'leads', leadId), { status })
}
