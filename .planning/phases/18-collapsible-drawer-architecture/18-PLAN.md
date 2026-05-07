# Phase 18 Plan: Collapsible Drawer Architecture

## User Review Required
> [!IMPORTANT]
> The Simulator and Telemetry will be moved into a single vertical drawer on the right. This will change how users interact with the sim—they will need to open the drawer (or have it auto-open) to see the robot.

## Proposed Changes

### Store
#### [MODIFY] [editorStore.ts](file:///c:/Users/david/dev/robotics/universalIDE/src/store/editorStore.ts)
- Add `isRightDrawerOpen: boolean` and `setIsRightDrawerOpen: (open: boolean) => void`.

### Components
#### [NEW] [SideDrawer.tsx](file:///c:/Users/david/dev/robotics/universalIDE/src/components/editor/SideDrawer.tsx)
- A component that uses `framer-motion` for sliding and hosts the Sim/Telemetry panels.
- Includes a toggle button (tab) on the edge of the drawer.

#### [MODIFY] [HardwareToolbar.tsx](file:///c:/Users/david/dev/robotics/universalIDE/src/components/editor/HardwareToolbar.tsx)
- Add a "Simulator" toggle button to the toolbar to manually open/close the drawer.
- Update `handleConnect("simulation")` to also open the drawer.

#### [MODIFY] [Workspace.tsx](file:///c:/Users/david/dev/robotics/universalIDE/src/components/editor/Workspace.tsx)
- Integrate `SideDrawer`.
- Ensure the main Editor panel fills the remaining space when the drawer is closed.

## Verification Plan

### Automated Tests
- N/A

### Manual Verification
- Start Simulation -> Drawer should auto-open.
- Close Drawer manually -> Editor should expand to fill width.
- Toggle Drawer from Toolbar -> Drawer should slide in/out.
- Verify animations are smooth (<300ms).
