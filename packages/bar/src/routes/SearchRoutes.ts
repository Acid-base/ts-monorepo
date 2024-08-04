import express, { Request, Response } from "express";
import Observation from "../mongo/models/ObservationModel";

const router: express.Router = express.Router();

// Search observations by name
router.get("/observations", async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.q as string;

    if (!searchTerm) {
      return res.status(400).json({ error: "Missing search term" });
    }

    const observations = await Observation.find({
      name: { $regex: new RegExp(searchTerm, "i") }, // Case-insensitive regex search
    }).lean();

    return res.json(observations);
  } catch (error: any) {
    console.error("Error searching observations:", error);
    res.status(500).json({ error: "Failed to search observations" });
  }
});

export default router;