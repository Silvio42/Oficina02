import { UserEntity } from "@domain/entities/UserEntity";
import { Document, Schema, Types, model } from "mongoose";

export interface IWorkshopModel {
  _id: string;
  name: string;
  startAt: Date;
  description: string;
  manager: string | UserEntity;
  volunteers: Array<string | UserEntity>;
}

const workshopSchema = new Schema(
  {
    name: String,
    startAt: Date,
    description: String,
    manager: { type: Types.ObjectId, ref: "User" },
    volunteers: [{ type: Types.ObjectId, ref: "User" }],
  },
  { timestamps: true, versionKey: false }
);

export const WorkshopModel = model<Document & IWorkshopModel>(
  "workshop",
  workshopSchema
);
