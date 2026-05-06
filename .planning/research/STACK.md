# Technology Stack

**Project:** Project Harmonia v1.1 UX Foundation & Block Fixes
**Researched:** 2026-05-06

## Stack Additions for v1.1

**Summary:** Minor additions to existing stack. Focus on block editor debugging, accessibility primitives, onboarding flows, and UI polish. No major framework changes needed.

---

## Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| React | ^19.2.5 (existing) | UI framework | Already in place, stable for block editor |
| TypeScript | ~6.0.2 (existing) | Type safety | Required for block-AST synchronization |
| Vite | ^8.0.10 (existing) | Build tool | Fast HMR for block editor debugging |

**No changes needed.** Current setup is optimal for block editor work.

---

## Block Editor Fixes

| Technology | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| **blockly** | **^12.5.1 (upgrade to latest)** | Core block editor | **MUST upgrade** - v12.x includes major drag-drop fixes and performance improvements |
| **blockly/dev-tools** | Latest | Debug workspace state | Use during development to inspect block tree, flyout state |

### Blockly Upgrade Considerations

**Current:** ^12.5.1
**Recommended:** Upgrade to ^12.5.1 or latest available

**Why upgrade:**
- v12.x series (released 2025) includes fixes for drag-drop on touch devices
- Better flyout performance and palette rendering
- Coordinate system fixes for ghost images during drag
- Repository moved from `google/blockly` to `RaspberryPiFoundation/blockly` in Nov 2025

**Breaking changes to watch:**
- Check custom block definitions for API changes
- Verify workspace options migration
- Test AST sync after upgrade

**Debugging tools:**
```bash
npm install --save-dev blockly/dev-tools
```

---

## Accessibility (Screen Reader & Keyboard Nav)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **react-aria** | ^3.48.0 | ARIA primitives | **New addition** - WAI-ARIA compliant hooks, brings your own styles |
| @radix-ui/react-dialog | ^1.1.15 (existing) | Accessible dialogs | Keep - already WCAG compliant |
| @radix-ui/react-label | ^2.1.8 (existing) | Form labels | Keep - integrates with react-hook-form |
| @axe-core/react | ^4.11.3 | A11y testing | **New dev dependency** - catch regressions |

### React Aria Integration

**Why React Aria over alternatives:**
- Style-free (brings your own Tailwind/Shadcn styles)
- 50+ components with built-in ARIA semantics
- Advanced features: accessible drag-drop (critical for blocks), keyboard multi-select
- Screen reader tested across NVDA, JAWS, VoiceOver, TalkBack
- Works with existing Shadcn + Tailwind setup

**Install:**
```bash
npm install react-aria
```

**Key hooks for block editor:**
- `useDraggable` - Accessible block drag-drop
- `useFocusable` - Keyboard navigation in block palette
- `useGridList` - Keyboard-navigable block toolbox
- `useListBox` - Accessible flyout palette

### Accessibility Testing

**Install axe-core:**
```bash
npm install --save-dev @axe-core/react
```

**Usage:**
```tsx
import { Axe } from '@axe-core/react';

<Axe>{/* Wrap your app during dev */}</Axe>
```

---

## UI Polish & Animations

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **framer-motion** | ^12.38.0 | Animation library | **New addition** - physics-based animations, gesture support |
| tailwindcss-animate | ^1.0.7 (existing) | Tailwind animation utilities | Keep - works for simple transitions |
| **sonner** | ^2.0.7 | Toast notifications | **New addition** - modern, accessible toasts (replace react-hot-toast) |

### Framer Motion Integration

**Why Framer Motion:**
- Physics-based springs feel natural for block interactions
- Built-in drag gesture system (block drag-drop polish)
- Layout animations for smooth palette rendering
- Gesture animations for mobile block editing

**Install:**
```bash
npm install framer-motion
```

**Use cases:**
```tsx
// Block drag feedback
<motion.div
  drag
  dragConstraints={workspaceRef}
  dragElastic={0.1}
  whileDrag={{ scale: 1.05 }}
/>

// Palette slide-in
<motion.div
  initial={{ x: -300 }}
  animate={{ x: 0 }}
  transition={{ type: "spring", stiffness: 300 }}
/>
```

### Sonner for Notifications

**Why Sonner over react-hot-toast:**
- Built-in keyboard dismiss (ESC key)
- Screen reader announcements via ARIA live regions
- Stacking animations
- Promise-based loading states

**Install:**
```bash
npm install sonner
```

---

## Onboarding & Tutorials

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **react-joyride** | ^2.6.0 | Product tours | **New addition** - React-first, component control |
| Autosize | ^6.0.1 | Auto-resizing textareas | **New addition** - for tutorial code editors |

### React Joyride Integration

**Why Joyride:**
- React-native (not a wrapper around vanilla JS)
- Control over existing components (spotlight feature)
- Easy to implement with existing Shadcn components
- Good TypeScript support

**Install:**
```bash
npm install react-joyride
```

**Use cases:**
- First-run tour: "Welcome to Project Harmonia"
- Feature highlights: "Drag blocks here to start coding"
- Interactive tutorials: "Now try connecting this motor block"

---

## Performance Optimization

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| react-window | ^2.2.7 | Virtualization | **New addition** - large project lists, block flyouts |
| **(Use existing)** | zustand ^5.0.12 | State management | Already optimal - avoid unnecessary re-renders |

### React Window Integration

**Install:**
```bash
npm install react-window
```

**Use cases:**
- Virtualized project gallery (100+ projects)
- Large block palettes (100+ block types)
- Classroom student lists

---

## Forms & Validation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| react-hook-form | ^7.75.0 (existing) | Form state | Keep - already integrated |
| zod | ^4.4.2 (existing) | Schema validation | Keep - works with react-hook-form |

**No changes needed.** Existing setup is optimal.

---

## Development Tools

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| @axe-core/react | ^4.11.3 | Accessibility testing | **New dev dependency** |
| blockly/dev-tools | Latest | Blockly debugging | **New dev dependency** |

---

## Installation Summary

```bash
# Production dependencies
npm install react-aria framer-motion sonner react-joyride react-window autosize

# Upgrade blockly
npm install blockly@latest

# Development dependencies
npm install --save-dev @axe-core/react blockly/dev-tools
```

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| **Onboarding** | react-joyride | react-shepherd, intro.js | Joyride is React-native, better component control |
| **Animations** | framer-motion | auto-animate, react-spring | Framer Motion has better gesture support for drag-drop |
| **A11y Primitives** | react-aria | radix-ui (more), headless-ui | React Aria has better docs for advanced patterns (drag-drop) |
| **Toasts** | sonner | react-hot-toast | Sonner has better keyboard/a11y support |
| **Virtualization** | react-window | react-virtuoso | react-window is simpler, sufficient for our use case |

---

## Integration with Existing Stack

### Shadcn + Tailwind Compatibility

All new libraries are compatible with existing Shadcn + Tailwind setup:

- **React Aria:** Bring your own styles (perfect for Shadcn)
- **Framer Motion:** Works with Tailwind classes
- **Sonner:** Themable via CSS variables (Shadcn compatible)
- **Joyride:** Style with Tailwind classes

### Existing Dependencies

No removals needed. All additions complement the current stack.

---

## Phase-by-Phase Rollout

### Phase 1: Block Fixes
- Upgrade blockly to latest
- Add blockly/dev-tools for debugging
- Fix drag-drop, palette rendering

### Phase 2: Accessibility
- Install react-aria
- Add @axe-core/react to dev
- Implement keyboard navigation for blocks
- Screen reader testing

### Phase 3: UI Polish
- Install framer-motion
- Add sonner (replace any existing toast)
- Implement animations for drag feedback, palette

### Phase 4: Onboarding
- Install react-joyride
- Create first-run tour
- Build interactive tutorials

### Phase 5: Performance
- Add react-window for virtualization
- Profile large workspaces
- Optimize re-renders

---

## Sources

- [React Aria Official Documentation](https://react-aria.adobe.com/) - HIGH confidence (official docs)
- [Blockly v12.x Release Notes](https://github.com/RaspberryPiFoundation/blockly/releases) - HIGH confidence (official)
- [5 Best React Onboarding Libraries in 2025](https://onboardjs.com/blog/5-best-react-onboarding-libraries-in-2025-compared) - MEDIUM confidence (comparison article)
- [Building Accessible Components in 2025](https://medium.com/@alexdev82/building-accessible-components-in-2025-what-i-wish-i-knew-earlier-6f4ce5c87530) - MEDIUM confidence (best practices guide)
- [Accessibility Quick Wins in ReactJS 2025](https://medium.com/@sureshdotariya/accessibility-quick-wins-in-reactjs-2025-skip-links-focus-traps-aria-live-regions-c926b9e44593) - MEDIUM confidence (patterns guide)
- NPM package versions - HIGH confidence (direct from npm registry)
