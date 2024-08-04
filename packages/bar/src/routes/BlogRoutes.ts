import express from "express";
import { fetchMushroomNames } from "../utils/dataStorage";
import Name from "../mongo/models/Name";

const router: express.Router = express.Router();

// Get all mushroom names  (with pagination)
router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const names = await Name.find().skip(skip).limit(limit).lean();

    const totalNames = await Name.countDocuments();

    res.json({
      names,
      currentPage: page,
      totalPages: Math.ceil(totalNames / limit),
    });
  } catch (error: any) {
    console.error("Error fetching names:", error);
    res.status(500).json({ error: "Failed to fetch names" });
  }
});

export default router;