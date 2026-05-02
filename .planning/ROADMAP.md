# Roadmap

## Phase 1: Core IDE & Authentication
**Goal**: Establish the base web application, routing, UI framework, and user authentication.
**Requirements**: CLASS-01, UX-05, UX-06
**Success Criteria**:
- App loads locally with Shadcn UI framework.
- User can log in via Google/GitHub using better-auth.
- App meets PWA installability requirements.

## Phase 2: Editor Engine & AST Foundation
**Goal**: Build the core code authoring experience and two-way synchronization logic.
**Requirements**: EDIT-01, EDIT-02, EDIT-03, EDIT-04, EDIT-05
**Success Criteria**:
- Monaco editor renders and lints Python code.
- Blockly editor renders custom blocks.
- Modifying blocks updates text correctly.
- Invalid text pauses block sync without crashing.

## Phase 3: Hardware Connection & Universal API
**Goal**: Implement the WebBluetooth layer and Universal API abstraction.
**Requirements**: HARD-01, HARD-02, HARD-03, API-01, API-02, API-03
**Success Criteria**:
- Browser can pair to a Pybricks or XRP device.
- Code successfully downloads and executes on the robot.
- Hardware configuration UI correctly generates port mappings.
- Universal `drive()` command works on supported target.

## Phase 4: Simulation & Virtual Physics
**Goal**: Build the Pyodide runtime and 2D/3D physics environment.
**Requirements**: SIM-01, SIM-02, SIM-03
**Success Criteria**:
- Python code executes purely in the browser.
- Virtual robot moves in physics engine based on code output.
- Virtual sensors can be mocked via UI sliders.

## Phase 5: Collaboration & GitHub Cloud
**Goal**: Enable real-time multiplayer and silent cloud storage.
**Requirements**: COLLAB-01, COLLAB-02, COLLAB-03
**Success Criteria**:
- Two browser windows can edit the same file simultaneously via Yjs.
- Project autosaves to GitHub as hidden commits.
- "Timeline" slider can revert text/blocks to a previous state.

## Phase 6: Telemetry, AI, & Classroom Tools
**Goal**: Round out the educational experience with debugging, AI, and teacher features.
**Requirements**: UX-01, UX-02, UX-03, UX-04, CLASS-02, CLASS-03, AI-01, AI-02
**Success Criteria**:
- Telemetry logs to a CSV and updates custom UI dashboards.
- AI Copilot successfully translates a `SyntaxError` using a BYOK key.
- Teacher dashboard displays student assignments.
- Gamepad input drives the robot via Web APIs.
