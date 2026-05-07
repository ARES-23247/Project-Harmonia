# Phase 6: Telemetry, AI, & Classroom Tools

## Finalized Architecture Decisions
- **AI Model**: `z.ai GLM 5.1` for BYOK configuration.
- **Telemetry UI**: Resizable bottom panel for side-by-side data, code, and simulation viewing.
- **Gamepad API**: FTC-style mapping (`gamepad1.get_button("A")` and `gamepad1.get_axis("LEFT_X")`).

## Execution Plan
1. **Store Updates**
   - Update `editorStore.ts` to support `aiApiKey`, `telemetryData`, and `gamepadState`.
2. **AI Copilot**
   - Create `src/lib/ai/copilot.ts` to interface with `z.ai`.
   - Create `src/components/editor/CopilotPanel.tsx` UI and integrate it into `Workspace.tsx` right sidebar.
3. **Telemetry**
   - Create `src/components/editor/TelemetryPanel.tsx` UI and integrate it into `Workspace.tsx` bottom panel alongside the console.
4. **Gamepad**
   - Create `src/lib/hardware/gamepad.ts` polling loop and `gamepad1` Python bridge definitions.
5. **Teacher Dashboard**
   - Create `src/components/dashboard/TeacherDashboard.tsx` to list GitHub Gists matching specific assignment tags.
