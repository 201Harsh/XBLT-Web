import { Response, Request } from "express";
import { XBOLTBrain } from "../main/XBLT-brain.js";

export const XBLTBrainController = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required",
      });
    }

    if (typeof prompt !== "string") {
      return res.status(400).json({
        error: "Prompt must be a string",
      });
    }

    const aiResponse = await XBOLTBrain({ prompt });

    return res.status(200).json({
      response: aiResponse,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
