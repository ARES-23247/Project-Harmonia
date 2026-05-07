import Editor from "@monaco-editor/react";
import { useEditorStore } from "@/store/editorStore";
import { useRef, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useThemeStore } from "@/store/themeStore";
import { useSharedCollaboration } from "./CollaborationContext";
import { MonacoBinding } from "@/lib/collaboration/y-monaco";

export default function MonacoEditor() {
  const setPythonCode = useEditorStore((state) => state.setPythonCode);
  const isLoading = useEditorStore((state) => state.isLoading);
  const { theme } = useThemeStore();
  const editorRef = useRef<any>(null);
  
  // Use the shared collaboration context
  const { provider, ymonaco } = useSharedCollaboration();

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (editorRef.current && ymonaco && provider) {
      const binding = new MonacoBinding(
        ymonaco, 
        editorRef.current.getModel(), 
        new Set([editorRef.current]), 
        provider.awareness
      );

      return () => {
        binding.destroy();
      };
    }
  }, [ymonaco, provider]);

  return (
    <div id="monaco-editor-container" className="w-full h-full bg-card relative">
      {isLoading && (
        <div className="absolute inset-0 z-50 p-6 flex flex-col gap-3 bg-card animate-in fade-in duration-300">
          <Skeleton className="h-4 w-[40%] mb-4" />
          <Skeleton className="h-4 w-[60%]" />
          <Skeleton className="h-4 w-[55%]" />
          <Skeleton className="h-4 w-[70%]" />
          <Skeleton className="h-4 w-[30%]" />
          <Skeleton className="h-4 w-[50%] mt-4" />
          <Skeleton className="h-4 w-[45%]" />
          <Skeleton className="h-4 w-[65%]" />
        </div>
      )}
      <div className={`w-full h-full p-2 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Editor
          height="100%"
          defaultLanguage="python"
          theme={theme === 'light' ? 'vs' : 'vs-dark'}
          onMount={handleEditorDidMount}
          onChange={(value: string | undefined) => setPythonCode(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "on",
            padding: { top: 16 },
            fontFamily: "'Fira Code', monospace",
          }}
        />
      </div>
    </div>
  );
}
