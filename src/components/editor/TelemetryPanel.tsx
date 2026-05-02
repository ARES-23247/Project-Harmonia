import { useEditorStore } from "@/store/editorStore";
import { useEffect, useRef } from "react";

export function TelemetryPanel() {
  const telemetryLogs = useEditorStore((state) => state.telemetryLogs);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [telemetryLogs]);

  return (
    <div className="w-full h-full bg-zinc-950 p-2 flex flex-col border-t border-border">
      <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Telemetry</h3>
      <div className="flex-1 overflow-y-auto font-mono text-xs">
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
