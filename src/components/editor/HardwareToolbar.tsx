import { Button } from "@/components/ui/button";
import { Bluetooth, Usb, PlaySquare, Play } from "lucide-react";
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

  const handleConnect = async (type: "bluetooth" | "serial" | "simulation") => {
    setConnectionState("connecting");
    let provider;
    if (type === "bluetooth") provider = new BluetoothProvider();
    else if (type === "serial") provider = new SerialProvider();
    else provider = new SimulationProvider();
    
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
    }
  };

  return (
    <div className="h-12 border-b bg-zinc-950 flex items-center px-4 gap-4 shrink-0">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Connect Robot:</span>
        <Button variant="outline" size="sm" onClick={() => handleConnect("bluetooth")} disabled={connectionState !== "disconnected"}>
          <Bluetooth className="w-4 h-4 mr-2" />
          Bluetooth
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleConnect("serial")} disabled={connectionState !== "disconnected"}>
          <Usb className="w-4 h-4 mr-2" />
          Serial
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleConnect("simulation")} disabled={connectionState !== "disconnected"}>
          <PlaySquare className="w-4 h-4 mr-2" />
          Simulation
        </Button>
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <Button variant="default" size="sm" onClick={handleRunCode} disabled={connectionState !== "connected"} className="bg-green-600 hover:bg-green-700">
          <Play className="w-4 h-4 mr-2" />
          Run Code
        </Button>
        
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            connectionState === "connected" ? "bg-green-500" :
            connectionState === "connecting" ? "bg-yellow-500" : "bg-red-500"
          }`} />
          <span className="text-sm text-muted-foreground capitalize">
            {connectionState}
          </span>
        </div>
      </div>
    </div>
  );
}
