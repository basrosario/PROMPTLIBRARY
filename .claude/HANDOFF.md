# Praxis Project Handoff Document

**Last Updated:** 2026-02-07 (Session 40)
**Last Commit:** `3cf8860` — Homepage redesign + search modal fix pushed
**Current Phase:** Discover Hub + Category Landing Pages — ready to begin Phase 1

---

## NEXT TASK: Discover Hub + Category Landing Pages

**Plan file:** `.claude/plans/discover-hub-category-pages.md`
**Status:** All decisions confirmed, ready for implementation

### Confirmed Decisions (Session 39/40)

| Decision | Choice |
|----------|--------|
| "Advanced Techniques" rename | **"Prompting Strategies"** |
| Nav link "Learn" rename | **"Discover"** (site-wide, all 100 files) |
| Discover hub card density | **All 62+ cards visible**, grouped by category with anchor filters |
| Category page file structure | **Flat** — `learn/reasoning-cot.html` (not `learn/category/`) |

### Implementation Phases (in order)

1. **Phase 1 — Batch Renames** (all 100 HTML files + app.js)
   - "Advanced Techniques" → "Prompting Strategies" in mega-menu headers
   - "Learn" → "Discover" in nav link text
   - Use Python batch script (like Session 38's `update_nav.py`)
   - Also update `index.html` homepage card label, `app.js` search categories, `foundations/index.html`

2. **Phase 2 — Discover Hub** (learn/index.html redesign)
   - Replace current 11-card "Learn" page with full Discover hub
   - All 62+ frameworks shown grouped by 8 categories (excl. Getting Started)
   - Anchor-link filter row at top
   - Category descriptions + count badges
   - "View Category Page" links

3. **Phase 3 — 7 Category Landing Pages** (new files)
   - `learn/structured-frameworks.html` (5)
   - `learn/reasoning-cot.html` (14)
   - `learn/decomposition.html` (7)
   - `learn/self-correction.html` (7)
   - `learn/in-context-learning.html` (9)
   - `learn/ensemble-methods.html` (7)
   - `learn/prompting-strategies.html` (11)

4. **Phase 4 — Homepage + Mega-menu Link Updates**
   - Homepage 6 category cards link to category landing pages
   - Mega-menu category headers become clickable links

5. **Phase 5 — Search Index + Metadata**
   - Add 7 category pages to search-index.json
   - Update category names in app.js

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

### Search Modal Architecture (app.js ~8394-8810)
- `createSearchModal()` — generates HTML, injected into DOM
- `searchModal.init()` — attaches all event listeners
- `searchModal.open()` / `.close()` — toggle visibility + body overflow
- `searchModal.navigateToResult(href)` — handles same-page hash vs. full navigation
- `searchPraxis(query)` — searches index, returns grouped results (Glossary first)
- `renderSearchResults(grouped, query)` — renders result HTML with highlight marks

### Python Batch Script Pattern (Session 38)
Session 38 used `update_nav.py` to batch-update all 100 HTML files (header, footer, head cleanup). Same approach recommended for Phase 1 renames. Script reads each file, applies replacements, writes back.

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
- **NO HR or remote work examples** — Removed site-wide (Session 37)
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
├── styles.css              # ALL CSS (single file)
├── app.js                  # ALL JavaScript (single file)
├── foundations/
│   └── index.html          # AI Foundations timeline (5 eras + framework directories)
├── learn/                  # Framework pages (62+)
│   ├── index.html          # Learn hub (NEXT: redesign as Discover hub)
│   ├── [62 framework pages] # All redesigned to 13-section template
│   └── modality/code/      # Code frameworks (3 pages)
├── data/
│   ├── glossary.json       # 2,141 AI terms (lazy loaded)
│   └── search-index.json   # 2,218 searchable entries
├── pages/                  # 12 content pages
├── tools/                  # 12 AI readiness tools
├── neurodivergence/        # 6 ND pages
├── patterns/               # 1 page
├── quiz/                   # 1 page
└── .claude/
    ├── HANDOFF.md           # THIS FILE
    ├── COMPLETED.md         # Archive of completed work
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

## REFERENCE

| Document | Purpose |
|----------|---------|
| `.claude/HANDOFF.md` | Current state (this file) |
| `.claude/COMPLETED.md` | Archived completed work |
| `.claude/plans/FrameworkOverhaul.md` | Master plan — Phases 1-5 + session log |
| `.claude/plans/discover-hub-category-pages.md` | **ACTIVE** — Discover Hub + Category Pages plan |
| `learn/self-ask.html` | Canonical 13-section template (855 lines) |

---

*Always read this file first when resuming work. Follow the critical rules exactly.*
