import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { BorrowerFormData } from "@/lib/types";

function toNumber(value: unknown) {
  if (value === "" || value === null || value === undefined) {
    return 0;
  }
  return Number(value);
}

export async function POST(request: Request) {
  const payload = (await request.json()) as BorrowerFormData;

  const borrowerResult = await query<{ id: string }>(
    `INSERT INTO borrowers (
      full_name, phone, email, city, state, employment_type, company_name,
      monthly_income, annual_turnover, existing_emi, credit_score,
      business_vintage_months, business_entity_type, collateral_owned, notes
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15
    ) RETURNING id`,
    [
      payload.fullName,
      payload.phone,
      payload.email || null,
      payload.city,
      payload.state.toLowerCase(),
      payload.employmentType,
      payload.companyName || null,
      toNumber(payload.monthlyIncome),
      toNumber(payload.annualTurnover),
      toNumber(payload.existingEmi),
      payload.creditScore ? Number(payload.creditScore) : null,
      toNumber(payload.businessVintageMonths),
      payload.businessEntityType,
      Boolean(payload.collateralOwned),
      payload.notes || null
    ]
  );

  const borrowerId = borrowerResult.rows[0].id;

  const applicationResult = await query<{ id: string }>(
    `INSERT INTO applications (
      borrower_id, product, requested_amount, requested_tenure_months,
      property_value, property_type, documents_available, preferred_lenders, stage
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7::jsonb,$8::jsonb,'profiled'
    ) RETURNING id`,
    [
      borrowerId,
      payload.product,
      toNumber(payload.requestedAmount),
      payload.tenureMonths ? Number(payload.tenureMonths) : null,
      payload.propertyValue ? Number(payload.propertyValue) : null,
      payload.propertyType || null,
      JSON.stringify(payload.documentsAvailable ?? []),
      JSON.stringify(payload.preferredLenders ?? [])
    ]
  );

  const applicationId = applicationResult.rows[0].id;

  await query(
    `INSERT INTO case_events (application_id, event_type, from_stage, to_stage, payload)
     VALUES ($1, 'application_profiled', 'new', 'profiled', $2::jsonb)`,
    [applicationId, JSON.stringify({ product: payload.product })]
  );

  return NextResponse.json({ borrowerId, applicationId, stage: "profiled" }, { status: 201 });
}
