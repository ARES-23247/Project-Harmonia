# Phase 2: Editor Engine & AST Foundation - Context

**Gathered:** 2026-05-02
**Status:** Ready for execution

<domain>
## Phase Boundary

Build the core code authoring experience and two-way synchronization logic between Blockly and Python text.
</domain>

<decisions>
## Implementation Decisions

### Text Editor Integration
- Library: `@monaco-editor/react`
- Rationale: Brings full VSCode experience with built-in Python syntax support.

### Visual Editor Integration
- Library: `blockly`
- Rationale: Standard for AST/Block generation, highly extensible.

### Two-Way Synchronization Architecture
- State: React Zustand Store (`useEditorStore`)
- Direction: Block -> Python (MVP first generation logic)
</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- None. Start from scratch.

### Established Patterns
- Resizable layout required for Split-pane.
</code_context>
