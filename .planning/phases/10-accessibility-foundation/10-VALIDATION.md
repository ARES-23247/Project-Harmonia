# Phase 10: Accessibility Foundation - Validation Strategy

**Created:** 2026-05-07
**Status:** Active

## UAT Criteria

### A11Y-01: Contrast Compliance
- [ ] Verify that all text elements meet WCAG 2.2 AA contrast ratios (4.5:1).
- [ ] Verify that interactive elements (buttons, inputs) meet 3:1 contrast ratios.
- [ ] Verify that focus indicators are clearly visible and meet 3:1 contrast.

### A11Y-02: Theme System
- [ ] Toggle between Light, Dark, and High Contrast themes.
- [ ] Verify that the theme persists across page reloads.
- [ ] Verify that the system preference (dark mode) is respected on first load.

### A11Y-03: Keyboard Navigation (IDE Shell)
- [ ] Navigate the sidebar, top navigation, and toolbox using only the `Tab` and `Shift+Tab` keys.
- [ ] Verify that the focused element has a visible 2px solid ring.
- [ ] Verify that `Enter` or `Space` activates the focused element.

### A11Y-04: Keyboard Navigation (Block Workspace)
- [ ] Enable keyboard navigation in the Blockly workspace.
- [ ] Navigate between blocks and connection points using arrow keys.
- [ ] Connect and disconnect blocks using keyboard shortcuts.

### A11Y-05: Accessible Announcements
- [ ] Verify that connecting two blocks triggers an ARIA live announcement.
- [ ] Verify that deleting a block triggers an ARIA live announcement.
- [ ] Verify that workspace errors are announced to screen readers.

## Verification Plan

### Automated Tests
- Run `axe-core` scan on the main IDE page.
- Playwright test: Toggle themes and verify `localStorage` value.
- Playwright test: Focus sidebar items and verify `.ring-2` class presence.

### Manual Verification
- Test entire workspace flow with VoiceOver (macOS) or NVDA (Windows).
- Verify contrast ratios using a browser extension (e.g., WAVE or axe).
