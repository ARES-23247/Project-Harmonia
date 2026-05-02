import { create } from "zustand";

interface EditorState {
  pythonCode: string;
  blocklyWorkspace: any;
  setPythonCode: (code: string) => void;
  setBlocklyWorkspace: (workspace: any) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  pythonCode: "# Welcome to Project Harmonia!\n\n# Your code will appear here.",
  blocklyWorkspace: null,
  setPythonCode: (code) => set({ pythonCode: code }),
  setBlocklyWorkspace: (workspace) => set({ blocklyWorkspace: workspace }),
}));
