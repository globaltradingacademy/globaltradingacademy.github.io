export type LeadStatus = 'new' | 'contacted'

export interface Lead {
  id: string
  name: string
  phone: string
  city: string
  occupation: string
  course: string
  message: string
  createdAt: Date | null
  status: LeadStatus
}

export interface LeadFormData {
  name: string
  phone: string
  countryCode: string
  city: string
  occupation: string
  course: string
  message: string
}
