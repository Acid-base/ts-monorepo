import express from "express";
import mongoose from "mongoose";
import apiLimiter from "./middleware/rateLimiter";
import {
  storeImages,
  storeObservations,
  storeMushroomNames,
} from "./utils/dataStorage";
import * as dataMapper from "./utils/dataMapper"; // Import as an object
import { MushroomObservation, ObservationImage } from "./types/types";
import pino from "pino";

const app = express();
const PORT = process.env.PORT || 3000;

// Create a Pino logger
const logger = pino({ level: "info" });

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/mushroom-app",
    {}
  )
  .then(() => logger.info("Connected to MongoDB"))
  .catch((err) => logger.error("MongoDB connection error:", err));

// Middleware
app.use(express.json());
app.use(apiLimiter);

// Initial data fetch flag
let initialDataFetched = false;

// Function to fetch and store data for a single page
async function fetchAndStorePage(currentPage: number) {
  try {
    const observationsData = await storeObservations({
      page: currentPage,
    });

    // Check for API errors FIRST
    if (observationsData.error) {
      logger.error(`API Error (Page ${currentPage}):`, observationsData.error);

      return false;
    }

    const observations = observationsData.results
      .map((obs: MushroomObservation) =>
        dataMapper.mapObservation({
          ...obs,
          date: obs.date.toISOString(), // Assuming MushroomObservation has a Date date field
        })
      )
      .filter((obs: MushroomObservation | null) => obs !== null);

    await storeObservations(observations);

    // Fetch and store images concurrently
    const imagePromises = observations.map((obs: MushroomObservation) =>
      storeImages(obs.id).then((images: { results: ObservationImage[] }) =>
        storeImages(images.results)
      )
    );
    await Promise.all(imagePromises);

    return true;
  } catch (error) {
    logger.error(`Error fetching data for page ${currentPage}:`, error);

    return false;
  }
}

// Function to fetch initial data
async function fetchInitialData() {
  if (initialDataFetched) {
    logger.info("Initial data already fetched. Skipping.");

    return;
  }

  const maxPages = 10; // Adjust as needed

  // Create an array of promises for each page
  const pagePromises = Array.from({ length: maxPages }, (_, i) => i + 1).map(
    fetchAndStorePage
  );
  await Promise.all(pagePromises); // Wait for all promises to resolve

  initialDataFetched = true;
}

// Start your server
app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));

// Fetch initial data on startup
fetchInitialData();
