import { create } from "zustand";
import { saveToGist } from "@/lib/cloud/github";

export type ConnectionState = "disconnected" | "connecting" | "connected";

interface EditorState {
  pythonCode: string;
  blocklyWorkspace: any;
  blocklyWorkspaceXML: string;
  isSimulating: boolean;
  activeTarget: 'simulation' | 'hardware';
  connectionState: ConnectionState;
  consoleOutput: string[];
  githubToken: string | null;
  gistId: string | null;
  aiApiKey: string | null;
  telemetryLogs: any[];
  gamepadState: any | null;
  setPythonCode: (code: string) => void;
  setBlocklyWorkspace: (workspace: any) => void;
  setConnectionState: (state: ConnectionState) => void;
  addConsoleOutput: (line: string) => void;
  clearConsoleOutput: () => void;
  setGithubToken: (token: string | null) => void;
  setGistId: (id: string | null) => void;
  setAiApiKey: (key: string | null) => void;
  setTelemetryLogs: (logs: any[]) => void;
  appendTelemetryLog: (log: any) => void;
  setGamepadState: (state: any | null) => void;
}

let saveTimeout: any = null;

export const useEditorStore = create<EditorState>((set, get) => ({
  pythonCode: "# Welcome to Project Harmonia!\n\n# Your code will appear here.",
  blocklyWorkspace: null,
  blocklyWorkspaceXML: "",
  isSimulating: false,
  activeTarget: 'simulation',
  connectionState: "disconnected",
  consoleOutput: [],
  githubToken: null,
  gistId: null,
  aiApiKey: null,
  telemetryLogs: [],
  gamepadState: null,
  setPythonCode: (code) => {
    set({ pythonCode: code });
    
    // Debounce gist saving
    const state = get();
    if (state.githubToken) {
      if (saveTimeout) clearTimeout(saveTimeout);
      saveTimeout = setTimeout(async () => {
        const newGistId = await saveToGist(state.githubToken!, code, state.gistId || undefined);
        if (newGistId && newGistId !== state.gistId) {
          set({ gistId: newGistId });
        }
      }, 2000); // 2 second debounce
    }
  },
  setBlocklyWorkspace: (workspace) => set({ blocklyWorkspace: workspace }),
  setConnectionState: (state) => set({ connectionState: state }),
  addConsoleOutput: (line) => set((state) => ({ consoleOutput: [...state.consoleOutput, line] })),
  clearConsoleOutput: () => set({ consoleOutput: [] }),
  setGithubToken: (token) => set({ githubToken: token }),
  setGistId: (id) => set({ gistId: id }),
  setAiApiKey: (key) => set({ aiApiKey: key }),
  setTelemetryLogs: (logs) => set({ telemetryLogs: logs }),
  appendTelemetryLog: (log) => set((state) => ({ telemetryLogs: [...state.telemetryLogs, log] })),
  setGamepadState: (state) => set({ gamepadState: state }),
}));
