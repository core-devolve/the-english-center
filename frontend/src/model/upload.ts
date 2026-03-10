// src/model/upload.ts  ← rename from user.ts
import mongoose, { Schema, model, models } from "mongoose";

export type Category = "Events" | "Workshops" | "Achievements" | "Certificates";

export interface EImage {
    _id?: mongoose.Types.ObjectId;
    url: string;
    title: string;
    description: string;
    category: Category;
    date: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const ImageSchema = new Schema<EImage>(
    {
        url: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: {
            type: String,
            required: true,
            enum: ["Events", "Workshops", "Achievements", "Certificates"],
        },
        date: { type: String, required: true },
    },
    { timestamps: true }
);

const Upload = models?.Upload || model<EImage>("Upload", ImageSchema);

export default Upload;