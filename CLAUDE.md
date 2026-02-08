# Praxis Project Instructions

**This file is automatically read at the start of every Claude Code session.**

---

## Required Reading

Before making ANY changes, read these files:
1. `.claude/HANDOFF.md` - Current state, rules, and progress
2. `.claude/plans/praxis-enhancement-plan.md` - Master plan with all phases

---

## Pre-Push Cleanup (Required)

**Before every git push, perform this cleanup cycle:**

1. **Archive completed tasks** - Move finished items from `HANDOFF.md` to `COMPLETED.md`
2. **Update session number** - Increment the session count in HANDOFF.md header
3. **Update last commit** - Record the new commit hash in HANDOFF.md
4. **Keep HANDOFF.md lean** - Only active/pending work stays in HANDOFF.md

**Files:**
- `.claude/HANDOFF.md` - Current state only (lean)
- `.claude/COMPLETED.md` - Archive of all completed work

---

## Critical Rules (Always Follow)

### Security (A+ CSP Compliance)
- **NO inline styles** - Never use `style=""` in HTML
- **NO inline scripts** - Never use `onclick=""`, `onload=""`, or inline `<script>`
- **NO external resources** - No CDNs, Google Fonts, or external APIs
- **All styles in styles.css** - Single external stylesheet
- **All scripts in app.js** - Single external script with `defer`

### Performance (100% Score)
- Efficient, minimal code
- No render-blocking resources
- Remove all unused code

### Code Notation (Required)
```
HTML:  <!-- === SECTION === --> ... <!-- /SECTION -->
CSS:   /* === SECTION === */ ... /* Component ---- */
JS:    // === SECTION === ... /** JSDoc comments */
```

### Accessibility (WCAG AA)
- Meaningful alt text
- 4.5:1 color contrast
- Full keyboard navigation
- Proper heading hierarchy

### Anchor Link Standards (Content Visibility)
**Rule:** Anchor-linked content must always be visible below sticky headers/navigation.

**Implementation:**
- All anchor targets use `scroll-margin-top` in CSS
- Base offset: `100px` for standard pages (accounts for header)
- Glossary offset: `160px` for pages with sticky sub-navigation
- ID naming conventions:
  - `id="letter-X"` - Glossary letter sections
  - `id="term-X"` - Glossary terms
  - `id="section-X"` - Page sections

**CSS Pattern:**
```css
:target { scroll-margin-top: 100px; }
[id^="letter-"], [id^="term-"] { scroll-margin-top: 160px; }
```

### AI Ethics & Disclosure (Required)
- All prompt examples must model responsible AI use — no exceptions
- Examples should demonstrate verification of AI output
- No examples that encourage blind trust in AI responses
- AI disclosure best practices reflected in content
- Remind users to verify AI-generated content before use
- Respect that 48 US states have AI transparency requirements

---

## Prompt Management Rules


### Context Preservation Priority
1. Current task status and progress
2. Uncommitted code changes
3. Active file modifications
4. Recent error/debugging context
5. Session-specific decisions

---

## Workflow

1. Read HANDOFF.md for current task status
2. Confirm understanding before proceeding
3. Follow notation standards in all code
4. Update HANDOFF.md when completing tasks
5. Monitor prompt capacity and compact proactively

---

## Quick Reference

| File | Purpose |
|------|---------|
| `.claude/HANDOFF.md` | Current state & active tasks |
| `.claude/COMPLETED.md` | Archived completed work |
| `.claude/plans/praxis-enhancement-plan.md` | Full phase details |
| `styles.css` | ALL CSS (single file) |
| `app.js` | ALL JavaScript (single file) |
