import { create } from "zustand";

export type ConnectionState = "disconnected" | "connecting" | "connected";

interface EditorState {
  pythonCode: string;
  blocklyWorkspace: any;
  connectionState: ConnectionState;
  consoleOutput: string[];
  setPythonCode: (code: string) => void;
  setBlocklyWorkspace: (workspace: any) => void;
  setConnectionState: (state: ConnectionState) => void;
  addConsoleOutput: (line: string) => void;
  clearConsoleOutput: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  pythonCode: "# Welcome to Project Harmonia!\n\n# Your code will appear here.",
  blocklyWorkspace: null,
  connectionState: "disconnected",
  consoleOutput: [],
  setPythonCode: (code) => set({ pythonCode: code }),
  setBlocklyWorkspace: (workspace) => set({ blocklyWorkspace: workspace }),
  setConnectionState: (state) => set({ connectionState: state }),
  addConsoleOutput: (line) => set((state) => ({ consoleOutput: [...state.consoleOutput, line] })),
  clearConsoleOutput: () => set({ consoleOutput: [] }),
}));
