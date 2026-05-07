# Roadmap

- [x] Milestone v1.0 ([Archive](milestones/v1.0-ROADMAP.md))
- [x] Milestone v1.1: UX Foundation & Block Fixes ([Archive](milestones/v1.1-ROADMAP.md))
- [ ] **Milestone v1.2: IDE Layout & Real Estate Architecture**

## Phases

- [ ] **Phase 17: Dynamic Editor Views** - Toggles for Blocks, Text, and Split View
- [ ] **Phase 18: Collapsible Drawer Architecture** - Right-side sliding drawer for Simulator and Telemetry
- [ ] **Phase 19: Pop-out Modals** - Floating draggable windows for multi-screen setups
- [ ] **Phase 20: Bottom Console** - Easily hid/shown terminal output drawer

## Phase Details

### Phase 17: Dynamic Editor Views
**Goal:** Maximize coding area with dynamic toggles between Blocks, Text, and Split View
**Depends on**: Nothing
**Requirements**: EDITOR-01, EDITOR-02, EDITOR-03, EDITOR-04
**Success Criteria** (what must be TRUE):
  1. User can switch editor modes using a clean header toggle.
  2. Editor scales to 100% of vertical height.
  3. Last used mode is persisted on reload.
  4. In Split View, ratio can be adjusted via a draggable resizer.
**Plans**: TBD
**UI hint**: yes

### Phase 18: Collapsible Drawer Architecture
**Goal:** House auxiliary tools (Sim, Telemetry) in a collapsible side panel
**Depends on**: Phase 17
**Requirements**: DRAWER-01, DRAWER-02, DRAWER-03, DRAWER-04
**Success Criteria** (what must be TRUE):
  1. Right-side drawer contains Simulator and Telemetry panels.
  2. User can toggle drawer open/closed.
  3. Drawer auto-opens on simulation start.
  4. Animations are smooth and responsive.
**Plans**: TBD
**UI hint**: yes

### Phase 19: Pop-out Modals
**Goal:** Allow users to detach panels into floating windows for multiple monitors
**Depends on**: Phase 18
**Requirements**: MODAL-01, MODAL-02, MODAL-03, MODAL-04
**Success Criteria** (what must be TRUE):
  1. Drawer has a Pop-out button.
  2. Content detaches into a draggable floating modal or separate window.
  3. Modal can be resized, closed, and redocked.
**Plans**: TBD

### Phase 20: Bottom Console
**Goal:** Provide an unobtrusive, toggleable bottom drawer for terminal output
**Depends on**: Phase 18
**Requirements**: CONSOLE-01, CONSOLE-02, CONSOLE-03, CONSOLE-04
**Success Criteria** (what must be TRUE):
  1. Fixed bottom drawer shows terminal output.
  2. Easy show/hide toggle.
  3. Auto-opens on error.
  4. Can clear console history.
**Plans**: TBD
**UI hint**: yes

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 17. Dynamic Editor Views | 4/4 | Complete | 2026-05-07 |
| 18. Collapsible Drawer | 4/4 | Complete | 2026-05-07 |
| 19. Pop-out Modals | 4/4 | Complete | 2026-05-07 |
| 20. Bottom Console | 4/4 | Complete | 2026-05-07 |

## Milestone v1.1 Archive

See [milestones/v1.1-ROADMAP.md](milestones/v1.1-ROADMAP.md) for the complete v1.1 milestone.

---
*Last updated: 2026-05-07*
*Total requirements: 16 across 4 phases*
