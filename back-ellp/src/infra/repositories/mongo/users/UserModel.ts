import { Document, Schema, model } from "mongoose";

export interface IUserModel {
  _id: string;
  email: string;
  password: string;
  dateOfBirth: string;
}

const userSchema = new Schema(
  {
    email: String,
    password: String,
    dateOfBirth: String,
  },
  { timestamps: true, versionKey: false }
);

export const UserModel = model<Document & IUserModel>("User", userSchema);
