import { type Metadata } from 'next'
import { Section } from '@/components/Section'
import { BookingCard } from '@/components/BookingCard'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent pricing for our SEND consultation services. Book a consultation today.',
}

export default function Pricing() {
  return (
    <>
      <Section background="teal-gradient" spacing="lg">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-display font-bold tracking-tight text-slate-900 sm:text-6xl">
            Pricing
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            Clear, transparent pricing for our consultation services
          </p>
        </div>
      </Section>

      <Section spacing="lg">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.bookingOptions.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      </Section>

      <Section background="gray" spacing="lg">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-display font-semibold text-slate-900">
            Additional information
          </h2>
          <div className="mt-6 space-y-4 text-slate-600">
            <p>
              All consultations are conducted via video call. You&apos;ll receive
              a confirmation email with the link after booking.
            </p>
            <p>
              <strong>For schools and local authorities:</strong> We provide
              invoicing and can arrange packages tailored to your needs. Please
              use our{' '}
              <a
                href="/services/schools"
                className="text-teal-600 hover:text-teal-700 underline focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
              >
                Schools
              </a>{' '}
              or{' '}
              <a
                href="/services/local-authorities"
                className="text-teal-600 hover:text-teal-700 underline focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
              >
                Local Authorities
              </a>{' '}
              pages to request a proposal.
            </p>
            <p className="text-sm text-teal-700 font-medium">
              Package purchases are processed securely via Stripe. After payment,
              you&apos;ll be able to book your sessions at your convenience.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}


