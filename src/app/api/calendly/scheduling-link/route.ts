import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createSchedulingLink } from '@/lib/calendly'
import type { SchedulingLinkRequest, SchedulingLinkResponse } from '@/types'

const requestSchema = z.object({
  eventTypeUri: z.string().url('Invalid event type URI'),
  metadata: z.record(z.string(), z.unknown()).optional(),
})

export async function POST(request: Request) {
  try {
    const body: SchedulingLinkRequest = await request.json()
    const validated = requestSchema.parse(body)

    const bookingUrl = await createSchedulingLink(
      validated.eventTypeUri,
      validated.metadata,
    )

    const response: SchedulingLinkResponse = {
      booking_url: bookingUrl,
    }

    return NextResponse.json(response)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request', details: error.issues },
        { status: 400 },
      )
    }

    console.error('Error creating Calendly scheduling link:', error)
    return NextResponse.json(
      { error: 'Failed to create scheduling link' },
      { status: 500 },
    )
  }
}

