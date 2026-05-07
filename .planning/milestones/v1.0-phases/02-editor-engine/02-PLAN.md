# Phase 2: Editor Engine & AST Foundation - Plan

## Requirements Covered
- EDIT-01: Two-way synchronization between text and visual interfaces.
- EDIT-02: Support Python 3 syntax (Monaco).
- EDIT-03: Visual block editing via Blockly interface.
- EDIT-04: Offline functionality for local saving and caching.

## Implementation Steps

### Step 1: Editor Dependencies
- Run `npm install @monaco-editor/react blockly react-resizable-panels`.

### Step 2: Editor Layout Setup
- Create `src/components/editor/Workspace.tsx`.
- Use `react-resizable-panels` to split the screen into `LeftPanel` (Blockly) and `RightPanel` (Monaco).

### Step 3: Configure Zustand Sync Store
- Create `src/store/editorStore.ts`.
- Store properties: `pythonCode` (string), `blocklyState` (object).
- Actions: `setPythonCode`, `setBlocklyState`.

### Step 4: Implement Monaco Editor
- Create `src/components/editor/MonacoEditor.tsx`.
- Connect it to `editorStore` for reading/writing `pythonCode`.

### Step 5: Implement Blockly Editor
- Create `src/components/editor/BlocklyEditor.tsx`.
- Inject Blockly workspace to an `npm` ref.
- Wire up Blockly workspace change listener to generate Python using `pythonGenerator`.
- Synchronize Python output to `editorStore`.

### Step 6: Connect to React Router
- Update `App.tsx` layout to route `/editor` to the `Workspace`.
- Add a button on the `HomePage` to navigate to `/editor`.

## Verification
- Run `npm run build` to verify the build process.
- Run `npm run dev` and navigate to the editor.
- Add blocks and verify Python text updates instantly.
