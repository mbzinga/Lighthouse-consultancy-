-- Add package_purchases table for Stripe payments
CREATE TABLE IF NOT EXISTS package_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  stripe_payment_intent_id TEXT,
  booking_option_id TEXT NOT NULL,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  amount_paid INTEGER NOT NULL, -- in pence
  currency TEXT NOT NULL DEFAULT 'gbp',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'cancelled')),
  sessions_remaining INTEGER NOT NULL DEFAULT 0,
  expires_at TIMESTAMPTZ,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add index for lookups
CREATE INDEX IF NOT EXISTS idx_package_purchases_stripe_session_id ON package_purchases(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_package_purchases_email ON package_purchases(email);
CREATE INDEX IF NOT EXISTS idx_package_purchases_status ON package_purchases(status);

-- Add package_sessions table to track package booking usage
CREATE TABLE IF NOT EXISTS package_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_purchase_id UUID NOT NULL REFERENCES package_purchases(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  calendly_invitee_uri TEXT,
  session_date TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_package_sessions_package_purchase_id ON package_sessions(package_purchase_id);
CREATE INDEX IF NOT EXISTS idx_package_sessions_booking_id ON package_sessions(booking_id);

-- Add updated_at trigger for package_purchases
CREATE TRIGGER update_package_purchases_updated_at
  BEFORE UPDATE ON package_purchases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();







