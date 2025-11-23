import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseServer, validateSupabaseConfig } from '@/lib/supabaseServer'
import { headers } from 'next/headers'

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  return new Stripe(secretKey, {
    apiVersion: '2025-09-30.clover',
  })
}

export async function POST(request: Request) {
  try {
    validateSupabaseConfig()
    
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 },
      )
    }

    const stripe = getStripeClient()
    let event: Stripe.Event

    try {
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
      if (!webhookSecret) {
        throw new Error('STRIPE_WEBHOOK_SECRET is not set')
      }
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret,
      )
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 },
      )
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      
      // Get session details
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['payment_intent', 'customer'],
      })

      const bookingOptionId = session.metadata?.bookingOptionId
      if (!bookingOptionId) {
        console.error('No bookingOptionId in session metadata')
        return NextResponse.json({ received: true }, { status: 200 })
      }

      // Calculate sessions based on booking type
      const { siteConfig } = await import('@/config/site')
      const bookingOption = siteConfig.bookingOptions.find(
        (opt) => opt.id === bookingOptionId,
      )
      // For single sessions, give 1 session. For packages, use packageDetails.sessions
      const sessionsCount = bookingOption?.packageDetails?.sessions || (bookingOption?.type === 'single' ? 1 : 0)

      // Save to database
      const purchaseData = {
        stripe_session_id: session.id,
        stripe_customer_id:
          typeof fullSession.customer === 'string'
            ? fullSession.customer
            : fullSession.customer?.id || null,
        stripe_payment_intent_id:
          typeof fullSession.payment_intent === 'string'
            ? fullSession.payment_intent
            : (fullSession.payment_intent as Stripe.PaymentIntent)?.id || null,
        booking_option_id: bookingOptionId,
        email: session.customer_email || session.customer_details?.email || '',
        name: session.customer_details?.name || session.metadata?.customerName || '',
        amount_paid: session.amount_total || 0,
        currency: session.currency || 'gbp',
        status: 'paid',
        sessions_remaining: sessionsCount,
        metadata: {
          bookingOption: bookingOption,
          eventTypeUri: session.metadata?.eventTypeUri || bookingOption?.eventTypeUri || '',
          audience: session.metadata?.audience || bookingOption?.audience || 'family',
        },
      }

      const { error } = await supabaseServer
        .from('package_purchases')
        .upsert(purchaseData as any, {
          onConflict: 'stripe_session_id',
        })

      if (error) {
        console.error('Supabase error saving package purchase:', error)
        // Still return 200 to Stripe so it doesn't retry
      }
    } else if (event.type === 'customer.subscription.deleted') {
      // Handle subscription cancellation if needed
      const subscription = event.data.object as Stripe.Subscription
      console.log('Subscription cancelled:', subscription.id)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 },
    )
  }
}

