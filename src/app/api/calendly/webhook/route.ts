import { NextResponse } from 'next/server'
import { supabaseServer, validateSupabaseConfig } from '@/lib/supabaseServer'
import type { CalendlyWebhookPayload, Booking } from '@/types'

export async function POST(request: Request) {
  try {
    validateSupabaseConfig()
    const payload: CalendlyWebhookPayload = await request.json()

    // Verify webhook event type
    if (
      payload.event !== 'invitee.created' &&
      payload.event !== 'invitee.canceled'
    ) {
      return NextResponse.json({ message: 'Event type not handled' }, { status: 200 })
    }

    const { invitee, event, tracking } = payload.payload

    // Extract audience from tracking UTM or metadata, or default to 'family'
    const metadata = payload.payload as { metadata?: { audience?: string } }
    const audience =
      (tracking?.utm_campaign || metadata.metadata?.audience || 'family') as 'family' | 'school' | 'la'

    // Extract notes from questions_and_answers if available
    const questionsAndAnswers = payload.payload.questions_and_answers || []
    const notes =
      questionsAndAnswers.length > 0
        ? questionsAndAnswers.map((qa) => `${qa.question}: ${qa.answer}`).join('\n')
        : null

    const bookingData = {
      calendly_invitee_uri: invitee.uri,
      event_type_uri: event.event_type,
      email: invitee.email,
      name: invitee.name,
      starts_at: event.start_time,
      ends_at: event.end_time,
      audience,
      notes,
      status: (payload.event === 'invitee.created' ? 'scheduled' : 'canceled') as 'scheduled' | 'canceled',
      raw: payload as unknown as Record<string, unknown>,
    } as const

    // Upsert booking (update if exists, insert if not)
    const { data: savedBooking, error: bookingError } = await supabaseServer
      .from('bookings')
      .upsert(bookingData as any, {
        onConflict: 'calendly_invitee_uri',
      })
      .select()
      .single()

    if (bookingError || !savedBooking) {
      console.error('Supabase error saving booking:', bookingError)
      return NextResponse.json(
        { error: 'Failed to save booking' },
        { status: 500 },
      )
    }
    
    // Type assertion for savedBooking
    const booking = savedBooking as unknown as Booking

    // Check if this booking is linked to a package purchase
    if (payload.event === 'invitee.created') {
      // First, check if metadata contains packagePurchaseId (from direct package booking)
      const schedulingMetadata = payload.payload as { 
        metadata?: { packagePurchaseId?: string }
        tracking?: { utm_campaign?: string }
      }
      
      let packagePurchaseId: string | null = null
      
      // Try to get from metadata first (for package bookings)
      if (schedulingMetadata.metadata?.packagePurchaseId) {
        packagePurchaseId = schedulingMetadata.metadata.packagePurchaseId
      }
      
      // If not found in metadata, find by email (for any booking from package customer)
      if (!packagePurchaseId) {
        const { data: packagePurchases } = await supabaseServer
          .from('package_purchases')
          .select('*')
          .eq('email', invitee.email)
          .eq('status', 'paid')
          .gt('sessions_remaining', 0)
          .order('created_at', { ascending: false })
          .limit(1)

        if (packagePurchases && packagePurchases.length > 0 && packagePurchases[0]) {
          packagePurchaseId = (packagePurchases[0] as any).id
        }
      }

      if (packagePurchaseId) {
        // Get the package purchase to verify and get current count
        const { data: packagePurchaseData } = await supabaseServer
          .from('package_purchases')
          .select('*')
          .eq('id', packagePurchaseId)
          .single()

        if (packagePurchaseData) {
          const packagePurchase = packagePurchaseData as any
          
          if (packagePurchase.sessions_remaining > 0) {
            // Create package session record
            const sessionData = {
              package_purchase_id: packagePurchaseId,
              booking_id: booking.id,
              calendly_invitee_uri: invitee.uri,
              session_date: event.start_time,
              status: 'scheduled' as const,
            }
            await supabaseServer.from('package_sessions').insert(sessionData as any)

            // Decrement sessions_remaining
            const updateData = {
              sessions_remaining: Math.max(0, packagePurchase.sessions_remaining - 1),
            }
            await (supabaseServer
              .from('package_purchases') as any)
              .update(updateData)
              .eq('id', packagePurchaseId)
          }
        }
      }
    }

    return NextResponse.json({ message: 'Webhook processed' }, { status: 200 })
  } catch (error) {
    console.error('Webhook processing error:', error)
    // Return 200 to prevent Calendly from retrying on our errors
    // Log internally for debugging
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 200 },
    )
  }
}

