import { type Metadata } from 'next'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { validateSupabaseConfig } from '@/lib/supabaseServer'
import { supabaseServer } from '@/lib/supabaseServer'
import type { Database } from '@/types/database'

export const metadata: Metadata = {
  title: 'My Bookings',
  description: 'Manage your consultation bookings',
}

type PackagePurchase = Database['public']['Tables']['package_purchases']['Row']
type PackageSession = Database['public']['Tables']['package_sessions']['Row']
type Booking = Database['public']['Tables']['bookings']['Row']

async function getPackagePurchases(email: string) {
  try {
    validateSupabaseConfig()
    const { data, error } = await supabaseServer
      .from('package_purchases')
      .select('*')
      .eq('email', email)
      .eq('status', 'paid')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching packages:', error)
      return []
    }
    return (data || []) as PackagePurchase[]
  } catch {
    return []
  }
}

async function getPackageSessions(packagePurchaseId: string) {
  try {
    validateSupabaseConfig()
    const { data, error } = await supabaseServer
      .from('package_sessions')
      .select('*, bookings(*)')
      .eq('package_purchase_id', packagePurchaseId)
      .order('session_date', { ascending: true })

    if (error) {
      console.error('Error fetching sessions:', error)
      return []
    }
    return (data || []) as (PackageSession & { bookings: Booking | null })[]
  } catch {
    return []
  }
}

function formatDate(dateString: string | null): string {
  if (!dateString) return 'Not booked yet'
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date)
}

export default async function MyBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const params = await searchParams
  const email = params.email

  // In production, you'd get email from authenticated user session
  // For now, we'll show a form to enter email or require authentication
  if (!email) {
    return (
      <Section spacing="xl">
        <Container className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl text-center mb-8">
            My Bookings
          </h1>
          <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
            <p className="text-slate-600 text-center mb-6">
              Please enter your email address to view your bookings.
            </p>
            <form action="/my-bookings" method="get" className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="block w-full rounded-lg border-0 px-3 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                  placeholder="your.email@example.com"
                />
              </div>
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                View Bookings
              </Button>
            </form>
          </div>
        </Container>
      </Section>
    )
  }

  const packages = await getPackagePurchases(email)
  
  // Load sessions for all packages in parallel
  const packagesWithSessions = await Promise.all(
    packages.map(async (pkg) => {
      const sessions = await getPackageSessions(pkg.id)
      const metadata = pkg.metadata as {
        bookingOption?: { eventTypeUri: string; title: string }
        eventTypeUri?: string
      }
      const eventTypeUri =
        metadata?.eventTypeUri || metadata?.bookingOption?.eventTypeUri

      return {
        ...pkg,
        sessions,
        eventTypeUri,
        metadata,
      }
    })
  )

  return (
    <Section spacing="xl">
      <Container className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl text-center mb-8">
          My Bookings
        </h1>

        {packagesWithSessions.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200 text-center">
            <p className="text-slate-600 mb-6">
              No active bookings found for <strong>{email}</strong>
            </p>
            <Button href="/pricing" className="bg-teal-600 hover:bg-teal-700">
              Book a Consultation
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {packagesWithSessions.map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {pkg.metadata?.bookingOption?.title || 'Consultation Package'}
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Purchased {new Date(pkg.created_at).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-teal-600">
                      {pkg.sessions_remaining}
                    </div>
                    <div className="text-sm text-slate-600">
                      session{pkg.sessions_remaining !== 1 ? 's' : ''} remaining
                    </div>
                  </div>
                </div>

                {pkg.sessions.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">
                        Booked Sessions
                      </h3>
                      <div className="space-y-3">
                        {pkg.sessions.map((session, index) => (
                          <div
                            key={session.id}
                            className="flex items-center justify-between rounded-lg bg-slate-50 p-4"
                          >
                            <div>
                              <div className="font-medium text-slate-900">
                                Session {index + 1}
                              </div>
                              {session.bookings && (
                                <div className="text-sm text-slate-600">
                                  {formatDate(session.bookings.starts_at)}
                                </div>
                              )}
                              {!session.bookings && (
                                <div className="text-sm text-slate-500">
                                  {formatDate(session.session_date)}
                                </div>
                              )}
                            </div>
                            <div className="text-sm text-slate-600">
                              {session.status === 'completed' && (
                                <span className="text-teal-600">✓ Completed</span>
                              )}
                              {session.status === 'scheduled' && (
                                <span className="text-blue-600">Scheduled</span>
                              )}
                              {session.status === 'cancelled' && (
                                <span className="text-red-600">Cancelled</span>
                              )}
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
                )}

                {pkg.sessions_remaining > 0 && pkg.eventTypeUri ? (
                  <form
                    action="/api/calendly/book-session"
                    method="POST"
                    className="border-t border-slate-200 pt-6"
                  >
                    <input type="hidden" name="packagePurchaseId" value={pkg.id} />
                    <input type="hidden" name="eventTypeUri" value={pkg.eventTypeUri} />
                    <input type="hidden" name="email" value={pkg.email} />
                    <Button
                      type="submit"
                      className="w-full bg-teal-600 hover:bg-teal-700"
                    >
                      {pkg.sessions.length === 0
                        ? 'Book Your First Session'
                        : `Book Session ${pkg.sessions.length + 1}`}
                    </Button>
                  </form>
                ) : (
                  <div className="border-t border-slate-200 pt-6 text-center text-slate-600">
                    {pkg.sessions_remaining === 0
                      ? 'All sessions have been booked'
                      : 'Unable to book - please contact support'}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/pricing"
            className="text-base font-semibold leading-6 text-teal-600 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
          >
            ← Book Another Consultation
          </Link>
        </div>
      </Container>
    </Section>
  )
}

