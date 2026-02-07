# Praxis Project Handoff Document

**Last Updated:** 2026-02-07 (Session 44)
**Last Commit:** `615d25a` — fix: Keep mega-menu categories in single row, tighten spacing
**Current Phase:** Framework Overhaul Phase 2 — 5 remaining text framework pages

---

## SESSION 44 SUMMARY

Session 44 made several UI refinements and content updates:

1. **AI Foundations Title** (`9847fc9`) — Changed h1 from "The History of AI Communication" to "The History of Modern AI" in `foundations/index.html`
2. **Homepage Hero Button** (`9847fc9`) — Changed "AI for Everybody" button to "Framework Library" linking to `learn/index.html` (homepage only)
3. **Desktop Mega-Menu Overhaul** (`26701b1`, `615d25a`, uncommitted CSS) — Multiple iterations:
   - Removed 2-column grid within each category section (single-column links per category)
   - Categories remain in a single horizontal row across the top
   - Discover menu: viewport-centered using `left: 0; right: 0; margin: auto` on `.header-container` (which is centered with `max-width: 1400px; margin: 0 auto`)
   - Resources menu: centered under its nav link using `:last-child` override with `left: 50%; translateX(-50%)`
   - All desktop menus appear at the same vertical height

**Uncommitted:** `styles.css` has the final mega-menu centering fix (Discover = viewport-centered, Resources = nav-link-centered). Needs commit + push.

---

## NEXT TASKS — Framework Overhaul Remaining Work

### Priority 1: Finish Phase 2 Text Frameworks (5 remaining pages)

All 5 are In-Context Learning or Thought Generation pages. Each needs the full 13-section template (reference: `learn/self-ask.html`).

| Page | Category | Priority |
|------|----------|----------|
| `learn/many-shot.html` | In-Context Learning | MEDIUM |
| `learn/example-ordering.html` | In-Context Learning | MEDIUM |
| `learn/self-generated-icl.html` | In-Context Learning | MEDIUM |
| `learn/active-example.html` | In-Context Learning | LOW |
| `learn/uncertainty-cot.html` | Thought Generation | LOW |

After creating these pages:
- Add them to the mega-menu navigation across all ~108 HTML files (Python batch script)
- Add them to `data/search-index.json`
- Update category page framework counts (In-Context Learning: 9 -> 13, Reasoning & CoT: 14 -> 15)
- Update Discover hub `learn/index.html` card counts

### Priority 2: Phase 3 — Modality Frameworks (37 pages, 0% done)

Large expansion into non-text modalities. See FrameworkOverhaul.md Phase 3:
- 3A: Image Prompting (12 pages)
- 3B: Audio/Speech (6 pages)
- 3C: Video (6 pages)
- 3D: Code/Structured (5 more — 3 already exist)
- 3E: 3D/Spatial (5 pages)

### Priority 3: Phase 4 Site Integration

- 4D: Framework Matcher updates (include new frameworks in recommendations)

---

## MEGA-MENU CSS ARCHITECTURE (Session 44)

Key CSS rules for the desktop mega-menu positioning:

```css
/* Container is centered on screen */
.header-container {
    max-width: 1400px;
    margin: 0 auto;
    position: relative;  /* positioning context for menus */
}

/* Wide menus (Discover) skip nav-item positioning */
.nav-item.has-dropdown:has(.mega-menu--multi-column) {
    position: static;
}

/* Discover menu: centered within header-container (= viewport center) */
.mega-menu--multi-column {
    left: 0; right: 0;
    margin-left: auto; margin-right: auto;
    width: max-content;
    max-width: calc(100vw - 2rem);
}

/* Resources menu: centered under its nav link */
.nav-item.has-dropdown:last-child:has(.mega-menu--multi-column) {
    position: relative;
}
.nav-item.has-dropdown:last-child .mega-menu--multi-column {
    left: 50%; right: auto;
    margin-left: 0; margin-right: 0;
    transform: translateX(-50%) translateY(10px);
}
```

---

## KEY REFERENCE DOCUMENTS

| Document | Purpose | Lines |
|----------|---------|-------|
| `.claude/SiteFrameworks.md` | **Architecture bible** — WHY behind every decision | 1,041 |
| `.claude/HANDOFF.md` | Current state (this file) | -- |
| `.claude/COMPLETED.md` | Archived completed work | -- |
| `.claude/plans/FrameworkOverhaul.md` | Master plan -- Phases 1-5 + session log | 1,741 |
| `.claude/plans/discover-hub-category-pages.md` | Discover Hub plan (COMPLETE) | 291 |
| `learn/self-ask.html` | Canonical 13-section template | 895 |

**SiteFrameworks.md** covers: lazy loading rationale, search-to-glossary flow (step-by-step), URL resolution (`resolveInternalUrl()`), anchor offset pattern, design token system, component library, 13-section template, navigation architecture, neural network canvas, accessibility dashboard, performance patterns, and all critical rules.

---

## ARCHITECTURAL NOTES

### resolveInternalUrl() -- Universal Path Resolver (app.js ~471)
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
**Usage:** `resolveInternalUrl('pages/glossary.html#term-foo')` -- always pass root-relative paths (no `../` prefix). The function calculates the correct prefix based on current page depth.

### Search Modal Architecture (app.js ~8394-8834)
- `createSearchModal()` -- generates HTML, injected into DOM
- `searchModal.init()` -- attaches all event listeners
- `searchModal.open()` / `.close()` -- toggle visibility + body overflow
- `searchModal.navigateToResult(href)` -- handles same-page hash vs. full navigation
- `searchPraxis(query)` -- searches index, returns grouped results (Glossary first, 10 results; others 5)
- `renderSearchResults(grouped, query)` -- renders result HTML with highlight marks

### Glossary Lazy Loading (app.js ~7495-7585)
- `loadGlossaryFromJSON()` -- fetches `data/glossary.json`, builds 2,141 terms via DOM API
- Detects glossary page by `.glossary-filter-bar` presence
- Post-load hash scroll handles `#term-xxx` anchors from search results
- CSS `content-visibility: auto` on `.glossary-section` for lazy paint
- CSS `scroll-margin-top: 160px` on `[id^="term-"]` for sticky header + nav offset

### Python Batch Script Pattern (Session 38)
Session 38 used `update_nav.py` to batch-update all 100 HTML files (header, footer, head cleanup). Same approach recommended for future batch renames.

---

## CRITICAL RULES - MUST FOLLOW

### 1. Security & CSP Compliance (A+ Rating)
- **NO inline styles** -- Never use `style=""` attributes
- **NO inline scripts** -- Never use `onclick=""`, `onload=""`, or inline `<script>`
- **NO external resources** -- No CDNs, Google Fonts, external APIs
- **All styles -> styles.css** (single file, ~27,600 lines)
- **All scripts -> app.js** (single file with `defer`, ~10,900 lines)

### 2. Content Rules
- **NO citations on framework pages** (per user request, Session 25)
- **NO stat cards** -- Use highlight-box components instead
- **NO content badges** -- Removed from all learn pages (Session 29)
- **NO HR or remote work examples** -- Removed site-wide (Session 37)
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
- Never hardcode `../` prefixes for dynamic links -- the function handles all depths

### 5. Information Accuracy
- All historical/factual claims must be verified from .edu or .gov sources
- No fake, made up, or misleading information
- Framework dates and relevancy status must be academically verified

---

## FILE STRUCTURE

```
_public_html/
+-- index.html              # Home page (6-section redesign, Session 39)
+-- styles.css              # ALL CSS (~27,600 lines)
+-- app.js                  # ALL JavaScript (~10,900 lines)
+-- foundations/
|   +-- index.html          # AI Foundations timeline (5 eras + framework directories)
+-- learn/                  # Framework pages (62+) + category pages (7)
|   +-- index.html          # Discover hub (63 framework cards, 8 categories)
|   +-- [7 category pages]  # structured-frameworks, reasoning-cot, etc.
|   +-- [62 framework pages] # All redesigned to 13-section template
|   +-- modality/code/      # Code frameworks (3 pages)
+-- data/
|   +-- glossary.json       # 2,141 AI terms (lazy loaded, ~818 KB)
|   +-- search-index.json   # 2,226 searchable entries (~350 KB)
+-- pages/                  # 12 content pages
+-- tools/                  # 12 AI readiness tools
+-- neurodivergence/        # 6 ND pages
+-- patterns/               # 1 page
+-- quiz/                   # 1 page
+-- .claude/
    +-- HANDOFF.md           # THIS FILE
    +-- COMPLETED.md         # Archive of completed work
    +-- SiteFrameworks.md    # Architecture bible (1,041 lines)
    +-- plans/
        +-- FrameworkOverhaul.md          # Master plan (Phases 1-5)
        +-- discover-hub-category-pages.md # Discover Hub plan (COMPLETE)
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
| Getting Started | 2 | -- | No category page needed |
| Structured Frameworks | 5 | `learn/structured-frameworks.html` | DONE |
| Reasoning & CoT | 14 | `learn/reasoning-cot.html` | DONE |
| Decomposition | 7 | `learn/decomposition.html` | DONE |
| Self-Correction | 7 | `learn/self-correction.html` | DONE |
| In-Context Learning | 9 | `learn/in-context-learning.html` | DONE |
| Ensemble Methods | 7 | `learn/ensemble-methods.html` | DONE |
| Prompting Strategies | 11 | `learn/prompting-strategies.html` | DONE |
| Code | 3 | -- | Uses `learn/modality/code/` hub |

Full framework inventory by category: see `.claude/plans/discover-hub-category-pages.md`

---

*Always read this file first when resuming work. Follow the critical rules exactly. Read SiteFrameworks.md for deep architectural understanding.*
