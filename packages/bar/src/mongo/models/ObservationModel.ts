import mongoose from "mongoose";

interface Observation {
  id: number;
  name: string;
  date: Date;
  locationId: number;
  locationName: string;
  thumbnailUrl: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  description: string;
  commonName: string;
  family: string;
  genus: string;
  region: string;
  kingdom: string;
  phylum: string;
  class: string;
  order: string;
  habitat: string;
  edibility: string;
  distribution: string;
  mushroomObserverUrl: string;
  wikipediaUrl: string;
  owner: {
    userId: number;
    username: string;
  };
  consensus: {
    id: number;
    name: string;
  };
  namings: string[];
  votes: {
    total: number;
    votes: { [key: string]: any }[];
  };
  location: {
    locationId: number;
    locationName: string;
    latitude: number;
    longitude: number;
    region: string;
  };
  primary_image: {
    id: number;
    url: string;
  };
  images: string[];
  type: string;
  gps_hidden: boolean;
  specimen_available: boolean;
  is_collection_location: boolean;
  created_at: Date;
  updated_at: Date;
  number_of_views: number;
  last_viewed: Date;
  createdAt: Date;
}

const observationSchema = new mongoose.Schema<Observation>({
  id: { type: Number, unique: true },
  name: String,
  date: Date,
  locationId: Number,
  locationName: String,
  thumbnailUrl: String,
  latitude: Number,
  longitude: Number,
  imageUrl: String,
  description: String,
  commonName: String,
  family: String,
  genus: String,
  region: String,
  kingdom: String,
  phylum: String,
  class: String,
  order: String,
  habitat: String,
  edibility: String,
  distribution: String,
  mushroomObserverUrl: String,
  wikipediaUrl: String,
  owner: {
    userId: Number,
    username: String,
  },
  consensus: {
    id: Number,
    name: String,
  },
  namings: [String],
  votes: {
    total: Number,
    votes: [Object],
  },
  location: {
    locationId: Number,
    locationName: String,
    latitude: Number,
    longitude: Number,
    region: String,
  },
  primary_image: {
    id: Number,
    url: String,
  },
  images: [String],
  type: String,
  gps_hidden: Boolean,
  specimen_available: Boolean,
  is_collection_location: Boolean,
  created_at: Date,
  updated_at: Date,
  number_of_views: Number,
  last_viewed: Date,
  createdAt: { type: Date, default: Date.now },
});

const Observation = mongoose.model<Observation>(
  "Observation",
  observationSchema
);

export default Observation;