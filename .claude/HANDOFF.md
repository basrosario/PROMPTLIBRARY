# Praxis Project Handoff Document

**Last Updated:** 2026-02-05 (Session 25)
**Last Commit:** 8e25360 - feat: Phase 2 start - zero-shot and zero-shot-cot framework pages
**Current Phase:** Framework Overhaul - Phase 2 HIGH PRIORITY COMPLETE

---

## CURRENT SESSION STATUS (Session 25)

### Completed This Session
- [x] Created `learn/self-refine.html` - Iterative improvement technique
- [x] Created `learn/self-verification.html` - Answer validation technique
- [x] Created `learn/modality/code/code-prompting.html` - Code generation strategies
- [x] Created `learn/modality/code/self-debugging.html` - AI-assisted debugging
- [x] Created `learn/modality/code/structured-output.html` - JSON/XML output generation
- [x] Created `learn/modality/code/` directory structure
- [x] Updated navigation mega-menu across ALL 48+ HTML files with new sections:
  - Added "Advanced" section (6 pages)
  - Added "Code" section (3 pages)
- [x] **ALL 12 HIGH PRIORITY PAGES NOW COMPLETE**

### Files Created (New)
| File | Description |
|------|-------------|
| `learn/self-refine.html` | Generate → Feedback → Refine iterative loop |
| `learn/self-verification.html` | Backward verification, constraint checking, sanity checks |
| `learn/modality/code/code-prompting.html` | Code task types, context strategies, prompt anatomy |
| `learn/modality/code/self-debugging.html` | Error-driven, trace-based, explanation debugging |
| `learn/modality/code/structured-output.html` | JSON/XML/YAML format prompting strategies |

### Navigation Updates (All 48+ HTML files)
New mega-menu structure under "Learn":
```
Learn
├── Getting Started
│   ├── Prompt Basics
│   └── Facts & Fictions
├── Frameworks (existing 12 links)
├── Advanced (NEW)
│   ├── Example Selection
│   ├── Least-to-Most
│   ├── Plan-and-Solve
│   ├── Tree of Thought
│   ├── Self-Refine
│   └── Self-Verification
└── Code (NEW)
    ├── Code Prompting
    ├── Self-Debugging
    └── Structured Output
```

### User Instructions Applied
- **NO CITATIONS** - Pages created without sources/references sections
- Citations will be added later if needed

---

## ACTIVE PROJECT: Framework Overhaul

**Master Plan:** `.claude/plans/FrameworkOverhaul.md`

**Overall Scope:**
- ✅ 33 glossary terms (Phase 1 COMPLETE)
- 🔄 52 text framework pages (Phase 2 IN PROGRESS - 12/52 HIGH priority complete)
- ⬜ 37 modality framework pages (Phase 3)
- ✅ Navigation updates for HIGH priority pages (Phase 4 partial)
- ✅ Navigation UX overhaul (Phase 5 COMPLETE)

### Phase 2 Progress: Text Frameworks (12/52)
```
Progress: [████░░░░░░░░░░░░░░░░] 23%
HIGH Priority: [████████████████████] 100%
```

**HIGH Priority COMPLETE (12 pages):**
1. ✅ zero-shot.html
2. ✅ zero-shot-cot.html
3. ✅ one-shot.html
4. ✅ example-selection.html
5. ✅ least-to-most.html
6. ✅ plan-and-solve.html
7. ✅ tree-of-thought.html
8. ✅ self-refine.html
9. ✅ self-verification.html
10. ✅ code-prompting.html (learn/modality/code/)
11. ✅ self-debugging.html (learn/modality/code/)
12. ✅ structured-output.html (learn/modality/code/)

### Immediate Next Steps (Resume Here)
1. **Continue with MEDIUM priority pages (25 pages)**
2. Or proceed to Phase 3: Modality Frameworks

---

## CRITICAL RULES - MUST FOLLOW

### 1. Security & CSP Compliance (A+ Rating)

**NEVER violate these rules:**
- **NO inline styles** - Never use `style=""` attributes
- **NO inline scripts** - Never use `onclick=""`, `onload=""`, or inline `<script>`
- **NO external resources** - No CDNs, Google Fonts, external APIs
- **All styles → styles.css** (single file)
- **All scripts → app.js** (single file with `defer`)

### 2. Citations (USER PREFERENCE)
- **NO CITATIONS ON FRAMEWORK PAGES** (per user request)
- Will be added later if needed

### 3. Code Notation
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
├── learn/                  # Framework pages
│   ├── zero-shot.html      # Session 24
│   ├── zero-shot-cot.html  # Session 24
│   ├── one-shot.html       # Session 25
│   ├── example-selection.html
│   ├── least-to-most.html
│   ├── plan-and-solve.html
│   ├── tree-of-thought.html
│   ├── self-refine.html
│   ├── self-verification.html
│   └── modality/
│       └── code/           # NEW directory
│           ├── code-prompting.html
│           ├── self-debugging.html
│           └── structured-output.html
├── data/
│   ├── glossary.json       # 33 prompting terms
│   └── search-index.json   # Site search data
└── .claude/
    ├── HANDOFF.md          # THIS FILE
    ├── COMPLETED.md        # Archived completed tasks
    └── plans/
        └── FrameworkOverhaul.md  # Master plan with session logs
```

---

## INTERACTIVE COMPONENTS AVAILABLE

| Component | CSS Class | Use For |
|-----------|-----------|---------|
| Tabbed comparisons | `.comparison-tabs` | Before/after demos |
| Accordions | `.accordion` | Expandable examples |
| Feature lists | `.feature-list` | Benefits with checkmarks |
| Stat cards | `.stat-card` | Key statistics |
| Highlight boxes | `.highlight-box` | Important callouts |
| Pillar cards | `.pillar-card` | Card grids |
| Timeline | `.timeline` | Sequential steps |

---

## REFERENCE

| Document | Purpose |
|----------|---------|
| `.claude/HANDOFF.md` | Current state (this file) |
| `.claude/plans/FrameworkOverhaul.md` | Master plan with full session logs |
| `learn/zero-shot-cot.html` | Reference template for interactive pages |

---

*Always read this file first when resuming work. Update FrameworkOverhaul.md frequently.*
