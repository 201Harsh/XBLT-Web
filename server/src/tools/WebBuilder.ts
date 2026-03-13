import { tool } from "langchain";
import * as z from "zod";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const buildWebsite = tool(
  async ({ designRequest, assetUrls }) => {
    const formattedUrls =
      assetUrls && assetUrls.length > 0
        ? assetUrls.map((url, i) => `[MEDIA ${i + 1}]: ${url}`).join("\n")
        : "No external assets provided.";

    const systemPrompt = `You are XBLT, an elite front-end AI engineer from the year 2026.

STRICT RULES:
1. OUTPUT ONLY RAW CODE. No markdown formatting (\`\`\`html). Just output the exact HTML document starting with <!DOCTYPE html>.
2. Combine everything (HTML, CSS, JS) into a single file.
3. Inject Tailwind CSS and GSAP via CDN.
4. ZERO PLACEHOLDERS: You are STRICTLY FORBIDDEN from using "example.com", "unsplash.com", or fake URLs. You MUST map the provided URLs exactly as they are given to you into the src="" attributes.`;

    const finalPrompt = `
USER DESIGN REQUEST:
${designRequest}

REQUIRED MEDIA ASSETS (YOU MUST USE THESE EXACT STRINGS FOR IMAGES AND VIDEOS):
${formattedUrls}
`;

    console.log(
      "\n[XBLT] Compiling Web Architecture with injected assets...\n",
    );

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: finalPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.1,
      },
    });

    let fullSourceCode = "";

    for await (const chunk of responseStream) {
      const textChunk = chunk.text;
      if (textChunk) {
        process.stdout.write(textChunk);
        fullSourceCode += textChunk;
      }
    }

    return fullSourceCode;
  },
  {
    name: "build_website",
    description:
      "Generates the final HTML/CSS/JS code. You MUST pass the raw URLs you just fetched from Pexels into the 'assetUrls' array.",
    schema: z.object({
      designRequest: z
        .string()
        .describe("The user's exact request for the website design."),
      assetUrls: z
        .array(z.string())
        .describe(
          "The exact list of raw image/video URLs fetched from Pexels.",
        ),
    }),
  },
);
