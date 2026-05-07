import { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import { useEditorStore } from "@/store/editorStore";
import { useBlockStore } from "@/store/blockStore";
import { initializeWorkspace } from "@/lib/blocks/workspaceManager";

export function BlocklyEditor() {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const setPythonCode = useEditorStore((state) => state.setPythonCode);
  const setBlocklyWorkspace = useEditorStore((state) => state.setBlocklyWorkspace);
  
  const setStoreWorkspace = useBlockStore((state) => state.setWorkspace);
  const setIsDragging = useBlockStore((state) => state.setIsDragging);

  useEffect(() => {
    if (!blocklyDiv.current) return;

    // Initialize workspace using centralized manager
    const workspace = initializeWorkspace(blocklyDiv.current);
    
    // Sync with stores
    setBlocklyWorkspace(workspace);
    setStoreWorkspace(workspace);

    // Responsive handling
    const resizeObserver = new ResizeObserver(() => {
      Blockly.svgResize(workspace);
    });
    
    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current);
    }

    // Change listener for code generation
    const onWorkspaceChange = (event: any) => {
      // Track drag state
      if (event.type === Blockly.Events.BLOCK_DRAG) {
        setIsDragging(event.isStart);
      }
      
      // Prevent code generation lag on purely UI events
      if (event.isUiEvent) return;
      
      try {
        const code = pythonGenerator.workspaceToCode(workspace);
        setPythonCode(code || "# Drag blocks to generate code.");
      } catch (err) {
        console.error("Blockly code generation error:", err);
      }
    };

    workspace.addChangeListener(onWorkspaceChange);

    // Initial code generation
    const initialCode = pythonGenerator.workspaceToCode(workspace);
    setPythonCode(initialCode || "# Drag blocks to generate code.");

    return () => {
      resizeObserver.disconnect();
      workspace.removeChangeListener(onWorkspaceChange);
      workspace.dispose();
      setStoreWorkspace(null);
    };
  }, [setBlocklyWorkspace, setPythonCode, setStoreWorkspace, setIsDragging]);

  return (
    <div ref={wrapperRef} className="workspace-container">
      <div 
        ref={blocklyDiv} 
        className="blockly-wrapper" 
        id="blocklyEditor"
      />
    </div>
  );
}
