# Phase 4: Simulation & Virtual Physics - Plan

## Requirements Covered
- SIM-01: Python executes in browser without external backend.
- SIM-02: 2D virtual robot visualization.
- SIM-03: WebWorker isolation for safe execution.

## Implementation Steps

### Step 1: Install Dependencies
- Run `npm install matter-js` and `npm install -D @types/matter-js`.
- Run `npm install pyodide`.

### Step 2: Pyodide WebWorker
- Create `src/lib/simulation/pyodideWorker.ts` containing the Pyodide initialization and `postMessage` event listener for executing code.
- Create `src/lib/simulation/simulationProvider.ts` that implements `ConnectionProvider` and manages the Worker lifecycle.

### Step 3: Simulation UI Canvas
- Create `src/components/editor/SimulationPanel.tsx`.
- Initialize a `matter-js` Engine, Render, and Runner on a canvas element.
- Create a virtual robot body (a simple box with wheels).

### Step 4: Bridge Worker and UI
- Inject a mock `harmonia` python package into the Pyodide worker namespace.
- Map `harmonia.drive(speed)` to post a message back to `SimulationProvider`.
- Update `SimulationProvider` to pass movement commands to the `SimulationPanel` (via Zustand state or direct callback) to apply `matter-js` forces.

### Step 5: Update Layout
- Add a "Simulation" tab or button to the `HardwareToolbar`.
- Modify `Workspace.tsx` to conditionally render the `SimulationPanel` next to or instead of the Code Editor.

## Verification
- Run `npm run build` to verify WebWorker compilation.
- Click "Run Simulation", verify Pyodide loads and executes a simple `print("Hello World")`.
- Verify the `matter-js` canvas renders the robot.
