# Phase 20 Context: Bottom Console Drawer

## Goal
Establish a dedicated, collapsible bottom console area for program output and system logs. This area should stay out of the way until needed, but automatically surface during execution or when errors occur.

## Requirements
- **CONSOLE-01**: Persistent bottom drawer for terminal output.
- **CONSOLE-02**: Toggle via keyboard shortcut (e.g. Ctrl+`) or UI button.
- **CONSOLE-03**: Auto-open when `addConsoleOutput` is called with content.
- **CONSOLE-04**: Resizable height.

## Proposed Changes
1. **Store Extension**: Add `isConsoleOpen: boolean` and `setIsConsoleOpen: (open: boolean) => void` to `useEditorStore`.
2. **Component**: Create `BottomConsole.tsx` that hosts the `ConsolePanel`.
3. **HardwareToolbar Update**: Add a "Terminal" toggle button.
4. **Workspace Update**: Refactor the main layout to include the bottom drawer.

## Key Decisions
- **Layout**: The console will be a "push" drawer at the bottom of the main content area (below the editor and sidebar).
- **Auto-Open**: We'll add a side-effect in the store or a `useEffect` in the console to open the drawer when new output arrives.
