# Roadmap

- [x] Milestone v1.0 ([Archive](milestones/v1.0-ROADMAP.md))
- [ ] **Milestone v1.1: UX Foundation & Block Fixes**

## Phases

- [x] **Phase 9: Block Editor Foundation** - Fix core drag-drop, palette, and workspace navigation
- [ ] **Phase 10: Accessibility Foundation** - WCAG compliance, themes, and keyboard navigation
- [ ] **Phase 11: UI Polish & Animations** - Theme system, animations, and loading states
- [ ] **Phase 12: Interactive Onboarding** - First-run tutorial with skip/replay
- [ ] **Phase 13: Performance Optimization** - Code splitting and lazy loading

## Phase Details

### Phase 9: Block Editor Foundation
**Goal:** Users can drag, connect, and navigate blocks with responsive visual feedback
**Depends on**: Nothing (first phase of v1.1)
**Requirements**: BLOCK-01, BLOCK-02, BLOCK-03, BLOCK-04, BLOCK-05
**Success Criteria** (what must be TRUE):
  1. User can drag blocks from palette to workspace with real-time visual feedback showing block shadow and position
  2. Blocks snap to compatible connections with visible snap indicators when aligned correctly
  3. User can scroll through palette by category to find all available blocks
  4. User can pan workspace using scroll wheel and zoom using Ctrl+scroll
  5. User sees clear visual feedback on hover, selection, and valid drop targets
**Plans**: 1

### Phase 10: Accessibility Foundation
**Goal:** Users can navigate and use the IDE with keyboard, screen readers, and visual accommodations
**Depends on**: Phase 9 (keyboard navigation requires functional block selection)
**Requirements**: A11Y-01, A11Y-02, A11Y-03, A11Y-04, A11Y-05
**Success Criteria** (what must be TRUE):
  1. All text meets WCAG 2.2 AA contrast requirements (4.5:1 normal, 3:1 large)
  2. User can toggle between dark and light themes with preference persisted
  3. User can enable high contrast mode via app toggle or system forced-colors
  4. User can navigate blocks using Tab, Enter to select, and arrow keys
  5. All interactive elements show visible focus indicators when keyboard-navigated
**Plans**: TBD

### Phase 11: UI Polish & Animations
**Goal:** The IDE feels polished and professional with consistent styling and smooth interactions
**Depends on**: Phase 10 (theme system builds on accessibility foundation)
**Requirements**: POLISH-01, POLISH-02, POLISH-03, POLISH-04
**Success Criteria** (what must be TRUE):
  1. All UI components use consistent spacing, typography, and styling
  2. User sees skeleton loading screens during initialization instead of blank layouts
  3. All interactive animations complete in under 300ms for responsive feel
  4. Animations respect user's prefers-reduced-motion system setting
**Plans**: TBD
**UI hint**: yes

### Phase 12: Interactive Onboarding
**Goal:** New users discover core features through skippable interactive tutorial
**Depends on**: Phase 11 (tutorial content requires stable UI)
**Requirements**: ONBOARD-01, ONBOARD-02, ONBOARD-03
**Success Criteria** (what must be TRUE):
  1. First-time users see interactive tutorial on initial load with obvious skip button
  2. User can replay tutorial from help menu at any time
  3. Tutorial progress is saved and can be resumed after closing the browser
**Plans**: TBD
**UI hint**: yes

### Phase 13: Performance Optimization
**Goal:** The IDE loads quickly and remains responsive with large projects
**Depends on**: Phase 12 (optimize stable, working code)
**Requirements**: PERF-01, PERF-02, PERF-03
**Success Criteria** (what must be TRUE):
  1. Application loads to interactive state in under 3 seconds on typical connection
  2. Block selection responds in under 100ms for smooth drag interaction
  3. Heavy components (Blockly, Monaco) load lazily when panels are opened
**Plans**: TBD

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 9. Block Editor Foundation | 1/1 | Complete | 2026-05-07 |
| 10. Accessibility Foundation | 0/5 | Not started | - |
| 11. UI Polish & Animations | 0/4 | Not started | - |
| 12. Interactive Onboarding | 0/3 | Not started | - |
| 13. Performance Optimization | 0/3 | Not started | - |

## Milestone v1.0 Archive

See [milestones/v1.0-ROADMAP.md](milestones/v1.0-ROADMAP.md) for the complete v1.0 milestone.

---
*Last updated: 2026-05-06*
*Total requirements: 18 across 5 phases*
