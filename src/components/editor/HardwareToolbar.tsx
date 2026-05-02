import { Button } from "@/components/ui/button";
import { Bluetooth, Usb } from "lucide-react";
import { useEditorStore } from "@/store/editorStore";
import { BluetoothProvider } from "@/lib/hardware/bluetooth";
import { SerialProvider } from "@/lib/hardware/serial";
import { setActiveConnection } from "@/lib/hardware/connectionManager";

export function HardwareToolbar() {
  const connectionState = useEditorStore((state) => state.connectionState);
  const setConnectionState = useEditorStore((state) => state.setConnectionState);
  const addConsoleOutput = useEditorStore((state) => state.addConsoleOutput);

  const handleConnect = async (type: "bluetooth" | "serial") => {
    setConnectionState("connecting");
    const provider = type === "bluetooth" ? new BluetoothProvider() : new SerialProvider();
    
    const success = await provider.connect(addConsoleOutput);
    if (success) {
      setActiveConnection(provider);
      setConnectionState("connected");
    } else {
      setConnectionState("disconnected");
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
      </div>
      
      <div className="ml-auto flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${
          connectionState === "connected" ? "bg-green-500" :
          connectionState === "connecting" ? "bg-yellow-500" : "bg-red-500"
        }`} />
        <span className="text-sm text-muted-foreground capitalize">
          {connectionState}
        </span>
      </div>
    </div>
  );
}
