# Phase 3: Universal Robotics API - Plan

## Requirements Covered
- HARD-01: Support for Lego Pybricks, XRP, and Rev IQ.
- HARD-02: Universal API wrapper for disparate hardware.
- HARD-03: WebBluetooth & WebSerial hardware connection abstractions.
- HARD-04: Support for real-time console streaming.

## Implementation Steps

### Step 1: Update Store for Hardware State
- Modify `src/store/editorStore.ts` to include:
  - `connectionState`: 'disconnected' | 'connecting' | 'connected'
  - `consoleOutput`: string[]
  - `setConnectionState` and `addConsoleOutput` methods.

### Step 2: Connection Managers Foundation
- Create `src/lib/hardware/connectionManager.ts` interface.
- Create `src/lib/hardware/bluetooth.ts` for WebBluetooth stubs.
- Create `src/lib/hardware/serial.ts` for WebSerial stubs.

### Step 3: Hardware Toolbar UI
- Create `src/components/editor/HardwareToolbar.tsx`.
- Include "Connect Bluetooth" and "Connect Serial" buttons.
- Display `connectionState` badge (Red, Yellow, Green).
- Hook buttons up to trigger the WebBluetooth/WebSerial prompts.

### Step 4: Console Panel UI
- Update `Workspace.tsx` to include a vertical `PanelGroup` on the right side.
- Top panel: `MonacoEditor`.
- Bottom panel: `ConsolePanel` (showing `consoleOutput`).

## Verification
- Run `npm run build` to verify standard build pipeline succeeds.
- Launch `npm run dev` and navigate to the editor.
- Verify the Hardware Toolbar displays.
- Click "Connect Bluetooth" and verify the browser connection prompt appears (or error handles cleanly if not supported).
