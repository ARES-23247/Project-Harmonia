---
phase: 9
slug: block-editor-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-06
---

# Phase 9 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None detected - needs setup |
| **Config file** | None - see Wave 0 |
| **Quick run command** | `npm run test` (if configured) |
| **Full suite command** | `npm run test` (if configured) |
| **Estimated runtime** | ~5 seconds (once configured) |

---

## Sampling Rate

- **After every task commit:** Manual verification in browser (drag-drop, pan/zoom, visual feedback)
- **After every plan wave:** Full manual testing of all block interactions in browser
- **Before `/gsd-verify-work`:** All BLOCK requirements verified working in browser
- **Max feedback latency:** 30 seconds for manual verification

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 09-01-01 | 01 | 1 | BLOCK-01 | — | N/A | manual-only | Browser verification | ❌ W0 | ⬜ pending |
| 09-01-02 | 01 | 1 | BLOCK-02 | — | N/A | manual-only | Browser verification | ❌ W0 | ⬜ pending |
| 09-01-03 | 01 | 1 | BLOCK-03 | — | N/A | manual-only | Browser verification | ❌ W0 | ⬜ pending |
| 09-01-04 | 01 | 1 | BLOCK-04 | — | N/A | manual-only | Browser verification | ❌ W0 | ⬜ pending |
| 09-01-05 | 01 | 1 | BLOCK-05 | — | N/A | manual-only | Browser verification | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/blockEditor.test.tsx` - Automated tests for Blockly initialization (BLOCK-01, BLOCK-02)
- [ ] `tests/workspaceConfig.test.ts` - Unit tests for workspace configuration options (BLOCK-03, BLOCK-04)
- [ ] `tests/visualFeedback.test.ts` - Visual regression tests for hover states (BLOCK-05)
- [ ] Test framework setup: Choose Vitest or Jest for React component testing
- [ ] Playwright or similar for visual regression testing

**Note:** Block editor requirements are primarily visual/interactive, making automated testing difficult. Manual testing is the primary verification method. Consider adding visual regression testing in future phases.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Drag blocks from palette to workspace | BLOCK-01 | Visual interaction, requires browser | 1. Open editor, 2. Drag robot block to workspace, 3. Verify visual feedback follows cursor, 4. Verify block drops at correct position |
| Blocks snap to compatible connections | BLOCK-02 | Visual snap behavior, requires browser | 1. Drag two compatible blocks together, 2. Verify snap indicator appears, 3. Verify blocks connect when released |
| Palette is scrollable by category | BLOCK-03 | UI layout, requires browser | 1. Click through categories, 2. Verify palette shows category blocks, 3. Verify scrolling when blocks exceed visible area |
| Pan (scroll) and zoom (Ctrl+scroll) workspace | BLOCK-04 | Mouse interaction, requires browser | 1. Scroll wheel to pan, 2. Ctrl+scroll to zoom, 3. Verify smooth movement and visual zoom indicators |
| Visual feedback on hover/selection/drop | BLOCK-05 | Visual states, requires browser | 1. Hover blocks, 2. Click to select, 3. Drag to drop target, 4. Verify each state has clear visual feedback |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: manual verification after each task
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s for manual verification
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
