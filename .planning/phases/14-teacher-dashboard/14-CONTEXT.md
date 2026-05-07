# Phase 14 Discussion: Teacher Dashboard & Classroom Management

## Goal
Teachers can manage classrooms, track student progress in real-time, and distribute templates.

## Architecture Decisions

### 1. Classroom Backend
**Question**: How do we store classroom data (student lists, join codes) while staying serverless and free?
- **Option A**: GitHub Gists. A private gist stores `classroom.json`. Teachers share the Gist ID as the "Join Code".
- **Option B**: Dedicated GitHub Repo. A `harmonia-classrooms` repo under the teacher's account. More structured but requires repo permissions.
- **Option C**: Supabase/Firebase (Free Tier). Easier for real-time, but adds a dependency and potentially cost later.

**Proposed**: **Option A (GitHub Gists)**. It aligns with our "storage as backend" philosophy and keeps it zero-cost.

### 2. Real-time Monitoring
**Question**: How does a teacher see student code "in real-time"?
- **Proposed**: Students periodically auto-save their work to a specific Gist tagged with the Classroom ID. The Teacher Dashboard polls these Gists every 10-30 seconds.

### 3. Template Distribution
- Teachers can "Push" a project. This creates a Gist and notifies students (via the classroom JSON or a simple broadcast mechanism).

## Open Questions for the User
- Should we stick to the "No Backend" (GitHub only) approach, or is a lightweight DB like Supabase acceptable for better UX?
- Do we need "Real-time" (sub-second) or is "Live-ish" (10s polling) sufficient for classroom use?
