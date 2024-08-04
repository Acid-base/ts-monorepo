import mongoose from "mongoose";

interface Image {
  id: number;
  url: string;
  observationId: number;
  createdAt: Date;
}

const imageSchema = new mongoose.Schema<Image>({
  id: { type: Number, unique: true },
  url: String,
  observationId: Number,
  createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.model<Image>("Image", imageSchema);

export default Image;