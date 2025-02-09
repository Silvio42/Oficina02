import { Document, Schema, model } from "mongoose";

export interface IWorkshopAccessModel {
  _id: string;
  workshop: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

const workshopAccessSchema = new Schema(
  {
    workshop: { type: String, ref: "workshop" },
    user: { type: String, ref: "User" },
  },
  { timestamps: true, versionKey: false }
);

export const WorkshopAccessModel = model<Document & IWorkshopAccessModel>(
  "WorkshopAccess",
  workshopAccessSchema
);
