import { connect } from "mongoose";

connect("mongodb+srv://jhenni123:jhenni123@cluster0.1lfer.mongodb.net/", {})
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));
