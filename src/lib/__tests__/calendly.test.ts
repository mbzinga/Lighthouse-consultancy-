import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getEventTypes, createSchedulingLink } from '../calendly'

// Mock environment variables
vi.mock('process', () => ({
  env: {
    CALENDLY_PERSONAL_ACCESS_TOKEN: 'test-token',
  },
}))

describe('Calendly API Client', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  describe('getEventTypes', () => {
    it('should fetch event types successfully', async () => {
      const mockEventTypes = {
        collection: [
          {
            uri: 'https://api.calendly.com/event_types/123',
            name: 'Starter Consultation',
            active: true,
            slug: 'starter',
            scheduling_url: 'https://calendly.com/starter',
            duration: 45,
            kind: 'standard',
            pooling_type: null,
            type: 'StandardEventType',
            color: '#14b8a6',
            created_at: '2024-01-01T00:00:00.000Z',
            updated_at: '2024-01-01T00:00:00.000Z',
            internal_note: null,
            description_plain: null,
            description_html: null,
            profile: {
              type: 'User',
              name: 'Test User',
              owner: 'https://api.calendly.com/users/123',
            },
            secret: false,
            booking_methods: ['automatic'],
            custom_questions: [],
            deleted_at: null,
          },
        ],
        pagination: {
          count: 1,
          next_page: null,
          previous_page: null,
          next_page_token: null,
          previous_page_token: null,
        },
      }

      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockEventTypes,
      } as Response)

      const result = await getEventTypes('https://api.calendly.com/users/123')

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Starter Consultation')
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('https://api.calendly.com/event_types?user='),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
          }),
        }),
      )
    })

    it('should throw error on API failure', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => 'Internal Server Error',
      } as Response)

      await expect(
        getEventTypes('https://api.calendly.com/users/123'),
      ).rejects.toThrow('Calendly API error')
    })
  })

  describe('createSchedulingLink', () => {
    it('should create scheduling link successfully', async () => {
      const mockResponse = {
        resource: {
          owner: 'https://api.calendly.com/event_types/123',
          owner_type: 'EventType',
          event_type: 'https://api.calendly.com/event_types/123',
          booking_url: 'https://calendly.com/booking/abc123',
        },
      }

      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await createSchedulingLink(
        'https://api.calendly.com/event_types/123',
        { audience: 'family' },
      )

      expect(result).toBe('https://calendly.com/booking/abc123')
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.calendly.com/scheduling_links',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
          }),
          body: JSON.stringify({
            owner: 'https://api.calendly.com/event_types/123',
            owner_type: 'EventType',
            max_event_count: 1,
            audience: 'family',
          }),
        }),
      )
    })

    it('should throw error on API failure', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: async () => 'Bad Request',
      } as Response)

      await expect(
        createSchedulingLink('https://api.calendly.com/event_types/123'),
      ).rejects.toThrow('Calendly API error')
    })
  })
})








