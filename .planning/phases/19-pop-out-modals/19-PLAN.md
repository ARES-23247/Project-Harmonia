# Phase 19 Plan: Pop-out Modals

## User Review Required
> [!NOTE]
> Pop-out panels will stay within the browser window. True "new window" pop-outs (using `window.open`) are not planned for this phase as they break state sharing (Zustand) without complex synchronization. Floating draggable divs are the preferred approach for Chromebooks.

## Proposed Changes

### Store
#### [MODIFY] [editorStore.ts](file:///c:/Users/david/dev/robotics/universalIDE/src/store/editorStore.ts)
- Add `poppedOutPanels: string[]` and `togglePopOut: (panelId: string) => void`.

### Components
#### [NEW] [FloatingPanel.tsx](file:///c:/Users/david/dev/robotics/universalIDE/src/components/editor/FloatingPanel.tsx)
- Draggable wrapper component using `framer-motion`.
- Includes a "Dock" button to return to the sidebar.

#### [MODIFY] [SideDrawer.tsx](file:///c:/Users/david/dev/robotics/universalIDE/src/components/editor/SideDrawer.tsx)
- Update to conditionally hide panels that are popped out.

#### [MODIFY] [Workspace.tsx](file:///c:/Users/david/dev/robotics/universalIDE/src/components/editor/Workspace.tsx)
- Add a container for `FloatingPanel` instances.

#### [MODIFY] [SimulationPanel.tsx](file:///c:/Users/david/dev/robotics/universalIDE/src/components/editor/SimulationPanel.tsx) & [TelemetryPanel.tsx](file:///c:/Users/david/dev/robotics/universalIDE/src/components/editor/TelemetryPanel.tsx)
- Add "Pop Out" button to header.

## Verification Plan

### Automated Tests
- N/A

### Manual Verification
- Click "Pop Out" on Simulation -> Panel should float and be draggable.
- Drag panel around -> Should stay within viewport.
- Click "Dock" -> Panel should return to SideDrawer.
- Refresh page -> Popped out state should persist (via Zustand persist).
