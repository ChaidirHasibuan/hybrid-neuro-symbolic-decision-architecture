# Hybrid Neuro-Symbolic Decision & Behavioral Architecture

**Author:** Muhammad Chaidir Hasibuan
**Background:** Master of Computer Science (Internetworking Technology), Universiti Teknikal Malaysia Melaka (UTeM) · 13+ years at Bank Rakyat Indonesia (2012–2026), including retail payments and the BRImo super-app program
**Current:** Founder, [Serendipity AI Ventures](https://serendipity.orderhero.id) (Indonesia)
**Research interest:** Hybrid neuro-symbolic AI · hallucination mitigation · trustworthy decision support · longitudinal human-AI interaction · fraud detection in digital payments

---

## 1. Why this repository exists

I spent 13 years inside a bank, where a wrong number is never "close enough". When I started building AI products, I hit the same problem every builder hits: large language models are fluent, but they are not reliable with numbers, rules and time.

Two failure modes kept showing up:

1. **Numerical & constraint hallucination.** An LLM asked to price a service or estimate workload will confidently produce figures that break basic financial or capacity rules.
2. **Intervention fatigue in behavioral loops.** An app that "talks" to users every day with free-form generated text quickly becomes noise, and people stop opening it.

My working answer is simple: **let deterministic code own every number, rule and state transition; let the language model only explain, encourage and personalize inside those boundaries.**

This repository documents that pattern as it was applied in two real products. Proprietary data, credentials and full frontend code are omitted; what remains are the architectural specifications and reference modules.

---

## 2. Two systems, one principle

| Dimension | **Racik Jasa** | **Subuh Kamu** |
| :--- | :--- | :--- |
| **What it does** | Turns an ex-employee's office experience into priced freelance service packages | 30-day companion app that helps young Muslims stop missing the dawn (Subuh) prayer |
| **Interaction paradigm** | One-shot structured synthesis | 30-day longitudinal behavioral loop |
| **Failure mode addressed** | Pricing and workload hallucination | Habit drop-off, cognitive overload, missed cues |
| **Deterministic layer (symbolic)** | Financial floor, regional minimum-wage anchor and weekly hour-capacity formulas (JavaScript) | Prayer-time solver (Fajr at −20° sun angle + 2 min *ihtiyath*, per Indonesian Ministry of Religious Affairs convention), 30-lantern progression with fault-tolerant reset rules |
| **Generative / adaptive layer** | Constrained narrative synthesis via OpenRouter | Curated, rule-triggered nudges through a Telegram bot (`@SubuhKamuBot`) |
| **Backend** | Supabase (PostgreSQL), passwordless auth, TypeScript Edge Function proxy with atomic quota rollback | Local-first state + Supabase sync, Telegram Mini App login, scheduled nudge function |
| **Status** | Pilot ran Nov 2026; **discontinued** after the pilot (see §5) | **Live** since 25 Nov 2026 with paying users |

---

## 3. Pattern A — Deterministic-first guardrails (*Racik Jasa*)

Instead of asking the model to compute prices or capacity, every numerical invariant is resolved **before** inference and passed in as an immutable constraint:

1. **Collect inputs:** previous monthly income, regional minimum wage for the user's city, and available hours per week.
2. **Compute bounds deterministically** ([`src/deterministic_guardrails.js`](src/deterministic_guardrails.js)):
   - monthly floor = max(previous income, regional minimum wage)
   - billable hours = weekly hours × 4 × 75% utilization cap
   - hourly floor = monthly floor ÷ billable hours
   - package rate = hourly floor × 4 × complexity multiplier
   - maximum deliverables per month from billable capacity
3. **Generate inside the box:** the LLM receives these numbers as fixed facts and only writes package names, descriptions and positioning.

Result: the model never "decides" a number; it can only describe one.

---

## 4. Pattern B — Deterministic state machine for behavior change (*Subuh Kamu*)

The habit loop is a finite state machine; the model is not in charge of progress.

- **Progress unit:** one "lantern" per day the user marks Subuh as prayed. 30 lanterns = journey complete.
- **Four stages:** difficulty steps up every 7 lanterns (stage 1 → 4), a progressive-overload design.
- **Fault-tolerant reset:** 3 misses in a row (or more than 8 misses in total) restarts the journey — strict enough to matter, forgiving enough to survive a bad day.
- **Context-aware pauses:** a declared menstruation/postpartum rest period freezes the state and **breaks** the miss chain, so users are never penalized for a religious exemption.
- **Event-driven nudges, not chatter:** a night reminder (alarm + preparation checklist) and a morning message only if the lantern has not been lit yet. If it is already lit, the system stays quiet.
- **Partner accountability:** a two-person package lets partners see and "wake" each other.

**Engineering notes from production**
- Cross-platform state sync (Android Chrome, Samsung Internet, iPhone Safari home-screen app, Telegram in-app browser) required replacing link-based login with a one-time email code and a Telegram Mini App login, because each surface keeps separate storage.
- The full 30-lantern journey was tested with time-shifted simulations (7 scenarios) before launch.

---

## 5. What I learned (including what failed)

- **Racik Jasa was technically sound but commercially weak.** The guardrails worked; the market signal did not (paid acquisition cost far exceeded revenue in the pilot). I stopped it rather than keep spending. The architecture is reused in later products.
- **Deterministic-first is cheaper and calmer.** Fewer, smaller model calls, and the numbers users see can always be traced back to a formula.
- **Most bugs were not AI bugs.** They were time, state and platform bugs — exactly the parts that must stay deterministic.

---

## 6. Next: guardrails for fraud detection in digital payments

My banking background points to a natural extension: **neuro-symbolic fraud detection for digital transactions** (e.g. QRIS and mobile-banking payments), where hard rules capture known fraud patterns and learned models flag behavior that deviates from a user's normal profile — with every decision explainable. This is the direction I intend to pursue in doctoral research, starting with public benchmark datasets.

---

## Repository contents

```
src/deterministic_guardrails.js   reference modules for Pattern A (pricing bounds) and Pattern B (habit state machine)
README.md                         this document
```

## Contact

- LinkedIn: [linkedin.com/in/chaidir-hasibuan](https://www.linkedin.com/in/chaidir-hasibuan)
- Email: kirimkechaidir@gmail.com
- Products: [serendipity.orderhero.id](https://serendipity.orderhero.id)
