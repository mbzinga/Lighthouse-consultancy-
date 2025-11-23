import { type Metadata } from 'next'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { Button } from '@/components/Button'

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thank you for booking a consultation with Lighthouse Consultancy',
}

export default function ThankYou() {
  return (
    <Section spacing="xl">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Thank you!
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Your booking has been confirmed. You should receive a confirmation
          email shortly with all the details you need for your consultation.
        </p>
        <p className="mt-4 text-slate-600">
          If you have any questions or need to make changes to your booking,
          please don&apos;t hesitate to get in touch.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button href="/" className="bg-teal-600 hover:bg-teal-700 focus-visible:outline-teal-600">
            Return home
          </Button>
          <Link
            href="/contact"
            className="text-base font-semibold leading-6 text-slate-900 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
          >
            Contact us <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </Section>
  )
}


