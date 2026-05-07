# Phase 17 Context: Dynamic Editor Views

## Goal
The goal of this phase is to refactor the IDE's layout to support dynamic view switching between Blocks-only, Text-only, and Split View. This will allow the editor to occupy the full vertical real estate when auxiliary panels (Simulator, Console) are hidden or moved.

## Current State
- `Workspace.tsx` uses a fixed 3-column layout with `react-resizable-panels`.
- The editor is split horizontally with the simulator by default.
- `useEditorStore` does not currently track `editorMode`.

## Requirements
- **EDITOR-01**: Header toggle for mode switching.
- **EDITOR-02**: Editor container scales to 100% height.
- **EDITOR-03**: View mode persistence.
- **EDITOR-04**: Draggable resizer in Split View.

## Proposed Changes
1. **Store Extension**: Add `viewMode: 'blocks' | 'text' | 'split'` to `useEditorStore`.
2. **Layout Refactor**: Modify `Workspace.tsx` to conditionally render the editor panels based on `viewMode`.
3. **Header Integration**: Update `HardwareToolbar.tsx` or create a new `ViewToolbar` to host the mode toggle.
4. **Style Adjustments**: Ensure the editor takes full height when vertical panels are hidden.

## Key Decisions
- **Persistence**: Use `zustand` persist middleware or manual `localStorage` for `viewMode`.
- **Panel Grouping**: We will continue using `react-resizable-panels` but with dynamic conditional rendering of the `Panel` components to ensure the remaining panels fill the space.

## Open Questions
- Should "Split View" be horizontal or vertical? (User mentioned "blocks can be full height on the left", implying horizontal split).
- Where should the view toggle live? (User mentioned "header toggle").
