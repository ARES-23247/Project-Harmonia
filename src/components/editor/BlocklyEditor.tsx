import { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import * as Y from "yjs";
import { useEditorStore } from "@/store/editorStore";
import { useBlockStore } from "@/store/blockStore";
import { initializeWorkspace } from "@/lib/blocks/workspaceManager";
import { Skeleton } from "@/components/ui/skeleton";
import { useSharedCollaboration } from "./CollaborationContext";

export default function BlocklyEditor() {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const { yblockly } = useSharedCollaboration();
  const setPythonCode = useEditorStore((state) => state.setPythonCode);
  const setBlocklyWorkspace = useEditorStore((state) => state.setBlocklyWorkspace);
  
  const setStoreWorkspace = useBlockStore((state) => state.setWorkspace);
  const setIsDragging = useBlockStore((state) => state.setIsDragging);
  const isLoading = useEditorStore((state) => state.isLoading);
  const setIsLoading = useEditorStore((state) => state.setIsLoading);

  useEffect(() => {
    if (!blocklyDiv.current) return;

    // Small delay to ensure mount
    const timeout = setTimeout(() => {
      // Initialize workspace using centralized manager
      const workspace = initializeWorkspace(blocklyDiv.current!);
      
      // Sync with stores
      setBlocklyWorkspace(workspace);
      setStoreWorkspace(workspace);
      setIsLoading(false);

      // Change listener for code generation & Yjs Sync
      let isApplyingRemoteChange = false;

      const onWorkspaceChange = (event: any) => {
        if (event.type === Blockly.Events.BLOCK_DRAG) {
          setIsDragging(event.isStart);
        }
        
        if (event.isUiEvent || isApplyingRemoteChange) return;

        try {
          // Sync to Code Store
          const code = pythonGenerator.workspaceToCode(workspace);
          setPythonCode(code || "# Drag blocks to generate code.");

          // Sync to Yjs (if available)
          if (yblockly) {
            const xmlDom = Blockly.Xml.workspaceToDom(workspace);
            const xmlText = Blockly.Xml.domToText(xmlDom);
            
            if (yblockly.toString() !== xmlText) {
              yblockly.delete(0, yblockly.length);
              yblockly.insert(0, xmlText);
            }
          }
        } catch (err) {
          console.error("Blockly code generation error:", err);
        }
      };

      workspace.addChangeListener(onWorkspaceChange);

      // Listen for remote Yjs changes
      const yObserver = (event: Y.YTextEvent, transaction: Y.Transaction) => {
        // If the change came from us locally, ignore it
        if (transaction.local) return;

        isApplyingRemoteChange = true;
        try {
          const xmlText = yblockly?.toString();
          if (xmlText) {
            const xmlDom = Blockly.Xml.textToDom(xmlText);
            Blockly.Xml.clearWorkspaceAndLoadFromXml(xmlDom, workspace);
            
            // Generate code for local Monaco view since workspace changed
            const code = pythonGenerator.workspaceToCode(workspace);
            setPythonCode(code || "# Drag blocks to generate code.");
          }
        } catch (e) {
          console.error("Failed to parse remote Blockly XML", e);
        } finally {
          isApplyingRemoteChange = false;
        }
      };

      if (yblockly) {
        yblockly.observe(yObserver);
      }

      // Initial code generation
      const initialCode = pythonGenerator.workspaceToCode(workspace);
      setPythonCode(initialCode || "# Drag blocks to generate code.");

      // Responsive handling
      const resizeObserver = new ResizeObserver(() => {
        Blockly.svgResize(workspace);
      });
      if (wrapperRef.current) {
        resizeObserver.observe(wrapperRef.current);
      }

      return () => {
        resizeObserver.disconnect();
        workspace.removeChangeListener(onWorkspaceChange);
        if (yblockly) yblockly.unobserve(yObserver);
        workspace.dispose();
        setStoreWorkspace(null);
      };
    }, 500); // 500ms for smooth transition

    return () => clearTimeout(timeout);
  }, [setBlocklyWorkspace, setPythonCode, setStoreWorkspace, setIsDragging, setIsLoading]);

  return (
    <div ref={wrapperRef} className="workspace-container bg-background">
      {isLoading && (
        <div className="absolute inset-0 z-50 p-8 flex flex-col gap-6 bg-background animate-in fade-in duration-500">
          <div className="flex gap-4">
            <Skeleton className="h-12 w-32 rounded-lg" />
            <Skeleton className="h-12 w-32 rounded-lg" />
            <Skeleton className="h-12 w-32 rounded-lg" />
          </div>
          <div className="flex-1 flex gap-6">
            <div className="w-64 flex flex-col gap-2 border-r pr-6">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full opacity-50" />
            </div>
            <div className="flex-1 grid grid-cols-4 grid-rows-4 gap-4 opacity-30">
              <Skeleton className="col-span-2 row-span-1" />
              <Skeleton className="col-span-1" />
              <Skeleton className="col-span-1 row-span-2" />
              <Skeleton className="col-span-2" />
            </div>
          </div>
        </div>
      )}
      <div 
        ref={blocklyDiv} 
        className={`blockly-wrapper transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-1'}`}
        id="blocklyEditor"
      />
    </div>
  );
}
