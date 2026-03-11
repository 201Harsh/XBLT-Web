import { createAgent } from "langchain";
import { ChatGroq } from "@langchain/groq";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { fetchPexelsMedia } from "../tools/pexels.js";
import { buildWebsite } from "../tools/WebBuilder.js";

const model = new ChatGroq({
  apiKey: process.env.XBLT_AI_BRAIN_API_KEY as string,
  model: "llama-3.1-8b-instant",
  temperature: 0.5,
  topP: 1,
});

const agent = createAgent({
  model,
  tools: [fetchPexelsMedia, buildWebsite],
  // STRICT SYSTEM PROMPT FOR ORCHESTRATION
  systemPrompt: new SystemMessage(
    "You are XBOLT, a master AI orchestrator. When a user asks to build a website, you must ALWAYS follow this exact 2-step process:\n" +
      "1. Use 'fetch_pexels_media' to gather relevant images or videos based on the prompt.\n" +
      "2. Pass the user's design request AND the fetched URLs into the 'build_website' tool.\n" +
      "Do not skip steps. Once the website is built, confirm completion with the user.",
  ),
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
