'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { z } from 'zod'
import { Button } from '@/components/Button'
import { Section } from '@/components/Section'
import type { BookingOption } from '@/config/site'

const bookingFormSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
})

type BookingFormData = z.infer<typeof bookingFormSchema>

interface BookingPageProps {
  booking: BookingOption
}

export function BookingPage({ booking }: BookingPageProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({})
  const [loading, setLoading] = useState(false)

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

      if (!booking.stripePriceId) {
        throw new Error('Payment not configured. Please contact support.')
      }

      setLoading(true)

      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingOptionId: booking.id,
          email: validated.email,
          name: validated.name,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create checkout session')
      }

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Booking error:', error)
      setLoading(false)
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof BookingFormData, string>> = {}
        error.issues.forEach((issue) => {
          const field = issue.path[0]
          if (field && typeof field === 'string') {
            fieldErrors[field as keyof BookingFormData] = issue.message
          }
        })
        setErrors(fieldErrors)
      } else {
        alert(error instanceof Error ? error.message : 'Failed to initiate booking. Please try again.')
      }
    }
  }

  return (
    <Section spacing="lg" background="gray">
      <div className="mx-auto max-w-7xl">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Two-column layout */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left side - What you're getting */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-2xl bg-white p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08)] ring-1 ring-teal-100">
              <div className="mb-6">
                <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-4">
                  {booking.title}
                </h1>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-display font-semibold text-teal-600">
                    £{booking.price}
                  </span>
                  {booking.type === 'single' && (
                    <span className="text-lg text-charcoal-500">
                      for {booking.duration} minutes
                    </span>
                  )}
                </div>
                <p className="text-lg text-charcoal-700 leading-relaxed">
                  {booking.description}
                </p>
              </div>

              {booking.type === 'package' && booking.packageDetails && (
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-lg font-semibold text-charcoal-900 mb-4">
                    What&apos;s included:
                  </h3>
                  <ul className="space-y-3">
                    {booking.packageDetails.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg
                          className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-charcoal-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {booking.packageDetails.recurring && (
                    <div className="mt-4 p-3 bg-teal-50 rounded-lg">
                      <p className="text-sm text-teal-800 font-medium">
                        Monthly recurring package
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8 p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-charcoal-600">
                  <strong>Secure checkout:</strong> Your payment is processed securely via Stripe.
                  After payment, you&apos;ll be able to book your consultation session.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-2xl bg-white p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08)] ring-1 ring-teal-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Book {booking.title}
              </h2>

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

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={loading || !booking.stripePriceId}
                    className="w-full bg-teal-600 hover:bg-teal-700 focus-visible:outline-teal-600"
                  >
                    {loading ? 'Processing...' : 'Continue to Payment'}
                  </Button>
                  {!booking.stripePriceId && (
                    <p className="mt-2 text-sm text-red-600 text-center">
                      Payment not configured. Please contact support.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}






