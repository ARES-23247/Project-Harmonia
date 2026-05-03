# Project Harmonia

## What This Is

A universal, web-based robotics IDE designed for educational environments. It brings together disparate hardware platforms (Lego Pybricks, XRP, Rev IQ) under a single, seamless coding experience featuring two-way Block-to-Text synchronization, interactive simulator environments, and integrated classroom tools.

## Current State
**Shipped Version:** v1.0
**Core value:** To provide a frictionless, 100% free, "write once, run anywhere" educational coding platform that eliminates the barriers between different robotic hardware ecosystems.

## Next Milestone Goals
*To be defined via /gsd-new-milestone*

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Connect and flash code to Lego, XRP, and Rev hardware using WebBluetooth/WebSerial and local companion plugins.
- [ ] Implement a two-way sync editor bridging Blockly (custom styled) and Python text using a strict AST.
- [ ] Provide a Universal API wrapper to standardize common robot commands alongside platform-specific libraries.
- [ ] Real-time multiplayer collaboration for student teams using CRDTs (Yjs/Liveblocks).
- [ ] Integrated browser-based simulator (Pyodide) with a 2D/3D physics engine and virtual sensor UI mocking.
- [ ] Invisible version control and cloud saves backed by GitHub, with a simple history slider UI.
- [ ] Teacher classroom features and dashboards.
- [ ] BYOK AI Copilot integration for intelligent error translation and code assistance.
- [ ] Progressive Web App (PWA) support for full offline functionality on Desktop/Tablets.
- [ ] Open plugin marketplace for third-party extensions and hardware support.
- [ ] HTML5 Gamepad and direct-to-robot Bluetooth controller support.
- [ ] Visual hardware configuration UI for kinematics abstraction.
- [ ] Built-in interactive tutorials and onboarding.
- [ ] High-contrast, screen-reader compatible accessibility features with keyboard navigation.
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
