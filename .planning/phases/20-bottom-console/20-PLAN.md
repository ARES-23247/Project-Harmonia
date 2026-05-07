# Phase 20 Plan: Bottom Console

## User Review Required
> [!NOTE]
> The console will occupy the full width of the screen at the bottom. This is the standard pattern for IDEs like VS Code and is highly efficient for small screens.

## Proposed Changes

### Store
#### [MODIFY] [editorStore.ts](file:///c:/Users/david/dev/robotics/universalIDE/src/store/editorStore.ts)
- Add `isConsoleOpen: boolean`, `setIsConsoleOpen`, and `consoleHeight: number`.
- Update `addConsoleOutput` to optionally trigger `setIsConsoleOpen(true)`.

### Components
#### [NEW] [BottomConsole.tsx](file:///c:/Users/david/dev/robotics/universalIDE/src/components/editor/BottomConsole.tsx)
- Horizontal collapsible drawer.
- Resizable height using `framer-motion` or `Panel` from `react-resizable-panels`.
- Hosts `ConsolePanel`.

#### [MODIFY] [HardwareToolbar.tsx](file:///c:/Users/david/dev/robotics/universalIDE/src/components/editor/HardwareToolbar.tsx)
- Add "Terminal" toggle button next to "Tools".

#### [MODIFY] [Workspace.tsx](file:///c:/Users/david/dev/robotics/universalIDE/src/components/editor/Workspace.tsx)
- Integrate `BottomConsole`.
- Wrap the Editor + SideDrawer in a vertical `PanelGroup` with the console at the bottom.

## Verification Plan

### Automated Tests
- N/A

### Manual Verification
- Run code -> Console should auto-open.
- Click "Clear" -> Console should clear.
- Toggle Console -> Should animate smoothly.
- Resize Console height -> Should persist (if possible).
