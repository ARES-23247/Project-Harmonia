# Phase 5: Collaboration & GitHub Cloud - Plan

## Requirements Covered
- COLLAB-01: Two browser windows can edit the same file simultaneously via Yjs.
- COLLAB-02: Project autosaves to GitHub as hidden commits.

## Implementation Steps

### Step 1: Install Dependencies
- Run `npm install yjs y-partykit y-monaco octokit`

### Step 2: PartyKit Backend
- Create `party/server.ts` to define the PartyKit Cloudflare Worker backend for syncing Yjs state.
- Update `package.json` to include `partykit` dev and deploy scripts.

### Step 3: Collaboration Provider
- Create `src/lib/collaboration/yjsProvider.ts`.
- Initialize `Y.Doc` and `YPartyKitProvider`.
- Export a setup function to bind the `Y.Doc` to the Monaco editor instance using `MonacoBinding` from `y-monaco`.

### Step 4: Hook up Monaco Editor
- Update `MonacoEditor.tsx` to call the `yjsProvider` setup when the editor mounts.
- Display connection status in the `HardwareToolbar` (e.g. "Collaborators: X").

### Step 5: GitHub Autosave
- Create `src/lib/cloud/github.ts`.
- Implement `saveToGist` using `octokit` that takes the raw `pythonCode` and pushes it to a private Gist.
- Update `editorStore.ts` to debounce `pythonCode` changes and call `saveToGist` in the background if the user is authenticated.

## Verification
- Run `npm run build` to verify compilation.
- Start the PartyKit dev server (`npx partykit dev`).
- Open two browser tabs on the editor route and type in one; verify it appears in the other via WebSockets.
- (GitHub saving requires valid OAuth tokens, so we'll mock the `octokit` call if tokens aren't present).
