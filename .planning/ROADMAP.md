# Roadmap

- [x] Milestone v1.0 ([Archive](milestones/v1.0-ROADMAP.md))
- [x] Milestone v1.1: UX Foundation & Block Fixes ([Archive](milestones/v1.1-ROADMAP.md))
- [x] Milestone v1.2: IDE Layout & Real Estate Architecture ([Archive](milestones/v1.2-ROADMAP.md))
- [ ] **Backlog / Deferred**

## Phases

(Start a new milestone with /gsd-new-milestone)

### Milestone v1.3: Community & Universal Abstraction
- [x] Phase 21: About Us Branding & ARES Identity
- [x] Phase 22: Universal Hardware HAL (Drivetrain, Motors, Sensors)
- [x] Phase 23: Profile-Driven Code Generation (XRP vs Lego vs REV)
- [ ] Phase 24: REPL Stability & Filesystem Sync

**Goal**: Achieve foundational movement and sensor parity across XRP and Lego platforms.
- Implement universal `DifferentialDrive`, `Motor`, and `Sensor` abstractions.
- Map blocks to platform-specific SDKs (XRPLib, Pybricks).
- [x] Implemented universal block layer.
- [x] Implemented profile-aware code generation.
- [x] Fixed reactive workspace synchronization.

**Goal**: Establish the "Harmonia identity" and team branding.
- [x] Created 'About Us' modal with ARES FTC 23247 context.
- [x] Linked mythology to project goals.
- [x] Integrated trigger in Hardware Toolbar.

### Phase 24: REPL Protocol & Filesystem Stability
**Goal**: Implement a robust MicroPython communication layer.
- Implement the Raw REPL handshaking (Ctrl-A/C/D).
- Develop the `walk()` filesystem utility for IDE mapping.

## Backlog / Deferred

### Phase 15: Multiplayer Collaboration
**Goal:** Real-time collaboration using CRDTs (Yjs/Liveblocks)
**Status:** Deferred (Context exists)
**Priority:** High

### Phase 16: *TBD*
**Goal:** Future infrastructure or telemetry refinement
**Status:** Deferred

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 14. Teacher Dashboard | 1/1 | Complete | 2026-05-08 |
| 17-20. IDE Layout | 4/4 | Complete | 2026-05-08 |
| 21. About Us | 1/1 | Complete | 2026-05-08 |
| 22. Universal HAL | 1/1 | Complete | 2026-05-08 |
| 23. Profile Gen | 1/1 | Complete | 2026-05-08 |

## Milestone v1.1 Archive

See [milestones/v1.1-ROADMAP.md](milestones/v1.1-ROADMAP.md) for the complete v1.1 milestone.

---
*Last updated: 2026-05-07*
*Total requirements: 16 across 4 phases*
