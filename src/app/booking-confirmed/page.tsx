import { type Metadata } from 'next'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { validateSupabaseConfig } from '@/lib/supabaseServer'
import { supabaseServer } from '@/lib/supabaseServer'
import type { Database } from '@/types/database'

export const metadata: Metadata = {
  title: 'Booking Confirmed',
  description: 'Your consultation has been successfully booked',
}

type Booking = Database['public']['Tables']['bookings']['Row']

async function getBookingByInviteeUri(inviteeUri: string): Promise<Booking | null> {
  try {
    validateSupabaseConfig()
    const { data, error } = await supabaseServer
      .from('bookings')
      .select('*')
      .eq('calendly_invitee_uri', inviteeUri)
      .single()

    if (error || !data) {
      return null
    }
    return data as Booking
  } catch {
    return null
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date)
}

function formatDuration(startsAt: string, endsAt: string): string {
  const start = new Date(startsAt)
  const end = new Date(endsAt)
  const minutes = Math.round((end.getTime() - start.getTime()) / 1000 / 60)
  return `${minutes} minutes`
}

export default async function BookingConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ invitee_uri?: string }>
}) {
  const params = await searchParams
  let booking: Booking | null = null

  if (params.invitee_uri) {
    booking = await getBookingByInviteeUri(params.invitee_uri)
  }

  return (
    <Section spacing="xl">
      <Container className="mx-auto max-w-2xl text-center">
        <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
          <svg
            className="h-8 w-8 text-teal-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Booking Confirmed!
        </h1>

        {booking ? (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl bg-slate-50 p-6 text-left">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Appointment Details
              </h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-slate-600">Date & Time</dt>
                  <dd className="mt-1 text-base text-slate-900">
                    {formatDate(booking.starts_at)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-600">Duration</dt>
                  <dd className="mt-1 text-base text-slate-900">
                    {formatDuration(booking.starts_at, booking.ends_at)}
                  </dd>
                </div>
                {booking.notes && (
                  <div>
                    <dt className="text-sm font-medium text-slate-600">Notes</dt>
                    <dd className="mt-1 text-base text-slate-900 whitespace-pre-wrap">
                      {booking.notes}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <p className="text-slate-600">
              A confirmation email has been sent to <strong>{booking.email}</strong> with
              all the details and a calendar invitation.
            </p>
          </div>
        ) : (
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Your booking has been confirmed! You&apos;ll receive a confirmation email
            shortly with all the details.
          </p>
        )}

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            href="/"
            className="bg-teal-600 hover:bg-teal-700 focus-visible:outline-teal-600"
          >
            Return Home
          </Button>
          <Link
            href="/my-bookings"
            className="text-base font-semibold leading-6 text-slate-900 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
          >
            View My Bookings <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </Section>
  )
}







