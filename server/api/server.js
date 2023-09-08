import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import postRouter from "./routes/post.routes.js";
import dalleRouter from "./routes/dalle.routes.js";

dotenv.config();
const server = express();

server.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

server.use(express.json({ limit: "50mb" }));

server.use("/api/v1/post", postRouter);
server.use("/api/v1/dalle", dalleRouter);

server.get("/", async (req, res) => {
  res.send("Hello from DALL-E");
});

export default server;
