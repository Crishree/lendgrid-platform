import type { MatchDecision, MatchExplanation } from "@/lib/types";

type ApplicationCandidate = {
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

type ProviderPolicyCandidate = {
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

function calculateFoir(application: ApplicationCandidate) {
  if (!application.monthly_income || !application.existing_emi) {
    return null;
  }

  if (application.monthly_income <= 0) {
    return null;
  }

  return (application.existing_emi / application.monthly_income) * 100;
}

export function explainMatch(application: ApplicationCandidate, policy: ProviderPolicyCandidate): MatchExplanation {
  const hardFilterFailures: string[] = [];
  const riskAdjustments: string[] = [];
  const softSignals: string[] = [];

  if (!policy.products_supported.includes(application.product)) {
    hardFilterFailures.push("Product not supported");
  }

  if (policy.geographies.length > 0 && !policy.geographies.includes(application.state.toLowerCase())) {
    hardFilterFailures.push("Geography outside provider coverage");
  }

  if (policy.min_ticket_size !== null && application.requested_amount < policy.min_ticket_size) {
    hardFilterFailures.push("Ticket size below provider minimum");
  }

  if (policy.max_ticket_size !== null && application.requested_amount > policy.max_ticket_size) {
    hardFilterFailures.push("Ticket size above provider maximum");
  }

  if (policy.requires_collateral && !application.collateral_owned && application.product === "lap") {
    hardFilterFailures.push("Collateral required but not available");
  }

  if (policy.accepted_property_types.length > 0 && application.property_type && application.product === "lap") {
    if (!policy.accepted_property_types.includes(application.property_type)) {
      hardFilterFailures.push("Collateral type not accepted");
    }
  }

  if (hardFilterFailures.length > 0) {
    return {
      decision: "reject",
      score: 0,
      hardFilterFailures,
      riskAdjustments,
      softSignals,
      rejectReason: hardFilterFailures[0]
    };
  }

  let score = 50;

  if (policy.min_credit_score !== null) {
    if ((application.credit_score ?? 0) < policy.min_credit_score) {
      riskAdjustments.push(`Credit score below minimum threshold of ${policy.min_credit_score}`);
      score -= 35;
    } else {
      riskAdjustments.push("Credit score clears provider floor");
      score += 12;
    }
  }

  const foir = calculateFoir(application);

  if (policy.max_foir !== null && foir !== null) {
    if (foir > policy.max_foir) {
      riskAdjustments.push(`FOIR ${foir.toFixed(1)}% exceeds provider cap`);
      score -= 20;
    } else {
      riskAdjustments.push(`FOIR ${foir.toFixed(1)}% within provider cap`);
      score += 8;
    }
  }

  if (policy.income_types_supported.length > 0 && application.employment_type) {
    if (policy.income_types_supported.includes(application.employment_type)) {
      riskAdjustments.push("Income type is inside provider policy");
      score += 8;
    } else {
      riskAdjustments.push("Income type unsupported by provider");
      score -= 30;
    }
  }

  if (policy.min_monthly_income !== null && application.monthly_income !== null) {
    if (application.monthly_income >= policy.min_monthly_income) {
      riskAdjustments.push("Monthly income meets provider threshold");
      score += 5;
    } else {
      riskAdjustments.push("Monthly income below provider threshold");
      score -= 10;
    }
  }

  if (policy.min_annual_turnover !== null && application.annual_turnover !== null) {
    if (application.annual_turnover >= policy.min_annual_turnover) {
      riskAdjustments.push("Annual turnover meets provider threshold");
      score += 6;
    } else {
      riskAdjustments.push("Annual turnover below provider threshold");
      score -= 12;
    }
  }

  const docMatches = policy.required_documents.filter((doc) => application.documents_available.includes(doc)).length;
  if (policy.required_documents.length > 0) {
    const docRatio = docMatches / policy.required_documents.length;
    if (docRatio === 1) {
      softSignals.push("Documentation fit is complete");
      score += 10;
    } else if (docRatio >= 0.6) {
      softSignals.push("Documentation fit is usable with follow-up");
      score += 4;
    } else {
      softSignals.push("Documentation gap is material");
      score -= 8;
    }
  }

  if (policy.target_tat_hours !== null) {
    const tatBoost = Math.max(0, 12 - Math.min(policy.target_tat_hours, 12));
    softSignals.push(`Target TAT ${policy.target_tat_hours} hours`);
    score += tatBoost;
  }

  if (policy.preference_weight !== null) {
    score += Math.min(policy.preference_weight, 10);
    softSignals.push("Provider preference weight applied");
  }

  if (application.preferred_lenders.includes(policy.provider_name)) {
    score += 4;
    softSignals.push("Borrower or DSA preference aligns with provider");
  }

  if (score >= 75) {
    return {
      decision: "match",
      score,
      hardFilterFailures,
      riskAdjustments,
      softSignals,
      rejectReason: null
    };
  }

  if (score >= 50) {
    return {
      decision: "fallback",
      score,
      hardFilterFailures,
      riskAdjustments,
      softSignals,
      rejectReason: "Usable fallback after primary routes"
    };
  }

  return {
    decision: "reject",
    score,
    hardFilterFailures,
    riskAdjustments,
    softSignals,
    rejectReason: "Risk filters reduce approval probability below routing threshold"
  };
}

export function rankMatches(application: ApplicationCandidate, policies: ProviderPolicyCandidate[]) {
  return policies
    .map((policy) => {
      const explanation = explainMatch(application, policy);
      return {
        providerId: policy.provider_id,
        providerName: policy.provider_name,
        decision: explanation.decision as MatchDecision,
        score: explanation.score,
        explanation
      };
    })
    .sort((a, b) => b.score - a.score);
}
