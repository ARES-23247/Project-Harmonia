# Phase 17 Plan: Dynamic Editor Views

## User Review Required
> [!IMPORTANT]
> The `Workspace.tsx` refactor will significantly change the DOM structure of the editor. We will move to a more dynamic layout that allows the editor to fill the screen.

## Proposed Changes

### Store
#### [MODIFY] [editorStore.ts](file:///c:/Users/david/dev/robotics/universalIDE/src/store/editorStore.ts)
- Add `viewMode: 'blocks' | 'text' | 'split'` to state.
- Add `setViewMode` action.
- Add `zustand/middleware` `persist` to save `viewMode`.

### Components
#### [MODIFY] [HardwareToolbar.tsx](file:///c:/Users/david/dev/robotics/universalIDE/src/components/editor/HardwareToolbar.tsx)
- Add the `ViewModeToggle` component using `Tabs` or `Button` group.

#### [MODIFY] [Workspace.tsx](file:///c:/Users/david/dev/robotics/universalIDE/src/components/editor/Workspace.tsx)
- Read `viewMode` from store.
- Conditionally render `BlocklyEditor` and `MonacoEditor`.
- In `split` mode, use a horizontal `PanelGroup`.
- Ensure the editor container takes full height (initially, the Sim panel is still there but we'll move it in Phase 18).
- *Note:* In this phase, we are just fixing the editor views. The Simulator and Telemetry might still be in the way until Phase 18, but we will make them collapsible/removable from the main flow.

## Verification Plan

### Automated Tests
- N/A (UI layout focused)

### Manual Verification
- Toggle between Blocks, Text, and Split modes.
- Verify editor height is 100% when simulator panel is hidden (I'll add a temporary toggle for Sim panel if needed).
- Verify ratio can be adjusted in Split view.
- Reload page to verify persistence.
