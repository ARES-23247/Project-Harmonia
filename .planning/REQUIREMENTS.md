# Milestone v1.2 Requirements

**Project:** Project Harmonia - Universal Robotics IDE
**Milestone:** v1.2 IDE Layout & Real Estate Architecture
**Status:** Active

---

## Editor Views (EDITOR)

*Dynamic switching to maximize coding area*

### Must Have
- [ ] **EDITOR-01**: Clean toggle component in the header to switch between `[ Blocks ]`, `[ Text ]`, and `[ Split View ]`.
- [ ] **EDITOR-02**: Editor container dynamically scales to 100% of available vertical height.
- [ ] **EDITOR-03**: State persistence (remembers last used view mode on reload).
- [ ] **EDITOR-04**: In Split View, a draggable resizer allows adjusting the ratio between Blocks and Text.

### Future Consideration
- [ ] Multi-monitor pop-out for the text editor specifically.
- [ ] Auto-switch to Text view for advanced Python features.

---

## Drawer Architecture (DRAWER)

*Collapsible side panels for auxiliary tools*

### Must Have
- [ ] **DRAWER-01**: Right-side drawer container that houses Simulator and Telemetry panels.
- [ ] **DRAWER-02**: Drawer can be toggled open/closed via a visible UI button or keyboard shortcut.
- [ ] **DRAWER-03**: Drawer automatically opens when a simulation is started if it was closed.
- [ ] **DRAWER-04**: Smooth slide-in/slide-out animation.

### Future Consideration
- [ ] Left-side drawer for project files and settings.
- [ ] Custom tab order in the drawer.

---

## Pop-out Modals (MODAL)

*Detaching tools for multi-screen setups*

### Must Have
- [ ] **MODAL-01**: A "Pop-out" button on the Simulator/Telemetry drawer.
- [ ] **MODAL-02**: Clicking pop-out detaches the content into a floating, draggable modal within the browser window.
- [ ] **MODAL-03**: Modal can be resized and closed (which docks it back to the drawer).
- [ ] **MODAL-04**: Optionally support true multi-window pop-outs using `window.open` if PWA restrictions allow.

### Future Consideration
- [ ] Remembering modal positions between sessions.
- [ ] Snapping modals to edges.

---

## Bottom Console (CONSOLE)

*Terminal output management*

### Must Have
- [ ] **CONSOLE-01**: Fixed bottom drawer for terminal/console output.
- [ ] **CONSOLE-02**: Easy show/hide toggle.
- [ ] **CONSOLE-03**: Auto-open console drawer when a new error is logged.
- [ ] **CONSOLE-04**: Clear console button.

### Future Consideration
- [ ] Console search and filter.
- [ ] Expandable stack traces.

---

## Out of Scope

*Explicitly excluded from this milestone*

- [Hardware Connectivity] — Focus is entirely on UI layout architecture.
- [Complex IDE features] — (e.g., debuggers, breakpoints) belong in future milestones.

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| (Requirements newly drafted) | | |

---
*Last updated: 2026-05-07*
*Total requirements: 16 across 4 categories*
