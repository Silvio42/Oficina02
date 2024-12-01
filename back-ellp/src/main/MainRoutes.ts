import { Router } from "express";
import { userRoutes } from "./users/UserRoutes";

export const mainRoutes = Router();

mainRoutes.use("/users", userRoutes);
