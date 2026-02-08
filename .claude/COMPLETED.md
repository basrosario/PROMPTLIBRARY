# Praxis Project - Completed Tasks Archive

**Purpose:** Archive of completed work to keep HANDOFF.md lean and focused on current tasks.

---

## Session 58 (2026-02-08)
**Mega-Menu UX + AI Ethics Banner — Completed Items**

### Mobile Mega-Menu Layout Fix
- [x] `.mega-menu--tabbed` overridden by later `.mega-menu { display: grid }` (equal specificity, later wins)
- [x] Fixed by increasing specificity to `.mega-menu.mega-menu--tabbed` (0,2,0 vs 0,1,0)
- [x] Added `columns: 1; column-gap: 0` to mobile sections

### Mobile Nav Split-Color Branding
- [x] `splitNavAccent()` function in app.js (~line 61) — splits text into white + red spans
- [x] Multi-word: last word red. Hyphenated: split at hyphen. Single words: split at midpoint
- [x] Applied to nav links and h4 accordion headers
- [x] Uses `<span class="nav-accent-wrap">` container to prevent flex gap issues
- [x] CSS: `.nav-accent { color: var(--primary); }`, h4 base changed from red to white

### Desktop Mega-Menu Sidebar Flip
- [x] `.mega-menu-sidebar`: `order: 2`, `border-left` (was `border-right`), radius flipped
- [x] `.mega-menu-tab`: `border-right: 3px solid transparent` (was `border-left`)
- [x] `.mega-menu-tab.is-active`: `border-right-color` (was `border-left-color`)
- [x] `.header.scrolled .mega-menu-sidebar`: `border-left-color` (was `border-right-color`)

### AI Ethics Reminder Banner
- [x] CSS component: `.ai-reminder-bar` — slate background, left border accent, 0.78rem font, dark theme
- [x] JS injection IIFE in app.js (~line 105) — detects `.cta-corporate` + `/learn/` pathname
- [x] Uses DOM API only (createElement, textContent, appendChild — CSP-compliant, no innerHTML)
- [x] Inserted before CTA section on all 108 framework pages
- [x] Content: "Responsible AI: Always verify AI-generated content..."

### AI Ethics Critical Rule
- [x] Added "AI Ethics & Disclosure (Required)" as Critical Rule #6 in CLAUDE.md (line 75)
- [x] All prompt examples must model responsible AI use — no exceptions
- [x] Covers: verification, no blind trust, disclosure best practices, 48 US states

### Commits
- `27034fd` — Mobile nav split-color branding + mega-menu layout fix
- `7308933` — Desktop sidebar flip, AI ethics banner, CLAUDE.md rule

---

## Session 57 (2026-02-07)
**Code Upgrades + Emerging Frameworks (4 new pages + 3 Code upgrades)**

### 3 Code Page 13-Section Upgrades
- [x] `code-prompting.html` — Rebuilt with full rich content (hero, 3-paragraph concept, element-timeline, comparison, 3 accordions, 6 use cases, evolution-callout, CTA)
- [x] `self-debugging.html` — Same full rebuild
- [x] `structured-output.html` — Same full rebuild

### 4 New Emerging Framework Pages
- [x] `learn/system-prompting.html` — Prompting Strategies. System-level instruction design.
- [x] `learn/rag.html` — Prompting Strategies. Retrieval-Augmented Generation.
- [x] `learn/agentic-prompting.html` — Prompting Strategies. Autonomous AI agents.
- [x] `learn/skeleton-of-thought.html` — Decomposition. Parallel generation via outline-first.

### Integration
- [x] Mega-menu batch update — `update_nav_emerging.py` added 4 new links across 149 files
- [x] Search index — 4 new entries (2,328 total)
- [x] Discover hub — 4 new cards, Prompting Strategies 11→14, Decomposition 7→8
- [x] Category pages — `prompting-strategies.html` (+3 cards), `decomposition.html` (+1 card)
- [x] Homepage counter — 101+ → 108+

### Mobile Nav Fixes (5 issues)
- [x] Scroll fix — `body.menu-open .header { backdrop-filter: none; }` (CSS containing block bug)
- [x] Expanded by default — All accordion sections open on mobile init
- [x] Resources formatting — Reset desktop centering (`translateX(-50%)`) on mobile
- [x] Scrolled color inversion — Force dark theme on mobile regardless of scroll state
- [x] Quick links expansion — Added Glossary + AI Foundations (149 files, 2x2 mobile grid)

---

## Session 56 (2026-02-07)
**Search + Navigation UX**

### Main Search 8-Tier Glossary Scoring
- [x] `scoreGlossaryEntry()` function with 8-tier algorithm matching glossary inline search
- [x] Helper functions: `extractSearchAcronym()`, `normalizeSearchMatch()`
- [x] Applied to Glossary category entries in main `searchPraxis()` function

### Glossary Hash Scroll Fix
- [x] `content-visibility: auto` uses 500px placeholder heights, breaking scroll position
- [x] Fix: disable content-visibility on all 26 sections, double-rAF for layout reflow, `getBoundingClientRect()`, manual `window.scrollTo()` with 220px offset, restore after 1.5s

### Mega-Menu Sidebar Redesign
- [x] Getting Started removed as a tab (only had 2 links)
- [x] Prompt Basics + Facts & Fictions pinned as quick links at top of sidebar
- [x] `.mega-menu-sidebar` wraps `.mega-menu-quick-links` + `.mega-menu-tabs`
- [x] 145 HTML files + CSS updated via `update_nav_sidebar.py`

---

## Session 55 (2026-02-07)
**Full Audit Remediation — ALL Critical + Warning Items Resolved**

### C4: Comparison Panel h2 Fixes (3 remaining + 1 already fixed)
- [x] `learn/self-calibration.html:386` — Already said "See the Difference" (no change needed)
- [x] `learn/decomp.html:342` — "Monolithic vs. Decomposed" -> "See the Difference"
- [x] `learn/graph-of-thought.html:349` — "Chain/Tree Thinking vs. Graph of Thoughts" -> "See the Difference"
- [x] `learn/recursion-of-thought.html:372` — "Flat vs. Recursive Decomposition" -> "See the Difference"

### C1: Inline Style Fixes (2 files)
- [x] `.mt-xl` utility class already existed in styles.css:2650 (no CSS change needed)
- [x] `pages/security.html:491` — `style="margin-top: var(--space-xl);"` -> class `mt-xl`
- [x] `pages/performance.html:574` — `style="margin-top: var(--space-xl);"` -> class `mt-xl`

### C3: Search Index — 58 Missing Entries Added
- [x] Python batch script (`add_search_entries.py`, since deleted) extracted title + meta description from each HTML file
- [x] 52 learn/ framework pages added (15 Reasoning & CoT, 6 Decomposition, 6 Self-Correction, 6 Ensemble Methods, 8 In-Context Learning, 7 Prompting Strategies, 1 Structured Frameworks, 3 Code)
- [x] 6 neurodivergence/ pages added (index, adhd, autism, dyslexia, tools, resources)
- [x] Total search index: 2,324 entries (was 2,266)

### Orphan Files Deleted (8 files)
- [x] `nul` — Windows artifact
- [x] `learn/_footer.tmp` — build fragment
- [x] `learn/_header.tmp` — build fragment
- [x] `learn/graph-of-thought-new.html` — test stub
- [x] `learn/mot_new.html` — truncated draft
- [x] `learn/analogical-reasoning-new.html` — draft duplicate
- [x] `pages/animation-features.html` — unreachable page with 18 inline styles
- [x] `tools/scorer.html` — dead redirect stub

### Files Modified
- `learn/decomp.html`, `learn/graph-of-thought.html`, `learn/recursion-of-thought.html` (comparison h2 fixes)
- `pages/security.html`, `pages/performance.html` (inline style -> utility class)
- `data/search-index.json` (+58 entries)
- `.claude/HANDOFF.md`, `.claude/COMPLETED.md`

### Files Deleted (Critical)
- `nul`, `learn/_footer.tmp`, `learn/_header.tmp`, `learn/graph-of-thought-new.html`
- `learn/mot_new.html`, `learn/analogical-reasoning-new.html`, `pages/animation-features.html`, `tools/scorer.html`

### W2: Heading Hierarchy Fixes (36 fixes across 17 files)
- [x] Python batch script (`fix_headings.py`, since deleted) changed h4->h3 and h3->h2 in main content areas
- [x] 17 files fixed: neurodivergence/ (5), pages/ (3), tools/ (7), patterns/ (1), learn/ (1 - cumulative-reasoning from later fix)
- [x] Verification scan: zero heading hierarchy violations remain

### W3: Global Focus-Visible Style
- [x] Added `a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible` with `outline: 2px solid var(--primary); outline-offset: 2px` to styles.css

### W7: Image Dimensions
- [x] `pages/about.html:272` — Added `width="600" height="800"` to me2.webp img

### W8: Orphan Deletion
- [x] `learn/_mmi_temp.html` deleted (outdated nav, only 7 of 13 tabs)

### W5: Missing Comparison Panels Added
- [x] `learn/cumulative-reasoning.html` — "Without Cumulative Reasoning" vs "With Cumulative Reasoning"
- [x] `learn/structured-cot.html` — "Without Structured CoT" vs "With Structured CoT"

### W6: Missing Pillar-Grid Sections Added
- [x] `learn/decomp.html` — Specialization, Modularity, Error Isolation
- [x] `learn/graph-of-thought.html` — Non-Linear Exploration, Thought Aggregation, Backtracking
- [x] `learn/recursion-of-thought.html` — Adaptive Depth, Context Isolation, Compositional Reasoning

### W1: ADL Dashboard Added to 5 Pages
- [x] `learn/modality/code/code-prompting.html`, `self-debugging.html`, `structured-output.html` (depth 3)
- [x] `learn/modality/index.html` (depth 2)
- [x] `neurodivergence/resources.html` (depth 1, replaced legacy accessibility panel)

### 3 Code Modality Pages Fully Built Out (7 sections each)
- [x] `code-prompting.html`: 510 -> 932 lines (+Historical Context, Why It Works, Comparison Panel, When to Use/Limitations, Use Cases, Framework Positioning, all with ADL)
- [x] `self-debugging.html`: 510 -> 937 lines (+Historical Context, Why It Works, Comparison Panel, When to Use/Limitations, Use Cases, Framework Positioning, all with ADL)
- [x] `structured-output.html`: 534 -> 928 lines (+Historical Context, Why It Works, Comparison Panel, When to Use/Limitations, Use Cases, Framework Positioning, all with ADL)

### Files Modified (Warning Remediation)
- 17 files (heading hierarchy fixes)
- `styles.css` (focus-visible style)
- `pages/about.html` (img dimensions)
- `learn/cumulative-reasoning.html`, `learn/structured-cot.html` (comparison panels)
- `learn/decomp.html`, `learn/graph-of-thought.html`, `learn/recursion-of-thought.html` (pillar-grid sections)
- 5 pages (ADL dashboard additions)
- 3 Code modality pages (full 13-section build-out)

### Files Deleted (Warning)
- `learn/_mmi_temp.html`

---

## Session 54 (2026-02-07)
**First Full Site Audit + Partial Remediation**

### Site Audit Executed (9 phases, all run in parallel)
- Phase 1: Orphaned File Scan — 8 DELETE candidates, 4 REVIEW
- Phase 2: Structural Integrity — 148/151 files pass
- Phase 3: Format Consistency — 6 comparison h2 violations, 3 incomplete Code pages
- Phase 4: Navigation & Links — 4 dead links found, 52+6 missing search index entries
- Phase 5: Content Continuity — All counters accurate, zero banned content violations
- Phase 6: Security & CSP — 20 inline styles (18 in orphan animation-features.html), 0 inline scripts
- Phase 7: Accessibility — 296 missing aria-labels, 7 pages missing ADL, 17 heading hierarchy issues
- Phase 8: Performance — Scripts all deferred, DOM depth OK, 1 oversized unreferenced image

### Remediation Completed
- [x] **C2: 4 dead internal links fixed** — demo-ensembling.html, program-of-thought.html, image-prompting.html (x2)
- [x] **C4 partial: 2 of 6 comparison panel h2 fixes** — self-verification.html, self-refine.html changed to "See the Difference"
- [x] **C6: 296 aria-labels added** — Python batch script added `aria-label="Main navigation"` (149 files) and `aria-label="Breadcrumb"` (147 files)

### Files Modified
- `learn/demo-ensembling.html` (dead link fix)
- `learn/program-of-thought.html` (dead link fix)
- `learn/modality/image/image-prompting.html` (2 dead link fixes)
- `learn/self-verification.html` (comparison h2 fix)
- `learn/self-refine.html` (comparison h2 fix)
- 149 HTML files (aria-label additions via batch script)
- `.claude/HANDOFF.md`, `.claude/COMPLETED.md`, `.claude/plans/FrameworkOverhaul.md`, `.claude/testing-procedures.md`

---

## Session 53 (2026-02-07)
**Site Audit System Created + Mega-Menu Tab Layout Change**

### Site Audit System
- Created `.claude/testing-procedures.md` — 9-phase comprehensive audit playbook
- Living document with trigger prompt for repeatable audits

### Mega-Menu Tab Layout Change
- Getting Started + In-Context Learning paired side-by-side in first row (desktop, CSS-only)
- `styles.css` lines 6140-6186, tab column widened 190px->240px

### Known Issues Identified (Pre-Audit)
- Format errors: self-verification.html, self-refine.html custom comparison h2s
- Inline styles: pages/security.html, pages/performance.html, pages/animation-features.html
- Orphaned files: nul, _mmi_temp.html, mot_new.html, analogical-reasoning-new.html, graph-of-thought-new.html, animation-features.html

---

## Session 52 (2026-02-07)
**Phase 4D Framework Matcher COMPLETE -- Phase 4 Site Integration FULLY COMPLETE (4/4)**

### Framework Matcher Updates (tools/matcher.html + app.js)
- Expanded METHOD_PROFILES from 5 to 15 representative frameworks covering all 13 categories
- Added 10 new entries: Chain-of-Thought, Tree of Thought, Self-Refine, Self-Consistency, Few-Shot Learning, Code Prompting, Image Prompting, Audio Prompting, Video Prompting, 3D Prompting
- Updated analyzeTask() with characteristic matching for modality detection, reasoning patterns, decomposition, self-correction, ensemble, and ICL patterns
- Updated generateReasoning() with context-aware reasoning for all new categories
- Expanded Quick Method Guide HTML from 5 to 15 entries covering all 13 framework categories
- Fixed CTA typo: "frameworkologies" -> "frameworks"

---

## Session 51 (2026-02-07)
**Phase 3E 3D/Spatial COMPLETE -- Phase 3 Modality Frameworks FULLY COMPLETE (37/37)**

### Phase 3E -- 3D/Spatial (5 pages)
- 3d-prompting.html (920 lines) -- 3D Prompting Basics, 2023
- 3d-model-gen.html (920 lines) -- 3D Model Generation, 2022
- scene-understanding.html (920 lines) -- Scene Understanding, 2023
- pose-estimation.html (923 lines) -- Pose Estimation Prompting, 2017
- point-cloud.html (926 lines) -- Point Cloud Prompting, 2017

### Integration
- Navigation: 149 HTML files updated with new 3D tab (data-tab="3d", 13th mega-menu tab)
- Search index: 5 new entries in data/search-index.json (subcategory: "3D")
- Discover Hub: 3D (5) filter button + 5 new cards in learn/index.html
- Modality Hub: Replaced "Coming Soon" section with 5 real 3D cards in learn/modality/index.html
- Homepage: Counter 96+ -> 101+
- Nav script: update_nav_3d.py (inserts after data-tab="video" section)

---

## Session 50 (2026-02-07)
**Phase 3D Code/Structured COMPLETE**

### Phase 3D -- Code/Structured (5 new pages)
- program-synthesis.html (920 lines) -- Program Synthesis, 2021
- code-explanation.html (925 lines) -- Code Explanation, 2022
- code-review.html (920 lines) -- Code Review Prompting, 2022
- test-generation.html (919 lines) -- Test Generation, 2022
- sql-generation.html (924 lines) -- SQL Generation, 2020

### Integration
- Navigation: 144 HTML files updated with 5 new Code links in existing code tab
- Search index: 5 new entries in data/search-index.json (subcategory: "Code")
- Discover Hub: Code filter 3->8, 5 new cards in learn/index.html
- Modality Hub: Code section 3->8 cards in learn/modality/index.html
- Homepage: Counter 91+ -> 96+
- Nav script: update_nav_code.py (adds links within existing data-tab="code" section)

---

## Session 49 (2026-02-07)
**Phase 3C Video COMPLETE**

### Phase 3C -- Video (6 pages)
- video-prompting.html (908 lines) -- Video Prompting Basics, 2023
- video-gen.html (910 lines) -- Video Generation Prompting, 2024
- temporal-reasoning.html (906 lines) -- Temporal Reasoning, 2023
- video-qa.html (910 lines) -- Video QA, 2023
- video-captioning.html (908 lines) -- Video Captioning, 2023
- video-editing.html (917 lines) -- Video Editing Prompting, 2024

### Integration
- Navigation: 139 HTML files updated with Video tab (data-tab="video")
- Search index: 6 new entries in data/search-index.json
- Discover Hub: Video filter button + 6 cards in learn/index.html
- Modality Hub: Video section added, removed from Coming Soon
- Homepage: Counter 85+ -> 91+

---

## Session 48 (2026-02-07)
**Mega-Menu Tabbed Redesign + Phase 3B Audio/Speech COMPLETE**

### Phase 3B — Audio/Speech (6 pages)

- [x] **6 Audio framework pages created** (parallel background agents, 896-906 lines each):
  - `learn/modality/audio/audio-prompting.html` — Audio Prompting Basics
  - `learn/modality/audio/stt-prompting.html` — Speech-to-Text Prompting
  - `learn/modality/audio/tts-prompting.html` — Text-to-Speech Prompting
  - `learn/modality/audio/audio-classification.html` — Audio Classification
  - `learn/modality/audio/music-gen.html` — Music Generation Prompting
  - `learn/modality/audio/voice-cloning.html` — Voice Cloning Prompting

- [x] **Mega-menu nav updated** — `update_nav_audio.py` added Audio section (data-tab="audio") to 133 files
- [x] **Search index updated** — 6 audio entries added to `data/search-index.json`
- [x] **Discover hub updated** — Audio filter button + 6 cards in `learn/index.html`
- [x] **Modality hub updated** — Audio section in `learn/modality/index.html`
- [x] **Homepage counter** — 79+ to 85+ frameworks

### Mega-Menu Tabbed Categories Redesign COMPLETE (Steps 2-6)

- [x] **Mobile CSS overrides** — Added tabbed-specific mobile accordion styles in `styles.css`:
  - `.mega-menu--tabbed` overrides generic mobile grid to block layout
  - Hides desktop tab column, shows h4 as tappable accordion headers with +/- indicators
  - Links hidden by default, shown on `.is-expanded`
  - Single-expand accordion mode

- [x] **TabbedMenu JS object** — Added after `AccordionNav.init()` in `app.js`:
  - Generates tab `<button>` elements at runtime from each `[data-tab]` section's `<h4>` text
  - Desktop: `mouseenter` switches active panel, click fallback
  - Mobile: h4 click toggles accordion (single-expand)
  - Keyboard: Arrow keys (roving tabindex), Home/End, full ARIA tab pattern

- [x] **index.html manual conversion** — Converted Discover mega-menu to tabbed format for testing

- [x] **Batch conversion script** — `update_nav_tabbed.py`:
  - Converts first `mega-menu--multi-column` to `mega-menu--tabbed` in each file
  - Inserts empty tablist div, adds `data-tab="slug" role="tabpanel"` to sections
  - Handles both `&amp;` and `&` variants for Reasoning & CoT
  - Resources menu left unchanged

- [x] **Batch execution** — 127 files converted across depths 0/1/2/3, 0 errors
  - Fixed `Reasoning & CoT` unescaped ampersand issue (120 files patched)
  - All 124 production files verified with exactly 10 data-tab sections

- [x] **Documentation updated** — SiteFrameworks.md navigation architecture rewritten for tabbed system

---

## Session 47 (2026-02-07)
**Glossary Inline Search COMPLETE + Mega-Menu Redesign Started**

- [x] **Glossary Inline Search** — Full implementation:
  - HTML search container added to `pages/glossary.html` (below A-Z sticky nav)
  - ~150 lines CSS in `styles.css`: sticky search bar (top: 128px, z-index: 500), results dropdown (z-index: 9000), highlight pulse animation
  - ~250 lines JS in `app.js`: `initGlossarySearch()` with 8-tier scoring algorithm (exact name, acronym, normalized match, starts-with, word boundary, substring, definition match), `extractAcronym()` for parenthetical acronyms, `normalizeForMatch()` for hyphen/space normalization
  - Scroll fix: Temporarily forces all 26 glossary sections to `contentVisibility = 'visible'` before measuring position (solves `content-visibility: auto` placeholder height issue), double-rAF for layout reflow, restores after 1.5s
  - Keyboard navigation: ArrowUp/Down through results, Enter to select, Escape to close
  - Dynamic placeholder updates count after glossary loads
  - CSP compliant: zero inline styles, zero inline scripts
  - Documented in `SiteFrameworks.md`

- [x] **Mega-Menu Redesign Plan** — Designed tabbed categories approach:
  - Plan file: `.claude/plans/valiant-foraging-balloon.md`
  - User chose Option B (Tabbed Categories / Progressive Disclosure) over Option A (Hub-First)
  - Desktop: 680px panel with left tabs (190px) + right content panel
  - Mobile: accordion with collapsible category headers

- [x] **Mega-Menu CSS (Step 1/6)** — Added to `styles.css`:
  - `.mega-menu--tabbed` container, `.mega-menu-tabs` column, `.mega-menu-tab` buttons
  - Desktop: flex layout, active left-border indicator, hover/active states
  - Mobile: accordion with chevron `::after` indicators, `.is-expanded` show/hide
  - Dark mode + scrolled header variants
  - CSS is inert — no HTML elements use the class yet

**Quality Checks Passed:** 0 inline styles, 0 inline scripts, glossary search tested on desktop + mobile.

---

## Session 46 (2026-02-07)
**Phase 3A Image Prompting COMPLETE (12/12) + Modality Hub + Full Integration**

- [x] **Session 45 Committed & Pushed** (`4bc69f5`):
  - All Phase 2 work (52/52 text frameworks) committed and pushed to remote

- [x] **12 Image Prompting Pages Created** (parallel background agents, 867-892 lines each):
  - `learn/modality/image/image-prompting.html` (883 lines) — Image Prompting Basics, 2023
  - `learn/modality/image/multimodal-cot.html` (878 lines) — Multimodal CoT, 2023 by Zhang et al.
  - `learn/modality/image/visual-cot.html` (884 lines) — Visual Chain of Thought, 2023
  - `learn/modality/image/image-as-text.html` (875 lines) — Image-as-Text Prompting, 2023
  - `learn/modality/image/vqa.html` (867 lines) — Visual Question Answering, 2015/2023
  - `learn/modality/image/image-gen-prompting.html` (879 lines) — Image Generation Prompting, 2022
  - `learn/modality/image/negative-prompting.html` (892 lines) — Negative Prompting, 2022
  - `learn/modality/image/controlnet-prompting.html` (892 lines) — ControlNet Prompting, 2023
  - `learn/modality/image/inpainting-prompting.html` (881 lines) — Inpainting Prompting, 2022
  - `learn/modality/image/style-transfer.html` (878 lines) — Style Transfer Prompting, 2015/2022
  - `learn/modality/image/image-to-image.html` (880 lines) — Image-to-Image Prompting, 2022
  - `learn/modality/image/composition-prompting.html` (881 lines) — Composition Prompting, 2023
  - All 13 sections, zero inline styles/scripts, historical context notices on all pages

- [x] **Modality Hub Page Created** (`learn/modality/index.html`):
  - Image Prompting section (12 cards), Code section (3 cards), Coming Soon (Audio, Video, 3D)
  - Full nav, footer, back-to-top, CTA

- [x] **Mega-Menu Navigation Updated** (127 HTML files via `update_nav_s46.py`):
  - New "Image" section with 12 links added after "Code" section
  - All 4 depth levels verified (root, one-deep, two-deep, three-deep)

- [x] **Search Index Updated** — 13 new entries added to `data/search-index.json` (12 image + 1 hub)

- [x] **Discover Hub Updated** (`learn/index.html`):
  - 12 new Image Prompting framework cards added in new section
  - Filter bar: +Image (12) button
  - Meta description: 62+ -> 79+

- [x] **Homepage Updated** (`index.html`):
  - Counter: 67+ -> 79+ frameworks
  - CTA text: "View All 79+ Frameworks"
  - Subtitle: "79+ proven prompting methodologies"

**Quality Checks Passed:** 0 inline styles, 0 inline scripts, 0 external resources, historical context on all 12 pages, 867-892 lines per page.

---

## Session 45 (2026-02-07)
**Phase 2 Text Frameworks COMPLETE (52/52) — Final 5 pages + full site integration**

- [x] **5 Framework Pages Created** (parallel background agents, 870-907 lines each):
  - `learn/many-shot.html` (891 lines) — Many-Shot Prompting, 2024 by Agarwal et al., Google DeepMind
  - `learn/example-ordering.html` (871 lines) — Example Ordering, 2022 by Lu et al.
  - `learn/self-generated-icl.html` (873 lines) — Self-Generated ICL, 2022 by Kim et al.
  - `learn/active-example.html` (873 lines) — Active Example Selection, 2023
  - `learn/uncertainty-cot.html` (907 lines) — Uncertainty-Routed CoT, 2023 by Wang et al.
  - All 13 sections, zero inline styles/scripts, historical context notices on all pages

- [x] **Mega-Menu Navigation Updated** (111 HTML files via `update_nav_s45.py`):
  - In-Context Learning section: +4 links (Many-Shot, Example Ordering, Self-Generated ICL, Active Example)
  - Reasoning & CoT section: +1 link (Uncertainty-Routed CoT)
  - All 3 depth levels verified (root, one-deep, two-deep)

- [x] **Search Index** — 5 new entries added to `data/search-index.json`

- [x] **Discover Hub** (`learn/index.html`) — 5 new framework cards, filter counts: ICL 9->13, CoT 14->15

- [x] **Category Pages Updated**:
  - `learn/in-context-learning.html` — count 9->13, +4 cards, +4 comparison table rows, meta desc updated
  - `learn/reasoning-cot.html` — count 14->15, +1 card, +1 comparison table row, meta desc updated

- [x] **Homepage** (`index.html`) — Counter 62+->67+, CTA "View All 67+ Frameworks"

**Quality Checks Passed:** 0 inline styles, 0 inline scripts, 0 external resources across all 5 new pages.

---

## Session 44 (2026-02-07)
**UI Refinements + Handoff Prep**

- [x] **AI Foundations Title** (`9847fc9`) — Changed h1 to "The History of Modern AI"
- [x] **Homepage Hero Button** (`9847fc9`) — Changed "AI for Everybody" button to "Framework Library"
- [x] **Desktop Mega-Menu Centering** (`26701b1`, `615d25a`, `e522503`) — Discover menu viewport-centered, Resources menu nav-link-centered

---

## Session 42 (2026-02-07)
**Discover Hub — Phases 1-3 Implementation**

- [x] **Phase 1 — Batch Renames** (commit `32d7351`)
  - Renamed "Advanced Techniques" → "Prompting Strategies" in 101 mega-menu headers
  - Renamed "Learn" → "Discover" in 102 nav links, 68 breadcrumbs, 101 footer headings
  - Updated homepage category card title + link text
  - Updated app.js search index (comment, title, description, URL)
  - Fixed content reference in prompt-basics.html
  - Used Python batch scripts (`batch_rename_phase1.py`, `batch_rename_phase1b.py`)
  - Verified: 0 remaining "Advanced Techniques", 0 `<h4>Learn</h4>`, 0 `>Learn</a>`
  - 104 files changed

- [x] **Phase 2 — Discover Hub** (commit `4d296ba`)
  - Redesigned `learn/index.html` from 11-card "Learn" page to full Discover hub (1,093 lines)
  - Hero: "Discover 62+ Frameworks" with breadcrumb
  - Sticky quick-filter row with 8 category anchor links
  - 8 category sections with 63 framework cards (name, year, description, status badge)
  - Framework Finder comparison table expanded to 7 rows
  - Updated CTA: "Start with the Basics"
  - Added ~120 lines CSS: `.discover-filters`, `.discover-grid`, `.discover-card`, `.discover-category__count`, `.discover-category__link`, `[id^="cat-"]` scroll-margin-top, responsive breakpoints
  - 2 files changed (learn/index.html, styles.css)

- [x] **Phase 3 — 7 Category Landing Pages** (commit `0eb604e`)
  - Created 7 new pages via Python generation script (`build_category_pages.py`):
    - `learn/structured-frameworks.html` (5 frameworks, 503 lines)
    - `learn/reasoning-cot.html` (14 frameworks, 638 lines)
    - `learn/decomposition.html` (7 frameworks, 533 lines)
    - `learn/self-correction.html` (7 frameworks, 533 lines)
    - `learn/in-context-learning.html` (9 frameworks, 563 lines)
    - `learn/ensemble-methods.html` (7 frameworks, 533 lines)
    - `learn/prompting-strategies.html` (11 frameworks, 593 lines)
  - Each page includes: hero with breadcrumbs, category overview, framework card grid with status badges, 5-column comparison table (Framework/Year/Best For/Key Strength/Complexity), related categories section, CTA with recommended starting framework
  - Added `.category-overview` CSS component
  - 8 files changed (7 new HTML + styles.css)

- [x] **Bugfix — Code Modality Paths** (commit `a697128`)
  - Fixed broken relative paths in 3 code modality pages (`learn/modality/code/`)
  - Pages are 3 levels deep but had 2-level `../../` prefixes instead of `../../../`
  - 363 path corrections across 3 files (CSS, JS, favicon, nav links)

- [x] **Phase 4 — Homepage + Mega-menu Link Updates** (commit `a8f8df0`)
  - Updated 6 homepage category card `href` values to category landing pages
  - Made all 7 mega-menu `<h4>` category headers clickable links across 108 pages
  - Correct relative paths per directory depth: root (`learn/`), learn/ (``), tools/pages/etc. (`../learn/`), learn/modality/code/ (`../../`)
  - Added `.mega-menu-section h4 a` CSS to inherit h4 styling (color, text-transform, letter-spacing)
  - 110 files changed

## Session 43 (2026-02-07)
**Discover Hub — Phase 5 Completion**

- [x] **Phase 5 — Search Index + Metadata Updates** (commit `b1c922d`)
  - Added 8 new entries to `data/search-index.json`: Discover hub page + 7 category landing pages (structured-frameworks, reasoning-cot, decomposition, self-correction, in-context-learning, ensemble-methods, prompting-strategies)
  - Renamed all 30 `"category": "Learn"` entries to `"category": "Discover"` in search-index.json
  - Updated app.js: category order array, CATEGORY_ICONS key, search modal quick link label, command palette entry title, and section comment — all from "Learn" to "Discover"
  - Verified: 0 remaining "Learn" category references in search-index.json or app.js
  - Total search index: 2,226 entries (was 2,218)
  - 2 files changed (app.js, data/search-index.json)

## Session 44 (2026-02-07)
**UI Refinements — Content Updates + Desktop Mega-Menu Overhaul**

- [x] **AI Foundations Title Change** (commit `9847fc9`)
  - Changed h1 in `foundations/index.html` from "The History of AI Communication" to "The History of Modern AI"

- [x] **Homepage Hero Button** (commit `9847fc9`)
  - Changed "AI for Everybody" button to "Framework Library" linking to `learn/index.html`
  - Homepage only (not other pages)

- [x] **Desktop Mega-Menu Overhaul** (commits `26701b1`, `615d25a`, + uncommitted CSS)
  - Removed 2-column grid within each category section — single-column links per category
  - Categories remain in single horizontal row across the top of the menu
  - Discover menu (9 categories): viewport-centered using `left: 0; right: 0; margin-left: auto; margin-right: auto` within `.header-container` (`max-width: 1400px; margin: 0 auto; position: relative`)
  - Resources menu (4 sections): centered under its "Resources" nav link using `:last-child` override with `left: 50%; translateX(-50%)`
  - `.nav-item.has-dropdown:has(.mega-menu--multi-column)` gets `position: static` to allow centering within `.header-container`
  - `.nav-item.has-dropdown:last-child:has(.mega-menu--multi-column)` gets `position: relative` override to center Resources under its link
  - All desktop dropdown menus appear at the same vertical height
  - CSS changes in `styles.css` around lines 5990-6040
  - 1 file changed (styles.css)

---

## Session 41 (2026-02-07)
**Learning & Documentation Session — No Code Changes**
- [x] Deep dive into entire codebase: glossary lazy loading, search-to-glossary flow, URL resolution, component library, design tokens, navigation architecture, neural network canvas, accessibility dashboard
- [x] Created `.claude/SiteFrameworks.md` (1,041 lines) — comprehensive "soul of the project" document
  - Covers WHY behind every architectural decision (lazy loading, DOM API over innerHTML, single-file principle, CSP compliance, `resolveInternalUrl()`, anchor offset pattern, etc.)
  - Full search-to-glossary flow walkthrough (step-by-step from any page)
  - Complete component library reference with BEM classes
  - Design token system documentation
  - 13-section framework template breakdown
  - Critical rules with session origins
- [x] Commit: `c49e78b` — docs: Add SiteFrameworks.md
- [x] Updated HANDOFF.md, COMPLETED.md, FrameworkOverhaul.md for handoff

**No implementation phases started.** Discover Hub Phases 1-5 remain pending.

---

## Completed Phases

### Phase 0: Fix Prompt Analyzer - COMPLETED
- [x] Natural language pattern library built
- [x] Detection engine updated
- [x] Scoring algorithm simplified (detected/total = score)
- [x] Feedback display updated
- [x] Manual verification passing

### Phase 1: Badge Relocation & Text Updates - COMPLETED

| Task | Status | Notes |
|------|--------|-------|
| 1.1 Remove header badges (desktop) | Done | All HTML files updated |
| 1.2 Remove mobile accordion badges | Done | All HTML files updated |
| 1.3 Add content badges to Home page | Done | Between title and subtitle |
| 1.4 Add content badges to Learn page | Done | In dark page-hero section |
| 1.5 Add content badges to other pages | Done | All 18 pages updated |
| 1.6 Text: "AI Assisted Building" | Done | Badge text corrected |
| 1.7 Hero text update | Done | "Master the Art of AI Interactions" |
| 1.8 Darken learning content backgrounds | Done | Text colors darkened, CTA text lightened |
| 1.10a Navigation menu reorganization | Done | Moved items to AI Readiness menu |
| 1.11 Acronym card accent styling | Done | Thickened left-side accents from 5px to 7-8px |
| 1.12 Method comparison text styling | Done | Bold + red keyword styling in tip callouts |
| 1.13 Method use-case guidance | Done | Added "Better Use Cases" callouts |
| 1.14 Site messaging audit | Done | Growth mindset language throughout |
| 1.15 Visual consistency audit | Done | CSS Grid for cards, animated gradients |
| 1.16 GitHub badge | Done | Added to all badge bars |
| 1.17 ADL Accessibility Dashboard | Done | Floating panel with text size, contrast, dimming |
| 1.18 Prompt Analyzer Enhancement | Done | Granular methodology scoring, bonuses up to 130% |
| 1.19 Site-Wide Visual Continuity Audit | Done | Consistent fonts, colors, spacing |
| Neural CTA backgrounds | Done | Added to 12 pages |
| Hero title enlargement | Done | 2.5/3.5/4rem responsive sizes |
| CRISPE Builder fix | Done | Example field now required |
| Animation stability fix | Done | Delta time capping + visibility handler |
| Back-to-top bar | Done | Full-width white bar, black text, arrow icon |
| Site badges bar (footer) | Done | Full-width dark bar with all badges |
| Reference text styling | Done | `<em>` in disclaimers now bold, blue, larger |
| Footer gap fix | Done | Explicit margin/padding/border resets |
| Anatomy cards enhancement | Done | Colored borders, shadows, hover effects |
| Build-step enhancement | Done | Added shadows, improved hover states |
| Scenario tabs enhancement | Done | Card wrapper with border and shadow |

### Phase 2: Natural Language Content - COMPLETED
- [x] Added "Two Approaches, Same Results" sections to all methodology pages
  - prompt-basics.html, crisp.html, crispe.html, costar.html, react.html
  - Side-by-side comparison of labeled vs natural language formats
- [x] Prompt Builder format toggle (labeled vs natural language output)
- [x] ReAct equation card layout fix (left-aligned flexbox)

### Phase 3: Accordion Content Structure - COMPLETED
- [x] Accordion CSS component (details/summary based)
- [x] learn/crisp.html - C, R, I, S, P accordions
- [x] learn/crispe.html - C, R, I, S, P, E accordions
- [x] learn/costar.html - C, O, S, T, A, R accordions
- [x] learn/advanced.html - Technique accordions
- [x] Expand All / Collapse All controls
- [x] Deep link support
- [x] Keyboard accessibility

### Phase 4: Search Tags & Metadata - COMPLETED
- [x] Search index schema defined (id, title, category, subcategory, keywords, excerpt, url)
- [x] 193 Glossary terms indexed (expanded from 48)
- [x] 25+ Learn page sections indexed
- [x] 6 Tools indexed
- [x] 9 Patterns indexed
- [x] 15+ FAQ entries indexed
- [x] 6 Resource pages indexed
- [x] Search API exposed via window.PraxisSearch
- [x] Total: 250+ searchable entries

### Phase 5: Search UI Implementation - COMPLETED
- [x] Search modal with Cmd+K / Ctrl+K keyboard shortcuts
- [x] Search trigger button in header (aligned with navigation)
- [x] Results grouped by category (Learn, Tools, Glossary, Patterns, FAQ, Resources)
- [x] Keyboard navigation (arrows, Enter, Escape)
- [x] Highlighted matches in excerpts
- [x] Help panel with category badges and quick guide
- [x] Mobile-friendly 720px max-width modal
- [x] Focus trap and accessibility compliance
- [x] Cross-platform OS detection (macOS vs Windows shortcuts)

### Comprehensive AI Glossary Expansion - COMPLETED
- [x] Expanded from 48 terms to 193 terms (4x increase)
- [x] Full A-Z navigation (all 26 letters now have entries)
- [x] New letter sections added: D, E, I, J, K, O, Q, U, V, W, X
- [x] Categories covered: Core Concepts, Architecture, Training, Safety, Products, Companies, Techniques, NLP Tasks, Metrics, Hardware, Ethics
- [x] All 193 terms indexed in search

### Additional Completed Work
- [x] AI Readiness Quiz redesign (40 questions, 4 levels, 3-strikes mechanic)
- [x] Scorer algorithm documentation (.claude/scorer-algorithm.md)
- [x] Analyzer example scores fixed (26, 74, 100)
- [x] Method Matcher tool reinstated (renamed from Method Recommender)
- [x] "Level Up Your Score" section added to Prompt Analyzer
- [x] Animated gradients for dark sections site-wide

---

## Session Work Logs (Archived)

### Sessions 39-40 (2026-02-07)
**Homepage Redesign + Search Modal Fix + Discover Hub Planning**

**Homepage Redesign (commit `d5bce3f`):**
- Replaced all `<main>` content in `index.html` with 6 new sections
- Section 1: Library at a Glance — counter-grid (62+ Frameworks, 2,141+ Glossary Terms, 12 Tools, 100% Free)
- Section 2: Explore Frameworks by Category — 6 icon-box cards with category counts
- Section 3: Interactive Tools — 6 icon-box cards (expanded from 3)
- Section 4: AI Foundations & Glossary — split-section with feature-list + highlight-box
- Section 5: Why Praxis — split-section with feature-list--check + ND highlight-box (no emoji)
- Section 6: Getting Started CTA — cta-corporate--gradient with quiz + basics buttons
- All existing CSS components reused, zero new CSS needed
- Quality checks: 0 inline styles, 0 inline scripts, 0 emoji, 0 external resources

**Search Modal Height Fix (commit `3cf8860`):**
- styles.css `.search-modal`: changed `top: 5%; max-height: 88vh` → `top: 10%; min-height: 80vh; max-height: 80vh`
- Modal now consistently 80% of viewport height

**Discover Hub + Category Pages Plan (Session 40):**
- Created `.claude/plans/discover-hub-category-pages.md` — 5-phase plan
- User confirmed decisions:
  - "Advanced Techniques" → "Prompting Strategies" (category rename)
  - "Learn" → "Discover" (nav link rename, all 100 files)
  - All 62+ cards visible on Discover hub, grouped by category
  - Flat file structure for category pages (`learn/reasoning-cot.html`)
- 7 category landing pages planned
- Plan approved, ready for implementation

**Files:** index.html, styles.css, HANDOFF.md, COMPLETED.md, discover-hub-category-pages.md (new), FrameworkOverhaul.md

### Session 38 (2026-02-07)
**Part B — Full Navigation Update (100 files) + Homepage Redesign Plan**
- Python batch script (`update_nav.py`) updated header, footer, and `<head>` across ALL 100 HTML files
- Expanded mega-menu from ~47 to 65 links (62 framework + 3 code) organized into 9 categories:
  - Getting Started (2), Structured Frameworks (5), In-Context Learning (9)
  - Reasoning & CoT (14), Decomposition (7), Self-Correction (7)
  - Ensemble Methods (7), Advanced Techniques (11), Code (3)
- Correct active nav-link per directory (learn→Learn, tools→AI Readiness, pages→Resources, foundations→AI Foundations, neurodivergence→Resources, root→none)
- Correct relative paths for 3 depth levels (root, one-deep `../`, two-deep `../../`)
- `<head>` cleanup: removed all CSP meta, referrer meta, preload links; normalized viewport
- Canonical footer with updated Learn links across all pages
- Quality checks: 0 CSP meta, 0 preload, 0 referrer, 0 inline styles in learn/
- Homepage redesign plan created and approved (6 sections) — not yet implemented
- Files: 100 HTML files, HANDOFF.md, FrameworkOverhaul.md

### Session 37 (2026-02-07)
**Part A — 22-Page 13-Section Redesign (4 Waves) + HR Content Cleanup**
- Commit: `17009ee`
- Wave A — Foundation Frameworks (6 pages): chain-of-thought (827), few-shot-learning (818), zero-shot (816), one-shot (825), role-prompting (818), self-consistency (829)
- Wave B — Structured Frameworks (6 pages): crisp (861), crispe (869), costar (892), constrained-output (833), context-structure (875), prompt-chaining (845)
- Wave C — Advanced Techniques (5 pages): tree-of-thought (858), plan-and-solve (857), least-to-most (853), example-selection (829), shot-prompting (834)
- Wave D — Flagship Pages (5 pages): react (859), flipped-interaction (848), prompt-basics (840), zero-shot-cot (840), facts-fictions (834)
- HR/Remote Work Content Cleanup — Removed all HR/remote work examples from ~15 pages, replaced with tech/science/education examples
- AI For Everybody Update — Updated "Who Praxis Serves" text per user request
- Quality checks: 0 inline styles, 0 inline scripts, 0 CSP meta tags, all 13 sections verified

### Session 36 (2026-02-07)
**Wave 6 — Style & Emotion: Full Redesign (6 pages)**
- Commit: `8b9e87d`
- Redesigned all 6 pages to 13-section template:
  - emotion-prompting.html, style-prompting.html, s2a.html, re2.html, cosp.html, rar.html
- All 13 sections, zero inline styles/scripts, historical context notices
- Quality checks: 0 CSP violations, all sections verified

### Session 35 (2026-02-07)
**Wave 5 — Example Methods: Full Redesign (7 pages)**
- Redesigned all 7 pages from ~290 lines to 844-863 lines using 13-section template
- active-prompting.html (863 lines) — Active Learning, 2023 by Diao et al.
- knn-prompting.html (845 lines) — Example Selection, 2022 by Xu et al.
- vote-k.html (854 lines) — Active Learning, 2022 by Su et al.
- demo-ensembling.html (856 lines) — Ensemble Methods, 2022
- diverse-prompting.html (849 lines) — Ensemble Methods, 2022 by Li et al.
- dense-prompting.html (846 lines) — Prompt Design, 2023
- prompt-mining.html (844 lines) — Prompt Automation, 2022 by Jiang et al.
- Quality checks: 0 inline styles, 0 inline scripts, 0 external resources, all 13 sections present
- 7 background agents used for parallel page generation

### Session 34 (2026-02-06)
**Wave 4 — Advanced Reasoning: Full Redesign (7 pages)**
- Redesigned all 7 pages from ~290 lines to 830-850 lines using 13-section template
- analogical-reasoning.html (839 lines) — Thought Generation, 2023 by Yasunaga et al.
- meta-reasoning.html (836 lines) — Strategy Selection, 2024 by Xu et al.
- thread-of-thought.html (850 lines) — Long Context Processing, 2023 by Zhou et al.
- memory-of-thought.html (847 lines) — Memory Systems, 2023 by Li et al.
- simtom.html (849 lines) — Perspective Taking, 2023 by Wilf et al.
- max-mutual-info.html (830 lines) — Example Selection, 2022
- universal-self-consistency.html (846 lines) — Ensemble Methods, 2023 by Chen et al.
- Quality checks: 0 inline styles, 0 inline scripts, 0 external resources, all 13 sections present

### Session 33 (2026-02-06)
**Critical Bug Fix: Universal URL Resolution**
- Commit: `8fda121`
- Created `resolveInternalUrl()` universal path resolver (app.js ~471)
- Fixed 10 locations where dynamic URLs were broken from subdirectory pages

**Search Modal Enhancements**
- Commits: `0d758a9`, `32ec056`
- 80% screen width modal, collapsible Quick Links, Glossary-first results
- Modal closes on result selection, same-page hash handling

**Wave 3 Comparison Panel Fix**
- Commit: `390715f`
- Updated 3 Wave 3 comparison panels to new structure + dark mode era-marker fix

### Session 14 (2026-02-01)
**Resource Pages Enhancement - Phase 1**
- Deleted pages/replit-guide.html and pages/ide-guide.html
- Removed Replit Guide and IDE Guide from navigation across all 29 HTML files
- Updated search index (PRAXIS_SEARCH_INDEX) to remove deleted pages
- Fixed quiz recommendation path (was pointing to deleted ide-guide)
- Created plan for comprehensive page enhancements: `.claude/plans/vivid-launching-goose.md`

**Files Deleted:**
- pages/replit-guide.html
- pages/ide-guide.html

**Files Modified:**
- All 29 HTML files (navigation cleanup)
- app.js (search index, quiz recommendations)

### Session 13 (2026-02-01)
**HANDOFF.md Cleanup & Resources Hub**
- Created `.claude/COMPLETED.md` archive file
- Cleaned up HANDOFF.md (moved completed items to archive)
- Added Pre-Push Cleanup instructions to CLAUDE.md
- Created pages/resources.html hub page with card sections
- Added resource card CSS components
- Updated all navigation links to point Resources to resources.html
- Added clickable quick links to search modal
- Added getSearchLinkPath() helper function for dynamic paths

**Files Created:**
- pages/resources.html
- .claude/COMPLETED.md

**Files Modified:**
- .claude/HANDOFF.md (streamlined)
- CLAUDE.md (added cleanup instructions)
- styles.css (resource card styles, search quick link styles)
- app.js (search quick links, path helper, search index)
- All 31 HTML files (Resources nav link update)

### Session 12 (2026-02-01)
**Phase 5: Search UI Implementation**
- Implemented Cmd+K / Ctrl+K search modal
- Cross-platform OS detection using `navigator.userAgentData` with fallback
- Search trigger button in header aligned with navigation
- Search modal features (720px max-width, 85vh height)
- CSS added (~250 lines) for search components

**Comprehensive AI Glossary Expansion**
- Expanded glossary from 48 to 193 terms
- Added 145 new AI/ML terms organized alphabetically
- Full A-Z coverage (all 26 letters now have entries)

**Files Modified:**
- app.js (search modal, trigger, navigation, glossary index expansion)
- styles.css (search UI components ~250 lines)
- pages/glossary.html (145 new terms, A-Z navigation update)

### Session 11 (2026-02-01)
**Quiz Redesign**
- Redesigned AI Readiness Quiz as level-based progression system
- 40 questions across 4 levels (10 each)
- Implemented 3-strikes game mechanic
- Added CSS for quiz game elements

**Analyzer Documentation**
- Created `.claude/scorer-algorithm.md`
- Fixed Example Analysis scores in analyzer.html

**Files Modified:**
- app.js (40 quiz questions, 3-strikes logic, level progression)
- styles.css (quiz game element styling)
- quiz/index.html (updated subtitle, level descriptions)
- tools/analyzer.html (fixed example scores)
- .claude/scorer-algorithm.md (new documentation file)

**Commit:** `d66bcfe` - feat: Level-based quiz with 3-strikes game mechanic + analyzer docs

### Session 10 (2026-02-01)
**Phase 2: Natural Language Content Updates**
- Fixed ReAct equation card layout (left-aligned flexbox)
- Added "Two Approaches, Same Results" sections to all methodology pages
- Implemented Prompt Builder format toggle
- Added approach-comparison CSS component

**Files Modified:**
- styles.css, app.js, tools/guidance.html
- learn/prompt-basics.html, crisp.html, crispe.html, costar.html, react.html

**Commits:** `540c17d` to `d0ee6a6`

### Session 9 (2026-02-01)
- Reinstated Method Recommender as "Method Matcher"
- Added "Level Up Your Score" section to Prompt Analyzer
- Extended animated gradient to all dark card sections

**Files Modified:**
- styles.css, tools/analyzer.html, tools/matcher.html, tools/index.html
- All 24 HTML files (Method Matcher navigation links)

### Session 8 (2026-02-01)
- Removed Method Recommender from all pages (later reinstated as Method Matcher)
- Task 1.15: Visual consistency audit - CSS Grid for cards
- Applied animated gradient to dark areas site-wide
- Task 1.19: Site-wide visual continuity audit

**Files Modified:**
- styles.css, tools/index.html, all 24 HTML files

### Session 7 (2026-02-01)
- Task 1.18: Prompt Analyzer Enhancement - Granular Methodology Scoring
- Added STRUCTURAL_BONUSES patterns
- Scores can now exceed 100% (max 130%)
- Added CSS for exceptional scores (purple gradient theme)

**Files Modified:**
- app.js, styles.css, .claude/HANDOFF.md

### Session 6 (2026-02-01)
- About page "Why Praxis?" section refined
- README.md header and subtitle updated

**Commit:** `1131dae`

### Session 5 (2026-02-01)
- Task 1.11: Acronym card accent styling
- Task 1.12: Method comparison text styling
- Task 1.13: Method use-case guidance for CRISP/CRISPE
- Task 1.14: Site messaging audit (growth mindset language)
- Neural animation terms: Replaced AI_TERMS with prompting technique terms

**Commit:** `28184e5`

### Session 4 (2026-01-31)
- Documented 8 new tasks from user's .docx file (Tasks 1.9-1.16)
- Created comprehensive MAJOR INITIATIVE: Neurodivergence + AI Resource Center
- Fixed border/line between back-to-top bar and badges bar
- Reduced back-to-top bar height by 20%
- Added new resource pages: ChatGPT Guide, Replit Guide, IDE Guide

**Commit:** `0c0ff1f`

### Session 3 (Earlier)
- Footer gap fix
- Anatomy cards, build-step, scenario tabs enhancements

---

## Growth Mindset Language Changes (Reference)

| Original | Replaced With |
|----------|---------------|
| "Weak Prompt" | "Basic Prompt" |
| "Strong Prompt" | "Enhanced Prompt" |
| "Strong X Example" | "Effective X Example" |
| "Best Use Cases" | "Better Use Cases" |
| "Not as strong at" | "Better suited for" |

---

*This archive is updated whenever completed tasks are moved from HANDOFF.md*
