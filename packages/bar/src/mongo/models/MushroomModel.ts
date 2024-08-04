import mongoose from "mongoose";

interface Mushroom {
  scientificName: string;
  latitude: number;
  longitude: number;
  imageUrl: string | null;
  description: string | null;
  commonName: string | null;
  family: string | null;
  genus: string | null;
  region: string | null;
  gallery: {
    url: string;
    thumbnailUrl: string;
  }[];
  kingdom: string | null;
  phylum: string | null;
  class: string | null;
  order: string | null;
  habitat: string | null;
  edibility: string | null;
  distribution: string | null;
  wikipediaUrl: string | null;
  mushroomObserverUrl: string | null;
  favorites: {
    userId: mongoose.Types.ObjectId;
    favoritedAt: Date;
  }[];
}

const MushroomSchema = new mongoose.Schema<Mushroom>({
  scientificName: { type: String, required: true, unique: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  imageUrl: String, // Primary image URL
  description: String,
  commonName: String,
  family: String,
  genus: String,
  region: {
    type: String,
  },
  gallery: [
    {
      url: String, // Full-size image URL
      thumbnailUrl: String, // Thumbnail image URL
    },
  ],
  kingdom: String,
  phylum: String,
  class: String,
  order: String,
  habitat: String,
  edibility: String, // Edible, poisonous, etc.
  distribution: String,
  wikipediaUrl: String,
  mushroomObserverUrl: String,
  favorites: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      favoritedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Mushroom = mongoose.model<Mushroom>("Mushroom", MushroomSchema);

export default Mushroom;