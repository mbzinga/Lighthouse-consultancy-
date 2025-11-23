import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// Runtime validation helper
export function validateSupabaseConfig() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')
  }
}

// Lazy initialization to avoid build-time errors
let _supabaseServer: ReturnType<typeof createClient<Database>> | null = null

function getSupabaseClient() {
  if (!_supabaseServer) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'
    
    _supabaseServer = createClient<Database>(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }
  return _supabaseServer
}

// Server-side Supabase client using service role key (bypasses RLS)
export const supabaseServer = new Proxy({} as ReturnType<typeof createClient<Database>>, {
  get(_target, prop) {
    validateSupabaseConfig()
    return getSupabaseClient()[prop as keyof ReturnType<typeof createClient<Database>>]
  },
})

