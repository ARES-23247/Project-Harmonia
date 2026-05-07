import { create } from "zustand";
import { persist } from "zustand/middleware";
import { saveToGist } from "@/lib/cloud/github";

export type ConnectionState = "disconnected" | "connecting" | "connected";
export type ViewMode = "blocks" | "text" | "split";

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
  isLoading: boolean;
  viewMode: ViewMode;
  isRightDrawerOpen: boolean;
  poppedOutPanels: string[];
  isConsoleOpen: boolean;
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
  setIsLoading: (loading: boolean) => void;
  setViewMode: (mode: ViewMode) => void;
  setIsRightDrawerOpen: (open: boolean) => void;
  togglePopOut: (panelId: string) => void;
  setIsConsoleOpen: (open: boolean) => void;
}

let saveTimeout: any = null;

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
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
      isLoading: true,
      viewMode: "split",
      isRightDrawerOpen: false,
      poppedOutPanels: [],
      isConsoleOpen: false,


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
      addConsoleOutput: (line) => set((state) => ({ 
        consoleOutput: [...state.consoleOutput, line],
        isConsoleOpen: true 
      })),
      clearConsoleOutput: () => set({ consoleOutput: [] }),
      setGithubToken: (token) => set({ githubToken: token }),
      setGistId: (id) => set({ gistId: id }),
      setAiApiKey: (key) => set({ aiApiKey: key }),
      setTelemetryLogs: (logs) => set({ telemetryLogs: logs }),
      appendTelemetryLog: (log) => set((state) => ({ telemetryLogs: [...state.telemetryLogs, log] })),
      setGamepadState: (state) => set({ gamepadState: state }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      setViewMode: (mode) => set({ viewMode: mode }),
      setIsRightDrawerOpen: (open) => set({ isRightDrawerOpen: open }),
      togglePopOut: (panelId) => set((state) => ({
        poppedOutPanels: state.poppedOutPanels.includes(panelId)
          ? state.poppedOutPanels.filter((id) => id !== panelId)
          : [...state.poppedOutPanels, panelId]
      })),
      setIsConsoleOpen: (open) => set({ isConsoleOpen: open }),
    }),
    {
      name: "harmonia-editor-storage",
      partialize: (state) => ({
        viewMode: state.viewMode,
        isRightDrawerOpen: state.isRightDrawerOpen,
        poppedOutPanels: state.poppedOutPanels,
        isConsoleOpen: state.isConsoleOpen,
        githubToken: state.githubToken,
        gistId: state.gistId,
        aiApiKey: state.aiApiKey,
      }),
    }
  )
);

