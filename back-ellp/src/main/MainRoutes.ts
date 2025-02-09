import { Router } from "express";
import { userRoutes } from "./users/UserRoutes";
import { workshopRoutes } from "./workshop/WorkshopRoutes";
import { studentsRoutes } from "./students/StudentsRoutes";

export const mainRoutes = Router();

mainRoutes.use("/students", studentsRoutes);
mainRoutes.use("/users", userRoutes);
mainRoutes.use("/workshops", workshopRoutes);
