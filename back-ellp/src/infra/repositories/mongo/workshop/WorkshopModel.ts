import { StudentEntity } from "@domain/entities/StudentEntity";
import { UserEntity } from "@domain/entities/UserEntity";
import { Document, Schema, Types, model } from "mongoose";

export interface IWorkshopModel {
  _id: string;
  name: string;
  startAt: string | Date;
  description: string;
  manager: string | UserEntity;
  volunteers: Array<string | UserEntity>;
  students: Array<string | StudentEntity>;
}

const workshopSchema = new Schema(
  {
    name: String,
    startAt: Date,
    description: String,
    manager: { type: Types.ObjectId, ref: "User" },
    volunteers: [{ type: Types.ObjectId, ref: "User" }],
    students: [{ type: Types.ObjectId, ref: "Student" }],
  },
  { timestamps: true, versionKey: false }
);

export const WorkshopModel = model<Document & IWorkshopModel>(
  "workshop",
  workshopSchema
);
