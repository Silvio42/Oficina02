import { Document, Schema, Types, model } from "mongoose";

export interface IVolunteerModel {
  _id: string;
  name: string;
  email: string;
}

const volunteerSchema = new Schema(
  {
    name: String,
    email: String,
    workshop: { type: Types.ObjectId, ref: "workshop" },
  },
  { timestamps: true, versionKey: false }
);

export const Volunteer = model<Document & IVolunteerModel>(
  "Volunteer",
  volunteerSchema
);
