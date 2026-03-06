# Epic 2 Kickoff Checklist

## Context

This checklist operationalizes the preparation tasks and critical path captured in the Epic 1 retrospective.

Source of truth:
- `_bmad-output/implementation-artifacts/epic-1-retro-2026-03-05.md`
- `_bmad-output/planning-artifacts/epics.md`
- `_bmad-output/planning-artifacts/architecture.md`
- `_bmad-output/planning-artifacts/design-system.md`
- `_bmad-output/planning-artifacts/ux-design-specification.md`

## Goal

Start Epic 2 only after the team has explicit gates for performance, reduced motion, regression protection, and projector readability.

## Kickoff Status

- Epic 1 status aligned in tracking: [x]
- Regression checklist defined: [x]
- Animation guardrails documented and accepted: [ ]
- Reduced-motion validation integrated into story acceptance: [ ]
- Projector dry-run completed: [ ]

Epic 2 kickoff rule:
- Do not start implementation of stories `2-2`, `2-3`, or `2-4` before items 2, 3, and 4 are complete.
- Do not mark Epic 2 ready for demo before item 5 is complete.

## Execution Checklist

### 1. Tracking Alignment

Owner:
- Bob (SM)
- Giuliano

Done when:
- `epic-1` is marked `done` in `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `epic-1-retrospective` remains `done`

Status:
- [x] Completed

### 2. Regression Checklist for Epic 2

Owner:
- Quinn (QA)
- Amelia (Dev)

Done when:
- Every Epic 2 story validates keyboard navigation still works
- Every Epic 2 story validates overview open/close and topic selection still work
- Every Epic 2 story validates hash sync behavior still works
- Every Epic 2 story runs `npm run test -- --run`
- Every Epic 2 story runs `npm run build`

Operational gate for each Epic 2 story:
- [ ] Keyboard regression checked
- [ ] Overview regression checked
- [ ] Hash sync regression checked
- [ ] Test suite passed
- [ ] Production build passed

Status:
- [ ] Pending

Baseline evidence:
- `2026-03-06`: Quinn executed the regression baseline and recorded results in `_bmad-output/implementation-artifacts/epic-2-qa-regression-baseline-2026-03-06.md`

### 3. Animation and Performance Guardrails

Owner:
- Winston (Architect)
- Amelia (Dev)

Done when:
- Topic transition animations only use `transform` and `opacity`
- Matrix background implementation avoids layout-triggering properties
- Any animation added in Epic 2 respects reduced-motion fallback
- Shell, navigation, and overview remain stable while topic visuals animate

Guardrails to enforce:
- [ ] No animation of `width`, `height`, `top`, or `left`
- [ ] Background animation uses `requestAnimationFrame`
- [ ] No keyboard regression during animated transitions
- [ ] No overview regression during animated transitions

Status:
- [ ] Pending

### 4. Reduced-Motion Validation

Owner:
- Quinn (QA)

Done when:
- Story `2-3` acceptance explicitly covers reduced motion
- Tests validate fallback behavior for reduced motion
- Reduced-motion fallback is limited to simple opacity crossfade where applicable

Validation target:
- [ ] Story `2-3` updated with explicit reduced-motion gate
- [ ] Tests added for reduced-motion behavior

Status:
- [ ] Pending

### 5. Projector Dry-Run

Owner:
- Alice (PO)
- Giuliano

Done when:
- Theme contrast is verified on projector or projector-equivalent setup
- Typography remains legible in presenter flow
- Matrix background does not compete with content readability
- Progress bar and overview remain readable in presentation conditions

Manual validation:
- [ ] Contrast verified
- [ ] Typography verified
- [ ] Background subtlety verified
- [ ] Overview readability verified
- [ ] Progress bar readability verified

Status:
- [ ] Pending

## Suggested Delegation

- `SM`: keep this checklist attached to Epic 2 kickoff and verify item 1 before first story moves forward.
- `Architect + Dev`: use this file as the non-negotiable guardrail baseline for stories `2-2`, `2-3`, and `2-4`.
- `QA`: treat items 2 and 4 as Definition of Done gates, not optional review notes.
- `PO + Project Lead`: close item 5 before demo or presentation rehearsal.

## Final Readiness Rule

Epic 2 can begin with story preparation immediately, but implementation should be considered properly kicked off only when:

- item 2 is complete
- item 3 is complete
- item 4 is complete

Epic 2 is not ready for demo until:

- item 5 is complete
