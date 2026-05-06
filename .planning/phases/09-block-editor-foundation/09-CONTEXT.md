# Phase 9: Block Editor Foundation - Context

**Gathered:** 2026-05-06
**Status:** Ready for planning
**Mode:** Research-informed fixes

<domain>
## Phase Boundary

Fix core Blockly integration issues preventing users from effectively using the block editor. Currently drag-drop is broken and the palette doesn't work properly. Research indicates these are Blockly lifecycle and configuration issues, not surface CSS problems.

</domain>

<decisions>
## Implementation Decisions

### Workspace Configuration
- Enable scrollbars, zoom controls, and trashcan in workspace options
- Set up proper CSS isolation with z-index stacking context
- Configure move options for smooth drag behavior

### Toolbox/Palette
- Use categoryToolbox with scrollable categories
- Add cssConfig for proper category styling
- Ensure palette is properly positioned and scrollable

### Visual Feedback
- Enable default block highlight and connection indicators
- Configure snap sound and visual feedback
- Add hover states for blocks and connections

### Workspace Navigation
- Scroll wheel pans workspace
- Ctrl+scroll zooms in/out
- Reset view and fit-to-screen buttons

### Claude's Discretion
- Exact configuration values (zoom levels, scroll speed) based on Blockly defaults
- CSS implementation details for isolation layer
- Whether to use flyout or standard toolbox (research recommends flyout)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/editor/BlocklyEditor.tsx` - Existing Blockly integration (needs refactoring)
- `src/lib/blocks/robotBlocks.ts` - Custom robot block definitions
- `src/lib/blocks/legoBlocks.ts` - Custom Lego block definitions
- `src/lib/blocks/robotGenerators.ts` - Python code generators
- `src/lib/blocks/legoGenerators.ts` - Lego Python generators
- `src/store/editorStore.ts` - Zustand store for editor state

### Established Patterns
- Zustand for state management
- React hooks (useRef, useEffect) for component lifecycle
- Blockly.inject() for workspace initialization

### Integration Points
- BlocklyEditor component used in main editor layout
- editorStore.setPythonCode() for code generation output
- editorStore.setBlocklyWorkspace() for workspace reference

### Current Issues Identified
- No workspace configuration for scrollbars/zoom/trashcan
- No CSS isolation for z-index stacking
- Toolbox may not be scrollable
- No move configuration for drag behavior

</code_context>

<specifics>
## Specific Ideas

From user feedback:
- "UI doesn't work right and you can't actually program a robot currently"
- "Things don't drag and drop well"
- "The 'palette' doesn't stay static"

From research findings:
- Blockly requires proper CSS isolation with `isolation: isolate`
- Z-index hierarchy needed for SVG, toolbox, and dragged elements
- Workspace configuration missing scrollbars, zoom, trashcan
- IDragStrategy interface may need custom implementation

</specifics>

<deferred>
## Deferred Ideas

- Mini-map for workspace navigation (future phase)
- Advanced drag gestures (duplicate on drag)
- Block search/filter in palette
- Custom drag strategies beyond default Blockly behavior

</deferred>
