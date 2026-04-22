import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { ProviderFormData } from "@/lib/types";

function toNullableNumber(value: unknown) {
  if (value === "" || value === null || value === undefined) {
    return null;
  }
  return Number(value);
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ProviderFormData;

  const providerResult = await query<{ id: string }>(
    `INSERT INTO providers (name, institution_type, contact_name, contact_email, contact_phone, notes)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING id`,
    [
      payload.providerName,
      payload.institutionType,
      payload.contactName,
      payload.contactEmail,
      payload.contactPhone,
      payload.notes || null
    ]
  );

  const providerId = providerResult.rows[0].id;

  await query(
    `INSERT INTO provider_policies (
      provider_id, products_supported, geographies, min_ticket_size, max_ticket_size,
      min_credit_score, max_foir, income_types_supported, min_monthly_income,
      min_annual_turnover, min_business_vintage_months, requires_collateral,
      accepted_property_types, required_documents, target_tat_hours, preference_weight
    ) VALUES (
      $1,$2::jsonb,$3::jsonb,$4,$5,$6,$7,$8::jsonb,$9,$10,$11,$12,$13::jsonb,$14::jsonb,$15,$16
    )`,
    [
      providerId,
      JSON.stringify(payload.productsSupported ?? []),
      JSON.stringify((payload.geographies ?? []).map((item) => item.toLowerCase())),
      toNullableNumber(payload.minTicketSize),
      toNullableNumber(payload.maxTicketSize),
      toNullableNumber(payload.minCreditScore),
      toNullableNumber(payload.maxFoir),
      JSON.stringify(payload.incomeTypesSupported ?? []),
      toNullableNumber(payload.minMonthlyIncome),
      toNullableNumber(payload.minAnnualTurnover),
      toNullableNumber(payload.minBusinessVintageMonths),
      Boolean(payload.requiresCollateral),
      JSON.stringify(payload.acceptedPropertyTypes ?? []),
      JSON.stringify(payload.requiredDocuments ?? []),
      toNullableNumber(payload.targetTatHours),
      toNullableNumber(payload.preferenceWeight) ?? 0
    ]
  );

  return NextResponse.json({ providerId }, { status: 201 });
}
