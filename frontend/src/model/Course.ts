// src/model/course.ts
import mongoose, { Schema, model, models } from "mongoose";

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";
export type CourseCategory = "Spoken English" | "IELTS" | "PTE" | "Grammar" | "Business English";

export interface ICourse {
  _id?: mongoose.Types.ObjectId;
  category: CourseCategory;
  title: string;
  tagline: string;
  desc: string;
  price: string;
  originalPrice: string;
  isFree: boolean;
  level: CourseLevel;
  rating: number;
  language: string;
  certificate: boolean;
  icon: string;
  bgFrom: string;
  bgTo: string;
  tag?: string;
  features: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    category:      { type: String, required: true },
    title:         { type: String, required: true },
    tagline:       { type: String, required: true },
    desc:          { type: String, required: true },
    price:         { type: String, required: true },
    originalPrice: { type: String, required: true },
    isFree:        { type: Boolean, default: false },
    level:         { type: String, required: true, enum: ["Beginner", "Intermediate", "Advanced"] },
    rating:        { type: Number, required: true, min: 0, max: 5 },
    language:      { type: String, required: true },
    certificate:   { type: Boolean, default: false },
    icon:          { type: String, required: true },
    bgFrom:        { type: String, required: true },
    bgTo:          { type: String, required: true },
    tag:           { type: String },
    features:      [{ type: String }],
  },
  { timestamps: true }
);

const Course = models?.Course || model<ICourse>("Course", CourseSchema);

export default Course;