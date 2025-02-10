import { Router } from "express";

import { userRoutes } from "./users/UserRoutes";
import { workshopRoutes } from "./workshop/WorkshopRoutes";
import { studentsRoutes } from "./students/StudentsRoutes";
import { workshopAccessRoutes } from "./workshopAccess/WorkshopAccessRoutes";
import { volunteersRoutes } from "./volunteers/VolunteersRoutes";

export const mainRoutes = Router();

mainRoutes.use("/students", studentsRoutes);
mainRoutes.use("/users", userRoutes);
mainRoutes.use("/workshops", workshopRoutes);
mainRoutes.use("/workshops-access", workshopAccessRoutes);
mainRoutes.use("/volunteers", volunteersRoutes);
