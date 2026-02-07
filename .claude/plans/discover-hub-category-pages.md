# Phase Plan: Discover Hub + Category Landing Pages

**Created:** Session 39 (2026-02-07)
**Status:** APPROVED — ready for implementation
**Decisions Confirmed:** Session 39/40

---

## Context

The homepage now shows 6 category cards (Structured, Reasoning & CoT, Decomposition, Self-Correction, ICL, Advanced), but clicking them links to a single representative framework page — not a category overview. Meanwhile, `learn/index.html` only shows 11 "Foundation" framework cards and doesn't reflect the library's growth to 62+ frameworks across 9 categories.

**Problems to solve:**
1. No way to browse all 62+ frameworks by category
2. `learn/index.html` is outdated (shows 11 of 62+ frameworks)
3. "Advanced Techniques" is a misleading label in 2026 (contains Role Prompting, which is basic)
4. No intermediate navigation between the homepage overview and individual framework pages
5. The Ensemble Methods (7) and Code (3) categories have no homepage visibility

---

## Confirmed Decisions

| Question | Decision | Notes |
|----------|----------|-------|
| Category rename | "Advanced Techniques" → **"Prompting Strategies"** | Generic but honest; avoids implying difficulty |
| Nav link text | Change **"Learn" → "Discover"** site-wide | Affects all 100 HTML files (nav link + mega-menu header) |
| Card density | **All cards visible** on Discover hub | Grouped by category with anchor-link filters |
| Category page location | **Flat structure** | `learn/reasoning-cot.html` (same depth as other learn pages, `../` prefix) |
| Ensemble on homepage | To be decided during Phase 4 | May add as 7th card |

---

## Phase 1: Category Relabeling + Nav Rename

**Goal:** Rename "Advanced Techniques" → "Prompting Strategies" AND rename "Learn" → "Discover" across all pages.

### Category Labels (Final)

| Category | Count | Status |
|---|---|---|
| Getting Started | 2 | No change |
| Structured Frameworks | 5 | No change |
| Reasoning & CoT | 14 | No change |
| Decomposition | 7 | No change |
| Self-Correction | 7 | No change |
| In-Context Learning | 9 | No change |
| Ensemble Methods | 7 | No change |
| **Prompting Strategies** | **11** | **Renamed from "Advanced Techniques"** |
| Code | 3 | No change |

### "Prompting Strategies" Frameworks (11 total)

- **Workflow/Agentic:** ReAct, Self-Ask, Prompt Chaining (3)
- **Communication Style:** Role Prompting, Emotion Prompting, Style Prompting, Flipped Interaction (4)
- **Input Refinement:** S2A, SimToM, RaR, RE2 (4)

### Files Affected

- `index.html` — homepage category cards (change "Advanced" label)
- `learn/index.html` — Learn hub references
- **All 100 HTML files** — mega-menu: rename category header from "Advanced Techniques" to "Prompting Strategies" AND rename nav link from "Learn" to "Discover"
- `app.js` — search index categories
- `foundations/index.html` — if "Advanced" referenced there
- `.claude/HANDOFF.md` — documentation

### Implementation Approach

Use a Python batch script (like Session 38's `update_nav.py`) to do both renames in a single pass across all 100 files:
1. Replace "Advanced Techniques" → "Prompting Strategies" in mega-menu section headers
2. Replace nav link text "Learn" → "Discover"
3. Verify with grep after

---

## Phase 2: Discover Hub (learn/index.html Redesign)

**Goal:** Transform `learn/index.html` from a 11-card "Learn" page into a comprehensive "Discover" hub showing all 62+ frameworks organized by category.

### Current State
- Title: "Prompt Engineering Frameworks"
- Shows: 11 "Foundation" cards (CRISP through Prompt Chaining)
- Sections: Quick Start → 11 Framework Cards → Tips → Framework Finder → CTA
- Nav link text: "Learn" (will be "Discover" after Phase 1)

### Proposed Redesign

**Page title:** "Discover Frameworks"
**Nav link:** "Discover" (changed in Phase 1)

**New sections:**

1. **Hero** — "Discover 62+ Prompt Engineering Frameworks"
   - Subtitle: "Browse by category, search by name, or find your match"
   - Breadcrumb: Home / Discover

2. **Quick Filters** (anchor-link row)
   - Horizontal row of category filter buttons (All | Structured | Reasoning | Decomposition | Self-Correction | ICL | Ensemble | Prompting Strategies | Code)
   - Each button is an anchor link scrolling to that category section
   - Sticky behavior below header for persistent navigation

3. **Category Sections** (one per category, 8 total — exclude Getting Started)
   Each category section contains:
   - Section ID for anchor targeting (e.g., `id="cat-reasoning"`)
   - Category name + count badge (e.g., "Reasoning & CoT" [14])
   - 1-2 sentence category description
   - Grid of framework-cards for ALL frameworks in that category
   - "View Category Page →" link to the flat category landing page

4. **Framework Finder** (keep existing mini-finder, update questions for 62+ scope)

5. **Getting Started CTA** (keep existing, minor refresh)

### Card Format (per framework)
- Framework name (linked)
- Year
- 1-line description
- Relevancy badge (Active / Widely Adopted / Historical)

---

## Phase 3: Category Landing Pages (7 new pages)

**Goal:** Create dedicated landing pages for each major category using flat file structure.

### Pages to Create

| File | Category | Frameworks |
|---|---|---|
| `learn/structured-frameworks.html` | Structured Frameworks | 5 |
| `learn/reasoning-cot.html` | Reasoning & CoT | 14 |
| `learn/decomposition.html` | Decomposition | 7 |
| `learn/self-correction.html` | Self-Correction | 7 |
| `learn/in-context-learning.html` | In-Context Learning | 9 |
| `learn/ensemble-methods.html` | Ensemble Methods | 7 |
| `learn/prompting-strategies.html` | Prompting Strategies | 11 |

**Note:** Code stays at `learn/modality/code/` (already has its own hub structure). Getting Started doesn't need a category page (only 2 pages: prompt-basics, facts-fictions).

### Category Page Template

Each category landing page includes:

1. **Hero** — Category name, description, framework count
2. **Overview** — What this category is about, when to use these techniques
3. **Framework Grid** — All frameworks in this category as cards with:
   - Name, year, 1-line description
   - Relevancy status badge (Active / Widely Adopted / Historical)
   - Link to full framework page
4. **Comparison Table** — Side-by-side of all frameworks in category
   - Columns: Name, Year, Best For, Key Strength, Complexity
5. **Related Categories** — Links to adjacent categories
6. **CTA** — "Try Framework Matcher" or "Start with [recommended framework]"

### CSS Needs
- Reuse existing: `.framework-status--active`, `--adopted`, `--historical` badges (from foundations page)
- Reuse: `.icon-box`, `.comparison-table`, `.pillar-card`, `.cta-corporate`
- May need minor additions for filter-row sticky behavior

---

## Phase 4: Homepage + Navigation Updates

**Goal:** Update homepage category cards and mega-menu to link to category landing pages.

### Homepage changes
- 6 category cards now link to category landing pages instead of individual framework pages
  - Structured → `learn/structured-frameworks.html`
  - Reasoning & CoT → `learn/reasoning-cot.html`
  - Decomposition → `learn/decomposition.html`
  - Self-Correction → `learn/self-correction.html`
  - ICL → `learn/in-context-learning.html`
  - Prompting Strategies → `learn/prompting-strategies.html`
- Consider: Add Ensemble Methods as 7th card

### Mega-menu changes
- Category section headers become clickable links to category landing pages
- e.g., "Reasoning & CoT" header links to `learn/reasoning-cot.html`

### Path considerations
- All category pages at `learn/*.html` (flat) — same depth as other learn pages
- Use `../` prefix from learn pages, root-relative from index.html

---

## Phase 5: Search Index + Metadata Update

- Add all 7 category landing pages to `data/search-index.json`
- Update `app.js` search index with new category name ("Prompting Strategies")
- Verify all cross-references use correct category labels
- Update learn/index.html page title from "Learn" to "Discover" in search results

---

## Implementation Order

1. **Phase 1** — Batch rename: "Advanced Techniques" → "Prompting Strategies" + "Learn" → "Discover" (Python script, all 100 files)
2. **Phase 2** — Redesign learn/index.html as Discover hub (all 62+ frameworks visible by category)
3. **Phase 3** — Create 7 category landing pages (can be parallelized with agents)
4. **Phase 4** — Update homepage card links + mega-menu header links
5. **Phase 5** — Search index + metadata cleanup

**Estimated scope:** ~10 new/modified HTML files, possible CSS additions for filter row, app.js search updates, Python batch script for renames

---

## Framework Inventory by Category

### Getting Started (2)
1. Prompt Basics (`prompt-basics.html`)
2. Facts & Fictions (`facts-fictions.html`)

### Structured Frameworks (5)
1. CRISP (`crisp.html`)
2. CRISPE (`crispe.html`)
3. COSTAR (`costar.html`)
4. Context Structure (`context-structure.html`)
5. Constrained Output (`constrained-output.html`)

### Reasoning & CoT (14)
1. Chain-of-Thought (`chain-of-thought.html`)
2. Zero-Shot CoT (`zero-shot-cot.html`)
3. Auto-CoT (`auto-cot.html`)
4. Contrastive CoT (`contrastive-cot.html`)
5. Structured CoT (`structured-cot.html`)
6. Faithful CoT (`faithful-cot.html`)
7. Complexity-Based Prompting (`complexity-prompting.html`)
8. Tab-CoT (`tab-cot.html`)
9. Analogical Reasoning (`analogical-reasoning.html`)
10. Step-Back Prompting (`step-back.html`)
11. Thread of Thought (`thread-of-thought.html`)
12. Active Prompting (`active-prompting.html`)
13. Memory of Thought (`memory-of-thought.html`)
14. Reversing CoT (`reversing-cot.html`)

### Decomposition (7)
1. Least-to-Most (`least-to-most.html`)
2. DECOMP (`decomp.html`)
3. Plan-and-Solve (`plan-and-solve.html`)
4. Tree of Thought (`tree-of-thought.html`)
5. Graph of Thought (`graph-of-thought.html`)
6. Recursion of Thought (`recursion-of-thought.html`)
7. Program of Thought (`program-of-thought.html`)

### Self-Correction (7)
1. Self-Refine (`self-refine.html`)
2. Self-Verification (`self-verification.html`)
3. Chain-of-Verification (`chain-of-verification.html`)
4. CRITIC (`critic.html`)
5. Cumulative Reasoning (`cumulative-reasoning.html`)
6. Self-Calibration (`self-calibration.html`)
7. Reflexion (`reflexion.html`)

### In-Context Learning (9)
1. Few-Shot Learning (`few-shot-learning.html`)
2. Zero-Shot (`zero-shot.html`)
3. One-Shot (`one-shot.html`)
4. Shot Prompting (`shot-prompting.html`)
5. Example Selection (`example-selection.html`)
6. KNN Prompting (`knn-prompting.html`)
7. Vote-k (`vote-k.html`)
8. Demo Ensembling (`demo-ensembling.html`)
9. Prompt Mining (`prompt-mining.html`)

### Ensemble Methods (7)
1. Self-Consistency (`self-consistency.html`)
2. COSP (`cosp.html`)
3. Dense Prompting (`dense-prompting.html`)
4. Max Mutual Information (`max-mutual-info.html`)
5. Meta-Reasoning (`meta-reasoning.html`)
6. Universal Self-Consistency (`universal-self-consistency.html`)
7. DiVeRSe Prompting (`diverse-prompting.html`)

### Prompting Strategies (11) — formerly "Advanced Techniques"
1. ReAct (`react.html`)
2. Self-Ask (`self-ask.html`)
3. Prompt Chaining (`prompt-chaining.html`)
4. Role Prompting (`role-prompting.html`)
5. Emotion Prompting (`emotion-prompting.html`)
6. Style Prompting (`style-prompting.html`)
7. Flipped Interaction (`flipped-interaction.html`)
8. S2A (`s2a.html`)
9. SimToM (`simtom.html`)
10. RaR (`rar.html`)
11. RE2 (`re2.html`)

### Code (3)
1. Code Prompting (`modality/code/code-prompting.html`)
2. Self-Debugging (`modality/code/self-debugging.html`)
3. Structured Output (`modality/code/structured-output.html`)
