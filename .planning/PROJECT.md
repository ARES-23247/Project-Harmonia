# Project Harmonia

## What This Is

A universal, web-based robotics IDE designed for educational environments. It brings together disparate hardware platforms (Lego Pybricks, XRP, Rev IQ) under a single, seamless coding experience featuring two-way Block-to-Text synchronization, interactive simulator environments, and integrated classroom tools.

## Previous Milestone: v1.2 IDE Layout & Real Estate Architecture
**Shipped:** 2026-05-08
**Summary:** Unified the IDE interface with dynamic view toggles, collapsible right-side drawer, portal-based floating modals, and a fixed bottom console. Established classroom management backend.

## Current Milestone: v1.3 (TBD)
**Goal:** Define the next major feature set (e.g., Hardware Connectivity or Advanced Simulation).

## Requirements

### Validated

- **v1.2**: Dynamic Editor Views, Collapsible Drawers, Pop-out Modals, Bottom Console (Phases 17-20)
- **v1.2**: Teacher Dashboard & Classroom Management Backend (Phase 14)
- **v1.1**: Block Editor Foundation, Accessibility, UI Polish, Onboarding, Performance (Phases 9-13)

### Active

- [ ] Connect and flash code to Lego, XRP, and Rev hardware using WebBluetooth/WebSerial and local companion plugins.
- [ ] Implement a two-way sync editor bridging Blockly (custom styled) and Python text using a strict AST.
- [ ] Provide a Universal API wrapper to standardize common robot commands alongside platform-specific libraries.
- [ ] Real-time multiplayer collaboration for student teams using CRDTs (Yjs/Liveblocks).
- [ ] Integrated browser-based simulator (Pyodide) with a 2D/3D physics engine and virtual sensor UI mocking.
- [ ] Invisible version control and cloud saves backed by GitHub, with a simple history slider UI.
- [x] Teacher classroom features and dashboards. (Validated v1.2)
- [x] Built-in interactive tutorials and onboarding. (Validated v1.1)
- [x] High-contrast, screen-reader compatible accessibility features with keyboard navigation. (Validated v1.1)
- [ ] Built-in telemetry recording and CSV exports.
- [ ] Interactive MicroPython REPL terminal.

### Out of Scope

- [Cloud Compilation] — Keeps infrastructure serverless and avoids complex backend architectures.
- [Auto-Grading] — Focus remains purely on the coding experience rather than test assertion systems.
- [Smartphone Screen Support] — Mobile screens are too small for block coding; targets are Desktop, Laptops, and Tablets.

## Context

- **Educational Need:** Schools often use a mix of hardware. A unified platform reduces cognitive load for teachers and students.
- **Error Handling:** Standard Python errors are intimidating; the IDE will intercept and translate stack traces into actionable, plain-English advice.
- **Storage:** GitHub Gists / Repos will act as the backend for the "Project Gallery" and student files to ensure infinite scale without server costs.
- **Visual Aesthetic:** Modern, professional dark mode UI (Shadcn + Tailwind) leveraging Monaco Editor for text.

## Constraints

- **Infrastructure**: Cloudflare Pages (Serverless) — Must be extremely cheap/free to host indefinitely.
- **Authentication**: `better-auth` — Must support multiple SSO providers (Google, GitHub) for school compatibility.
- **Monetization**: 100% Free Open Source — The core IDE and the marketplace must never be put behind a paywall.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Hybrid Connection Layer | Web APIs for ease of use, plugins/daemons for unsupported edge cases. | — Pending |
| AST-Driven Two-Way Sync | Required to keep blocks and text identical. Invalid text pauses block sync until fixed. | — Pending |
| Native Robot Execution | Code is flashed/downloaded to the robot rather than tethered, for better latency and independence. | — Pending |
| GitHub Storage Backend | Offloads storage costs and provides robust versioning silently in the background. | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-02 after initialization*
