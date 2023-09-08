import Post from "../../mongodb/models/posts.js";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//GET ALL POSTS
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// GET POST BY ID
const getPostsById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//CREATE POST
const createPost = async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};
export { getAllPosts, createPost, getPostsById };
