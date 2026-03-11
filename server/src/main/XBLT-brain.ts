import { createAgent } from "langchain";
import { ChatGroq } from "@langchain/groq";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { fetchPexelsMedia } from "../tools/pexels.js";

const model = new ChatGroq({
  apiKey: process.env.XBLT_AI_BRAIN_API_KEY as string,
  model: "llama-3.1-8b-instant",
  temperature: 0.5,
  topP: 1,
});

const agent = createAgent({
  model,
  tools: [fetchPexelsMedia],
  systemPrompt: new SystemMessage("You are a helpful assistant named XBOLT."),
});

export async function XBOLTBrain({ prompt }: { prompt: string }) {
  const messages = [new HumanMessage(prompt)];

  const stream = await agent.stream(
    {
      messages,
    },
    { streamMode: "messages" },
  );

  let response = "";

  for await (const [chunk] of stream) {
    const textChunk = chunk.content;

    if (textChunk && typeof textChunk === "string") {
      process.stdout.write(textChunk);
      response += textChunk;
    }
  }

  return response;
}
