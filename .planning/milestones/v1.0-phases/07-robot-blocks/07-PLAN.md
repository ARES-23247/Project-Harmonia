# Phase 7: Robot Blocks & Pybricks Integration

## Approved Architecture
- **Blockly Toolboxes:** **🤖 Robot** and **🎮 Gamepad** categories.
- **Simulator Upgrade:** Differential drive physics utilizing torque to allow spinning and turning.
- **Pybricks BLE:** Nordic UART Service (NUS) protocol implementation.
- **Pybricks Shim:** Python layer mapping `harmonia.drive()` to Pybricks `Motor`.

## Execution Plan
1. **Blockly Extensions**
   - Create `robotBlocks.ts` and `robotGenerators.ts`.
   - Update `BlocklyEditor.tsx` with the new categories.
2. **Simulation Physics**
   - Modify `SimulationPanel.tsx` to apply angular torque and directional vector force.
3. **Pybricks Connection**
   - Update `bluetooth.ts` with real BLE characteristic chunking.
   - Create `pybricksShim.ts` to wrap universal API before sending over BLE.
