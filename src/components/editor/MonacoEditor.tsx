import Editor from "@monaco-editor/react";
import { useEditorStore } from "@/store/editorStore";
import { initCollaboration } from "@/lib/collaboration/yjsProvider";
import { useRef } from "react";

export function MonacoEditor() {
  const setPythonCode = useEditorStore((state) => state.setPythonCode);
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    initCollaboration(editor);
  };

  return (
    <div className="w-full h-full bg-zinc-950 p-2">
      <Editor
        height="100%"
        defaultLanguage="python"
        theme="vs-dark"
        onMount={handleEditorDidMount}
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
