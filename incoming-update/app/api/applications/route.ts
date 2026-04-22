import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  const result = await query(
    `SELECT
      a.id,
      a.product,
      a.stage,
      a.requested_amount,
      a.created_at,
      b.full_name,
      b.city,
      b.state,
      b.credit_score
    FROM applications a
    JOIN borrowers b ON b.id = a.borrower_id
    ORDER BY a.created_at DESC
    LIMIT 50`
  );

  return NextResponse.json({ applications: result.rows });
}
