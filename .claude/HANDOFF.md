# Praxis Project Handoff Document

**Last Updated:** 2026-02-07 (Session 42)
**Last Commit:** `a8f8df0` — feat: Link homepage category cards + mega-menu headers to category pages
**Current Phase:** Discover Hub — Phases 1-4 COMPLETE, Phase 5 remaining

---

## SESSION 42 SUMMARY

Session 42 implemented Phases 1-4 of the Discover Hub plan. Six commits:

1. **Phase 1** (`32d7351`) — Batch renamed "Advanced Techniques" → "Prompting Strategies" in mega-menu headers (101 files), renamed "Learn" → "Discover" in nav links (102 files), breadcrumbs (68 files), and footer headings (101 files). Updated homepage card + app.js search index.
2. **Phase 2** (`4d296ba`) — Redesigned learn/index.html from 11-card "Learn" page to full Discover hub (1,093 lines) with 63 framework cards across 8 categories, sticky filter row, comparison table, and CTA. Added ~120 lines of CSS for discover components.
3. **Phase 3** (`0eb604e`) — Created 7 category landing pages: structured-frameworks, reasoning-cot, decomposition, self-correction, in-context-learning, ensemble-methods, prompting-strategies. Each has hero, overview, framework grid, comparison table, related categories, and CTA. Added `.category-overview` CSS.
4. **Bugfix** (`a697128`) — Fixed broken relative paths in 3 code modality pages (learn/modality/code/) that had 2-level prefixes instead of 3-level.
5. **Phase 4** (`a8f8df0`) — Updated 6 homepage category card links to point to category landing pages. Made all 7 mega-menu `<h4>` category headers clickable links across 108 pages with correct relative paths per directory depth. Added `.mega-menu-section h4 a` CSS to preserve header styling.

---

## NEXT TASK: Discover Hub Phase 5

**Plan file:** `.claude/plans/discover-hub-category-pages.md`

### Phase 5 — Search Index + Metadata
- Add 7 category landing pages to `data/search-index.json`
- Add 7 category landing pages to app.js search index
- Verify all cross-references use correct category labels
- Update learn/index.html title in search results from "Learn" to "Discover"

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
├── learn/                  # Framework pages (62+) + category pages (7)
│   ├── index.html          # Discover hub (63 framework cards, 8 categories)
│   ├── [7 category pages]  # structured-frameworks, reasoning-cot, etc.
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

| Category | Count | Category Page | Status |
|----------|-------|---------------|--------|
| Getting Started | 2 | — | No category page needed |
| Structured Frameworks | 5 | `learn/structured-frameworks.html` | DONE |
| Reasoning & CoT | 14 | `learn/reasoning-cot.html` | DONE |
| Decomposition | 7 | `learn/decomposition.html` | DONE |
| Self-Correction | 7 | `learn/self-correction.html` | DONE |
| In-Context Learning | 9 | `learn/in-context-learning.html` | DONE |
| Ensemble Methods | 7 | `learn/ensemble-methods.html` | DONE |
| Prompting Strategies | 11 | `learn/prompting-strategies.html` | DONE |
| Code | 3 | — | Uses `learn/modality/code/` hub |

Full framework inventory by category: see `.claude/plans/discover-hub-category-pages.md`

---

*Always read this file first when resuming work. Follow the critical rules exactly. Read SiteFrameworks.md for deep architectural understanding.*
