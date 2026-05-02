import { useEditorStore } from "@/store/editorStore";
import { useEffect, useRef } from "react";

export function ConsolePanel() {
  const consoleOutput = useEditorStore((state) => state.consoleOutput);
  const clearConsoleOutput = useEditorStore((state) => state.clearConsoleOutput);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleOutput]);

  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col font-mono text-sm border-t border-border">
      <div className="flex items-center justify-between px-4 py-1 bg-zinc-900 border-b border-border shrink-0">
        <span className="text-zinc-400">Terminal Output</span>
        <button onClick={clearConsoleOutput} className="text-zinc-500 hover:text-zinc-300 transition-colors">
          Clear
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4 text-green-400">
        {consoleOutput.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">{line}</div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
