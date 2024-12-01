import { connect } from "mongoose";

connect(
  "mongodb+srv://brunoalves:brunoalves1224@cluster0.6kdgw.mongodb.net/presenca",
  {}
)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));
