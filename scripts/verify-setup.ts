#!/usr/bin/env tsx

/**
 * Setup Verification Script
 * 
 * Checks that all required environment variables and configurations are in place.
 */

const requiredEnvVars = {
  'NEXT_PUBLIC_SUPABASE_URL': 'Supabase project URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY': 'Supabase anonymous key',
  'SUPABASE_SERVICE_ROLE_KEY': 'Supabase service role key',
  'CALENDLY_PERSONAL_ACCESS_TOKEN': 'Calendly personal access token',
  'CALENDLY_ORG_URI': 'Calendly organization URI',
  'CALENDLY_OWNER_URI': 'Calendly owner/user URI',
}

const optionalEnvVars = {
  'APP_BASE_URL': 'Production base URL (for webhooks)',
}

function checkEnvVars() {
  console.log('🔍 Checking environment variables...\n')
  
  let allPresent = true
  const missing: string[] = []
  
  for (const [key, description] of Object.entries(requiredEnvVars)) {
    const value = process.env[key]
    if (value && value.length > 0) {
      console.log(`✅ ${key}: ${description}`)
    } else {
      console.log(`❌ ${key}: ${description} - MISSING`)
      missing.push(key)
      allPresent = false
    }
  }
  
  console.log('\n📋 Optional variables:')
  for (const [key, description] of Object.entries(optionalEnvVars)) {
    const value = process.env[key]
    if (value && value.length > 0) {
      console.log(`✅ ${key}: ${description}`)
    } else {
      console.log(`⚠️  ${key}: ${description} - Not set (needed for production)`)
    }
  }
  
  return { allPresent, missing }
}

function checkConfig() {
  console.log('\n📝 Checking configuration files...\n')
  
  try {
    const fs = require('fs')
    const path = require('path')
    
    const configPath = path.join(process.cwd(), 'src/config/site.ts')
    const configContent = fs.readFileSync(configPath, 'utf-8')
    
    // Check if event type URIs are set
    const hasEmptyEventTypeUri = configContent.includes("eventTypeUri: ''")
    
    if (hasEmptyEventTypeUri) {
      console.log('⚠️  Calendly event type URIs not configured in src/config/site.ts')
      console.log('   Action: Add eventTypeUri to each booking option')
    } else {
      console.log('✅ Booking options have event type URIs configured')
    }
    
    return !hasEmptyEventTypeUri
  } catch (error) {
    console.log('❌ Could not read config file')
    return false
  }
}

async function main() {
  console.log('🚀 Lighthouse Consultancy - Setup Verification\n')
  console.log('=' .repeat(50) + '\n')
  
  const envCheck = checkEnvVars()
  const configCheck = checkConfig()
  
  console.log('\n' + '='.repeat(50) + '\n')
  
  if (envCheck.allPresent && configCheck) {
    console.log('✅ All required configuration is present!')
    console.log('\nNext steps:')
    console.log('1. Run Supabase migration: supabase/migrations/001_initial_schema.sql')
    console.log('2. Test locally: npm run dev')
    console.log('3. Deploy to Vercel')
    console.log('4. Register webhooks: npm run webhook:register')
    process.exit(0)
  } else {
    console.log('❌ Some configuration is missing:\n')
    
    if (!envCheck.allPresent) {
      console.log('Missing environment variables:')
      envCheck.missing.forEach(key => {
        console.log(`  - ${key}`)
      })
      console.log('\nCreate .env.local file and add these variables.')
    }
    
    if (!configCheck) {
      console.log('\n⚠️  Update src/config/site.ts with Calendly event type URIs')
    }
    
    console.log('\nSee README.md for detailed setup instructions.')
    process.exit(1)
  }
}

main().catch((error) => {
  console.error('Error:', error)
  process.exit(1)
})

