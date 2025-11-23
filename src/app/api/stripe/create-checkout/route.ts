import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { z } from 'zod'
import { siteConfig } from '@/config/site'

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  return new Stripe(secretKey, {
    apiVersion: '2025-09-30.clover',
  })
}

const checkoutSchema = z.object({
  bookingOptionId: z.string(),
  email: z.string().email(),
  name: z.string().min(1),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = checkoutSchema.parse(body)

    // Find the booking option
    const bookingOption = siteConfig.bookingOptions.find(
      (opt) => opt.id === validated.bookingOptionId,
    )

    if (!bookingOption) {
      return NextResponse.json(
        { error: 'Booking option not found' },
        { status: 404 },
      )
    }

    if (!bookingOption.stripePriceId) {
      return NextResponse.json(
        { error: 'Stripe Price ID not configured for this booking option' },
        { status: 400 },
      )
    }

    const baseUrl = process.env.APP_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Create Stripe Checkout Session using existing Stripe Price ID
    const stripe = getStripeClient()
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: bookingOption.stripePriceId, // Use existing Stripe Price ID
          quantity: 1,
        },
      ],
      mode: bookingOption.packageDetails?.recurring ? 'subscription' : 'payment',
      customer_email: validated.email,
      metadata: {
        bookingOptionId: bookingOption.id,
        customerName: validated.name,
        eventTypeUri: bookingOption.eventTypeUri,
        audience: bookingOption.audience,
      },
      success_url: `${baseUrl}/booking-success?session_id={CHECKOUT_SESSION_ID}&redirect_to_calendly=true`,
      cancel_url: `${baseUrl}/pricing?canceled=true`,
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request', details: error.issues },
        { status: 400 },
      )
    }

    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 },
    )
  }
}

