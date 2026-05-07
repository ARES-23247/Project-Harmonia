# Phase 4: Simulation & Virtual Physics - Context

**Gathered:** 2026-05-02
**Status:** Ready for execution

<domain>
## Phase Boundary

Build the Pyodide runtime and 2D physics environment to allow students to test their Python code instantly in the browser without physical hardware.
</domain>

<decisions>
## Implementation Decisions

### Physics Engine
- Library: `matter-js` (2D Engine)
- Rationale: Easier to debug, lower overhead, clearer visualization for introductory robotics.

### Python Execution
- Library: `pyodide` inside a WebWorker.
- Rationale: Prevents `while True:` loops from freezing the React UI thread. Allows easy cancellation of running scripts.
</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- The `ConnectionProvider` interface established in Phase 3 can be extended into a `SimulationProvider` so that executing code on the Simulation follows the exact same pipeline as executing code on real hardware.
</code_context>
