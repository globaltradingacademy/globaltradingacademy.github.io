import { useState, type FormEvent } from 'react'
import { countryCodes, courses } from '../config/content'
import { submitLead } from '../lib/leads'
import CTAButton from './CTAButton'

interface FormState {
  name: string
  countryCode: string
  phone: string
  city: string
  occupation: string
  course: string
  message: string
}

interface FormErrors {
  name?: string
  phone?: string
  city?: string
  occupation?: string
  course?: string
}

const initialForm: FormState = {
  name: '',
  countryCode: '+91',
  phone: '',
  city: '',
  occupation: '',
  course: '',
  message: '',
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.phone.trim()) errors.phone = 'Phone number is required'
  else if (!(/^\d{7,15}$/).test(form.phone.replace(/\s/g, ''))) errors.phone = 'Enter a valid phone number'
  if (!form.city.trim()) errors.city = 'City is required'
  if (!form.occupation.trim()) errors.occupation = 'Occupation is required'
  if (!form.course) errors.course = 'Please select a course'
  return errors
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [ errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
    setFeedback(null)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const validation = validate(form)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setSubmitting(true)
    setFeedback(null)

    try {
      await submitLead({
        name: form.name.trim(),
        countryCode: form.countryCode,
        phone: form.phone.replace(/\s/g, ''),
        city: form.city.trim(),
        occupation: form.occupation.trim(),
        course: form.course,
        message: form.message.trim(),
      })
      setFeedback({ type: 'success', message: 'Thank you! Our team will contact you shortly.' })
      setForm(initialForm)
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-navy outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20'

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy">
          Name *
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => updateField('name', e.target.value)}
          className={inputClass}
          placeholder="Your full name"
        />
        { errors.name && <p className="mt-1 text-xs text-red-500">{ errors.name}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy">
          Phone *
        </label>
        <div className="flex gap-2">
          <select
            value={form.countryCode}
            onChange={(e) => updateField('countryCode', e.target.value)}
            className={`${inputClass} w-32 shrink-0`}
          >
            {countryCodes.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code}
              </option>
            ))}
          </select>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className={inputClass}
            placeholder="9876543210"
          />
        </div>
        { errors.phone && <p className="mt-1 text-xs text-red-500">{ errors.phone}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-navy">
            City *
          </label>
          <input
            id="city"
            type="text"
            value={form.city}
            onChange={(e) => updateField('city', e.target.value)}
            className={inputClass}
            placeholder="Your city"
          />
          { errors.city && <p className="mt-1 text-xs text-red-500">{ errors.city}</p>}
        </div>
        <div>
          <label htmlFor="occupation" className="mb-1.5 block text-sm font-medium text-navy">
            Occupation *
          </label>
          <input
            id="occupation"
            type="text"
            value={form.occupation}
            onChange={(e) => updateField('occupation', e.target.value)}
            className={inputClass}
            placeholder="Your occupation"
          />
          { errors.occupation && <p className="mt-1 text-xs text-red-500">{ errors.occupation}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="course" className="mb-1.5 block text-sm font-medium text-navy">
          Select Course *
        </label>
        <select
          id="course"
          value={form.course}
          onChange={(e) => updateField('course', e.target.value)}
          className={inputClass}
        >
          <option value="">Choose a course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.label}>
              {c.label}
            </option>
          ))}
        </select>
        { errors.course && <p className="mt-1 text-xs text-red-500">{ errors.course}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={(e) => updateField('message', e.target.value)}
          className={inputClass}
          placeholder="Tell us about your trading goals (optional)"
        />
      </div>

      {feedback && (
        <div
          className={`rounded-xl px-4 py-3 text-sm ${
            feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {feedback.message}
        </div>
      )}

      <CTAButton type="submit" disabled={submitting} className="w-full">
        {submitting ? 'Submitting...' : 'Submit Inquiry'}
      </CTAButton>
    </form>
  )
}
