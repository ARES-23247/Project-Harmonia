# Phase 1: Core IDE & Authentication - Context

**Gathered:** 2026-05-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish the base web application, routing, UI framework, and user authentication.

</domain>

<decisions>
## Implementation Decisions

### Application Shell & Architecture
- Framework: Vite + React SPA
- Routing: React Router (HashRouter)
- State Management: Zustand
- Styling: Tailwind + Shadcn UI

### Authentication (better-auth)
- Database: Cloudflare D1
- Providers: GitHub & Google
- Flow: Popup/Modal login

### PWA & Offline Strategy
- Plugin: vite-plugin-pwa
- Cache: NetworkFirst then CacheFirst

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- None (Greenfield phase)

### Established Patterns
- PWA structure with vite-plugin-pwa
- HashRouter for static host compatibility (Cloudflare Pages)

### Integration Points
- better-auth endpoint at /api/auth/[...all]
</code_context>

<specifics>
## Specific Ideas

- Ensure UI is completely dark mode ready right out of the box using Shadcn.

</specifics>

<deferred>
## Deferred Ideas

- Gamification and Teacher dashboards are deferred to later phases.

</deferred>
