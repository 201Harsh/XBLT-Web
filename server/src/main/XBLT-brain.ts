import { createAgent } from "langchain";
import { ChatGroq } from "@langchain/groq";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";

const model = new ChatGroq({
  apiKey: process.env.XBLT_AI_BRAIN_API_KEY as string,
  model: "llama-3.1-8b-instant",
  temperature: 0.5,
  topP: 1,
});

const agent = createAgent({
  model,
  tools: [],
});

export async function XBOLTBrain({ prompt }: { prompt: string }) {
  const messages = [
    new SystemMessage(
      "You are a helpful assistant named XBOLT your are a Agentic AI Boss.",
    ),
    new HumanMessage(prompt),
  ];

  // 1. Change streamMode from "updates" to "messages"
  const stream = await agent.stream(
    {
      messages,
    },
    { streamMode: "messages" },
  );

  let response = "";

  // 2. Destructure the stream output into [chunk, metadata]
  for await (const [chunk] of stream) {
    // 3. Extract the text content safely
    const textChunk = chunk.content;

    // 4. Only write to stdout if there is actual text (it might be empty on tool calls)
    if (textChunk && typeof textChunk === "string") {
      process.stdout.write(textChunk);
      response += textChunk;
    }
  }

  return response;
}
