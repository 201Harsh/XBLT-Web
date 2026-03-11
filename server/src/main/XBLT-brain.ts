import { z } from "zod";
import { StateGraph, Annotation, START, END } from "@langchain/langgraph";
import { ChatGroq } from "@langchain/groq";
import { fetchPexelsMedia } from "../tools/pexels.js";
import { buildWebsite } from "../tools/WebBuilder.js";

// 1. Define the Global State for the Graph
const GraphState = Annotation.Root({
  prompt: Annotation<string>(),
  assetUrls: Annotation<string[]>(),
  finalOutput: Annotation<string>(),
});

// Initialize Groq
const model = new ChatGroq({
  apiKey: process.env.XBLT_AI_BRAIN_API_KEY as string,
  model: "llama-3.1-8b-instant",
  temperature: 0.1, // Keep it low for strict reasoning
});

// 2. NODE 1: Force Groq to fetch assets
async function fetchAssetsNode(state: typeof GraphState.State) {
  console.log("\n[XBLT] PHASE 1: Analyzing request & fetching media...");

  // Force Groq to output exactly the arguments our Pexels tool needs
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

    // MANUALLY invoke the tool. This guarantees it runs.
    const toolResult = await fetchPexelsMedia.invoke(searchParams);

    // Extract the raw URLs from the tool's string output using regex
    const urls = toolResult.match(/https:\/\/[^\s]+/g) || [];
    console.log(`[XBLT] Found ${urls.length} assets.`);

    // Save URLs to the graph state
    return { assetUrls: urls };
  } catch (e) {
    console.log("[XBLT] Media fetch failed, proceeding without assets.");
    return { assetUrls: [] };
  }
}

// 3. NODE 2: Force Gemini to build the website
async function buildWebsiteNode(state: typeof GraphState.State) {
  console.log("\n[XBLT] PHASE 2: Injecting assets and compiling code...\n");

  // MANUALLY invoke the Gemini tool, explicitly passing the URLs from the state
  const result = await buildWebsite.invoke({
    designRequest: state.prompt,
    assetUrls: state.assetUrls,
  });

  return { finalOutput: result };
}

// 4. Construct the Unbreakable Custom Workflow
const workflow = new StateGraph(GraphState)
  .addNode("fetchAssets", fetchAssetsNode)
  .addNode("buildWebsite", buildWebsiteNode)
  .addEdge(START, "fetchAssets") // Start -> Fetch Assets
  .addEdge("fetchAssets", "buildWebsite") // Fetch Assets -> Build Website
  .addEdge("buildWebsite", END) // Build Website -> End
  .compile();

export async function XBOLTBrain({ prompt }: { prompt: string }) {
  // Execute the deterministic graph
  const result = await workflow.invoke({
    prompt: prompt,
    assetUrls: [],
    finalOutput: "",
  });

  // Note: Your streaming still works perfectly because buildWebsite
  // internally uses process.stdout.write() while it runs!
  return result.finalOutput;
}
