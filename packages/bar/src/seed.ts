import fetch from "node-fetch";
import mongoose from "mongoose";

const API_BASE = "https://mushroomobserver.org/api2/";

// Define Mongoose schemas for Mushroom, Image, and Location
const MushroomSchema = new mongoose.Schema({
  scientificName: String,
  commonName: String,
  description: String,
  // ... other relevant fields
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
  location: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
});

const ImageSchema = new mongoose.Schema({
  url: String,
  copyrightHolder: String,
  license: String,
  // ... other relevant fields
});

const LocationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  name: String,
  // ... other relevant fields
});

const Mushroom = mongoose.model("Mushroom", MushroomSchema);
const Image = mongoose.model("Image", ImageSchema);
const Location = mongoose.model("Location", LocationSchema);

interface NameDetails {
  scientific_name: string;
  common_name: string;
  description: string;
  images: number[];
  location_id?: number;
}

interface ImageDetails {
  url: string;
  copyright_holder: string;
  license: string;
}

interface LocationDetails {
  latitude: number;
  longitude: number;
  name: string;
}

async function fetchNameDetails(nameId: number): Promise<NameDetails> {
  const response = await fetch(
    `${API_BASE}names/${nameId}?detail=high&include_synonyms=true`
  );
  const data = await response.json();

  return data as NameDetails; // Type assertion to resolve the error
}

async function fetchImageDetails(imageId: number): Promise<ImageDetails> {
  const response = await fetch(`${API_BASE}images/${imageId}?detail=high`);
  const data = await response.json();

  return data as ImageDetails; // Type assertion to resolve the error
}

async function fetchLocationDetails(
  locationId: number
): Promise<LocationDetails> {
  const response = await fetch(
    `${API_BASE}locations/${locationId}?detail=high`
  );
  const data = await response.json();

  return data as LocationDetails; // Type assertion to resolve the error
}

async function seedDatabase() {
  // Connect to MongoDB
  await mongoose.connect("mongodb://localhost:27017/mydatabase");

  // Fetch a list of name IDs (consider pagination if necessary)
  const nameIdsResponse = await fetch(`${API_BASE}names`);
  const nameIdsData = await nameIdsResponse.json();
  const nameIds = nameIdsData.results.map(
    (result: { id: number }) => result.id
  );

  // Fetch and process data for each name ID
  await Promise.all(
    nameIds.map(async (nameId) => {
      // Fetch detailed information for each name
      const nameDetails = await fetchNameDetails(nameId);

      // Create a Mushroom document
      const mushroom = new Mushroom({
        scientificName: nameDetails.scientific_name,
        commonName: nameDetails.common_name,
        description: nameDetails.description,
        // ... other relevant fields
      });

      // Fetch and process image details
      const images = await Promise.all(
        nameDetails.images.map(async (imageId) => {
          const imageDetails = await fetchImageDetails(imageId);
          const image = new Image({
            url: imageDetails.url,
            copyrightHolder: imageDetails.copyright_holder,
            license: imageDetails.license,
            // ... other relevant fields
          });
          await image.save();

          return image._id; // Return the _id of the saved image
        })
      );
      mushroom.images = images; // Assign the _id array to the images field

      // Fetch and process location details
      if (nameDetails.location_id) {
        const locationDetails = await fetchLocationDetails(
          nameDetails.location_id
        );
        const location = new Location({
          latitude: locationDetails.latitude,
          longitude: locationDetails.longitude,
          name: locationDetails.name,
          // ... other relevant fields
        });
        await location.save();
        mushroom.location = location._id; // Assign the _id of the saved location
      }

      // Save the Mushroom document to MongoDB
      await mushroom.save();
    })
  );

  // Disconnect from MongoDB
  await mongoose.disconnect();
}

seedDatabase();
