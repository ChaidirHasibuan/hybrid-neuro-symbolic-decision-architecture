/**
 * Reference Module: Deterministic Constraint Guardrails & Fault-Tolerant Habit State Machine
 * Author: Muhammad Chaidir Hasibuan (Serendipity AI Ventures)
 * Purpose: Decouples exact numerical/state invariants from generative LLM reasoning.
 */

/**
 * 1. Racik Jasa: Deterministic Pricing & Capacity Bound Solver
 * Prevents LLM numerical hallucination by locking financial bounds prior to prompt injection.
 */
export function computeDeterministicPricingBounds({
  monthlyBaselineIncome,
  regionalMinimumWage,
  availableWeeklyHours,
  complexityMultiplier = 1.25,
}) {
  const effectiveMonthlyFloor = Math.max(monthlyBaselineIncome, regionalMinimumWage);
  const monthlyBillableHours = Math.max(availableWeeklyHours * 4 * 0.75, 4); // 75% utilization cap
  const baseHourlyRate = effectiveMonthlyFloor / monthlyBillableHours;

  return {
    currency: "IDR",
    hourlyFloor: Math.round(baseHourlyRate),
    recommendedPackageRate: Math.round(baseHourlyRate * 4 * complexityMultiplier),
    maxMonthlyDeliverables: Math.max(1, Math.floor(monthlyBillableHours / 4)),
  };
}

/**
 * 2. Subuh Kamu: Fault-Tolerant 30-Day Habit Progression State Machine
 * Balances accountability with psychological resilience against single-day lapses.
 */
export function evaluateHabitCycleState({
  completedLanterns,
  consecutiveMisses,
  totalMisses,
  isExemptMode = false, // e.g., physiological exemption mode
}) {
  if (isExemptMode) {
    return { status: "PAUSED_EXEMPT", completedLanterns, stage: Math.min(4, Math.floor(completedLanterns / 7) + 1) };
  }

  if (consecutiveMisses >= 3 || totalMisses > 8) {
    return { status: "RESET_REQUIRED", completedLanterns: 0, stage: 1 };
  }

  const stage = Math.min(4, Math.floor(completedLanterns / 7) + 1);
  const status = completedLanterns >= 30 ? "COMPLETED_MAINTENANCE_MODE" : "ACTIVE";

  return { status, completedLanterns, stage };
}
