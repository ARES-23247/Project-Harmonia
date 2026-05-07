import { useEditorStore } from "@/store/editorStore";
import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TelemetryPanel() {
  const telemetryLogs = useEditorStore((state) => state.telemetryLogs);
  const togglePopOut = useEditorStore((state) => state.togglePopOut);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [telemetryLogs]);

  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col border-t border-border">
      <div className="h-9 flex items-center px-3 border-b border-zinc-800 bg-zinc-900/50 shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Telemetry</span>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 ml-auto hover:bg-primary/10 transition-colors" 
          onClick={() => togglePopOut("telemetry")}
          title="Pop Out"
        >
          <ExternalLink className="w-3 h-3 text-primary" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto font-mono text-xs p-2">
        {telemetryLogs.length === 0 ? (
          <p className="text-zinc-600">Waiting for telemetry data...</p>
        ) : (
          <table className="w-full text-left text-zinc-300">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="py-1">Time</th>
                <th className="py-1">Key</th>
                <th className="py-1">Value</th>
              </tr>
            </thead>
            <tbody>
              {telemetryLogs.map((log, i) => (
                <tr key={i} className="border-b border-zinc-900/50">
                  <td className="py-1 text-zinc-500">{new Date(log.timestamp).toLocaleTimeString()}</td>
                  <td className="py-1 text-blue-400">{log.key}</td>
                  <td className="py-1">{typeof log.value === "number" ? log.value.toFixed(4) : String(log.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
