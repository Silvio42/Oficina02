const express = require('express');
const mongoose = require('mongoose');

// Configuração da conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/presenca', {
}).then(() => {
    console.log("Conectado ao MongoDB");
}).catch((error) => {
    console.error("Erro ao conectar ao MongoDB:", error);
});

const app = express();

// Definindo o esquema e o modelo
const userSchema = new mongoose.Schema({
    usuario: String,
    senha: String,
    dataNascimento: String,
    role: String
});

const User = mongoose.model('User', userSchema);

// Função de teste para adicionar um usuário
async function testInsertUser() {
    const newUser = new User({
        usuario: "TesteUsuario",
        senha: "123456",
        dataNascimento: "01/01/2000",
        role: "Aluno"
    });

    try {
        const result = await newUser.save();
        console.log("Usuário inserido com sucesso:", result);
    } catch (error) {
        console.error("Erro ao inserir o usuário:", error);
    } finally {
        mongoose.connection.close();
    }
}

// Executa a função de teste
testInsertUser();

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
