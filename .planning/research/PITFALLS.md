# Domain Pitfalls

**Domain:** Block-based robotics IDE with existing broken codebase
**Milestone:** v1.1 UX Foundation & Block Fixes
**Researched:** 2026-05-06

## Critical Pitfalls

Mistakes that cause rewrites, major regressions, or user abandonment.

### Pitfall 1: Treating Block Editor Fixes as Surface-Level Issues

**What goes wrong:** Assuming drag-drop and palette issues are CSS-only fixes, when they're often symptoms of deeper problems with Blockly initialization, workspace injection, or event handling conflicts with the parent application.

**Why it happens:**
- Visual symptoms (blocks not appearing, palette scrolling) suggest UI problems
- Developers may avoid touching "scary" Blockly core initialization code
- Quick CSS hacks seem to work superficially but break edge cases

**Consequences:**
- Fragile fixes that break with browser updates, Blockly version updates, or different screen sizes
- Undo/redo functionality breaks (blocks snap back incorrectly)
- Block-to-text synchronization fails due to incorrect workspace reference
- Fixes work in one browser but not others

**Prevention:**
1. **Map the full initialization chain** before making changes — understand where and how Blockly injects DOM, how workspace handles resize events, and how drag events are intercepted
2. **Test the core Blockly integration in isolation** — create a minimal reproduction outside the app to verify issues aren't caused by parent container CSS/JS
3. **Check for z-index stacking context issues** — many "drag not working" issues are caused by parent containers creating new stacking contexts that intercept pointer events
4. **Verify workspace SVG injection timing** — blocks may render but not be interactive if Blockly initializes before the DOM is fully stable or within a hidden/collapsed container

**Detection:**
- Drag highlights appear but blocks don't move
- Palette blocks show but can't be dragged to workspace
- Issues resolve in iframe but not embedded
- Different behavior across browsers

**Sources:**
- [Stack Overflow: Position absolute in overflow scroll](https://stackoverflow.com/questions/13977922) — Absolute positioning context issues
- [Blockly GitHub: Drag boundary issues](https://github.com/google/blockly/issues) — Multiple drag-drop bug reports
- [Google Developers: IDraggable interface](https://developers.google.com/blockly/guides/create-custom-blocks/draggable) — Custom drag implementation docs

### Pitfall 2: Accessibility Overlay/Retrofit Trap

**What goes wrong:** Attempting to add accessibility through overlays, widget libraries, or ARIA patches without addressing the fundamental accessibility architecture. Research shows 67% of practitioners and 72% of users with disabilities rate accessibility overlays as ineffective, with many reporting they make things worse.

**Why it happens:**
- Pressure to ship accessibility features quickly
- Belief that accessibility can be "layered on" after the fact
- Misunderstanding that semantic HTML and keyboard navigation must be built in

**Consequences:**
- Screen reader users experience worse experience than before overlay
- Keyboard navigation works partially but has traps
- High contrast mode breaks custom component styling
- ARIA attributes conflict with actual component behavior, creating confusion

**Prevention:**
1. **Never use accessibility overlays** — they are widely recognized as harmful by the accessibility community
2. **Start with keyboard navigation** — if it doesn't work with a keyboard, no amount of ARIA will fix it
3. **Use semantic HTML as the foundation** — custom div-based components must be replaced or augmented with proper button/role semantics
4. **Test with actual screen readers** — NVDA (Windows), VoiceOver (Mac), TalkBack (Android) — automated testing catches only ~30-40% of issues
5. **Implement focus management strategically** — complex editors need explicit focus trapping, focus restoration after actions, and visible focus indicators
6. **Design for high contrast from the start** — don't rely on color alone to convey information

**Detection:**
- Tab key skips interactive elements or gets trapped
- Screen reader announces "clickable" but not what element does
- High contrast mode makes UI unusable
- Custom components have no ARIA roles or have incorrect roles

**Sources:**
- [A11Y Collective: Why overlays fail](https://www.a11y-collective.com/blog/accessibility-overlays/) — 67% of practitioners find overlays ineffective
- [UX Collective: Overlays aren't accessible](https://uxdesign.cc/accessible-overlays-arent-accessible-96876ef474a4) — How overlays make problems worse
- [Reddit: Accessibility overlay discussion](https://www.reddit.com/r/accessibility/comments/mi7mgq/accessibility_overlays_what_are_they_why_are_they/)
- [WebAIM: Screen reader testing](https://webaim.org/articles/screenreader_testing/) — Testing methodology
- [Quip: Making complex editor accessible](https://quip.com/blog/quip-editor-a11y) — Real-world complex editor a11y case study

### Pitfall 3: Performance Optimization Without Measurement

**What goes wrong:** Optimizing code paths that aren't bottlenecks, introducing complexity, and potentially causing performance regressions elsewhere. This is the classic "premature optimization" problem — optimizing based on assumptions rather than measurements.

**Why it happens:**
- Feels productive to "speed up" code
- Certain optimizations (memoization, virtualization, debouncing) are popular patterns
- Fear of performance issues leads to over-optimization

**Consequences:**
- Code becomes harder to maintain and debug
- Optimizations for non-bottlenecks waste development time
- Can introduce new bugs (stale closures, incorrect memoization dependencies)
- Virtual DOM libraries used incorrectly can cause more re-renders

**Prevention:**
1. **Measure before optimizing** — use Chrome DevTools Performance panel and Memory profiler to identify actual bottlenecks
2. **Focus on user-perceived latency** — time to interactive, first input delay, smooth scrolling/dragging — not just function execution time
3. **Optimize the critical path** — large project loading, workspace rendering, block drag responsiveness
4. **Profile memory, not just CPU** — memory leaks from detached DOM nodes, event listeners not cleaned up
5. **Beware of virtualization footguns** — virtualizing columns/rows separately is a common mistake that causes more DOM thrashing

**Detection:**
- "I think this might be slow" without profiling data
- Adding complexity before confirming it's a bottleneck
- Optimizations that don't have measurable impact on user-facing metrics

**Sources:**
- [Stackify: Why premature optimization is evil](https://stackify.com/premature-optimization-evil/)
- [Medium: Perils of premature optimization](https://eyeofthesquid.com/the-perils-of-premature-optimization-8181033d42fb)
- [Chrome DevTools: Performance analysis](https://developer.chrome.com/docs/devtools/performance)
- [Reddit: Virtual list implementation gone wrong](https://www.reddit.com/r/reactjs/comments/1ov11er/got_rejected_because_my_virtual_list_sucks_but/)

### Pitfall 4: Tutorial That Can't Be Skipped or Revisited

**What goes wrong:** Creating an interactive onboarding tutorial that users cannot easily skip, pause, or return to later. This is particularly problematic for educational tools where users have varying skill levels.

**Why it happens:**
- Desire to ensure users see all features
- Complexity of implementing save/restore for tutorial state
- Treating tutorial as a "one-time" experience

**Consequences:**
- Advanced users abandon the tool rather than sit through tutorial
- Users who accidentally skip can't get help when needed
- Progress loss if tutorial is interrupted
- Negative first impression that affects retention

**Prevention:**
1. **Always provide a skip button** — and make it obvious
2. **Save tutorial progress** — allow users to resume where they left off
3. **Make tutorial replayable** — add to help menu, not just first-run
4. **Design for partial completion** — users should derive value even if they don't finish
5. **Contextual help over linear tutorial** — interactive hints and guided tours available when needed
6. **Test with actual beginners** — what seems obvious to developers often confuses users

**Detection:**
- Tutorial blocks access to main UI without clear exit
- No way to restart tutorial after completion
- Tutorial state lost on page refresh
- Advanced users complain about forced walkthrough

**Sources:**
- [Reddit: Teaching players who skip tutorials](https://www.reddit.com/r/gamedesign/comments/y3biwk/how_can_you_teach_the_player_when_they_skip/)
- [Dev.to: Self-taught programmer mistakes](https://dev.to/juliafmorgado/mistakes-self-taught-programmers-make-when-learning-to-code-and-how-to-avoid-them-5hf5) — Learning psychology insights

## Moderate Pitfalls

Issues that cause significant problems but are recoverable.

### Pitfall 5: Block-to-Text Sync Race Conditions

**What goes wrong:** The two-way synchronization between Blockly and Monaco text editor falls out of sync or enters infinite update loops when both editors try to update each other simultaneously.

**Why it happens:**
- Treating sync as unidirectional when it's bidirectional
- Not debouncing or detecting update cycles
- User typing while drag is in progress
- Syntax errors that can't round-trip through AST

**Consequences:**
- Edits in one editor don't appear in the other
- Cursor jumps or focus loss
- Infinite update loops freeze the UI
- User frustration with "ghost edits"

**Prevention:**
1. **Implement a "sync lock"** — only one direction can sync at a time
2. **Debounce aggressively** — wait for user to pause typing before syncing
3. **Handle syntax errors gracefully** — don't sync invalid code back to blocks
4. **Version or timestamp updates** — detect and ignore stale updates
5. **Provide manual sync trigger** — as fallback when auto-sync has issues

**Detection:**
- Typing in text editor causes blocks to flicker or rebuild
- Dragging blocks causes text cursor to jump
- Changes appear in one editor but not the other

### Pitfall 6: Theme/Color Contrast Breaking Accessibility

**What goes wrong:** Implementing dark mode or custom themes that work visually but fail accessibility contrast requirements (WCAG AA requires 4.5:1 for normal text, 3:1 for large text).

**Why it happens:**
- Designing for aesthetics first, accessibility second
- Testing only on high-quality displays in ideal lighting
- Not testing with actual vision impairments

**Consequences:**
- Users with low vision or color blindness can't use the tool
- Educational institutions with accessibility requirements can't adopt
- Legal liability for accessibility non-compliance

**Prevention:**
1. **Use contrast checking tools** — integrated into development workflow
2. **Test with color blindness simulators** — ensure information isn't color-only
3. **Design with high contrast base** — decorative themes layer on top of accessible base
4. **Support OS-level high contrast mode** — respect user preferences

**Detection:**
- Text too dark on dark backgrounds
- Color used as only indicator for state (errors, warnings, selections)
- No high contrast mode support

## Minor Pitfalls

Issues that cause annoyance but not failure.

### Pitfall 7: Tutorial Content Outpacing Feature Reality

**What goes wrong:** Tutorial shows features or workflows that don't match the current UI, causing confusion when users try to follow along.

**Prevention:** Treat tutorial documentation as code — review and update with every UI change.

### Pitfall 8: Ignoring Edge Cases in Input Handling

**What goes wrong:** Fixing common input issues but breaking edge cases like paste events, autocomplete, IME (input method editors) for non-Latin scripts, or accessibility tools.

**Prevention:** Test with assistive technologies and international users during development, not as an afterthought.

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Block Fixes | Treating as CSS-only, ignoring Blockly initialization | Map full initialization chain, test in isolation |
| Accessibility | Using overlays or ARIA patches without semantic foundation | Start with semantic HTML and keyboard nav |
| Performance | Optimizing without measurements | Profile first, optimize measured bottlenecks |
| Onboarding | Non-skippable or non-replayable tutorials | Always provide skip, save progress, make replayable |

## Sources

- Blockly Drag-Drop: [Stack Overflow](https://stackoverflow.com/questions/13977922), [Google Developers](https://developers.google.com/blockly/guides/create-custom-blocks/draggable)
- Accessibility Overlays: [A11Y Collective](https://www.a11y-collective.com/blog/accessibility-overlays/), [UX Collective](https://uxdesign.cc/accessible-overlays-arent-accessible-96876ef474a4)
- Performance: [Stackify](https://stackify.com/premature-optimization-evil/), [Chrome DevTools](https://developer.chrome.com/docs/devtools/performance), [Reddit on Virtual Lists](https://www.reddit.com/r/reactjs/comments/1ov11er/got_rejected_because_my_virtual_list_sucks_but/)
- Screen Reader Testing: [WebAIM](https://webaim.org/articles/screenreader_testing/), [Quip Editor A11y](https://quip.com/blog/quip-editor-a11y)
- Block-Based Bugs: [arXiv: Common Bugs in Scratch](https://arxiv.org/pdf/2112.00858), [NuzzleBug Debugging Study](https://scispace.com/pdf/nuzzlebug-debugging-block-based-programs-in-scratch-3vpirde0fl.pdf)
- Onboarding: [Reddit on Skip Tutorials](https://www.reddit.com/r/gamedesign/comments/y3biwk/how_can_you_teach_the_player_when_they_skip/), [Dev.to Learning Mistakes](https://dev.to/juliafmorgado/mistakes-self-taught-programmers-make-when-learning-to-code-and-how-to-avoid-them-5hf5)
