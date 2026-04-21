"use client";

import { useMemo, useState } from "react";
import { borrowerSchemaByProduct, PRODUCT_OPTIONS } from "@/lib/ruloans-derived";
import type { BorrowerFormData, LoanProduct } from "@/lib/types";

const initialState: BorrowerFormData = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  state: "",
  product: "home_loan",
  employmentType: "salaried",
  companyName: "",
  monthlyIncome: 0,
  annualTurnover: 0,
  existingEmi: 0,
  creditScore: 0,
  requestedAmount: 0,
  tenureMonths: 240,
  propertyValue: 0,
  propertyType: "",
  collateralOwned: false,
  businessVintageMonths: 0,
  businessEntityType: "individual",
  documentsAvailable: [],
  notes: "",
  preferredLenders: []
};

export function BorrowerIntakeForm() {
  const [form, setForm] = useState<BorrowerFormData>(initialState);
  const [status, setStatus] = useState<string>("");
  const activeSchema = useMemo(() => borrowerSchemaByProduct[form.product], [form.product]);

  function updateField(name: keyof BorrowerFormData, value: string | number | boolean | string[]) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Submitting borrower profile...");

    const response = await fetch("/api/borrowers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const result = await response.json();
    setStatus(response.ok ? `Application created: ${result.applicationId}` : result.error ?? "Submission failed");
  }

  return (
    <form className="grid gap-6" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="field">
          <span className="field-label">Loan product</span>
          <select value={form.product} onChange={(e) => updateField("product", e.target.value as LoanProduct)} className="field-input">
            {PRODUCT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        <div className="field-note">
          <p className="field-label">Schema source</p>
          <p>{activeSchema.title}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {activeSchema.fields.map((field) => {
          if (field.type === "textarea") {
            return (
              <label key={String(field.name)} className="field md:col-span-2">
                <span className="field-label">{field.label}</span>
                <textarea
                  className="field-input min-h-[120px]"
                  placeholder={field.placeholder}
                  value={String(form[field.name as keyof BorrowerFormData] ?? "")}
                  onChange={(e) => updateField(field.name as keyof BorrowerFormData, e.target.value)}
                />
                {field.helper && <span className="field-help">{field.helper}</span>}
              </label>
            );
          }

          if (field.type === "checkbox") {
            return (
              <label key={String(field.name)} className="field checkbox-field">
                <input
                  type="checkbox"
                  checked={Boolean(form[field.name as keyof BorrowerFormData])}
                  onChange={(e) => updateField(field.name as keyof BorrowerFormData, e.target.checked)}
                />
                <span>{field.label}</span>
              </label>
            );
          }

          if (field.type === "select") {
            return (
              <label key={String(field.name)} className="field">
                <span className="field-label">{field.label}</span>
                <select
                  className="field-input"
                  value={String(form[field.name as keyof BorrowerFormData] ?? "")}
                  onChange={(e) => updateField(field.name as keyof BorrowerFormData, e.target.value)}
                >
                  <option value="">Select</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {field.helper && <span className="field-help">{field.helper}</span>}
              </label>
            );
          }

          if (field.type === "multiselect") {
            const selected = (form[field.name as keyof BorrowerFormData] as string[]) ?? [];
            return (
              <fieldset key={String(field.name)} className="field md:col-span-2">
                <span className="field-label">{field.label}</span>
                <div className="multi-grid">
                  {field.options?.map((option) => (
                    <label key={option.value} className="multi-option">
                      <input
                        type="checkbox"
                        checked={selected.includes(option.value)}
                        onChange={(e) =>
                          updateField(
                            field.name as keyof BorrowerFormData,
                            e.target.checked
                              ? [...selected, option.value]
                              : selected.filter((item) => item !== option.value)
                          )
                        }
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                {field.helper && <span className="field-help">{field.helper}</span>}
              </fieldset>
            );
          }

          return (
            <label key={String(field.name)} className="field">
              <span className="field-label">{field.label}</span>
              <input
                className="field-input"
                type={field.type}
                placeholder={field.placeholder}
                value={field.type === "number" ? Number(form[field.name as keyof BorrowerFormData] ?? 0) : String(form[field.name as keyof BorrowerFormData] ?? "")}
                onChange={(e) =>
                  updateField(
                    field.name as keyof BorrowerFormData,
                    field.type === "number" ? Number(e.target.value) : e.target.value
                  )
                }
              />
              {field.helper && <span className="field-help">{field.helper}</span>}
            </label>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button className="primary-button" type="submit">Create borrower profile</button>
        {status && <span className="text-sm text-muted-foreground">{status}</span>}
      </div>
    </form>
  );
}
