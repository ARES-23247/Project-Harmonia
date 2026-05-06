# Milestone v1.1 Requirements

**Project:** Project Harmonia - Universal Robotics IDE
**Milestone:** v1.1 UX Foundation & Block Fixes
**Status:** Active

---

## Block Editor (BLOCK)

*Core functionality is currently broken — these are blocking issues*

### Must Have
- [ ] **BLOCK-01**: Users can drag blocks from palette to workspace with visual feedback
- [ ] **BLOCK-02**: Blocks snap to compatible connections with snap indicators
- [ ] **BLOCK-03**: Palette is scrollable and organized by category (flyout/toolbox pattern)
- [ ] **BLOCK-04**: Workspace supports pan (scroll wheel) and zoom (Ctrl+scroll)
- [ ] **BLOCK-05**: Visual feedback on hover, selection, and valid drop targets

### Future Consideration
- [ ] Mini-map for workspace navigation
- [ ] Advanced drag gestures (duplicate on drag, smart snapping)
- [ ] Block search/filter in palette

---

## Accessibility (A11Y)

*Legal requirement for education — must be built-in, not retrofitted*

### Must Have
- [ ] **A11Y-01**: WCAG 2.2 AA contrast compliance (4.5:1 normal, 3:1 large)
- [ ] **A11Y-02**: Dark/light theme toggle with persistence
- [ ] **A11Y-03**: High contrast mode via system forced-colors and app toggle
- [ ] **A11Y-04**: Basic keyboard navigation (Tab blocks, Enter select, arrows navigate)
- [ ] **A11Y-05**: All interactive elements have focus-visible indicators

### Future Consideration
- [ ] Full screen reader support (needs phase-specific research)
- [ ] Customizable keyboard shortcuts
- [ ] Keyboard shortcut reference sheet

---

## UI Polish (POLISH)

*Professional appearance and smooth interactions*

### Must Have
- [ ] **POLISH-01**: Consistent spacing, typography, and component styling
- [ ] **POLISH-02**: Loading states (skeleton screens) during initialization
- [ ] **POLISH-03**: Smooth animations (<300ms) for interactions
- [ ] **POLISH-04**: Respect `prefers-reduced-motion` for accessibility

### Future Consideration
- [ ] Celebration animations (confetti for completed tutorials)
- [ ] Custom cursors for different modes
- [ ] Block-themed UI elements

---

## Performance (PERF)

*Responsive feel — optimize after profiling*

### Must Have
- [ ] **PERF-01**: Initial load < 3 seconds
- [ ] **PERF-02**: Block selection response < 100ms
- [ ] **PERF-03**: Code splitting for panel components (lazy load Blockly/Monaco)

### Future Consideration
- [ ] Virtualization for large project lists
- [ ] Advanced performance monitoring
- [ ] Performance budget enforcement in CI

---

## Onboarding (ONBOARD)

*First-run guidance for new users*

### Must Have
- [ ] **ONBOARD-01**: Interactive first-run tutorial with skip option
- [ ] **ONBOARD-02**: Tutorial is replayable from help menu
- [ ] **ONBOARD-03**: Progress saved for resume after interruption

### Future Consideration
- [ ] Tutorial editor for teachers
- [ ] Skill maps with locked/unlocked progression
- [ ] Video walkthroughs

---

## Out of Scope

*Explicitly excluded from this milestone*

- [Mobile Phone Support] — Screens too small for block coding; targets Desktop/Laptops/Tablets
- [Full Screen Reader Support] — Complex enough to warrant phase-specific research
- [Tutorial Editor] — Focus on consuming tutorials first
- [Advanced Keyboard Shortcuts] — Basic navigation first, customization later
- [Cloud Compilation] — Serverless architecture constraint

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| BLOCK-01 | 9 | Pending |
| BLOCK-02 | 9 | Pending |
| BLOCK-03 | 9 | Pending |
| BLOCK-04 | 9 | Pending |
| BLOCK-05 | 9 | Pending |
| A11Y-01 | 10 | Pending |
| A11Y-02 | 10 | Pending |
| A11Y-03 | 10 | Pending |
| A11Y-04 | 10 | Pending |
| A11Y-05 | 10 | Pending |
| POLISH-01 | 11 | Pending |
| POLISH-02 | 11 | Pending |
| POLISH-03 | 11 | Pending |
| POLISH-04 | 11 | Pending |
| ONBOARD-01 | 12 | Pending |
| ONBOARD-02 | 12 | Pending |
| ONBOARD-03 | 12 | Pending |
| PERF-01 | 13 | Pending |
| PERF-02 | 13 | Pending |
| PERF-03 | 13 | Pending |

---
*Last updated: 2026-05-06*
*Total requirements: 18 across 5 phases*
