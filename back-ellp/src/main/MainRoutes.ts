import { Router } from "express";
import { userRoutes } from "./users/UserRoutes";
import { workshopRoutes } from "./workshop/WorkshopRoutes";

export const mainRoutes = Router();

mainRoutes.use("/users", userRoutes);
mainRoutes.use("/workshops", workshopRoutes);
