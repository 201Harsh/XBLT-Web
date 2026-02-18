import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.CODING_AGENT_API_KEY! });

async function codingagent({ command }: { command: string }) {
  const response = await ai.models.generateContentStream({
    model: "gemini-3-flash-preview",
    contents: command,
  });

  for await (const chunk of response) {
    console.log(chunk.text);
  }
}
