# Phase 19 Context: Pop-out Modals

## Goal
Enable users to detach Simulator and Telemetry panels from the main layout into floating, draggable windows. This is particularly useful for multi-monitor setups or when a student wants to see the robot at a larger scale while coding.

## Requirements
- **POPOUT-01**: "Pop out" button on Simulator and Telemetry panels.
- **POPOUT-02**: Floating window should be draggable and resizable.
- **POPOUT-03**: "Dock" button to return the panel to the side drawer.
- **POPOUT-04**: State persistence (remember if a panel is popped out).

## Proposed Changes
1. **Store Extension**: Add `poppedOutPanels: string[]` to `useEditorStore`.
2. **Component**: Create a `FloatingPanel.tsx` that uses `framer-motion` for dragging.
3. **Refactor**: Update `SimulationPanel` and `TelemetryPanel` to include a "Pop Out" button.
4. **Logic**: Conditionally render panels either in the `SideDrawer` or in the `FloatingPanel` container.

## Key Decisions
- **Draggability**: We'll use `framer-motion`'s `drag` feature for the simplest high-quality implementation.
- **Resizing**: Resizing floating windows can be complex. For the initial version, we'll provide a few preset sizes or use a simple CSS `resize: both` with a wrapper.
- **Portal**: Floating panels should be rendered in a React Portal to avoid overflow issues.
