import type { ConnectionProvider } from "@/lib/hardware/connectionManager";

export class SimulationProvider implements ConnectionProvider {
  private worker: Worker | null = null;
  private onStdoutCb: ((data: string) => void) | null = null;

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
      return true;
    } catch (e: any) {
      console.error(e);
      onStdout("Simulation Failed to Start: " + e.message + "\n");
      return false;
    }
  }

  async disconnect(): Promise<void> {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
      this.onStdoutCb?.("Simulation Terminated.\n");
    }
  }

  async executePython(code: string): Promise<void> {
    if (this.worker) {
      this.worker.postMessage({ type: "run", code });
    }
  }
}
