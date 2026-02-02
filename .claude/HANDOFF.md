# Praxis Project Handoff Document

**Last Updated:** 2026-02-01 (Session 16)
**Last Commit:** (pending) - feat: Expand AI Glossary to 360+ meaningful terms
**Current Phase:** Resource Pages Enhancement - IN PROGRESS

---

## CRITICAL RULES - MUST FOLLOW

### 1. Security & CSP Compliance (A+ Rating Maintained)

**NEVER violate these CSP rules:**

```
Content-Security-Policy:
  default-src 'none';
  connect-src 'self';
  form-action 'none';
  base-uri 'none';
  font-src 'self';
  img-src 'self' data:;
  style-src 'self';
  script-src 'self';
```

| Rule | What It Means |
|------|---------------|
| **NO inline styles** | Never use `style=""` attributes in HTML |
| **NO inline scripts** | Never use `onclick=""`, `onload=""`, or `<script>` with code |
| **NO external resources** | No CDNs, no Google Fonts, no external APIs |
| **NO eval or similar** | No dynamic code execution |
| **All styles in styles.css** | Every style must be in the external stylesheet |
| **All scripts in app.js** | Every script must be in the external JavaScript file |

### 2. Performance Standards (100% Lighthouse Score)

- **No render-blocking resources** - Use `defer` for scripts
- **Minimal DOM depth** - Keep HTML structure clean
- **Efficient selectors** - Avoid overly complex CSS selectors
- **No unused code** - Remove anything not actively used

### 3. Code Quality Standards

| Standard | Description |
|----------|-------------|
| **Clean, readable code** | Self-documenting, logical organization |
| **DRY principle** | Don't Repeat Yourself - reuse components |
| **Consistent naming** | BEM-style CSS (`.block__element--modifier`) |
| **No magic numbers** | Use CSS variables for values |

### 4. Accessibility Standards (WCAG AA)

- All images must have meaningful `alt` text
- Color contrast must meet WCAG AA (4.5:1 for text)
- All interactive elements keyboard accessible
- Proper heading hierarchy (h1 → h2 → h3)

### 5. Code Notation Standards

```
HTML:  <!-- === SECTION === --> ... <!-- /SECTION -->
CSS:   /* === SECTION === */ ... /* Component ---- */
JS:    // === SECTION === ... /** JSDoc comments */
```

---

## FILE STRUCTURE

```
_public_html/
├── index.html              # Home page
├── styles.css              # ALL styles (single file)
├── app.js                  # ALL JavaScript (single file)
├── learn/                  # Learning content
├── tools/                  # Interactive tools
├── patterns/               # Patterns Library
├── quiz/                   # Readiness Quiz
├── pages/                  # Static pages (about, faq, glossary, etc.)
└── .claude/
    ├── HANDOFF.md          # THIS FILE - Current state
    ├── COMPLETED.md        # Archived completed tasks
    └── plans/              # Planning documents
```

---

## CURRENT STATUS

### Completed Phases
- **Phase 0:** Prompt Analyzer Fix
- **Phase 1:** Badge Relocation & Text Updates
- **Phase 2:** Natural Language Content
- **Phase 3:** Accordion Content Structure
- **Phase 4:** Search Tags & Metadata (250+ entries)
- **Phase 5:** Search UI Implementation

*See `.claude/COMPLETED.md` for full details on completed work.*

### Current Work: Resource Pages Enhancement

**Plan File:** `.claude/plans/vivid-launching-goose.md`

**Completed:**
- [x] Deleted pages/replit-guide.html and pages/ide-guide.html
- [x] Removed navigation links from all 29 HTML files
- [x] Updated search index in app.js
- [x] Created CSS visualization components (stat cards, bar charts, gauges, comparison tables, timelines, citations, process flows, before/after, feature matrix, TOC grid)
- [x] Rewrote ChatGPT Guide (EXTENSIVE - 1720 lines with 9 major sections, accordions, stat cards, comparison tables, citations from Stanford HAI, MIT CSAIL, NIST, ACM)
- [x] Enhanced Security page (862 lines with stat cards, bar charts, OWASP table, before/after, citations from NIST, OWASP, Mozilla MDN)
- [x] Expanded AI Glossary from 207 to 360+ meaningful terms with relevant internal links
- [x] Enhanced Performance page (889 lines with stat cards, Core Web Vitals bar charts, HTTP Archive comparisons, 10 verified sources from Google web.dev, HTTP Archive, W3C, ITU)
- [x] Enhanced AI for Everybody (788 lines with stat cards, demographic bar charts, global education data, 7 verified sources from Pew Research, UNESCO, U.S. Dept of Ed, ITU, CAST, National Academies)
- [x] Enhanced Universal Design (845 lines with stat cards, WCAG 2.1 compliance matrix, bar charts, 6 verified sources from W3C, CAST.org, NC State, WHO, U.S. Access Board, WebAIM)
- [x] Enhanced AI Assisted Building (761 lines with stat cards, updated project metrics, section markers, 4 verified sources from Stanford HAI, MIT CSAIL, ACM, Anthropic)
- [x] Updated Resources hub page (updated glossary count to 550+, enhanced descriptions for all pages)

**Resource Pages Enhancement Phase - COMPLETE**

**Pending:**
- [ ] Mobile Swipe Navigation (iPhone 14 Pro Max standard)
  - Touch swipe left/right to navigate between pages
  - Flow: Home → Learn pages → About → Quiz → Tools → Home
  - Implement in app.js with touch event handlers
  - Add visual indicators for swipe affordance

**Source Requirements (STRICT - 2025-2026 ONLY):**
- .EDU domains (universities: Stanford, MIT, CMU, etc.)
- .GOV domains (NIST, access-board.gov, tech.ed.gov, nsf.gov, etc.)
- Publication date: 2025-2026 only
- NO independent blogs, social media, memes
- NO news channels (local or national)
- NO biased opinion pieces
- Citation at point of delivery for ALL facts

### Pending Tasks (Deferred)

| Task | Description | Priority |
|------|-------------|----------|
| 1.9 | Badge lightbox popups (smoked glass effect) | Low |
| 1.10 | Animation term glossary links | Low |
| Phase 6 | Developer Tooling (validators, link checker) | Future |
| Phase 7 | Full Site Audit | Future |

---

## MAJOR INITIATIVE: Neurodivergence + AI Resource Center

### Vision
**Goal:** Single source of truth for neurodivergence and AI education
**Status:** Planning phase - research-first approach

### Source Requirements (STRICT)
- .EDU, .GOV, accredited institutions ONLY
- Publication date: 2024-2026
- Citation at point of delivery for ALL facts
- NO social media, freelance, or independent sites

### Content Pillars
1. Understanding Neurodivergence
2. AI as an Assistive Tool
3. Community & Leadership Education
4. Practical Implementation

### Proposed Structure
```
neurodivergence/
├── index.html          # Hub page
├── understanding.html  # Pillar 1
├── ai-tools.html       # Pillar 2
├── leadership.html     # Pillar 3
├── implementation.html # Pillar 4
└── resources.html      # Curated external resources
```

---

## KEY IMPLEMENTATION DETAILS

### Search API
```javascript
window.PraxisSearch.search('query')      // Returns grouped results
window.PraxisSearch.getByCategory('X')   // Filter by category
window.PraxisSearch.totalEntries         // 250+ entries
```

### CSS Variables (Key)
- Colors: `--primary`, `--secondary`, `--accent`
- Spacing: `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`
- Typography: `--radius`, `--border`, `--text`, `--text-muted`

### Badge Lightbox (app.js)
```javascript
BADGE_INFO = { ai, udl, security, performance, claude, github }
// Each badge has: title, icon, subtitle, description, highlights[], link, linkText
```

---

## TESTING CHECKLIST

Before committing any changes:
- [ ] No CSP violations in browser console
- [ ] No JavaScript errors
- [ ] Mobile responsive (375px, 768px, 1024px)
- [ ] Keyboard navigation works
- [ ] Security scan passes (A+ rating)
- [ ] Lighthouse Performance 100%

---

## REFERENCE DOCUMENTS

| Document | Purpose |
|----------|---------|
| `.claude/HANDOFF.md` | Current state (this file) |
| `.claude/COMPLETED.md` | Archived completed tasks |
| `.claude/plans/praxis-enhancement-plan.md` | Master plan |
| `.claude/scorer-algorithm.md` | Prompt Analyzer documentation |

---

## CONTACT

- **Founder:** Basiliso Rosario
- **LinkedIn:** linkedin.com/in/basiliso-rosario/
- **Email:** bas.rosario@gmail.com

---

*This document ensures seamless continuity between sessions. Always read this file first when resuming work.*
