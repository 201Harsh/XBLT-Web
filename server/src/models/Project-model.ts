import mongoose, { Document, Model } from "mongoose";

// 1. Define the TypeScript interface
export interface IProject extends Document {
  sessionId: string;
  prompt: string;
  code: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Pass the interface into the Schema
const projectSchema = new mongoose.Schema<IProject>(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// 3. Pass the interface into the Model
const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export default Project;
