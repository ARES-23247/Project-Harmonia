import { create } from "zustand";
import * as Blockly from "blockly";

import { pythonGenerator } from "blockly/python";

interface BlockState {
  workspace: Blockly.WorkspaceSvg | null;
  lastSelectedBlockId: string | null;
  isDragging: boolean;
  
  setWorkspace: (workspace: Blockly.WorkspaceSvg | null) => void;
  setLastSelectedBlockId: (id: string | null) => void;
  setIsDragging: (isDragging: boolean) => void;
  
  // Utility: Generate code from workspace
  generateCode: () => string;
}

export const useBlockStore = create<BlockState>((set, get) => ({
  workspace: null,
  lastSelectedBlockId: null,
  isDragging: false,
  
  setWorkspace: (workspace) => set({ workspace }),
  setLastSelectedBlockId: (id) => set({ lastSelectedBlockId: id }),
  setIsDragging: (isDragging) => set({ isDragging }),
  
  generateCode: () => {
    const { workspace } = get();
    if (!workspace) return "";
    
    return pythonGenerator.workspaceToCode(workspace);
  },
}));
