import { Router } from "express";

import { WorkshopController } from "./WorkshopController";
import { celebrate, Joi } from "celebrate";

export const workshopRoutes = Router();
const workshopController = new WorkshopController();

workshopRoutes.post(
  "/",
  celebrate({
    body: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      startAt: Joi.string().required(),
      manager: Joi.string().required(),
    },
  }),
  workshopController.create
);
workshopRoutes.delete("/:id", workshopController.delete);
workshopRoutes.put("/:id", workshopController.update);
workshopRoutes.get("/:id", workshopController.findById);
workshopRoutes.get("/", workshopController.findAll);
