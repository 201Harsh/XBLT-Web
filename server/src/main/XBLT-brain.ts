import { z } from "zod";
import { StateGraph, Annotation, START, END } from "@langchain/langgraph";
import { ChatGroq } from "@langchain/groq";
import { fetchPexelsMedia } from "../tools/pexels.js";
import { buildWebsite } from "../tools/WebBuilder.js";

interface BrainProps {
  prompt: string;
  sendEvent: (eventName: string, payload: any) => void;
}

const GraphState = Annotation.Root({
  prompt: Annotation<string>(),
  assetUrls: Annotation<string[]>(),
  finalOutput: Annotation<string>(),
  sendEvent: Annotation<any>(),
});

const model = new ChatGroq({
  apiKey: process.env.XBLT_AI_BRAIN_API_KEY as string,
  model: "llama-3.1-8b-instant",
  temperature: 0.1,
});

async function fetchAssetsNode(state: typeof GraphState.State) {
  console.log("\n[XBLT] PHASE 1: Analyzing request & fetching media...");

  state.sendEvent("log", {
    message: "Analyzing your architecture requirements...",
  });

  const SearchSchema = z.object({
    query: z.string().describe("Search query for Pexels based on user prompt"),
    mediaType: z.enum(["image", "video"]),
    limit: z.number().min(1).max(5),
  });

  const structuredModel = model.withStructuredOutput(SearchSchema);
  const systemPrompt =
    "Analyze the user's website request. Determine the best single search query to find relevant background images or videos. Return structured data.";

  try {
    const searchParams = await structuredModel.invoke([
      { role: "system", content: systemPrompt },
      { role: "user", content: state.prompt },
    ]);

    state.sendEvent("log", {
      message: `Fetching high-res ${searchParams.mediaType}s for the layout...`,
    });

    const toolResult = await fetchPexelsMedia.invoke(searchParams);

    const urls = toolResult.match(/https:\/\/[^\s]+/g) || [];

    state.sendEvent("log", {
      message: `Successfully acquired ${urls.length} media assets.`,
    });

    console.log(`[XBLT] Found ${urls.length} assets.`);

    return { assetUrls: urls };
  } catch (e) {
    console.log("[XBLT] Media fetch failed, proceeding without assets.");
    return { assetUrls: [] };
  }
}

async function buildWebsiteNode(state: typeof GraphState.State) {
  console.log("\n[XBLT] PHASE 2: Injecting assets and compiling code...\n");

  state.sendEvent("log", { message: "Compiling native Web Architecture..." });

  const result = await buildWebsite.invoke({
    designRequest: state.prompt,
    assetUrls: state.assetUrls,
  });

  return { finalOutput: result };
}

const workflow = new StateGraph(GraphState)
  .addNode("fetchAssets", fetchAssetsNode)
  .addNode("buildWebsite", buildWebsiteNode)
  .addEdge(START, "fetchAssets")
  .addEdge("fetchAssets", "buildWebsite")
  .addEdge("buildWebsite", END)
  .compile();

export async function XBOLTBrain({ prompt, sendEvent }: BrainProps) {
  const result = await workflow.invoke({
    prompt: prompt,
    assetUrls: [],
    finalOutput: "",
    sendEvent: sendEvent,
  });

  return result.finalOutput;
}
