"use client";

import { useState } from "react";
import { dsaPartnerKycChecklist, providerPolicySchema } from "@/lib/ruloans-derived";
import type { ProviderFormData } from "@/lib/types";

const initialState: ProviderFormData = {
  providerName: "",
  institutionType: "bank",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  productsSupported: ["home_loan"],
  geographies: [],
  minTicketSize: 0,
  maxTicketSize: 0,
  minCreditScore: 0,
  maxFoir: 0,
  incomeTypesSupported: ["salaried"],
  minMonthlyIncome: 0,
  minAnnualTurnover: 0,
  minBusinessVintageMonths: 0,
  requiresCollateral: false,
  acceptedPropertyTypes: [],
  requiredDocuments: [],
  targetTatHours: 24,
  preferenceWeight: 5,
  notes: ""
};

export function ProviderOnboardingForm() {
  const [form, setForm] = useState<ProviderFormData>(initialState);
  const [status, setStatus] = useState("");

  function updateField(name: keyof ProviderFormData, value: string | number | boolean | string[]) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Saving provider policy...");

    const response = await fetch("/api/providers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const result = await response.json();
    setStatus(response.ok ? `Provider created: ${result.providerId}` : result.error ?? "Provider onboarding failed");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          {providerPolicySchema.map((field) => {
            if (field.type === "textarea") {
              return (
                <label key={String(field.name)} className="field md:col-span-2">
                  <span className="field-label">{field.label}</span>
                  <textarea
                    className="field-input min-h-[120px]"
                    value={String(form[field.name as keyof ProviderFormData] ?? "")}
                    onChange={(e) => updateField(field.name as keyof ProviderFormData, e.target.value)}
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
                    checked={Boolean(form[field.name as keyof ProviderFormData])}
                    onChange={(e) => updateField(field.name as keyof ProviderFormData, e.target.checked)}
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
                    value={String(form[field.name as keyof ProviderFormData] ?? "")}
                    onChange={(e) => updateField(field.name as keyof ProviderFormData, e.target.value)}
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
              const selected = (form[field.name as keyof ProviderFormData] as string[]) ?? [];
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
                              field.name as keyof ProviderFormData,
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
                  value={field.type === "number" ? Number(form[field.name as keyof ProviderFormData] ?? 0) : String(form[field.name as keyof ProviderFormData] ?? "")}
                  onChange={(e) =>
                    updateField(
                      field.name as keyof ProviderFormData,
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
          <button className="primary-button" type="submit">Create provider policy</button>
          {status && <span className="text-sm text-muted-foreground">{status}</span>}
        </div>
      </form>

      <div className="space-y-4 rounded-[1.75rem] border border-border bg-card p-6 shadow-panel">
        <div>
          <p className="field-label">Ruloans-derived partner checklist</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Public DSA partner content on Ruloans emphasizes KYC, business proof, bank statements, and product-specific documentation.
          </p>
        </div>
        <div className="space-y-2">
          {dsaPartnerKycChecklist.map((item) => (
            <div key={item} className="feature-row">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
