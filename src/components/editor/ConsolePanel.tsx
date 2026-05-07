import { useEditorStore } from "@/store/editorStore";
import { useEffect, useRef } from "react";

export default function ConsolePanel() {
  const consoleOutput = useEditorStore((state) => state.consoleOutput);
  const clearConsoleOutput = useEditorStore((state) => state.clearConsoleOutput);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleOutput]);

  return (
    <div className="w-full h-full bg-card flex flex-col font-mono text-xs border-t border-border">
      <div className="flex items-center justify-between px-4 py-1.5 glass border-b border-border shrink-0">
        <span className="text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">Terminal</span>
        <button onClick={clearConsoleOutput} className="text-muted-foreground hover:text-foreground transition-colors text-[10px] uppercase font-bold">
          Clear
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4 text-foreground/80 selection:bg-primary selection:text-primary-foreground">
        {consoleOutput.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap mb-0.5">{line}</div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
