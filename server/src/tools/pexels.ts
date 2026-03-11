import { tool } from "langchain";
import * as z from "zod";

export const fetchPexelsMedia = tool(
  async ({ query, mediaType, limit }) => {
    const apiKey = process.env.PEXELS_API_KEY;
    if (!apiKey) return "Error: PEXELS_API_KEY is missing.";

    try {
      const isVideo = mediaType === "video";
      const endpoint = isVideo
        ? `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=${limit}`
        : `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${limit}`;

      const response = await fetch(endpoint, {
        headers: { Authorization: apiKey },
      });

      if (!response.ok) throw new Error(`API error: ${response.statusText}`);

      const data: any = await response.json();
      const items = isVideo ? data.videos : data.photos;

      if (!items || items.length === 0) {
        return `No ${mediaType}s found for: '${query}'.`;
      }

      let fetchedUrls: string[] = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let mediaUrl = isVideo
          ? (
              item.video_files.find((v: any) => v.quality === "hd") ||
              item.video_files[0]
            ).link
          : item.src.large2x || item.src.original;

        fetchedUrls.push(mediaUrl);
      }

      return `Successfully fetched ${fetchedUrls.length} ${mediaType}(s). Here are the raw URLs to use in the HTML:\n${fetchedUrls.join("\n")}`;
    } catch (error: any) {
      console.log(error);
      return `Failed to fetch media: ${error.message}`;
    }
  },
  {
    name: "fetch_pexels_media",
    description:
      "Search and retrieve raw URLs for free, high-quality images or videos from Pexels. Use this to get media links to inject directly into website code.",
    schema: z.object({
      query: z.string().describe("The search term"),
      mediaType: z
        .enum(["image", "video"])
        .describe("Whether to search for 'image' or 'video'"),
      limit: z
        .number()
        .min(1)
        .max(5)
        .default(1)
        .describe("Number of media URLs to retrieve"),
    }),
  },
);
