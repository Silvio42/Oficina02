import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "reflect-metadata";
import "./infra/repositories/mongo/connection.ts";
import "./infra/repositories/mongo/injections.ts";

import { mainRoutes } from "./main/MainRoutes";
import { errors } from "celebrate";

export const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

app.use("/api", mainRoutes);
app.use(errors());

const port = 3333;

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
