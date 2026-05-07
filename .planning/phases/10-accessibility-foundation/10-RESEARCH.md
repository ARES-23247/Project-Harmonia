# Phase 10: Accessibility Foundation - Research

**Researched:** 2026-05-07
**Status:** Complete

## Technical Findings

### 1. WCAG 2.2 AA Contrast Requirements
Confirmed minimum contrast ratios for AA compliance:
- **Normal Text**: 4.5:1 ratio.
- **Large Text / Graphical Objects**: 3:1 ratio (Success Criterion 1.4.11).
- **Focus Indicators**: Must have a 3:1 contrast ratio against the background to be compliant.

### 2. Blockly Keyboard Navigation
Blockly's `@blockly/keyboard-navigation` plugin is the industry standard for accessible block interaction.
- **Installation**: `npm install @blockly/keyboard-navigation`
- **Activation**:
  ```typescript
  import * as Blockly from 'blockly';
  import { navigation } from '@blockly/keyboard-navigation';
  Blockly.navigation.enableKeyboardAccessibility(workspace);
  ```
- **Behavior**: Users navigate the workspace using a virtual cursor (moved with arrow keys). Actions like connecting, disconnecting, and deleting are handled via keyboard shortcuts.

### 3. Accessible Overlays & Tooltips
- **Radix UI Tooltip**: Provides built-in support for `aria-describedby`, keyboard focus (`onFocus`), and escape key handling.
- **Implementation**: Wrap block descriptions in `<Tooltip.Provider>` to ensure help text is accessible to screen readers and keyboard users.

### 4. Theme Persistence Pattern
- **Storage**: `localStorage` is ideal for persistent user choice.
- **Sync**: Use `window.matchMedia('(prefers-color-scheme: dark)')` for initial system synchronization.
- **Application**: Apply a `.dark`, `.light`, or `.high-contrast` class to the `<html>` or `<body>` tag to scope Tailwind/CSS variables.

## Implementation Details

### Theme Tokens (Tailwind/CSS)
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... standard shadcn variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
}

.high-contrast {
  --background: 0 0% 0%;
  --foreground: 0 0% 100%;
  --border: 0 0% 100%;
  --ring: 0 0% 100%;
}
```

### Blockly Focus Styles
Custom CSS to make the workspace cursor visible:
```css
.blocklyCursor {
  stroke: hsl(var(--ring));
  stroke-width: 4px;
}
```

## Validation Architecture
- **Automated**: `axe-core` or `playwright-axe` for CI/CD checks.
- **Manual**: Verify Tab order through the entire IDE (Sidebar -> Editor -> Toolbox -> Canvas).
- **Screen Reader**: Test with VoiceOver/NVDA for "Announce on Connection" events.
