# Phase 9: Block Editor Foundation - Patterns

**Mapped:** 2026-05-07
**Status:** Ready for planning

## Implementation Map

| Target File | Role | Data Flow | Analog File |
|-------------|------|-----------|-------------|
| `src/components/editor/BlocklyEditor.tsx` | Component | UI <-> Workspace | Existing `BlocklyEditor.tsx` |
| `src/lib/blocks/workspaceManager.ts` | Service | Configuration -> Workspace | `src/lib/blocks/robotGenerators.ts` (init pattern) |
| `src/store/blockStore.ts` | Store | Workspace Ref <-> App State | `src/store/editorStore.ts` |
| `src/index.css` | Styles | CSS Isolation Layer | Global theme patterns |

## Established Patterns

### Pattern 1: Workspace Configuration (from Research)
Complete configuration for `Blockly.inject()` to ensure drag-drop and navigation work correctly.

```typescript
// Proposed for src/lib/blocks/workspaceManager.ts
export const WORKSPACE_CONFIG: Blockly.BlocklyOptions = {
  toolbox: {
    kind: "categoryToolbox",
    contents: [/* ... */]
  },
  scrollbars: true,
  trashcan: true,
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2
  },
  move: {
    scrollbars: true,
    drag: true,
    wheel: true
  },
  grid: {
    spacing: 20,
    length: 3,
    colour: '#ccc',
    snap: true
  },
  sounds: true,
  renderer: 'geras'
};
```

### Pattern 2: CSS Isolation Layer (from Context)
Using `isolation: isolate` and z-index stacking to prevent UI conflicts.

```css
/* Proposed for src/index.css */
.blockly-wrapper {
  isolation: isolate;
  z-index: 0;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.blockly-wrapper > div {
  position: relative !important;
  z-index: 1 !important;
}

.blocklySvg {
  position: relative !important;
  z-index: 2 !important;
}
```

### Pattern 3: React Lifecycle Hook (from Research)
Standardized `useEffect` for Blockly initialization and disposal.

```typescript
// Proposed for src/components/editor/BlocklyEditor.tsx
useEffect(() => {
  if (!blocklyDiv.current) return;

  const workspace = Blockly.inject(blocklyDiv.current, WORKSPACE_CONFIG);
  setBlocklyWorkspace(workspace);

  const resizeObserver = new ResizeObserver(() => {
    Blockly.svgResize(workspace);
  });
  resizeObserver.observe(blocklyDiv.current);

  return () => {
    resizeObserver.disconnect();
    workspace.dispose();
  };
}, []);
```

## Anti-Patterns to Avoid

- **Missing cleanup**: Always `workspace.dispose()` to prevent memory leaks.
- **Surface CSS fixes**: Don't use `!important` on random elements; use the isolation layer.
- **Blocking UI events**: Always check `event.isUiEvent` in change listeners.

---
*Phase: 09-block-editor-foundation*
*Patterns mapped: 2026-05-07*
