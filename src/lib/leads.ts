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
