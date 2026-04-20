CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('borrower', 'dsa_agent', 'ops_reviewer', 'provider_user')),
  provider_id UUID NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS borrowers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NULL REFERENCES users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  employment_type TEXT NOT NULL CHECK (employment_type IN ('salaried', 'self_employed')),
  company_name TEXT,
  monthly_income NUMERIC(14,2) DEFAULT 0,
  annual_turnover NUMERIC(14,2) DEFAULT 0,
  existing_emi NUMERIC(14,2) DEFAULT 0,
  credit_score INTEGER,
  business_vintage_months INTEGER DEFAULT 0,
  business_entity_type TEXT DEFAULT 'individual',
  collateral_owned BOOLEAN NOT NULL DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  borrower_id UUID NOT NULL REFERENCES borrowers(id) ON DELETE CASCADE,
  product TEXT NOT NULL CHECK (product IN ('home_loan', 'lap', 'business_loan')),
  requested_amount NUMERIC(14,2) NOT NULL,
  requested_tenure_months INTEGER,
  property_value NUMERIC(14,2),
  property_type TEXT,
  documents_available JSONB NOT NULL DEFAULT '[]'::jsonb,
  preferred_lenders JSONB NOT NULL DEFAULT '[]'::jsonb,
  stage TEXT NOT NULL DEFAULT 'new' CHECK (stage IN ('new', 'profiled', 'matched', 'submitted', 'provider_review', 'approved', 'rejected', 'disbursed')),
  assigned_to UUID NULL REFERENCES users(id) ON DELETE SET NULL,
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  institution_type TEXT NOT NULL CHECK (institution_type IN ('bank', 'nbfc', 'hfc', 'fintech_nbfc')),
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS provider_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  products_supported JSONB NOT NULL DEFAULT '[]'::jsonb,
  geographies JSONB NOT NULL DEFAULT '[]'::jsonb,
  min_ticket_size NUMERIC(14,2),
  max_ticket_size NUMERIC(14,2),
  min_credit_score INTEGER,
  max_foir NUMERIC(8,2),
  income_types_supported JSONB NOT NULL DEFAULT '[]'::jsonb,
  min_monthly_income NUMERIC(14,2),
  min_annual_turnover NUMERIC(14,2),
  min_business_vintage_months INTEGER,
  requires_collateral BOOLEAN NOT NULL DEFAULT FALSE,
  accepted_property_types JSONB NOT NULL DEFAULT '[]'::jsonb,
  required_documents JSONB NOT NULL DEFAULT '[]'::jsonb,
  target_tat_hours INTEGER,
  preference_weight INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS match_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  decision TEXT NOT NULL CHECK (decision IN ('match', 'fallback', 'reject')),
  score NUMERIC(8,2) NOT NULL,
  hard_filter_failures JSONB NOT NULL DEFAULT '[]'::jsonb,
  risk_adjustments JSONB NOT NULL DEFAULT '[]'::jsonb,
  soft_signals JSONB NOT NULL DEFAULT '[]'::jsonb,
  reject_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS case_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  actor_user_id UUID NULL REFERENCES users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  from_stage TEXT,
  to_stage TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_applications_stage ON applications(stage);
CREATE INDEX IF NOT EXISTS idx_applications_product ON applications(product);
CREATE INDEX IF NOT EXISTS idx_match_results_application ON match_results(application_id);
CREATE INDEX IF NOT EXISTS idx_provider_policies_provider ON provider_policies(provider_id);
