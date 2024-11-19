import { Document, Schema, model } from "mongoose";

export interface IUserModel {
  _id: string;
  username: string;
  password: string;
  dateOfBirth: string;
  role: string;
}

const userSchema = new Schema(
  {
    username: String,
    password: String,
    dateOfBirth: String,
    role: String,
  },
  { timestamps: true, versionKey: false }
);

export const UserModel = model<Document & IUserModel>("User", userSchema);
