import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { ApplicationStage } from "@/lib/types";

type Params = { params: { id: string } };

export async function GET(_request: Request, { params }: Params) {
  const applicationResult = await query(
    `SELECT
      a.id,
      a.product,
      a.stage,
      a.requested_amount,
      a.requested_tenure_months,
      a.property_value,
      a.property_type,
      a.documents_available,
      a.preferred_lenders,
      b.full_name,
      b.city,
      b.state,
      b.employment_type,
      b.monthly_income,
      b.annual_turnover,
      b.existing_emi,
      b.credit_score,
      b.business_vintage_months,
      b.collateral_owned,
      b.notes
    FROM applications a
    JOIN borrowers b ON b.id = a.borrower_id
    WHERE a.id = $1`,
    [params.id]
  );

  if (applicationResult.rows.length === 0) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  const matchesResult = await query(
    `SELECT
      mr.id,
      mr.decision,
      mr.score,
      mr.hard_filter_failures,
      mr.risk_adjustments,
      mr.soft_signals,
      mr.reject_reason,
      p.name AS provider_name
    FROM match_results mr
    JOIN providers p ON p.id = mr.provider_id
    WHERE mr.application_id = $1
    ORDER BY mr.score DESC`,
    [params.id]
  );

  const eventsResult = await query(
    `SELECT event_type, from_stage, to_stage, payload, created_at
     FROM case_events
     WHERE application_id = $1
     ORDER BY created_at DESC`,
    [params.id]
  );

  return NextResponse.json({
    application: applicationResult.rows[0],
    matches: matchesResult.rows,
    events: eventsResult.rows
  });
}

export async function PATCH(request: Request, { params }: Params) {
  const { stage } = (await request.json()) as { stage: ApplicationStage };

  const previous = await query<{ stage: string }>("SELECT stage FROM applications WHERE id = $1", [params.id]);

  if (previous.rows.length === 0) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  const fromStage = previous.rows[0].stage;

  await query("UPDATE applications SET stage = $1, updated_at = NOW() WHERE id = $2", [stage, params.id]);
  await query(
    `INSERT INTO case_events (application_id, event_type, from_stage, to_stage, payload)
     VALUES ($1, 'stage_changed', $2, $3, '{}'::jsonb)`,
    [params.id, fromStage, stage]
  );

  return NextResponse.json({ id: params.id, fromStage, stage });
}
