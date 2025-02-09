import { connect } from "mongoose";

connect("mongodb://localhost:27017/presenca", {})
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));