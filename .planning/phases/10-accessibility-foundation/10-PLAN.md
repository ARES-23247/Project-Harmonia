# Phase 10: Accessibility Foundation - Implementation Plan

This phase establishes the accessibility and thematic foundation of the IDE. It introduces a theme system (Light, Dark, High Contrast), WCAG-compliant contrast ratios, and full keyboard navigation for the Blockly workspace.

## Proposed Changes

### Theme System & Visual Accessibility
#### [NEW] `src/store/themeStore.ts`
- Create a Zustand store to manage theme state (`light` | `dark` | `high-contrast`).
- Implement persistence to `localStorage`.
- Sync with system preference (`prefers-color-scheme`) if no stored preference exists.

#### [MODIFY] `src/index.css`
- Define CSS variables for all three themes.
- Implement explicit high-contrast overrides (black background, white borders, high-visibility focus rings).
- Add global focus styles: `*:focus-visible { outline: 2px solid hsl(var(--ring)); outline-offset: 2px; }`.

#### [MODIFY] `src/App.tsx`
- Wrap the application in a `ThemeManager` component that applies the appropriate class to the `<html>` tag.

### Blockly Keyboard Navigation
#### [MODIFY] `package.json`
- Install `@blockly/keyboard-navigation` plugin.

#### [MODIFY] `src/lib/blocks/workspaceManager.ts`
- Integrate `Blockly.navigation.enableKeyboardAccessibility(workspace)` into the injection logic.
- Configure default keyboard shortcuts for block manipulation.

### IDE Shell Accessibility
#### [MODIFY] `src/components/layout/Sidebar.tsx`
- Ensure all sidebar items have correct `aria-label` and `role="button"` attributes.
- Verify tab indexing for logical navigation flow.

#### [MODIFY] `src/components/ui/tooltip.tsx`
- Ensure Tooltips are triggerable via keyboard focus.

## Verification Plan

### Automated Tests
- `npm test src/store/themeStore.test.ts`: Verify theme switching and localStorage persistence.
- `npx playwright test tests/a11y.spec.ts`: Run `axe-core` scan on initial load.

### Manual Verification
- **A11Y-01**: Check contrast with WCAG Contrast Checker extension.
- **A11Y-02**: Toggle High Contrast mode and verify visibility of block connection points.
- **A11Y-03**: Navigate from Sidebar to Blockly Toolbox using only `Tab`.
- **A11Y-04**: Move the Blockly cursor using arrow keys and delete a block with the keyboard.
