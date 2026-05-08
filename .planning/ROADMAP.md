# Roadmap

- [x] Milestone v1.0 ([Archive](milestones/v1.0-ROADMAP.md))
- [x] Milestone v1.1: UX Foundation & Block Fixes ([Archive](milestones/v1.1-ROADMAP.md))
- [x] Milestone v1.2: IDE Layout & Real Estate Architecture ([Archive](milestones/v1.2-ROADMAP.md))
- [ ] **Backlog / Deferred**

## Phases

(Start a new milestone with /gsd-new-milestone)

### Milestone v1.3: Community & Universal Abstraction
- [x] Phase 21: About Us Branding & ARES Identity
- [/] Phase 22: Universal Hardware HAL (Drivetrain, Motors, Sensors)
- [ ] Phase 23: Profile-Driven Code Generation (XRP vs Lego vs REV)
- [ ] Phase 24: REPL Stability & Filesystem Sync
- Integrate the branding trigger in the Hardware Toolbar.

### Phase 22: XRP Core Hardware API
**Goal**: Achieve foundational movement parity with the XRP platform.
- Implement `DifferentialDrive` and `Motor` abstractions.
- Map blocks to `XRPLib` singleton patterns.

### Phase 23: XRP Sensors & Servos
**Goal**: Complete the XRP hardware surface.
- Implement Rangefinder, Reflectance, and IMU sensor blocks.
- Add support for all 4 servo ports with angle control.

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

## Milestone v1.1 Archive

See [milestones/v1.1-ROADMAP.md](milestones/v1.1-ROADMAP.md) for the complete v1.1 milestone.

---
*Last updated: 2026-05-07*
*Total requirements: 16 across 4 phases*
