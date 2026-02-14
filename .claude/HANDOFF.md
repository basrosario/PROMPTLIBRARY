# Praxis Project Handoff Document

**Last Updated:** 2026-02-13 (Session 109)
**Last Commit:** `947f6d0` (session 108, pushed)
**Uncommitted:** YES — Session 109 audit verification overhaul + Verified Repository table
**Working Directory:** `C:\Users\basro\Music\PraxisLibrary`
**Repository:** `https://github.com/PowerOfPraxis/PraxisLibrary`
**Audit:** 11/11 PASS, 0E/177W/30I/5V

---

## SITE TOTALS

177 pages (144 techniques + 33 frameworks) across 140 text + 37 modality | 14 hub/index pages + **10 benchmark pages** | 5,324 glossary terms (27 shards) | **235 HTML files total** | 253 site search entries | 7 interactive tools | 22 builder frameworks | styles.css: **~30,900 lines** | app.js: **~15,600 lines**

---

## SESSION 109 — Audit Verification System Overhaul (IN PROGRESS)

### New Verification Model (ALL EXTERNAL LINKS REQUIRE HUMAN OVERSIGHT)
The user established a strict policy: **no external link is considered verified without human review**. This changes the audit severity model from 3-tier (E/W/I) to 4-tier (E/W/I/V):

| Status | Severity | Color | Description |
|--------|----------|-------|-------------|
| Broken/Unreachable | ERROR (red) | #DC3545 | HTTP 4xx/5xx or timeout |
| Unverified (reachable) | WARNING (yellow) | #fbbf24 | HTTP 200 but no human review |
| Unverified (bot-blocked) | WARNING (yellow) | #fbbf24 | Domain blocks bots, no screenshot proof |
| Human Verified | VERIFIED (green) | #34d399 | Screenshot proof in `assets/Citation images/` + entry in `Audit/verified-items.json` |
| Inventory/Informational | INFO (blue) | #60a5fa | Per-page citation counts, bias terms, etc. |

### What's DONE
- All CSS, JS, and Python audit changes for the 4-severity model
- Verified Repository card (green) on severity distribution grid
- Verified items separated from Info in category accordion (green section)
- `buildIssueRow()` handles `'verified'` type with green badge
- Structured `url` and `anchor` fields on verified JSON items
- "Citations Verified" stat card fixed to show `total_verified` (5) not old info_count
- Python audit: `_load_verified_urls()`, `_is_verified()` with "Human Verified" prefix check
- `build_citation_page.py` — standalone verification checklist at `Audit/citation-verify.html`

### What's DONE (Full Session 109)
- All CSS, JS, and Python audit changes for the 4-severity model (E/W/I/V)
- Verified Repository severity card (green) on severity distribution grid
- Verified items separated from Info in category accordion (green section)
- `buildIssueRow()` handles `'verified'` type with green badge
- Structured `url` and `anchor` fields on verified JSON items
- "Citations Verified" stat card fixed to show `total_verified` (5) not old info_count
- Python audit: `_load_verified_urls()`, `_is_verified()` with "Human Verified" prefix check
- `build_citation_page.py` — standalone verification checklist at `Audit/citation-verify.html`
- **Verified Repository table section** on audit report page (below Category Details)
  - HTML: new `<section>` with `#audit-verified-repo` container
  - JS: `renderVerifiedRepository()` — collects/deduplicates verified items across categories, renders 3-column table (Link, Citation, Status) with checkmark badges and footer count
  - CSS: `.audit-verified-repo*` — green-accented table with responsive grid, hover states, monospace URLs, mobile-friendly single-column fallback

### Files Modified This Session
- `styles.css` — verified card green (#34d399), `.audit-issue--verified`, info issue rows blue, `.audit-verified-repo*` table styles
- `app.js` — `renderSeverityDistribution()` (verified card), `renderIssueAccordion()` (verified section), `buildIssueRow()` (verified type), `renderVerifiedRepository()` (new table)
- `pages/audit-report.html` — 4th severity card HTML, Verified Repository section, updated descriptions
- `Audit/audit-report.json` — 4-severity audit output
- `Audit/verified-items.json` — 5 verified entries (3 Broken Links + 2 Citation Accuracy)
- `foundations/index.html` — data-added attributes on citations
- `learn/facts-fictions.html` — data-added attributes
- `patterns/index.html` — data-added attributes
- `tools/checklist.html` — data-added attributes
- `tools/hallucination.html` — data-added attributes
- `Python Scipts/PraxisLibraryAudit.py` — NOT tracked (in .gitignore)
- `Python Scipts/build_citation_page.py` — NOT tracked
- `Python Scipts/add_citation_dates.py` — NOT tracked

---

## PENDING TASKS

### 1. Continue Human Verification
User has verified 5 of 182+ external links via screenshot proof. Continue verifying links through `Audit/citation-verify.html` to reduce the 177 warnings.

### 2. Category-by-Category Audit Review (Deferred from Session 103)
User wanted to review each of the 11 categories systematically for thoroughness.

### 3. Glossary Expansion (Phase 7 — Lower Priority)
5,324 terms across 27 shards, goal 15,000+

### 4. Prompt Infographic Rollout (Phase 6 — PAUSED)
2/177 done (costar.html + crisp.html)

---

## MASTER PLAN STATUS

| Phase | Status | Details |
|-------|--------|---------|
| Phase 1: Glossary (33 terms) | COMPLETE | 2,141 initial terms (Session 23-29) |
| Phase 2: Text Frameworks (52 pages) | COMPLETE | All 52 pages + quality redesign waves |
| Phase 3: Modality Frameworks | COMPLETE | All modality hubs and technique pages |
| Phase 4: Site Integration | COMPLETE | Nav, Discover Hub, search, matcher |
| Phase 5: Navigation UX | COMPLETE | Mega-menu, restructured to 4 items |
| Phase 6: Prompt Infographic | PAUSED | 2/177 done, hand-crafted approach |
| Phase 7: Glossary 15K+ | PAUSED | 5,324/15,000 terms |
| Phase 8: AI Benchmarks | COMPLETE | 10-page system, 9 providers, 53 models |
| Phase 9: Discovery Expansion | COMPLETE | 67 pages built, integrated, audit 0E |
| **Phase 10: Audit Verification** | **IN PROGRESS** | **4-severity model, human oversight policy** |

---

## CRITICAL RULES

### 1. Security (A+ CSP)
- **NO inline styles** — Never use `style=""` attributes
- **NO inline scripts** — Never use `onclick=""`, `onload=""`, or inline `<script>`
- **NO external resources** — No CDNs, Google Fonts, external APIs
- **All styles → styles.css** (single file)
- **All scripts → app.js** (single file with `defer`)

### 2. Content
- **NO citations** on framework pages (`learn/`)
- **Historical context notices required** on all framework pages
- **ALL cited sources must be 2024-2026** — Pre-2024 = ERROR
- **ALL external citation links must have `data-added="YYYY-MM-DD"`**
- **ALL external links require human verification** — unverified = WARNING
- **Benchmark citation exception:** Public company sources allowed (not limited to .gov/.edu)

### 3. Design
- **Dark Section Standard:** `linear-gradient(to right, #2a1015 0%, #150a0d 40%, #000000 100%)` + neural canvas with mask
- **Brand colors:** red (#DC3545), black, gray, dark-red (#A71D2A)
- **Audit portal palette:** mid-tone charcoal (#1f2937 bg, #374151 borders, #f3f4f6 text)
- **Audit severity colors:** Error red, Warning amber (#fbbf24), Info blue (#60a5fa), Verified green (#34d399)
- **Hero backgrounds:** Pure black right side (`#000000`, no blue tint)

### 4. Code Notation
```
HTML:  <!-- === SECTION === --> ... <!-- /SECTION -->
CSS:   /* === SECTION === */ ... /* Component ---- */
JS:    // === SECTION === ... /** JSDoc comments */
```

### 5. Benchmark Provider Colors
Anthropic #D97757, OpenAI #10A37F, Google #4285F4, Meta #0668E1, xAI #6366F1, DeepSeek #4D6BFE, Mistral #FF7000, Alibaba #FF6A00, Cohere #39594D

### 6. Chart Types
- **Hub:** Donut, Radar, Bar, Lollipop, VerticalBar
- **Company pages:** 9 charts each (donut + bar + radar + 6 per-category)
- **Audit portal:** Custom `drawAuditChart()` — log-scale, per-category colors, gradient+glow

### 7. Navigation Architecture
- **4 nav items:** History | Discover | Readiness | Resources
- **History** — Single link (no dropdown)
- **Discover** — `mega-menu--categories` (3-column: DISCOVER | TECHNIQUES | MODALITY)
- **Readiness** — Mega-menu with 7 tools + Patterns + AI Safety
- **Resources** — `mega-menu-quick-links` (flat 8-link dropdown)

### 8. Audit Portal States (Updated Session 109)
- Categories with 0E/0W show **"Clean"** badge (green) regardless of info/verified count
- **4 severity cards:** Errors (red), Warnings (yellow), Info (blue), Verified Repository (green)
- Unverified external links = **WARNING** (yellow) — ALL links need human verification
- Human Verified items = **Verified Repository** (green) — screenshot proof required
- Info items = **inventory/informational** (blue) — per-page counts, bias terms, etc.
- `Audit/verified-items.json` — registry mapping URLs to screenshot proof files

### 9. Human Verification Workflow
1. User reviews link at `Audit/citation-verify.html` (standalone checklist)
2. Takes screenshot proving the link is valid
3. Saves screenshot to `assets/Citation images/`
4. Adds entry to `Audit/verified-items.json` with `sig`, `proof`, `verified_by`, `verified_date`
5. Re-run audit → item moves from WARNING to Verified Repository (green)

### 10. RAI Mailto
- `data-rai-mailto` attribute on `pages/responsible-ai.html`
- JS handler builds mailto with auto date/time subject + structured body

### 11. Discovery Catalog Schema
Each entry in `.claude/research/discovery-catalog.json` has:
`canonical_name`, `acronym`, `full_expansion`, `category`, `type`, `year_introduced`, `origin_source`, `origin_type`, `primary_reference_link`, `description_short`, `description_detailed`, `related_methods[]`, `alternate_names[]`, `possible_duplicates_of_existing_110[]`, `in_praxis`, `praxis_path`

---

## KEY REFERENCES

| Document | Purpose |
|----------|---------|
| `.claude/HANDOFF.md` | **THIS FILE** — Current state (read first) |
| `.claude/archive/COMPLETED.md` | All completed work (full details) |
| `.claude/reference/SiteFrameworks.md` | Architecture bible |
| `.claude/sourcingstandards.md` | **SOURCE OF TRUTH** — Citation & sourcing standards |
| `.claude/plans/FrameworkOverhaul.md` | Master plan — Phases 1-10 + session log |
| `.claude/reference/benchmark-sources.md` | VERIFIED benchmark source URLs |
| `.claude/research/discovery-catalog.json` | 184-entry discovery catalog |
| `Python Scipts/PraxisLibraryAudit.py` | 11-category site audit tool (NOT tracked) |
| `Python Scipts/build_citation_page.py` | Citation verification page generator (NOT tracked) |
| `Audit/verified-items.json` | Human verification registry (5 entries) |
| `Audit/citation-verify.html` | Standalone verification checklist (generated) |
| `learn/self-ask.html` | Canonical 13-section template |

---

*Read this file first when resuming work. Follow critical rules exactly.*
