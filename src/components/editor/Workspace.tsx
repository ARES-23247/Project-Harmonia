import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from "react-resizable-panels";
import { MonacoEditor } from "./MonacoEditor";
import { BlocklyEditor } from "./BlocklyEditor";

export function Workspace() {
  return (
    <div className="w-full h-full flex flex-col bg-background">
      <PanelGroup orientation="horizontal" className="flex-1 w-full border-t">
        <Panel defaultSize={50} minSize={20}>
          <div className="w-full h-full p-1 bg-zinc-900 border-r border-border">
            <BlocklyEditor />
          </div>
        </Panel>
        
        <PanelResizeHandle className="w-2 bg-zinc-800 hover:bg-zinc-700 transition-colors cursor-col-resize flex items-center justify-center">
          <div className="h-8 w-1 bg-zinc-500 rounded-full" />
        </PanelResizeHandle>
        
        <Panel defaultSize={50} minSize={20}>
          <div className="w-full h-full bg-zinc-950">
            <MonacoEditor />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
