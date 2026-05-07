# Phase 3: Universal Robotics API - Context

**Gathered:** 2026-05-02
**Status:** Ready for execution

<domain>
## Phase Boundary

Create the hardware abstraction layer to support multiple hardware platforms using the same Python code, specifically configuring WebBluetooth and WebSerial connection managers.
</domain>

<decisions>
## Implementation Decisions

### Connection Protocols
- Bluetooth: WebBluetooth API for Pybricks (Lego) and XRP.
- Serial: WebSerial API for Rev IQ and MicroPython standard.

### Code Execution Strategy
- Send Raw Python directly to the robot REPL (Read-Eval-Print Loop).
- Stream `stdout` back to the IDE Console.

### Universal API
- Inject a `harmonia` python module dynamically before execution.
</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- Zustand `editorStore.ts` will need to be expanded to track Connection State and Console Output.

### Established Patterns
- Shadcn UI components available for the Toolbar and Console display.
</code_context>
