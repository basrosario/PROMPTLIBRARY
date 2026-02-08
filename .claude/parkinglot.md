# Praxis Project — Parking Lot

**Created:** Session 57 (2026-02-07)
**Purpose:** Deferred work items not yet scheduled for implementation.

---

## 1. Performance Optimization / Minification Branching Strategy

**Goal:** Create a production-ready minified version while preserving the current readable source.

**Plan:**
- Keep local `main` branch as-is — always human-readable, unminified CSS + JS
- Create a separate `production` branch for the minified/loading-optimized build
- Minification targets: `styles.css` (~612KB), `app.js` (~533KB)
- Branch is updated periodically from `main` with minification applied
- Consider build tooling (e.g., a simple build script) to automate the minification step

**Status:** Not started — awaiting user decision on tooling and workflow.

---

## 2. User Analytics or Feedback Mechanisms

**Goal:** Add lightweight analytics or user feedback collection to the site.

**Considerations:**
- Must comply with CSP A+ rating (no external scripts/resources)
- Options: self-hosted analytics, simple feedback forms, usage heatmaps
- Privacy-first approach — no third-party tracking
- Could integrate with existing tool infrastructure

**Status:** Not started — awaiting user requirements and privacy decisions.

---

*Items move out of this file when they are scheduled for a session and into HANDOFF.md as active work.*
