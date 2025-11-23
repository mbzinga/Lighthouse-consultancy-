#!/usr/bin/env tsx

/**
 * Test Calendly API Connection
 * 
 * Verifies your Calendly credentials and retrieves URIs
 */

import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') })

async function testCalendlyConnection() {
  const token = process.env.CALENDLY_PERSONAL_ACCESS_TOKEN
  const ownerUri = process.env.CALENDLY_OWNER_URI

  if (!token) {
    console.error('❌ CALENDLY_PERSONAL_ACCESS_TOKEN not found in environment')
    console.log('\nAdd it to .env.local:')
    console.log('CALENDLY_PERSONAL_ACCESS_TOKEN=your-token-here')
    process.exit(1)
  }

  console.log('🔍 Testing Calendly API connection...\n')

  try {
    // Test 1: Get current user info (contains Owner URI)
    console.log('📋 Fetching user information...')
    const userResponse = await fetch('https://api.calendly.com/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!userResponse.ok) {
      const error = await userResponse.text()
      throw new Error(`Failed to fetch user: ${userResponse.status} - ${error}`)
    }

    const userData = await userResponse.json()
    const currentOwnerUri = userData.resource.uri
    const userName = userData.resource.name
    const userEmail = userData.resource.email

    console.log('✅ User authenticated successfully!')
    console.log(`   Name: ${userName}`)
    console.log(`   Email: ${userEmail}`)
    console.log(`   Owner URI: ${currentOwnerUri}`)
    console.log('')

    // Test 2: Get organization info
    console.log('📋 Fetching organization information...')
    let orgUri: string | null = null
    let orgName: string | null = null

    // Try fetching organizations
    const orgResponse = await fetch('https://api.calendly.com/organizations', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (orgResponse.ok) {
      const orgData = await orgResponse.json()
      if (orgData.collection && orgData.collection.length > 0) {
        const org = orgData.collection[0]
        orgUri = org.uri
        orgName = org.name
        console.log('✅ Organization found!')
        console.log(`   Name: ${orgName}`)
        console.log(`   Org URI: ${orgUri}`)
      }
    } else if (orgResponse.status === 404) {
      // For personal accounts, try getting org from user membership
      console.log('⚠️  Direct organization endpoint not available')
      console.log('   Trying alternative method...')
      
      if (userData.resource.current_organization) {
        orgUri = userData.resource.current_organization
        console.log(`✅ Organization URI from user: ${orgUri}`)
      }
    }

    if (!orgUri) {
      console.log('⚠️  No organization URI found')
      console.log('   You may be on a personal account - this is okay for now')
      console.log('   You can find it later in Calendly Settings → Integrations')
    }
    console.log('')

    // Test 3: Get event types
    console.log('📋 Fetching event types...')
    let eventTypesUrl = 'https://api.calendly.com/event_types'
    if (currentOwnerUri) {
      eventTypesUrl += `?user=${encodeURIComponent(currentOwnerUri)}`
    }

    const eventsResponse = await fetch(eventTypesUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!eventsResponse.ok) {
      const error = await eventsResponse.text()
      throw new Error(`Failed to fetch event types: ${eventsResponse.status} - ${error}`)
    }

    const eventsData = await eventsResponse.json()
    const eventTypes = eventsData.collection || []

    console.log(`✅ Found ${eventTypes.length} event type(s):\n`)

    if (eventTypes.length === 0) {
      console.log('⚠️  No event types found. You need to create 3 event types:')
      console.log('   1. Starter Consultation (45 min)')
      console.log('   2. Deep Dive Assessment (90 min)')
      console.log('   3. Follow-up & Action Plan (45 min)')
      console.log('\nAfter creating them, their URIs will appear here.\n')
    } else {
      eventTypes.forEach((event: any, index: number) => {
        console.log(`${index + 1}. ${event.name}`)
        console.log(`   Duration: ${event.duration} minutes`)
        console.log(`   URI: ${event.uri}`)
        console.log(`   Active: ${event.active ? 'Yes' : 'No'}`)
        console.log('')
      })
    }

    // Summary
    console.log('=' .repeat(50))
    console.log('\n📝 Add these to your .env.local file:\n')
    console.log(`CALENDLY_PERSONAL_ACCESS_TOKEN=${token}`)
    console.log(`CALENDLY_OWNER_URI=${currentOwnerUri}`)
    if (orgUri) {
      console.log(`CALENDLY_ORG_URI=${orgUri}`)
    } else {
      console.log('CALENDLY_ORG_URI=  # (May not be needed for personal accounts)')
    }
    console.log('\nThen update src/config/site.ts with event type URIs:')
    if (eventTypes.length > 0) {
      eventTypes.forEach((event: any, index: number) => {
        const bookingOption = ['starter-consultation', 'deep-dive-assessment', 'follow-up-action-plan'][index]
        if (bookingOption) {
          console.log(`  ${bookingOption}: ${event.uri}`)
        }
      })
    }
    console.log('')

  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

testCalendlyConnection()

