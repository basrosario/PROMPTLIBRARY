# Framework Overhaul Master Plan

**Project:** Comprehensive expansion of Praxis Library frameworks based on The Prompt Report
**Source:** arXiv:2406.06608v6 - "The Prompt Report: A Systematic Survey of Prompting Techniques"
**Start Date:** 2026-02-04
**Last Updated:** 2026-02-05 (Session 25)

---

## Table of Contents
1. [Non-Negotiable Standards](#non-negotiable-standards)
2. [Content & Citation Rules](#content--citation-rules)
3. [Design Principles](#design-principles)
4. [Project Scope](#project-scope)
5. [Phase Breakdown](#phase-breakdown)
   - Phase 1: Glossary (33 terms)
   - Phase 2: Text Frameworks (52 pages)
   - Phase 3: Modality Frameworks (37 pages)
   - Phase 4: Site Integration
   - Phase 5: Navigation UX Overhaul
6. [Session Log](#session-log)

---

# NON-NEGOTIABLE STANDARDS

## 1. CSP Compliance (A+ Security Rating)

**Content-Security-Policy Header:**
```
default-src 'none';
connect-src 'self';
form-action 'none';
base-uri 'none';
font-src 'self';
img-src 'self' data:;
style-src 'self';
script-src 'self';
```

### Absolute Rules - NEVER VIOLATE

| Rule | Description | Example of Violation |
|------|-------------|---------------------|
| **NO inline styles** | Never use `style=""` attributes | `<div style="color:red">` |
| **NO inline scripts** | Never use event handlers in HTML | `onclick=""`, `onload=""`, `onmouseover=""` |
| **NO inline `<script>` blocks** | All JS in app.js | `<script>alert('x')</script>` |
| **NO external resources** | No CDNs, external fonts, APIs | `<link href="fonts.googleapis.com">` |
| **NO eval() or similar** | No dynamic code execution | `eval()`, `new Function()`, `setTimeout("code")` |

### Implementation Requirements

```
ALL styles → styles.css (single file)
ALL scripts → app.js (single file, with defer attribute)
ALL fonts → local files in project
ALL images → local files or data: URIs
```

### Pre-Commit Checklist
- [ ] Zero `style=""` attributes in new HTML
- [ ] Zero `onclick`, `onload`, or other event handlers in HTML
- [ ] Zero external resource URLs
- [ ] Browser console shows no CSP violations
- [ ] Security scan maintains A+ rating

---

## 2. Performance Standards (100% Lighthouse Score)

| Metric | Target | Implementation |
|--------|--------|----------------|
| Performance | 100 | No render-blocking, minimal DOM |
| Accessibility | 100 | WCAG AA compliance |
| Best Practices | 100 | Modern standards |
| SEO | 100 | Proper metadata |

### Requirements
- Scripts use `defer` attribute
- CSS is non-blocking
- Images are optimized
- No unused CSS/JS code
- Minimal DOM depth

---

## 3. Accessibility Standards (WCAG AA)

| Requirement | Standard |
|-------------|----------|
| Color contrast | 4.5:1 minimum for text |
| Keyboard navigation | All interactive elements accessible |
| Alt text | Meaningful descriptions for all images |
| Heading hierarchy | Proper h1 → h2 → h3 sequence |
| Focus indicators | Visible focus states |
| Skip links | "Skip to main content" on all pages |

---

## 4. Code Notation Standards

### HTML Notation
```html
<!-- === SECTION NAME === -->
<section>
    <!-- Content here -->
</section>
<!-- /SECTION NAME -->
```

### CSS Notation
```css
/* === SECTION NAME === */

/* Component ---- */
.component-name { }
.component-name__element { }
.component-name--modifier { }
```

### JavaScript Notation
```javascript
// === SECTION NAME ===

/**
 * JSDoc comment for functions
 * @param {string} param - Description
 * @returns {void}
 */
function functionName(param) { }
```

### BEM Naming Convention
```
.block { }           /* Component container */
.block__element { }  /* Child element */
.block--modifier { } /* Variant */
```

---

# CONTENT & CITATION RULES

## Non-Debatable Content Standards

Based on the Facts & Fictions page methodology, ALL factual claims must follow these rules:

### Source Requirements (STRICT)

| Allowed Sources | NOT Allowed |
|-----------------|-------------|
| .EDU domains (universities) | Social media posts |
| .GOV domains (government) | Independent blogs |
| Peer-reviewed journals | News channels (local/national) |
| Accredited institutions | Opinion pieces |
| Official technical standards (W3C, IEEE) | Marketing materials |
| | Freelance articles |
| | Wikipedia (use as starting point only) |

### Approved Source Examples

**Government (.gov):**
- NIST (nist.gov)
- FTC (ftc.gov)
- CISA (cisa.gov)
- NSF (nsf.gov)
- Access Board (access-board.gov)
- Census Bureau (census.gov)

**Academic (.edu):**
- Stanford HAI (hai.stanford.edu)
- MIT CSAIL (csail.mit.edu)
- CMU (cmu.edu)
- UC Berkeley
- Wharton (wharton.upenn.edu)

**Standards Bodies:**
- W3C (w3.org)
- CAST.org
- IEEE

### Citation Format

**In-page citations:**
```html
<span class="myth-fact-card__source">Source Name (Year)</span>
```

**For statistics and claims:**
```html
<p>Claim text here.</p>
<span class="citation">University Name, Department (2025)</span>
```

### Publication Date Requirements
- **Preferred:** 2024-2026
- **Acceptable:** 2022-2026 for foundational research
- **Never:** Pre-2020 for AI/ML statistics

### Citation Rules

**⚠️ USER PREFERENCE (Session 25): NO CITATIONS on framework pages**
- Citations/sources sections have been deferred
- May be added later if requested

~~Original rules (for reference when citations are needed):~~
1. ~~Point of Delivery - Cite at the exact location of the claim~~
2. ~~Verifiable - All sources must be publicly accessible~~
3. ~~No Stacking - One claim, one source (not "multiple studies show")~~
4. ~~Specific - Name the institution, not "researchers found"~~
5. ~~MANDATORY LINKS - Every citation MUST include a direct URL to the source~~
6. ~~NO LINK = NO FACT - If you cannot find a verifiable source with a working URL, DO NOT add the claim to the site~~

### Citation Format (REQUIRED)

**In-text citation:**
```html
<span class="myth-fact-card__source">Institution Name (Year)</span>
```

**Sources section (bottom of page):**
```html
<section class="section citations-section">
    <div class="container">
        <h2>Sources</h2>
        <ul class="citation-list">
            <li class="citation-item">
                <a href="https://actual-url.edu/path" target="_blank" rel="noopener noreferrer">
                    Full Title - Institution Name (Year)
                </a>
            </li>
        </ul>
    </div>
</section>
```

**Example (from Facts & Fictions):**
```html
<!-- In-text -->
<span class="myth-fact-card__source">MIT News (July 2024)</span>

<!-- Sources section -->
<li class="citation-item">
    <a href="https://news.mit.edu/2024/large-language-models-dont-behave-like-people-0723"
       target="_blank" rel="noopener noreferrer">
        Large Language Models Don't Behave Like People - MIT News (July 2024)
    </a>
</li>
```

### Content That Requires Citation

| Always Cite | Never Needs Citation |
|-------------|---------------------|
| Statistics and percentages | General framework descriptions |
| Research findings | How-to instructions |
| Claims about AI capabilities | Code examples |
| Performance benchmarks | UI/UX patterns |
| Historical facts with dates | Best practice recommendations |

---

# DESIGN PRINCIPLES

## Visual Consistency

### Page Structure Template
```html
1. Skip link
2. Header with navigation
3. Hero section (page-hero class)
4. Content badges row
5. Main content sections
6. Related frameworks / CTA
7. Footer
8. Accessibility dialog
9. Scripts (deferred)
```

### Required Components Per Framework Page

| Component | Purpose |
|-----------|---------|
| Hero badge | Category indicator (Foundation, Advanced, etc.) |
| Content badges | AI for Everybody, UD/UDL, Security, Performance, Claude, GitHub |
| Section eyebrow | Category label above section title |
| Feature list | Checkmark items for benefits |
| Example boxes | Prompt examples with before/after |
| Related frameworks | Navigation to related content |

### CSS Variables (Use These)

```css
/* Colors */
--primary, --secondary, --accent
--text, --text-muted, --text-light
--surface, --surface-alt, --border

/* Spacing */
--space-xs, --space-sm, --space-md, --space-lg, --space-xl, --space-2xl

/* Typography */
--font-sans, --font-mono
--radius, --radius-lg
```

### Existing Reusable Components

| Component | Class | Use For |
|-----------|-------|---------|
| Feature cards | `.feature-card` | Benefits/features grid |
| Icon boxes | `.icon-box` | Clickable framework links |
| Stat cards | `.stat-card` | Key statistics |
| Highlight box | `.highlight-box` | Callouts, warnings |
| Myth/fact cards | `.myth-fact-card` | Research comparisons |
| Accordion | `.accordion` | Expandable content |
| Timeline | `.timeline` | Sequential content |

---

# PROJECT SCOPE

## Summary

| Category | Count |
|----------|-------|
| Glossary terms to add | 33 |
| Text framework pages | 52 |
| Modality framework pages | 37 |
| **Total new pages** | **89** |
| Navigation updates | 48+ files |
| Navigation UX overhaul | Accordion menus + multi-column |

## Current Site Frameworks (11 existing)

1. CRISP Framework (crisp.html)
2. CRISPE Framework (crispe.html)
3. COSTAR Framework (costar.html)
4. ReAct Framework (react.html) ✓ In Prompt Report
5. Flipped Interaction (flipped-interaction.html)
6. Chain-of-Thought (chain-of-thought.html) ✓ In Prompt Report
7. Few-Shot Learning (few-shot-learning.html) ✓ In Prompt Report
8. Role Prompting (role-prompting.html) ✓ In Prompt Report
9. Constrained Output (constrained-output.html)
10. Self-Consistency (self-consistency.html) ✓ In Prompt Report
11. Prompt Chaining (prompt-chaining.html) ✓ In Prompt Report

**6 frameworks overlap with Prompt Report = 52 new text framework pages needed**

---

# PHASE BREAKDOWN

## Phase 1: Glossary Expansion (33 Terms)

**Priority:** HIGH
**Status:** Not Started

Add these prompting vocabulary terms to `pages/glossary.html`:

| Term | Letter | Category Tag |
|------|--------|--------------|
| Answer Engineering | A | Prompting |
| Beam Search | B | Prompting |
| Cloze Prompt | C | Prompting |
| Context Window | C | Prompting |
| Continuous Prompt | C | Prompting |
| Decomposition | D | Prompting |
| Demonstration | D | Prompting |
| Discrete Prompt | D | Prompting |
| Ensemble | E | Prompting |
| Exemplar | E | Prompting |
| Gradient-based Search | G | Prompting |
| Greedy Decoding | G | Prompting |
| In-Context Learning | I | Prompting |
| Jailbreak | J | Prompting |
| Label Space | L | Prompting |
| Prefix Prompt | P | Prompting |
| Prompt Generation | P | Prompting |
| Prompt Injection | P | Prompting |
| Prompt Mining | P | Prompting |
| Prompt Paraphrasing | P | Prompting |
| Prompt Scoring | P | Prompting |
| Prompt Template | P | Prompting |
| Rationale | R | Prompting |
| Reasoning Chain | R | Prompting |
| Refinement | R | Prompting |
| Retrieval-Augmented | R | Prompting |
| Self-Critique | S | Prompting |
| Temperature | T | Prompting |
| Token Budget | T | Prompting |
| Tool Use | T | Prompting |
| Top-k Sampling | T | Prompting |
| Top-p Sampling | T | Prompting |
| Verbalizer | V | Prompting |

---

## Phase 2: Text Framework Pages (52 Pages)

### 2A: Zero-Shot Frameworks (8 pages)

| Framework | File | Priority | Status |
|-----------|------|----------|--------|
| Zero-Shot | zero-shot.html | HIGH | Not Started |
| Emotion Prompting | emotion-prompting.html | MEDIUM | Not Started |
| Style Prompting | style-prompting.html | MEDIUM | Not Started |
| S2A (System 2 Attention) | s2a.html | LOW | Not Started |
| SimToM | simtom.html | LOW | Not Started |
| RaR (Rephrase and Respond) | rar.html | MEDIUM | Not Started |
| RE2 (Re-Reading) | re2.html | LOW | Not Started |
| Self-Ask | self-ask.html | MEDIUM | Not Started |

### 2B: In-Context Learning Frameworks (10 pages)

| Framework | File | Priority | Status |
|-----------|------|----------|--------|
| One-Shot | one-shot.html | HIGH | Not Started |
| Many-Shot | many-shot.html | MEDIUM | Not Started |
| Example Selection | example-selection.html | HIGH | Not Started |
| Example Ordering | example-ordering.html | MEDIUM | Not Started |
| KNN Prompting | knn-prompting.html | LOW | Not Started |
| Vote-k | vote-k.html | LOW | Not Started |
| Self-Generated ICL | self-generated-icl.html | MEDIUM | Not Started |
| Demonstration Ensembling | demo-ensembling.html | LOW | Not Started |
| Active Example Selection | active-example.html | LOW | Not Started |
| Prompt Mining | prompt-mining.html | LOW | Not Started |

### 2C: Thought Generation Frameworks (12 pages)

| Framework | File | Priority | Status |
|-----------|------|----------|--------|
| Zero-Shot CoT | zero-shot-cot.html | HIGH | Not Started |
| Analogical Reasoning | analogical-reasoning.html | MEDIUM | Not Started |
| Step-Back Prompting | step-back.html | MEDIUM | Not Started |
| Thread of Thought | thread-of-thought.html | LOW | Not Started |
| Tab-CoT | tab-cot.html | LOW | Not Started |
| Contrastive CoT | contrastive-cot.html | MEDIUM | Not Started |
| Uncertainty-Routed CoT | uncertainty-cot.html | LOW | Not Started |
| Complexity-Based Prompting | complexity-prompting.html | LOW | Not Started |
| Active Prompting | active-prompting.html | LOW | Not Started |
| Memory-of-Thought | memory-of-thought.html | LOW | Not Started |
| Auto-CoT | auto-cot.html | MEDIUM | Not Started |
| Structured CoT | structured-cot.html | LOW | Not Started |

### 2D: Decomposition Frameworks (8 pages)

| Framework | File | Priority | Status |
|-----------|------|----------|--------|
| Least-to-Most | least-to-most.html | HIGH | Not Started |
| DECOMP | decomp.html | MEDIUM | Not Started |
| Plan-and-Solve | plan-and-solve.html | HIGH | Not Started |
| Tree of Thought (ToT) | tree-of-thought.html | HIGH | Not Started |
| Graph of Thought (GoT) | graph-of-thought.html | MEDIUM | Not Started |
| Recursion of Thought | recursion-of-thought.html | LOW | Not Started |
| Program of Thought | program-of-thought.html | MEDIUM | Not Started |
| Faithful CoT | faithful-cot.html | LOW | Not Started |

### 2E: Ensembling Frameworks (6 pages)

| Framework | File | Priority | Status |
|-----------|------|----------|--------|
| COSP | cosp.html | LOW | Not Started |
| DENSE | dense.html | LOW | Not Started |
| Max Mutual Information | max-mutual-info.html | LOW | Not Started |
| Meta-Reasoning | meta-reasoning.html | LOW | Not Started |
| Universal Self-Consistency | universal-self-consistency.html | LOW | Not Started |
| DiVeRSe | diverse.html | LOW | Not Started |

### 2F: Self-Criticism Frameworks (8 pages)

| Framework | File | Priority | Status |
|-----------|------|----------|--------|
| Self-Refine | self-refine.html | HIGH | Not Started |
| Self-Verification | self-verification.html | HIGH | Not Started |
| Chain-of-Verification | chain-of-verification.html | MEDIUM | Not Started |
| CRITIC | critic.html | MEDIUM | Not Started |
| Cumulative Reasoning | cumulative-reasoning.html | LOW | Not Started |
| Reversing CoT | reversing-cot.html | LOW | Not Started |
| Self-Calibration | self-calibration.html | LOW | Not Started |
| Reflexion | reflexion.html | MEDIUM | Not Started |

---

## Phase 3: Modality Frameworks Section (37 Pages)

### Directory Structure

```
learn/
├── modality/
│   ├── index.html (hub page)
│   ├── image/
│   │   └── (12 pages)
│   ├── audio/
│   │   └── (6 pages)
│   ├── video/
│   │   └── (6 pages)
│   ├── code/
│   │   └── (8 pages)
│   └── 3d/
│       └── (5 pages)
```

### 3A: Image Prompting (12 pages)

| Framework | File | Priority |
|-----------|------|----------|
| Image Prompting Basics | image-prompting.html | HIGH |
| Multimodal CoT | multimodal-cot.html | HIGH |
| Visual Chain of Thought | visual-cot.html | MEDIUM |
| Image-as-Text | image-as-text.html | MEDIUM |
| Visual Question Answering | vqa.html | MEDIUM |
| Image Generation Prompting | image-gen-prompting.html | HIGH |
| Negative Prompting | negative-prompting.html | HIGH |
| ControlNet Prompting | controlnet-prompting.html | MEDIUM |
| Inpainting Prompting | inpainting-prompting.html | LOW |
| Style Transfer Prompting | style-transfer.html | LOW |
| Image-to-Image | image-to-image.html | MEDIUM |
| Composition Prompting | composition-prompting.html | LOW |

### 3B: Audio/Speech (6 pages)

| Framework | File | Priority |
|-----------|------|----------|
| Audio Prompting Basics | audio-prompting.html | MEDIUM |
| Speech-to-Text Prompting | stt-prompting.html | MEDIUM |
| Text-to-Speech Prompting | tts-prompting.html | MEDIUM |
| Audio Classification | audio-classification.html | LOW |
| Music Generation Prompting | music-gen.html | LOW |
| Voice Cloning Prompting | voice-cloning.html | LOW |

### 3C: Video (6 pages)

| Framework | File | Priority |
|-----------|------|----------|
| Video Prompting Basics | video-prompting.html | MEDIUM |
| Video Generation Prompting | video-gen.html | MEDIUM |
| Temporal Reasoning | temporal-reasoning.html | LOW |
| Video QA | video-qa.html | LOW |
| Video Captioning | video-captioning.html | LOW |
| Video Editing Prompting | video-editing.html | LOW |

### 3D: Code/Structured (8 pages)

| Framework | File | Priority |
|-----------|------|----------|
| Code Prompting Basics | code-prompting.html | HIGH |
| Program Synthesis | program-synthesis.html | MEDIUM |
| Self-Debugging | self-debugging.html | HIGH |
| Code Explanation | code-explanation.html | MEDIUM |
| Code Review Prompting | code-review.html | MEDIUM |
| Test Generation | test-generation.html | MEDIUM |
| Structured Output | structured-output.html | HIGH |
| SQL Generation | sql-generation.html | MEDIUM |

### 3E: 3D/Spatial (5 pages)

| Framework | File | Priority |
|-----------|------|----------|
| 3D Prompting Basics | 3d-prompting.html | LOW |
| 3D Model Generation | 3d-model-gen.html | LOW |
| Scene Understanding | scene-understanding.html | LOW |
| Pose Estimation Prompting | pose-estimation.html | LOW |
| Point Cloud Prompting | point-cloud.html | LOW |

---

## Phase 4: Site Integration

### 4A: Navigation Updates

Update mega-menu in all 48 HTML files:
- Add "Text Frameworks" submenu
- Add "Modality Frameworks" submenu
- Organize by category

### 4B: Learn Hub Redesign

Update `learn/index.html`:
- Add category filter tabs
- Create framework grid with 89+ frameworks
- Add difficulty indicators
- Add "Modality Frameworks" section

### 4C: Search Index Updates

Update `data/search-index.json`:
- Add entries for all 89 new pages
- Include proper tags and categories

### 4D: Framework Matcher Updates

Update `tools/matcher.html`:
- Include new frameworks in recommendations
- Add modality category

---

## Phase 5: Navigation UX Overhaul

**Priority:** HIGH (Do before Phase 4 navigation updates)
**Status:** ✅ COMPLETE (Session 22)

### 5A: Menu Structure Reorganization

**Move Neurodivergence under Resources:**
- Current: Neurodivergence appears as separate top-level menu item
- Target: Neurodivergence nested under Resources dropdown menu
- Update all 48+ HTML files with navigation

### 5B: Menu Behavior (Implemented)

**Desktop Behavior:**
| Behavior | Description |
|----------|-------------|
| Hover to expand | Hovering over nav-item shows mega-menu |
| Click to navigate | Clicking nav-link navigates to section hub |
| Mouse out | Menu closes when mouse leaves |

**Mobile Behavior:**
| Behavior | Description |
|----------|-------------|
| Always expanded | All mega-menu content visible when hamburger menu open |
| No accordion | Simpler UX - all sections visible at once |
| Full-width | Menus expand to full viewport width |
| Touch-friendly | 44px+ tap targets on all links |

### 5C: Multi-Column Link Layout

**Column Rules:**
| Rule | Implementation |
|------|----------------|
| Max 8 links per column | After 8 links, start new column |
| Column flow | Links fill column top-to-bottom, then overflow to next column |
| Responsive columns | Desktop: up to 4 columns; Tablet: 2 columns; Mobile: 1 column (scrollable) |
| Column gap | Use `--space-lg` (16px) between columns |

**CSS Implementation Approach:**
```css
/* Navigation submenu multi-column */
.nav-submenu__links {
    display: grid;
    grid-template-rows: repeat(8, auto);
    grid-auto-flow: column;
    gap: var(--space-xs) var(--space-lg);
}

/* Mobile: single column with scroll */
@media (max-width: 768px) {
    .nav-submenu__links {
        grid-template-rows: none;
        grid-auto-flow: row;
        max-height: 60vh;
        overflow-y: auto;
    }
}
```

### 5D: JavaScript Requirements

**New Menu Controller (app.js):**
```javascript
// AccordionNav object structure
const AccordionNav = {
    activeMenu: null,

    // Open menu and track it
    openMenu(menuElement) { },

    // Close menu with animation
    closeMenu(menuElement) { },

    // Check if content overflows viewport (desktop)
    checkOverflow(menuElement) { },

    // Handle scroll events (mobile)
    handleScroll() { },

    // Initialize event listeners
    init() { }
};
```

**Event Listeners:**
- `click` on menu triggers
- `scroll` on window (mobile only - use media query or matchMedia)
- `click` outside menus
- `resize` for responsive behavior updates

### 5E: Implementation Checklist ✅

**HTML Changes:**
- [x] Add `aria-expanded="false"` to `.nav-item.has-dropdown` elements
- [x] Add `mega-menu--multi-column` class to Resources dropdown
- [x] Add `mega-menu-section--featured` class for AI & ND section
- [x] Updated navigation structure in all 48 HTML files

**CSS Changes:**
- [x] Multi-column grid for Resources mega-menu (`.mega-menu--multi-column`)
- [x] Featured section styling (`.mega-menu-section--featured`)
- [x] Smaller heading for featured section (fits on one line)
- [x] Mobile-specific styles for always-expanded menus

**JavaScript Changes:**
- [x] Existing hover/click handlers work with new structure
- [x] No accordion JS needed (simpler always-expanded approach on mobile)

**Accessibility:**
- [x] `aria-expanded` attribute on dropdown triggers
- [x] Proper heading hierarchy in mega-menus

### 5F: Final Navigation Structure (Implemented)

**Learn Menu:**
```
Learn (mega-menu)
├── Getting Started
│   ├── Prompt Basics
│   └── Facts & Fictions
└── Frameworks
    ├── CRISP Framework
    ├── CRISPE Framework
    ├── COSTAR Framework
    ├── ReAct Framework
    ├── Flipped Interaction
    ├── Chain-of-Thought
    ├── Few-Shot Learning
    ├── Role Prompting
    ├── Constrained Output
    ├── Self-Consistency
    └── Prompt Chaining
```

**Resources Menu (mega-menu--multi-column):**
```
Resources (mega-menu)
├── Explore
│   ├── ChatGPT Guide
│   ├── FAQ
│   ├── Glossary
│   ├── Security
│   ├── Performance
│   ├── AI for Everybody
│   ├── Universal Design
│   ├── AI Assisted
│   └── About
└── AI & ND (featured section)
    ├── Overview
    ├── AI for ADHD
    ├── AI for Autism
    ├── AI for Dyslexia
    ├── AI Tools Finder
    └── ND Resources
```

---

# SESSION LOG

## Session 25 (2026-02-05)

**Focus:** Phase 2 - Complete remaining HIGH priority pages + Navigation updates
**Status:** ✅ ALL 12 HIGH PRIORITY PAGES COMPLETE

**Completed:**
- [x] Created `learn/self-refine.html` - Iterative improvement technique
  - Three-stage process: Generate → Feedback → Refine
  - Feedback strategies: Criteria-based, Role-based, Comparative, Error-focused
  - Implementation patterns: Fixed iterations, Quality threshold, Diminishing returns
  - Interactive accordion for feedback strategies
  - Comparison tabs for single-pass vs self-refine
- [x] Created `learn/self-verification.html` - Answer validation technique
  - Verification strategies: Backward verification, Constraint checking, Sanity checks
  - Implementation patterns: Single-turn, Two-turn, Verification with regeneration
  - Comparison with related techniques (Self-Refine, Self-Consistency)
  - Interactive comparison tabs and accordion
- [x] Created `learn/modality/code/` directory structure
- [x] Created `learn/modality/code/code-prompting.html` - Code generation strategies
  - Code task types: Generation, Explanation, Transformation, Review
  - Prompt anatomy: Task spec, Technical context, Requirements, Examples
  - Context strategies in accordion
  - Interactive tabbed comparison of task types
- [x] Created `learn/modality/code/self-debugging.html` - AI-assisted debugging
  - Debugging strategies: Error-driven, Trace-based, Explanation, Test-driven
  - Debugging workflow timeline
  - Prompt patterns: Rubber duck, Adversarial reviewer, Hypothesis tester, Minimal fix
- [x] Created `learn/modality/code/structured-output.html` - Format generation
  - Format comparison: JSON, XML, YAML, CSV
  - Prompting strategies: Schema specification, Example-driven, Format enforcement
  - Common issues and fixes
  - Validation strategies
- [x] Updated navigation mega-menu across ALL 48+ HTML files:
  - Added "Advanced" section with 6 links
  - Added "Code" section with 3 links
  - Used correct relative paths for each directory depth

**User Preference Applied:**
- NO CITATIONS on any framework pages (per user request)
- Citations may be added later if needed

**Files Created:**
- `learn/self-refine.html` (NEW)
- `learn/self-verification.html` (NEW)
- `learn/modality/code/code-prompting.html` (NEW)
- `learn/modality/code/self-debugging.html` (NEW)
- `learn/modality/code/structured-output.html` (NEW)

**Files Modified:**
- All 48+ HTML files (navigation mega-menu updated)
- `.claude/HANDOFF.md` (session status updated)
- `.claude/plans/FrameworkOverhaul.md` (this file)

**Phase 2 HIGH Priority Status:** ✅ COMPLETE (12/12 pages)

---

## Session 24 (2026-02-05)

**Focus:** Phase 2 - Text Framework Pages (Starting HIGH priority)
**Status:** PAUSED FOR HANDOFF

**Completed:**
- [x] Created `learn/zero-shot.html` - Foundation technique page
  - Original content (not copy-paste from other pages)
  - CSP compliant (no inline styles/scripts)
  - Verifiable academic sources (arXiv, MIT Press, NAACL)
  - Interactive accordion with examples
  - Related techniques section linking to few-shot, zero-shot-cot, role-prompting
- [x] Created `learn/zero-shot-cot.html` - Reasoning technique page
  - Interactive tabbed before/after comparison (math, logic, analysis)
  - Stat cards showing accuracy improvement (17.7% → 78.7%)
  - Trigger phrases section with pillar cards
  - Advanced techniques in accordion
  - Highlight boxes for warnings/tips
- [x] Added new CSS components to styles.css:
  - `.comparison-tabs` - Tabbed content switching
  - `.comparison-grid` - Two-column layout for before/after
  - `.comparison-card--before/--after` - Styled comparison cards
  - `.pillar-card--interactive` - Hover effect cards
  - `.pillar-card__tag` - Category labels
  - `.use-case-card--success` - Success variant
- [x] Added comparison-tabs JS handler to app.js (lines ~6869-6894)
- [x] Scanned site for duplicate zero-shot content - confirmed no conflicts
  - ai-for-everybody.html: Just mentions in glossary coverage stat
  - foundations/index.html: Historical timeline (different purpose)

**Page Requirements Established:**
- Mix of engagement, information, and interactivity
- No duplicate content from other pages (unless relevant)
- Original content - not copy-paste designs
- Keep FrameworkOverhaul.md updated frequently
- Update navigation/footer AFTER all pages created (Phase 4)

**Files Changed:**
- `learn/zero-shot.html` (NEW)
- `learn/zero-shot-cot.html` (NEW)
- `styles.css` (added ~150 lines of comparison component styles)
- `app.js` (added comparison-tabs handler)
- `.claude/HANDOFF.md` (updated for handoff)
- `.claude/plans/FrameworkOverhaul.md` (this file)

**Remaining HIGH Priority (10 pages):**
1. one-shot.html
2. example-selection.html
3. least-to-most.html
4. plan-and-solve.html
5. tree-of-thought.html
6. self-refine.html
7. self-verification.html
8. code-prompting.html
9. self-debugging.html
10. structured-output.html

**Then:** Update navigation and footer links in all 48+ HTML files

---

## Session 23 (2026-02-04)

**Focus:** Phase 1 Glossary + Mobile Menu Refinement
**Completed:**
- [x] **Phase 1 COMPLETE** - Glossary Expansion (33 terms)
  - [x] Created `data/glossary.json` with 33 new prompting terms from The Prompt Report
  - [x] Added `loadGlossaryFromJSON()` function to app.js (lines 7577-7673)
  - [x] Terms loaded dynamically and inserted alphabetically into existing glossary
  - [x] Updated `data/search-index.json` with all 33 new terms
- [x] **Mobile Menu UX Improvements**
  - [x] Fixed 2-column grid layout for mega-menu links
  - [x] Used `display: contents` on sections so links flow into grid
  - [x] Removed slideDown animation on `.nav.active` (instant open)
  - [x] Disabled all transitions on mobile nav links
  - [x] Disabled hover effects on touch devices (`@media (hover: none)`)
  - [x] Hidden underline animation on mobile nav links

**New Glossary Terms Added:**
Answer Engineering, Beam Search, Cloze Prompt, Context Window, Continuous Prompt, Decomposition, Demonstration, Discrete Prompt, Ensemble, Exemplar, Gradient-based Search, Greedy Decoding, In-Context Learning, Jailbreak, Label Space, Prefix Prompt, Prompt Generation, Prompt Injection, Prompt Mining, Prompt Paraphrasing, Prompt Scoring, Prompt Template, Rationale, Reasoning Chain, Refinement, RAG, Self-Critique, Temperature, Token Budget, Tool Use, Top-k Sampling, Top-p Sampling, Verbalizer

**Files Changed:**
- `data/glossary.json` (NEW)
- `data/search-index.json` (added 33 entries)
- `app.js` (added loadGlossaryFromJSON function)
- `styles.css` (mobile menu 2-column grid, disabled hover effects)

---

## Session 22 (2026-02-04)

**Focus:** Phase 5 - Navigation UX Overhaul (COMPLETED)
**Completed:**
- [x] **Phase 5 COMPLETE** - Navigation UX Overhaul
  - [x] Moved Neurodivergence section under Resources mega-menu
  - [x] Added `mega-menu--multi-column` class for Resources dropdown
  - [x] Added `mega-menu-section--featured` class for AI & ND section
  - [x] Changed "Prompt Basics" section to "Getting Started" in Learn menu
  - [x] Added "Facts & Fictions" link under Getting Started (after Prompt Basics)
  - [x] Removed "Facts & Fictions" from Resources/Guides section
  - [x] Changed `<h4>AI + Neurodivergence</h4>` to `<h4>AI & ND</h4>` (fits on one line)
  - [x] Added CSS for smaller featured section heading (0.65rem, tighter letter-spacing)
  - [x] Added `aria-expanded="false"` to all `.nav-item.has-dropdown` elements
  - [x] Updated all 48 HTML files across:
    - index.html, foundations/, learn/, neurodivergence/, tools/, pages/, quiz/, patterns/
  - [x] Mobile menu: always-expanded submenus (simpler than accordion)

**CSS Changes (styles.css):**
- Added `.mega-menu--multi-column` for Resources dropdown
- Added `.mega-menu-section--featured` for AI & ND highlight
- Added smaller font-size for featured section heading (desktop: 0.65rem, mobile: 0.6rem)
- Added `white-space: nowrap` to prevent heading wrap

**Next Session:**
- [x] Begin Phase 1: Add 33 glossary terms ✅ DONE (Session 23)
- [ ] Create framework page template
- [ ] Start HIGH priority framework pages

---

## Session 21 (2026-02-04)

**Focus:** Project initialization and planning
**Completed:**
- [x] Created FrameworkOverhaul.md master plan document
- [x] Created prompt-report-expansion-plan.md detailed breakdown
- [x] Established non-negotiable standards
- [x] Defined citation rules based on Facts & Fictions methodology
- [x] Cataloged all 89 new pages needed
- [x] Prioritized frameworks (HIGH/MEDIUM/LOW)
- [x] Cleaned .htaccess (removed unused font caching rules)
- [x] Fixed z-index stacking for foundations/index.html timeline animation
- [x] Added Phase 5: Navigation UX Overhaul plan
  - Accordion-style menus with auto-collapse behavior
  - Multi-column link layout (8 links per column max)
  - Neurodivergence section moved under Resources
  - Mobile vs Desktop behavior differences defined

**Next Session:**
- [x] Phase 5: Navigation UX Overhaul ✅ DONE

---

## Batch Progress Tracking

### Phase 1: Glossary (33/33) ✅ COMPLETE
```
Progress: [████████████████████] 100%
```
- [x] Created data/glossary.json with 33 prompting terms
- [x] Added JS to load and render terms from JSON
- [x] Updated search-index.json with all terms

### Phase 2: Text Frameworks (12/52)
```
Progress: [████░░░░░░░░░░░░░░░░] 23%
HIGH Priority: [████████████████████] 100%
```
- [x] zero-shot.html (HIGH) ✅
- [x] zero-shot-cot.html (HIGH) ✅
- [x] one-shot.html (HIGH) ✅
- [x] example-selection.html (HIGH) ✅
- [x] least-to-most.html (HIGH) ✅
- [x] plan-and-solve.html (HIGH) ✅
- [x] tree-of-thought.html (HIGH) ✅
- [x] self-refine.html (HIGH) ✅
- [x] self-verification.html (HIGH) ✅
- [x] code-prompting.html (HIGH) ✅
- [x] self-debugging.html (HIGH) ✅
- [x] structured-output.html (HIGH) ✅

**Note:** Navigation updated with Advanced + Code sections in all 48+ files

### Phase 3: Modality Frameworks (0/37)
```
Progress: [░░░░░░░░░░░░░░░░░░░░] 0%
```

### Phase 4: Site Integration (1/4)
```
Progress: [█████░░░░░░░░░░░░░░░] 25%
```
- [x] 4A: Navigation updates for HIGH priority pages ✅
- [ ] 4B: Learn Hub redesign
- [ ] 4C: Search index updates
- [ ] 4D: Framework Matcher updates

### Phase 5: Navigation UX Overhaul (6/6) ✅ COMPLETE
```
Progress: [████████████████████] 100%
```
- [x] 5A: Menu structure reorganization (Neurodivergence → Resources)
- [x] 5B: Mobile menu behavior (always-expanded, not accordion)
- [x] 5C: Multi-column link layout (CSS mega-menu--multi-column)
- [x] 5D: Featured section styling (AI & ND)
- [x] 5E: HTML/ARIA updates (aria-expanded on nav-items)
- [x] 5F: Update all 48 navigation files

---

## Quick Reference: Implementation Order

### HIGH Priority Pages (Do First) - 12 pages
1. zero-shot.html
2. zero-shot-cot.html
3. one-shot.html
4. example-selection.html
5. least-to-most.html
6. plan-and-solve.html
7. tree-of-thought.html
8. self-refine.html
9. self-verification.html
10. code-prompting.html
11. self-debugging.html
12. structured-output.html

### MEDIUM Priority Pages - 25 pages
*(To be done after HIGH priority)*

### LOW Priority Pages - 52 pages
*(To be done last)*

---

## File Templates

### Framework Page Template Location
`learn/_template-framework.html` (to be created)

### Modality Page Template Location
`learn/modality/_template-modality.html` (to be created)

---

*This document is the single source of truth for the Framework Overhaul project. Update after each session.*
