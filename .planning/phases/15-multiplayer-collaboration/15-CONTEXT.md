# Phase 15 Discussion: Multiplayer Collaboration

## Goal
Enable real-time collaboration using Yjs and PartyKit. Students should be able to share their workspace with others for pair programming, with real-time sync of both Blockly and Monaco editor states.

## Architecture Decisions

### 1. CRDT Engine
**Question**: What CRDT library should we use for state sync?
- **Proposed**: We already have `yjs`, `y-partykit`, and `partykit` in our `package.json`. We will use **Yjs** as the CRDT engine, as it has excellent ecosystem support for both Monaco and standard text states.

### 2. Blockly Sync Mechanism
**Question**: How do we synchronize Blockly state in real-time?
- **Option A**: Send XML/JSON updates on every block change. (Can be heavy and cause race conditions).
- **Option B**: Yjs `Y.Map` or `Y.Text`. We can serialize the Blockly Workspace to JSON, and sync it via a `Y.Map`, or sync the underlying AST we built in Phase 9.
- **Proposed**: Since we established an AST-driven two-way sync in previous phases, we should sync the **Text/AST state** via Yjs. The Blockly workspace will simply react to the incoming text changes just as it does when the user types in Monaco. This ensures a single source of truth (the code).

### 3. Connection Layer
**Question**: How does the frontend connect to the PartyKit server?
- **Proposed**: A new `useCollaboration` hook that instantiates the `Y.Doc`, connects to the PartyKit room via a WebSocket (using the Classroom ID or a unique session ID as the room name), and binds the `Y.Text` type to the Monaco editor using `y-monaco`.

## Open Questions for the User
- **Sync Strategy**: Do you agree with syncing the *Text/AST* as the single source of truth rather than trying to sync Blockly UI events directly? This is much more robust but means remote block drags will appear as immediate snaps rather than smooth animated remote dragging.
- **Presence**: Should we implement remote cursors (seeing other students' cursors in Monaco) for this phase, or keep it strictly to code syncing for the MVP?
