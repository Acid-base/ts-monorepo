import express, { Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import Mushroom from "../mongo/models/MushroomModel";

const router: express.Router = express.Router();

// Define your validation rules as an array of ValidationChain
const mushroomValidationRules: ValidationChain[] = [
  body("scientificName").notEmpty().trim().escape(),
  body("latitude").isFloat(),
  body("longitude").isFloat(),
  body("imageUrl").optional().isURL(),
  // ... add validation for other fields
];

router.post(
  "/",
  mushroomValidationRules, // Use the array of validation rules
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      scientificName,
      latitude,
      longitude,
      imageUrl,
      // ... other fields
    } = req.body;

    try {
      const newMushroom = new Mushroom({
        scientificName,
        latitude,
        longitude,
        imageUrl,
        // ... other fields
      });

      await newMushroom.save();

      return res.status(201).json(newMushroom);
    } catch (error) {
      console.error("Failed to create mushroom:", error);

      return res.status(500).json({ error: "Failed to create mushroom" });
    }
  }
);

export default router;