# Prompt Analyzer Scoring Algorithm

> **Technical Documentation**
> Last Updated: February 2026
> Version: 2.0 (Post-Pattern Enhancement)

---

## Overview

The Prompt Analyzer uses a multi-layered scoring system that evaluates prompts through:
1. **Signal Detection** - Pattern matching for prompt elements
2. **Sentence-Level Scoring** - Individual sentence analysis
3. **Score Aggregation** - Combining signals across sentences
4. **Framework Fit** - Measuring alignment with CRISP/COSTAR/CRISPE
5. **Final Score Calculation** - Weighted combination with structural bonuses

---

## 1. Signal Detection System

### Signal Structure

Each prompt element (context, role, instruction, etc.) has multiple detection signals:

```javascript
{
    name: 'signal_name',        // Unique identifier for debugging
    pattern: /regex/i,          // Regular expression to match
    weight: 0.0-1.0,            // Signal strength (1.0 = definitive)
    exclusive: true|false       // Strong standalone vs needs corroboration
}
```

### Weight Guidelines

| Weight | Meaning | Example |
|--------|---------|---------|
| 1.0 | Definitive match | `act as`, explicit labels like `Context:` |
| 0.9 | Very strong signal | `I run a`, `don't use`, `include X` |
| 0.8 | Strong signal | `expertise`, `act as [profession]` |
| 0.7 | Moderate signal | Business types, tone words |
| 0.6 | Supporting signal | Profession nouns, specialization phrases |
| 0.5 | Weak signal | Temporal markers, structure words |

### Exclusive vs Non-Exclusive

- **Exclusive (true)**: Strong standalone indicator. A single match with weight ≥0.7 produces high confidence.
- **Non-Exclusive (false)**: Needs corroboration from other signals to build confidence.

---

## 2. Sentence-Level Scoring

### Process Flow

```
Sentence → Structure Analysis → Signal Matching → Score Calculation
```

### Structure Analysis

Each sentence is analyzed for:
- **Type**: declarative, imperative, interrogative, exclamatory
- **Person**: first person (I/we), second person (you)
- **Features**: starts with verb, has quotes, has numbers

### Structural Bonuses

Each element type has position and structure preferences:

```javascript
structuralBonus: {
    declarative: 0.2,    // +20% for declarative sentences
    imperative: 0.3,     // +30% for imperative sentences
    firstPerson: 0.15,   // +15% for "I/we" sentences
    secondPerson: 0.2,   // +20% for "you" sentences
    positionEarly: 0.2,  // +20% if in first 30% of prompt
    positionMiddle: 0.1, // +10% if in middle 40%
    positionLate: 0.15   // +15% if in last 30%
}
```

### Score Calculation Logic

```javascript
// For each sentence, per element type:

1. Match all signals and sum weighted scores
2. Apply structural bonuses (multiply by 1 + bonus)
3. Determine final score based on match quality:

if (hasStrongExclusive) {
    // Single strong exclusive match = full score (capped at 100)
    finalScore = Math.min(100, totalScore);
} else if (signalCount >= 2) {
    // Multiple weak signals = average with 20% bonus
    finalScore = Math.min(100, (totalScore / signalCount) * 1.2);
} else if (signalCount === 1) {
    // Single weak signal = 80% of score
    finalScore = Math.min(100, totalScore * 0.8);
} else {
    finalScore = 0;
}
```

### Confidence Levels

| Confidence | Criteria |
|------------|----------|
| High | Strong exclusive match OR score > 60 |
| Medium | Score > 30 OR 2+ signal matches |
| Low | Below medium threshold |

---

## 3. Score Aggregation

### Thresholds

```javascript
SENTENCE_SCORE_THRESHOLD = 15   // Min score to contribute
DETECTION_THRESHOLD = 20        // Min aggregate to detect element
```

### Aggregation Process

```
1. Filter sentences with score > SENTENCE_SCORE_THRESHOLD
2. Apply position multipliers (early/middle/late preferences)
3. Calculate weighted average across contributing sentences
4. Mark as detected if: aggregate > DETECTION_THRESHOLD OR excerpts exist
```

### Position Multipliers

Elements have preferred positions:
- **Context**: Bonus for early position
- **Instructions**: Bonus for middle position
- **Parameters**: Bonus for late position

---

## 4. Framework Fit Calculation

### Framework Element Mapping

| Framework | Required Elements |
|-----------|-------------------|
| CRISP | context, role, instruction, specifics, parameters |
| COSTAR | context, instruction, tone, audience, specifics |
| CRISPE | context, role, instruction, specifics, parameters, examples |

### Coverage Calculation

```javascript
coverage = detectedElements / totalRequiredElements
frameworkScore = coverage * 100
```

---

## 5. Final Score Calculation

### Base Score Components

```javascript
baseScore = Math.min(100,
    frameworkScore * 0.45 +          // Framework coverage (45%)
    avgElementScore * 0.25 +          // Element confidence (25%)
    structuralScore * 0.20 +          // Core elements presence (20%)
    bonuses * 0.5                     // Confidence/richness (10% cap)
)
```

### Structural Score

| Element Detected | Points |
|------------------|--------|
| Instruction | +50 |
| Context | +30 |
| Role OR Audience | +20 |

### Bonus Multipliers

| Bonus Type | Calculation |
|------------|-------------|
| Confidence | highConfidenceCount × 4 (max 32) |
| Extra Elements | elementsAboveRequired × 5 |
| Richness | 6+ elements = +8, 5 = +5 |

### Structural Bonuses (Above 100%)

Prompts can exceed 100% through structural excellence:

| Bonus | Points | Detection |
|-------|--------|-----------|
| Numbered Steps | +5 | `1.`, `2.`, `Step 1:` |
| Section Headers | +5 | `##`, `**Heading:**` |
| Output Format | +5 | JSON, markdown, table specs |
| Examples | +5 | `Example:`, `for instance:` |
| Edge Cases | +5 | `If X, then Y` conditions |
| Quality Criteria | +5 | Success metrics, evaluation |

**Maximum possible score: 130%**

---

## 6. Element Detection Patterns

### Context Signals

| Signal Name | Pattern | Weight | Exclusive |
|-------------|---------|--------|-----------|
| first_person_situation | `I am/I'm/We are` + verb | 0.8 | Yes |
| i_verb_business | `I/we run/ran/own/operate/have` + noun | 0.9 | Yes |
| working_on | `working on/building/creating` + noun | 0.7 | No |
| temporal_marker | `currently/recently/right now` | 0.5 | No |
| business_type | `a/my bakery/restaurant/shop` | 0.7 | Yes |
| specializing_in | `specializing in/focus on` | 0.6 | No |
| explicit_label | `Context:/Background:` | 1.0 | Yes |

### Role Signals

| Signal Name | Pattern | Weight | Exclusive |
|-------------|---------|--------|-----------|
| act_as_directive | `act as/you are/pretend to be` | 1.0 | Yes |
| approach_like | `approach this like/think like` | 1.0 | Yes |
| expertise_words | `expert/specialist/consultant` | 0.8 | Yes |
| capability_framing | `with expertise in/who specializes` | 0.7 | Yes |
| profession_noun | `a writer/blogger/chef/designer` | 0.6 | No |

### Instruction Signals

| Signal Name | Pattern | Weight | Exclusive |
|-------------|---------|--------|-----------|
| imperative_start | Starts with `write/create/analyze` | 1.0 | Yes |
| request_language | `I need you to/can you/please` | 0.9 | Yes |
| structural_instruction | `start by/begin with/close with` | 0.8 | Yes |
| task_verbs | `analyze/summarize/compare/design` | 0.6 | No |

### Specifics Signals

| Signal Name | Pattern | Weight | Exclusive |
|-------------|---------|--------|-----------|
| numeric_specification | `500-word/3 tips/5 bullet points` | 1.0 | Yes |
| format_spec | `as a list/in table format/as JSON` | 0.9 | Yes |
| tone_specification | `friendly/formal/warm tone` | 0.7 | No |
| use_tone | `use a warm/encouraging tone` | 0.8 | Yes |
| output_type | `email/article/blog post` | 0.6 | No |

### Parameters Signals

| Signal Name | Pattern | Weight | Exclusive |
|-------------|---------|--------|-----------|
| negative_constraint | `don't/avoid/exclude/without` | 0.9 | Yes |
| avoid_specific | `avoid jargon/don't use buzzwords` | 0.9 | Yes |
| include_directive | `include 3 tips/include examples` | 0.85 | Yes |
| positive_requirement | `must include/should have/ensure` | 0.8 | Yes |
| boundary_spec | `maximum/minimum/at least/no more than` | 0.9 | Yes |

---

## 7. Debug Mode

Enable detailed logging in browser console:

```javascript
window.ANALYZER_DEBUG = true
```

This logs:
- Signal matches per sentence
- Scores and confidence levels
- Aggregation results per element
- Excerpt extractions

---

## 8. Example Score Breakdown

### Prompt: "I run a small artisan bakery specializing in sourdough. Act as a food blogger with SEO expertise. Write a 500-word blog post about seasonal ingredients for home bakers. Use a warm, encouraging tone. Include 3 actionable tips. Avoid technical jargon."

**Detection Results:**

| Element | Detected Signals | Confidence | Score |
|---------|-----------------|------------|-------|
| Context | `i_verb_business` (0.9), `business_type` (0.7), `specializing_in` (0.6) | High | 85 |
| Role | `act_as_directive` (1.0), `profession_noun` (0.6) | High | 90 |
| Instruction | `imperative_start` (1.0), `output_type` (0.6) | High | 88 |
| Specifics | `numeric_specification` (1.0), `use_tone` (0.8) | High | 92 |
| Tone | `tone_specification` (0.7), `emotional_quality` (0.7) | High | 78 |
| Parameters | `include_directive` (0.85), `avoid_specific` (0.9) | High | 90 |

**Score Calculation:**

```
Framework Coverage: 5/5 CRISP = 100%
Avg Element Score: ~87
Structural Score: 50 (instruction) + 30 (context) + 20 (role) = 100

Base = (100 × 0.45) + (87 × 0.25) + (100 × 0.20) + bonuses
     = 45 + 21.75 + 20 + ~3 = 89.75 → 89
```

---

## 9. Tuning Guidelines

### To Increase Detection Sensitivity

1. Lower `SENTENCE_SCORE_THRESHOLD` (currently 15)
2. Lower `DETECTION_THRESHOLD` (currently 20)
3. Add more pattern variations to signals
4. Increase weights on common patterns

### To Reduce False Positives

1. Raise thresholds
2. Make more signals `exclusive: false`
3. Require corroboration (multiple signals)
4. Lower weights on ambiguous patterns

### Adding New Patterns

Follow this checklist:
1. Identify the natural language variation
2. Create regex with word boundaries (`\b`)
3. Assign appropriate weight (0.5-1.0)
4. Determine if exclusive (standalone strength)
5. Test with debug mode enabled
6. Verify no false positives on other elements

---

## 10. Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | Feb 2026 | Verb tense patterns, fixed score dilution, lowered thresholds |
| 1.5 | Jan 2026 | Added structural bonuses, debug mode |
| 1.0 | Dec 2025 | Initial multi-signal implementation |
