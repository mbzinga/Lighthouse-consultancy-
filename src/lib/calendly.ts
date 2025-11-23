import type {
  CalendlyEventType,
  CalendlyEventTypesResponse,
  CalendlySchedulingLinkResponse,
} from '@/types'

const CALENDLY_API_BASE = 'https://api.calendly.com'

function getCalendlyHeaders(): HeadersInit {
  const token = process.env.CALENDLY_PERSONAL_ACCESS_TOKEN
  if (!token) {
    throw new Error('Missing CALENDLY_PERSONAL_ACCESS_TOKEN')
  }
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
}

export async function getEventTypes(ownerUri: string): Promise<CalendlyEventType[]> {
  try {
    const url = `${CALENDLY_API_BASE}/event_types?user=${encodeURIComponent(ownerUri)}`
    const response = await fetch(url, {
      headers: getCalendlyHeaders(),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Calendly API error: ${response.status} - ${errorText}`)
    }

    const data: CalendlyEventTypesResponse = await response.json()
    return data.collection
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch Calendly event types: ${error.message}`)
    }
    throw error
  }
}

export async function createSchedulingLink(
  eventTypeUri: string,
  metadata?: Record<string, unknown>,
): Promise<string> {
  try {
    const url = `${CALENDLY_API_BASE}/scheduling_links`
    const response = await fetch(url, {
      method: 'POST',
      headers: getCalendlyHeaders(),
      body: JSON.stringify({
        owner: eventTypeUri,
        owner_type: 'EventType',
        max_event_count: 1,
        ...(metadata && { metadata }),
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Calendly API error: ${response.status} - ${errorText}`)
    }

    const data: CalendlySchedulingLinkResponse = await response.json()
    return data.resource.booking_url
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create Calendly scheduling link: ${error.message}`)
    }
    throw error
  }
}








