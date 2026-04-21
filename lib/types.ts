export type LoanProduct = "home_loan" | "lap" | "business_loan";

export type UserRole = "borrower" | "dsa_agent" | "ops_reviewer" | "provider_user";

export type ApplicationStage =
  | "new"
  | "profiled"
  | "matched"
  | "submitted"
  | "provider_review"
  | "approved"
  | "rejected"
  | "disbursed";

export type EmploymentType = "salaried" | "self_employed";

export type BusinessEntity =
  | "sole_proprietorship"
  | "partnership"
  | "llp"
  | "private_limited"
  | "public_limited"
  | "individual";

export type ProviderInstitutionType = "bank" | "nbfc" | "hfc" | "fintech_nbfc";

export type MatchDecision = "match" | "fallback" | "reject";

export type BorrowerFormData = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  product: LoanProduct;
  employmentType: EmploymentType;
  companyName: string;
  monthlyIncome: number;
  annualTurnover: number;
  existingEmi: number;
  creditScore: number;
  requestedAmount: number;
  tenureMonths: number;
  propertyValue: number;
  propertyType: string;
  collateralOwned: boolean;
  businessVintageMonths: number;
  businessEntityType: BusinessEntity;
  documentsAvailable: string[];
  notes: string;
  preferredLenders: string[];
};

export type ProviderFormData = {
  providerName: string;
  institutionType: ProviderInstitutionType;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  productsSupported: LoanProduct[];
  geographies: string[];
  minTicketSize: number;
  maxTicketSize: number;
  minCreditScore: number;
  maxFoir: number;
  incomeTypesSupported: EmploymentType[];
  minMonthlyIncome: number;
  minAnnualTurnover: number;
  minBusinessVintageMonths: number;
  requiresCollateral: boolean;
  acceptedPropertyTypes: string[];
  requiredDocuments: string[];
  targetTatHours: number;
  preferenceWeight: number;
  notes: string;
};

export type MatchExplanation = {
  decision: MatchDecision;
  score: number;
  hardFilterFailures: string[];
  riskAdjustments: string[];
  softSignals: string[];
  rejectReason: string | null;
};
