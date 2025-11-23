#!/usr/bin/env tsx

/**
 * Calendly Webhook Registration Script
 *
 * This script registers webhooks with Calendly for invitee.created and invitee.canceled events.
 * Run with: npm run webhook:register
 */

const CALENDLY_API_BASE = 'https://api.calendly.com'

async function registerWebhook(
  token: string,
  webhookUrl: string,
  events: string[],
): Promise<string> {
  const orgUri = process.env.CALENDLY_ORG_URI
  if (!orgUri) {
    throw new Error('CALENDLY_ORG_URI environment variable is required')
  }

  const response = await fetch(`${CALENDLY_API_BASE}/webhook_subscriptions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: webhookUrl,
      organization: orgUri,
      events,
      scope: 'organization',
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Failed to register webhook: ${response.status} - ${errorText}`,
    )
  }

  const data = await response.json()
  return data.resource.uri
}

async function listWebhooks(token: string): Promise<Array<{ uri: string; url: string }>> {
  const orgUri = process.env.CALENDLY_ORG_URI
  if (!orgUri) {
    throw new Error('CALENDLY_ORG_URI environment variable is required')
  }

  const response = await fetch(
    `${CALENDLY_API_BASE}/webhook_subscriptions?organization=${encodeURIComponent(orgUri)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to list webhooks: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  return data.collection.map((wh: { uri: string; callback_url: string }) => ({
    uri: wh.uri,
    url: wh.callback_url,
  }))
}

async function deleteWebhook(token: string, webhookUri: string): Promise<void> {
  const response = await fetch(webhookUri, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok && response.status !== 404) {
    const errorText = await response.text()
    throw new Error(`Failed to delete webhook: ${response.status} - ${errorText}`)
  }
}

async function main() {
  // Load .env.local if it exists (use require for Node scripts)
  try {
    const dotenv = require('dotenv')
    const path = require('path')
    dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
  } catch {
    // dotenv not available or .env.local doesn't exist
  }

  const token = process.env.CALENDLY_PERSONAL_ACCESS_TOKEN
  if (!token) {
    console.error('Error: CALENDLY_PERSONAL_ACCESS_TOKEN environment variable is required')
    console.error('Make sure .env.local exists with your Calendly token')
    process.exit(1)
  }

  const baseUrl = process.env.APP_BASE_URL
  if (!baseUrl) {
    console.error('Error: APP_BASE_URL environment variable is required')
    console.error('Set it in .env.local (use http://localhost:3000 for local)')
    process.exit(1)
  }

  const webhookUrl = `${baseUrl}/api/calendly/webhook`
  const events = ['invitee.created', 'invitee.canceled']

  try {
    console.log('Checking for existing webhooks...')
    const existingWebhooks = await listWebhooks(token)
    const matchingWebhook = existingWebhooks.find((wh) => wh.url === webhookUrl)

    if (matchingWebhook) {
      console.log(`Found existing webhook: ${matchingWebhook.uri}`)
      console.log('Deleting existing webhook before creating new one...')
      await deleteWebhook(token, matchingWebhook.uri)
    }

    console.log(`Registering webhook: ${webhookUrl}`)
    console.log(`Events: ${events.join(', ')}`)

    const webhookUri = await registerWebhook(token, webhookUrl, events)
    console.log(`✓ Webhook registered successfully!`)
    console.log(`Webhook URI: ${webhookUri}`)
    console.log('\nPlease test the webhook by creating a test booking in Calendly.')
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

main()


