// Generated database types for Supabase
// Run: npx supabase gen types typescript --project-id <project-id> > src/types/database.ts
// Or manually maintain based on schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string
          calendly_invitee_uri: string
          event_type_uri: string
          email: string
          name: string
          starts_at: string
          ends_at: string
          audience: 'family' | 'school' | 'la'
          notes: string | null
          status: 'scheduled' | 'canceled'
          raw: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          calendly_invitee_uri: string
          event_type_uri: string
          email: string
          name: string
          starts_at: string
          ends_at: string
          audience: 'family' | 'school' | 'la'
          notes?: string | null
          status?: 'scheduled' | 'canceled'
          raw: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          calendly_invitee_uri?: string
          event_type_uri?: string
          email?: string
          name?: string
          starts_at?: string
          ends_at?: string
          audience?: 'family' | 'school' | 'la'
          notes?: string | null
          status?: 'scheduled' | 'canceled'
          raw?: Json
          created_at?: string
          updated_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          organisation: string | null
          audience: 'family' | 'school' | 'la'
          message: string
          source: 'contact_form' | 'school_pkg' | 'la_pkg'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          organisation?: string | null
          audience: 'family' | 'school' | 'la'
          message: string
          source: 'contact_form' | 'school_pkg' | 'la_pkg'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          organisation?: string | null
          audience?: 'family' | 'school' | 'la'
          message?: string
          source?: 'contact_form' | 'school_pkg' | 'la_pkg'
          created_at?: string
        }
      }
      package_purchases: {
        Row: {
          id: string
          stripe_session_id: string
          stripe_customer_id: string | null
          stripe_payment_intent_id: string | null
          booking_option_id: string
          email: string
          name: string
          amount_paid: number
          currency: string
          status: 'pending' | 'paid' | 'failed' | 'cancelled'
          sessions_remaining: number
          expires_at: string | null
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          stripe_session_id: string
          stripe_customer_id?: string | null
          stripe_payment_intent_id?: string | null
          booking_option_id: string
          email: string
          name: string
          amount_paid: number
          currency?: string
          status?: 'pending' | 'paid' | 'failed' | 'cancelled'
          sessions_remaining?: number
          expires_at?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          stripe_session_id?: string
          stripe_customer_id?: string | null
          stripe_payment_intent_id?: string | null
          booking_option_id?: string
          email?: string
          name?: string
          amount_paid?: number
          currency?: string
          status?: 'pending' | 'paid' | 'failed' | 'cancelled'
          sessions_remaining?: number
          expires_at?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      package_sessions: {
        Row: {
          id: string
          package_purchase_id: string
          booking_id: string | null
          calendly_invitee_uri: string | null
          session_date: string | null
          status: 'scheduled' | 'completed' | 'cancelled'
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          package_purchase_id: string
          booking_id?: string | null
          calendly_invitee_uri?: string | null
          session_date?: string | null
          status?: 'scheduled' | 'completed' | 'cancelled'
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          package_purchase_id?: string
          booking_id?: string | null
          calendly_invitee_uri?: string | null
          session_date?: string | null
          status?: 'scheduled' | 'completed' | 'cancelled'
          notes?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}


