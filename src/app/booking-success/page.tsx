import { type Metadata } from 'next'
import Link from 'next/link'
import Stripe from 'stripe'
import { Section } from '@/components/Section'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { validateSupabaseConfig } from '@/lib/supabaseServer'
import { supabaseServer } from '@/lib/supabaseServer'
import type { Database } from '@/types/database'
import { BookingRedirect } from '@/components/BookingRedirect'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Booking Success',
  description: 'Thank you for your purchase',
}

type PackagePurchase = Database['public']['Tables']['package_purchases']['Row']

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  return new Stripe(secretKey, {
    apiVersion: '2025-09-30.clover',
  })
}

async function getStripeSession(sessionId: string): Promise<Stripe.Checkout.Session | null> {
  try {
    const stripe = getStripeClient()
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return session
  } catch (error) {
    console.error('Error fetching Stripe session:', error)
    return null
  }
}

async function getPackagePurchase(sessionId: string): Promise<PackagePurchase | null> {
  try {
    validateSupabaseConfig()
    const { data, error } = await supabaseServer
      .from('package_purchases')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .single()

    if (error || !data) {
      return null
    }
    return data as PackagePurchase
  } catch {
    return null
  }
}


export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; redirect_to_calendly?: string }>
}) {
  const params = await searchParams
  let purchase = null
  let calendlyBookingUrl: string | null = null

  if (params.session_id) {
    // First, try to get data directly from Stripe (immediate, no webhook delay)
    const stripeSession = await getStripeSession(params.session_id)
    
    // Also try to get from Supabase as fallback (may not exist yet if webhook hasn't fired)
    purchase = await getPackagePurchase(params.session_id)
    
    // If redirect_to_calendly is true, create booking link for single sessions
    if (params.redirect_to_calendly === 'true') {
      let eventTypeUri: string | null = null
      let bookingType: string | null = null
      let audience: string = 'family'
      
      // Try to get booking info from Stripe session metadata first (most reliable)
      if (stripeSession?.metadata) {
        const bookingOptionId = stripeSession.metadata.bookingOptionId
        if (bookingOptionId) {
          const bookingOption = siteConfig.bookingOptions.find(
            (opt) => opt.id === bookingOptionId,
          )
          if (bookingOption) {
            eventTypeUri = bookingOption.eventTypeUri
            bookingType = bookingOption.type
            audience = bookingOption.audience
          }
        }
        
        // Also check if metadata has eventTypeUri directly
        if (stripeSession.metadata.eventTypeUri) {
          eventTypeUri = stripeSession.metadata.eventTypeUri
        }
        if (stripeSession.metadata.audience) {
          audience = stripeSession.metadata.audience
        }
      }
      
      // Fallback to Supabase purchase metadata if Stripe metadata doesn't have it
      if (!eventTypeUri && purchase) {
        const metadata = purchase.metadata as {
          bookingOption?: { eventTypeUri: string; type: string; audience?: string }
          eventTypeUri?: string
          audience?: string
        }
        eventTypeUri = metadata?.eventTypeUri || metadata?.bookingOption?.eventTypeUri || null
        bookingType = metadata?.bookingOption?.type || null
        audience = metadata?.audience || metadata?.bookingOption?.audience || 'family'
      }
      
      // Only auto-redirect for single sessions, not packages
      if (eventTypeUri && bookingType !== 'package') {
        try {
          // Create Calendly scheduling link server-side
          const { createSchedulingLink } = await import('@/lib/calendly')
          calendlyBookingUrl = await createSchedulingLink(eventTypeUri, {
            stripeSessionId: params.session_id,
            purchaseId: purchase?.id,
            audience: audience,
          })
        } catch (error) {
          console.error('Failed to create Calendly link:', error)
        }
      }
    }
    
    // Update purchase if we got it from Supabase (may be null if webhook hasn't fired yet)
    if (!purchase && stripeSession) {
      // Purchase will be saved by webhook eventually, but we can continue without it
      // The important thing is we got the metadata from Stripe for the redirect
    }
  }

  // Auto-redirect to Calendly for single session bookings
  if (calendlyBookingUrl) {
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
            Payment Successful!
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Redirecting you to book your appointment...
          </p>
          <BookingRedirect url={calendlyBookingUrl} />
        </Container>
      </Section>
    )
  }

  // Package purchase or no Calendly redirect
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
          Payment Successful!
        </h1>

        {purchase ? (
          <div className="mt-8 space-y-4">
            <p className="text-lg leading-8 text-slate-600">
              Thank you for your purchase of{' '}
              <strong>£{(purchase.amount_paid / 100).toFixed(2)}</strong>
            </p>
            <p className="text-slate-600">
              {purchase.sessions_remaining > 0 ? (
                <>
                  You now have{' '}
                  <strong>{purchase.sessions_remaining} session{purchase.sessions_remaining !== 1 ? 's' : ''}</strong> available
                  to book.
                </>
              ) : (
                'Your booking is confirmed!'
              )}
            </p>
          </div>
        ) : (
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Your payment has been processed successfully. You&apos;ll receive a
            confirmation email shortly.
          </p>
        )}

        <div className="mt-10 flex items-center justify-center gap-x-6">
          {purchase && purchase.sessions_remaining > 0 ? (
            <>
              {(() => {
                const metadata = purchase.metadata as { bookingOption?: { type: string } }
                const isPackage = metadata?.bookingOption?.type === 'package'
                
                if (isPackage) {
                  // For packages, direct to my-bookings page to book first session
                  return (
                    <Button
                      href="/my-bookings"
                      className="bg-teal-600 hover:bg-teal-700 focus-visible:outline-teal-600"
                    >
                      Book Your First Session
                    </Button>
                  )
                } else {
                  // For single sessions, should have already redirected - show fallback
                  const metadata2 = purchase.metadata as { eventTypeUri?: string }
                  if (metadata2?.eventTypeUri) {
                    // Create a manual booking link as fallback
                    return (
                      <Link
                        href={`/api/calendly/scheduling-link?eventTypeUri=${encodeURIComponent(metadata2.eventTypeUri)}`}
                        className="inline-flex justify-center rounded-2xl bg-teal-600 p-4 text-base font-semibold text-white hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 active:text-white/70 min-h-[44px]"
                      >
                        Book Your Session
                      </Link>
                    )
                  }
                  return (
                    <Button
                      href="/pricing"
                      className="bg-teal-600 hover:bg-teal-700 focus-visible:outline-teal-600"
                    >
                      Book Your Session
                    </Button>
                  )
                }
              })()}
            </>
          ) : (
            <Button
              href="/"
              className="bg-teal-600 hover:bg-teal-700 focus-visible:outline-teal-600"
            >
              Return home
            </Button>
          )}
          <Link
            href="/"
            className="text-base font-semibold leading-6 text-slate-900 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
          >
            {purchase && purchase.sessions_remaining > 0 ? 'Home' : 'Return home'} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </Section>
  )
}

