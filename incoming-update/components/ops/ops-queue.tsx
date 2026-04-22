"use client";

import { useEffect, useState } from "react";
import type { ApplicationStage } from "@/lib/types";

type QueueItem = {
  id: string;
  product: string;
  stage: ApplicationStage;
  requested_amount: number;
  created_at: string;
  full_name: string;
  city: string;
  state: string;
  credit_score: number | null;
};

type MatchItem = {
  id: string;
  provider_name: string;
  decision: "match" | "fallback" | "reject";
  score: number;
  hard_filter_failures: string[];
  risk_adjustments: string[];
  soft_signals: string[];
  reject_reason: string | null;
};

type EventItem = {
  event_type: string;
  from_stage: string | null;
  to_stage: string | null;
  created_at: string;
};

type Detail = {
  application: Record<string, unknown>;
  matches: MatchItem[];
  events: EventItem[];
};

const stages: ApplicationStage[] = [
  "new",
  "profiled",
  "matched",
  "submitted",
  "provider_review",
  "approved",
  "rejected",
  "disbursed"
];

export function OpsQueue() {
  const [items, setItems] = useState<QueueItem[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [detail, setDetail] = useState<Detail | null>(null);
  const [status, setStatus] = useState("");

  async function loadQueue() {
    const response = await fetch("/api/applications");
    const data = await response.json();
    setItems(data.applications ?? []);
    if (!selectedId && data.applications?.length) {
      setSelectedId(data.applications[0].id);
    }
  }

  async function loadDetail(id: string) {
    const response = await fetch(`/api/applications/${id}`);
    const data = await response.json();
    if (response.ok) {
      setDetail(data);
    }
  }

  async function runMatch(id: string) {
    setStatus("Running match engine...");
    const response = await fetch("/api/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicationId: id })
    });
    const data = await response.json();
    setStatus(response.ok ? `Matched ${data.matches.length} providers` : data.error ?? "Match failed");
    await loadQueue();
    await loadDetail(id);
  }

  async function moveStage(id: string, stage: ApplicationStage) {
    setStatus(`Updating case to ${stage}...`);
    const response = await fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage })
    });
    const data = await response.json();
    setStatus(response.ok ? `Case moved to ${data.stage}` : data.error ?? "Stage update failed");
    await loadQueue();
    await loadDetail(id);
  }

  useEffect(() => {
    loadQueue();
  }, []);

  useEffect(() => {
    if (selectedId) {
      loadDetail(selectedId);
    }
  }, [selectedId]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="space-y-4 rounded-[1.75rem] border border-border bg-card p-5 shadow-panel">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Ops queue</h2>
          {status && <span className="text-xs text-muted-foreground">{status}</span>}
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`w-full rounded-[1.25rem] border p-4 text-left ${selectedId === item.id ? "border-accent bg-accent/8" : "border-border"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{item.full_name}</p>
                <span className="status-pill">{item.stage}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.product} · ₹{Number(item.requested_amount).toLocaleString("en-IN")} · {item.city}, {item.state}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Credit score: {item.credit_score ?? "unknown"}</p>
            </button>
          ))}
          {items.length === 0 && <p className="text-sm text-muted-foreground">No applications yet. Submit a borrower profile first.</p>}
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[1.75rem] border border-border bg-card p-6 shadow-panel">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Case detail</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Profiled case, explanations, and lifecycle controls for `match + fallback + reject reason`.
              </p>
            </div>
            {selectedId && <button className="primary-button" onClick={() => runMatch(selectedId)}>Run matching</button>}
          </div>

          {detail && (
            <>
              <div className="mt-6 grid gap-3 md:grid-cols-4">
                {[
                  ["Product", String(detail.application.product ?? "")],
                  ["Stage", String(detail.application.stage ?? "")],
                  ["Amount", `₹${Number(detail.application.requested_amount ?? 0).toLocaleString("en-IN")}`],
                  ["Credit score", String(detail.application.credit_score ?? "unknown")]
                ].map(([label, value]) => (
                  <div key={label} className="data-card">
                    <p className="data-label">{label}</p>
                    <p className="data-value text-lg">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {stages.map((stage) => (
                  <button
                    key={stage}
                    type="button"
                    className="secondary-button"
                    onClick={() => selectedId && moveStage(selectedId, stage)}
                  >
                    Move to {stage}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="rounded-[1.75rem] border border-border bg-card p-6 shadow-panel">
          <h3 className="text-xl font-semibold">Match explanation panel</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {detail?.matches?.map((match) => (
              <div key={match.id} className="rounded-[1.25rem] border border-border p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{match.provider_name}</p>
                  <span className="dashboard-chip">{match.decision}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Score {Number(match.score).toFixed(1)}</p>
                {match.hard_filter_failures.length > 0 && (
                  <p className="mt-3 text-sm text-rose-600">Hard filters: {match.hard_filter_failures.join(", ")}</p>
                )}
                {match.risk_adjustments.length > 0 && (
                  <p className="mt-3 text-sm text-muted-foreground">Risk: {match.risk_adjustments.join(" | ")}</p>
                )}
                {match.soft_signals.length > 0 && (
                  <p className="mt-3 text-sm text-muted-foreground">Soft: {match.soft_signals.join(" | ")}</p>
                )}
                {match.reject_reason && <p className="mt-3 text-sm font-medium">{match.reject_reason}</p>}
              </div>
            ))}
            {!detail?.matches?.length && <p className="text-sm text-muted-foreground">Run matching to generate explanations.</p>}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-border bg-card p-6 shadow-panel">
          <h3 className="text-xl font-semibold">Case events</h3>
          <div className="mt-4 space-y-3">
            {detail?.events?.map((event, index) => (
              <div key={`${event.event_type}-${index}`} className="feature-row">
                <span className="font-semibold">{event.event_type}</span>
                <span className="text-sm text-muted-foreground">
                  {event.from_stage ?? "n/a"} → {event.to_stage ?? "n/a"}
                </span>
              </div>
            ))}
            {!detail?.events?.length && <p className="text-sm text-muted-foreground">No case events yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
