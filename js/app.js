const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
app.use(bodyParser.json());

app.use(cors()); // Permite requisições de outros domínios
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/presenca', { });

// Definir o esquema do usuário
const usuarioSchema = new mongoose.Schema({
    username: String,
    password: String,
    dateOfBirth: Date,
    role: String
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Rota para cadastrar um novo usuário
app.post('/cadastro', async (req, res) => {
    const { username, password, dateOfBirth, role } = req.body;

    try {
        const novoUsuario = new Usuario({ username, password, dateOfBirth, role });
        await novoUsuario.save();
        res.status(201).send('Usuário cadastrado com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao cadastrar usuário: ' + error.message);
    }
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
