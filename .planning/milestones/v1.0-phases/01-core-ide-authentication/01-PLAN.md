# Phase 1: Core IDE & Authentication - Plan

## Requirements Covered
- CLASS-01: Multiple SSO login options (Google, GitHub) via better-auth.
- UX-05: High contrast, screen-reader compatible accessibility with keyboard navigation.
- UX-06: Progressive Web App (PWA) offline support for Desktop and Tablet.

## Implementation Steps

### Step 1: Scaffold React SPA (Vite)
- Run `npm create vite@latest . -- --template react-ts`
- Clean up default boilerplate files.
- Configure `vite.config.ts` with basic setup.

### Step 2: Install UI & Styling Frameworks
- Install TailwindCSS and configure `tailwind.config.js`.
- Initialize Shadcn UI and add fundamental components (Button, Modal, Card).
- Implement a global Dark Mode standard.

### Step 3: Implement Routing & State
- Install `react-router-dom` and `zustand`.
- Create a basic layout wrapper with a top navigation bar.
- Use `HashRouter` for Cloudflare Pages static compatibility.

### Step 4: Configure PWA (vite-plugin-pwa)
- Install `vite-plugin-pwa`.
- Update `vite.config.ts` to generate `manifest.webmanifest`.
- Add service worker caching strategy (NetworkFirst, CacheFirst).

### Step 5: Setup Authentication (better-auth & Cloudflare D1)
- Scaffold Cloudflare Pages Functions directory (`/functions/api/auth/[...all].ts`).
- Set up D1 SQLite schema (users, sessions, accounts).
- Create a Login Modal component using Shadcn UI.
- Wire the modal to trigger Google/GitHub OAuth flows.

## Verification
- Run `npm run build` to verify standard build pipeline succeeds.
- Launch `npm run dev` and ensure Shadcn components render properly.
- Verify the PWA install prompt triggers in browser.
