import { Document, Schema, model } from "mongoose";

export interface IStudentModel {
  _id: string;
  name: string;
}

const studentSchema = new Schema(
  {
    name: String,
  },
  { timestamps: true, versionKey: false }
);

export const StudentModel = model<Document & IStudentModel>("Student", studentSchema);