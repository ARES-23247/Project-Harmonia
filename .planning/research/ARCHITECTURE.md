# Architecture Patterns

**Domain:** Robotics IDE - UX Fixes & Block Editor Debugging
**Researched:** 2026-05-06

## Current Architecture Analysis

### Existing Stack Components

| Component | Technology | Current Role | Integration Point |
|-----------|-----------|--------------|-------------------|
| **Editor Container** | `react-resizable-panels` | Multi-panel layout | Parent of all editors |
| **Block Editor** | `blockly` v12.5.1 | Visual programming | Injected into div |
| **Text Editor** | `@monaco-editor/react` | Python code | Two-way sync target |
| **State** | `zustand` | Global editor state | All components |
| **UI Components** | `shadcn/ui` + Tailwind | Component library | App-wide |
| **Routing** | `react-router-dom` | Navigation | App structure |
| **Auth** | `better-auth` | Authentication | Login flows |
| **Collaboration** | `partykit` + `yjs` | Real-time sync | Editor state |
| **Theme** | Tailwind CSS class-based | Light/dark mode | `index.css` variables |

### Current Block Editor Implementation

```typescript
// src/components/editor/BlocklyEditor.tsx (simplified)
const workspace = Blockly.inject(blocklyDiv.current, {
  toolbox: { kind: "categoryToolbox", contents: [...] }
});

const onWorkspaceChange = (event: any) => {
  if (event.isUiEvent) return;
  const code = pythonGenerator.workspaceToCode(workspace);
  setPythonCode(code || "# Drag blocks to generate code.");
};
workspace.addChangeListener(onWorkspaceChange);
```

**Identified Issues:**
1. No proper CSS isolation for Blockly SVG
2. Missing z-index management for drag-drop
3. ResizeObserver implemented but not tested for all resize scenarios
4. No workspace serialization/persistence
5. Static toolbox configuration

## Recommended Architecture for UX Fixes

### Component Modification Strategy

| Component | Modification Type | Scope | Rationale |
|-----------|-------------------|-------|-----------|
| `BlocklyEditor.tsx` | **MAJOR REFACTOR** | Complete rewrite | Fix drag-drop, add proper lifecycle |
| `Workspace.tsx` | **ENHANCE** | Add animation layers | Panel transitions, theme context |
| `editorStore.ts` | **SPLIT** | Extract block-specific state | Prevent cascading re-renders |
| `App.tsx` | **MODERATE** | Add theme provider | Centralized theme control |
| UI components (`button.tsx`, etc.) | **MINOR** | Add animation props | Progressive enhancement |

### New Components to Create

```
src/
├── components/
│   ├── editor/
│   │   ├── BlocklyEditor.tsx          [REFACTOR]
│   │   ├── BlocklyWorkspaceProvider.tsx [NEW] - Workspace lifecycle
│   │   ├── BlockPalette.tsx            [NEW] - Isolated palette
│   │   └── Workspace.tsx               [ENHANCE]
│   ├── theme/
│   │   ├── ThemeProvider.tsx           [NEW] - Theme context
│   │   ├── ThemeToggle.tsx             [NEW] - Theme switcher
│   │   └── HighContrastToggle.tsx      [NEW] - Accessibility mode
│   ├── onboarding/
│   │   ├── TutorialProvider.tsx        [NEW] - Tutorial state
│   │   ├── InteractiveTour.tsx         [NEW] - Tour component
│   │   └── TutorialSteps.tsx           [NEW] - Step definitions
│   └── animations/
│       ├── AnimatedPanel.tsx           [NEW] - Panel transitions
│       └── TransitionWrapper.tsx       [NEW] - Reusable transitions
├── lib/
│   ├── blocks/
│   │   └── workspaceManager.ts         [NEW] - Workspace lifecycle logic
│   ├── theme/
│   │   ├── themeConfig.ts              [NEW] - Theme definitions
│   │   └── animations.ts               [NEW] - Animation presets
│   └── accessibility/
│       ├── keyboardNav.ts              [NEW] - Keyboard shortcuts
│       └── screenReader.ts             [NEW] - ARIA helpers
└── store/
    ├── editorStore.ts                  [SPLIT] - Core editor state
    ├── blockStore.ts                   [NEW] - Blockly-specific state
    └── themeStore.ts                   [NEW] - Theme state
```

## Critical Block Editor Fixes

### Issue 1: Drag-Drop Broken

**Root Cause:** CSS positioning and z-index conflicts

**Solution:**

```typescript
// 1. CSS Isolation Wrapper
const BlocklyWrapper = () => (
  <div className="blockly-wrapper relative w-full h-full overflow-hidden">
    <div ref={blocklyDiv} className="absolute inset-0" />
  </div>
);

// 2. CSS (add to index.css)
.blockly-wrapper {
  /* Ensure proper stacking context */
  isolation: isolate;
  z-index: 0;
}

.blocklyWrapper > div {
  /* Blockly injection container */
  position: relative !important;
  z-index: 1 !important;
}

.blocklySvg {
  /* Main workspace SVG */
  position: relative !important;
  z-index: 2 !important;
}

.blocklyToolboxDiv {
  /* Palette/flyout */
  z-index: 10 !important;
}

.blocklyDraggable {
  /* Dragged blocks */
  z-index: 100 !important;
  pointer-events: auto !important;
}
```

### Issue 2: Static Palette

**Solution:** Dynamic toolbox with state management

```typescript
// src/lib/blocks/workspaceManager.ts
export class WorkspaceManager {
  private workspace: Blockly.Workspace | null = null;

  inject(container: HTMLElement, config: Blockly.BlocklyOptions) {
    this.workspace = Blockly.inject(container, {
      ...config,
      scrollbars: true,
      trashcan: true,
      toolbox: this.buildDynamicToolbox(),
    });
    return this.workspace;
  }

  updateToolbox(category: string) {
    if (!this.workspace) return;
    const toolbox = this.buildFilteredToolbox(category);
    this.workspace.updateToolbox(toolbox);
  }

  private buildDynamicToolbox(): toolbox {
    // Build from registered blocks
    return {
      kind: "categoryToolbox",
      contents: this.getRegisteredCategories(),
    };
  }
}
```

### Issue 3: Workspace Lifecycle

**Current Problem:** No proper cleanup, potential memory leaks

**Solution:**

```typescript
// src/components/editor/BlocklyWorkspaceProvider.tsx
export function BlocklyWorkspaceProvider({ children }: { children: React.ReactNode }) {
  const workspaceRef = useRef<Blockly.Workspace | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!blocklyDiv.current) return;

    // Initialize workspace
    const workspace = workspaceManager.inject(blocklyDiv.current, config);
    workspaceRef.current = workspace;
    setIsReady(true);

    // Cleanup function
    return () => {
      if (workspaceRef.current) {
        // Save workspace state before disposal
        const xml = Blockly.Xml.workspaceToDom(workspaceRef.current);
        saveWorkspaceState(xml);

        // Proper disposal
        workspaceRef.current.dispose();
        workspaceRef.current = null;
      }
    };
  }, []);

  return <BlocklyContext.Provider value={{ workspace: workspaceRef.current, isReady }}>
    {children}
  </BlocklyContext.Provider>;
}
```

## Architecture for UI Polish

### Theme System

```typescript
// src/lib/theme/themeConfig.ts
export const themes = {
  light: { /* ... */ },
  dark: { /* ... */ },
  highContrast: {
    background: "0 0% 0%",
    foreground: "0 0% 100%",
    // WCAG AAA compliant colors
    primary: "210 100% 50%",  // Bright blue
    border: "0 0% 100%",      // White borders
  },
};

// src/components/theme/ThemeProvider.tsx
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark" | "highContrast">("dark");

  useEffect(() => {
    const root = document.documentElement;
    root.className = theme; // Applies .dark or .high-contrast
    root.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### Animation Layer

**Recommended Library:** Framer Motion (or Motion)

```typescript
// src/components/animations/AnimatedPanel.tsx
import { motion } from "framer-motion";

export function AnimatedPanel({ children, className }: PanelProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
```

**Animation Patterns:**
- Panel resize: Spring physics (natural feel)
- Theme switch: Crossfade 300ms
- Modal/dialog: Scale + fade from center
- Button hover: Color transition 150ms
- Block placement: Bounce animation

## Architecture for Accessibility

### Keyboard Navigation

```typescript
// src/lib/accessibility/keyboardNav.ts
export const keyboardShortcuts = {
  "Ctrl+B": () => focusBlockly(),
  "Ctrl+M": () => focusMonaco(),
  "Ctrl+S": () => saveProject(),
  "Ctrl+K": () => openCommandPalette(),
  "Escape": () => closeModals(),
  "Tab": () => navigatePanels(),
};

// Implement global keyboard handler
export function useKeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const combo = `${e.ctrlKey ? "Ctrl+" : ""}${e.key}`;
      const handler = keyboardShortcuts[combo as keyof typeof keyboardShortcuts];
      if (handler) {
        e.preventDefault();
        handler();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
}
```

### Screen Reader Support

```typescript
// ARIA attributes for Blockly
const blocklyConfig = {
  aria: {
    modal: true,
    label: "Visual programming workspace",
  },
  rtl: false, // Support RTL if needed
};

// Live regions for code generation
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  {generatedCodeDescription}
</div>
```

### High Contrast Mode

```css
/* src/index.css additions */
.high-contrast {
  --border: 0 0% 100%;
  --ring: 210 100% 50%;

  /* Force visible borders on all interactive elements */
  button, a, input, [role="button"] {
    border: 2px solid hsl(var(--border)) !important;
    box-shadow: none !important;
  }

  /* Ensure text meets WCAG AAA */
  * {
    forced-color-adjust: none;
  }
}
```

## Architecture for Performance

### Code Splitting Strategy

```typescript
// Lazy load heavy editors
const BlocklyEditor = lazy(() => import("./BlocklyEditor"));
const MonacoEditor = lazy(() => import("./MonacoEditor"));
const SimulationPanel = lazy(() => import("./SimulationPanel"));

// Route-based splitting
const Editor = lazy(() => import("./pages/Editor"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
```

### Zustand Store Optimization

**Current Problem:** Single large store causes unnecessary re-renders

**Solution:** Split stores by concern

```typescript
// src/store/blockStore.ts (NEW - isolated Blockly state)
interface BlockState {
  workspaceXml: string;
  selectedBlock: string | null;
  setWorkspaceXml: (xml: string) => void;
  setSelectedBlock: (id: string | null) => void;
}

export const useBlockStore = create<BlockState>((set) => ({
  workspaceXml: "",
  selectedBlock: null,
  setWorkspaceXml: (xml) => set({ workspaceXml: xml }),
  setSelectedBlock: (id) => set({ selectedBlock: id }),
}));

// Selectors prevent unnecessary re-renders
export const useWorkspaceXml = () => useBlockStore((s) => s.workspaceXml);
```

### Lazy Blockly Initialization

```typescript
// Don't load Blockly until panel is visible
const [isBlocklyVisible, setIsBlocklyVisible] = useState(false);

<Panel
  defaultSize={40}
  minSize={20}
  onExpand={() => setIsBlocklyVisible(true)}
  onCollapse={() => setIsBlocklyVisible(false)}
>
  {isBlocklyVisible ? <BlocklyEditor /> : <LoadingPlaceholder />}
</Panel>
```

### Performance Monitoring

```typescript
// src/lib/performance/monitor.ts
export function measureRender(componentName: string) {
  return (target: any) => {
    return class extends target {
      render() {
        const start = performance.now();
        const result = super.render();
        const duration = performance.now() - start;

        if (duration > 16) { // Slower than 60fps
          console.warn(`Slow render: ${componentName} took ${duration.toFixed(2)}ms`);
        }

        return result;
      }
    };
  };
}
```

## Architecture for Onboarding

### Tutorial System

**Recommended Library:** React Joyride (most popular) or Shepherd

```typescript
// src/components/onboarding/InteractiveTour.tsx
import Joyride, { Step } from "react-joyride";

const tutorialSteps: Step[] = [
  {
    target: ".blockly-wrapper",
    content: "Drag blocks here to build your robot program visually.",
    disableBeacon: true,
  },
  {
    target: ".monaco-editor",
    content: "Your code appears here in real-time. You can edit it directly too!",
  },
  {
    target: "[data-panel='simulation']",
    content: "Test your code in the virtual robot simulator before flashing.",
  },
];

export function InteractiveTour() {
  const [run, setRun] = useState(false);

  useEffect(() => {
    // Check if user has seen tutorial
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
    if (!hasSeenTutorial) {
      setRun(true);
    }
  }, []);

  const handleCallback = (data: any) => {
    if (data.status === "finished") {
      localStorage.setItem("hasSeenTutorial", "true");
    }
  };

  return <Joyride steps={tutorialSteps} run={run} callback={handleCallback} />;
}
```

### Progressive Disclosure

```typescript
// src/lib/onboarding/featureFlags.ts
export const userProgress = {
  hasCreatedFirstBlock: false,
  hasConnectedToHardware: false,
  hasUsedSimulator: false,
};

// Show hints based on progress
export function showHintFor(feature: keyof typeof userProgress) {
  if (!userProgress[feature]) {
    return <HintBubble>{getHintText(feature)}</HintBubble>;
  }
  return null;
}
```

## Component Communication Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         App.tsx                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              ThemeProvider (NEW)                      │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │          Workspace.tsx (Enhanced)               │  │  │
│  │  │  ┌──────────────┐  ┌──────────────┐           │  │  │
│  │  │  │ AnimatedPanel│  │ AnimatedPanel│           │  │  │
│  │  │  │   (NEW)      │  │   (NEW)      │           │  │  │
│  │  │  │  ┌────────┐  │  │  ┌────────┐  │           │  │  │
│  │  │  │  │Blockly │  │  │  │ Monaco │  │           │  │  │
│  │  │  │  │ Editor │  │  │  │ Editor │  │           │  │  │
│  │  │  │  │(Refactor)│ │  │  │(Enhance)│ │           │  │  │
│  │  │  │  └────────┘  │  │  └────────┘  │           │  │  │
│  │  │  │       │       │  │      │       │           │  │  │
│  │  │  │  ┌────┴────┐  │  │  ┌───┴───┐  │           │  │  │
│  │  │  │  │Workspace│  │  │  │Editor  │  │           │  │  │
│  │  │  │  │Manager  │  │  │  │Store   │  │           │  │  │
│  │  │  │  │ (NEW)   │  │  │  │(Split) │  │           │  │  │
│  │  │  │  └─────────┘  │  │  └────────┘  │           │  │  │
│  │  │  └──────────────┘  └──────────────┘           │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            InteractiveTour (NEW)                      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Migration Strategy

### Phase 1: Foundation (Block Editor Fixes)
1. Create `WorkspaceManager` class
2. Refactor `BlocklyEditor.tsx` with proper lifecycle
3. Add CSS isolation layer
4. Test drag-drop thoroughly

### Phase 2: State & Performance
1. Split Zustand stores (`editorStore` → `editorStore` + `blockStore`)
2. Add lazy loading for panels
3. Implement code splitting
4. Add performance monitoring

### Phase 3: UI Polish
1. Create `ThemeProvider`
2. Add Framer Motion
3. Implement panel animations
4. Add theme switcher UI

### Phase 4: Accessibility
1. Implement keyboard navigation
2. Add ARIA attributes
3. Create high contrast mode
4. Test with screen readers

### Phase 5: Onboarding
1. Integrate React Joyride
2. Create tutorial steps
3. Add progress tracking
4. Implement progressive disclosure

## Anti-Patterns to Avoid

### Anti-Pattern 1: Direct Blockly DOM Manipulation
**What:** Using `document.querySelector` to modify Blockly SVG
**Why bad:** Breaks encapsulation, fragile to Blockly updates
**Instead:** Use Blockly APIs (`workspace.getFlyout()`, etc.)

### Anti-Pattern 2: Global Theme Manipulation
**What:** Setting `document.documentElement.className` in components
**Why bad:** Race conditions, hard to debug
**Instead:** Use centralized `ThemeProvider` context

### Anti-Pattern 3: Monolithic Zustand Store
**What:** Single store for all editor state
**Why bad:** Causes unnecessary re-renders across components
**Instead:** Split stores by domain (blocks, editor, theme)

### Anti-Pattern 4: Inline Animation Styles
**What:** Adding `style={{ transition: "all 0.3s" }}` everywhere
**Why bad:** Inconsistent timing, hard to maintain
**Instead:** Use animation library with predefined variants

### Anti-Pattern 5: Accessibility as Afterthought
**What:** Adding ARIA labels after UI is complete
**Why bad:** Often incomplete, requires rework
**Instead:** Design accessibility-first, test with screen reader early

## Scalability Considerations

| Concern | Current Approach | At 100 Users | At 10K Users | At 1M Users |
|---------|------------------|--------------|--------------|-------------|
| Block Storage | In-memory state | Browser storage OK | IndexedDB | Add backend |
| Collaboration | Partykit/Yjs | Fine | Monitor limits | Redis backend |
| Code Generation | Client-side PythonGen | Fine | Consider Web Worker | Consider server |
| Theme Loading | CSS variables | Fine | Fine | Fine |
| Onboarding | LocalStorage | Fine | Fine | Cloud sync progress |

## Sources

### Blockly Integration
- [Stack Overflow - Blockly Workspace Resize](https://stackoverflow.com/questions/36837896/is-there-another-way-to-resize-blockly-workspace) - HIGH confidence (verified documentation)
- [Google Groups - Blockly Toolbox Placement](https://groups.google.com/g/blockly/c/tg88h83rFvM) - MEDIUM community discussion
- [GitHub Issue #4012 - Blockly Resize Problems](https://github.com/google/blockly/issues/4012) - HIGH confidence (official)

### Accessibility
- [LogRocket - useEffect Cleanup Function](https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/) - HIGH confidence (verified)
- [Refine - React useEffect Cleanup](https://refine.dev/blog/useeffect-cleanup/) - HIGH (verified documentation)
- [Tailwind CSS - forced-color-adjust](https://tailwindcss.com/docs/forced-color-adjust) - HIGH (official docs)
- [Tailwind High Contrast Mode Guide](https://tailwindcolor.tools/guides/high-contrast-mode-guide) - MEDIUM (community resource)

### Performance & State
- [Medium - React 19 Zustand Guide](https://medium.com/@reactjsbd/react-19-state-management-with-zustand-a-developers-guide-to-modern-state-handling-8b6192c1e306) - MEDIUM (community)
- [Zustand Performance Optimization](https://sanjewa.com/blogs/zustand-performance-optimization-best-practices/) - MEDIUM (blog)
- [Dev.to - React Performance 2025](https://dev.to/alex_bobes/react-performance-optimization-15-best-practices-for-2025-17l9) - MEDIUM (community)
- [TkDodo - Working with Zustand](https://tkdodo.eu/blog/working-with-zustand) - HIGH (respected source)

### UI/Animation
- [Shadcn Animation Library](https://shadcnstudio.com/blog/shadcn-animation-library) - MEDIUM (blog)
- [Motion Primitives Template](https://shadcn.io/template/ibelick-motion-primitives) - HIGH (official template)
- [React 19 Announcement](https://react.dev/blog/2024/12/05/react-19) - HIGH (official)

### Onboarding
- [5 Best React Onboarding Libraries 2026](https://onboardjs.com/blog/5-best-react-onboarding-libraries-in-2025-compared) - MEDIUM (comparison)
- [React Tour Library Comparison](https://merge.rocks/resources/websites-playbook/website-strategy-planning/react-tour-library-comparison-react-joyride-vs-shepherd-vs-intro-js) - MEDIUM (comparison)
- [UserGuiding - React Onboarding Libraries](https://userguiding.com/blog/react-onboarding-tour) - MEDIUM (commercial blog)
