# Praxis Project Handoff Document

**Last Updated:** 2026-02-07 (Session 41)
**Last Commit:** `c49e78b` — docs: Add SiteFrameworks.md
**Current Phase:** Discover Hub + Category Landing Pages — ready to begin Phase 1

---

## SESSION 41 SUMMARY

Session 41 was a **learning and documentation session**. No code changes were made. The entire codebase was studied in depth — glossary lazy loading system, search-to-glossary flow, URL resolution, component library, design tokens, navigation architecture, neural network canvas system, and accessibility dashboard.

**Created:** `.claude/SiteFrameworks.md` (1,041 lines) — comprehensive project architecture reference documenting the WHY behind every major decision. This is the "soul of the project" document.

**No implementation work was done.** The Discover Hub phases are still pending.

---

## NEXT TASK: Discover Hub + Category Landing Pages

**Plan file:** `.claude/plans/discover-hub-category-pages.md`
**Status:** All decisions confirmed, ready for implementation — NO phases started yet

### Confirmed Decisions (Session 39/40)

| Decision | Choice |
|----------|--------|
| "Advanced Techniques" rename | **"Prompting Strategies"** |
| Nav link "Learn" rename | **"Discover"** (site-wide, all ~105 files) |
| Discover hub card density | **All 62+ cards visible**, grouped by category with anchor filters |
| Category page file structure | **Flat** — `learn/reasoning-cot.html` (not `learn/category/`) |

### Implementation Phases (in order — NONE started)

1. **Phase 1 — Batch Renames** (all ~105 HTML files + app.js + index.html)
   - "Advanced Techniques" → "Prompting Strategies" in mega-menu `<h4>` headers
   - "Learn" → "Discover" in nav link text (the `<a>` with class="nav-link" that links to learn/index.html)
   - Update `index.html` homepage — category card labeled "Advanced" becomes "Prompting Strategies"
   - Update `app.js` — search index category references
   - Check `foundations/index.html` for any "Advanced Techniques" references
   - Use Python batch script approach (like Session 38's `update_nav.py`)
   - Verify with grep after: zero occurrences of "Advanced Techniques", zero nav link "Learn" (except in page content)

2. **Phase 2 — Discover Hub** (learn/index.html redesign)
   - Replace current 11-card "Learn" page with full Discover hub
   - All 62+ frameworks shown grouped by 8 categories (excl. Getting Started)
   - Anchor-link filter row at top (sticky below header)
   - Category descriptions + count badges
   - "View Category Page" links

3. **Phase 3 — 7 Category Landing Pages** (new files)
   - `learn/structured-frameworks.html` (5 frameworks)
   - `learn/reasoning-cot.html` (14 frameworks)
   - `learn/decomposition.html` (7 frameworks)
   - `learn/self-correction.html` (7 frameworks)
   - `learn/in-context-learning.html` (9 frameworks)
   - `learn/ensemble-methods.html` (7 frameworks)
   - `learn/prompting-strategies.html` (11 frameworks)

4. **Phase 4 — Homepage + Mega-menu Link Updates**
   - Homepage 6 category cards link to category landing pages
   - Mega-menu category headers become clickable links

5. **Phase 5 — Search Index + Metadata**
   - Add 7 category pages to search-index.json
   - Update category names in app.js

---

## KEY REFERENCE DOCUMENTS

| Document | Purpose | Lines |
|----------|---------|-------|
| `.claude/SiteFrameworks.md` | **Architecture bible** — WHY behind every decision | 1,041 |
| `.claude/HANDOFF.md` | Current state (this file) | — |
| `.claude/COMPLETED.md` | Archived completed work | — |
| `.claude/plans/FrameworkOverhaul.md` | Master plan — Phases 1-5 + session log | 1,707 |
| `.claude/plans/discover-hub-category-pages.md` | **ACTIVE** — Discover Hub + Category Pages plan | 291 |
| `learn/self-ask.html` | Canonical 13-section template | 895 |

**SiteFrameworks.md** covers: lazy loading rationale, search-to-glossary flow (step-by-step), URL resolution (`resolveInternalUrl()`), anchor offset pattern, design token system, component library, 13-section template, navigation architecture, neural network canvas, accessibility dashboard, performance patterns, and all critical rules.

---

## ARCHITECTURAL NOTES

### resolveInternalUrl() — Universal Path Resolver (app.js ~471)
```javascript
function resolveInternalUrl(targetPath) {
    // Skip absolute, anchor-only, or already-resolved paths
    if (!targetPath || targetPath.startsWith('http') || targetPath.startsWith('/') ||
        targetPath.startsWith('#') || targetPath.startsWith('mailto:')) {
        return targetPath;
    }
    const pathname = window.location.pathname;
    const segments = pathname.replace(/^\//, '').split('/');
    const depth = Math.max(0, segments.length - 1); // -1 for filename
    if (depth === 0) return targetPath;
    return '../'.repeat(depth) + targetPath;
}
```
**Usage:** `resolveInternalUrl('pages/glossary.html#term-foo')` — always pass root-relative paths (no `../` prefix). The function calculates the correct prefix based on current page depth.

### Search Modal Architecture (app.js ~8394-8834)
- `createSearchModal()` — generates HTML, injected into DOM
- `searchModal.init()` — attaches all event listeners
- `searchModal.open()` / `.close()` — toggle visibility + body overflow
- `searchModal.navigateToResult(href)` — handles same-page hash vs. full navigation
- `searchPraxis(query)` — searches index, returns grouped results (Glossary first, 10 results; others 5)
- `renderSearchResults(grouped, query)` — renders result HTML with highlight marks

### Glossary Lazy Loading (app.js ~7495-7585)
- `loadGlossaryFromJSON()` — fetches `data/glossary.json`, builds 2,141 terms via DOM API
- Detects glossary page by `.glossary-filter-bar` presence
- Post-load hash scroll handles `#term-xxx` anchors from search results
- CSS `content-visibility: auto` on `.glossary-section` for lazy paint
- CSS `scroll-margin-top: 160px` on `[id^="term-"]` for sticky header + nav offset

### Python Batch Script Pattern (Session 38)
Session 38 used `update_nav.py` to batch-update all 100 HTML files (header, footer, head cleanup). Same approach recommended for Phase 1 renames. Script reads each file, applies replacements, writes back.

---

## CRITICAL RULES - MUST FOLLOW

### 1. Security & CSP Compliance (A+ Rating)
- **NO inline styles** — Never use `style=""` attributes
- **NO inline scripts** — Never use `onclick=""`, `onload=""`, or inline `<script>`
- **NO external resources** — No CDNs, Google Fonts, external APIs
- **All styles → styles.css** (single file, 27,562 lines)
- **All scripts → app.js** (single file with `defer`, 10,899 lines)

### 2. Content Rules
- **NO citations on framework pages** (per user request, Session 25)
- **NO stat cards** — Use highlight-box components instead
- **NO content badges** — Removed from all learn pages (Session 29)
- **NO HR or remote work examples** — Removed site-wide (Session 37)
- **NO emoji** in code or content (user preference)
- **Historical context notices required** on all framework pages

### 3. Code Notation
```
HTML:  <!-- === SECTION === --> ... <!-- /SECTION -->
CSS:   /* === SECTION === */ ... /* Component ---- */
JS:    // === SECTION === ... /** JSDoc comments */
```

### 4. URL Construction
- **ALWAYS use `resolveInternalUrl()`** for any dynamically generated internal links
- Pass root-relative paths: `resolveInternalUrl('pages/glossary.html#term-foo')`
- Never hardcode `../` prefixes for dynamic links — the function handles all depths

### 5. Information Accuracy
- All historical/factual claims must be verified from .edu or .gov sources
- No fake, made up, or misleading information
- Framework dates and relevancy status must be academically verified

---

## FILE STRUCTURE

```
_public_html/
├── index.html              # Home page (6-section redesign, Session 39)
├── styles.css              # ALL CSS (27,562 lines)
├── app.js                  # ALL JavaScript (10,899 lines)
├── foundations/
│   └── index.html          # AI Foundations timeline (5 eras + framework directories)
├── learn/                  # Framework pages (62+)
│   ├── index.html          # Learn hub (NEXT: redesign as Discover hub)
│   ├── [62 framework pages] # All redesigned to 13-section template
│   └── modality/code/      # Code frameworks (3 pages)
├── data/
│   ├── glossary.json       # 2,141 AI terms (lazy loaded, ~818 KB)
│   └── search-index.json   # 2,218 searchable entries (~350 KB)
├── pages/                  # 12 content pages
├── tools/                  # 12 AI readiness tools
├── neurodivergence/        # 6 ND pages
├── patterns/               # 1 page
├── quiz/                   # 1 page
└── .claude/
    ├── HANDOFF.md           # THIS FILE
    ├── COMPLETED.md         # Archive of completed work
    ├── SiteFrameworks.md    # Architecture bible (1,041 lines)
    └── plans/
        ├── FrameworkOverhaul.md          # Master plan (Phases 1-5)
        └── discover-hub-category-pages.md # Discover Hub plan (ACTIVE)
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
| Icon boxes | `.icon-box` | Clickable category/tool cards |
| Counter grid | `.counter-grid` | Animated stat counters |

---

## 9 FRAMEWORK CATEGORIES (65 frameworks)

| Category | Count | Rename Pending? |
|----------|-------|-----------------|
| Getting Started | 2 | No |
| Structured Frameworks | 5 | No |
| Reasoning & CoT | 14 | No |
| Decomposition | 7 | No |
| Self-Correction | 7 | No |
| In-Context Learning | 9 | No |
| Ensemble Methods | 7 | No |
| Advanced Techniques → **Prompting Strategies** | 11 | **YES — Phase 1** |
| Code | 3 | No |

Full framework inventory by category: see `.claude/plans/discover-hub-category-pages.md`

---

*Always read this file first when resuming work. Follow the critical rules exactly. Read SiteFrameworks.md for deep architectural understanding.*
