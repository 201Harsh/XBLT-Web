import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.XBLT_AI_BRAIN_API_KEY as string });

export async function XBOLTBrain({ prompt }: { prompt: string }) {
  const stream = await getGroqChatStream(prompt);
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }
}

export async function getGroqChatStream(prompt: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant. ",
      },
      {
        role: "user",
        content: prompt,
      },
    ],

    model: "llama-3.1-8b-instant",
    temperature: 0.5,
    top_p: 1,
    stop: null,

    stream: true,
  });
}