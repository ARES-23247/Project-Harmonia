

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const Z_AI_ENDPOINT = "https://api.z.ai/v1/chat/completions";
const MODEL_NAME = "glm-5.1";

export async function askCopilot(messages: ChatMessage[], apiKey: string): Promise<Response> {
  const payload = {
    model: MODEL_NAME,
    messages: messages,
    stream: true,
  };

  const response = await fetch(Z_AI_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || `API Error: ${response.status} ${response.statusText}`);
  }

  return response;
}

export function generateDebugPrompt(errorMsg: string, code: string): ChatMessage[] {
  return [
    {
      role: "system",
      content: "You are the Project Harmonia AI Copilot, a robotics teaching assistant for students. The user is writing Python code for a robot simulator using Pyodide. They have encountered an error. Explain the error simply, point out the likely cause in their code, and provide a corrected snippet. Keep it brief and encouraging."
    },
    {
      role: "user",
      content: `I am getting this error:\n\n${errorMsg}\n\nHere is my code:\n\n\`\`\`python\n${code}\n\`\`\``
    }
  ];
}
