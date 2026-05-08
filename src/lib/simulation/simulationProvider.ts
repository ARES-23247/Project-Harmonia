import type { ConnectionProvider } from "@/lib/hardware/connectionManager";
import { useEditorStore } from "@/store/editorStore";

export class SimulationProvider implements ConnectionProvider {
  type = "simulation" as const;
  private worker: Worker | null = null;
  private onStdoutCb: ((data: string) => void) | null = null;
  private storeUnsub: (() => void) | null = null;

  async connect(onStdout: (data: string) => void): Promise<boolean> {
    this.onStdoutCb = onStdout;
    try {
      // Create WebWorker via Vite's special ?worker import URL syntax
      this.worker = new Worker(new URL("./pyodideWorker.ts", import.meta.url), { type: "module" });
      
      this.worker.onmessage = (e) => {
        if (e.data.type === "stdout") {
          this.onStdoutCb?.(e.data.text);
        } else if (e.data.type === "hardware_cmd") {
          // Fire a custom event that the SimulationPanel will listen to
          window.dispatchEvent(new CustomEvent("simulation_cmd", { detail: e.data }));
        }
      };

      this.worker.postMessage({ type: "init" });

      // Subscribe to gamepad state and forward to worker
      this.storeUnsub = useEditorStore.subscribe((state) => {
        if (state.gamepadState && this.worker) {
          this.worker.postMessage({ type: "gamepad_state", state: state.gamepadState });
        }
      });

      return true;
    } catch (e: unknown) {
      console.error(e);
      const msg = e instanceof Error ? e.message : String(e);
      onStdout("Simulation Failed to Start: " + msg + "\n");
      return false;
    }
  }

  async disconnect(): Promise<void> {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
      this.onStdoutCb?.("Simulation Terminated.\n");
    }
    if (this.storeUnsub) {
      this.storeUnsub();
      this.storeUnsub = null;
    }
  }

  async executePython(code: string): Promise<void> {
    if (this.worker) {
      this.worker.postMessage({ type: "run", code });
    }
  }
}
