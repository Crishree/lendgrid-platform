INSERT INTO users (id, full_name, email, phone, role)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Priya Sharma', 'priya.borrower@lendgrid.app', '9876543210', 'borrower'),
  ('22222222-2222-2222-2222-222222222222', 'Arjun Mehta', 'arjun.agent@lendgrid.app', '9876500001', 'dsa_agent'),
  ('33333333-3333-3333-3333-333333333333', 'Meera Nair', 'meera.ops@lendgrid.app', '9876500002', 'ops_reviewer')
ON CONFLICT (id) DO NOTHING;

INSERT INTO providers (id, name, institution_type, contact_name, contact_email, contact_phone, notes)
VALUES
  (
    '44444444-4444-4444-4444-444444444444',
    'Metro Housing Finance',
    'hfc',
    'Rohit Kapoor',
    'rohit@metrohousing.example',
    '9876500100',
    'Strong fit for prime salaried home loan customers in metro markets.'
  ),
  (
    '55555555-5555-5555-5555-555555555555',
    'CapitalBridge NBFC',
    'nbfc',
    'Sonal Iyer',
    'sonal@capitalbridge.example',
    '9876500101',
    'Works across LAP and self-employed files with moderate documentation appetite.'
  ),
  (
    '66666666-6666-6666-6666-666666666666',
    'MSME Sprint Finance',
    'fintech_nbfc',
    'Nitin Shah',
    'nitin@msmesprint.example',
    '9876500102',
    'Faster turnaround for business loan and working capital leads.'
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO provider_policies (
  id,
  provider_id,
  products_supported,
  geographies,
  min_ticket_size,
  max_ticket_size,
  min_credit_score,
  max_foir,
  income_types_supported,
  min_monthly_income,
  min_annual_turnover,
  min_business_vintage_months,
  requires_collateral,
  accepted_property_types,
  required_documents,
  target_tat_hours,
  preference_weight
)
VALUES
  (
    '74444444-4444-4444-4444-444444444444',
    '44444444-4444-4444-4444-444444444444',
    '["home_loan"]'::jsonb,
    '["maharashtra","karnataka","delhi_ncr"]'::jsonb,
    1500000,
    20000000,
    750,
    45,
    '["salaried"]'::jsonb,
    50000,
    0,
    0,
    false,
    '[]'::jsonb,
    '["pan","salary_slips","bank_statement_6m","employment_proof","property_documents"]'::jsonb,
    8,
    8
  ),
  (
    '75555555-5555-5555-5555-555555555555',
    '55555555-5555-5555-5555-555555555555',
    '["lap","home_loan"]'::jsonb,
    '["maharashtra","gujarat","tamil_nadu"]'::jsonb,
    1000000,
    10000000,
    700,
    50,
    '["salaried","self_employed"]'::jsonb,
    40000,
    1500000,
    24,
    true,
    '["residential","commercial"]'::jsonb,
    '["pan","bank_statement_6m","property_documents","itr","business_proof"]'::jsonb,
    18,
    6
  ),
  (
    '76666666-6666-6666-6666-666666666666',
    '66666666-6666-6666-6666-666666666666',
    '["business_loan"]'::jsonb,
    '["maharashtra","karnataka","gujarat","delhi_ncr"]'::jsonb,
    500000,
    5000000,
    690,
    55,
    '["self_employed"]'::jsonb,
    0,
    1800000,
    12,
    false,
    '[]'::jsonb,
    '["pan","bank_statement_12m","gst_returns","itr","business_proof"]'::jsonb,
    6,
    9
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO borrowers (
  id,
  user_id,
  full_name,
  phone,
  email,
  city,
  state,
  employment_type,
  company_name,
  monthly_income,
  annual_turnover,
  existing_emi,
  credit_score,
  business_vintage_months,
  business_entity_type,
  collateral_owned,
  notes
)
VALUES
  (
    '77777777-7777-7777-7777-777777777777',
    '11111111-1111-1111-1111-111111111111',
    'Priya Sharma',
    '9876543210',
    'priya.borrower@lendgrid.app',
    'Mumbai',
    'maharashtra',
    'salaried',
    NULL,
    125000,
    0,
    22000,
    782,
    0,
    'individual',
    false,
    'Prime salaried borrower seeking a home loan for an apartment purchase.'
  ),
  (
    '88888888-8888-8888-8888-888888888888',
    NULL,
    'Rakesh Jain',
    '9876543222',
    'rakesh.lap@lendgrid.app',
    'Pune',
    'maharashtra',
    'self_employed',
    'Jain Industrial Supplies',
    90000,
    3200000,
    36000,
    724,
    48,
    'sole_proprietorship',
    true,
    'Self-employed LAP applicant with commercial property as collateral.'
  ),
  (
    '99999999-9999-9999-9999-999999999999',
    NULL,
    'Neha Verma',
    '9876543333',
    'neha.biz@lendgrid.app',
    'Bengaluru',
    'karnataka',
    'self_employed',
    'Verma Foods LLP',
    0,
    4800000,
    28000,
    706,
    30,
    'llp',
    false,
    'Business loan lead for working capital expansion.'
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO applications (
  id,
  borrower_id,
  product,
  requested_amount,
  requested_tenure_months,
  property_value,
  property_type,
  documents_available,
  preferred_lenders,
  stage,
  assigned_to,
  submitted_at
)
VALUES
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '77777777-7777-7777-7777-777777777777',
    'home_loan',
    6200000,
    240,
    9500000,
    'apartment',
    '["pan","salary_slips","bank_statement_6m","employment_proof","property_documents"]'::jsonb,
    '["Metro Housing Finance"]'::jsonb,
    'matched',
    '33333333-3333-3333-3333-333333333333',
    NULL
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '88888888-8888-8888-8888-888888888888',
    'lap',
    3800000,
    180,
    8200000,
    'commercial',
    '["pan","bank_statement_6m","property_documents","itr","business_proof"]'::jsonb,
    '[]'::jsonb,
    'submitted',
    '33333333-3333-3333-3333-333333333333',
    NOW()
  ),
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    '99999999-9999-9999-9999-999999999999',
    'business_loan',
    2400000,
    48,
    NULL,
    NULL,
    '["pan","bank_statement_12m","gst_returns","itr","business_proof"]'::jsonb,
    '["MSME Sprint Finance"]'::jsonb,
    'profiled',
    '33333333-3333-3333-3333-333333333333',
    NULL
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO match_results (
  id,
  application_id,
  provider_id,
  decision,
  score,
  hard_filter_failures,
  risk_adjustments,
  soft_signals,
  reject_reason
)
VALUES
  (
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '44444444-4444-4444-4444-444444444444',
    'match',
    92,
    '[]'::jsonb,
    '["Credit score clears provider floor","FOIR 17.6% within provider cap","Income type is inside provider policy","Monthly income meets provider threshold"]'::jsonb,
    '["Documentation fit is complete","Target TAT 8 hours","Provider preference weight applied","Borrower or DSA preference aligns with provider"]'::jsonb,
    NULL
  ),
  (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '55555555-5555-5555-5555-555555555555',
    'fallback',
    66,
    '[]'::jsonb,
    '["Credit score clears provider floor","FOIR 17.6% within provider cap","Income type is inside provider policy","Monthly income meets provider threshold"]'::jsonb,
    '["Documentation fit is usable with follow-up","Target TAT 18 hours","Provider preference weight applied"]'::jsonb,
    'Usable fallback after primary routes'
  ),
  (
    'ffffffff-ffff-ffff-ffff-ffffffffffff',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '55555555-5555-5555-5555-555555555555',
    'match',
    81,
    '[]'::jsonb,
    '["Credit score clears provider floor","FOIR 40.0% within provider cap","Income type is inside provider policy","Annual turnover meets provider threshold"]'::jsonb,
    '["Documentation fit is complete","Target TAT 18 hours","Provider preference weight applied"]'::jsonb,
    NULL
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO case_events (id, application_id, actor_user_id, event_type, from_stage, to_stage, payload)
VALUES
  (
    '12121212-1212-1212-1212-121212121212',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '22222222-2222-2222-2222-222222222222',
    'application_profiled',
    'new',
    'profiled',
    '{"product":"home_loan"}'::jsonb
  ),
  (
    '13131313-1313-1313-1313-131313131313',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '33333333-3333-3333-3333-333333333333',
    'matching_completed',
    'profiled',
    'matched',
    '{"results":2}'::jsonb
  ),
  (
    '14141414-1414-1414-1414-141414141414',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '33333333-3333-3333-3333-333333333333',
    'stage_changed',
    'matched',
    'submitted',
    '{}'::jsonb
  ),
  (
    '15151515-1515-1515-1515-151515151515',
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    '22222222-2222-2222-2222-222222222222',
    'application_profiled',
    'new',
    'profiled',
    '{"product":"business_loan"}'::jsonb
  )
ON CONFLICT (id) DO NOTHING;
