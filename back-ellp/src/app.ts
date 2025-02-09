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

const isVitest = process.env.NODE_ENV === "test";
const port = isVitest ? 0 : 3333;

const server = app.listen(port, () => {
    const actualPort = (server.address() as any).port;
    console.log(`Servidor rodando na porta ${actualPort}`);
}).on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`A porta ${port} já está em uso. Encerrando...`);
        process.exit(1);
    }
});