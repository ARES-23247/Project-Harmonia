# Phase 18 Context: Collapsible Drawer Architecture

## Goal
The goal of this phase is to move the Simulator and Telemetry panels into a collapsible right-side drawer. This will free up the main editor area for full-width coding when these tools are not needed.

## Current State
- `Workspace.tsx` has a right-side `Panel` that contains the Sim and Telemetry, but it's always part of the flex/grid layout (though it can be collapsed).
- The "Show/Hide" toggle is not explicitly implemented in a user-friendly way other than dragging the resizer.

## Requirements
- **DRAWER-01**: Right-side drawer for Simulator and Telemetry.
- **DRAWER-02**: Toggle open/closed via UI button.
- **DRAWER-03**: Auto-open on simulation start.
- **DRAWER-04**: Smooth animations.

## Proposed Changes
1. **Component**: Create a `SideDrawer.tsx` component that can host panels and handles the animation state.
2. **Store Extension**: Add `isRightDrawerOpen: boolean` and `toggleRightDrawer` to `useEditorStore`.
3. **Workspace Update**: Integrate the `SideDrawer` into the layout, replacing the static right panel.
4. **Logic**: Trigger drawer open in `SimulationProvider` or via the `Run` button in `HardwareToolbar`.

## Key Decisions
- **Layout**: We will use a "push" layout where the editor shrinks slightly when the drawer is open, or an "overlay" layout. The user said "Idea 3... guided and contained", so a "push" layout (resize) is probably better to avoid covering the blocks while they run.
- **Library**: We'll use `framer-motion` for the drawer animations to match the existing polish.
