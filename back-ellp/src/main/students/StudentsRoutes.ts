import { Router } from "express";

import { StudentsController } from "./StudentsController";
import { celebrate, Joi } from "celebrate";

export const studentsRoutes = Router();
const studentsController = new StudentsController();

studentsRoutes.post(
  "/",
  celebrate({
    body: {
      name: Joi.string().required(),
    },
  }),
  studentsController.create
);
studentsRoutes.delete("/:id", studentsController.delete);
studentsRoutes.put("/:id", studentsController.update);
studentsRoutes.get("/:id", studentsController.findById);
studentsRoutes.get("/", studentsController.findAll);
