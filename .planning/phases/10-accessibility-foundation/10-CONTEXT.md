# Phase 10: Accessibility Foundation - Context

**Gathered:** 2026-05-07
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase delivers a robust accessibility foundation for the IDE, including WCAG 2.2 AA contrast compliance, a theme system (Dark, Light, High Contrast), and full keyboard navigation support for the block-based editor.

</domain>

<decisions>
## Implementation Decisions

### Visual Accessibility & Themes
- **Theme Storage**: Use `localStorage` with system synchronization for persistent user preferences.
- **High Contrast**: Implement using CSS `forced-colors` media query combined with an explicit `.high-contrast` class for manual toggle.
- **Contrast Verification**: Integrate automated checks (axe-core/lighthouse) into the verification plan.

### Keyboard Navigation Logic
- **Block Navigation**: Utilize Blockly's built-in cursor-based keyboard navigation system.
- **Focus Indicators**: Implement 2px solid rings with high-contrast colors for clear visibility.
- **Announcements**: Use `aria-live` regions to announce workspace changes (connections, deletions, errors) to screen readers.

### Workspace Interaction
- **Accessible Tooltips**: Ensure all block help text is triggerable via keyboard using Radix primitives.
- **Shortcuts**: Standardize on `Ctrl + +/-` for zoom and `Ctrl + Arrows` for workspace panning.

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `shadcn/ui` (Radix Primitives) components in `src/components/ui/` provide a solid base for accessible overlays and dialogs.
- `blockStore.ts` and `workspaceManager.ts` (Phase 9) provide the necessary hooks to inject accessibility plugins into Blockly.

### Established Patterns
- The app uses Tailwind for styling, making it easy to implement theme-based color overrides.
- `index.css` contains the isolation layer for Blockly, which will be extended for focus styles.

### Integration Points
- `src/components/editor/BlocklyEditor.tsx` is the primary entry point for configuring accessibility plugins.
- `src/index.css` for global theme tokens.

</code_context>

<specifics>
## Specific Ideas

- Ensure "Wait for" and "Drive Robot" blocks (RobotBlocks.ts) have descriptive ARIA labels for screen reader clarity.
- The high contrast theme should specifically target block connection points to make "snapping" visible for low-vision users.

</specifics>

<deferred>
## Deferred Ideas

- Screen reader "Code Summary" (reading the entire block script as natural language) is deferred to Phase 13/Perf or a future AI phase.

</deferred>
