# Project Harmonia - Requirements

## v1 Requirements

### Hardware & Execution
- [ ] **HARD-01**: Connect and flash code to Lego, XRP, and Rev hardware using WebBluetooth/WebSerial.
- [ ] **HARD-02**: Provide fallback local companion plugins for edge-case hardware connections.
- [ ] **HARD-03**: Compile and download code natively to the robot's memory for execution.

### Editor Engine
- [ ] **EDIT-01**: Implement custom-styled Blockly visual editor.
- [ ] **EDIT-02**: Implement Monaco-based Python text editor with dark mode UI.
- [ ] **EDIT-03**: Real-time two-way synchronization between Blocks and Python Text using a strict AST.
- [ ] **EDIT-04**: Temporarily pause block synchronization when text contains invalid syntax.
- [ ] **EDIT-05**: Auto-format Python code (linting) upon typing completion.

### API & Abstraction
- [ ] **API-01**: Provide platform-specific native libraries (Pybricks, XRP, etc).
- [ ] **API-02**: Provide a Universal API wrapper for standard commands (`drive`, `turn`) across all supported robots.
- [ ] **API-03**: Visual hardware configuration UI to define ports and wheel dimensions for automatic kinematics.

### Simulation
- [ ] **SIM-01**: Integrated browser-based Python execution (Pyodide).
- [ ] **SIM-02**: 2D/3D physics environment for simulated robot driving.
- [ ] **SIM-03**: Virtual UI sliders/buttons to mock physical sensor inputs.

### Collaboration & Cloud
- [ ] **COLLAB-01**: Real-time multiplayer synchronization for the editor using CRDTs (Yjs/Liveblocks).
- [ ] **COLLAB-02**: Invisible GitHub-backed file storage with a simple "Timeline" undo slider.
- [ ] **COLLAB-03**: Project gallery and remixing powered by GitHub Gists.

### Classroom & Authentication
- [ ] **CLASS-01**: Multiple SSO login options (Google, GitHub) via `better-auth`.
- [ ] **CLASS-02**: Teacher classroom dashboards for assigning and reviewing work.
- [ ] **CLASS-03**: Unique color/LED device pairing sequences to prevent classroom crosstalk.

### AI Copilot
- [ ] **AI-01**: BYOK (Bring Your Own Key) support for OpenAI, Anthropic, Google, Z.ai.
- [ ] **AI-02**: Intercept and translate raw Python stack traces into beginner-friendly explanations.

### User Experience
- [ ] **UX-01**: Telemetry data logging and CSV export capabilities.
- [ ] **UX-02**: Drag-and-drop custom driver station UI builder (virtual buttons, joysticks, sliders).
- [ ] **UX-03**: HTML5 Gamepad API and direct Bluetooth controller support.
- [ ] **UX-04**: Interactive step-by-step onboarding tutorials.
- [ ] **UX-05**: High contrast, screen-reader compatible accessibility with keyboard navigation.
- [ ] **UX-06**: Progressive Web App (PWA) offline support for Desktop and Tablet.

## v2 Requirements (Deferred)
- [ ] **V2-01**: Browser-based vision processing (webcam/smartphone) streaming to robot.
- [ ] **V2-02**: Gamification and achievement system (badges).
- [ ] **V2-03**: On-robot Package Manager UI (mip/upip).
- [ ] **V2-04**: Interactive MicroPython REPL terminal.

## Out of Scope
- **Cloud Compilation**: Keeps infrastructure entirely serverless and avoids complex backend architectures.
- **Auto-Grading**: Focus remains purely on the coding experience rather than test assertion systems.
- **Smartphone Code Editing**: Mobile screens are too small for block coding; targets are Desktop, Laptops, and Tablets.

## Traceability
