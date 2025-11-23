'use client'

import { useState } from 'react'
import { ZodError } from 'zod'
import { contactFormSchema, type ContactFormData } from '@/types'
import { Button } from '@/components/Button'

interface ContactFormProps {
  source?: 'contact_form' | 'school_pkg' | 'la_pkg'
  defaultAudience?: 'family' | 'school' | 'la'
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function ContactForm({
  source = 'contact_form',
  defaultAudience,
  onSuccess,
  onError,
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    organisation: '',
    audience: defaultAudience || 'family',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)

    try {
      const validated = contactFormSchema.parse(formData)

      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validated),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to submit contact form')
      }

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        organisation: '',
        audience: defaultAudience || 'family',
        message: '',
      })
      onSuccess?.()
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.issues.forEach((err) => {
          const field = err.path[0]
          if (field && typeof field === 'string') {
            fieldErrors[field] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        const message =
          error instanceof Error ? error.message : 'Failed to submit form'
        setErrors({ submit: message })
        onError?.(message)
      }
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div
        className="rounded-lg bg-teal-50 p-4 text-teal-800"
        role="status"
        aria-live="polite"
      >
        <p className="font-medium">Thank you for your message!</p>
        <p className="mt-1 text-sm">
          We&apos;ll get back to you as soon as possible.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
          required
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          required
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="organisation"
          className="block text-sm font-medium text-slate-700"
        >
          Organisation (optional)
        </label>
        <input
          type="text"
          id="organisation"
          value={formData.organisation}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, organisation: e.target.value }))
          }
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="audience" className="block text-sm font-medium text-slate-700">
          I am a... <span className="text-red-600">*</span>
        </label>
        <select
          id="audience"
          value={formData.audience}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              audience: e.target.value as ContactFormData['audience'],
            }))
          }
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
          required
        >
          <option value="family">Parent/Carer</option>
          <option value="school">School Professional</option>
          <option value="la">Local Authority Professional</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700">
          Message <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
          required
        />
        {errors.message && (
          <p
            id="message-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.message}
          </p>
        )}
      </div>

      {errors.submit && (
        <div
          className="rounded-lg bg-red-50 p-4 text-red-800"
          role="alert"
          aria-live="assertive"
        >
          {errors.submit}
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-600 hover:bg-teal-700 focus-visible:outline-teal-600"
      >
        {loading ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  )
}

