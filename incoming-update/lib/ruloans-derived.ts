import type { BorrowerFormData, LoanProduct, ProviderFormData } from "@/lib/types";

type FieldOption = { value: string; label: string };

export type FieldConfig = {
  name: keyof BorrowerFormData | keyof ProviderFormData;
  label: string;
  type: "text" | "email" | "tel" | "number" | "select" | "multiselect" | "textarea" | "checkbox";
  placeholder?: string;
  options?: FieldOption[];
  helper?: string;
};

export const PRODUCT_OPTIONS: FieldOption[] = [
  { value: "home_loan", label: "Home Loan" },
  { value: "lap", label: "Loan Against Property" },
  { value: "business_loan", label: "Business Loan" }
];

export const borrowerSchemaByProduct: Record<LoanProduct, { title: string; fields: FieldConfig[] }> = {
  home_loan: {
    title: "Borrower intake derived from Ruloans home loan eligibility and documentation",
    fields: [
      { name: "fullName", label: "Applicant name", type: "text", placeholder: "Full legal name" },
      { name: "phone", label: "Mobile number", type: "tel", placeholder: "10-digit mobile number" },
      { name: "email", label: "Email", type: "email", placeholder: "name@company.com" },
      { name: "city", label: "City", type: "text", placeholder: "Property / work city" },
      { name: "state", label: "State", type: "text", placeholder: "State" },
      { name: "employmentType", label: "Income profile", type: "select", options: [
        { value: "salaried", label: "Salaried" },
        { value: "self_employed", label: "Self-employed" }
      ], helper: "Ruloans distinguishes salaried and self-employed home loan eligibility and documents." },
      { name: "monthlyIncome", label: "Monthly income", type: "number", helper: "Home loan page mentions minimum income thresholds." },
      { name: "creditScore", label: "Credit score", type: "number", helper: "Ruloans home loan page flags 750 as a strong approval score." },
      { name: "requestedAmount", label: "Requested loan amount", type: "number" },
      { name: "tenureMonths", label: "Requested tenure (months)", type: "number" },
      { name: "propertyValue", label: "Property value", type: "number" },
      { name: "propertyType", label: "Property type", type: "select", options: [
        { value: "apartment", label: "Apartment" },
        { value: "independent_house", label: "Independent house" },
        { value: "plot_construction", label: "Plot / construction" },
        { value: "resale_property", label: "Resale property" }
      ] },
      { name: "documentsAvailable", label: "Documents available", type: "multiselect", options: [
        { value: "form16", label: "Form 16" },
        { value: "salary_slips", label: "3 months salary slips" },
        { value: "bank_statement_6m", label: "6 months bank statement" },
        { value: "employment_proof", label: "Employment proof" },
        { value: "pan", label: "PAN" },
        { value: "itr_financials", label: "ITR / CA financials" },
        { value: "business_address_proof", label: "Business address proof" },
        { value: "property_documents", label: "Property documents" }
      ], helper: "Copied from the public home loan documentation checklist categories." },
      { name: "notes", label: "Case notes", type: "textarea", placeholder: "Joint applicant, builder, sourcing notes, etc." }
    ]
  },
  lap: {
    title: "Borrower intake derived from Ruloans LAP overview and document requirements",
    fields: [
      { name: "fullName", label: "Applicant name", type: "text" },
      { name: "phone", label: "Mobile number", type: "tel" },
      { name: "email", label: "Email", type: "email" },
      { name: "city", label: "City", type: "text" },
      { name: "state", label: "State", type: "text" },
      { name: "employmentType", label: "Income profile", type: "select", options: [
        { value: "salaried", label: "Salaried" },
        { value: "self_employed", label: "Self-employed" }
      ] },
      { name: "monthlyIncome", label: "Monthly income", type: "number" },
      { name: "existingEmi", label: "Existing EMI obligations", type: "number" },
      { name: "creditScore", label: "Credit score", type: "number" },
      { name: "requestedAmount", label: "Requested LAP amount", type: "number" },
      { name: "propertyValue", label: "Market value of collateral property", type: "number", helper: "Ruloans LAP content emphasizes property valuation as core eligibility input." },
      { name: "propertyType", label: "Collateral property type", type: "select", options: [
        { value: "residential", label: "Residential" },
        { value: "commercial", label: "Commercial" },
        { value: "industrial", label: "Industrial" }
      ] },
      { name: "collateralOwned", label: "Applicant owns collateral", type: "checkbox" },
      { name: "documentsAvailable", label: "Documents available", type: "multiselect", options: [
        { value: "identity_proof", label: "Identity proof" },
        { value: "residence_proof", label: "Residence proof" },
        { value: "income_proof", label: "Income proof" },
        { value: "property_documents", label: "Property documents" },
        { value: "business_proof", label: "Business proof" },
        { value: "bank_statement_6m", label: "6 months account statement" }
      ] },
      { name: "notes", label: "Case notes", type: "textarea" }
    ]
  },
  business_loan: {
    title: "Borrower intake derived from Ruloans business loan eligibility and documentation",
    fields: [
      { name: "fullName", label: "Promoter / applicant name", type: "text" },
      { name: "phone", label: "Mobile number", type: "tel" },
      { name: "email", label: "Email", type: "email" },
      { name: "city", label: "Business city", type: "text" },
      { name: "state", label: "State", type: "text" },
      { name: "companyName", label: "Business name", type: "text" },
      { name: "businessEntityType", label: "Business entity type", type: "select", options: [
        { value: "sole_proprietorship", label: "Sole proprietorship" },
        { value: "partnership", label: "Partnership" },
        { value: "llp", label: "LLP" },
        { value: "private_limited", label: "Private limited" },
        { value: "public_limited", label: "Public limited" },
        { value: "individual", label: "Individual / MSME" }
      ], helper: "Ruloans business loan page lists these eligible entities broadly." },
      { name: "annualTurnover", label: "Annual turnover", type: "number" },
      { name: "businessVintageMonths", label: "Business vintage (months)", type: "number", helper: "Ruloans business loan page calls out minimum 1 year business vintage." },
      { name: "creditScore", label: "Credit score", type: "number", helper: "Ruloans business loan page notes 700+ preferred by many lenders." },
      { name: "requestedAmount", label: "Requested business loan amount", type: "number" },
      { name: "existingEmi", label: "Existing EMI obligations", type: "number" },
      { name: "documentsAvailable", label: "Documents available", type: "multiselect", options: [
        { value: "itr_2y", label: "ITR for 2-3 years" },
        { value: "bank_statement_12m", label: "12 months current account statement" },
        { value: "pan", label: "PAN card" },
        { value: "address_proof", label: "Residence and business address proof" },
        { value: "provisional_financials", label: "Provisional financials and projections" },
        { value: "gst_certificate", label: "GST certificate / returns" },
        { value: "incorporation_docs", label: "Incorporation / deed / MOA / AOA" }
      ], helper: "Taken from the public business loan document list." },
      { name: "notes", label: "Case notes", type: "textarea" }
    ]
  }
};

export const providerPolicySchema: FieldConfig[] = [
  { name: "providerName", label: "Provider name", type: "text" },
  { name: "institutionType", label: "Institution type", type: "select", options: [
    { value: "bank", label: "Bank" },
    { value: "nbfc", label: "NBFC" },
    { value: "hfc", label: "Housing finance company" },
    { value: "fintech_nbfc", label: "Fintech / NBFC" }
  ] },
  { name: "contactName", label: "Primary contact", type: "text" },
  { name: "contactEmail", label: "Contact email", type: "email" },
  { name: "contactPhone", label: "Contact phone", type: "tel" },
  { name: "productsSupported", label: "Products supported", type: "multiselect", options: PRODUCT_OPTIONS },
  { name: "geographies", label: "Supported geographies", type: "multiselect", options: [
    { value: "maharashtra", label: "Maharashtra" },
    { value: "karnataka", label: "Karnataka" },
    { value: "delhi_ncr", label: "Delhi NCR" },
    { value: "gujarat", label: "Gujarat" },
    { value: "tamil_nadu", label: "Tamil Nadu" }
  ], helper: "Derived from the partner model where providers operate across selected territories." },
  { name: "minTicketSize", label: "Minimum ticket size", type: "number" },
  { name: "maxTicketSize", label: "Maximum ticket size", type: "number" },
  { name: "minCreditScore", label: "Minimum credit score", type: "number" },
  { name: "maxFoir", label: "Maximum FOIR", type: "number" },
  { name: "incomeTypesSupported", label: "Income types supported", type: "multiselect", options: [
    { value: "salaried", label: "Salaried" },
    { value: "self_employed", label: "Self-employed" }
  ] },
  { name: "minMonthlyIncome", label: "Minimum monthly income", type: "number" },
  { name: "minAnnualTurnover", label: "Minimum annual turnover", type: "number" },
  { name: "minBusinessVintageMonths", label: "Minimum business vintage (months)", type: "number" },
  { name: "requiresCollateral", label: "Collateral mandatory", type: "checkbox" },
  { name: "acceptedPropertyTypes", label: "Accepted property types", type: "multiselect", options: [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "industrial", label: "Industrial" }
  ] },
  { name: "requiredDocuments", label: "Required documents", type: "multiselect", options: [
    { value: "aadhaar", label: "Aadhaar" },
    { value: "pan", label: "PAN" },
    { value: "salary_slips", label: "Salary slips" },
    { value: "bank_statement_6m", label: "6 months bank statement" },
    { value: "bank_statement_12m", label: "12 months bank statement" },
    { value: "property_documents", label: "Property documents" },
    { value: "gst_returns", label: "GST returns" },
    { value: "itr", label: "ITR / financials" },
    { value: "employment_proof", label: "Employment proof" },
    { value: "business_proof", label: "Business proof" }
  ], helper: "Public Ruloans DSA/loan pages emphasize KYC plus product-specific documentation." },
  { name: "targetTatHours", label: "Target turnaround time (hours)", type: "number" },
  { name: "preferenceWeight", label: "Preferred ranking weight", type: "number", helper: "Soft scoring input when multiple providers qualify." },
  { name: "notes", label: "Policy notes", type: "textarea" }
];

export const dsaPartnerKycChecklist = [
  "Aadhaar Card",
  "PAN Card",
  "Two passport-size photographs",
  "GST registration for companies, if applicable",
  "Employment proof or salary slips if employed",
  "Business account statements and address proof if running a business",
  "Invoices and financial statements if self-employed",
  "Bank statement for the last 6 months"
];
