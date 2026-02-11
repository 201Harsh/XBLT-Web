import express , { Request, Response } from "express";

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req : Request, res : Response) => {
  res.json({
    message: "⚡ XBLT Backend Running",
    status: "OK",
  });
});

app.listen(PORT, () => {
  console.log(`⚡ Server running on http://localhost:${PORT}`);
});
