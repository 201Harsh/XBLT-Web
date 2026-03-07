  import { ChatGroq } from "@langchain/groq";
  import { SystemMessage, HumanMessage } from "@langchain/core/messages";

  // Initialize the LangChain Groq Model
  const llm = new ChatGroq({
    apiKey: process.env.XBLT_AI_BRAIN_API_KEY as string,
    model: "llama-3.1-8b-instant",
    temperature: 0.5,
    topP: 1,
    // Note: stop and streaming are handled natively by LangChain's .stream() method now
  });

  export async function XBOLTBrain({ prompt }: { prompt: string }) {
    // 1. Format your messages using LangChain's message classes
    const messages = [
      new SystemMessage("You are a helpful assistant named XBOLT your are a Agentic AI Boss."),
      new HumanMessage(prompt),
    ];

    // 2. Call the .stream() method directly on the LLM
    const stream = await llm.stream(messages);

    let response = "";

    // 3. Iterate through the chunks as they arrive
    for await (const chunk of stream) {
      // LangChain simplifies the chunk payload to just chunk.content
      const textChunk = chunk.content as string;

      process.stdout.write(textChunk);
      response += textChunk;
    }

    return response;
  }
