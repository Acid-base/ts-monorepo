import express, { Request, Response } from "express";
import {
  fetchObservationDetails,
  fetchObservationImages,
} from "../utils/dataStorage";
import Observation from "../mongo/models/ObservationModel";

const router: express.Router = express.Router();

// Get all observations (with pagination)
router.get("/", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 20;
    const skip = (page - 1) * limit;

    const observations = await Observation.find()
      .skip(skip)
      .limit(limit)
      .lean();

    const totalObservations = await Observation.countDocuments();

    res.json({
      observations,
      currentPage: page,
      totalPages: Math.ceil(totalObservations / limit),
    });
  } catch (error) {
    // Consider using a logging library instead of console.error
    // ...
    res.status(500).json({ error: "Failed to fetch observations" });
  }
});

// Get observation details by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const observationId = parseInt(req.params.id, 10);
    const observation = await fetchObservationDetails({ observationId });

    res.json(observation); // Return the response
  } catch (error) {
    // Consider using a logging library instead of console.error
    // ...
    res.status(500).json({ error: "Failed to fetch observation details" });
  }
});

// Get observation images by ID
router.get("/:id/images", async (req: Request, res: Response) => {
  try {
    const observationId = parseInt(req.params.id, 10);
    const images = await fetchObservationImages({ observationId });

    res.json(images); // Return the response
  } catch (error) {
    // Consider using a logging library instead of console.error
    // ...
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

export default router;