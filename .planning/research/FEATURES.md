# Feature Landscape

**Domain:** Educational Robotics IDE (UX Fixes & Block Editor Debugging)
**Researched:** 2026-05-06
**Focus:** Block editor drag-drop, palettes, accessibility, onboarding, UI polish, performance

---

## Table Stakes

Features users expect in an educational block-based coding environment. Missing = product feels broken or inaccessible.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Functional drag-drop** | Core interaction model - blocks must drag from palette to workspace and snap together | High | Blockly provides `IDragStrategy` interface for custom drag behaviors |
| **Dynamic/scrollable palette** | Static palettes don't scale - can't show all blocks, poor UX for discoverability | Med | Should use flyout/toolbox pattern (Scratch, MakeCode) |
| **Category organization** | Blocks organized by function (Motion, Control, Loops, etc.) - expected pattern | Low | Blockly: Separate conditionals and loops into different categories/colors |
| **Visual block feedback** | Highlight on hover, snap indicators, connection previews | Med | Critical for usability - shows "this will connect here" |
| **Undo/redo** | Users make mistakes - need to reverse actions | Med | Should support both block and text operations |
| **Workspace zoom/pan** | Projects grow - need to navigate large workspaces | Med | Scroll wheel should scroll, Ctrl+scroll should zoom (configurable) |
| **Basic keyboard nav** | Tab between blocks, Enter to select, arrow keys | High | Active development area in Code.org - not fully solved industry-wide |
| **Screen reader support** | Legal requirement (ADA), inclusive education | Very High | Block-based coding is inherently challenging for screen readers |
| **Dark/light themes** | User preference, eye strain, classroom lighting | Low | CSS variables for easy theming |
| **High contrast mode** | Accessibility requirement (WCAG 2.2: 4.5:1 contrast for normal text) | Med | Should support both system `forced-colors` and app toggle |
| **Loading states** | Users need feedback during initialization | Low | Skeleton screens better than spinners for education |
| **Error feedback** | Users need to know what went wrong and why | Med | Must be student-friendly, not stack traces |
| **Auto-save** | Prevent data loss - critical for classroom use | High | Already have GitHub Gists - need auto-save |
| **Responsive layout** | Desktop, laptop, tablet support | Med | Smartphone explicitly out of scope |
| **First-run tutorial** | New users need guidance to get started | High | Should be interactive, not passive reading |
| **Help documentation** | Users need reference when stuck | Low | Can be contextual help (tooltips, ? icons) |

---

## Differentiators

Features that set Project Harmonia apart. Not expected in basic block editors, but valued in educational robotics.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Block↔Text two-way sync** | Seamless transition from blocks to Python text - unique in robotics education | Very High | Already built - just needs UX polish |
| **Hardware-agnostic Universal API** | One block language for multiple robot platforms (Lego, XRP, Rev IQ) | High | Already have - docs and onboarding can highlight |
| **Simulator integration** | Test code without physical hardware - classroom-friendly | High | Already have - can be tutorial feature |
| **AI Copilot for errors** | Translates scary Python errors into student-friendly language | Med | Already have BYOK integration - could be tutorial showcase |
| **Interactive tutorials with live execution** | Learn by doing, not just watching - MakeCode-style skill maps | Med | Tutorial editor pattern exists, can adapt |
| **Gamepad controller mode** | Direct robot control - engaging for students | Med | Already have - differentiator for engagement |
| **Real-time collaboration** | Student teams can work together (CRDTs) | High | Already have - classroom feature |
| **Version history slider** | Time-travel through changes - invisible version control | Med | Already have - can be tutorial feature |
| **Classroom dashboard** | Teacher tools for monitoring student progress | High | Already have - differentiator for schools |
| **Offline PWA mode** | Works without internet - critical for under-resourced schools | Med | Already have - differentiator for accessibility |

---

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Mobile phone support** | Screens too small for block coding - UX will be poor | Tablet minimum, desktop/laptop primary |
| **Cloud compilation** | Adds infrastructure complexity/cost - violates serverless constraint | Flash to robot, run locally |
| **Auto-grading system** | Out of scope - focus on coding experience, not testing | Teacher-led assessment, manual review |
| **Social features beyond classroom** | Privacy concerns for students | Keep it educational, not social network |
| **Gamification (badges, leaderboards)** | Can demotivate, creates unhealthy competition | Focus on intrinsic motivation (making robots move) |
| **Voice commands for coding** | Novelty, not core value - accessibility should be keyboard-first | Proper keyboard navigation, screen reader support |

---

## Block Editor Specific Features

### Drag-Drop System
**Table Stakes:**
- Blocks drag from palette to workspace
- Blocks snap to compatible connections
- Visual feedback for valid/invalid drop targets
- Dragging a block stack drags all children
- Right-click delete or drag to trash

**Differentiators:**
- Duplicate on drag (hold modifier key) - Blockly `BlockDragStrategy` supports this
- Smart snapping with magnetic guides
- Drag between workspace and toolbox

### Palette/Toolbox
**Table Stakes:**
- Categorized blocks (Motion, Control, Loops, Sensing, Variables, etc.)
- Click category to show blocks
- Scrollable if more blocks than fit
- Search/filter blocks
- Color-coded categories

**Differentiators:**
- Collapsible palette (more workspace room)
- "Recently used" section
- Keyboard shortcut to open specific category
- Block preview tooltips

**Anti-Patterns to Avoid:**
- Static palette that can't scroll - users can't access all blocks
- All blocks visible at once - overwhelming for beginners
- No visual separation between categories - hard to find blocks

### Workspace Navigation
**Table Stakes:**
- Pan around workspace (middle-click drag or scroll wheel)
- Zoom in/out (Ctrl+scroll or +/- buttons)
- Reset view button
- Fit to screen button

**Differentiators:**
- Zoom to selection (focus on current block)
- Mini-map for large projects
- Bookmarks/jump to specific functions

---

## Accessibility Features

### Keyboard Navigation
**Table Stakes:**
- Tab through blocks in order
- Enter to select block
- Arrow keys to navigate between connections
- Escape to deselect
- Keyboard shortcuts for common actions (delete, duplicate, undo)

**Note:** This is an active research area. Code.org has temporarily disabled their keyboard navigation for improvements - indicates difficulty of the problem.

**Differentiators:**
- Keyboard-only tutorial pathway
- Customizable keyboard shortcuts
- Keyboard shortcut reference sheet

### Screen Reader Support
**Table Stakes:**
- All blocks have meaningful labels
- Announce block connections and nesting
- Announce workspace state (selected block, location)
- Error messages are screen reader friendly

**Challenge:** Block-based programming is inherently spatial and visual. Screen reader support is complex and may always be secondary to keyboard navigation.

**Differentiators:**
- "Navigation Mode" for screen readers (specialized mode, like Automattic implemented)
- Text description of block structure (e.g., "repeat block containing 3 blocks: move forward, turn left, move forward")
- Screen reader tutorial specifically

### Visual Accessibility
**Table Stakes:**
- WCAG 2.2 AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Dark/light theme toggle
- System high contrast mode support via CSS `forced-colors` media query
- Resize text without breaking layout (200% zoom)

**Differentiators:**
- Dyslexia-friendly font option
- Reduced motion mode (respect `prefers-reduced-motion`)
- Colorblind-friendly palette (avoid red/green for critical distinctions)

---

## Onboarding Features

### Interactive Tutorials
**Table Stakes:**
- First-run welcome tutorial
- Step-by-step guided activities
- "Try it" sections where users write code
- Skip option for experienced users

**Best Practices** (from MakeCode and Code.org research):
- Use markdown-based tutorial format for easy editing
- Break into small steps with clear goals
- Show, don't just tell - interactive code-along
- Project-based learning (make a robot do something cool)
- Progressive disclosure - don't overwhelm

**Differentiators:**
- Skill maps with locked/unlocked progression (MakeCode pattern)
- Tutorial editor for teachers to create custom lessons
- Simulator integration for tutorials without hardware
- Achievement tracking (completed tutorials)

### Help & Documentation
**Table Stakes:**
- Block reference documentation
- Contextual help tooltips on blocks
- Searchable help center
- Example projects

**Differentiators:**
- AI-powered contextual help (already have BYOK integration)
- Video walkthroughs for complex concepts
- Community-contributed examples
- "What does this block do?" interactive explanations

---

## UI Polish Features

### Animations & Feedback
**Table Stakes:**
- Hover states on all interactive elements
- Click/active state feedback
- Smooth transitions for theme changes
- Loading states (skeleton screens preferred)

**Best Practices:**
- Use animation purposefully: feedback, demonstrate concepts, guide attention
- Respect `prefers-reduced-motion` for accessibility
- Keep animations under 300ms for snappy feel
- Use easing functions for natural feel

**Differentiators:**
- Block connection "snap" animation
- Success celebration animations (confetti for completed tutorials)
- Smooth zoom/pan with inertia
- Tutorial spotlight/guide overlays

### Component Consistency
**Table Stakes:**
- Consistent button styles
- Consistent form inputs
- Consistent spacing/typography
- Design system tokens (Shadcn + Tailwind already chosen)

**Differentiators:**
- Block-themed UI elements that match workspace
- Custom cursors for different modes
- Micro-interactions that delight

---

## Performance Features

### Loading & Responsiveness
**Table Stakes:**
- Initial load < 3 seconds
- Block selection response < 100ms
- Typing response < 50ms
- No jank during zoom/pan

**Best Practices** (from WordPress Gutenberg performance docs):
- Render selected block synchronously
- Render other blocks asynchronously during browser idle
- Monitor metrics: Loading Time, Typing Time, Block Selection Time
- Use performance benchmarks in CI/CD

**Differentiators:**
- Progressive loading for large projects
- Virtualization for workspaces with many blocks
- Performance budget monitoring

---

## Feature Dependencies

```
Functional drag-drop → Visual block feedback → Undo/redo → Auto-save
Keyboard navigation → Screen reader support
Tutorial system → Simulator integration
Theme system → High contrast mode
Performance optimization → Large project support
```

---

## MVP Recommendation for v1.1 Milestone

**Prioritize (Phase 1 - Block Fixes):**
1. Fix drag-drop functionality (Core Blockly integration)
2. Fix static palette (implement flyout/toolbox pattern)
3. Basic visual feedback (hover, snap indicators)
4. Workspace zoom/pan

**Prioritize (Phase 2 - Accessibility):**
1. WCAG contrast compliance
2. Dark/light theme toggle
3. Basic keyboard navigation (Tab, Enter, arrows)
4. High contrast mode support

**Prioritize (Phase 3 - Polish):**
1. Loading states and skeleton screens
2. Smooth animations for interactions
3. Component consistency (design system)
4. First-run interactive tutorial

**Defer:**
- Full screen reader support (needs deeper research, can be phase-specific)
- Advanced keyboard shortcuts
- Tutorial editor (focus on consuming tutorials first)
- Mini-map for workspace

**Rationale:**
- Block drag-drop and palette are blocking issues - users literally can't use the product
- Accessibility is a requirement for education (legal compliance)
- Polish features make the product feel professional but aren't blocking
- Full screen reader support is complex enough to warrant phase-specific research
- Tutorial editor is nice-to-have, consuming tutorials is more important

---

## Sources

### Block Editor Implementation
- [Custom block drag strategies - Google for Developers](https://developers.google.com/blockly/guides/configure/web/dragging/block-drag-strategies) - HIGH confidence (official docs, updated 2025-05-23)
- [Block design guidelines - Google for Developers](https://developers.google.com/blockly/guides/design/blocks) - HIGH confidence (official docs, updated 2025-03-10)
- [scratchfoundation/scratch-blocks GitHub](https://github.com/scratchfoundation/scratch-blocks) - MEDIUM confidence (reference implementation)
- [Create a workspace - Blockly Configuration](https://developers.google.com/blockly/guides/configure/web/configuration_struct) - HIGH confidence (official docs)

### Accessibility
- [Using Keyboard Navigation for Block-Based Coding Levels - Code.org](https://support.code.org/hc/en-us/articles/15187510110733-Using-Keyboard-Navigation-for-Block-Based-Coding-Levels) - HIGH confidence (official source, shows active development)
- [Understanding WCAG 2.2 Contrast (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced) - HIGH confidence (official W3C spec)
- [Accessibility in the Block Editor - Automattic](https://automattic.design/2021/03/12/accessibility-in-the-block-editor/) - MEDIUM confidence (case study)
- [Enhance Accessibility in Blocks Editor for Screen Readers - MIT App Inventor](https://github.com/mit-cml/appinventor-sources/issues/3784) - MEDIUM confidence (GitHub issue shows active work)

### Onboarding & UX
- [Microsoft MakeCode Tutorial System](https://makecode.com/tutorial-tool) - HIGH confidence (official tool, best practice reference)
- [When UX Dad Meets Educational Tech for Kids - Medium](https://medium.com/@ayeshha2398/when-ux-dad-meets-educational-tech-for-kids-79fcebf7b34a) - MEDIUM confidence (UX principles)
- [Best User Onboarding Practices for EdTech Companies - eLearning Industry](https://elearningindustry.com/best-user-onboarding-practices-for-edtech-companies) - LOW confidence (general best practices)

### Performance
- [Performance - Block Editor Handbook - WordPress Developer Resources](https://developer.wordpress.org/block-editor/explanations/architecture/performance/) - HIGH confidence (official docs with metrics)

### Workspace Navigation
- [Scroll vs. Zoom in the Blocks editor - FTC Community](https://ftc-community.firstinspires.org/t/scroll-vs-zoom-in-the-blocks-editor/1189) - LOW confidence (community discussion, but indicates user expectations)

### Confidence Levels:
- **HIGH**: Official documentation, authoritative sources
- **MEDIUM**: Multiple sources agree, credible secondary sources
- **LOW**: Single source, community discussions, general best practices
