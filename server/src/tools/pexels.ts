import { tool } from "langchain";
import * as z from "zod";
import fs from "fs";
import path from "path";

const testDir = path.join(process.cwd(), "test");
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}

async function downloadFile(url: string, filename: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download ${url}`);

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const filePath = path.join(testDir, filename);
  fs.writeFileSync(filePath, buffer);
  return filePath;
}

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

      let downloadedFiles: string[] = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let downloadUrl = isVideo
          ? (
              item.video_files.find((v: any) => v.quality === "hd") ||
              item.video_files[0]
            ).link
          : item.src.large2x || item.src.original;

        const extension = isVideo ? ".mp4" : ".jpg";
        const cleanQuery = query.replace(/[^a-z0-9]/gi, "-").toLowerCase();
        const filename = `${cleanQuery}-${Date.now()}-${i + 1}${extension}`;

        await downloadFile(downloadUrl, filename);
        downloadedFiles.push(filename);
      }

      return `Successfully downloaded ${downloadedFiles.length} ${mediaType}(s). Files: ${downloadedFiles.join(", ")}`;
    } catch (error: any) {
        console.log(error)
      return `Failed to fetch media: ${error.message}`;
    }
  },
  {
    name: "fetch_pexels_media",
    description:
      "Search and download free, high-quality images or videos from Pexels to the local filesystem.",
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
        .describe("Number of files to download"),
    }),
  },
);
