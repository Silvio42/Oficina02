import { Router } from "express";
import { UserController } from "./UserController";

export const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/register", userController.register);
userRoutes.post("/login", userController.login);
userRoutes.get("/:id", userController.findById);
