import { Router } from "express";

import { WorkshopAccessController } from "./WorkshopAccessController";
import { celebrate, Joi } from "celebrate";

export const workshopAccessRoutes = Router();
const workshopAccessController = new WorkshopAccessController();

workshopAccessRoutes.post(
  "/",
  celebrate({
    body: { workshop: Joi.string().required(), user: Joi.string().required() },
  }),
  workshopAccessController.create
);
workshopAccessRoutes.get("/", workshopAccessController.findById);
