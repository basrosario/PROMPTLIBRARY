# Praxis Project Handoff Document

**Last Updated:** 2026-02-06 (Session 32)
**Last Commit:** 075d75a - feat: Redesign Wave 2 (CoT Variants family) — 8 pages expanded to 13-section template
**Current Phase:** Framework Quality Redesign (Wave 3 complete, Wave 4 next)

---

## CURRENT SESSION STATUS (Session 32)

### Completed This Session

#### Wave 3: Decomposition Quality Redesign — COMPLETE (6 pages)
Redesigned all 6 Decomposition pages from ~290-325 lines to 717-855 lines using the 13-section template.

| # | File | Before | After | Status |
|---|------|--------|-------|--------|
| 1 | `learn/decomp.html` | 323 | 728 | ✅ |
| 2 | `learn/self-ask.html` | 303 | 855 | ✅ |
| 3 | `learn/step-back.html` | 298 | 832 | ✅ |
| 4 | `learn/graph-of-thought.html` | 325 | 717 | ✅ |
| 5 | `learn/program-of-thought.html` | 325 | 826 | ✅ |
| 6 | `learn/recursion-of-thought.html` | 290 | 833 | ✅ |

**Quality verified:**
- Zero inline styles (`style=""`) across all 6 files
- Zero inline scripts (`onclick=""`, `onload=""`, etc.)
- All 13 sections present in each page
- 6 use-case-showcase items per page
- 3 accordion examples per page
- Evolution timeline + 3 evolution-callout related frameworks per page
- CTA with neural bg canvas per page
- Back-to-top + accessibility dashboard per page
- Historical context notices on all pages
- No citations, no stat cards, no content badges

**Files Modified:**
- `learn/decomp.html` — 323→728 lines
- `learn/self-ask.html` — 303→855 lines
- `learn/step-back.html` — 298→832 lines
- `learn/graph-of-thought.html` — 325→717 lines
- `learn/program-of-thought.html` — 325→826 lines
- `learn/recursion-of-thought.html` — 290→833 lines
- `.claude/HANDOFF.md` — this file

---

## NEXT UP: Wave 4 — Advanced Reasoning (7 pages)

Each page must be redesigned from ~290 lines to 700-1000+ lines using the 13-section template.

**Reference template:** `learn/critic.html` (898 lines, 13 sections)

| # | File | Current Lines | Target |
|---|------|--------------|--------|
| 1 | `learn/analogical-reasoning.html` | ~290 | 700-1000+ |
| 2 | `learn/meta-reasoning.html` | ~290 | 700-1000+ |
| 3 | `learn/thread-of-thought.html` | ~290 | 700-1000+ |
| 4 | `learn/memory-of-thought.html` | ~290 | 700-1000+ |
| 5 | `learn/simtom.html` | ~290 | 700-1000+ |
| 6 | `learn/max-mutual-info.html` | ~290 | 700-1000+ |
| 7 | `learn/universal-self-consistency.html` | ~290 | 700-1000+ |

### Remaining Waves

| Wave | Pages | Status |
|------|-------|--------|
| Wave 1 — Self-Correction | 6 pages | ✅ COMPLETE |
| Wave 2 — CoT Variants | 8 pages | ✅ COMPLETE |
| Wave 3 — Decomposition | 6 pages | ✅ COMPLETE |
| Wave 4 — Advanced Reasoning | 7 pages | ⬜ START HERE |
| Wave 5 — Example Methods | 7 pages (active-prompting, knn-prompting, vote-k, demo-ensembling, diverse-prompting, dense-prompting, prompt-mining) | ⬜ PENDING |
| Wave 6 — Style & Emotion | 6 pages (emotion-prompting, style-prompting, s2a, re2, cosp, rar) | ⬜ PENDING |

---

## CRITICAL RULES - MUST FOLLOW

### 1. Security & CSP Compliance (A+ Rating)
- **NO inline styles** — Never use `style=""` attributes
- **NO inline scripts** — Never use `onclick=""`, `onload=""`, or inline `<script>`
- **NO external resources** — No CDNs, Google Fonts, external APIs
- **All styles → styles.css** (single file)
- **All scripts → app.js** (single file with `defer`)

### 2. Content Rules
- **NO citations on framework pages** (per user request, Session 25)
- **NO stat cards** — Use highlight-box components instead
- **NO content badges** — Removed from all learn pages (Session 29)
- **Historical context notices required** on all framework pages

### 3. Code Notation
```
HTML:  <!-- === SECTION === --> ... <!-- /SECTION -->
CSS:   /* === SECTION === */ ... /* Component ---- */
JS:    // === SECTION === ... /** JSDoc comments */
```

### 4. Information Accuracy
- All historical/factual claims must be verified from .edu or .gov sources
- No fake, made up, or misleading information
- Framework dates and relevancy status must be academically verified

---

## FILE STRUCTURE

```
_public_html/
├── index.html              # Home page (updated hero)
├── styles.css              # ALL CSS (single file)
├── app.js                  # ALL JavaScript (single file)
├── foundations/
│   └── index.html          # AI Foundations timeline (5 eras + framework directories)
├── learn/                  # Framework pages (40+)
│   ├── [all framework pages]
│   └── modality/code/      # Code frameworks (3 pages)
├── data/
│   ├── glossary.json       # 2,141 AI terms (lazy loaded)
│   └── search-index.json   # 2,218 searchable entries
├── pages/
│   └── glossary.html       # Glossary page (686 lines, shells only)
└── .claude/
    ├── HANDOFF.md           # THIS FILE
    ├── COMPLETED.md         # Archive of completed work
    └── plans/
        └── FrameworkOverhaul.md   # Master plan + 40-page redesign waves
```

---

## INTERACTIVE COMPONENTS AVAILABLE

| Component | CSS Class | Use For |
|-----------|-----------|---------|
| Accordions | `.accordion-item`, `.accordion-header`, `.accordion-content` | Expandable sections |
| Comparison panels | `.comparison-panel` | Before/after, side-by-side |
| Element timelines | `.element-timeline` | Step-by-step processes |
| Feature lists | `.feature-list` | Perfect For / Skip It When |
| Pillar cards | `.pillar-card`, `.pillar-card--featured` | Card grids |
| Evolution timeline | `.evolution-timeline`, `.era-marker` | Framework positioning |
| Evolution callout | `.evolution-callout` | Related framework links |
| Use case showcase | `.use-case-showcase` | Application scenarios |
| Technique demo | `.technique-demo` | Interactive demonstrations |
| Scenario timeline | `.scenario-timeline` | Multi-step examples |
| Conversation timeline | `.conversation-timeline` | Dialogue examples |
| Highlight boxes | `.highlight-box`, `.highlight-box--warning` | Callouts, notices |
| Split sections | `.split-section` | Two-column layouts |
| History events | `.history-event`, `.history-event--landmark` | Timeline events |
| Era headers | `.era-header` | Timeline era sections |
| Era frameworks | `.era-frameworks`, `.era-frameworks__grid` | Framework directory grids |
| Framework status | `.framework-status--active`, `--adopted`, `--historical` | Relevancy badges |
| CTA corporate | `.cta-corporate` | Call to action with neural bg |

---

## REFERENCE

| Document | Purpose |
|----------|---------|
| `.claude/HANDOFF.md` | Current state (this file) |
| `.claude/COMPLETED.md` | Archived completed work |
| `.claude/plans/FrameworkOverhaul.md` | Master plan with session logs + 40-page redesign waves |
| `learn/critic.html` | Reference template for quality redesign (898 lines, 13 sections) |

---

*Always read this file first when resuming work. Follow the critical rules exactly.*
