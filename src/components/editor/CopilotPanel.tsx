import { useState, useRef, useEffect } from "react";
import { useEditorStore } from "@/store/editorStore";
import { askCopilot, generateDebugPrompt, type ChatMessage } from "@/lib/ai/copilot";

export function CopilotPanel() {
  const { aiApiKey, setAiApiKey, pythonCode, consoleOutput } = useEditorStore();
  const [isSettingKey, setIsSettingKey] = useState(!aiApiKey);
  const [keyInput, setKeyInput] = useState(aiApiKey || "");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSaveKey = () => {
    setAiApiKey(keyInput);
    setIsSettingKey(false);
  };

  const handleSend = async (text: string, isDebug: boolean = false) => {
    if (!text.trim() && !isDebug) return;
    if (!aiApiKey) return setIsSettingKey(true);

    let newMessages: ChatMessage[];
    if (isDebug) {
      newMessages = generateDebugPrompt(text, pythonCode);
      setMessages([{ role: "user", content: "I have a bug, please help me fix it." }]);
    } else {
      const userMsg: ChatMessage = { role: "user", content: text };
      newMessages = [...messages, userMsg];
      setMessages(newMessages);
    }

    setInput("");
    setIsLoading(true);

    try {
      const response = await askCopilot(newMessages, aiApiKey);
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      let assistantMsg = "";
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          // Basic SSE parsing for OpenAI-compatible stream
          const lines = chunk.split("\n").filter(l => l.startsWith("data: ") && l !== "data: [DONE]");
          for (const line of lines) {
            try {
              const data = JSON.parse(line.replace("data: ", ""));
              if (data.choices[0]?.delta?.content) {
                assistantMsg += data.choices[0].delta.content;
                setMessages(prev => {
                  const copy = [...prev];
                  copy[copy.length - 1].content = assistantMsg;
                  return copy;
                });
              }
            } catch (e) {
              // Ignore parse errors on partial chunks
            }
          }
        }
      }
    } catch (e: any) {
      setMessages(prev => [...prev, { role: "assistant", content: `Error: ${e.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDebugLatest = () => {
    const lastError = consoleOutput.filter(l => l.includes("Error:") || l.includes("Exception:")).pop();
    if (lastError) {
      handleSend(lastError, true);
    } else {
      handleSend("Explain what this code does.", true); // Fallback if no error
    }
  };

  if (isSettingKey) {
    return (
      <div className="w-full h-full bg-zinc-950 p-4 flex flex-col">
        <h2 className="text-lg font-bold text-zinc-100 mb-4">Setup Copilot</h2>
        <p className="text-sm text-zinc-400 mb-4">Enter your z.ai API key to enable the debugging copilot. Keys are saved locally in your browser.</p>
        <input 
          type="password"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          placeholder="sk-..."
          className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-zinc-100 mb-4"
        />
        <button onClick={handleSaveKey} className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded p-2">Save Key</button>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col border-l border-border">
      <div className="p-3 border-b border-border flex justify-between items-center">
        <div>
          <h2 className="text-sm font-bold text-zinc-100">AI Copilot</h2>
          <p className="text-xs text-zinc-500">z.ai GLM 5.1</p>
        </div>
        <button onClick={() => setIsSettingKey(true)} className="text-xs text-zinc-400 hover:text-zinc-200">Key</button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.filter(m => m.role !== "system").map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
            <div className={`max-w-[90%] rounded p-2 text-sm ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-200"}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-zinc-500 text-xs animate-pulse">Typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-border flex flex-col gap-2">
        <button 
          onClick={handleDebugLatest}
          className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded p-1.5 border border-zinc-700"
        >
          🐞 Debug Latest Error
        </button>
        <div className="flex gap-2">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="Ask anything..."
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded p-2 text-sm text-zinc-100"
          />
        </div>
      </div>
    </div>
  );
}
