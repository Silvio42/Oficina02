import { Router } from "express";
import { VolunteersController } from "./VolunteersController";

export const volunteersRoutes = Router();
const volunteersController = new VolunteersController();

volunteersRoutes.post("/", volunteersController.create);
volunteersRoutes.get("/", volunteersController.findAll);
