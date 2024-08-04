import express, { Request, Response } from "express";
import BlogPost from "../mongo/models/BlogPostModel";

const router: express.Router = express.Router(); // Explicitly define the type

// Get all blog posts (sorted by date in descending order)
router.get("/", async (req: Request, res: Response) => {
  try {
    const blogPosts = await BlogPost.find().sort({ date: -1 }).lean(); // Use .lean() to return plain JavaScript objects
    res.json(blogPosts);
  } catch (error: any) {
    // Consider using a logging library instead of console.error
    console.error("Failed to fetch blog posts:", error);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

// ... other blog routes

export default router;