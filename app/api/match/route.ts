import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rankMatches } from "@/lib/matching";

type ApplicationRow = {
  id: string;
  product: string;
  state: string;
  requested_amount: number;
  credit_score: number | null;
  existing_emi: number | null;
  monthly_income: number | null;
  annual_turnover: number | null;
  employment_type: string | null;
  property_type: string | null;
  collateral_owned: boolean | null;
  requested_tenure_months: number | null;
  documents_available: string[];
  preferred_lenders: string[];
};

type PolicyRow = {
  provider_id: string;
  provider_name: string;
  products_supported: string[];
  geographies: string[];
  min_ticket_size: number | null;
  max_ticket_size: number | null;
  min_credit_score: number | null;
  max_foir: number | null;
  income_types_supported: string[];
  min_monthly_income: number | null;
  min_annual_turnover: number | null;
  min_business_vintage_months: number | null;
  requires_collateral: boolean | null;
  accepted_property_types: string[];
  required_documents: string[];
  target_tat_hours: number | null;
  preference_weight: number | null;
  notes: string | null;
};

export async function POST(request: Request) {
  const { applicationId } = (await request.json()) as { applicationId: string };

  const applicationResult = await query<ApplicationRow>(
    `SELECT
      a.id,
      a.product,
      b.state,
      a.requested_amount,
      b.credit_score,
      b.existing_emi,
      b.monthly_income,
      b.annual_turnover,
      b.employment_type,
      a.property_type,
      b.collateral_owned,
      a.requested_tenure_months,
      a.documents_available,
      a.preferred_lenders
    FROM applications a
    JOIN borrowers b ON b.id = a.borrower_id
    WHERE a.id = $1`,
    [applicationId]
  );

  if (applicationResult.rows.length === 0) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  const policiesResult = await query<PolicyRow>(
    `SELECT
      p.id AS provider_id,
      p.name AS provider_name,
      pp.products_supported,
      pp.geographies,
      pp.min_ticket_size,
      pp.max_ticket_size,
      pp.min_credit_score,
      pp.max_foir,
      pp.income_types_supported,
      pp.min_monthly_income,
      pp.min_annual_turnover,
      pp.min_business_vintage_months,
      pp.requires_collateral,
      pp.accepted_property_types,
      pp.required_documents,
      pp.target_tat_hours,
      pp.preference_weight,
      p.notes
    FROM provider_policies pp
    JOIN providers p ON p.id = pp.provider_id`
  );

  const application = applicationResult.rows[0];
  const ranked = rankMatches(application, policiesResult.rows);

  await query("DELETE FROM match_results WHERE application_id = $1", [applicationId]);

  for (const item of ranked) {
    await query(
      `INSERT INTO match_results (
        application_id, provider_id, decision, score, hard_filter_failures,
        risk_adjustments, soft_signals, reject_reason
      ) VALUES ($1,$2,$3,$4,$5::jsonb,$6::jsonb,$7::jsonb,$8)`,
      [
        applicationId,
        item.providerId,
        item.decision,
        item.score,
        JSON.stringify(item.explanation.hardFilterFailures),
        JSON.stringify(item.explanation.riskAdjustments),
        JSON.stringify(item.explanation.softSignals),
        item.explanation.rejectReason
      ]
    );
  }

  await query("UPDATE applications SET stage = 'matched', updated_at = NOW() WHERE id = $1", [applicationId]);

  await query(
    `INSERT INTO case_events (application_id, event_type, from_stage, to_stage, payload)
     VALUES ($1, 'matching_completed', 'profiled', 'matched', $2::jsonb)`,
    [applicationId, JSON.stringify({ results: ranked.length })]
  );

  return NextResponse.json({ applicationId, matches: ranked });
}
