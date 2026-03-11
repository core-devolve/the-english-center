// src/model/admission
import mongoose, { Schema, model, models } from "mongoose";

export interface Imessage {
    name: string;
    phone: string;
    email: string;
    city: string;
    level: string;
    schedule: string;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const enqurySchema = new Schema<Imessage>({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    level: { type: String, required: true },
    schedule: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true })

const enqury = models?.enqury || model<Imessage>("enqury", enqurySchema);

export default enqury ;