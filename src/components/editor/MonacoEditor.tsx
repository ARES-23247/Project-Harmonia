import Editor from "@monaco-editor/react";
import { useEditorStore } from "@/store/editorStore";

export function MonacoEditor() {
  const pythonCode = useEditorStore((state) => state.pythonCode);
  const setPythonCode = useEditorStore((state) => state.setPythonCode);

  return (
    <div className="w-full h-full bg-zinc-950 p-2">
      <Editor
        height="100%"
        defaultLanguage="python"
        theme="vs-dark"
        value={pythonCode}
        onChange={(value: string | undefined) => setPythonCode(value || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          padding: { top: 16 },
        }}
      />
    </div>
  );
}
