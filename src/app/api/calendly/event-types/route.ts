import { NextResponse } from 'next/server'
import { getEventTypes } from '@/lib/calendly'

export async function GET() {
  try {
    const ownerUri = process.env.CALENDLY_OWNER_URI
    if (!ownerUri) {
      return NextResponse.json(
        { error: 'CALENDLY_OWNER_URI not configured' },
        { status: 500 },
      )
    }

    const eventTypes = await getEventTypes(ownerUri)
    return NextResponse.json({ eventTypes })
  } catch (error) {
    console.error('Error fetching Calendly event types:', error)
    return NextResponse.json(
      { error: 'Failed to fetch event types' },
      { status: 500 },
    )
  }
}








