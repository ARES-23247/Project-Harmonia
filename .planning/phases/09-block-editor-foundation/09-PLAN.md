# Phase 9: Block Editor Foundation - Plan

**Goal:** Users can drag, connect, and navigate blocks with responsive visual feedback by implementing comprehensive workspace configuration and CSS isolation.

## User Review Required

> [!IMPORTANT]
> **CSS Isolation Layer**: This plan introduces a global `isolation: isolate` layer in `src/index.css` specifically for the Blockly wrapper. This is required to solve persistent z-index issues but may affect other elements if they rely on being in the same stacking context as the workspace.

## Proposed Changes

### [Component] Editor Infrastructure

#### [NEW] [workspaceManager.ts](file:///c:/Users/david/dev/robotics/universalIDE/src/lib/blocks/workspaceManager.ts)
- Define `WORKSPACE_CONFIG` with scrollbars, trashcan, zoom, and move options.
- Export utility for workspace initialization and toolbox definition.

#### [NEW] [blockStore.ts](file:///c:/Users/david/dev/robotics/universalIDE/src/store/blockStore.ts)
- Create a dedicated Zustand store for Blockly-specific state (workspace reference, selection, toolbox state).

### [Component] UI Foundation

#### [MODIFY] [index.css](file:///c:/Users/david/dev/robotics/universalIDE/src/index.css)
- Implement the `blockly-wrapper` isolation layer and z-index hierarchy.

#### [MODIFY] [BlocklyEditor.tsx](file:///c:/Users/david/dev/robotics/universalIDE/src/components/editor/BlocklyEditor.tsx)
- Refactor to use `workspaceManager.ts` and `blockStore.ts`.
- Implement `ResizeObserver` for responsive layout.
- Configure `useEffect` with proper cleanup (`workspace.dispose()`).

## Verification Plan

### Automated Tests
- `npm run test` (verify no regressions in existing unit tests)
- `tsc --noEmit` (ensure type safety for new store and manager)

### Manual Verification
- **BLOCK-01**: Drag a block from the "Robot" category and verify shadow/visual feedback.
- **BLOCK-02**: Connect two compatible blocks and verify snap sound and visual indicator.
- **BLOCK-03**: Scroll through the toolbox categories and verify category switching.
- **BLOCK-04**: Use scroll wheel to pan and Ctrl+scroll to zoom; verify zoom controls UI.
- **BLOCK-05**: Hover over a block and connection point; verify visual highlight.

---
*Phase: 09-block-editor-foundation*
*Plan created: 2026-05-07*
