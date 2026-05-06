# Project Research Summary

**Project:** Project Harmonia v1.1 - UX Foundation & Block Fixes
**Domain:** Educational Robotics IDE - Block Editor UX & Accessibility
**Researched:** 2026-05-06
**Confidence:** HIGH

## Executive Summary

Project Harmonia is an educational robotics IDE combining visual block-based programming with Python text editing, targeting FTC and LEGO robotics education. The research reveals that the current v1.0 codebase has critical block editor issues (broken drag-drop, static palette) that must be addressed before UX polish can be effective. Experts build these tools with accessibility-first architecture (keyboard navigation before ARIA overlays), performance measurement before optimization, and onboarding that is skippable and replayable.

The recommended approach is a five-phase rollout: (1) Fix core Blockly integration and drag-drop, (2) Implement accessibility primitives with semantic HTML and keyboard navigation, (3) Add UI polish with Framer Motion animations and theme system, (4) Build interactive onboarding with React Joyride, and (5) Optimize performance with measured profiling. The stack requires minor additions: `react-aria` for accessibility primitives, `framer-motion` for animations, `react-joyride` for tours, `sonner` for accessible toasts, and `@axe-core/react` for a11y testing. The critical risk is treating block editor issues as CSS-only rather than fundamental Blockly lifecycle problems—research shows this approach leads to fragile fixes that break with browser or library updates.

Key risks identified: (1) Block editor fixes are often deeper than they appear—drag-drop issues typically stem from initialization timing, z-index stacking contexts, or event handling conflicts, not surface CSS. (2) Accessibility overlays and ARIA retrofitting are actively harmful—67% of practitioners and 72% of users with disabilities rate them as ineffective or worse. (3) Performance optimization without measurement leads to wasted effort and potential regressions. (4) Non-skippable tutorials drive away advanced users. Mitigation: Map the full Blockly initialization chain before touching code, design accessibility-first with semantic HTML, profile actual bottlenecks before optimizing, and always provide skip/replay options for tutorials.

## Key Findings

### Recommended Stack

Minor additions to existing React 19 + Zustand + Shadcn/Tailwind stack. No framework changes needed—current setup is optimal for block editor work.

**New production dependencies:**
- `react-aria` (^3.48.0) — WAI-ARIA compliant primitives with style-free components that integrate with Tailwind
- `framer-motion` (^12.38.0) — Physics-based animations for natural block drag feedback and gesture support
- `react-joyride` (^2.6.0) — React-native tour library with component control for first-run onboarding
- `sonner` (^2.0.7) — Accessible toast notifications with keyboard dismiss and screen reader support
- `react-window` (^2.2.7) — Virtualization for large project lists and block palettes

**Development tools:**
- `@axe-core/react` (^4.11.3) — Automated accessibility testing to catch regressions during development
- `blockly/dev-tools` (latest) — Workspace state debugging for block editor troubleshooting

**Critical upgrade:**
- `blockly` — Upgrade to latest ^12.5.1+ for drag-drop fixes, flyout performance improvements, and coordinate system fixes. The repository moved to RaspberryPiFoundation/blockly in Nov 2025.

### Expected Features

**Must have (table stakes) — users expect these or product feels broken:**
- Functional drag-drop with snap feedback — core interaction model, must work on desktop/tablet
- Dynamic/scrollable palette with category organization — static palettes don't scale, expected pattern from Scratch/MakeCode
- Visual block feedback (hover, snap indicators, connection previews) — critical for usability
- Undo/redo for both block and text operations — users make mistakes
- Workspace zoom/pan with scroll wheel and Ctrl+scroll — projects grow, users need navigation
- Basic keyboard navigation (Tab, Enter, arrows) — accessibility baseline
- WCAG 2.2 AA contrast compliance (4.5:1 normal, 3:1 large) — legal requirement for education
- Dark/light theme toggle with high contrast mode — user preference and accessibility
- Auto-save with GitHub Gists — already implemented, critical for classroom use
- First-run tutorial with skip option — new users need guidance

**Should have (competitive differentiators — already built, need highlighting):**
- Block-to-Text two-way sync — seamless visual-to-Python transition, unique in robotics education
- Hardware-agnostic Universal API — one block language for LEGO/XRP/Rev IQ
- Simulator integration — test without hardware, classroom-friendly
- AI Copilot for student-friendly error explanations
- Real-time collaboration via CRDTs — student team support
- Offline PWA mode — works without internet for under-resourced schools

**Defer to v2+:**
- Full screen reader support — complex enough to warrant phase-specific research
- Tutorial editor — focus on consuming tutorials first
- Mini-map for workspace navigation — nice-to-have, not blocking
- Mobile phone support — screens too small for block coding, explicitly out of scope

### Architecture Approach

Current architecture has sound foundations but needs targeted refactoring for block editor lifecycle and state management. The BlocklyEditor component requires major refactoring for proper workspace initialization, cleanup, and CSS isolation. State management should split the monolithic Zustand store into domain-specific stores (blocks, editor, theme) to prevent cascading re-renders.

**Major component changes:**
1. **BlocklyWorkspaceProvider (NEW)** — Encapsulates workspace lifecycle with proper initialization, cleanup, and serialization
2. **WorkspaceManager class (NEW)** — Handles dynamic toolbox updates, workspace state, and injection timing
3. **ThemeProvider (NEW)** — Centralized theme context with light/dark/high-contrast modes
4. **editorStore → editorStore + blockStore (SPLIT)** — Separate concerns to prevent unnecessary re-renders across components
5. **AnimatedPanel (NEW)** — Framer Motion wrapper for smooth panel transitions with spring physics

**Critical fixes:**
- CSS isolation layer for Blockly SVG with proper z-index stacking context
- Lazy Blockly initialization (only when panel visible)
- Event listener cleanup to prevent memory leaks
- Workspace serialization/persistence for auto-save

### Critical Pitfalls

1. **Treating Block Editor Fixes as Surface-Level Issues** — Assuming drag-drop and palette problems are CSS-only when they're often symptoms of deeper Blockly initialization, injection timing, or stacking context problems. **Prevention:** Map the full initialization chain, test Blockly in isolation, check for z-index stacking conflicts, verify SVG injection timing.

2. **Accessibility Overlay/Retrofit Trap** — Adding ARIA patches or overlay widgets without semantic foundation. Research shows 67% of practitioners and 72% of users with disabilities rate overlays as ineffective or actively harmful. **Prevention:** Never use overlays, start with keyboard navigation, use semantic HTML, test with actual screen readers (NVDA/VoiceOver/TalkBack).

3. **Performance Optimization Without Measurement** — Optimizing based on assumptions rather than profiling data, leading to wasted effort and potential regressions. **Prevention:** Profile with Chrome DevTools first, focus on user-perceived latency (time to interactive, input delay), optimize only measured bottlenecks.

4. **Tutorial That Can't Be Skipped or Revisited** — Forcing users through onboarding with no exit, causing advanced users to abandon the tool. **Prevention:** Always provide obvious skip button, save progress for resume, make tutorial replayable from help menu.

5. **Block-to-Text Sync Race Conditions** — Bidirectional synchronization falls out of sync or enters infinite loops when both editors update simultaneously. **Prevention:** Implement sync lock (one direction at a time), debounce aggressively, handle syntax errors gracefully, version updates to detect stale changes.

## Implications for Roadmap

Based on combined research, suggested five-phase structure for v1.1 milestone:

### Phase 1: Block Editor Foundation
**Rationale:** Critical drag-drop and palette issues are blocking—users literally cannot use the product effectively. Research shows these are rarely CSS-only fixes and require proper Blockly lifecycle management. Must be fixed before polish work will be visible.

**Delivers:** Functional drag-drop, dynamic/scrollable palette, workspace zoom/pan, visual block feedback

**Addresses:** Functional drag-drop, dynamic palette, workspace navigation, visual feedback (from FEATURES.md)

**Avoids:** Pitfall #1 (surface-level fixes) by mapping full initialization chain and testing in isolation

**Stack:** Upgrade blockly to latest, add blockly/dev-tools

**Architecture:** Refactor BlocklyEditor.tsx with proper lifecycle, create WorkspaceManager class, add CSS isolation layer

**Research flag:** Skip — Blockly integration is well-documented with official Google/RaspberryPi Foundation resources

### Phase 2: Accessibility Foundation
**Rationale:** Accessibility is a legal requirement for education and must be built-in, not retrofitted. Keyboard navigation and semantic HTML enable all other accessibility features.

**Delivers:** WCAG contrast compliance, basic keyboard navigation, screen reader announcements, high contrast mode

**Addresses:** Keyboard navigation, screen reader support, visual accessibility (from FEATURES.md)

**Avoids:** Pitfall #2 (overlays) by using semantic HTML and react-aria primitives instead of ARIA patches

**Stack:** Install react-aria, @axe-core/react for testing

**Architecture:** Add keyboard navigation hooks, implement focus management, create ThemeProvider with high-contrast mode

**Research flag:** Needs research — Screen reader support for block-based coding is an active research area with sparse documentation. Code.org has temporarily disabled their keyboard nav for improvements, indicating complexity.

### Phase 3: UI Polish & Animations
**Rationale:** Now that core functionality works and accessibility foundation is in place, polish makes the product feel professional and delightful.

**Delivers:** Theme system (light/dark/high-contrast), smooth animations, loading states, component consistency

**Addresses:** Dark/light themes, animations & feedback, component consistency (from FEATURES.md)

**Uses:** Framer Motion for physics-based animations, sonner for accessible toasts

**Architecture:** Create ThemeProvider, AnimatedPanel components, animation presets

**Research flag:** Skip — UI animation patterns are well-established with Framer Motion documentation

### Phase 4: Interactive Onboarding
**Rationale:** With functional, accessible, polished UI, users need guidance to discover features. Tutorial can showcase differentiators like simulator and AI copilot.

**Delivers:** First-run interactive tutorial, contextual help, progressive hints

**Addresses:** First-run tutorial, help documentation (from FEATURES.md)

**Avoids:** Pitfall #4 (non-skippable tutorials) by providing skip button, progress saving, and replay option

**Stack:** Install react-joyride, Autosize for tutorial code editors

**Architecture:** Create TutorialProvider, InteractiveTour component, TutorialSteps definitions

**Research flag:** Skip — React Joyride has solid documentation and patterns are consistent across products

### Phase 5: Performance Optimization
**Rationale:** Now that all features work, measure and optimize actual bottlenecks rather than optimizing based on assumptions.

**Delivers:** Code splitting, lazy loading, virtualized lists, performance monitoring

**Addresses:** Loading & responsiveness features (from FEATURES.md)

**Avoids:** Pitfall #3 (premature optimization) by profiling first, then optimizing measured bottlenecks

**Stack:** Install react-window for virtualization

**Architecture:** Split Zustand stores, implement lazy Blockly initialization, add performance monitoring

**Research flag:** Skip — Performance patterns are well-documented with Chrome DevTools resources

### Phase Ordering Rationale

**Dependency-driven order:**
- Block fixes (Phase 1) must come first—drag-drop is the core interaction, and other polish is invisible if it doesn't work
- Accessibility (Phase 2) builds on block fixes—keyboard navigation requires functional block selection, semantic HTML structure
- UI Polish (Phase 3) requires stable components—animation libraries need predictable component lifecycle
- Onboarding (Phase 4) needs stable features—tutorial content breaks if UI changes during development
- Performance (Phase 5) comes last—optimize working code, not code that will be refactored

**Grouping by architecture concerns:**
- Phases 1-2: Core functionality (blockly integration, accessibility primitives)
- Phases 3-4: User experience (animations, tutorials)
- Phase 5: Engineering quality (performance)

### Research Flags

**Phases likely needing deeper research during planning:**
- **Phase 2 (Accessibility):** Screen reader support for block-based coding is sparse. Code.org indicates active development and temporary disabling. Recommend `/gsd-research-phase` for keyboard navigation and screen reader implementation patterns.

**Phases with standard patterns (skip research-phase):**
- **Phase 1 (Block Fixes):** Blockly integration is well-documented with official resources
- **Phase 3 (UI Polish):** Framer Motion and Tailwind patterns are established
- **Phase 4 (Onboarding):** React Joyride has solid documentation
- **Phase 5 (Performance):** Chrome DevTools and React performance patterns are well-documented

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Official library documentation, verified NPM versions |
| Features | HIGH | Multiple sources including Scratch/MakeCode/Code.org official docs |
| Architecture | HIGH | Based on official Blockly guides and React 19 patterns |
| Pitfalls | HIGH | Multiple sources agree on overlay harm, premature optimization risks |

**Overall confidence:** HIGH

All critical findings are backed by official documentation or authoritative sources. Blockly integration patterns come from Google/RaspberryPi Foundation docs. Accessibility recommendations are supported by W3C WCAG specifications and practitioner research. Performance patterns align with Chrome DevTools documentation.

### Gaps to Address

**Minor gaps that can be resolved during implementation:**
- **Screen reader specific patterns:** Block-based coding for screen readers is an active research area. Implementation should test with NVDA (Windows), VoiceOver (Mac), TalkBack (Android) and iterate based on user feedback.
- **Specific animation timings:** Research recommends <300ms for animations but specific durations for block interactions should be tested with users.
- **Performance targets:** Research suggests <3s load, <100ms block selection, <50ms typing—but these should be validated against actual user expectations in educational context.

**No blocking gaps:** All critical decisions have high-confidence backing from research.

## Sources

### Primary (HIGH confidence)
- [Blockly Official Docs - Custom Block Drag Strategies](https://developers.google.com/blockly/guides/configure/web/dragging/block-drag-strategies) — Block drag-drop implementation
- [Blockly Official Docs - Block Design Guidelines](https://developers.google.com/blockly/guides/design/blocks) — Visual block feedback patterns
- [Blockly Official Docs - Workspace Configuration](https://developers.google.com/blockly/guides/configure/web/configuration_struct) — Workspace setup
- [W3C WCAG 2.2 - Contrast Requirements](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced) — Accessibility standards
- [React Aria Official Documentation](https://react-aria.adobe.com/) — ARIA primitives
- [WordPress Gutenberg Performance Handbook](https://developer.wordpress.org/block-editor/explanations/architecture/performance/) — Performance metrics
- [Code.org - Keyboard Navigation for Block-Based Coding](https://support.code.org/hc/en-us/articles/15187510110733) — Accessibility patterns in production
- [Microsoft MakeCode Tutorial Tool](https://makecode.com/tutorial-tool) — Onboarding best practices

### Secondary (MEDIUM confidence)
- [A11Y Collective - Why Accessibility Overlays Fail](https://www.a11y-collective.com/blog/accessibility-overlays/) — Overlay research (67% ineffective)
- [UX Collective - Accessible Overlays Aren't Accessible](https://uxdesign.cc/accessible-overlays-arent-accessible-96876ef474a4) — Overlay harm evidence
- [Automattic Design - Accessibility in Block Editor](https://automattic.design/2021/03/12/accessibility-in-the-block-editor/) — Real-world complex editor a11y
- [WebAIM - Screen Reader Testing Methodology](https://webaim.org/articles/screenreader_testing/) — Testing approaches
- [5 Best React Onboarding Libraries 2025](https://onboardjs.com/blog/5-best-react-onboarding-libraries-in-2025-compared) — Library comparison
- [TkDodo - Working with Zustand](https://tkdodo.eu/blog/working-with-zustand) — State management patterns
- [GitHub - scratchfoundation/scratch-blocks](https://github.com/scratchfoundation/scratch-blocks) — Reference implementation

### Tertiary (LOW confidence)
- [FTC Community - Scroll vs Zoom Discussion](https://ftc-community.firstinspires.org/t/scroll-vs-zoom-in-the-blocks-editor/1189) — User expectations, community feedback
- [eLearning Industry - Onboarding Best Practices](https://elearningindustry.com/best-user-onboarding-practices-for-edtech-companies) — General EdTech patterns

---
*Research completed: 2026-05-06*
*Ready for roadmap: yes*
