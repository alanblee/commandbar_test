import express from "express";

import { postPrompt } from "../controllers/dalle.controller.js";
const dalleRouter = express.Router();

dalleRouter.post("/", postPrompt);

export default dalleRouter;
