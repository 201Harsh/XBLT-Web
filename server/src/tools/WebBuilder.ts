import { tool } from "langchain";
import * as z from "zod";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.CODING_AGENT_API_KEY as string });

export const buildWebsite = tool(
  async ({ designRequest, assetUrls }) => {
    const systemPrompt = `You are XBLT, an elite front-end AI engineer from the year 2026. Your sole purpose is to generate stunning, production-ready website code.

STRICT RULES:
1. OUTPUT ONLY RAW CODE. No markdown formatting, no explanations. Just output the exact HTML document starting with <!DOCTYPE html>.
2. Combine everything (HTML, CSS, JS) into a single file.
3. Inject Tailwind CSS via CDN.
4. Inject GSAP via CDN. Include advanced scroll-based animations, stagger effects, and hover micro-interactions.
5. Use premium Google Fonts.
6. Design with a sleek, futuristic aesthetic.
7. YOU MUST INTELLIGENTLY INJECT THESE PROVIDED MEDIA URLS INTO THE HTML (use <img src="..."> or <video src="...">):
${assetUrls.join("\n")}`;

    console.log("\n[XBLT] Compiling Web Architecture...\n");

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: designRequest,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.2,
      },
    });

    let fullSourceCode = "";

    for await (const chunk of responseStream) {
      const textChunk = chunk.text;
      if (textChunk) {
        // Stream the code directly to the console in real-time
        process.stdout.write(textChunk);
        fullSourceCode += textChunk;
      }
    }

    return `\nWebsite successfully generated. Tell the user the code is ready.`;
  },
  {
    name: "build_website",
    description: "Generates the final HTML/CSS/JS code for a website. Call this ONLY AFTER fetching necessary media assets using the fetch_pexels_media tool.",
    schema: z.object({
      designRequest: z.string().describe("The user's exact request for the website design and layout."),
      assetUrls: z.array(z.string()).describe("The list of image or video URLs fetched from Pexels."),
    }),
  }
);