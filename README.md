# Hybrid Neuro-Symbolic Decision & Behavioral Architecture

**Author:** Muhammad Chaidir Hasibuan, S.Kom., M.Cs.  
**Affiliation:** Founder & Principal AI Systems Architect, [Serendipity AI Ventures](https://serendipity.orderhero.id)  
**Research Focus:** Hybrid Neuro-Symbolic AI, Hallucination Mitigation, Trustworthy Decision Support, and Longitudinal Human-AI Interaction

---

## 1. Overview & Motivation

Pure Large Language Model (LLM) pipelines struggle with two critical failure modes in real-world human-facing applications:
1. **Numerical & Constraint Hallucination:** Unconstrained generative models routinely miscalculate financial bounds, capacity limits, or domain-specific mathematical rules.
2. **Intervention Fatigue in Behavioral Loops:** Continuous generative prompting often introduces high cognitive friction, degrading long-term user adherence.

This repository documents the **reference architectural patterns** developed and validated in production across two applied systems under **Serendipity AI Ventures**:
- **Racik Jasa** *(One-Shot Neuro-Symbolic Decision Support)*
- **Subuh Kamu** *(Longitudinal Deterministic-First Behavioral Intervention)*

*(Note: Proprietary commercial datasets, production credentials, and full frontend assets are omitted; this repository provides sanitized architectural specifications and deterministic reference modules.)*

---

## 2. Comparative System Matrix

| Dimension | **Racik Jasa** | **Subuh Kamu** |
| :--- | :--- | :--- |
| **Interaction Paradigm** | One-shot structured synthesis | 30-day longitudinal behavioral loop |
| **Core Failure Mode Addressed** | Numerical pricing & workload hallucination | Habit drop-off, cognitive overload, missed cues |
| **Deterministic Layer (Symbolic)** | Financial floor, regional wage anchor & weekly hour capacity formulas (JS) | Astronomical prayer-time solver (-20° sun angle + 2m *ihtiyath*), 4-stage progressive overload & fault-tolerant reset state machine |
| **Generative / Adaptive Layer** | Constrained narrative synthesis (`deepseek-v4.1-flash` via OpenRouter) | Dual-window event-driven nudge dispatch (`@SubuhKamuBot`) & curated positive reinforcement |
| **Backend & Security Isolation** | Serverless Supabase (PostgreSQL), passwordless auth, TypeScript Edge Functions (`ai-proxy`), atomic quota rollback | Local-first state persistence + Supabase webhook & cohort telemetry |
| **Primary Evaluation Metric** | Zero arithmetic deviation from deterministic bounds; unit cost (~$0.003/report) | 30-lantern completion rate, post-reset recovery rate, dyadic accountability lift |

---

## 3. Architectural Pattern A: Deterministic-First Guardrails (*Racik Jasa*)

Instead of asking an LLM to compute service rates or capacity limits, all numerical invariants are resolved deterministically prior to inference and injected as immutable constraints into the prompt context:

