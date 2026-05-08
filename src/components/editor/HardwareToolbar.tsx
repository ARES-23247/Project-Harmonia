import { Button } from "@/components/ui/button";
import { Bluetooth, Usb, PlaySquare, Play, LayoutGrid, Type, Columns, PanelRightOpen, Terminal, RotateCcw } from "lucide-react";
import { useEditorStore } from "@/store/editorStore";
import { BluetoothProvider } from "@/lib/hardware/bluetooth";
import { SerialProvider } from "@/lib/hardware/serial";
import { SimulationProvider } from "@/lib/simulation/simulationProvider";
import { activeConnection, setActiveConnection } from "@/lib/hardware/connectionManager";

export function HardwareToolbar() {
  const connectionState = useEditorStore((state) => state.connectionState);
  const setConnectionState = useEditorStore((state) => state.setConnectionState);
  const addConsoleOutput = useEditorStore((state) => state.addConsoleOutput);
  const pythonCode = useEditorStore((state) => state.pythonCode);
  const viewMode = useEditorStore((state) => state.viewMode);
  const setViewMode = useEditorStore((state) => state.setViewMode);
  const isRightDrawerOpen = useEditorStore((state) => state.isRightDrawerOpen);
  const setIsRightDrawerOpen = useEditorStore((state) => state.setIsRightDrawerOpen);
  const isConsoleOpen = useEditorStore((state) => state.isConsoleOpen);
  const setIsConsoleOpen = useEditorStore((state) => state.setIsConsoleOpen);
  const resetLayout = useEditorStore((state) => state.resetLayout);

  const handleConnect = async (type: "bluetooth" | "serial" | "simulation") => {
    setConnectionState("connecting");
    let provider;
    if (type === "bluetooth") provider = new BluetoothProvider();
    else if (type === "serial") provider = new SerialProvider();
    else {
      provider = new SimulationProvider();
      setIsRightDrawerOpen(true); // Auto-open drawer for simulation
    }
    
    const success = await provider.connect(addConsoleOutput);
    if (success) {
      setActiveConnection(provider);
      setConnectionState("connected");
    } else {
      setConnectionState("disconnected");
    }
  };

  const handleRunCode = () => {
    if (activeConnection) {
      addConsoleOutput("> Running code...\n");
      activeConnection.executePython(pythonCode);
      if (activeConnection.type === 'simulation') {
        setIsRightDrawerOpen(true);
      }
    }
  };

  return (
    <div id="hardware-toolbar" className="h-14 border-b glass flex items-center px-4 gap-4 shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Connect Robot</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleConnect("bluetooth")} disabled={connectionState !== "disconnected"} className="hover:border-blue-500/50 hover:bg-blue-500/10 transition-all">
            <Bluetooth className="w-3.5 h-3.5 mr-2" />
            Bluetooth
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleConnect("serial")} disabled={connectionState !== "disconnected"} className="hover:border-purple-500/50 hover:bg-purple-500/10 transition-all">
            <Usb className="w-3.5 h-3.5 mr-2" />
            Serial
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleConnect("simulation")} disabled={connectionState !== "disconnected"} className="hover:border-orange-500/50 hover:bg-orange-500/10 transition-all">
            <PlaySquare className="w-3.5 h-3.5 mr-2" />
            Simulation
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-md border shadow-inner">
        <Button 
          variant={viewMode === "blocks" ? "secondary" : "ghost"} 
          size="sm" 
          onClick={() => setViewMode("blocks")}
          className={`h-8 px-3 transition-all ${viewMode === "blocks" ? "shadow-sm bg-background" : ""}`}
        >
          <LayoutGrid className="w-3.5 h-3.5 mr-2" />
          Blocks
        </Button>
        <Button 
          variant={viewMode === "text" ? "secondary" : "ghost"} 
          size="sm" 
          onClick={() => setViewMode("text")}
          className={`h-8 px-3 transition-all ${viewMode === "text" ? "shadow-sm bg-background" : ""}`}
        >
          <Type className="w-3.5 h-3.5 mr-2" />
          Text
        </Button>
        <Button 
          variant={viewMode === "split" ? "secondary" : "ghost"} 
          size="sm" 
          onClick={() => setViewMode("split")}
          className={`h-8 px-3 transition-all ${viewMode === "split" ? "shadow-sm bg-background" : ""}`}
        >
          <Columns className="w-3.5 h-3.5 mr-2" />
          Split
        </Button>
      </div>
      
      <div className="h-8 w-px bg-border mx-2" />

      <div className="flex items-center gap-2">
        <Button
          variant={isRightDrawerOpen ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setIsRightDrawerOpen(!isRightDrawerOpen)}
          className={`h-8 gap-2 transition-all ${isRightDrawerOpen ? "text-primary bg-primary/10 border-primary/20" : ""}`}
        >
          <PanelRightOpen className={`w-4 h-4 transition-transform ${isRightDrawerOpen ? "rotate-180" : ""}`} />
          <span className="text-xs font-semibold">Tools</span>
        </Button>

        <Button
          variant={isConsoleOpen ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setIsConsoleOpen(!isConsoleOpen)}
          className={`h-8 gap-2 transition-all ${isConsoleOpen ? "text-primary bg-primary/10 border-primary/20" : ""}`}
        >
          <Terminal className="w-4 h-4" />
          <span className="text-xs font-semibold">Terminal</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={resetLayout}
          className="h-8 gap-2 hover:text-primary transition-all"
          title="Reset Layout"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="text-xs font-semibold">Reset</span>
        </Button>
      </div>
      
      <div className="ml-auto flex items-center gap-6">

        <Button 
          variant="default" 
          size="sm" 
          onClick={handleRunCode} 
          disabled={connectionState !== "connected"} 
          className="bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20 px-6 font-bold"
        >
          <Play className="w-4 h-4 mr-2 fill-current" />
          Run
        </Button>
        
        <div className="flex items-center gap-2 border-l pl-6 h-8">
          <div className={`w-2.5 h-2.5 rounded-full ${
            connectionState === "connected" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" :
            connectionState === "connecting" ? "bg-yellow-500 animate-bounce" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"
          }`} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {connectionState}
          </span>
        </div>
      </div>
    </div>
  );
}
