import express from "express";
import {
  getAllPosts,
  createPost,
  getPostsById,
} from "../controllers/post.controller.js";

const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.post("/", createPost);
postRouter.get("/:id", getPostsById);
export default postRouter;
