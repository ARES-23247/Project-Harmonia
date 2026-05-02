import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from "react-resizable-panels";
import { MonacoEditor } from "./MonacoEditor";
import { BlocklyEditor } from "./BlocklyEditor";
import { HardwareToolbar } from "./HardwareToolbar";
import { ConsolePanel } from "./ConsolePanel";

export function Workspace() {
  return (
    <div className="w-full h-full flex flex-col bg-background">
      <HardwareToolbar />
      <PanelGroup orientation="horizontal" className="flex-1 w-full">
        <Panel defaultSize={50} minSize={20}>
          <div className="w-full h-full p-1 bg-zinc-900 border-r border-border">
            <BlocklyEditor />
          </div>
        </Panel>
        
        <PanelResizeHandle className="w-2 bg-zinc-800 hover:bg-zinc-700 transition-colors cursor-col-resize flex items-center justify-center">
          <div className="h-8 w-1 bg-zinc-500 rounded-full" />
        </PanelResizeHandle>
        
        <Panel defaultSize={50} minSize={20}>
          <PanelGroup orientation="vertical">
            <Panel defaultSize={70} minSize={20}>
              <div className="w-full h-full bg-zinc-950">
                <MonacoEditor />
              </div>
            </Panel>
            
            <PanelResizeHandle className="h-2 bg-zinc-800 hover:bg-zinc-700 transition-colors cursor-row-resize flex flex-col items-center justify-center">
              <div className="w-8 h-1 bg-zinc-500 rounded-full" />
            </PanelResizeHandle>

            <Panel defaultSize={30} minSize={10}>
              <ConsolePanel />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
}
