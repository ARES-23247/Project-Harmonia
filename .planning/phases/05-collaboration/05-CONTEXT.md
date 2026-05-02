# Phase 5: Collaboration & GitHub Cloud - Context

**Gathered:** 2026-05-02
**Status:** Ready for execution

<domain>
## Phase Boundary

Enable real-time multiplayer editing using Yjs and PartyKit, and silent cloud storage using GitHub Gists.
</domain>

<decisions>
## Implementation Decisions

### Real-time Multiplayer Backend
- Provider: `partykit` (Cloudflare Workers)
- Rationale: Hosts our own Yjs WebSocket server natively on Cloudflare Workers. Bypasses strict school firewalls (unlike P2P WebRTC) and completely avoids the hard paywalls of managed services like Liveblocks, fitting the "100% free" constraint perfectly.

### Cloud Storage Strategy
- Save Target: GitHub Gists
- Rationale: By saving project code to GitHub Gists using the student's authenticated GitHub token, we offload 100% of the storage costs to GitHub. It also acts as an automatic portfolio for students.
</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `MonacoEditor.tsx` currently uses local state via Zustand. We will need to upgrade it to bind to the Yjs `Y.Text` type.
- `editorStore.ts` will need to track the collaboration connection state and handle debounced gist saves.
</code_context>
