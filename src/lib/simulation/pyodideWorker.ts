import { loadPyodide, type PyodideInterface } from "pyodide";

let pyodide: PyodideInterface | null = null;

async function initPyodide() {
  if (pyodide) return;
  
  self.postMessage({ type: "stdout", text: "Loading Pyodide runtime...\n" });
  
  // We use the CDN for the web worker context
  pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
  });

  // Redirect stdout to our IDE console
  pyodide.setStdout({ batched: (text) => {
    self.postMessage({ type: "stdout", text: text + "\n" });
  }});
  
  // Inject the universal hardware abstraction layer for the simulation
  await pyodide.runPythonAsync(`
import js
class HarmoniaRobot:
    def drive(self, left_speed, right_speed):
        # Send IPC message back to main thread
        js.postMessage(js.Object.fromEntries(js.Map.new([
            ("type", "hardware_cmd"),
            ("cmd", "drive"),
            ("left", left_speed),
            ("right", right_speed)
        ])))

harmonia = HarmoniaRobot()
  `);

  self.postMessage({ type: "stdout", text: "Pyodide initialized successfully.\n" });
  self.postMessage({ type: "ready" });
}

self.onmessage = async (e) => {
  if (e.data.type === "init") {
    await initPyodide();
  } else if (e.data.type === "run") {
    try {
      if (!pyodide) await initPyodide();
      await pyodide!.runPythonAsync(e.data.code);
      self.postMessage({ type: "stdout", text: "Execution finished.\n" });
    } catch (err: any) {
      self.postMessage({ type: "stdout", text: err.message + "\n" });
    }
  }
};
