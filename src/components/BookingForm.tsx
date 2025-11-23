'use client'

import { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { z } from 'zod'
import { Button } from '@/components/Button'

const bookingFormSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
})

type BookingFormData = z.infer<typeof bookingFormSchema>

interface BookingFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: BookingFormData) => Promise<void>
  loading?: boolean
  title?: string
}

export function BookingForm({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  title = 'Book Your Consultation',
}: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof BookingFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    try {
      const validated = bookingFormSchema.parse(formData)
      await onSubmit(validated)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof BookingFormData, string>> = {}
        error.issues.forEach((issue) => {
          const field = issue.path[0]
          if (field && typeof field === 'string') {
            fieldErrors[field as keyof BookingFormData] = issue.message
          }
        })
        setErrors(fieldErrors)
      }
    }
  }

  const handleClose = () => {
    if (!loading) {
      setFormData({ name: '', email: '' })
      setErrors({})
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <DialogTitle className="text-2xl font-bold text-slate-900">
              {title}
            </DialogTitle>
            <button
              onClick={handleClose}
              disabled={loading}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50"
              aria-label="Close"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  className="block w-full rounded-lg border-0 px-3 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:ring-slate-200 sm:text-sm sm:leading-6"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Email Address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="block w-full rounded-lg border-0 px-3 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:ring-slate-200 sm:text-sm sm:leading-6"
                  placeholder="your.email@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="text-sm font-semibold leading-6 text-slate-900 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded disabled:opacity-50"
              >
                Cancel
              </button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-teal-600 hover:bg-teal-700 focus-visible:outline-teal-600"
              >
                {loading ? 'Processing...' : 'Continue to Payment'}
              </Button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  )
}







