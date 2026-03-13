import { Response, Request } from "express";
import { XBOLTBrain } from "../main/XBLT-brain.js";
import ProjectModel from "../models/Project-model.js";

// Explicitly type the return as Promise<void>
export const XBLTBrainController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { prompt, sessionId } = req.body;

    if (!prompt || typeof prompt !== "string" || !sessionId) {
      res
        .status(400)
        .json({ error: "Valid prompt and sessionId are required" });
      return;
    }

    // Set the strict SSE Headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Create the SSE emitter function
    const sendEvent = (eventName: string, payload: any) => {
      res.write(`event: ${eventName}\ndata: ${JSON.stringify(payload)}\n\n`);
    };

    const finalCode = await XBOLTBrain({ prompt, sendEvent });

    sendEvent("log", { message: "Saving project to database..." });

    await ProjectModel.findOneAndUpdate(
      { sessionId: sessionId },
      { prompt: prompt, code: finalCode },
      { upsert: true, new: true },
    );

    sendEvent("done", { message: "Generation complete" });
    res.end();
  } catch (error: any) {
    console.error("[SSE Error]:", error);
    res.write(
      `event: error\ndata: ${JSON.stringify({ error: error.message })}\n\n`,
    );
    res.end();
  }
};

export const getProjectBySessionId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { sessionId } = req.params;

    const project = await ProjectModel.findOne({ sessionId: sessionId } as any);

    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    res.status(200).json({ code: project.code, prompt: project.prompt });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
